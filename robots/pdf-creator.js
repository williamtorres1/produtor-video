//adicionado a biblioteca 'pdfkit'
const PDFDocument = require('pdfkit');
//adicionado o 'filesystem' do node
const fs = require('fs');
const doc = new PDFDocument();
 
async function robot(content)
{
    //'prefix' + 'searchterm' + 'pdf'
    pdfName = content.prefix.concat(' ',content.searchTerm,'.pdf');
    doc.pipe(fs.createWriteStream(pdfName));
    //
    doc.text(content.sourceContentSanitized);
    

    // Finalize PDF file
    doc.end();
}

module.exports = robot;