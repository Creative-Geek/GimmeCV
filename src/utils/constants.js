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

**Technical Skills** — **Programming & Frameworks:** Language A, Language B, Framework X, Framework Y. | **Field-Specific Area:** Skill A, Skill B, Tool C. | **Cloud & DevOps:** Cloud Provider, Containerization Tool, CI/CD Platform. | **Tools & Technologies:** Version Control, Database A, Database B, IDEs, Design Software. | **Other Technical Skills:** Skill X, Skill Y.

**Soft Skills** — Communication, Teamwork, Problem-Solving, Adaptability, Creativity, Time Management, Detail-Oriented.

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

export const BASE_CSS = `#resume-preview [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: black;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  font-size: 12px;
}

#resume-preview p,
#resume-preview li,
#resume-preview dl {
  margin: 0;
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
  border-bottom-width: 1px;
}

#resume-preview ul,
#resume-preview ol {
  padding-left: 1.5em;
  margin: 0.1em 0;
}

#resume-preview ul {
  list-style-type: circle;
}

#resume-preview ol {
  list-style-type: decimal;
}

#resume-preview dl {
  display: flex;
}

#resume-preview dl dt,
#resume-preview dl dd:not(:last-child) {
  flex: 1;
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

#resume-preview .resume-header-item:not(.no-separator)::after {
  content: " | ";
}

#resume-preview h2 {
  text-transform: uppercase;
  border-bottom-width: 2px;
  padding-bottom: 2px;
  margin-top: 6px;
  margin-bottom: 6px;
}

#resume-preview .resume-header-item:not(.no-separator)::after {
  content: "";
}

#resume-preview .resume-header-item {
  display: inline-block;
  margin: 0 4px;
  line-height: 1;
  margin-bottom: 5px;
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

#resume-preview .project-date {
  flex-shrink: 0;
  margin-left: 20px;
  font-style: italic;
  white-space: nowrap;
  color: #333333;
}

#resume-preview h3,
#resume-preview p > strong:first-child {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
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

#resume-preview p {
  margin-bottom: 3px;
}

#resume-preview dl dt,
#resume-preview dl dd {
  flex: none;
}

#resume-preview dl dd {
  white-space: nowrap;
}

#resume-preview ul {
  list-style-type: disc;
  margin-left: 10px;
  margin-bottom: 4px;
}

#resume-preview .resume-header h1 + .resume-header-item {
  display: block;
}

#resume-preview a {
  color: inherit;
  text-decoration: none;
}

#resume-preview a:hover {
  color: inherit;
  text-decoration: none;
}`;
