const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]

const HEBREW_KEYS = [
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    "כ",
    "ך",
    "ל",
    "מ",
    "ם",
    "נ",
    "ן",
    "ס",
    "ע",
    "פ",
    "ף",
    "צ",
    "ץ",
    "ק",
    "ר",
    "ש",
    "ת",
]

type KeyboardProps = {
    isDisabled?: boolean
    isHebrew: boolean
    isDarkMode: boolean
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
}


export function Keyboard({ isDisabled = false, isHebrew, isDarkMode, activeLetters, inactiveLetters, addGuessedLetter }
    : KeyboardProps) {
    const lang = isHebrew ? HEBREW_KEYS.slice().reverse() : KEYS

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
            gap: ".5rem",
        }}>
            {lang.map(key => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                return (
                    <button
                        className={`key 
                        ${isDarkMode
                                ? 'border-primary text-primary hover:bg-sky-600 hover:text-light focus:bg-light active:bg-sky-600 active:text-white'
                                : 'border-secondary text-secondary hover:bg-orange-200 focus:bg-secondary-light active:bg-pink-500 active:text-secondary-light'}
                         ${isActive ? isDarkMode ? 'bg-light text-sky-600' : 'bg-pink-100' : ''}
                         ${isInactive ? 'opacity-5' : ''}`
                        }
                        onClick={() => addGuessedLetter(key)}
                        disabled={isInactive || isActive || isDisabled}
                        key={key}
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    )
}