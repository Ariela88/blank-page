
const body = document.body;
const textSpace = document.getElementById('text-space');
const charCountElement = document.getElementById('count-chars');
const wordCountElement = document.getElementById('count-words');
const previewSpace = document.getElementById('preview-space');
const md = new window.markdownit();
let isHtml = false;
textSpace.addEventListener('input', updatePreview);



//funzione per cambiare il tema 
function changeTheme() {
    const themeButton = document.getElementById('themeButton');

    let currentTheme = 'dark';
    if (body.className === 'dark') {
        currentTheme = 'light'
        body.className = 'light';
        themeButton.textContent = '☾'
    } else {
        body.className = 'dark';
        themeButton.textContent = '✹';
    }


    localStorage.setItem('theme', currentTheme);
}


//funzione per salvare il testo nel local storage
function saveTextToLocalStorage() {
    const textDivContent = textSpace.textContent;
    localStorage.setItem('textContent', textDivContent);
}

function loadTextFromLocalStorage() {
    const savedText = localStorage.getItem('textContent');
    if (savedText) {
        textSpace.textContent = savedText;
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    }
}



//funzione per scaricare il fil di testo in un documento txt
function download() {
    const textDivContent = textSpace.innerHTML;
    const blob = new Blob([textDivContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'document.txt';

    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
}


//funzione per visualizzare il documento in fullscreen mode
function fullscreenWindow() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

//funzione per contare i caratteri e le parole in tempo reale

function countChars() {
    const textDivContent = textSpace.innerText;
    const trimmedText = textDivContent.trim();
    console.log(trimmedText)
    return trimmedText.length;
}

document.onclick = (event) => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => console.log("Document Exited from Full screen mode"))
        .catch((err) => console.error(err));
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  function exitFullscreen(){
    
  }


function updateCharCount() {
    const count = countChars();
    charCountElement.textContent = `Numero di caratteri: ${count}`;
}


function countWords() {
    const textDivContent = textSpace.innerText;
    const dataArray = textDivContent.trim().split(/\s+/);
    const wordArray = dataArray.filter(word => word !== '');
    console.log(wordArray)

    return wordArray.length;
}

function updateWordCount() {
    const count = countWords();
    wordCountElement.textContent = `Numero di parole: ${count}`;
}



textSpace.addEventListener('input', updateCounts);
textSpace.addEventListener('keydown', updateCounts);
textSpace.addEventListener('keypress', updateCounts);

function updateCounts() {
    saveTextToLocalStorage();
    updateCharCount();
    updateWordCount();
}

//--------------------------------------------------------------------------

// funzione per la visualizzazione di un anteprima in formaato markdown

let isPreviewMode = false;
function updatePreview() {
    const markdownText = textSpace.textContent.trim();
    const htmlText = md.render(markdownText);
    previewSpace.innerHTML = htmlText;

    if (isPreviewMode) {
        textSpace.classList.add('hidden-text-space');
        previewSpace.classList.remove('hidden');
    } else {
        textSpace.classList.remove('hidden-text-space');
        previewSpace.classList.add('hidden');
    }
}


function togglePreview() {
    isPreviewMode = !isPreviewMode;
    updatePreview();
}


//funzione per scaricare il documento in formato html ncon già l'impostazione base




function downloadHtml() {
    const previewContent = previewSpace.innerHTML;
    const htmlContent = `<!DOCTYPE html>\n
    <html lang="en">\n
    <head>\n
        <meta charset="UTF-8">\n
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n
        <title>il mio documento </title>\n
    </head>\n
    <body>\n
        ${previewContent}\n
    </body>\n
    </html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'preview.html';

    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
}

document.addEventListener('DOMContentLoaded', () => {
    loadTextFromLocalStorage();
    updateCounts();
    updateCharCount();
    updateWordCount();
    updatePreview();
});



