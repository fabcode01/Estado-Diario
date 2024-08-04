import { TemaContext } from "@/context/TemaContext";
import { noturnoIcon, onNoturnoIcon } from "@/icons/icons";
import { useContext } from "react";


export function MudarTema(){
    const{tema, alterarTema} = useContext(TemaContext)

    return (
        <div>
            <li className='w-7 cursor-pointer list-none' onClick={alterarTema}>{
                tema === 'light' ? noturnoIcon : onNoturnoIcon
                }</li>
        </div>
    )
}