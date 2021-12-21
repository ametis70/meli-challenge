import { Route, Routes } from 'react-router-dom'

const App: React.VFC = () => {
  return (
    <html>
      <head>
        <title>Challenge MELI</title>
      </head>
      <body>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/items" element={<div>Items</div>} />
          <Route path="/items/:id" element={<div>Details</div>} />
        </Routes>
      </body>
    </html>
  )
}

export default App
