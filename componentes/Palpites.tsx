interface PalpiteProps {
    listaDePalpites: string[]
}


export default function(props: PalpiteProps){


    return (
        <div className="
        mt-12 h-80
        
        ">
            <div>
                {props.listaDePalpites.map((palpite)=>(
                    <p>{palpite}</p>
                ))}
               
              
            </div>
           

        </div>
    )
}