export const DEFAULT_CV = `---
name: Your Name
header:
  - text: |
      <span style="font-style: italic; font-weight: normal; display: block; margin-top: -7.5px; margin-bottom:5px;">
      Your Title or Tagline
      </span>
  - text: <span class="iconify" data-icon="tabler:mail"></span> your.email@example.com
    link: mailto:your.email@example.com
  - text: <span class="iconify" data-icon="tabler:phone"></span> +1234567890
  - text: <span class="iconify" data-icon="tabler:map-pin"></span> City, Country
  - text: <span class="iconify" data-icon="tabler:world"></span> yourwebsite.com
    link: https://yourwebsite.com
  - text: <span class="iconify" data-icon="tabler:brand-github"></span> github.com/yourusername
    link: https://github.com/yourusername
  - text: <span class="iconify" data-icon="tabler:brand-linkedin"></span> linkedin.com/in/yourprofile
    link: https://linkedin.com/in/yourprofile
  - text: <span class="iconify" data-icon="tabler:shield-check"></span> Relevant Status (e.g., Military Service)
---

## Profile

A brief, compelling summary of your skills, experience, and career goals. Tailor this to the job you are applying for. Mention your key areas of expertise and what you aspire to achieve in your next role. Keep it concise and impactful, ideally 2-4 sentences.

## Projects

[**Project Name,** _Brief Description_](https://your-project-link.com)
~ MM/YYYY – MM/YYYY

- Describe your role and contributions using an action verb. For example, "Developed a full-stack web application using..."
- Mention the technologies, frameworks, and tools you used (e.g., React, Node.js, Python, Docker).
- Quantify your achievements where possible. For instance, "Improved performance by 30%" or "Handled X number of user requests."

[**Another Project,** _A different type of project_](https://another-project-link.com)
~ MM/YYYY – MM/YYYY

- Explain the problem this project solved or the goal it achieved.
- Detail a specific technical challenge you overcame and how you did it.
- Mention if it was a team project or an individual effort and describe your specific responsibilities.

## Skills

**Technical Skills** - **Programming & Frameworks:** Language A, Language B, Framework X, Framework Y. | **Field-Specific Area:** Skill A, Skill B, Tool C. | **Cloud & DevOps:** Cloud Provider, Containerization Tool, CI/CD Platform. | **Tools & Technologies:** Version Control, Database A, Database B, IDEs, Design Software. | **Other Technical Skills:** Skill X, Skill Y.

**Soft Skills** - Communication, Teamwork, Problem-Solving, Adaptability, Creativity, Time Management, Detail-Oriented.

## Technical Experience

[**Your Job Title,** _Company Name_](https://link-to-company-or-proof-of-work)
~ MM/YYYY – MM/YYYY | _City, Country_

- Use action verbs to describe your key responsibilities and accomplishments in this role.
- Highlight achievements with metrics. For example, "Automated a process that saved the team 10 hours per week."
- Mention any specific tools, software, or technologies you used on a regular basis.

[**Another Job Title,** _Previous Company_](https://link-to-previous-company.com)
~ MM/YYYY – MM/YYYY | _City, Country (or Remote)_

- Describe a major project you contributed to and what the outcome was.
- Explain how you collaborated with other teams or departments.
- Mention any leadership, training, or mentoring responsibilities you held.

## Education

**University Name,**
~ MM/YYYY – MM/YYYY | _City, Country_

_Degree Name | GPA: X.X | Graduation Project Grade: Grade (or Honors/Distinctions)_`;

// ─── Shared CSS (layout rules identical across all themes) ─────────────────
const SHARED_CSS = `
#resume-preview p,
#resume-preview li,
#resume-preview dl {
  margin: 0;
}

#resume-preview dl {
  display: flex;
}

#resume-preview dl dt,
#resume-preview dl dd {
  flex: none;
}

#resume-preview dl dd {
  white-space: nowrap;
}

#resume-preview svg.iconify {
  vertical-align: -0.2em;
}

#resume-preview img {
  max-width: 100%;
}

#resume-preview .resume-header {
  text-align: center;
}

#resume-preview .resume-header h1 {
  text-align: center;
  line-height: 1;
  margin-bottom: 8px;
}

#resume-preview .resume-header-item {
  display: inline-block;
  margin: 0 4px;
  line-height: 1;
  margin-bottom: 5px;
}

#resume-preview .resume-header h1 + .resume-header-item {
  display: block;
}

#resume-preview .resume-header h1 + .resume-header-item::after {
  display: none;
}


#resume-preview .project-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 5px;
  margin-bottom: 3px;
}

#resume-preview .project-title {
  flex: 1;
}

#resume-preview .project-title p {
  margin: 0;
  line-height: 1.2;
  display: inline-block;
  width: 100%;
}

#resume-preview .project-title p strong,
#resume-preview .project-title p em,
#resume-preview .project-title p a {
  display: inline !important;
  white-space: normal;
}

#resume-preview .project-title p strong {
  margin-right: 2px;
}

#resume-preview .project-title p em {
  font-style: italic;
}

#resume-preview a {
  color: inherit;
  text-decoration: none;
}

#resume-preview a:hover {
  color: inherit;
  text-decoration: none;
}

#resume-preview ul,
#resume-preview ol {
  padding-left: 1.5em;
  margin: 0.1em 0;
}

#resume-preview ol {
  list-style-type: decimal;
}
`;

// ─── Theme: Classic (Merriweather — traditional serif) ─────────────────────
const CLASSIC_CSS = `
#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: #000;
  font-family: 'Merriweather', serif;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  font-size: 12px;
  line-height: 1.4;
}

#resume-preview h1,
#resume-preview h2,
#resume-preview h3 {
  font-weight: 700;
}

#resume-preview h1 {
  font-size: 2.1em;
}

#resume-preview h2,
#resume-preview h3 {
  margin-bottom: 3px;
  font-size: 1em;
}

#resume-preview h2 {
  border-bottom: 2px solid #000;
  padding-bottom: 2px;
  margin-top: 6px;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

#resume-preview h3 {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
}

#resume-preview .resume-header-item:not(.no-separator)::after {
  content: " | ";
  color: #555;
  font-weight: 400;
}

#resume-preview .project-date {
  flex-shrink: 0;
  margin-left: 20px;
  font-style: italic;
  white-space: nowrap;
  color: #333;
  font-weight: 400;
}

#resume-preview ul {
  list-style-type: disc;
  margin-left: 10px;
  margin-bottom: 4px;
}

#resume-preview p {
  margin-bottom: 3px;
}
`;

// ─── Theme: Modern (Inter — clean geometric sans-serif) ───────────────────
const MODERN_CSS = `
#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  font-size: 12px;
  line-height: 1.45;
}

#resume-preview h1,
#resume-preview h2,
#resume-preview h3 {
  font-weight: 700;
}

#resume-preview h1 {
  font-size: 2.13em;
  letter-spacing: -0.01em;
}

#resume-preview h2,
#resume-preview h3 {
  margin-bottom: 3px;
  font-size: 1.1em;
}

#resume-preview h2 {
  border-bottom: 1px solid #94a3b8;
  padding-bottom: 3px;
  margin-top: 10px;
  margin-bottom: 6px;
  letter-spacing: 0.07em;
  color: #1e293b;
}

#resume-preview h3 {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
}

#resume-preview .resume-header-item:not(.no-separator)::after {
  content: " · ";
  color: #94a3b8;
  font-weight: 400;
}

#resume-preview .project-date {
  flex-shrink: 0;
  margin-left: 20px;
  font-style: italic;
  white-space: nowrap;
  color: #64748b;
  font-weight: 400;
}

#resume-preview ul {
  list-style-type: disc;
  margin-left: 10px;
  margin-bottom: 4px;
}

#resume-preview p {
  margin-bottom: 3px;
}
`;

// ─── Theme: Editorial (Refined / Academic / Professional Serif) ────────────
const EDITORIAL_CSS = `
#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: #1a1a1a;
  font-family: 'Playfair Display', serif;
  text-align: justify;
  font-size: 12px;
  line-height: 1.6;
}

#resume-preview h1 {
  font-size: 1.9em;
  font-weight: 700;
  text-transform: none;
  letter-spacing: -0.01em;
  margin-bottom: 16px;
  line-height: 1.2;
  text-align: left;
}

#resume-preview h2 {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 2px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  font-weight: 700;
  text-transform: uppercase;
  color: #444;
}

#resume-preview h3 {
  margin-top: 10px;
  margin-bottom: 4px;
  font-size: 1.05em;
  font-weight: 700;
}

#resume-preview .resume-header {
  text-align: left;
}

#resume-preview .resume-header-item {
  margin-left: 0;
  margin-right: 8px;
  font-size: 0.95em;
}

#resume-preview .resume-header-item:not(.no-separator)::after {
  content: " · ";
  color: #ccc;
}

#resume-preview .project-date {
  font-style: normal;
  font-size: 0.9em;
  color: #777;
  font-weight: 400;
}

#resume-preview ul {
  list-style-type: disc;
  padding-left: 1.2em;
  margin-top: 6px;
}

#resume-preview ul li {
  margin-bottom: 4px;
}

#resume-preview p {
  margin-bottom: 6px;
}

#resume-preview strong {
  font-weight: 700;
  color: #000;
}
`;

// ─── Theme: Broadsheet (Traditional News / Masthead Style) ────────────────
const BROADSHEET_CSS = `
#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: #111;
  font-family: 'Libre Baskerville', serif;
  text-align: justify;
  font-size: 12px;
  line-height: 1.5;
}

#resume-preview h1 {
  font-size: 2.6em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

#resume-preview h2 {
  border-top: 2px solid #111;
  border-bottom: 1px solid #111;
  padding: 3px 0;
  margin-top: 14px;
  margin-bottom: 10px;
  font-size: 1em;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}

#resume-preview h3 {
  margin-top: 8px;
  margin-bottom: 4px;
  font-weight: 700;
}

#resume-preview .resume-header-item:not(.no-separator)::after {
  content: "  •  ";
  color: #444;
}

#resume-preview .project-date {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

#resume-preview ul {
  list-style-type: disc;
}
`;

// ─── Theme: Default (Noto Sans Arabic — the original) ─────────────────────
const DEFAULT_CSS = `
#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: black;
  font-family: 'Noto Sans Arabic', sans-serif;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  font-size: 12px;
}

#resume-preview h1,
#resume-preview h2,
#resume-preview h3 {
  font-weight: bold;
}

#resume-preview h1 {
  font-size: 2.13em;
}

#resume-preview h2,
#resume-preview h3 {
  margin-bottom: 3px;
  font-size: 1.2em;
}

#resume-preview h2 {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  padding-bottom: 2px;
  margin-top: 6px;
  margin-bottom: 6px;
  text-transform: uppercase;
}

#resume-preview h3 {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
}

#resume-preview .resume-header-item:not(.no-separator)::after {
  content: "";
}

#resume-preview .project-date {
  flex-shrink: 0;
  margin-left: 20px;
  font-style: italic;
  white-space: nowrap;
  color: #333333;
}

#resume-preview ul {
  list-style-type: disc;
  margin-left: 10px;
  margin-bottom: 4px;
}

#resume-preview p {
  margin-bottom: 3px;
}
`;

// ─── Theme registry ───────────────────────────────────────────────────────
export const THEMES = {
  default: { label: "Default", css: SHARED_CSS + DEFAULT_CSS, font: "Noto Sans Arabic" },
  classic: { label: "Classic", css: SHARED_CSS + CLASSIC_CSS, font: "Merriweather" },
  modern: { label: "Modern", css: SHARED_CSS + MODERN_CSS, font: "Inter" },
  editorial: { label: "Editorial", css: SHARED_CSS + EDITORIAL_CSS, font: "Playfair Display" },
  broadsheet: { label: "Broadsheet", css: SHARED_CSS + BROADSHEET_CSS, font: "Libre Baskerville" },
};

export const THEME_KEYS = Object.keys(THEMES);

/** Get the combined CSS for a theme (falls back to default). */
export function getThemeCSS(themeName) {
  return (THEMES[themeName] || THEMES.default).css;
}

/** Get the Google Font family name for a theme. */
export function getThemeFont(themeName) {
  return (THEMES[themeName] || THEMES.default).font;
}
