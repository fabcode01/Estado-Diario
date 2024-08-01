import { createContext, useState } from "react";

type Tema = 'dark' | 'light'

interface TemaContextProps {
    tema: Tema
    alterarTema: () => void
    
}

export const TemaContext = createContext<TemaContextProps>({
    tema: 'dark', alterarTema: ()=>{}
})

export function TemaProvider(props: any){
    const[tema, setTema] = useState<Tema>('dark')

    function alterarTema(){
        setTema(tema === 'dark' ? 'light' : 'dark')
    }

    return (
        <TemaContext.Provider value={{tema, alterarTema}}>
            {props.children}
        </TemaContext.Provider>
    )
}