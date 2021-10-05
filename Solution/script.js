const winText = document.getElementById('win-text');
const sentenceField = document.getElementById('sentence-field');
const textInput = document.getElementById('text-input');
const startBtn = document.getElementById('start-btn');
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

let currentWordIdx = 0;
let currentSentence = '';
let wordList = [];
let startTime = 0;

const getRandomSentence = () => {
    const idx = Math.floor(Math.random() * quotes.length);
    return quotes[idx];
}


startBtn.addEventListener('click', () => {
    currentWordIdx = 0;
    currentSentence = getRandomSentence();
    wordList = currentSentence.split(' ');

    const newInnerHTML = wordList.map(word => `<span>${word} </span>`).join('');
    console.log(newInnerHTML);


    sentenceField.innerHTML = newInnerHTML;

    textInput.disabled = false;
    textInput.value = '';
    textInput.focus();

    startTime = new Date().getTime();

    sentenceField.childNodes[currentWordIdx].classList = 'current-word';
});

textInput.addEventListener('input', () => {
    const currentAnswer = textInput.value;
    const currentWord = wordList[currentWordIdx];


    
    ///WIN
    if (currentAnswer === currentWord && currentWordIdx === wordList.length - 1)
    {
        const finishTime = new Date().getTime();
        winText.textContent = `CONGRATULATIONS!! YOUR TIME IS ${(finishTime - startTime)/1000} seconds!`;

        // sentenceField.childNodes[currentWordIdx].classList = '';
        sentenceField.textContent = '';

        textInput.value = '';
        textInput.disabled = true;
    }
    ///Jeff Je
    else if (currentWord.startsWith(currentAnswer))
    {
        textInput.classList = '';
    }
    ///1 word done
    else if (currentAnswer.endsWith(' '))
    {
        if (currentAnswer.trim() === currentWord)
        {
            textInput.value = '';

            sentenceField.childNodes[currentWordIdx].classList = '';
            currentWordIdx++;
            sentenceField.childNodes[currentWordIdx].classList = 'current-word';
        }
    }
    ///Jeff j
    else 
    {
        textInput.classList = 'incorrect';
    }

})