export class Travel {

    #to
    #startDate
    #finishDate
    #budget

    constructor(to, startDate, finishDate, budget) {
        this.#to = to;
        this.#startDate = startDate;

        if (finishDate) {
            if (new Date(finishDate) >= new Date(startDate)) {
                this.#finishDate = finishDate;
            } else {
                alert("Finish Date cannot be earlier than Start Date!");
            }
        }

        if (budget && budget > 0) {
            this.#budget = budget;
        }
    }

    getTo() {
        return this.#to;
    }

    getStartDate() {
        return this.#startDate;
    }

    getFinishDate() {
        return this.#finishDate;
    }

    getBudget() {
        return this.#budget;
    }

    setTo(to) {
        if (to.trim() && to != this.#to) {
            this.#to = to.trim();
        }
    }

    setBudget(budget) {
        if (+budget > 0 && budget != this.#budget)
            this.#budget = budget;
    }

    setFinishDate(finishDate) {
        if ((new Date(finishDate) > new Date(this.#startDate)) && (finishDate != this.#finishDate))
            this.#finishDate = finishDate;
        else alert("Finish Date cannot be earlier than Start Date!")
    }

    setStartDate(startDate) {
        if ((!this.#finishDate || new Date(startDate) <= new Date(this.#finishDate)) && (startDate != this.#startDate)) {
            this.#startDate = startDate;
        } else {
            alert("Start Date cannot be later than Finish Date!");
        }
    }

    toString = function () {
        const trip = {
            "Destination To": this.#to,
            "Start Date": this.#startDate,
            "Finish Date": this.#finishDate,
            "Budget": this.#budget
        }
        return trip;
    }
}

export class TravelPlaner {
    #travels

    constructor(travels) {
        if (travels) {
            this.#travels = travels;
        }
        this.#travels = [];
    }

    addTravel(travel) {
        this.#travels.push(travel);
        return true;
    }

    getAllTravels() {
        return [...this.#travels];
    }

    getByTo(to) {
        return this.#travels.filter(item =>
            item.getTo().trim().toLowerCase().includes(to.trim().toLowerCase()))

    }
}