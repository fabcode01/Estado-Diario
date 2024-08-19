import Estados from "@/data/estados";

export default function handler(req: any, res: any){
    
  const TodosEstados: any[] = [];
  const ListaDeNomesEstado: string[] = [];

  Estados.map((estado: any) => {
    TodosEstados.push(estado);
    ListaDeNomesEstado.push(estado.nome);
  });

  // Escolhe um estado aleatorio
  const estadoAleatorio = TodosEstados[Math.floor(Math.random() * 27)];

  res.status(200).json(estadoAleatorio)

  
}