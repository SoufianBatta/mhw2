/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const unchecked = 'images/unchecked.png';
const checked = 'images/checked.png';
let countValue = {};
let valuemaps = {};
const resetbutton = document.querySelector('button');

resetbutton.addEventListener('click', Reset);

const Answers = document.querySelectorAll('[data-question-id]');
for (const answer_id of Answers){
    answer_id.addEventListener('click', Check);
}


function Reset(){
    valuemaps = {};
    countValue = {};
    for (const answer_id of Answers){
        answer_id.addEventListener('click', Check);
        Uncheck(answer_id);
        answer_id.classList.remove('transparent');
    }
    const footer = document.querySelector('footer');
    footer.classList.add('hidden');
}

function AddPoint(data_choice_id){
    if(countValue[data_choice_id] == undefined){
        countValue[data_choice_id] = 0;
    }
    countValue[data_choice_id]++;
}

function GetHigher(){
    let highest = 0;
    let winner = null;
    for(let key in countValue){
        if(countValue[key] > highest){
            highest = countValue[key];
            winner = key;
        }
    }
    return winner;
}

function Check(event){
    const answer = event.currentTarget;
    const data_question_id = answer.getAttribute('data-question-id');
    const data_choice_id = answer.getAttribute('data-choice-id');

    valuemaps[data_question_id] = data_choice_id;

    const image = document.createElement('img');
    image.src = checked;
    image.classList.add('checkbox');
    image.classList.add('checked');
    answer.removeChild(answer.querySelector('.checkbox'));
    answer.appendChild(image);

    const brother_answer = document.querySelectorAll('[data-question-id="'+data_question_id+'"]');
    for (const answers of brother_answer){
        if(answer !== answers){
        answers.classList.add('transparent');
        Uncheck(answers);
        }
    }
    answer.classList.remove('transparent');
    CheckAnswers();
}

function Uncheck(element){
    const image = document.createElement('img');
    image.src = unchecked;
    image.classList.add('checkbox');
    element.removeChild(element.querySelector('.checkbox'));
    element.appendChild(image);
}

function WriteResult(){
    for (const result in valuemaps){
        AddPoint(valuemaps[result]);
    }
    disableAll();
    fillValues();
}

function CheckAnswers(){
    if(Object.keys(valuemaps).length === 3){
        WriteResult();
    }
}

function disableAll(){
    for (const answer of Answers){
        answer.removeEventListener('click', Check);
    }
}

function fillValues(){
    const footer = document.querySelector('footer');
    const div = footer.querySelector('div');
    const h1 = div.querySelector('h1');
    const span = div.querySelector('span');
    h1.innerHTML = RESULTS_MAP[GetHigher()].title;
    span.innerHTML = RESULTS_MAP[GetHigher()].contents;
    footer.classList.remove('hidden');
}