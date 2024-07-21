interface PalpiteProps {
    listaDePalpites: any[]
    habitantes: number
    mediaTemperatura: number
}


export default function(props: PalpiteProps){
    

    return (
        <div className="
        mt-12 h-80
        
        ">
            <div>
                {props.listaDePalpites.map((palpite, i)=>(
                    <ul key={i} className="flex gap-3">
                        <li>{palpite.nome}</li>
                        <li>{props.habitantes > palpite.habitantes ? 'Menos' : 'Mais'}</li>
                        <li>{palpite.temperatura}°C</li>
                    </ul>

                ))}
               
              
            </div>
           

        </div>
    )
}