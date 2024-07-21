
import Estados from "@/data/estados";
import Link from "next/link";


export default function Home() {
    

    return (
        <div>
           
        <h1>Estado Diário</h1>
        <Link href={'/game'}>
            <button>Começar</button>
        </Link>
        </div>

    )
  
}
