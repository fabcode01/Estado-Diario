import { ObjectHTMLAttributes, useEffect, useState } from "react";
import Estados from "../data/estados";
import EstadoModel from "@/modelos/EstadoModel";
import Cabecalho from "@/componentes/Cabecalho";
import Palpites from "@/componentes/Palpites";
import Input from "@/componentes/Input";
import Head from "next/head";
import { redirect } from "next/navigation";

export function getStaticProps() {
  // Transforma o objeto em array

  const TodosEstados: any[] = [];
  const ListaDeNomesEstado: string[] = [] 


  Estados.map((estado: any) => {
    TodosEstados.push(estado);
    ListaDeNomesEstado.push(estado.nome)
  });


  // Escolhe um estado aleatorio
  const estadoAleatorio = TodosEstados[Math.floor(Math.random() * 27)];

  

 
    


  return {
    // Pegar um estado aleatorio todo dia
    props: {
      todosEstados: ListaDeNomesEstado,

      estadoEscolhido: estadoAleatorio.nome,
      habitantes: estadoAleatorio.habitantes,
      tempMedia: estadoAleatorio.mediaTemperatura
    },

    revalidate: 30,
  };
}

export default function Game(props: any) {
  const [nomeDoEstado, setNomeDoEstado] = useState<EstadoModel>(
    new EstadoModel(props.estadoEscolhido, props.habitantes, props.tempMedia)
  );

  const [temaAtual, setTemaAtual] = useState("");

  const [ListaDePalpites, setListaDePalpites] = useState<Array <Object>>([]);


  // Controle de sessão max: 1h
  setInterval(() => {
    window.location.href = "/";
  }, 3600000);

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
  useEffect(() => {
    forcarReinizializacao();
  }, []);

  function mudarTema() {
    if (temaAtual == "") {
      setTemaAtual("dark");
    } else if (temaAtual == "dark") {
      setTemaAtual("");
    }
  }


  function palpite(palpite: any[]) {

    const palpites:any[] = []

    if(palpite[0].nome == nomeDoEstado.NomeDoEstadoGET){

     window.location.href = '/acertou'

    }else{

      palpites.push({nome: palpite[0].nome, habitantes: palpite[0].habitantes, temperatura: palpite[0].mediaTemperatura})
      setListaDePalpites(prevPalpites => [...prevPalpites, ...palpites])
    }

    
    
    
  
  }

  return (
    <div className={temaAtual}>
      <Head>
        <title>Estado Díario</title>
      </Head>

      {/* <p>{nomeDoEstado.NomeDoEstadoGET}</p>
      <p>{nomeDoEstado.habitantes}</p>
      <p>{nomeDoEstado.temperaturaMedia}</p> */}

      <div
        className="
        bg-slate-100 h-screen
        dark:bg-slate-800
        
          "
      >
        <Cabecalho
          temaAtual={temaAtual}
          mudarTema={mudarTema}
        />

        <Palpites habitantes={nomeDoEstado.habitantes} mediaTemperatura={nomeDoEstado.temperaturaMedia} listaDePalpites={ListaDePalpites}/>

        <Input
          palpite={palpite}
          todosEstados={props.todosEstados}
        />
      </div>
    </div>
  );
}
