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
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {props.label}
            </button>
        </div>
    )
}