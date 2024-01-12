import { useEffect, useRef } from "react"

type LangModalProps = {
  isModalOpen: boolean
  onCloseModal: () => void
  onToggleLang: () => void
  isDarkMode: boolean
  isHebrew: boolean
}

export function LangModal({ isModalOpen, onCloseModal, onToggleLang, isDarkMode, isHebrew }: LangModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

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
          <div ref={modalRef} className="relative bg-white p-6 rounded-lg">
            <p className="mb-4 text-center">Select Language</p>
            <button onClick={onToggleLang} className={`${isDarkMode ? 'btn-dark' : 'btn-light'}`}>
              {isHebrew ? 'Switch to English' : 'Switch to Hebrew'}
            </button>
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

