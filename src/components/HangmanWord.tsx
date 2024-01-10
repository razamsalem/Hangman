type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
}

export function HangmanWord({ guessedLetters, wordToGuess, reveal = false }:
    HangmanWordProps) {

    return (
        <div className="flex gap-1 text-8xl font-bold uppercase">
            {wordToGuess.split('').map((letter, idx) => (
                <span className="m-2 border-b-[.1em] border-light" key={idx}>
                    <span style={{
                        visibility: guessedLetters.includes(letter.toLowerCase()) || reveal
                            ? "visible"
                            : "hidden",
                        color: !guessedLetters.includes(letter) && reveal ? 'red' : 'rgb(248 237 255)'
                    }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    )
}