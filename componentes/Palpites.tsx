import { setaBaixo, setaCima } from "@/icons/icons"
import { useEffect, useRef } from "react"

interface PalpiteProps {
    listaDePalpites: any[]
    habitantes: number
    mediaTemperatura: number
   
}


export default function(props: PalpiteProps){
    const ultimoPalpite = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        ultimoPalpite.current?.scrollIntoView()
        
    },[props.listaDePalpites])
    return (
        <div className="
        mt-12 
        h-[460px] overflow-auto p-2 scroll-auto
        shadow-inner
        ">
            <div id="teste">
               
                {props.listaDePalpites.map((palpite, i)=>(
                    <ul key={i} className="">
                    <div className="flex gap-2 p-5">
                        <li className="text-xl text-blue-800 dark:text-blue-100">{i+1}</li>
                        <li className="dark:text-blue-200">{palpite.nome}</li>
                    </div>
                            <div className="flex gap-3 items-center justify-around">
                                <li className="w-10">{props.habitantes > palpite.habitantes ? setaBaixo : setaCima}</li>
                                <li className="w-10">{props.mediaTemperatura > palpite.temperatura ? setaBaixo : setaCima}</li>
                            </div>
                    </ul>

                ))}
               
              
            </div>
           
                        <div ref={ultimoPalpite}></div>

        </div>
    )
}