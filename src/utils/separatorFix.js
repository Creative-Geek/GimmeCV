/**
 * Detects when header items wrap to new lines and adds no-separator class
 * to items that are at the end of a line.
 * 
 * This works by comparing the offsetTop of each header item - items with
 * the same offsetTop are on the same line. The last item on each line
 * should not have a separator after it.
 */
export function fixHeaderSeparators(container) {
  if (!container) return;

  const headerItems = container.querySelectorAll('.resume-header-item');
  if (headerItems.length === 0) return;

  // Reset all items first
  headerItems.forEach(item => {
    // Don't remove no-separator if it was explicitly set in the data
    if (!item.dataset.explicitNoSeparator) {
      item.classList.remove('no-separator');
    }
  });

  // Group items by their line (offsetTop)
  const lines = {};
  headerItems.forEach((item, index) => {
    const top = item.offsetTop;
    if (!lines[top]) {
      lines[top] = [];
    }
    lines[top].push({ item, index });
  });

  // Add no-separator to the last item on each line
  Object.values(lines).forEach(lineItems => {
    const lastItem = lineItems[lineItems.length - 1];
    // Don't override if it was explicitly set
    if (!lastItem.item.dataset.explicitNoSeparator) {
      lastItem.item.classList.add('no-separator');
    }
  });
}

/**
 * Returns a script string that can be injected into HTML for PDF export.
 * The script runs fixHeaderSeparators on window load and before print.
 */
export function getSeparatorFixScript() {
  return `
    <script>
      (function() {
        function fixSeparators() {
          const container = document.getElementById('resume-preview');
          if (!container) return;

          const headerItems = container.querySelectorAll('.resume-header-item');
          if (headerItems.length === 0) return;

          // Reset all items first
          headerItems.forEach(item => {
            if (!item.dataset.explicitNoSeparator) {
              item.classList.remove('no-separator');
            }
          });

          // Group items by their line (offsetTop)
          const lines = {};
          headerItems.forEach((item, index) => {
            const top = item.offsetTop;
            if (!lines[top]) {
              lines[top] = [];
            }
            lines[top].push({ item, index });
          });

          // Add no-separator to the last item on each line
          Object.values(lines).forEach(lineItems => {
            const lastItem = lineItems[lineItems.length - 1];
            if (!lastItem.item.dataset.explicitNoSeparator) {
              lastItem.item.classList.add('no-separator');
            }
          });
        }

        // Run on load
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', fixSeparators);
        } else {
          fixSeparators();
        }

        // Run before print to handle any layout changes
        window.addEventListener('beforeprint', fixSeparators);
        
        // Run after a short delay to ensure fonts are loaded
        setTimeout(fixSeparators, 100);
      })();
    <\/script>
  `;
}
