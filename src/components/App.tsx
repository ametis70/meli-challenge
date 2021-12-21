import { Route, Routes } from 'react-router-dom'

import Header from './Header'

const App: React.VFC = () => {
  return (
    <html>
      <head>
        <title>Challenge MELI</title>
      </head>
      <body>
        <Header />
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
