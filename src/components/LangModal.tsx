import { useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next'
import israelFlag from '../assets/img/flag-of-Israel.png'
import ukFlag from '../assets/img/flag-of-United-Kingdom.png'

type LangModalProps = {
  isModalOpen: boolean
  onCloseModal: () => void
  onHebrewLang: () => void
  onEnglishLang: () => void
  isDarkMode: boolean
}

export function LangModal({ isModalOpen, onCloseModal, onHebrewLang, onEnglishLang, isDarkMode}: LangModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCloseModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    };
  }, [isModalOpen, onCloseModal])

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div ref={modalRef} className="relative bg-slate-200 p-6 rounded-lg">
            <p className="mb-4 text-center">{t('modals.selectLang')}</p>

            <div className="flex gap-4">
              <img className="flag w-32" onClick={onHebrewLang} src={israelFlag} alt="Israel flag" />
              <img className="flag w-32" onClick={onEnglishLang} src={ukFlag} alt="United Kingdom flag" />
            </div>

            <button onClick={onCloseModal} className="absolute top-[-8px] right-[-8px]">
              <span className='w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center'>
                <span className={`fa-solid fa-x ${isDarkMode ? 'text-primary' : 'text-orange-500'}`}></span>
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

