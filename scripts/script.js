const container = document.querySelector('.cont');
const roadmap = document.querySelector(".roadmap");
const pencil = document.querySelector(".pencil");
const newTravel = document.querySelector(".newTravel");

container.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('roadmap') || e.target.classList.contains('pencil')) {
        pencil.style.display = "block";
        roadmap.style.width = "80px";
    }
})

container.addEventListener('mouseout', function (e) {
    if (e.target.classList.contains('roadmap') || e.target.classList.contains('pencil')) {

        pencil.style.display = "none";
        roadmap.style.width = "70px";
    }
})

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('roadmap') || e.target.classList.contains('pencil')) {
        resetForm();
        newTravel.style.display = "block";
    }
});