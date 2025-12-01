import Cliente from "../modelos/cliente";

export default class Armazem {
    private static instancia: Armazem | null = null;
    private clientes: Cliente[] = [];

    private constructor() { }

    public static get InstanciaUnica(): Armazem {
        if (!Armazem.instancia) {
            Armazem.instancia = new Armazem();
        }
        return Armazem.instancia;
    }

    public get Clientes(): Cliente[] {
        return this.clientes;
    }
}


