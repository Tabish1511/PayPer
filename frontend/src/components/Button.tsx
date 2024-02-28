interface ButtonProps{
    label: string;
    onClick?: () => void;
}

export function Button(props: ButtonProps){
    return (
        <div className="mx-6 mt-4 flex justify-center">
            <button 
            onClick={props.onClick} 
            type="button" 
            className="w-full text-white bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 hover:bg-gray-700 active:ring-gray-700 active:ring-2">
            {props.label}
            </button>
        </div>
    )
}