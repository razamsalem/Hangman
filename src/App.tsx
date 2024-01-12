import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { Hangman } from './pages/Hangman'

function App() {
  const [isDarkMode, setDarkMode] = useState(true)
  const [isHebrew, setHebrew] = useState(false)
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = navigator.language
    i18n.changeLanguage(lang)

    if (isHebrew) {
      i18n.changeLanguage('he')
    } else {
      i18n.changeLanguage('en')
    }
  }, [isHebrew])

  return (
    <div>
      <main className={`font-nunito ${isDarkMode ? 'bg-darker text-primary' : 'bg-slate-300 text-orange-500'} min-h-screen`}>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} isHebrew={isHebrew} setDarkMode={setDarkMode} setHebrew={setHebrew} />} />
          <Route path="/play" element={<Hangman isHebrew={isHebrew} isDarkMode={isDarkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
