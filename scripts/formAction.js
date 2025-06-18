const button = document.getElementById('addNewTravel');
const buttonBack = document.getElementById('backBtn');
const secondLay = document.querySelector('.newTravel');
const form = secondLay.querySelector('form');
const inputTo = document.getElementById('destTO');
const inputStartDate = document.getElementById('startDate');
const inputFinishDate = document.getElementById('finishDate');
const budgetNum = document.getElementById('budget');

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

