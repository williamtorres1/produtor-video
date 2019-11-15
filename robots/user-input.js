//biblioteca readline-sync importada no comando abaixo
const readLine = require('readline-sync');
//import state robot
const state = require('./state.js');
function robot()
{
    const content = {
        maximumSentences: 2
    };
    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    state.save(content);
    function askAndReturnSearchTerm()
    {
        return readLine.question('Type a Wikipedia search term: ');
    }

    function askAndReturnPrefix()
    {
        const prefixes = ['Who is', 'What is', 'The history of'];
        const selectedPrefixIndex = readLine.keyInSelect(prefixes, 'Choose one option: ');
        const selectedPrefixText = prefixes[selectedPrefixIndex];

        return selectedPrefixText;
    }

}

module.exports = robot;
