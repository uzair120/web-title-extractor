// Function to render HTML response
exports.renderHTMLResponse = (results) => {
  let html = `
    <html>
    <head></head>
    <body>
    <ul>
    <h1>Following are the titles of given websites:</h1>`;

  results.forEach(({ address, title }) => {
    html += `<li>${address} - "${title}"</li>`;
  });

  html += `</ul></body></html>`;
  return html;
};
