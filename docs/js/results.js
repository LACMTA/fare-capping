const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const RIDES_PER_DAY = URL_PARAMS.get('rides');
const DAYS_PER_WEEK = URL_PARAMS.get('days');

let path = window.location.pathname.split('/');
const RESULTS_PAGE = path[path.length - 2];

const REGULAR_FARE = 2;
const DISCOUNT_FARE = 1;

let Daily_Costs = {
    "days": {
        "day_1": {
            "cost": 0,
            "saved": 0
        },
        "day_2": {
            "cost": 0,
            "saved": 0
        },
        "day_3": {
            "cost": 0,
            "saved": 0
        },
        "day_4": {
            "cost": 0,
            "saved": 0
        },
        "day_5": {
            "cost": 0,
            "saved": 0
        },
        "day_6": {
            "cost": 0,
            "saved": 0
        },
        "day_7": {
            "cost": 0,
            "saved": 0
        }
    },    
    capHitForDay: function(day) {
        if (this['day_' + day] >= 6) {
            return true;
        } else {
            return false;
        }
    },
    weeklyCost: function() {
        let result = 0;
        for (const day in this.days) {
            result += this.days[day].cost;
        }
        return result;
    },
    weeklySaved: function() {
        let result = 0;
        for (const day in this.days) {
            result += this.days[day].saved;
        }
        return result;
    },
    costForDay: function(day) {
        return this.days['day_' + day].cost;
    },
    savedForDay: function(day) {
        return this.days['day_' + day].saved;
    },
    clear: function() {
        for (const day in this.days) {
            this.days[day].cost = 0;
            this.days[day].saved = 0;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const RESULTS_DAILY_COST = document.querySelector('#daily-cost');
    const RESULTS_DAILY_RIDES = document.querySelector('#daily-rides');

    const RESULTS_WEEKLY_COST = document.querySelector('#weekly-cost');
    const RESULTS_WEEKLY_RIDES = document.querySelector('#weekly-rides');

    const COST = document.querySelectorAll('.cost');

    RESULTS_DAILY_RIDES.textContent = RIDES_PER_DAY;
    RESULTS_WEEKLY_RIDES.textContent = RIDES_PER_DAY * DAYS_PER_WEEK;

    let capped_daily_rides, capped_daily_cost, capped_weekly_rides, capped_weekly_cost, fare, weekly_rides;
    let daily_cap_met = false;
    let weekly_cap_met = false;

    if (RESULTS_PAGE == 'cash') {
        fare = REGULAR_FARE;

        capped_daily_cost = RIDES_PER_DAY * 2;
        capped_weekly_cost = RIDES_PER_DAY * DAYS_PER_WEEK * 2;
    } else {
        if (RESULTS_PAGE == 'tap-regular') {
            fare = REGULAR_FARE;
        } else if (RESULTS_PAGE == 'tap-discount') {
            fare = DISCOUNT_FARE;
        }

        if (RIDES_PER_DAY > 3) {
            daily_cap_met = true;
            capped_daily_rides = 3;
        } else {
            daily_cap_met = false;
            capped_daily_rides = RIDES_PER_DAY;
        }

        capped_daily_cost = capped_daily_rides * fare;
    
        weekly_rides = RIDES_PER_DAY * DAYS_PER_WEEK;

        if (capped_daily_rides * DAYS_PER_WEEK > 10) {
            weekly_cap_met = true;
            capped_weekly_rides = 10;
        } else {
            weekly_cap_met = false;
            capped_weekly_rides =  capped_daily_rides * DAYS_PER_WEEK;
        }
        

        capped_weekly_cost = capped_weekly_rides * fare;
    }

    RESULTS_DAILY_COST.textContent = '$' + capped_daily_cost;
    RESULTS_WEEKLY_COST.textContent = '$' + capped_weekly_cost;

    if (!daily_cap_met) {
        document.querySelector('#daily-cap-not-met').innerHTML += '<br>Daily fare cap of $' + fare * 3 + ' not met.';
    }

    if (!weekly_cap_met) {
        document.querySelector('#weekly-cap-not-met').innerHTML += '<br>Weekly cap of $' + fare * 10 + 'not met.';
    }

    for (let elem in COST) {
        COST[elem].textContent = '$' + fare;
    }
});