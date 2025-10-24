/**
 * Node.js Example: Generate GimmeCV URL
 *
 * Install dependencies:
 *   npm install pako
 *
 * Usage:
 *   node examples/node-generator.js
 */

const pako = require("pako");
const fs = require("fs");
const path = require("path");

/**
 * Generates a GimmeCV URL with embedded CV data
 * @param {string} markdownCV - CV content in Markdown format
 * @param {string} baseUrl - Your GimmeCV instance URL
 * @returns {object} URL and statistics
 */
function generateGimmeCVUrl(
  markdownCV,
  baseUrl = "https://your-gimmecv-instance.com"
) {
  // Step 1: Convert string to bytes
  const textBytes = Buffer.from(markdownCV, "utf-8");

  // Step 2: Compress with zlib (maximum compression)
  const compressed = pako.deflate(textBytes, { level: 9 });

  // Step 3: Convert to Base64
  const base64 = Buffer.from(compressed).toString("base64");

  // Step 4: Make URL-safe (Base64URL)
  const base64Url = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  // Step 5: Build complete URL
  const url = `${baseUrl}/#${base64Url}`;

  return {
    url,
    originalLength: markdownCV.length,
    compressedLength: base64Url.length,
    compressionRatio:
      ((1 - base64Url.length / markdownCV.length) * 100).toFixed(1) + "%",
    totalUrlLength: url.length,
  };
}

// Example CV data
const exampleCV = `---
name: Jane Smith
header:
  - text: <span class="iconify" data-icon="tabler:mail"></span> jane.smith@example.com
    link: mailto:jane.smith@example.com
  - text: <span class="iconify" data-icon="tabler:phone"></span> +1-555-0123
  - text: <span class="iconify" data-icon="tabler:brand-linkedin"></span> linkedin.com/in/janesmith
    link: https://linkedin.com/in/janesmith
  - text: <span class="iconify" data-icon="tabler:brand-github"></span> github.com/janesmith
    link: https://github.com/janesmith
---

## Profile

Full-stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Passionate about clean code and mentoring junior developers.

## Skills

**Technical Skills** — JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, MongoDB, Docker, Kubernetes, AWS, Git, CI/CD

**Soft Skills** — Leadership, Communication, Problem-Solving, Agile Methodologies, Code Review

## Experience

[**Lead Software Engineer,** _InnovateTech Solutions_](https://innovatetech.example.com)
~ 06/2019 – Present | _New York, NY_

- Architected and led development of microservices platform serving 5M+ users
- Reduced infrastructure costs by 35% through AWS optimization and containerization
- Mentored team of 8 developers, conducted technical interviews and code reviews
- Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes

[**Senior Full-Stack Developer,** _StartupCo_](https://startupco.example.com)
~ 03/2017 – 05/2019 | _San Francisco, CA_

- Built real-time collaboration features using WebSockets and Redis
- Improved application performance by 60% through database optimization
- Led migration from monolith to microservices architecture
- Contributed to open-source projects and technical blog

[**Software Developer,** _TechCorp_](https://techcorp.example.com)
~ 01/2015 – 02/2017 | _Austin, TX_

- Developed RESTful APIs and responsive web interfaces
- Implemented automated testing increasing code coverage from 40% to 85%
- Collaborated with UX team to redesign user dashboard

## Projects

[**OpenSource Analytics,** _Real-time data visualization platform_](https://github.com/janesmith/opensource-analytics)
~ 2022 – Present

- Built with React, D3.js, and Node.js for real-time data visualization
- 2,500+ GitHub stars, used by 50+ companies
- Implemented custom charting library with 15+ chart types

[**DevTools Suite,** _Developer productivity tools_](https://github.com/janesmith/devtools-suite)
~ 2020 – 2021

- CLI tools for automated code generation and project scaffolding
- Reduced boilerplate code writing time by 70%
- Published to npm with 10K+ weekly downloads

## Education

**Stanford University,**
~ 09/2011 – 06/2015 | _Stanford, CA_

_BS in Computer Science | GPA: 3.9 | Dean's List all quarters_

## Certifications

- AWS Certified Solutions Architect – Associate (2023)
- Certified Kubernetes Administrator (2022)
`;

// Generate URL
console.log("🚀 GimmeCV URL Generator - Node.js Example\n");
console.log("Generating URL for CV...\n");

const result = generateGimmeCVUrl(exampleCV, "http://localhost:5173");

console.log("✅ Generation Complete!\n");
console.log("📊 Statistics:");
console.log(`   • Original CV size: ${result.originalLength} characters`);
console.log(`   • Compressed size: ${result.compressedLength} characters`);
console.log(`   • Compression ratio: ${result.compressionRatio} reduction`);
console.log(`   • Total URL length: ${result.totalUrlLength} characters\n`);

if (result.totalUrlLength > 100000) {
  console.log(
    "⚠️  WARNING: URL exceeds 100KB - may not work in most browsers\n"
  );
} else if (result.totalUrlLength > 50000) {
  console.log(
    "⚠️  WARNING: URL exceeds 50KB - may not work in older browsers\n"
  );
} else if (result.totalUrlLength > 32000) {
  console.log("✓ URL is large but should work in modern browsers\n");
} else {
  console.log("✓ URL length is safe for all browsers\n");
}

console.log("🔗 Generated URL:");
console.log(result.url);
console.log("\n📋 Copy the URL above and paste it in your browser!\n");

// Optionally save to file
const outputFile = path.join(__dirname, "generated-url.txt");
fs.writeFileSync(outputFile, result.url);
console.log(`💾 URL saved to: ${outputFile}\n`);
