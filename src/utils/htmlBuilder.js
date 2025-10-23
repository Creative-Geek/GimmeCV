import { BASE_CSS } from "./constants";

export function generateHeader(fm) {
  if (!fm || !fm.name || !Array.isArray(fm.header)) return "";

  const items = fm.header
    .map((item, i) => {
      const isLast = i === fm.header.length - 1;
      const cls = isLast
        ? "resume-header-item no-separator"
        : "resume-header-item";
      if (item.link) {
        return `<span class="${cls}">
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.text}</a>
    </span>`;
      }
      return `<span class="${cls}">
      ${item.text}
    </span>`;
    })
    .join("\n");

  return `<div class="resume-header"><h1>${fm.name}</h1>\n${items}</div>`;
}

export function generateAdditionalStyles(opts) {
  return `
    <style>
      #resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: ${opts.fontSize} !important;
        line-height: ${opts.lineHeight}; !important;
        color: black;
      }

      #resume-preview p {
        margin-bottom: 5px;
      }

      @page {
        margin: ${opts.marginTop} ${opts.marginRight} ${opts.marginBottom} ${opts.marginLeft};
      }
    </style>`;
}

export function buildHTML(fm, contentHTML, opts) {
  const headerHTML = generateHeader(fm);
  const additional = generateAdditionalStyles(opts);
  const title = fm.name || "CV";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <script src="https://code.iconify.design/3/3.1.1/iconify.min.js"><\/script>
    <style>
      ${BASE_CSS}
    </style>
    ${additional}
  </head>
  <body>
    <div class="resume-render" id="resume-preview">
      <div data-scope="vue-smart-pages" data-part="page">
        ${headerHTML} ${contentHTML}
      </div>
    </div>
  </body>
</html>`;
}

export function generatePreviewHTML(headerHTML, contentHTML, opts) {
  const additional = generateAdditionalStyles(opts);

  return `
    <style>${BASE_CSS}</style>
    ${additional}
    <div class="resume-render" id="resume-preview">
      <div data-scope="vue-smart-pages" data-part="page">
        <div style="padding: ${opts.marginTop} ${opts.marginRight} ${opts.marginBottom} ${opts.marginLeft};">
          ${headerHTML}
          ${contentHTML}
        </div>
      </div>
    </div>
  `;
}
