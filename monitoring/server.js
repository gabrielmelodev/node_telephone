const axios = require("axios");
const totalvoice = require("totalvoice-node");
const client = new totalvoice(process.env.TOTALVOICE_API_KEY);

const servers = [
    {
        name: "Servidor 1",
        url: "http://localhost:4001",
        developer: {
            name: "Gabriel Melo",
            telephone: process.env.GABRIELMELO_TELEPHONE
        }
    },

    {
        name: "Servidor 1",
        url: "http://localhost:4002",
        developer: {
            name: "Gabriel Melo",
            telephone: process.env.GABRIELMELO_TELEPHONE
        }
    }
];

(async function() {
    console.log("Iniciando Monitoramento dos Servidores");
    for (const server of servers) {
         await axios({
            url: server.url,
            method: "get"
    
        }).then((response) => {
            console.log(`${server.name} esta funcionando normalmente`);
        }).catch(() => {
            console.log(`${server.name} esta parado não funciona`)
            const message = `${server.developer.name} o ${server.name} esta Parado por favor faça algo pra resolver a falha`;
            const options = {
                velocidade: 2,
                tipo_voz: "br-Vitoria"
            };
            client.tts.enviar(server.developer.telephone, message, options).then(() => {
                console.log(`O desenvolvedor ${server.developer.name} a foi avisado da falha`);
            }) 
         
        });
    }
    console.log("Finalizando Monitoramento dos Servidores");
})();

