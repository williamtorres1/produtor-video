const readline = require('readline-sync')

function start() {
  const content = {}

  content.searchTerm = askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()
  function askAndReturnSearchTerm() {
    return readline.question('Type a Wikipedia search term: ')
  }
  function askAndReturnPrefix() {
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectPrefixIndex = readline.keyInSelect(prefixes)
    console.log(selectPrefixIndex)
    return readline.keyInSelect('')
  }
  console.log(content)
}

start()