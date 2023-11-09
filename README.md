# DEVLIVERY

## SETUP PAYPAL

Creating a payment using the PayPal sandbox for a frontend webpage involves several steps. The PayPal sandbox is a testing environment that exactly simulates the live PayPal production environment, except no real money changes hands. Here’s a simplified guide on how to set it up:

### Step 1: Set up a PayPal Developer Account

1. Go to the[PayPal Developer Website](https://developer.paypal.com/home) and log in or create an account.
2. Navigate to the "Dashboard" and find the "SANDBOX" section.
3. Under "Sandbox", click on "Accounts" and create a sandbox business account (to receive payments) and a personal account (to simulate making payments).

---

### Step 2: Create a PayPal App

1. Still in the "SANDBOX" section, click on "My Apps & Credentials".
2. Under the "REST API apps" section, click "Create App".
3. Provide a name for your app and associate it with your sandbox business account.
4. Upon creation, you will be provided with a Client ID and a Secret for the sandbox environment. Keep these confidential.

---

### Step 3: Set up the Frontend

To integrate PayPal into your frontend webpage, you’ll need to use the PayPal JavaScript SDK.

1. Add the PayPal script tag to your HTML page:

    ```html
    <script src="https://www.paypal.com/sdk/js?client-id=YOUR_SANDBOX_CLIENT_ID&currency=USD"></script>
    ```

    Replace YOUR_SANDBOX_CLIENT_ID with the actual client ID from your sandbox app.

2. Create a container for the PayPal buttons:

    ```html
    <div id="paypal-button-container"></div>
    ```

3. Add the JavaScript to render the PayPal buttons:

    ```html
    paypal.Buttons({
    createOrder: function(data, actions) {
        // Set up the transaction
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '0.01' // Can be any value you want to charge for
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // Capture the funds from the transaction
        return actions.order.capture().then(function(details) {
            // Show a success message to your buyer
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    }
    }).render('#paypal-button-container');

    ```

    This JavaScript snippet does the following:

    - ```createOrder```: This function is called when the PayPal button is clicked. It sets up the details of the transaction, including the amount to be paid.
    - ```onApprove```: This function is called after the buyer approves the transaction on the PayPal website. Here you can capture the payment and show a success message.

---

### Step 4: Test the Payment

1. Visit your webpage with the PayPal buttons.
2. Click on the PayPal button, and you should be able to log in with the sandbox personal account you created.
3. Approve the payment and you should see a success message.

---

### Step 5: Backend Verification (Recommended)

For a complete and secure integration, you should verify the payment on your server by calling the PayPal API to execute the payment using your secret. You would typically send the payment ID to your server and then your server would call PayPal to verify the payment.

The backend would use the PayPal REST SDK or HTTP requests to interact with the PayPal API, verifying that the payment was successful and logging the transaction details as necessary.

---

### Step 6: Testing and Going Live

When you’re ready to go live:

1. Change the client ID in the PayPal SDK URL to your live client ID.
2. Make sure your backend uses the live secret and endpoints.
3. Test thoroughly with small transactions before launching.

Remember, when dealing with financial transactions, always ensure that your integration complies with PayPal's guidelines, and handle user data securely and responsibly.

---
