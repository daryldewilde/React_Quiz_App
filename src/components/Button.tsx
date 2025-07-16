


export default function Button(props:any){
    return(
        <button type="submit" className="bg-pink-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-pink-700 text-sm md:text-base">
            {props.text}
        </button>
    )
}