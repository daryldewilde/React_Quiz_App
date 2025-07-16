


export default function Button(props:any){
    return(
        <button type="submit" className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700">
            {props.text}
        </button>
    )
}