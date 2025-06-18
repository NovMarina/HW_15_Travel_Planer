class Travel {

    #to
    #startDate
    #finishDate
    #budget

    constructor(to, startDate, finishDate, budget) {
        this.#to = to;
        this.#startDate = startDate;
        if (finishDate) {
            this.#finishDate = finishDate;
        }
        if (budget) {
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

    setBudget(budget) {
        if (budget > 0)
            this.#budget = budget;
    }

    setFinishDate(finishDate) {
        if (new Date(finishDate) > new Date(this.#startDate))
            this.#finishDate = finishDate;
    }

    setStartDate(startDate) {
        if (!this.#finishDate) {
            this.#startDate = startDate;
        } else {
            if (new Date(startDate) < new Date(this.#finishDate))
                this.#startDate = startDate;
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

class TravelPlaner {
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
            item.getTo().includes(to.trim()))

    }
}