// Selects the hidden "other job role" input field
const otherJobRole = document.querySelector('#other-job-role');
// Selects 'job role' select element
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

let validName = false;
let validEmail = false;
let validActivities = false;
let validZip = false;
let validCvv = false;
let validCC = false;

let totalCost;


// HELPER FUNCTIONS
// Applies styles and formatting if input is invalid
const invalid = (element) => {
    element.parentElement.classList.remove('valid');
    element.parentElement.classList.add('not-valid');
    element.parentElement.lastElementChild.style.display = "block";
}
// Applies styles and formatting if input is valid
const valid = (element) => {
    element.parentElement.classList.remove('not-valid');
    element.parentElement.classList.add('valid');
    element.parentElement.lastElementChild.style.display = "none";
}



// BASIC INFO SECTION

// Selects name input box
const userName = document.querySelector('#name');
// Focus state by default on first text input field
userName.focus();

// VALIDATION FOR USER NAME INPUT
const validateName = () => {
    // Tests if user has filled the field and applies relevant accessibility and feedback styles.
    if (userName.value){
        valid(userName);
        validName = true;
    } else {
        invalid(userName);
        validName = false;
    }
}


// Selects email input box
const email = document.querySelector('#email');

// VALIDATION FOR EMAIL INPUT
const validateEmail = () => {
    // Email address regex sourced from https://emailregex.com/
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // Tests email input against regex and applies the relevant accessibility and feedback styles.
    // This is explored in the attached README.md file.
    if (!emailRegex.test(email.value)) {
        invalid(email);
        if (/["(),:;<.>@\[\]]/.test(email.value.charAt(0)) === true){
            email.parentElement.lastElementChild.innerHTML = 'You have started your email address with a forbidden character.';
        } else if(!email.value.includes('@')){
            email.parentElement.lastElementChild.innerHTML = 'Remember to include an @ symbol while formatting your email to the "username@company.com" standard.';
        } else if (!email.value.includes('.')) {
            email.parentElement.lastElementChild.innerHTML = 'Remember to include your email domain extension! (eg: .com)';
        } 
        validEmail = false;
    } else {
        valid(email);
        validEmail = true;
    }
}
// Applies input event listener for realtime validation
email.addEventListener('input', () => {
    validateEmail();
})




// JOB ROLE - Displays input field when "other" is selected
selectJobRole.addEventListener('input', (e) => {
    console.log(e.target.value);
    if (e.target.value === "other") {
        otherJobRole.style.display = "";
    } else {
        otherJobRole.style.display = "none";
    }
})





// T-SHIRT INFO SECTION

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





// REIGSTER FOR ACTIVITIES SECTION

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

// VALIDATION FOR ACTIVITY REGISTRATION
const validateRegistered = () => {
    // Tests if user has registered for event by evaluating total cost  and applies the relevant accessibility and feedback styles.
    if (totalCost > 0) {
        valid(registerForActivities.firstElementChild);
        validActivities = true;
    } else {
        invalid(registerForActivities.firstElementChild);
        validActivities = false;
    }
}

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
    validateRegistered();
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






// PAYMENT INFO SECTION


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


// CC Input Selectors
const creditCardInput = document.querySelector('#cc-num');
const zipCodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');

// CC Validation Functions
// Zip Section
const validateZip = () => {
    const zipCodeRegex = /^\d{5}$/gm
    if (!zipCodeRegex.test(zipCodeInput.value)) {
        invalid(zipCodeInput);
        validZip = false;
    } else {
        valid(zipCodeInput);
        validZip = true;
    }
}

// CVV Section
const validateCvv = () => {
    const cvvRegex = /^\d{3}$/gm
    if (!cvvRegex.test(cvvInput.value)) {
        invalid(cvvInput);
        validCvv = false;
    } else {
        valid(cvvInput);
        validCvv = true;
    }
}

const validateCC = () => {
    // Saves the credit card input value to a variable for manipulation.
    // Removes white space to allow for fair validation if user has added formatting
    let creditCardNum = creditCardInput.value;
    creditCardNum = creditCardNum.replace(/\s/g, "");

    // Performs validation check on input
    const creditRegex = /^\d{13,16}$/gm
    if (creditRegex.test(creditCardNum)) {
        valid(creditCardInput);
        validCC = true;
    } else {
        invalid(creditCardInput);
        validCC = false;
    }

    // Reformats viewable credit card input to match validation standards. 
    creditCardInput.value = creditCardNum;
}

// Realtime Validation of CC input
// Zip Section
zipCodeInput.addEventListener('input', () => {
    validateZip();
})

// CVV Section
cvvInput.addEventListener('input', () => {
    validateCvv();
})

creditCardInput.addEventListener('input', () => {
    validateCC();
})

// PAYMENT VALIDATION
const validatePayment = () => {
    let paymentOption = userPayment.options[userPayment.selectedIndex].value;
    if (paymentOption === "credit-card") {
        validateZip();
        validateCvv();
        validateCC();
    }
    if (paymentOption !== "credit-card") {
        validPayment = true;
    } else if (paymentOption === "credit-card" && validCC && validZip && validCvv) {
        validPayment = true;
    } else {
        validPayment = false;
    }
}


const validateForm = () => {
        // Validate name input
        validateName();

        // Validate email input
        validateEmail();
    
        // Validate "register for activities" input
        validateRegistered();

        // Validate payment options
        validatePayment();    
}


// FORM SUBMISSION SECTION
form.addEventListener('submit', (e) => {
    // Re-runs validation checks on form
    validateForm();

    if (validName && validEmail && validActivities && validPayment) {
        console.log('everything is valid');
    } else {
        e.preventDefault();
        alert('Some input fields are invalid. Please review these before submitting.')
    }
    
})

