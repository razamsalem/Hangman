import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { SettingsModal } from "../components/SettingsModal";
import { HangmanDrawing } from "../components/HangmanDrawing";
import { HangmanWord } from "../components/HangmanWord";
import { Keyboard } from "../components/Keyboard";

import words from "../services/wordList.json"
import hebrewWords from "../services/hebrewList.json"
import winSound from '../assets/sound/win.mp3'
import loseSound from '../assets/sound/lose.mp3'
import dingSound from '../assets/sound/ding.mp3'
import keySound from '../assets/sound/keySound.mp3'
import gameKeySound from '../assets/sound/gameKey.mp3'


type HangmanProps = {
  lang: string
  isDarkMode: boolean
  setDarkMode: (value: boolean) => void
}

export function Hangman({ lang, isDarkMode, setDarkMode }: HangmanProps) {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  const [isModalOpen, setModalOpen] = useState(false)

  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))
  const isLoser = incorrectLetters.length >= 6
  const navigate = useNavigate()
  const { t } = useTranslation();

  useEffect(() => {
    const keydownHandler = (ev: KeyboardEvent) => {
      const key = ev.key;

      if (!key.match(/^[a-zA-Zא-ת]$/)) return;

      ev.preventDefault()
      addGuessedLetter(key)
      playKeySound()
    }

    document.addEventListener("keydown", keydownHandler)

    return () => {
      document.removeEventListener("keydown", keydownHandler)
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

  useEffect(() => {
    if (isWinner) {
      playWinSound()
    }

    if (isLoser) {
      playLoseSound()
    }

  }, [isWinner, isLoser])

  function getWord() {
    if (lang === 'he') return hebrewWords[Math.floor(Math.random() * hebrewWords.length)]
    else return words[Math.floor(Math.random() * words.length)]
  }

  function playWinSound() {
    const audio = new Audio(winSound)
    audio.play()
  }

  function playLoseSound() {
    const audio = new Audio(loseSound)
    audio.play()
  }

  function playBtnSound() {
    const audio = new Audio(keySound)
    audio.play()
  }

  function playKeySound() {
    const audio = new Audio(gameKeySound)
    audio.play()
  }

  function playDingSound() {
    const audio = new Audio(dingSound)
    audio.play()
  }

  function openModal() {
    setModalOpen(true)
    playBtnSound()
  }

  function closeModal() {
    setModalOpen(false)
  }

  function toggleDarkMode() {
    setDarkMode(!isDarkMode)
  }

  function navigateHome() {
    navigate('/')
    playBtnSound()
  }

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return

    setGuessedLetters(currLetters => [...currLetters, letter])

    if (wordToGuess.includes(letter)) {
      playDingSound()
    }
  }, [guessedLetters, isWinner, isLoser, wordToGuess])


  return (
    <div className="max-w-screen-md	mx-auto flex flex-col gap-8 items-center font-mono">

      <button onClick={navigateHome} className={`btn absolute left-5 top-8 ${isDarkMode ? 'btn-dark' : 'btn-light'}`}><span className="fa-solid fa-arrow-left  mx-1"></span> {t('game.back')}</button>
      <button onClick={openModal} className={`btn absolute left-5 top-24 ${isDarkMode ? 'btn-dark' : 'btn-light'}`}> <span className="fa-solid fa-gears mx-1"></span> {t('buttons.settings')}</button>

      <div className={`text-3xl text-center ${isDarkMode ? 'text-primary' : 'text-pink-500'} `}>
        {isWinner && t('game.win')}
        {isLoser && t('game.lose')}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} isDarkMode={isDarkMode} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} lang={lang} isDarkMode={isDarkMode} reveal={isLoser} />

      <div className="self-stretch">
        <Keyboard
          isDisabled={isWinner || isLoser}
          lang={lang}
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

