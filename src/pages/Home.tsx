import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import darkModeHangman from '../assets/img/dark-hangman.svg'
import lightModeHangman from '../assets/img/light-hangman.svg'
import { SettingsModal } from '../components/SettingsModal'
import { LangModal } from '../components/LangModal'

type HomeProps = {
    isDarkMode: boolean
    isHebrew: boolean
    setDarkMode: (value: boolean) => void
    setHebrew: (value: boolean) => void
}

export function Home({ isDarkMode, isHebrew, setDarkMode, setHebrew }: HomeProps) {
    const [isSettingsOpen, setSettingsOpen] = useState(false)
    const [isLangOpen, setLangOpen] = useState(false)

    const navigate = useNavigate()
    const gradientColors = isDarkMode
        ? 'from-cyan-500 to-blue-500'
        : 'from-pink-500 to-orange-400';

    function navigateGame() {
        navigate('/play')
    }

    function openSettings() {
        setSettingsOpen(true)
    }

    function openLangModal() {
        setLangOpen(true)
    }

    function closeSettings() {
        setSettingsOpen(false)
    }

    function closeLangModal() {
        setLangOpen(false)
    }

    function toggleDarkMode() {
        setDarkMode(!isDarkMode)
    }

    function onToggleLang() {
        setHebrew(!isHebrew)
    }

    return (
        <section>
            <div className="text-center text-4xl font-regular py-">
                <h1 className="pt-14">
                    <span className={`bg-gradient-to-r ${gradientColors} text-transparent bg-clip-text`}>Hangman</span>
                </h1>
                <p className="py-4 font-thin">
                    <span className={`bg-gradient-to-r ${gradientColors} text-transparent bg-clip-text`}>The classic word game</span>
                </p>
            </div>

            <div className='w-max mx-auto'>
                <img src={isDarkMode ? darkModeHangman : lightModeHangman} alt="Hangman image" />
            </div>

            <div className='flex flex-col items-center space-y-6'>
                <button onClick={navigateGame} className={`${isDarkMode ? 'btn-dark' : 'btn-light'} mt-7 mb-0`}>Play</button>
                <button onClick={openLangModal} className={`${isDarkMode ? 'btn-dark' : 'btn-light'}`}>Languages</button>
                <button onClick={openSettings} className={`${isDarkMode ? 'btn-dark' : 'btn-light'}`}>Settings</button>
            </div>

            {isLangOpen && (
                <LangModal
                    isModalOpen={isLangOpen}
                    onCloseModal={closeLangModal}
                    onToggleLang={onToggleLang}
                    isDarkMode={isDarkMode}
                    isHebrew={isHebrew}
                />
            )}

            {isSettingsOpen && (
                <SettingsModal
                    isModalOpen={isSettingsOpen}
                    onCloseModal={closeSettings}
                    onToggleDarkMode={toggleDarkMode}
                    isDarkMode={isDarkMode}
                />
            )}

            <div className={`mt-36 border-t-2 ${isDarkMode ? 'border-primary' : 'border-secondary'} `}>
                <h4 className='flex justify-center py-5'>©️ 2023 Made By Raz Amsalem {isDarkMode ? '💙' : '🧡'} </h4>
            </div>

        </section>
    )
}