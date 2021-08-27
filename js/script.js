const otherJobRole = document.querySelector('#other-job-role');
const selectJobRole = document.querySelector('#title');
const tShirtColor = document.querySelector('#color');
const tShirtColorOptions = document.querySelectorAll('#color > option');
const tShirtDesign = document.querySelector('#design');
const registerForActivities = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
const userPayment = document.querySelector('#payment');
const userPaymentOptions = document.querySelectorAll('#payment > option');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const paymentArray = [creditCard, paypal, bitcoin];
const form = document.querySelector('form');

otherJobRole.style.display = "none";
tShirtColor.disabled = true;
userPaymentOptions[1].selected = "true";
paypal.style.display = "none";
bitcoin.style.display = "none";

let totalCost;

// Focus state by default on first text input field
document.querySelector('input[type="text"]').focus();

// Job Role
selectJobRole.addEventListener('input', (e) => {
    console.log(e.target.value);
    if (e.target.value === "other") {
        otherJobRole.style.display = "";
    } else {
        otherJobRole.style.display = "none";
    }
})

// Show and hide shirt design styles according to user input
tShirtDesign.addEventListener('input', (e) => {
    // Disables colour selection until design is selected
    tShirtColor.disabled = false;
    // Resets the select option to default if user changes design selection
    tShirtColorOptions[0].selected = "true";
    // Iterate through the shirt colours to display only those that match the design specificiations.
    for (let i = 0; i < tShirtColorOptions.length; i++){
        if (e.target.value === tShirtColorOptions[i].dataset.theme){
            tShirtColorOptions[i].style.display = "";
        } else {
            tShirtColorOptions[i].style.display = "none";
        }
    }
});


// COMMENT
// Clears checkboxes on load in case of browser caching 
const clearChecks = () => {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkBoxes) {
        checkbox.checked = "";
    }
    totalCost = 0;
    activitiesCost.innerHTML = `Total: $${totalCost}`;
}

// COMMENT
clearChecks();

// COMMENT
registerForActivities.addEventListener('input', (e) => {
    let cost = parseInt(e.target.dataset.cost);
    if (e.target.checked){
        totalCost += cost;
    } else {
        totalCost -= cost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
})

// COMMENT
userPayment.addEventListener('input', (e) => {
    for (let paymentOption of paymentArray) {
        if (e.target.value === paymentOption.className) {
            paymentOption.style.display = "";
        } else {
            paymentOption.style.display = "none";
        }
    }
})

// COMMENT
const validateForm = () => {

}

// COMMENT
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name');

    if (name.value){
        console.log('there is a name');
    } else {
        console.log('no name');
    }
})