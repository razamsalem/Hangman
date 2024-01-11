import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import words from "../wordList.json"
import { Keyboard } from "../components/Keyboard";
import { HangmanDrawing } from "../components/HangmanDrawing";
import { HangmanWord } from "../components/HangmanWord";

export function Hangman() {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))
  const isLoser = incorrectLetters.length >= 6
  const navigate = useNavigate()

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
  }, [guessedLetters])

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      const key = ev.key

      if (key !== "Enter") return

      ev.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  function getWord() {
    return words[Math.floor(Math.random() * words.length)]
  }

  function navigateHome() {
    navigate('/')
  }

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return

    setGuessedLetters(currLetters => [...currLetters, letter])
  }, [guessedLetters, isWinner, isLoser])


  return (
    <div className="max-w-screen-md	mx-auto flex flex-col gap-8 items-center font-mono">

      <button onClick={navigateHome} className='btn absolute left-5 top-8'><span className="fa-solid fa-arrow-left  mx-1"></span> Go Back</button>
      <button className='btn absolute left-5 top-24'> <span className="fa-solid fa-gears mx-1"></span> Settings</button>

      <div className="text-3xl text-center text-lighter">
        {isWinner && "Winner! - Good job, \"Enter\" to play again"}
        {isLoser && "Nice try! \"Enter\" to play again"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} reveal={isLoser} />

      <div className="self-stretch">
        <Keyboard
          isDisabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>

    </div>
  )
}

