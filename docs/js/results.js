const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const RIDES_PER_DAY = URL_PARAMS.get('rides');
const DAYS_PER_WEEK = URL_PARAMS.get('days');

let path = window.location.pathname.split('/');
const RESULTS_PAGE = path[path.length - 2];

const REGULAR_FARE = 2;
const REDUCED_FARE = 1;

let DAILY_RIDES_PLURAL = RIDES_PER_DAY == 1 ? '' : 's';
let WEEKLY_RIDES = RIDES_PER_DAY * DAYS_PER_WEEK;
let WEEKLY_RIDES_PLURAL = WEEKLY_RIDES == 1 ? '' : 's';

document.addEventListener('DOMContentLoaded', () => {
    const DAILY_COST_HEADING = document.querySelector('#daily-cost-heading');
    const DAILY_COST_BODY = document.querySelector('#daily-cost-body');

    const WEEKLY_COST_HEADING = document.querySelector('#weekly-cost-heading');
    const WEEKLY_COST_BODY = document.querySelector('#weekly-cost-body');

    let capped_daily_rides, capped_weekly_rides, capped_weekly_cost;

    switch (RESULTS_PAGE) {
        /*************************************/
        /* CASH                              */
        /*************************************/
        case 'cash':

            let daily_cost = RIDES_PER_DAY * REGULAR_FARE;
            let weekly_cost = WEEKLY_RIDES * REGULAR_FARE;

            DAILY_COST_HEADING.textContent = '$' + daily_cost + ' for ' + RIDES_PER_DAY + ' ride' + DAILY_RIDES_PLURAL;
            DAILY_COST_BODY.textContent = 'You will now pay $' + REGULAR_FARE + ' per ride.';

            WEEKLY_COST_HEADING.textContent = '$' + weekly_cost + ' for ' + WEEKLY_RIDES + ' ride' + WEEKLY_RIDES_PLURAL;
            WEEKLY_COST_BODY.textContent = 'You will now pay $' + REGULAR_FARE + ' per ride.';
            break;

        /*************************************/
        /* TAP - regular                     */
        /*************************************/
        case 'tap-regular':

            /**************/
            /* daily cost */
            /**************/
            if (RIDES_PER_DAY < 3) {  // under daily cap

                capped_daily_rides = RIDES_PER_DAY;

                DAILY_COST_HEADING.textContent = '$' + RIDES_PER_DAY * REGULAR_FARE + ' for ' + RIDES_PER_DAY + ' ride' + DAILY_RIDES_PLURAL;
                DAILY_COST_BODY.innerHTML = "You will pay $" + REGULAR_FARE + " per ride for your first 3 rides. Every ride after will be FREE 🎁 that day!";

            } else if (RIDES_PER_DAY == 3) { // at daily cap

                capped_daily_rides = 3;

                DAILY_COST_HEADING.textContent = '$6 for ' + RIDES_PER_DAY + ' ride' + DAILY_RIDES_PLURAL;
                DAILY_COST_BODY.innerHTML = "Congratulations, you hit your daily cap! 🎉 Every ride after is FREE 🎁!";

            } else if (RIDES_PER_DAY > 3) {  // over daily cap

                capped_daily_rides = 3;

                let saved_rides = RIDES_PER_DAY - 3;
                let saved_rides_plural = saved_rides == 1 ? '' : 's';

                DAILY_COST_HEADING.textContent = '$6 for ' + RIDES_PER_DAY + ' ride' + DAILY_RIDES_PLURAL;
                DAILY_COST_BODY.innerHTML = 'Congratulations, you hit your daily cap! 🎉 You gained ' + saved_rides + ' FREE 🎁 ride' + saved_rides_plural + ' per day!';

            }

            /***************/
            /* weekly cost */
            /***************/
            capped_weekly_rides = capped_daily_rides * DAYS_PER_WEEK;

            if (capped_weekly_rides < 10) { // under weekly cap

                capped_weekly_cost = capped_weekly_rides * REGULAR_FARE;
    
                WEEKLY_COST_HEADING.textContent = '$' + capped_weekly_cost + ' for ' + WEEKLY_RIDES + ' ride' + WEEKLY_RIDES_PLURAL;
                WEEKLY_COST_BODY.innerHTML = 'You pay $' + capped_weekly_cost + ' for ' + WEEKLY_RIDES + ' ride' + WEEKLY_RIDES_PLURAL + '.<br>Weekly fare cap of $' + REGULAR_FARE * 10 + " was not met.";
                
            } else if (capped_weekly_rides == 10) { // at weekly cap
    
                WEEKLY_COST_HEADING.textContent = '$20 for ' + WEEKLY_RIDES + ' ride' + WEEKLY_RIDES_PLURAL;
                WEEKLY_COST_BODY.innerHTML = "Congratulations, you hit your weekly cap! 🎉 Every ride after is FREE 🎁!";
    
            } else if (capped_weekly_rides > 10) { // over weekly cap

                let free_daily_rides = 0;
                let saved_rides = 0;
    
                if (RIDES_PER_DAY < 3) { // under daily cap

                    saved_rides = (RIDES_PER_DAY * DAYS_PER_WEEK) - 10; // no free rides from daily cap

                } else if (RIDES_PER_DAY == 3) { // at daily cap

                    // no free rides before hitting weekly cap (days 1-3)
                    saved_rides = 2; // day of hitting weekly cap gives 2 free rides (day 4)
                    saved_rides += RIDES_PER_DAY * (DAYS_PER_WEEK - 4); // weekly cap exceeded (day 5+)

                } else if (RIDES_PER_DAY > 3) { // over daily cap

                    free_daily_rides = RIDES_PER_DAY - 3;
                    saved_rides = free_daily_rides * 3; // days before hitting weekly cap (days 1-3)
                    saved_rides += RIDES_PER_DAY - 2; // day of hitting weekly cap (day 4)
                    saved_rides += RIDES_PER_DAY * (DAYS_PER_WEEK - 4); // days after hitting weekly cap (day 5+)

                }
                
                WEEKLY_COST_HEADING.textContent = '$20 for ' + WEEKLY_RIDES + ' ride' + WEEKLY_RIDES_PLURAL;
                WEEKLY_COST_BODY.innerHTML = "Congratulations, you hit your weekly cap! 🎉 You gained " + saved_rides + " FREE 🎁 rides!";
            }
            break;
        
        /*************************************/
        /* TAP - reduced                    */
        /*************************************/
        case 'tap-reduced':

            /**************/
            /* daily cost */
            /**************/
            if (RIDES_PER_DAY < 3) {  // under daily cap

                capped_daily_rides = RIDES_PER_DAY;

                DAILY_COST_HEADING.textContent = '$' + RIDES_PER_DAY * REDUCED_FARE + ' for ' + RIDES_PER_DAY + ' ride' + DAILY_RIDES_PLURAL;
                DAILY_COST_BODY.innerHTML = "You will pay $" + REDUCED_FARE + " per ride for your first 3 rides. Every ride after will be FREE 🎁 that day!";

            } else if (RIDES_PER_DAY == 3) { // at daily cap

                capped_daily_rides = 3;

                DAILY_COST_HEADING.textContent = '$3 for ' + RIDES_PER_DAY + ' ride' + DAILY_RIDES_PLURAL;
                DAILY_COST_BODY.innerHTML = "Congratulations, you hit your daily cap! 🎉 Every ride after is FREE 🎁!";

            } else if (RIDES_PER_DAY > 3) {  // over daily cap

                capped_daily_rides = 3;

                let saved_rides = RIDES_PER_DAY - 3;
                let saved_rides_plural = saved_rides == 1 ? '' : 's';

                DAILY_COST_HEADING.textContent = '$3 for ' + RIDES_PER_DAY + ' ride' + DAILY_RIDES_PLURAL;
                DAILY_COST_BODY.innerHTML = 'Congratulations, you hit your daily cap! 🎉 You gained ' + saved_rides + ' FREE 🎁 ride' + saved_rides_plural + ' per day!';

            }

            /***************/
            /* weekly cost */
            /***************/
            capped_weekly_rides = capped_daily_rides * DAYS_PER_WEEK;

            if (capped_weekly_rides < 8) { // under weekly cap

                capped_weekly_cost = capped_weekly_rides * REDUCED_FARE;
    
                WEEKLY_COST_HEADING.textContent = '$' + capped_weekly_cost + ' for ' + WEEKLY_RIDES + ' ride' + WEEKLY_RIDES_PLURAL;
                WEEKLY_COST_BODY.innerHTML = 'You pay $' + capped_weekly_cost + ' for ' + WEEKLY_RIDES + ' ride' + WEEKLY_RIDES_PLURAL + '.<br>Weekly fare cap of $' + REDUCED_FARE * 8 + " was not met.";
                
            } else if (capped_weekly_rides == 8) { // at weekly cap
    
                WEEKLY_COST_HEADING.textContent = '$8 for ' + WEEKLY_RIDES + ' ride' + WEEKLY_RIDES_PLURAL;
                WEEKLY_COST_BODY.innerHTML = "Congratulations, you hit your weekly cap! 🎉 Every ride after is FREE 🎁!";
    
            } else if (capped_weekly_rides > 8) { // over weekly cap

                let free_daily_rides = 0;
                let saved_rides = 0;
                
                if (RIDES_PER_DAY < 3) { // daily cap never reached, no free daily rides

                    saved_rides = WEEKLY_RIDES - 8;

                } else if (RIDES_PER_DAY == 3) { // daily cap reached, free daily rides only if riding 3+ days

                    // no free rides before hitting weekly cap (days 1-2)
                    saved_rides = 1; // day of hitting weekly cap gives 1 free ride (day 3)
                    saved_rides += RIDES_PER_DAY * (DAYS_PER_WEEK - 3); // weekly cap exceeded (day 4+)

                } else if (RIDES_PER_DAY > 3) { // daily cap exceeded, free rides every day

                    free_daily_rides = RIDES_PER_DAY - 3;

                    saved_rides = free_daily_rides * 2; // days before hitting weekly cap (days 1-2)
                    saved_rides += RIDES_PER_DAY - 2; // day of hitting weekly cap (day 3)
                    saved_rides += RIDES_PER_DAY * (DAYS_PER_WEEK - 3); // days after hitting weekly cap (day 4+)

                }
                
                WEEKLY_COST_HEADING.textContent = '$8 for ' + WEEKLY_RIDES + ' ride' + WEEKLY_RIDES_PLURAL;
                WEEKLY_COST_BODY.innerHTML = "Congratulations, you hit your weekly cap! 🎉 You gained " + saved_rides + " FREE 🎁 rides!";
            }
            break;
        default:
            console.log('invalid page!');
    }
});