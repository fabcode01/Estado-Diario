interface PalpiteProps {
    listaDePalpites: string[]
}


export default function(props: PalpiteProps){


    return (
        <div className="
        mt-12 h-80
        
        ">
            <div>
                {props.listaDePalpites.map((palpite, i)=>(
                    <p key={i}>{palpite}</p>
                ))}
               
              
            </div>
           

        </div>
    )
}