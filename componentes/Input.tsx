import { enviarPalpiteIcon } from "@/icons/icons"
import { useEffect, useState } from "react"

interface InputProps{
    palpite: () => void
    todosEstados: any
}

export default function Input(props: InputProps){
    const[estadoInput, setEstadoInput] = useState('')

   const[todosEstados, setTodosEstados] = useState<[]>(props.todosEstados)

   const[sugestao, setSugestao] = useState([])
    

    function ResponderPalpite(e: any){
        e.preventDefault()
    }

  


    function sugestoes(){

        const filtradas:[] = []

        todosEstados.filter((estado: any)=>{
            
            if(estado.toLowerCase().includes(estadoInput.toLowerCase())){
               filtradas.push(estado)
            }
           setSugestao(filtradas)
        })
    }


    useEffect(()=>{
        sugestoes()
        
    },[estadoInput])
 

   


   







    return (
        <div className="flex flex-col items-center w-3/4 m-auto">

        <div className="
        relative
        top-5
        overflow-hidden
        bg-white
        h-36 w-full
        border-[1px]
         rounded-[14px]
        border-black
        p-2
        pb-5
        font-light

        dark:bg-slate-600
        dark:text-slate-300
        dark:border-white
        
        ">
                <div className="overflow-auto h-full">
                    {sugestao && sugestao.map((s)=>(
                        <p className="
                        cursor-pointer
                        hover:bg-slate-200
                        dark:hover:bg-slate-800
                        
                        
                        ">{s}</p>
                    ))}
                    
                </div>
           </div>
            

            <form onSubmit={ResponderPalpite} className="
             
            
             flex
             items-center
             justify-between
             border-3
             border-black
             bg-white
             w-full
             h-[65px]
             rounded-[14px]
             border-[1px]
             z-30

             dark:bg-slate-600
            dark:text-white
            dark:border-white
             
            ">
               

                <input type="text" value={estadoInput} onChange={e=> setEstadoInput(e.target.value)} className="outline-none p-3 rounded-[14px] bg-transparent placeholder:text-slate-300" placeholder="Escolha um estado"/>

                <button className="w-8 mr-2">{enviarPalpiteIcon}</button>
                
                
            </form>

           
        </div>
    )
}