import { createContext, useEffect, useState } from "react";


interface TemaContextProps {
    tema: string 
    alterarTema: () => void
    
}


export const TemaContext = createContext<TemaContextProps>({
    tema: 'dark', alterarTema: ()=>{}
})

export function TemaProvider(props: any){

    const[tema, setTema] = useState('light')
    

    function alterarTema(){
        const novoTema = tema === 'dark' ? 'light' : 'dark'
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(()=>{
        if(!localStorage.getItem('tema')){
            localStorage.setItem('tema', tema)
        }

        const temaSalvo = localStorage.getItem('tema')

        temaSalvo && setTema(temaSalvo)
        

    },[])
    

    return (
        <TemaContext.Provider value={{tema, alterarTema}}>
            {props.children}
        </TemaContext.Provider>
    )
}