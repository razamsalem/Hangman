import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SettingsModal } from '../components/SettingsModal'
import { LangModal } from '../components/LangModal'
import lightModeHangman from '../assets/img/light-hangman.svg'
import darkModeHangman from '../assets/img/dark-hangman.svg'
import keySound from '../assets/sound/keySound.mp3'

type HomeProps = {
    isDarkMode: boolean
    setDarkMode: (value: boolean) => void
    setLang: (value: string) => void
}

export function Home({ isDarkMode, setDarkMode, setLang }: HomeProps) {
    const [isSettingsOpen, setSettingsOpen] = useState(false)
    const [isLangOpen, setLangOpen] = useState(false)
    const { t } = useTranslation()

    const navigate = useNavigate()
    const gradientColors = isDarkMode
        ? 'from-cyan-500 to-blue-500'
        : 'from-pink-500 to-orange-400';

    function navigateGame() {
        navigate('/play')
        playKeySound()
    }

    function openSettings() {
        setSettingsOpen(true)
        playKeySound()
    }

    function openLangModal() {
        setLangOpen(true)
        playKeySound()
    }

    function closeSettings() {
        setSettingsOpen(false)
        playKeySound()
    }

    function closeLangModal() {
        setLangOpen(false)
        playKeySound()
    }

    function toggleDarkMode() {
        setDarkMode(!isDarkMode)
        playKeySound()
    }

    function onHebrewLang() {
        setLang('he')
        playKeySound()
    }

    function onEnglishLang() {
        setLang('en')
        playKeySound()
    }

    function playKeySound() {
        const audio = new Audio(keySound)
        audio.play()
    }

    return (
        <section>
            <div className="text-center text-4xl font-regular py-">
                <h1 className="pt-14">
                    <span className={`bg-gradient-to-r ${gradientColors} text-transparent bg-clip-text`}>{t('heading.header')}</span>
                </h1>
                <p className="py-4 font-thin">
                    <span className={`bg-gradient-to-r ${gradientColors} text-transparent bg-clip-text`}>{t('heading.subtitle')}</span>
                </p>
            </div>

            <div className='w-max mx-auto'>
                <img src={isDarkMode ? darkModeHangman : lightModeHangman} alt="Hangman image" />
            </div>

            <div className='flex flex-col items-center space-y-6'>
                <button onClick={navigateGame} className={`${isDarkMode ? 'btn-dark' : 'btn-light'} mt-7 mb-0`}>{t('buttons.play')}</button>
                <button onClick={openLangModal} className={`${isDarkMode ? 'btn-dark' : 'btn-light'}`}>{t('buttons.languages')}</button>
                <button onClick={openSettings} className={`${isDarkMode ? 'btn-dark' : 'btn-light'}`}>{t('buttons.settings')}</button>
            </div>

            {isLangOpen && (
                <LangModal
                    isModalOpen={isLangOpen}
                    onCloseModal={closeLangModal}
                    onHebrewLang={onHebrewLang}
                    onEnglishLang={onEnglishLang}
                    isDarkMode={isDarkMode}
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
                <h4 className='flex justify-center py-5'>©️ 2023 {t('footer.credit')} {isDarkMode ? '💙' : '🧡'} </h4>
            </div>

        </section>
    )
}