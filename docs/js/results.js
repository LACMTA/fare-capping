const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const RIDES_PER_DAY = URL_PARAMS.get('rides');
const DAYS_PER_WEEK = URL_PARAMS.get('days');

let path = window.location.pathname.split('/');
const RESULTS_PAGE = path[path.length - 2];

const REGULAR_FARE = 2;
const DISCOUNT_FARE = 1;


document.addEventListener('DOMContentLoaded', () => {
    const RESULTS_DAILY_COST = document.querySelector('#daily-cost');
    const RESULTS_DAILY_RIDES = document.querySelector('#daily-rides');

    const RESULTS_WEEKLY_COST = document.querySelector('#weekly-cost');
    const RESULTS_WEEKLY_RIDES = document.querySelector('#weekly-rides');

    const DAILY_CAP = document.querySelector('#daily-cap');
    const WEEKLY_CAP = document.querySelector('#weekly-cap');

    RESULTS_DAILY_RIDES.textContent = RIDES_PER_DAY;
    RESULTS_WEEKLY_RIDES.textContent = RIDES_PER_DAY * DAYS_PER_WEEK;

    let capped_daily_rides, capped_daily_cost, capped_weekly_rides, capped_weekly_cost, fare, weekly_rides;

    if (RESULTS_PAGE == 'cash') {
        fare = REGULAR_FARE;

        let daily_cost = RIDES_PER_DAY * fare;
        let weekly_cost = RIDES_PER_DAY * DAYS_PER_WEEK * fare;

        RESULTS_DAILY_COST.textContent = '$' + daily_cost;
        RESULTS_WEEKLY_COST.textContent = '$' + weekly_cost;
    } else {
        if (RESULTS_PAGE == 'tap-regular') {
            fare = REGULAR_FARE;
        } else if (RESULTS_PAGE == 'tap-discount') {
            fare = DISCOUNT_FARE;
        }

        if (RIDES_PER_DAY >= 3) { // DAILY FARE CAP MET
            capped_daily_rides = 3;
            capped_daily_cost = capped_daily_rides * fare;

            DAILY_CAP.innerHTML = "You pay $" + fare + " for your first 3 rides and every ride after is FREE 🎁 because you hit your daily cap.";

        } else { // DAILY FARE CAP NOT MET
            capped_daily_rides = RIDES_PER_DAY;
            capped_daily_cost = RIDES_PER_DAY * fare;

            DAILY_CAP.innerHTML = "You pay $" + capped_daily_cost + " for " + capped_daily_rides + " rides.<br>Daily fare cap of $" + fare * 3 + " was not met.";
        }

        weekly_rides = RIDES_PER_DAY * DAYS_PER_WEEK;

        if (capped_daily_rides * DAYS_PER_WEEK > 10) { // WEEKLY FARE CAP MET
            capped_weekly_rides = 10;
            capped_weekly_cost = capped_weekly_rides * fare;


            WEEKLY_CAP.innerHTML = "You pay $" + fare + " for your 10 rides weekly and every ride after is FREE 🎁 because you hit your weekly cap.";

        } else { // WEEKLY FARE CAP NOT MET
            capped_weekly_cost = capped_daily_rides * DAYS_PER_WEEK * fare;

            WEEKLY_CAP.innerHTML = "You pay $" + capped_weekly_cost + " for " + weekly_rides + " rides.<br>Weekly fare cap of $" + fare * 10 + " was not met.";
        }
        
    }

    RESULTS_DAILY_COST.textContent = '$' + capped_daily_cost;
    RESULTS_WEEKLY_COST.textContent = '$' + capped_weekly_cost;
});