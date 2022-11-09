const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const RIDES_PER_DAY = URL_PARAMS.get('rides');
const DAYS_PER_WEEK = URL_PARAMS.get('days');

let path = window.location.pathname.split('/');
const RESULTS_PAGE = path[path.length - 2];

const REGULAR_FARE = 2;
const DISCOUNT_FARE = 1;


document.addEventListener('DOMContentLoaded', () => {
    const DAILY_COST = document.querySelector('#daily-cost');
    const DAILY_RIDES = document.querySelector('#daily-rides');

    const WEEKLY_COST = document.querySelector('#weekly-cost');
    const WEEKLY_RIDES = document.querySelector('#weekly-rides');

    const DAILY_CAP = document.querySelector('#daily-cap');
    const WEEKLY_CAP = document.querySelector('#weekly-cap');

    DAILY_RIDES.textContent = RIDES_PER_DAY;
    WEEKLY_RIDES.textContent = RIDES_PER_DAY * DAYS_PER_WEEK;

    if (RIDES_PER_DAY > 1) {
        let allDailyPlurals = document.querySelectorAll('.daily-rides-plural');

        for (let elem in allDailyPlurals) {
            allDailyPlurals[elem].textContent = 's';
        }
    }

    if (RIDES_PER_DAY * DAYS_PER_WEEK > 1) {
        let allWeeklyPlurals = document.querySelectorAll('.weekly-rides-plural');

        for (let elem in allWeeklyPlurals) {
            allWeeklyPlurals[elem].textContent = 's';
        }
    }

    let capped_daily_rides, capped_daily_cost, capped_weekly_rides, capped_weekly_cost, fare, weekly_rides;

    if (RESULTS_PAGE == 'cash') {
        fare = REGULAR_FARE;

        let daily_cost = RIDES_PER_DAY * fare;
        let weekly_cost = RIDES_PER_DAY * DAYS_PER_WEEK * fare;

        DAILY_COST.textContent = '$' + daily_cost;
        DAILY_CAP.textContent = 'You will now pay $' + fare + ' per ride.';

        WEEKLY_COST.textContent = '$' + weekly_cost;
        WEEKLY_CAP.textContent = 'You will now pay $' + fare + ' per ride.';
    } else {
        if (RESULTS_PAGE == 'tap-regular') {
            fare = REGULAR_FARE;
        } else if (RESULTS_PAGE == 'tap-discount') {
            fare = DISCOUNT_FARE;
        }

        if (RIDES_PER_DAY == 3) { // AT DAILY FARE CAP
            capped_daily_rides = 3;
            capped_daily_cost = capped_daily_rides * fare;

            DAILY_CAP.innerHTML = "Congratulations, you hit your daily cap! 🎉 Every ride after is FREE 🎁!";

        } else if (RIDES_PER_DAY > 3) { // OVER DAILY FARE CAP
            capped_daily_rides = 3;
            capped_daily_cost = capped_daily_rides * fare;
            saved_rides = RIDES_PER_DAY - 3;
            
            if (saved_rides > 1) {
                DAILY_CAP.innerHTML = "Congratulations, you hit your daily cap! 🎉 You gained " + saved_rides + " FREE 🎁 rides!";
            } else {
                DAILY_CAP.innerHTML = "Congratulations, you hit your daily cap! 🎉 You gained " + saved_rides + " FREE 🎁 ride!";
            }

            

        } else { // UNDER DAILY FARE CAP
            capped_daily_rides = RIDES_PER_DAY;
            capped_daily_cost = RIDES_PER_DAY * fare;

            DAILY_CAP.innerHTML = "You will pay $" + fare + " per ride for your first 3 rides. Every ride after will be FREE 🎁 that day!";
        }
        DAILY_COST.textContent = '$' + capped_daily_cost;

        weekly_rides = RIDES_PER_DAY * DAYS_PER_WEEK;

        if (capped_daily_rides * DAYS_PER_WEEK >= 10) { // WEEKLY FARE CAP MET
            capped_weekly_rides = 10;
            capped_weekly_cost = capped_weekly_rides * fare;


            WEEKLY_CAP.innerHTML = "You pay $" + fare + " for your 10 rides weekly and every ride after is FREE 🎁 because you hit your weekly cap.";

        } else { // WEEKLY FARE CAP NOT MET
            capped_weekly_cost = capped_daily_rides * DAYS_PER_WEEK * fare;

            if (weekly_rides > 1) {
                WEEKLY_CAP.innerHTML = "You pay $" + capped_weekly_cost + " for " + weekly_rides + " rides.<br>Weekly fare cap of $" + fare * 10 + " was not met.";
            } else {
                WEEKLY_CAP.innerHTML = "You pay $" + capped_weekly_cost + " for " + weekly_rides + " ride.<br>Weekly fare cap of $" + fare * 10 + " was not met.";
            }
            
        }
        WEEKLY_COST.textContent = '$' + capped_weekly_cost;
    }
});