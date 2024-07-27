import { setaBaixo, setaCima } from "@/icons/icons";
import Link from "next/link";


export default function Tutorial(){
    return (
        <div className="
        h-screen 
        flex
        flex-col
        items-center
        p-7
        gap-y-10
        w-full
        max-w-[660px]
        m-auto
        ">
            <h1 className='text-xl'>Estado Diário</h1>
            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="font-bold">Objetivo</h1>
                    <p className="text-xl">Adivinhe o Estado que escondemos todo dia. Siga as dicas para adivinhar no menor número de palpites possível.</p>
                </div>

                <div>
                    <h1 className="font-bold">Dicas</h1>
                    <ul className="flex flex-col gap-10 mt-6">
                        <div className="flex gap-4">
                            <li className="w-9">{setaCima}</li>
                            <p>O dado do estado que você deu o palpite é <strong>MAIOR</strong> do que o estado que escondemos. </p>
                        </div>
                        <div className="flex gap-4">
                            <li className="w-9">{setaBaixo}</li>
                            <p>O dado do estado que você deu o palpite é <strong>MENOR</strong> do que o estado que escondemos. </p>
                        </div>
                    </ul>
                </div>

                <div className="flex justify-center">
                    <Link href={'/game'}>
                        
                        <p className="flex border pr-7 pl-7 pt-3 pb-3 rounded-lg border-black hover:bg-slate-200">Jogar</p>
                    </Link>
                </div>

                    

            </div>
            
        </div>
    )   
}