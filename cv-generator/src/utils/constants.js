export const DEFAULT_CV = `---
name: Ahmed Taha
header:
  - text: |
      <span style="font-style: italic; font-weight: normal; display: block; margin-top: -7.5px; margin-bottom:5px;">
      Fresh Software Engineer (AI/ML Focused)
      </span>
  - text: <span class="iconify" data-icon="tabler:mail"></span> ahmedtaha1234@gmail.com
    link: mailto:ahmedtaha1234@gmail.com
  - text: <span class="iconify" data-icon="tabler:phone"></span> +201557528856
    link: https://wa.me/201557528856
  - text: <span class="iconify" data-icon="tabler:map-pin"></span> Cairo, Egypt
  - text: <span class="iconify" data-icon="tabler:world"></span> creative-geek.tech
    link: https://creative-geek.tech
  - text: <span class="iconify" data-icon="tabler:brand-github"></span> github.com/Creative-Geek
    link: https://github.com/Creative-Geek
  - text: <span class="iconify" data-icon="tabler:brand-linkedin"></span> linkedin.com/in/ahmed-taha-thecg
    link: https://linkedin.com/in/ahmed-taha-thecg
  - text: <span class="iconify" data-icon="tabler:shield-check"></span> Exempted
---

## Profile

Freshly graduated Software Engineer with hands-on experience in web development, AI integrations & Automation, and multimedia production. Skilled in React, Nodejs, Flask, and Python, aspires to create dynamic, user-friendly applications. Has delivered projects from web solutions to AI-driven tools—including an Arabic Handwriting E2E OCR system. Strong in UI/UX design and committed to crafting efficient, engaging digital experiences.

## Projects

[**Focal,** _AI-Powered Financial Tracker_](https://focal.creative-geek.tech/)
~ 07/2025 – 09/2025

- Developed a full-stack expense tracker using React, TypeScript, Cloudflare Workers, Hono.js, and Google Gemini AI.
- Implemented **AI receipt** scanning to automatically extract and categorize expense details from single photos, with JWT auth, email verification, and password reset.

[**Knitty,** _AI Resume Optimizer_](https://github.com/Creative-Geek/Knitty)
~ 06/2025 – 08/2025

- Created a proof-of-concept Jupyter notebook system using LangChain, multiple LLMs, and cosine similarity to analyze CVs against job postings and generate tailored cv.
- Integrated PDF processing, web scraping, and RAG pipeline for job url to text, achieving 5-15% improvements.

## Skills

**Technical Skills** – **Programming & Frameworks:** Python, C++, JavaScript, Typescript, React, React Native, Next.js, Vue, Flask, FastAPI, Django, Node.js, WordPress. | **Generative AI:** LLMs, Agent AIs, LangChain, Stable Diffusion, Flux, Vertex AI Platform | **AI/ML:** TensorFlow, Image Processing. | **Cloud & Containerization:** Google Cloud, Azure, Docker. | **Tools & Technologies:** GitHub, Git, Jira, Linux, Prisma, SQLite, PostgreSQL, MongoDB, Godot Engine, QT. | **Multimedia & Design:** Graphic Design, Video Editing, Motion Graphics, Adobe Creative Suite, UI/UX Design. | **Technical Communication:** Technical Writing, Content Creation.

## Education

**Faculty of Engineering, Suez Canal University,**
~ 09/2019 – 07/2024 | _Ismailia, Egypt_

_Bachelor in Computer Engineering | GPA: B- | Graduation Project Grade: Excellent_`;

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
