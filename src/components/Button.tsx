import type { ButtonComponentProps } from "../types/types";

// Reusable button component with pink theme
export default function Button({text, ...props}:ButtonComponentProps){
    return(
        <button 
            {...props} 
            className="bg-pink-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-pink-700 text-sm md:text-base cursor-pointer"
        >
            {text}
        </button>
    )
}