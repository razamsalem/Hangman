import { useCallback, useEffect, useState } from "react";
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

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return

    setGuessedLetters(currLetters => [...currLetters, letter])
  }, [guessedLetters, isWinner, isLoser])


  return (
    <div className="max-w-screen-md	mx-auto flex flex-col gap-8 items-center font-mono">

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

