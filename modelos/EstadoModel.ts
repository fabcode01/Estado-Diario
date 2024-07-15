export default class EstadoModel{
    #NomeDoEstado: string
    #acertou: boolean



    constructor(nomeDoEstado: string, acertou = false){
        this.#NomeDoEstado = nomeDoEstado
        this.#acertou = acertou
    }


    get NomeDoEstadoGET(){
        return this.#NomeDoEstado
    }

    get acertou(){
        return this.#acertou
    }


    RespostaCerta(){
        return new EstadoModel(this.#NomeDoEstado, this.#acertou = true)
    }

   
}