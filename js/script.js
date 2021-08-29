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
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');

otherJobRole.style.display = "none";
tShirtColor.disabled = true;
userPaymentOptions[1].selected = "true";
paypal.style.display = "none";
bitcoin.style.display = "none";

let totalCost;

// Focus state by default on first text input field
// Selects the name input 
const userName = document.querySelector('#name');
document.querySelector('#name').focus();

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


// CHECKBOX RESET
// Clears checkboxes on load in case of browser caching 
const clearChecks = () => {
    for (let checkbox of checkBoxes) {
        checkbox.checked = "";
    }
    totalCost = 0;
    activitiesCost.innerHTML = `Total: $${totalCost}`;
}

clearChecks();

// REGISTER FOR ACTIVITIES EVENT LISTENER
registerForActivities.addEventListener('input', (e) => {
    // Converts the dataset of the target into an integer to add to the total cost
    let cost = parseInt(e.target.dataset.cost);
    // if the click target is checked
    if (e.target.checked){
        // Add the data cost value to the total cost
        totalCost += cost;
        // Iterate through the checkboxes
        for (let checkbox of checkBoxes) {
            // If the checkbox has the same date and time as the target, and is not the target, disable it.
            if (checkbox.dataset.dayAndTime === e.target.dataset.dayAndTime && checkbox !== e.target) {
                checkbox.disabled = true;
            }
        }
    } else {
        // Subtract the data cost value from the total cost
        totalCost -= cost;
        for (let checkbox of checkBoxes) {
            // If the checkbox has the same date and time as the target, and is not the target, enable it.
            if (checkbox.dataset.dayAndTime === e.target.dataset.dayAndTime && checkbox !== e.target) {
                checkbox.disabled = false;
            }
        }
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
})

// PAYMENT INFO EVENT LISTENER
// Listens for input in the payment option select element
userPayment.addEventListener('input', (e) => {
    // Iterates through all payment options
    for (let paymentOption of paymentArray) {
        // Displays the payment options that match the user selection; hides the rest
        if (e.target.value === paymentOption.className) {
            paymentOption.style.display = "";
        } else {
            paymentOption.style.display = "none";
        }
    }
})


const invalid = (element) => {
    element.parentElement.classList.remove('valid');
    element.parentElement.classList.add('not-valid');
    element.parentElement.lastElementChild.style.display = "block";
}

const valid = (element) => {
    element.parentElement.classList.remove('not-valid');
    element.parentElement.classList.add('valid');
    element.parentElement.lastElementChild.style.display = "none";
}


// VALIDATION FOR USER NAME INPUT
const validateName = () => {
    // Tests if user has filled the field and applies relevant accessibility and feedback styles.
    if (userName.value){
        console.log('The user has successfuly entered a name in the input field');
        valid(userName);
    } else {
        console.log('The user has failed to enter a name in the input field');
        invalid(userName);
    }
}




// VALIDATION FOR EMAIL INPUT
const validateEmail = () => {
    // Selects the email input 
    const email = document.querySelector('#email');

    // Email address regex sourced from https://emailregex.com/
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // Tests email input against regex and applies the relevant accessibility and feedback styles.
    if (!emailRegex.test(email.value)) {
        console.log('The email input does meet the required specifications');
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');
        email.parentElement.lastElementChild.style.display = "block";
    } else {
        console.log('The user has successfully input a valid email address');
        email.parentElement.classList.remove('not-valid');
        email.parentElement.classList.add('valid');
        email.parentElement.lastElementChild.style.display = "none";
    }
}



// VALIDATION FOR ACTIVITY REGISTRATION
const validateRegistered = () => {
    // Tests if user has registered for event by evaluating total cost  and applies the relevant accessibility and feedback styles.
    if (totalCost > 0) {
        console.log('The user has registered for at least one activity');
        registerForActivities.classList.remove('not-valid');
        registerForActivities.classList.add('valid');
        registerForActivities.lastElementChild.style.display = "none";
    } else {
        console.log('The user has not registered for any activities');
        registerForActivities.classList.remove('valid');
        registerForActivities.classList.add('not-valid');
        registerForActivities.lastElementChild.style.display = "block";
    }
}

// VALIDATION FOR CREDIT CARD INPUT
const validateCreditCard = () => {
    if (userPayment.options[userPayment.selectedIndex].value === "credit-card") {
        console.log('Hey, this guy wants to use a credit card!');

        // Num Section
            const creditCardInput = document.querySelector('#cc-num');
            let creditCardNum = creditCardInput.value;
            // Removes white space to allow for fair validation if user has added formatting
            creditCardNum = creditCardNum.replace(/\s/g, "");

            const creditRegex = /^\d{13,16}$/gm
            if (creditRegex.test(creditCardNum)) {
                console.log('Yo this guy has valid CC details!');
                creditCardInput.parentElement.classList.remove('not-valid');
                creditCardInput.parentElement.classList.add('valid');
                creditCardInput.parentElement.lastElementChild.style.display = "none";
            } else {
                console.log('Credit card scammer!!! Get them!');
                creditCardInput.parentElement.classList.remove('valid');
                creditCardInput.parentElement.classList.add('not-valid');
                creditCardInput.parentElement.lastElementChild.style.display = "block";
            }
            creditCardInput.value = creditCardNum;
        
        // Zip Section
            const zipCodeInput = document.querySelector('#zip');
            let zipCode = zipCodeInput.value;
            const zipCodeRegex = /^\d{5}$/gm
            console.log(zipCodeRegex.test(zipCode));

        // CCV Section
            const cvvInput = document.querySelector('#cvv');
            let cvvNum = cvvInput.value;
            const cvvRegex = /^\d{3}$/gm
            console.log(cvvRegex.test(cvvNum));
    } else {
        console.log('This person does not want to use a credit card');
        e.preventDefault();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate name input
    validateName();

    // Validate email input
    validateEmail();

    // Validate "register for activities" input
    validateRegistered();

    // Validate credit card input
    validateCreditCard();

})

// Accessibility blur events
for (let checkbox of checkBoxes) {
    checkbox.addEventListener('focus', (e) => {
        checkbox.parentElement.classList.add('focus');
        console.log(e.target);
    })
    checkbox.addEventListener('blur', (e) => {
        checkbox.parentElement.classList.remove('focus');
        console.log(e.target);
    })
}