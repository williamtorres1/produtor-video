//adição dos robos
const robots = 
{
    userInput: require('./robots/user-input.js'),
    text: require('./robots/text.js'),
    pdfCreator: require('./robots/pdf-creator.js'),
    state: require('./robots/state'),
    image: require('./robots/image.js'),
    narrator: require('./robots/narrator.js'),
    video: require('./robots/video.js')
}

async function start()
{
    //robots.userInput();
    //await robots.text();
    //await robots.pdfCreator();
    //await robots.image();
    await robots.narrator();
    //await robots.video();
    //const content = robots.state.load();
    //console.dir(content, {depth:null });//mantem toda a profunidade do content, basicamente um stringify
}

start();