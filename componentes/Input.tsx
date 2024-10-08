import { enviarPalpiteIcon } from "@/icons/icons";
import { useEffect, useState } from "react";
import Estados from "@/data/estados";

interface InputProps {
  palpite: (palpite: Object[]) => void;
  todosEstados: any;
  desabilitar: boolean
  listaDePalpites: any[]
}

export default function Input(props: InputProps) {


  const [estadoInput, setEstadoInput] = useState("");
  
  const [todosEstados, setTodosEstados] = useState(props.todosEstados);
  
  const [sugestao, setSugestao] = useState([]);
  
  const[caixaDeSugestoes, setCaixaDeSugestoes] = useState<any>(null)

  
  function sugestoes() {

    const palpitesNomes = props.listaDePalpites.map((e: any) => e.nome);

    const filtradasSemPalpite = todosEstados.filter((item: string) => !palpitesNomes.includes(item));

    const filtradas = filtradasSemPalpite.filter((estado: any) =>
      estado.toLowerCase().includes(estadoInput.toLowerCase())
    );

    setSugestao(filtradas);
  }

  useEffect(()=>{
    sugestoes();
  },[estadoInput])

  useEffect(() => {
    sugestoes();
  }, [props.listaDePalpites]);
 

  function DarPalpite(e: React.FormEvent) {
    e.preventDefault();

    const palpite:Object[] = []

    Estados.filter((estado)=>{
      if(estado.nome == estadoInput){
        palpite.push(estado)
      }
    })


    props.palpite(palpite);

    // tirar item das sugestoes
    const novoArrayEstado = todosEstados.filter((item: string) => item !== estadoInput);
    setTodosEstados(novoArrayEstado);

    setEstadoInput("");
  }

  return (
    <div>
      
        <div className="flex py-20 justify-center mt-16 w-full max-w-[650px]">
      
          <div className="relative  flex flex-col items-center w-3/4 m-auto">
      
            {caixaDeSugestoes && (
              <div
              className={`
                ${props.desabilitar === false ? 'absolute' : 'hidden'}
                bottom-10
                overflow-hidden
                bg-white
                h-36 w-full
                border-[1px]
                 rounded-[14px]
                border-black
                p-2
                pb-6
                font-light
                dark:bg-slate-600
                dark:text-slate-300
                dark:border-white
      
                `}
            >
              <div className="overflow-auto h-full">
                {sugestao &&
                  sugestao.map((s, i) => (
                    <p
                      key={i}
                      className="
                                cursor-pointer
                                hover:bg-slate-200
                                dark:hover:bg-slate-800
      
      
                                "
                      onClick={() => setEstadoInput(s)}
                    >
                      {s}
                    </p>
                  ))}
              </div>
            </div>
            )}
      
            <form
              onSubmit={DarPalpite}
              className="
      
      
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
      
                    "
            >
              <input
                type="text"
                value={estadoInput}
                onChange={(e) => setEstadoInput(e.target.value)}
                onFocus={() => setCaixaDeSugestoes(1)}
                className="outline-none p-3 rounded-[14px] bg-transparent placeholder:text-slate-300"
                placeholder="Escolha um estado"
                disabled={props.desabilitar}
                required
              />
              {props.desabilitar === false ? (
                <button onClick={()=>setCaixaDeSugestoes(null)} className="w-8 mr-2">{enviarPalpiteIcon}</button>
              ) : null}
            </form>
          </div>
        </div>
    </div>
   
  );
}
