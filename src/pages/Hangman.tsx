import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import words from "../services/wordList.json"
import hebrewWords from "../services/hebrewList.json"
import { Keyboard } from "../components/Keyboard";
import { HangmanDrawing } from "../components/HangmanDrawing";
import { HangmanWord } from "../components/HangmanWord";
import { SettingsModal } from "../components/SettingsModal";

type HangmanProps = {
  isHebrew: boolean
  isDarkMode: boolean
  setDarkMode: (value: boolean) => void
}

export function Hangman({ isHebrew, isDarkMode, setDarkMode }: HangmanProps) {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  const [isModalOpen, setModalOpen] = useState(false)

  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))
  const isLoser = incorrectLetters.length >= 6
  const navigate = useNavigate()

  useEffect(() => {
    const keydownHandler = (ev: KeyboardEvent) => {
      const key = ev.key;
  
      if (!key.match(/^[a-zA-Zא-ת]$/)) return;
  
      ev.preventDefault();
      addGuessedLetter(key);
    };
  
    document.addEventListener("keydown", keydownHandler);
  
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [guessedLetters]);
  

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
    if (isHebrew) return hebrewWords[Math.floor(Math.random() * hebrewWords.length)]
    else return words[Math.floor(Math.random() * words.length)]
  }

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function toggleDarkMode() {
    setDarkMode(!isDarkMode)
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

      <button onClick={navigateHome} className={`btn absolute left-5 top-8 ${isDarkMode ? 'btn-dark' : 'btn-light'}`}><span className="fa-solid fa-arrow-left  mx-1"></span> Go Back</button>
      <button onClick={openModal} className={`btn absolute left-5 top-24 ${isDarkMode ? 'btn-dark' : 'btn-light'}`}> <span className="fa-solid fa-gears mx-1"></span> Settings</button>

      <div className={`text-3xl text-center ${isDarkMode ? 'text-primary' : 'text-pink-500'} `}>
        {isWinner && "Winner! - Good job, \"Enter\" to play again"}
        {isLoser && "Nice try! \"Enter\" to play again"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} isDarkMode={isDarkMode} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} isHebrew={isHebrew} isDarkMode={isDarkMode} reveal={isLoser} />

      <div className="self-stretch">
        <Keyboard
          isDisabled={isWinner || isLoser}
          isHebrew={isHebrew}
          isDarkMode={isDarkMode}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>

      {isModalOpen && (
        <SettingsModal
          isModalOpen={isModalOpen}
          onCloseModal={closeModal}
          onToggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      )}

    </div>
  )
}

