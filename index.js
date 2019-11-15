//adição do robo de texto
const robots = 
{
    userInput: require('./robots/user-input.js'),
    text: require('./robots/text.js'),
    pdfCreator: require('./robots/pdf-creator.js'),
    state: require('./robots/state')
}

async function start()
{
    robots.userInput();
    await robots.text();
    //await robots.pdfCreator();
    
    const content = robots.state.load();
    console.dir(content, {depth:null });//mantem toda a profunidade do content, basicamente um stringify
    
}

start();