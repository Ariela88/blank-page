const body = document.body;
const textSpace = document.getElementById('text-space');
const charCountElement = document.getElementById('count-chars');
const wordCountElement = document.getElementById('count-words');
const previewSpace = document.getElementById('preview-space');
const converter = new showdown.Converter();
let isHtml = false;

function changeTheme() {
    const themeButton = document.getElementById('themeButton');
    const themeIcon = document.getElementById('themeIcon');

    let currentTheme = 'dark';
    if (body.className === 'dark') {
        body.className = 'purple';
        themeIcon.src = './public/Brush_-_The_Noun_Project.svg';
        currentTheme = 'purple';
    } else if (body.className === 'purple') {
        body.className = 'light';
        themeIcon.src = './public/OOjs_UI_icon_sun-ltr.svg';
        currentTheme = 'light';
    } else {
        body.className = 'dark';
        themeIcon.src = './public/moon-dark.svg';
        currentTheme = 'dark';
    }


    localStorage.setItem('theme', currentTheme);
}


function saveTextToLocalStorage() {
    const textDivContent = textSpace.innerHTML;
    localStorage.setItem('textContent', textDivContent);
}

function loadTextFromLocalStorage() {
    const savedText = localStorage.getItem('textContent');
    if (savedText) {
        textSpace.innerHTML = savedText;
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTextFromLocalStorage();
    updateCharCount();
    updateWordCount();
});

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

function countChars() {
    const textDivContent = textSpace.innerHTML;
    const trimmedText = textDivContent.trim();
    return trimmedText.length;
}

function updateCharCount() {
    const count = countChars();
    charCountElement.textContent = `Numero di caratteri: ${count}`;
}

function countWords() {
    const textDivContent = textSpace.innerHTML;
    const dataArray = textDivContent.trim().split(/\s+/);
    const wordArray = dataArray.filter(word => word !== '');
    return wordArray.length;
}

function updateWordCount() {
    const count = countWords();
    wordCountElement.textContent = `Numero di parole: ${count}`;
}

function previewDoc() {
    const textContent = textSpace.textContent.trim();
    let convertedText = '';

    if (isHtml) {
        convertedText = converter.makeHtml(textContent);
        textSpace.classList.remove('hidden');
        previewSpace.classList.add('hidden');
    } else {
        convertedText = converter.makeMarkdown(textContent);
        textSpace.classList.add('hidden');
        previewSpace.classList.remove('hidden');
    }

    previewSpace.innerHTML = convertedText;
    isHtml = !isHtml;
    document.getElementById('preview-space').style.display = 'block'
    document.getElementById('text-space').style.display = 'none'
}

textSpace.addEventListener('input', () => {
    saveTextToLocalStorage();
    updateCharCount();
    updateWordCount();
});

document.addEventListener('DOMContentLoaded', () => {
    loadTextFromLocalStorage();
    updateCharCount();
    updateWordCount();
});

function downloadHtml() {
    const previewContent = previewSpace.innerHTML;
    const htmlContent = `<!DOCTYPE html>\n<html>\n<head>\n<title>Tuo Titolo</title>\n</head>\n<body>\n${previewContent}\n</body>\n</html>`;

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



