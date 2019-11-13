//adição do robo de texto
const robots = 
{
    userInput: require('./robots/user-input.js'),
    text: require('./robots/text.js'),
    pdfCreator: require('./robots/pdf-creator.js')
}

async function start()
{
    const content = {
        maximumSentences: 7
    };
    robots.userInput(content);
    await robots.text(content);
    //await robots.pdfCreator(content);
    //console.log(JSON.stringify(content, null, 4));
    console.log(content);
}

start();