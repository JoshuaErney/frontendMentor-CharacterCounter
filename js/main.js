// Information Stats boxes
const character = document.querySelector('#characterCount')
const word = document.querySelector('#wordCount');
const sentence = document.querySelector('#sentenceCount');

const excludeSpaces = document.querySelector('#exclude-spaces');
const charLimit = document.querySelector('#char-limit');
const controlsContainer = document.querySelector('.controls_options');
const readingTime = document.querySelector('#reading-time-value');

const densityGraphContainer = document.querySelector('section#densityGraph');

const textarea = document.querySelector('#text-input');

const regexpWord = /\b\w+\b/g;
const regexpSentence = /[^.!?]*[.!?]/g;

textarea.addEventListener('input', () => {
    if (textarea.value === '') {
        character.textContent = '0'
        word.textContent = '0'
        sentence.textContent = '0'
    } else {
        character.textContent = textarea.value.length;

        excludeSpaces.addEventListener('click', () => {
            excludeSpaces.checked === true ? character.textContent = textarea.value.replaceAll(" ", "").length : character.textContent = textarea.value.length;
        });

        word.textContent = textarea.value.match(regexpWord).length;
        sentence.textContent = textarea.value.match(regexpSentence) === null ? '0' : textarea.value.match(regexpSentence).length;
    };
});

charLimit.addEventListener('click', () => {
    if (charLimit.checked === true) {
        controlsContainer.insertAdjacentHTML('beforeend', `
            <div class="checkbox-group" id="characterLimitDiv">
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
            </div>`
        );

        const select = document.querySelector('#characterLimitSelect');
        select.addEventListener('change', () => {
            // really need to save the textarea value in a seperate variable. String.slice() might be useful.
            if (textarea.value.length > select.value) {
                textarea.value = textarea.value.substring(0, select.value);
            }
        });

    } else {
        const characterLimitDiv = document.querySelector('#characterLimitDiv');
        characterLimitDiv.remove();
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
