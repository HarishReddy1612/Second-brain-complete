import { ReactElement } from "react";

interface ButtonInterface {
    text: string;
    startIcon?: ReactElement;
    variant: "primary" | "secondary";
    onClick?:()=> void
}



const variantStyles = {
    "primary": "bg-purple-500 text-white",
    "secondary": "bg-purple-200 text-purple-600",
}

const defaultStyles="px-4 py-2  rounded-md font-light  flex items-center"

export function Button({variant, text, startIcon ,onClick}: ButtonInterface) {
    return <button onClick={onClick} className={variantStyles[variant] + " " + defaultStyles } >
    <div className="pr-2">
        {startIcon}
    </div>
     {text}  
    </button>
}