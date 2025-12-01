import Processo from "../abstracoes/processo";
import Principal from "../processos/principal";

// Limpa a tela para melhor visualização
console.clear();

// Banner de boas-vindas
console.log(`****************************************************`);
console.log(`*                                                  *`);
console.log(`*             ATLANTIS WATER PARK                  *`);
console.log(`*        Sistema de Gerenciamento Premium          *`);
console.log(`*                                                  *`);
console.log(`****************************************************`);
console.log(`*                                                  *`);
console.log(`* Bem-vindo(a) ao sistema administrativo completo  *`);
console.log(`* para gestão de visitantes, reservas e atrações.  *`);
console.log(`*                                                  *`);
console.log(`****************************************************`);
console.log(``);


let processo: Processo;
let execucao: Boolean = true;

while (execucao) {
    processo = new Principal();
    processo.processar();
    execucao = processo.Execucao;
}


