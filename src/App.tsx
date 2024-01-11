import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { Hangman } from './pages/Hangman'
import { useState } from 'react'

function App() {
  const [isDarkMode, setDarkMode] = useState(true)
  return (
    <div>
      <main className={`font-nunito ${isDarkMode ? 'bg-darker text-primary' : 'bg-slate-300 text-orange-500'} min-h-screen`}>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} setDarkMode={setDarkMode} />} />
          <Route path="/play" element={<Hangman isDarkMode={isDarkMode} />} />
          {/* <Route path="/toy" element={<ToyIndex />} /> */}
          {/* <Route path="/toy/:toyId" element={<ToyDetails />} /> */}
          {/* <Route path="/toy/edit/:toyId" element={<ToyEdit />} /> */}
          {/* <Route path="/toy/edit/" element={<ToyEdit />} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App
