paypal.Buttons({
    createOrder: function (data, actions) {
        // Set up the transaction
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: basket.totalPrice // Can be any value you want to charge for
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        // Capture the funds from the transaction
        return actions.order.capture().then(function (details) {
            // Show a success message to your buyer
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    }
}).render('#paypal-button-container');

const openPayPalDialog = () => {
    document.getElementById("paypal-dialog").classList.remove("d-none");
    document.getElementById("order-btn").classList.add("btn-disable");
    document.getElementById("order-btn").setAttribute("disabled", "true");
}

const closePayPalDialog = () => {
    document.getElementById("paypal-dialog").classList.add("d-none");
    document.getElementById("order-btn").classList.remove("btn-disable");
    document.getElementById("order-btn").removeAttribute("disabled");
}
