const React = require("react");

function Layout({ title, children }) {
  return (
    <html lang="en">
      <head>
      <meta charset="UTF-8"/>
       <meta name="viewport" content="width=device-width, initial-scale=1.0"/>  
        <title>{title}</title>
        <link rel="stylesheet" href="/css/style.css" />
        <script defer src="/scripts/index.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}

module.exports = Layout;
