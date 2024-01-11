type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    isDarkMode: boolean
    reveal?: boolean
}

export function HangmanWord({ guessedLetters, wordToGuess, isDarkMode, reveal = false }:
    HangmanWordProps) {

    return (
        <div className="flex gap-1 text-8xl font-bold uppercase">
            {wordToGuess.split('').map((letter, idx) => (
                <span className={`m-2 border-b-[.1em] ${isDarkMode ? 'border-light' : 'border-secondary-light'}`} key={idx}>
                    <span style={{
                        visibility: guessedLetters.includes(letter.toLowerCase()) || reveal
                            ? "visible"
                            : "hidden",
                        color: isDarkMode
                            ? !guessedLetters.includes(letter) && reveal ? 'red' : 'rgb(248 237 255)'
                            : !guessedLetters.includes(letter) && reveal ? 'rgb(236 72 153)' : 'black'
                    }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    )
}