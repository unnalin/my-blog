// Dynamic Canvas Nest color for light/dark mode
(function() {
  let isInitialized = false;

  function updateCanvasNestColor() {
    const canvas = document.getElementById('canvas_nest');
    if (!canvas) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Only remove old canvas if we're switching themes, not on initial load
    if (isInitialized) {
      const oldCanvas = document.querySelector('canvas[id^="c_n"]');
      if (oldCanvas) {
        oldCanvas.remove();
      }

      // Reload the script to apply new settings
      const newScript = document.createElement('script');
      newScript.id = 'canvas_nest';
      newScript.defer = true;
      newScript.setAttribute('color', isDark ? '200,220,240' : '100,120,140');
      newScript.setAttribute('opacity', '0.7');
      newScript.setAttribute('zIndex', '-1');
      newScript.setAttribute('count', isDark ? '80' : '50');
      newScript.setAttribute('mobile', 'false');
      newScript.src = canvas.src;

      canvas.parentNode.replaceChild(newScript, canvas);
    } else {
      // Initial setup - just update attributes without reloading
      canvas.setAttribute('color', isDark ? '200,220,240' : '100,120,140');
      canvas.setAttribute('count', isDark ? '80' : '50');
      isInitialized = true;
    }
  }

  // Initial setup - wait for canvas_nest to load
  setTimeout(updateCanvasNestColor, 500);

  // Watch for theme changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'data-theme') {
        updateCanvasNestColor();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
})();
