import { useEffect, useState } from "react";
import words from "./wordList.json"
// import './index.css'

import { Keyboard } from "./components/Keyboard";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanWord } from "./components/HangmanWord";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter =>
    !wordToGuess.includes(letter)
  )

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      const key = ev.key

      if (!key.match(/^[a-zA-Z]$/)) return

      ev.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  function addGuessedLetter(letter: string) {
    if (guessedLetters.includes(letter)) return

    setGuessedLetters(currLetters => [...currLetters, letter])
  }

  return (
    <div className="max-w-screen-md	mx-auto flex flex-col gap-8 items-center font-mono">
      <div className="text-3xl text-center text-lighter">Lose Win</div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div className="self-stretch">
        <Keyboard />
      </div>
    </div>
  )
}

export default App
