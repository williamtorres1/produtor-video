//adicionado a biblioteca 'pdfkit'
const PDFDocument = require('pdfkit');
//adicionado o 'filesystem' do node
const fs = require('fs');
const doc = new PDFDocument();

const state = require('./state.js');

async function robot()
{
    const content = state.load();

    //'prefix' + 'searchterm' + 'pdf'
    pdfName = content.prefix.concat(' ',content.searchTerm,'.pdf');
    doc.pipe(fs.createWriteStream(pdfName));
    //
    doc.text(content.sourceContentSanitized);
    

    // Finalize PDF file
    doc.end();
}

module.exports = robot;