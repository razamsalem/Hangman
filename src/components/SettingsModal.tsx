import { useEffect, useRef } from "react"

type SettingsModalProps = {
  isModalOpen: boolean
  onCloseModal: () => void
  onToggleDarkMode: () => void
  isDarkMode: boolean
}

export function SettingsModal({ isModalOpen, onCloseModal, onToggleDarkMode, isDarkMode }: SettingsModalProps) {
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
            <p className="mb-4 text-center">Toggle Dark Mode</p>
            <button onClick={onToggleDarkMode} className={`${isDarkMode ? 'btn-light' : 'btn-dark'}`}>
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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

