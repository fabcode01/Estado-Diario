import { useEffect, useState } from 'react'
import Estados from '../data/estados'
import EstadoModel from '@/modelos/EstadoModel'


export function getStaticProps(){
      // Transforma o objeto em array  
      const estadosEmArray = Object.values(Estados)


      // Escolhe um estado aleatorio
      const estadoAleatorio = estadosEmArray[Math.floor(Math.random() * estadosEmArray.length)]


      return {
        // Pegar um estado aleatorio todo dia 
        revalidate: 300,
        props: {
          estadoEscolhido: estadoAleatorio
        }
      }

}



export default function Home(props: any) {

    const[nomeDoEstado, setNomeDoEstado] = useState<EstadoModel>(new EstadoModel(props.estadoEscolhido, false))

    const[inputResposta, setInputResposta] = useState<string>()


    function respostaFornecida(e: any){
      e.preventDefault()

      if(inputResposta == nomeDoEstado.NomeDoEstadoGET){
          setNomeDoEstado(nomeDoEstado.RespostaCerta())
      }
    }



  return (
    <>
      <p>{nomeDoEstado.NomeDoEstadoGET}</p>
      

      <form className='bg-gray-300' onSubmit={respostaFornecida}>

          <input type="text" className='border-2' onChange={e => setInputResposta(e.target.value)}/>

          <input type="submit" value="responder" />
      </form>


      <div
      className='bg-green'
      >{nomeDoEstado.acertou ? <p>Acertou</p> : ''}</div>

      
    </>
  );
}
