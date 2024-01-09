export function HangmanWord() {
    const word = 'test'

    return (
        <div className="flex gap-1 text-8xl font-bold uppercase">
            {word.split('').map((letter, idx) => (
                <span className="m-2 border-b-[.1em] border-black">
                    <span >{letter}</span>
                </span>
            ))}
        </div>
    )
}