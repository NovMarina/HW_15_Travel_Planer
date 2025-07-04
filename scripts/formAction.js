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
const showAllBtn = document.getElementById('showAllBtn');
const searchByDestinationBtn = document.getElementById('searchByDestinationBtn');
const searchInput = document.getElementById('searchInput');
const pencilAdd = document.querySelector('.pencilAdd');
const infoContent = document.querySelector('.infoContent');
const editBtns = document.querySelector('.editBtns');
const applyChangesBtn = document.getElementById('applyChanges');
const cancelChangesBtn = document.getElementById('cancelChanges');

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

//---------------------------------------------------------------------------
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
        lastViewedTravel = travel;
    });

    travelView.addEventListener('dblclick', () => {
        travelView.style.display = 'none';
    });

    deskNotes.appendChild(note);
}

showAllBtn.addEventListener('click', () => {
    deskNotes.innerHTML = '';
    travelPlaner.getAllTravels().forEach(travel => {
        addNoteToDesk(travel);
    });
});

searchByDestinationBtn.addEventListener('click', () => {
    const inputSearch = searchInput.value.trim().toLowerCase();
    if (!inputSearch) return;

    const results = travelPlaner.getByTo(inputSearch);
    deskNotes.innerHTML = '';
    results.forEach(travel => {
        addNoteToDesk(travel);
    });
});

//----------------------------------------------------------------------
let lastViewedTravel = null;

pencilAdd.addEventListener('click', () => {
    if (!lastViewedTravel) return;

    info.innerHTML = `
        <label>Destination To:<br><input id="editTo" type="text" value="${lastViewedTravel.getTo()}"></label><br>
        <label>Start Date:<br><input id="editStartDate" type="date" value="${lastViewedTravel.getStartDate()}"></label><br>
        <label>Finish Date:<br><input id="editFinishDate" type="date" value="${lastViewedTravel.getFinishDate() || ''}"></label><br>
        <label>Budget:<br><input id="editBudget" type="number" min="0" value="${lastViewedTravel.getBudget() || ''}"></label><br>
    `;
    editBtns.style.display = 'flex';
    pencilAdd.style.display = 'none';
});
applyChangesBtn.addEventListener('click', () => {
    const newTo = document.getElementById('editTo').value.trim();
    const newStart = document.getElementById('editStartDate').value;
    const newFinish = document.getElementById('editFinishDate').value;
    const newBudget = document.getElementById('editBudget').value.trim();

    if (newTo) lastViewedTravel.setTo(newTo);
    if (newStart) lastViewedTravel.setStartDate(newStart);
    if (newFinish) lastViewedTravel.setFinishDate(newFinish);
    if (!isNaN(newBudget) && newBudget > 0) lastViewedTravel.setBudget(newBudget);


    deskNotes.innerHTML = '';
    travelPlaner.getAllTravels().forEach(addNoteToDesk);

    const text = Object.entries(lastViewedTravel.toString())
        .map(([key, value]) => `${key}: ${value || '—'}`)
        .join('\n');

    info.innerText = text;
    pencilAdd.style.display = 'block';
    editBtns.style.display = 'none';
});

cancelChangesBtn.addEventListener('click', () => {

    const text = Object.entries(lastViewedTravel.toString())
        .map(([key, value]) => `${key}: ${value || '—'}`)
        .join('\n');

    info.innerText = text;
    pencilAdd.style.display = 'block';
    editBtns.style.display = 'none';
});

