import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import darkModeHangman from '../assets/img/dark-hangman.svg'
import lightModeHangman from '../assets/img/light-hangman.svg'
import { SettingsModal } from '../components/SettingsModal'

type HomeProps = {
    isDarkMode: boolean
    setDarkMode: (value: boolean) => void
}

export function Home({ isDarkMode, setDarkMode }: HomeProps) {
    const [isModalOpen, setModalOpen] = useState(false)

    const navigate = useNavigate()
    const gradientColors = isDarkMode
        ? 'from-cyan-500 to-blue-500'
        : 'from-pink-500 to-orange-400';

    function navigateGame() {
        navigate('/play')
    }

    function openModal() {
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false)
    }

    function toggleDarkMode() {
        setDarkMode(!isDarkMode)
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
                <button className={`${isDarkMode ? 'btn-dark' : 'btn-light'}`}>Languages</button>
                <button onClick={openModal} className={`${isDarkMode ? 'btn-dark' : 'btn-light'}`}>Settings</button>
            </div>

            {isModalOpen && (
                <SettingsModal
                    isModalOpen={isModalOpen}
                    onCloseModal={closeModal}
                    onToggleDarkMode={toggleDarkMode}
                    isDarkMode={isDarkMode}
                />
            )}

        </section>
    )
}