import { correctIcon, setaBaixo, setaCima } from "@/icons/icons"
import { useEffect, useRef, useState } from "react"



interface PalpiteProps {
    listaDePalpites: any[]
    habitantes: number
    mediaTemperatura: number
    respostaCerta: string | null
   
}


export default function(props: PalpiteProps){
  


   
    // auto scrolar pro ultimo palpite
    const ultimoPalpite = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        ultimoPalpite.current?.scrollIntoView()
        
    },[props.listaDePalpites])


    function renderLista(){
        return (
            <div>
                <div className={`
                    
                    mt-5
                    h-[150px]
                    border-2 border-red-400
                    min-h-[320px] overflow-auto p-2 scroll-auto
                   
                
                
                
                    `}>
                        <div>
                
                            {props.listaDePalpites?.map((palpite, i)=>(
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
            </div>
        )
    }

    function renderConcluido(){
        return (
            <div className={`
                flex flex-col items-center text-black dark:text-white mt-14 gap-x-5
            `}>
                
                <div className="flex items-center">
                    <p className="w-10 text-green-500">{correctIcon}</p>
                    <h1 className="text-4xl">{props.respostaCerta}</h1>
                </div>
    
                <div className="flex flex-col items-center mt-10">
                    <h1>Parabéns, você acertou!</h1>
                    <p>Volte amanhã</p>
                </div>
            </div>
        )
    }


    
    return props.respostaCerta ? (
        renderConcluido()
    ):(
        renderLista()
    )
}