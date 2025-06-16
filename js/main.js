// Information Stats boxes
const textarea = document.querySelector('#text-input');
const character = document.querySelector('#characterCount')
const word = document.querySelector('#wordCount');
const sentence = document.querySelector('#sentenceCount');
const excludeSpaces = document.querySelector('#exclude-spaces');
const charLimit = document.querySelector('#char-limit');
const controlsContainer = document.querySelector('.controls_options');
const readingTime = document.querySelector('#reading-time-value');
const densityList = document.querySelector('#densityList');

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
            <div class="checkbox-group" id="charLimitDiv">
                <label for="characterLimit-select">Limit to:</label>
                <select name="characterLimit" id="characterLimitSelect">
                    <option value="" selected disabled>Set the character count</option>
                    <hr>
                    <option value="100">100 Characters</option>
                    <option value="200">200 Characters</option>
                    <option value="300">300 Characters</option>
                    <option value="500">500 Characters (default)</option>
                    <option value="750">750 Characters</option>
                    <option value="1000">1,000 Characters</option>
                    <option value="1500">1,500 Characters</option>
                </select>
            </div>`
        );

        const select = document.querySelector('#characterLimitSelect');
        const data = textarea.value

        select.addEventListener('change', () => {
            data.length > Number(select.value) ? textarea.value = data.slice(0, Number(select.value)) : textarea.value = data;
        });

    } else {
        const charLimit = document.querySelector('#charLimitDiv');
        charLimit.remove();
    }
});

// textarea.addEventListener('input', () => {
//     const str = textarea.value.replaceAll(" ", "").toLowerCase();
//     console.log(str.split(""));
// })

/* 
densityGraphContainer.insertAdjacentHTML('beforeend', `
    <div class="density-item">
        <label for="character" class="density-item_label">${character}</label>
        <progress id="character" max="100" value="25" class="progress-bar"></progress>
        <p class="density-item_stats">${numberOfCharacters} characters<span class="density-item_percentage"> (${percentage})</span></p>
    </div>`);
*/
