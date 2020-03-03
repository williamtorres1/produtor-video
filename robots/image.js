const state = require('./state.js');

const readLine = require('readline-sync');

async function robot()
{
    const content = state.load();
    const imageRobotMessage = imageMessage(content);
    
    const options = ['Use default images [NOT RECOMMENDED]', `I will choose my own images`];
    const selectedOption = readLine.keyInSelect(options, `Choose one option to the program continue:`);

    state.save(content);
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
                const selectedImages = await selectImages(content.sentences);
                break;
            }
        case -1:
            {
                console.log(`You choosed [cancel], ending program...`);
                process.exit(0);
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
        sentence.forEach(element => {
            console.log(`Go to the current folder and select a image for EACH sentence.Your current sentence is:`);
            console.dir(`${element.text}`,{depth:null})


            console.log(`\nObs: You can search for images on your search engine favorite. We suggest you search for something like ${content.searchTerm} + ${element.keywords}`);
            readLine.question("When you choose a image to sentence, type ENTER");
        });
    }
}

module.exports = robot;