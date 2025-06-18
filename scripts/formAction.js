import {Travel, TravelPlaner} from './dataProcessing.js';

const button = document.getElementById('addNewTravel');
const buttonBack = document.getElementById('backBtn');
const secondLay = document.querySelector('.newTravel');
const form = secondLay.querySelector('form');
const inputTo = document.getElementById('destTO');
const inputStartDate = document.getElementById('startDate');
const inputFinishDate = document.getElementById('finishDate');
const budgetNum = document.getElementById('budget');
const deskNotes = document.querySelector('.deskNotes');
const travelView = document.querySelector('.travelView');
const info = document.querySelector('.info');
//------------------------------------------------------------------------
const travelPlaner = new TravelPlaner();
button.addEventListener('click', function (e) {
    e.preventDefault();
    if (!inputTo.value.trim() || !inputStartDate.value) {
        alert('Fill in fields "Destination To" and "Start date"');
        return;
    }

    const travel = new Travel(
        inputTo.value.trim(),
        inputStartDate.value,
        inputFinishDate.value,
        budgetNum.value
    );
    travelPlaner.addTravel(travel);
    addNoteToDesk(travel);

    button.classList.add('validate');
    setTimeout(() => {
        secondLay.style.display = 'none';
        button.classList.remove('validate');
    }, 700);
});
buttonBack.addEventListener('click', function (e) {
    e.preventDefault();
    secondLay.style.display = 'none';
})

function resetForm() {
    form.reset();
    button.classList.remove('validate');
}

window.resetForm = resetForm;

function addNoteToDesk(travel) {
    const allNotes = deskNotes.querySelectorAll('.note');
    if (allNotes.length >= 24) return;

    const note = document.createElement('div');
    note.classList.add('note');
    note.innerText = `${travel.getTo()}\n${travel.getStartDate()}`;

    note.addEventListener('click', () => {
        travelView.style.display = 'block';
        const text = Object.entries(travel.toString())
            .map(([key, value]) => `${key}: ${value || '—'}`)
            .join('\n');
        info.innerText = text;
    });

    travelView.addEventListener('dblclick', () => {
        travelView.style.display = 'none';
    });

    deskNotes.appendChild(note);
}


