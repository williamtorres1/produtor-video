//adição do robo de texto
const robots = 
{
    userInput: require('./robots/user-input.js'),
    text: require('./robots/text.js'),
    pdfCreator: require('./robots/pdf-creator.js')
}

async function start()
{
    const content = {};
    robots.userInput(content);
    await robots.text(content);
    await robots.pdfCreator(content);
}

start();
