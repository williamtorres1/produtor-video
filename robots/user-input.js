//biblioteca readline-sync importada no comando abaixo
const readLine = require('readline-sync');
//import state robot
const state = require('./state.js');
function robot()
{
    const content = {
        maximumSentences: 7
    };
    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix(content.searchTerm);
    content.maximumSentences = askAndReturnMaximumSentences(content.maximumSentences);
    if(isNaN(content.maximumSentences) || content.maximumSentences <= 0 || content.maximumSentences >= 20)
    {
        content.maximumSentences = 7;
        console.log('You choose a value for maximum sentences invalid, we will work with the value default (7).');
    }
    state.save(content);
    function askAndReturnSearchTerm()
    {
        return readLine.question('Type a Wikipedia search term: ');
    }

    function askAndReturnPrefix(searchTerm)
    {
        const prefixes = ['Who is', 'What is', 'The history of'];
        const selectedPrefixIndex = readLine.keyInSelect(prefixes, `Choose one option for ${searchTerm}:`);
        const selectedPrefixText = prefixes[selectedPrefixIndex];

        return selectedPrefixText;
    }

    function askAndReturnMaximumSentences(maximumSentences)
    {
        return readLine.question('Type the maximum sentences: ');
    }

}

module.exports = robot;
