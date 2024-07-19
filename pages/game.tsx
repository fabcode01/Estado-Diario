import { useEffect, useState } from 'react'
import Estados from '../data/estados'
import EstadoModel from '@/modelos/EstadoModel'
import Cabecalho from '@/componentes/Cabecalho'
import Palpites from '@/componentes/Palpites'
import Input from '@/componentes/Input'


export function getStaticProps(){
      // Transforma o objeto em array  
      const estadosEmArray = Object.values(Estados)


      // Escolhe um estado aleatorio
      const estadoAleatorio = estadosEmArray[Math.floor(Math.random() * estadosEmArray.length)]


      return {
        // Pegar um estado aleatorio todo dia 
        props: {
          todosEstados: estadosEmArray,
          estadoEscolhido: estadoAleatorio
        },
        
        revalidate: 30
      }



}



export default function Game(props: any) {

  // Controle de sessão max: 1h 
    setInterval(()=>{
      window.location.href = '/'
  },3600000 )

  
  // Forcar recarregamento para manter dados atualizados
    function forcarReinizializacao(){
      

        if (!sessionStorage.getItem('reloadedTwice')) {
          // Inicializa o contador de recarregamento
          let reloadCount:any = sessionStorage.getItem('reloadCount') || 0;
          reloadCount++;
          sessionStorage.setItem('reloadCount', reloadCount);

          // Se recarregar menos de duas vezes, recarrega a página
          if (reloadCount < 4) {
              window.location.reload();
          } else {
              // Marca que a página já foi recarregada duas vezes
              sessionStorage.setItem('reloadedTwice', 'true');
          }
      }
    }
    useEffect(()=>{
      forcarReinizializacao()
    },[])


    
    const[temaAtual, setTemaAtual] = useState('')
    
      function mudarTema(){
          if(temaAtual == ''){
            setTemaAtual('dark')
          }else if(temaAtual == 'dark'){
            setTemaAtual('')
          }
      }

    const[nomeDoEstado, setNomeDoEstado] = useState<EstadoModel>(new EstadoModel(props.estadoEscolhido, false))


  
    

  return (
    <div className={temaAtual}>

        <div className='
        bg-slate-100 h-screen
        dark:bg-slate-800
        
          '>

          <Cabecalho temaAtual={temaAtual} mudarTema={mudarTema}/>
          
          <Palpites/>

          <Input todosEstados={props.todosEstados} />
          
        
        
        
        </div>

    </div>
  );
}
