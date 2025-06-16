// Information Stats boxes
const character = document.querySelector('span#characterCount')
const word = document.querySelector('span#wordCount');
const sentence = document.querySelector('span#sentenceCount');
const textarea = document.querySelector('textarea')
const excludeCheckbox = document.querySelector('input#excludeSpaces');
const charLimitCheckbox = document.querySelector('input#charLimit');
const wordsPerMinute = document.querySelector('span#wpm');
const densityGraphContainer = document.querySelector('section#densityGraph');
const extraTools = document.querySelector('div#extraTools');

const regexpWord = /\b\w+\b/g;
const regexpSentence = /[^.!?]*[.!?]/g;

textarea.addEventListener('input', () => {
    if (textarea.value === '') {
        characterCount.textContent = '00'
        word.textContent = '00'
        sentence.textContent = '00'
    } else {
        characterCount.textContent = textarea.value.length;

        excludeCheckbox.addEventListener('click', () => {
            excludeCheckbox.checked === true ? characterCount.textContent = textarea.value.replaceAll(" ", "").length : characterCount.textContent = textarea.value.length;
        });

        word.textContent = textarea.value.match(regexpWord).length;
        sentence.textContent = textarea.value.match(regexpSentence) === null ? '00' : textarea.value.match(regexpSentence).length;
    };
});

charLimitCheckbox.addEventListener('click', () => {
    if (charLimitCheckbox.checked === true) {
        extraTools.insertAdjacentHTML('beforeend', `
            <span id="characterLimitSpan">
                <label for="characterLimit-select">Limit to:</label>
                <select name="characterLimit" id="characterLimitSelect">
                    <option value="" selected disabled>Set the character count</option>
                    <hr>
                    <option value="100">100 Characters</option>
                    <option value="200">200 Characters</option>
                    <option value="300">300 Characters</option>
                    <option value="500">500 Characters</option>
                    <option value="750">750 Characters</option>
                    <option value="1000">1,000 Characters</option>
                    <option value="1500">1,500 Characters</option>
                </select>
            </span>
            `
        );

        const select = document.querySelector('#characterLimitSelect');
        select.addEventListener('change', () => {
            // really need to save the textarea value in a seperate variable. String.slice() might be useful.
            if (textarea.value.length > select.value) {
                textarea.value = textarea.value.substring(0, select.value);
            }
        });

    } else {
        const characterLimitSpan = document.querySelector('#characterLimitSpan');
        characterLimitSpan.remove();
    }
});

textarea.addEventListener('input', () => {
    const str = textarea.value.replaceAll(" ", "").toLowerCase();
    console.log(str.split(""));
})

/* 
densityGraphContainer.insertAdjacentHTML('beforeend', `
    <span class="listItem"><label for="character">${character}</label>
    <progress id="character" max="100" value="25" class="progressBar"></progress>
    <p>${numberOfCharacters} characters<span> (${percentage})</span></p></span>`);
*/
