import darkModeHangman from '../assets/img/dark-hangman.svg'

export function Home() {

    return (
        <section>
            <div className="text-center text-4xl font-regular py- ">
                <h1 className="pt-14 " >Hangman</h1>
                <p className="py-4 font-thin">The classic word game</p>
            </div>

            <div className='w-max mx-auto'>
                <img src={darkModeHangman} alt="Hangman image" />
            </div>

            <div className='flex flex-col items-center space-y-6'>
                <button className='btn mt-7 mb-0'>Play</button>
                <button className='btn'>Languages</button>
                <button className='btn'>Settings</button>
            </div>

        </section>
    )
}