import Processo from "../abstracoes/processo";
import MenuTipoModificarCliente from "../menus/menuTipoModificarCliente";
import ModificarTitulares from "./modificarTitulares";
import ModificarDependentes from "./modificarDependentes";

export default class TipoModificarCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoModificarCliente()
    }

    processar(): void {
        console.clear(); // Limpar a tela
        console.log("===========================================");
        console.log("|     ATUALIZAÇÃO DE DADOS DE VISITANTE    |");
        console.log("===========================================");

        this.menu.mostrar()

        // Aguarda explicitamente a entrada do usuário
        let escolha = this.entrada.receberNumero('Digite sua escolha: ');

        // Validação adicional
        if (escolha === 1) {
            console.log("\nVocê selecionou: Atualizar dados de TITULAR");
            this.processo = new ModificarTitulares();
            this.processo.processar();
        }
        else if (escolha === 2) {
            console.log("\nVocê selecionou: Atualizar dados de DEPENDENTE");
            this.processo = new ModificarDependentes();
            this.processo.processar();
        }
        else if (escolha === 0) {
            console.log("Retornando ao menu principal...");
        }
        else {
            console.log("Opção inválida! Por favor, escolha 1, 2 ou 0.");
        }
    }
}


