
//add algorithmia 
const algorithmia = require('algorithmia')
//pegar as credenciais da conta do usuario no algorithmia
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey

const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const watsonApiKey = require('../credentials/watson-nlu.json').apikey
const { IamAuthenticator } = require('ibm-watson/auth');
    
    const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey: watsonApiKey }),
    version: '2018-04-05',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
    });

//add Sentence Boundary Detection
const sentenceBoundaryDetection = require('sbd');

async function robot (content)
{
    await fetchContentFromWikipedia(content);
    sanitizeContent(content);
    breakContentIntoSentences(content);
    limitMaximumSentences(content);
    await fetchKeywordsOfAllSentences(content);

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


    async function fetchKeywordsOfAllSentences(content)
    {
        for(const sentence of content.sentences)
        {
            sentence.keywords = await fetchWatsonAndReturnKeywords(sentence.text);
        }
    }



    function limitMaximumSentences(content)
    {
        content.sentences = content.sentences.slice(0, content.maximumSentences)
    }
 

    async function fetchWatsonAndReturnKeywords(sentence) {
        return new Promise((resolve, reject) => {
          nlu.analyze({
            text: sentence,
            features: {
              keywords: {}
            }
          }, (error, response) => {
            if (error) {
              throw error
            }
            console.log(JSON.stringify( response, null, 4))
            const keywords = response.keywords.map((keyword) => {
                return keyword.text
            })

            resolve(keywords)
          })
        })
      }
    
}

module.exports = robot;
