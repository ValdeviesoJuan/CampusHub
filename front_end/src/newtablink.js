function openInNewTab(event) {
    event.preventDefault(); // Prevent the default link behavior
    window.open(event.target.href, '_blank'); // Open the link in a new tab
  }