const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const RIDES_PER_DAY = URL_PARAMS.get('rides');
const DAYS_PER_WEEK = URL_PARAMS.get('days');

let path = window.location.pathname.split('/');
const RESULTS_PAGE = path[path.length - 2];

console.log(RESULTS_PAGE);
console.log(RIDES_PER_DAY);
console.log(DAYS_PER_WEEK);

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

document.addEventListener('load', () => {
    switch (RESULTS_PAGE) {
        case 'cash':
            
            break;
        case 'tap-regular':
            
            break;
        case 'tap-discount':
            
            break;
    }

});