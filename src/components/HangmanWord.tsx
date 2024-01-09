type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
}

export function HangmanWord({guessedLetters, wordToGuess}: 
    HangmanWordProps) {

    return (
        <div className="flex gap-1 text-8xl font-bold uppercase">
            {wordToGuess.split('').map((letter, idx) => (
                <span className="m-2 border-b-[.1em] border-black" key={idx}>
                    <span style={{
                        visibility: guessedLetters.includes(letter.toLowerCase())
                            ? "visible"
                            : "hidden",
                    }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    )
}