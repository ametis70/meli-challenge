const start = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body>
  <div id="app">
`

const closeBody = `</div>
</body>`

const end = (script?: string) => {
  if (script) {
    return `
    <script src="${script}"></script>
</html>`
  }
  return '</html>'
}

const pageParts = {
  start,
  closeBody,
  end,
}

export default pageParts
