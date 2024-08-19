import { ObjectHTMLAttributes, useContext, useEffect, useState } from "react";
import Estados from "../data/estados";
import EstadoModel from "@/modelos/EstadoModel";
import Cabecalho from "@/componentes/Cabecalho";
import Palpites from "@/componentes/Palpites";
import Input from "@/componentes/Input";
import Head from "next/head";
import { TemaContext } from "@/context/TemaContext";


export async function getStaticProps() {
  const BASE_URL = '/api'

  // Transforma o objeto em array

  const TodosEstados: any[] = [];
  const ListaDeNomesEstado: string[] = [];

  Estados.map((estado: any) => {
    TodosEstados.push(estado);
    ListaDeNomesEstado.push(estado.nome);
  });


  const dataAtual = new Date();
  const horarioBrasilia = new Date(
    dataAtual.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );
  
  const diaBrasilia = horarioBrasilia.getDate();
  
  
  async function fetchEstado(){
    const res = await fetch(`${BASE_URL}/estadoProvider`)
    const json = await res.json()

    return json;
    
  }


  const estado = await fetchEstado()




  return {
    // Pegar um estado aleatorio todo dia
    props: {
      todosEstados: ListaDeNomesEstado,
      estadoEscolhido: estado.nome,
      habitates: estado.habitantes,
      tempMedia: estado.mediaTemperatura,
      dia: diaBrasilia,
      acertou: false
    },

    revalidate: 86400

  };
}

export default function Game(props: any) {

  
  const [nomeDoEstado, setNomeDoEstado] = useState<EstadoModel>(
    new EstadoModel(props.estadoEscolhido, props.habitantes, props.tempMedia)
  );
  
  const [ListaDePalpites, setListaDePalpites] = useState<Array<Object>>([]);
  
  const [desabilitarInput, setDesabilitarInput] = useState<boolean>(false)
  
  const [respostaCerta, setRespostaCerta] = useState<string | null>(null)

  useEffect(() => {
    const lastUpdate = localStorage.getItem('lastUpdate');

    if (lastUpdate != props.dia) {
      localStorage.setItem('lastUpdate', props.dia);
      localStorage.removeItem('acertou');
      localStorage.removeItem('palpites');
    }
  }, [props.estadoEscolhido]);

  // Forcar recarregamento para manter dados atualizados
  function forcarReinizializacao() {
    if (!sessionStorage.getItem("reloadedTwice")) {
      // Inicializa o contador de recarregamento
      let reloadCount: any = sessionStorage.getItem("reloadCount") || 0;
      reloadCount++;
      sessionStorage.setItem("reloadCount", reloadCount);

      // Se recarregar menos de duas vezes, recarrega a página
      if (reloadCount < 4) {
        window.location.reload();
      } else {
        // Marca que a página já foi recarregada duas vezes
        sessionStorage.setItem("reloadedTwice", "true");
      }
    }
  }



  function palpite(palpite: any[]) {

    const palpites: any[] = []

    if (palpite[0].nome == nomeDoEstado.NomeDoEstadoGET) {


        localStorage.setItem('acertou', 'true')
        nomeDoEstado.RespostaCerta()
        setRespostaCerta(nomeDoEstado.NomeDoEstadoGET)
        setDesabilitarInput(true)
        localStorage.removeItem('palpites')
        

    } else {
      palpites.push({
        nome: palpite[0].nome,
        habitantes: palpite[0].habitantes,
        temperatura: palpite[0].mediaTemperatura,
      });

      localStorage.setItem('palpites', JSON.stringify(ListaDePalpites))
      setListaDePalpites((prevPalpites) => [...prevPalpites, ...palpites]);

      
    }

  }

 useEffect(()=>{
    if(localStorage.getItem('acertou') === 'true'){

        nomeDoEstado.RespostaCerta()
        setRespostaCerta(nomeDoEstado.NomeDoEstadoGET)
        setDesabilitarInput(true)

      

    }else{

      if(localStorage.getItem('palpites')){
  
        const palpitesSalvos = localStorage.getItem('palpites')
        palpitesSalvos && setListaDePalpites(JSON.parse(palpitesSalvos))
         
      }else{
        localStorage.setItem('palpites', `${ListaDePalpites}`)
      }

    }
    
    forcarReinizializacao()
 },[])







  const { tema } = useContext(TemaContext);

  return (
    <div className={tema}>
        <div
          className={`
            flex justify-center
            overflow-auto
             bg-slate-100
             dark:bg-slate-800`}
        >
          <Head>
            <title>Estado Díario</title>
          </Head>
          {/* <p>{nomeDoEstado.NomeDoEstadoGET}</p>
          <p>{nomeDoEstado.habitantes}</p>
          <p>{nomeDoEstado.temperaturaMedia}</p> */}
          <div
            className="
            bg-slate-100
            dark:bg-slate-800
            w-full h-screen
            max-w-[580px]
        
        
              "
          >
            <Cabecalho />
            <Palpites
              habitantes={nomeDoEstado.habitantes}
              mediaTemperatura={nomeDoEstado.temperaturaMedia}
              listaDePalpites={ListaDePalpites}
              respostaCerta={respostaCerta}
            />
           
            <Input
              palpite={palpite}
              todosEstados={props.todosEstados}
              desabilitar={desabilitarInput}
              listaDePalpites={ListaDePalpites}
            />
          </div>
        </div>
      
    </div>
  );
}
