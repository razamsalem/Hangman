import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { Hangman } from './pages/Hangman'

function App() {

  return (
    <div>
      <main className='main-layout full'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Hangman />} />
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
