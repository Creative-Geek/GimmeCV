import { getThemeCSS, getThemeFont } from "./constants";
import { getSeparatorFixScript } from "./separatorFix";

export function generateHeader(fm) {
  if (!fm || !fm.name || !Array.isArray(fm.header)) return "";

  const items = fm.header
    .map((item, i) => {
      const isLast = i === fm.header.length - 1;
      const cls = isLast
        ? "resume-header-item no-separator"
        : "resume-header-item";
      const dataAttr = isLast ? ' data-explicit-no-separator="true"' : "";
      if (item.link) {
        return `<span class="${cls}"${dataAttr}>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.text}</a>
    </span>`;
      }
      return `<span class="${cls}"${dataAttr}>
      ${item.text}
    </span>`;
    })
    .join("\n");

  return `<div class="resume-header"><h1>${fm.name}</h1>\n${items}</div>`;
}

export function generateAdditionalStyles(opts, isExport = false) {
  const fontFamily = getThemeFont(opts.theme);

  let styles = `
    <style>
      #resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
        font-family: '${fontFamily}', serif;
        font-size: ${opts.fontSize} !important;
        line-height: ${opts.lineHeight} !important;
      }

      #resume-preview p {
        margin-bottom: 5px;
      }
  `;

  if (isExport) {
    styles += `
      /* Export-specific overrides to match preview exactly but allow flexibility */
      @page {
        margin: 0;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html, body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `;
  }

  if (opts.showIcons === false) {
    styles += `
      #resume-preview .iconify,
      #resume-preview svg.iconify { display: none !important; }
    `;
  }

  styles += `</style>`;
  return styles;
}

/** Build the Google Fonts <link> tag for a given theme. */
function fontLink(themeName) {
  const font = getThemeFont(themeName);
  const encoded = font.replace(/ /g, "+");
  return `<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=${encoded}:wght@400;600;700;900&display=swap"
      rel="stylesheet"
    />`;
}

export function buildHTML(fm, contentHTML, opts) {
  const headerHTML = generateHeader(fm);
  const themeCSS = getThemeCSS(opts.theme);
  const additional = generateAdditionalStyles(opts, true);
  const title = fm.name || "CV";
  const separatorFixScript = getSeparatorFixScript();

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    ${fontLink(opts.theme)}
  ${opts.showIcons !== false ? '<script src="https://code.iconify.design/3/3.1.1/iconify.min.js"></script>' : ""}
    <style>
      ${themeCSS}
    </style>
    ${additional}
  </head>
  <body>
    <div class="resume-render" id="resume-preview">
      <div data-scope="vue-smart-pages" data-part="page">
        <div style="padding: ${opts.marginTop} ${opts.marginRight} ${opts.marginBottom} ${opts.marginLeft};">
          ${headerHTML} ${contentHTML}
        </div>
      </div>
    </div>
    ${separatorFixScript}
  </body>
</html>`;
}

export function generatePreviewHTML(headerHTML, contentHTML, opts) {
  const themeCSS = getThemeCSS(opts.theme);
  const additional = generateAdditionalStyles(opts, false);

  return `
    <style>${themeCSS}</style>
    ${additional}
    <div class="resume-render" id="resume-preview">
      <div data-scope="vue-smart-pages" data-part="page">
        <div style="padding: ${opts.marginTop} ${opts.marginRight} ${opts.marginBottom} ${opts.marginLeft};">
          ${headerHTML}
          ${contentHTML}
        </div>
      </div>
    </div>
    ${getSeparatorFixScript()}
  `;
}
