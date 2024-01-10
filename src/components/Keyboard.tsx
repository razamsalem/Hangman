const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]


export function Keyboard() {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
            gap: ".5rem"
        }}>
            {KEYS.map(key => {
                return (
                    <button
                        className="w-full border-[3px] border-primary bg-none text-primary aspect-square text-[2.5rem] uppercase p-2 font-bold cursor-pointer transition duration-300 hover:bg-sky-300   focus:bg-light active:bg-sky-600 active:text-white"
                        key={key}
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    )
}