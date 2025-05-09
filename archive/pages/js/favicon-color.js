function updateFavicon() {
    const lightFavicon = document.getElementById('favicon-light');
    const darkFavicon = document.getElementById('favicon-dark');

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      lightFavicon.removeAttribute('rel');
      darkFavicon.setAttribute('rel', 'icon');
    } else {
      darkFavicon.removeAttribute('rel');
      lightFavicon.setAttribute('rel', 'icon');
    }
  }

  // Listen for changes in the color scheme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);

  // Initial call to set the correct favicon
  updateFavicon();
