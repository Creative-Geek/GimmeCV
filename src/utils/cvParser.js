export function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: text };

  try {
    const frontmatter = window.jsyaml.load(match[1]);
    return { frontmatter, content: match[2] };
  } catch (e) {
    console.error("Frontmatter parse error:", e);
    return { frontmatter: {}, content: text };
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
