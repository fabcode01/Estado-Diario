import { useContext } from 'react'
import { climaIcon, habitantesIcon, infoIcon, noturnoIcon, onNoturnoIcon, pontuacaoIcon } from '../icons/icons'
import { TemaContext } from '@/context/TemaContext'
import { MudarTema } from './MudarTema'



export default function Cabecalho(){
   const{tema, alterarTema} = useContext(TemaContext)


    return (
        <div className='dark:text-white'>
                <div className={`
                h-28 w-full
            
            
            
            flex
            items-center
            justify-around
            font-bold
            
            `}>

                <h1 className='text-xl'>Estado Diário</h1>

                <ul className='flex gap-3'>
                    <li className='w-7 cursor-pointer'>{pontuacaoIcon}</li>
                    <li className='w-7 cursor-pointer'>{infoIcon}</li>

                    <MudarTema/>
                   

                    
                    
                </ul>
                
                </div>

                <div className='mt-10'>
                    <ul className='flex justify-evenly'>

                        <div className='flex flex-col items-center'>
                            <li className='w-14 dark:text-blue-400'>{habitantesIcon}</li>
                            <p>Habitantes</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <li className='w-14 dark:text-blue-400'>{climaIcon}</li>
                            <p>Temperatura Média</p>
                        </div>
                        
                    </ul>

                </div>
        </div>
    )
}