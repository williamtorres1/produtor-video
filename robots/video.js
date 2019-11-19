const state = require('./state.js');
async function robot()
{
    const content = state.load();
    await convertAllImages(content);
    //await createImagesWithSentences();
    //await createThumbnail();
    //await createScriptKdenLive();
    //await renderVideoWithKdenLive();


    async function convertAllImages(content)
    {
        for(let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++)
        {
            await convertImages(sentenceIndex);
        }
    }
    async function convertImages(sentenceIndex)
    {

    }
        
}

module.exports = robot;