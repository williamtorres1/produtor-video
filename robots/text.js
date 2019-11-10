
//add algorithmia 
const algorithmia = require('algorithmia')

//pegar as credenciais da conta do usuario no algorithmia
const algorithmiaApiKey = require('../credentials/algorithmia.json').ApiKey


async function robot (content)
{
    await fetchContentFromWikipedia(content);
//    sanitizeContent(content);
//    breakContentIntoSentences(content);

    async function fetchContentFromWikipedia(content)
    {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2?");
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponse.get();
        /**
         1. Autenticação
         2. Define o algoritmo
         3. Executa o algoritmo
         4. Captura o valor* 
         */
        content.sourceContentOriginal = wikipediaContent.content;
        console.log(content.sourceContentOriginal);

    }
    
}

module.exports = robot;