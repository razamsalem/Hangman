type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    isDarkMode: boolean
    lang: string
    reveal?: boolean
}

export function HangmanWord({ guessedLetters, wordToGuess, lang, isDarkMode, reveal = false }:
    HangmanWordProps) {
    const displayWord = lang === 'he'
        ? wordToGuess.split('').reverse().join('')
        : wordToGuess;

    return (
        <div className="flex gap-1 text-8xl font-bold uppercase">
            {displayWord.split('').map((letter, idx) => (
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