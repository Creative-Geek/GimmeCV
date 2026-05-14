/**
 * Normalize YAML frontmatter to be more forgiving of common formatting
 * mistakes, especially those produced by LLMs.
 */
function normalizeFrontmatter(raw) {
  let text = raw;

  // 1. Strip invisible characters (BOM, zero-width spaces, non-breaking spaces)
  text = text.replace(/[\u200B\u200C\u200D\uFEFF\u00A0]/g, "");

  // 2. Replace tabs with 2 spaces
  text = text.replace(/\t/g, "  ");

  // 3. Detect 4-space base indentation and halve all leading whitespace.
  //    Safe because CV frontmatter is max 2 nesting levels deep.
  const firstListLine = text.split("\n").find((l) => /^\s+-\s/.test(l));
  if (firstListLine) {
    const baseIndent = firstListLine.match(/^(\s+)/)[1].length;
    if (baseIndent >= 4) {
      text = text.replace(/^( +)/gm, (_, spaces) => {
        return " ".repeat(Math.max(1, Math.round(spaces.length / 2)));
      });
    }
  }

  // 4. Fix `link:` / `url:` keys that sit at list-item level instead of
  //    being indented under the mapping.
  //    Pattern:  `  - text: ...\n  link: ...`  →  `  - text: ...\n    link: ...`
  text = text.replace(
    /^(\s*-\s+\w+:.*\n)(\s*)(link|url):/gm,
    (match, prevLine, indent, key) => {
      // Only fix if the link/url indent is ≤ the dash indent
      const dashIndent = prevLine.match(/^(\s*)/)[1].length;
      if (indent.length <= dashIndent) {
        return prevLine + " ".repeat(dashIndent + 2) + key + ":";
      }
      return match;
    }
  );

  return text;
}

export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: text, error: null };

  try {
    const normalized = normalizeFrontmatter(match[1]);
    const frontmatter = window.jsyaml.load(normalized);
    return { frontmatter, content: match[2], error: null };
  } catch (e) {
    console.error("Frontmatter parse error:", e);
    return {
      frontmatter: {},
      content: text,
      error: {
        message: e.message || "Invalid YAML in header",
        line: e.mark?.line != null ? e.mark.line + 1 : null,
      },
    };
  }
}

export function postProcessHTML(html) {
  const toBlock = (t, d) => `
<div class="project-header">
  <div class="project-title">
    <p>${t.trim()}</p>
  </div>
  <div class="project-date">${d.trim()}</div>
</div>`;

  let out = html;
  out = out.replace(
    /<p>(<a href="[^"]*">.*?<\/a>)\n~\s*([^]*?)<\/p>/g,
    (_, t, d) => toBlock(t, d)
  );
  out = out.replace(
    /<p>(<strong><a href="[^"]*">.*?<\/a>,<\/strong> <em>.*?<\/em>)\n~\s*([^]*?)<\/p>/g,
    (_, t, d) => toBlock(t, d)
  );
  out = out.replace(
    /<p>(<strong>[^<]*?,<\/strong> <em><a href="[^"]*">.*?<\/a><\/em>)\n~\s*([^]*?)<\/p>/g,
    (_, t, d) => toBlock(t, d)
  );
  out = out.replace(
    /<p>(<strong>[^<]*?,<\/strong> <em>[^<]*?<\/em>)\n~\s*([^]*?)<\/p>/g,
    (_, t, d) => toBlock(t, d)
  );
  out = out.replace(
    /<p>(<strong>[^<]*?,<\/strong>)\n~\s*([^]*?)<\/p>/g,
    (_, t, d) => toBlock(t, d)
  );

  return out;
}
