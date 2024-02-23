interface SmallButtonProps{
    id?: number;    // REMOVE THE '?'
    label: string;
    onClick?: () => void;
}

export function SmallButton(props: SmallButtonProps){

    return (
        <div className="mx-1 my-0.5">
            <button
            // onClick={props.onClick}
            onClick={props.onClick}
            type="button" 
            className="h-14 w-14 bg-gray-800 text-white rounded-lg text-base font-medium hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {props.label}
            </button>
        </div>
    )
}