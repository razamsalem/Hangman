import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { Hangman } from './pages/Hangman'

function App() {
  const [isDarkMode, setDarkMode] = useState(true)
  const [lang, setLang] = useState('en')
  const { i18n } = useTranslation()

  useEffect(() => {
    const userLang = navigator.language
    i18n.changeLanguage(userLang)

    if (lang === 'he') {
      i18n.changeLanguage('he')
    } else {
      i18n.changeLanguage('en')
    }
  }, [lang])

  return (
    <div>
      <main className={`font-nunito ${isDarkMode ? 'bg-darker text-primary' : 'bg-slate-300 text-orange-500'} min-h-screen`}>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} setDarkMode={setDarkMode} setLang={setLang} />} />
          <Route path="/play" element={<Hangman lang={lang} isDarkMode={isDarkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
