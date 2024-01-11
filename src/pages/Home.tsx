import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import darkModeHangman from '../assets/img/dark-hangman.svg'
import lightModeHangman from '../assets/img/light-hangman.svg'

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
                <button className={`${isDarkMode ? 'btn-dark' : 'btn-light'} `}>Languages</button>
                <button onClick={openModal} className={`${isDarkMode ? 'btn-dark' : 'btn-light'} `}>Settings</button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className=" relative bg-white p-6 rounded-lg">
                        <p className="mb-4 text-center">Toggle Dark Mode</p>
                        <button onClick={toggleDarkMode} className={`${isDarkMode ? 'btn-light' : 'btn-dark'}`}>
                            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        </button>
                        <button onClick={closeModal} className="absolute top-[-8px] right-[-8px]">
                            <span className='w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center'><span className={`fa-solid fa-x ${isDarkMode ? 'text-primary' : 'text-orange-500'}`}></span></span>
                        </button>
                    </div>
                </div>
            )}

        </section>
    )
}