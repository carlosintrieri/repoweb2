import Processo from "../abstracoes/processo";
import MenuTipoRemoverCliente from "../menus/menuTipoRemoverCliente";
import RemoverTitulares from "./removerTitulares";
import RemoverDependentes from "./removerDependentes";

export default class TipoRemoverCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoRemoverCliente()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')

        switch (this.opcao) {
            case 1: // Remover titular
                this.processo = new RemoverTitulares()
                this.processo.processar()
                break;

            case 2: // Remover dependente
                this.processo = new RemoverDependentes()
                this.processo.processar()
                break;

            case 0: // Voltar
                console.log('Retornando ao menu principal...')
                break;

            default:
                console.log('Opção não entendida... Por favor, escolha uma opção válida.')
        }
    }
}


