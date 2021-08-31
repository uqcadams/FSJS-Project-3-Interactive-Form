# FSJS-Project-3-Interactive-Form
 Full Stack JavaScript Project 3 - Interactive Form

Form validation instructions:

Exceeds expectations if meets expectations plus all of the following are true:

    At least one required field validates user input in real time as the user interacts with the field.
    At least one required form field provides validation error messages that differ depending on the reason the field is invalid.
    Form fields that have real time validation and conditional error messages are detailed in the project’s README.me file.

I have included realtime validation on a number of fields. 

The email address has realtime validation via the 'input' event listener:

const email = document.querySelector('#email');
email.addEventListener('input', () => {
    validateEmail();
})

The process validates in the following manner:

<!-- IF THE EMAIL ADDRESS IS CURRENTLY INVALID -->
    if (!emailRegex.test(email.value)) {

        <!-- APPLY THE 'INVALID' FORMATTING STYLES -->
        invalid(email);

        <!-- CHECK IF THE FIRST CHARACTER OF THE EMAIL ADDRESS INPUT IS A FORBIDDEN CHARACTER. IF THE EMAIL ADDRESS BEGINS WITH THE CHARACTERS "(),:;<.>@\[\] THEN UPDATE THE TOOLTIP TO PROVIDE FEEDBACK TO THE USER ABOUT THE ERROR OF THEIR WAYS. -->
        if (/["(),:;<.>@\[\]]/.test(email.value.charAt(0)) === true){
            email.parentElement.lastElementChild.innerHTML = 'You have started your email address with a forbidden character.';

        <!-- CHECK IF THE EMAIL ADDRESS INCLUDES AN @ SYMBOL. THIS TOOLTIP PROVIDES FEEDBACK TO THE USER ABOUT THE EXPECTED EMAIL FORMATTING STANDARD.  -->
        } else if(!email.value.includes('@')){
            email.parentElement.lastElementChild.innerHTML = 'Remember to include an @ symbol while formatting your email to the "username@company.com" standard.';

        <!-- CHECK IF THE EMAIL ADDRESS INCLUDES A DOMAIN EXTENSION. CONDITIONAL PRIORITY SHOULD MAKE THIS APPEAR AFTER AN @ SYMBOL HAS BEEN ADDED TO THE INPUT -->
        } else if (!email.value.includes('.')) {
            email.parentElement.lastElementChild.innerHTML = 'Remember to include your email domain extension! (eg: .com)';
        } 
    } else {
        valid(email);
    }