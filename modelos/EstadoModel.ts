export default class EstadoModel {
  #NomeDoEstado: string;
  #habitantes: number;
  #temperaturaMedia: number;

  #acertou: boolean;

  constructor(nomeDoEstado: string,habitantes: number,temperaturaMedia: number,acertou = false) {

    this.#NomeDoEstado = nomeDoEstado;
    this.#acertou = acertou;
    this.#habitantes = habitantes;
    this.#temperaturaMedia = temperaturaMedia;
  }

  get NomeDoEstadoGET() {
    return this.#NomeDoEstado;
  }

  get acertou() {
    return this.#acertou;
  }

  get habitantes(){
    return this.#habitantes
  }

  get temperaturaMedia(){
    return this.#temperaturaMedia
  }

  RespostaCerta() {
    return new EstadoModel(
      this.#NomeDoEstado,
      this.#habitantes,
      this.#temperaturaMedia,
      (this.#acertou = true)
    );
  }
}
