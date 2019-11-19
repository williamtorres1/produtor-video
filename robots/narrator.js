const state = require('./state.js');

const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const watsonApiKey = require('../credentials/watson-narrator.json').apikey;

async function robot()
{
    const content = state.load();
    await fetchWatsonVoiceAndReturnAudioFiles(content.sentences);
    
    async function fetchWatsonVoiceAndReturnAudioFiles(sentences)
    {
        const textToSpeech = new TextToSpeechV1({
          authenticator: new IamAuthenticator({ apikey: watsonApiKey}),
          url: 'https://stream.watsonplatform.net/text-to-speech/api/'
        });
        
        const params = {
          text: 'Hello from IBM Watson',
          voice: 'en-US_AllisonVoice',
          accept: 'audio/wav'
        };
        textToSpeech
          .synthesize(params)
          .then(response => {
            const audio = response.result;
            return textToSpeech.repairWavHeaderStream(audio);
          })
          .then(repairedFile => {
            fs.writeFileSync('audio.wav', repairedFile);
            console.log('audio.wav written with a corrected wav header');
          })
          .catch(err => {
            console.log(err);
          });
    }
}

module.exports = robot;
