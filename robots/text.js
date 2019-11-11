
//add algorithmia 
const algorithmia = require('algorithmia')

//pegar as credenciais da conta do usuario no algorithmia
const algorithmiaApiKey = require('../credentials/algorithmia.json').ApiKey

//add Sentence Boundary Detection

const sentenceBoundaryDetection = require('sbd');

async function robot (content)
{
    await fetchContentFromWikipedia(content);
    sanitizeContent(content);
    breakContentIntoSentences(content);

    async function fetchContentFromWikipedia(content)
    {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2?");
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponse.get();
        /**
         1. Autenticação no Algorithimia
         2. Define o algoritmo
         3. Executa o algoritmo
         4. Captura o valor* 
         */
        content.sourceContentOriginal = wikipediaContent.content;
    }

    function sanitizeContent(content)
        {
            const withoutBlankLinesAndMarkDown = removeBlankLinesAndMarkDown(content.sourceContentOriginal);
            const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkDown);
            
            content.sourceContentSanitized = withoutDatesInParentheses;

            function removeBlankLinesAndMarkDown(text)
            {
                const allLines = text.split('\n');

                const withoutBlankLinesAndMarkDown = allLines.filter((line) => {
                    if (line.trim().length === 0 || line.trim().startsWith('='))
                    {
                        return false;
                    }

                    return true;
                });

                return withoutBlankLinesAndMarkDown.join(' ');
            }

            function removeDatesInParentheses(text)
            {
                return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ');
            }
        }

    function breakContentIntoSentences(content)
    {
        content.sentences = [];

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized);
        
        sentences.forEach((sentence) => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            })
        });
    }
    
}

module.exports = robot;
