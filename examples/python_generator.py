"""
Python Example: Generate GimmeCV URL

Install dependencies:
    pip install zlib (built-in, no installation needed)

Usage:
    python examples/python_generator.py
"""

import zlib
import base64
import sys


def generate_gimmecv_url(markdown_cv: str, base_url: str = 'https://your-gimmecv-instance.com') -> dict:
    """
    Generates a GimmeCV URL with embedded CV data
    
    Args:
        markdown_cv: CV content in Markdown format
        base_url: Your GimmeCV instance URL
    
    Returns:
        Dictionary with URL and statistics
    """
    # Step 1: Convert string to bytes
    text_bytes = markdown_cv.encode('utf-8')
    
    # Step 2: Compress with zlib (maximum compression)
    compressed = zlib.compress(text_bytes, level=9)
    
    # Step 3: Convert to Base64
    base64_str = base64.b64encode(compressed).decode('ascii')
    
    # Step 4: Make URL-safe (Base64URL)
    base64_url = (base64_str
                  .replace('+', '-')
                  .replace('/', '_')
                  .replace('=', ''))
    
    # Step 5: Build complete URL
    url = f"{base_url}/#{base64_url}"
    
    return {
        'url': url,
        'original_length': len(markdown_cv),
        'compressed_length': len(base64_url),
        'compression_ratio': f"{((1 - len(base64_url) / len(markdown_cv)) * 100):.1f}%",
        'total_url_length': len(url)
    }


# Example CV data
EXAMPLE_CV = """---
name: Alex Johnson
header:
  - text: <span class="iconify" data-icon="tabler:mail"></span> alex.johnson@example.com
    link: mailto:alex.johnson@example.com
  - text: <span class="iconify" data-icon="tabler:phone"></span> +1-555-9876
  - text: <span class="iconify" data-icon="tabler:brand-github"></span> github.com/alexjohnson
    link: https://github.com/alexjohnson
  - text: <span class="iconify" data-icon="tabler:world"></span> alexjohnson.dev
    link: https://alexjohnson.dev
---

## Profile

Creative and detail-oriented Product Designer with 6+ years of experience in UX/UI design. Expertise in user research, prototyping, and creating intuitive digital experiences. Passionate about accessibility and inclusive design.

## Skills

**Design Skills** — Figma, Adobe XD, Sketch, InVision, Principle, After Effects, Illustrator, Photoshop

**Technical Skills** — HTML, CSS, JavaScript basics, React components, Design Systems, Responsive Design

**Soft Skills** — User Research, Wireframing, Prototyping, A/B Testing, Stakeholder Communication

## Experience

[**Senior Product Designer,** _DesignHub Inc_](https://designhub.example.com)
~ 08/2020 – Present | _Seattle, WA_

- Led design of enterprise SaaS platform used by 100K+ users monthly
- Conducted user research with 200+ participants resulting in 40% increase in user satisfaction
- Created and maintained design system adopted by 15-person product team
- Collaborated with engineering to ensure pixel-perfect implementation

[**UX/UI Designer,** _CreativeStudio_](https://creativestudio.example.com)
~ 05/2018 – 07/2020 | _Portland, OR_

- Designed mobile apps with 4.8+ App Store rating across 50K+ reviews
- Implemented accessibility standards (WCAG 2.1 AA) across all products
- Reduced user onboarding time by 60% through improved UX flows
- Mentored 3 junior designers on best practices and tools

[**Junior Designer,** _StartupDesign_](https://startupdesign.example.com)
~ 01/2017 – 04/2018 | _San Francisco, CA_

- Created wireframes and high-fidelity mockups for web and mobile
- Conducted usability testing and iteratively improved designs
- Collaborated with developers to implement responsive designs

## Education

**Rhode Island School of Design,**
~ 09/2013 – 05/2017 | _Providence, RI_

_BFA in Graphic Design | GPA: 3.85 | Portfolio Award Winner_

## Certifications

- Google UX Design Professional Certificate (2023)
- Nielsen Norman Group UX Certification (2022)
"""


def main():
    print('🚀 GimmeCV URL Generator - Python Example\n')
    print('Generating URL for CV...\n')
    
    # Generate URL (use localhost for testing)
    result = generate_gimmecv_url(EXAMPLE_CV, 'http://localhost:5173')
    
    print('✅ Generation Complete!\n')
    print('📊 Statistics:')
    print(f"   • Original CV size: {result['original_length']} characters")
    print(f"   • Compressed size: {result['compressed_length']} characters")
    print(f"   • Compression ratio: {result['compression_ratio']} reduction")
    print(f"   • Total URL length: {result['total_url_length']} characters\n")
    
    # Warnings based on URL length
    url_length = result['total_url_length']
    if url_length > 100000:
        print('⚠️  WARNING: URL exceeds 100KB - may not work in most browsers\n')
    elif url_length > 50000:
        print('⚠️  WARNING: URL exceeds 50KB - may not work in older browsers\n')
    elif url_length > 32000:
        print('✓ URL is large but should work in modern browsers\n')
    else:
        print('✓ URL length is safe for all browsers\n')
    
    print('🔗 Generated URL:')
    print(result['url'])
    print('\n📋 Copy the URL above and paste it in your browser!\n')
    
    # Optionally save to file
    output_file = 'examples/generated-url.txt'
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(result['url'])
        print(f"💾 URL saved to: {output_file}\n")
    except Exception as e:
        print(f"⚠️  Could not save to file: {e}\n")


if __name__ == '__main__':
    main()
