import { SmallButton } from "./SmallButton";

export function ButtonCombo(){
    return (
        <div className="flex flex-nowrap justify-center">
            <SmallButton label="✓"/>
            <SmallButton label="+"/>
            <SmallButton label="-"/>
        </div>
    )
}