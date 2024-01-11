type HangmanDrawingProps = {
    numberOfGuesses: number
    isDarkMode: boolean
}

export function HangmanDrawing({ numberOfGuesses, isDarkMode }:
    HangmanDrawingProps) {

        const HEAD = (
            <div className={`
              w-12 h-12 
              rounded-full
              border-8 border-solid ${isDarkMode ? 'border-light' : 'border-secondary-light'} 
              absolute top-12 right-[-20px]
            `}/>
          );
          
          const BODY = (
            <div className={`
              w-2.5 h-24 
              ${isDarkMode ? 'bg-light' : 'bg-secondary-light'} 
              absolute top-24 right-0
            `}/>
          );
          
          const RIGHT_ARM = (
            <div className={`
              w-24 h-2.5 
              ${isDarkMode ? 'bg-light' : 'bg-secondary-light'} 
              absolute top-32 right-[-96px]
              rotate-[-30deg]
              origin-bottom-left
            `}/>
          );
          
          const LEFT_ARM = (
            <div className={`
              w-24 h-2.5 
              ${isDarkMode ? 'bg-light' : 'bg-secondary-light'} 
              absolute top-32 right-2.5
              rotate-[30deg]
              origin-bottom-right
            `}/>
          );
          
          const RIGHT_LEG = (
            <div className={`
              w-24 h-2.5 
              ${isDarkMode ? 'bg-light' : 'bg-secondary-light'} 
              absolute top-44 right-[-86px]
              rotate-[60deg]
              origin-bottom-left
            `}/>
          );
          
          const LEFT_LEG = (
            <div className={`
              w-24 h-2.5 
              ${isDarkMode ? 'bg-light' : 'bg-secondary-light'} 
              absolute top-44 right-0
              rotate-[-60deg]
              origin-bottom-right
            `}/>
          );
          
          const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

    return (
        <div className="relative">
            {BODY_PARTS.slice(0, numberOfGuesses)}
            <div className={`h-12 w-2.5 absolute top-0 right-0 ${isDarkMode ? 'bg-primary' : 'bg-secondary'}`} />
            <div className={`h-2.5 w-52 ml-32 ${isDarkMode ? 'bg-primary' : 'bg-secondary'}`} />
            <div className={`h-96 w-2.5 ml-32 ${isDarkMode ? 'bg-primary' : 'bg-secondary'}`} />
            <div className={`h-2.5 w-64 ${isDarkMode ? 'bg-primary' : 'bg-secondary'}`} />
        </div>
    )
}
