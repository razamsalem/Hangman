import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    heading: {
                        header: "Hangman",
                        subtitle: "The classic word game"
                    },
                    buttons: {
                        play: 'Play',
                        languages: 'Languages',
                        settings: 'Settings',
                    },
                    modals: {
                        selectLang: 'Select Language',
                        selectMode: 'Toggle Dark Mode',
                        toggleLightMode: 'Switch to Light Mode',
                        toggleDarkMode: 'Switch to Dark Mode',
                    },
                    game: {
                            back: 'Go Back',
                            win: 'Winner! - Good job, \"Enter\" to play again',
                            lose: 'Nice try... \"Enter\" to play again',
                    },
                    footer: {
                        credit: 'Made by Raz Amsalem'
                    }
                }
            },
            he: {
                translation: {
                    heading: {
                        header: "איש תלוי",
                        subtitle: "משחק המילים האהוב"
                    },
                    buttons: {
                        play: 'שחק',
                        languages: 'שפות',
                        settings: 'הגדרות',
                    },
                    modals: {
                        selectLang: 'בחר שפה',
                        selectMode: 'ערכות נושא',
                        toggleLightMode: 'שנה למצב יום',
                        toggleDarkMode: 'שנה למצב לילה',
                    },
                    game: {
                            back: 'חזור',
                            win: 'כל הכבוד ניצחת! לחץ "אנטר" כדי להמשיך',
                            lose: 'לא נורא...לחץ "אנטר" כדי להמשיך',
                    },
                    footer: {
                        credit: 'נוצר על ידי רז אמסלם'
                    }
                }
            }
        }
    });

export default i18n;