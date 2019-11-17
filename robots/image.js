const state = require('./state.js');

const readLine = require('readline-sync');

async function robot()
{
    const content = state.load();
    const imageRobotMessage = imageMessage(content);
    
    const options = ['Use default images [NOT RECOMMENDED]', `I will choose my own images`];
    const selectedOption = readLine.keyInSelect(options, `Choose one option to the program continue:`);
    switch(selectedOption)
    {
        case 0:
            {
                console.log("You choosed: 'default images'.");
                break;
            }
        case 1:
            {
                console.log(`You choosed: 'I will choose my own images'.`);
                //const selectedImages = await selectImages(content.sentences);
                break;
            }
        case -1:
            {
                console.log(`You choosed [cancel], ending program...`);
                process.exit(0);
                console.log("testando se o process.exit(0) encerra o programa mesmo");
                break;
            }
    }

    function imageMessage(content)
    {
        initialMessage = `Your video will contain ${content.maximumSentences} sentences.\n\n`;
        mediumMessage = `We'll request you follow the next steps...`;        
        return initialMessage.concat(mediumMessage);
    }

    async function selectImages(sentence)
    {
        for(const currentSentence of sentence.text)
        {
            console.log(`Go to the current folder and select a image for EACH sentence`);
            console.log(`Your current sentence is:\n${currentSentence}:`);         
            readLine.question("When you choose a image to sentence, type anything");
            
        }
        
    }
}

module.exports = robot;