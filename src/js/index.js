document.querySelector('#theForm').addEventListener('submit', (e) => {
    e.preventDefault(); // prevents form submit default actions while still allowing validation
    
    const data = new FormData(document.querySelector('#theForm'));

    const payment_method = data.get('payment-method');
    console.log(payment_method);

    const rides_per_day = data.get('rides-per-day');
    console.log(rides_per_day);
    
    const days_per_week = data.get('days-per-week');
    console.log(days_per_week);

    let url = 'results/';

    switch (payment_method) {
        case 'cash':
            url += 'cash/';
            break;
        case 'tap-regular':
            url += 'tap-regular/';
            break;
        case 'tap-discount':
            url += 'tap-discount/';
            break;
    }
    url += '?rides=' + rides_per_day;
    url += '&days=' + days_per_week;

    console.log(url);
    // FormData.setAttribute('action', url);
    window.location.href = url;
});
