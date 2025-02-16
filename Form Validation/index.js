const submitBtn = document.getElementById('submitBtn');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');
const confirmPassError = document.getElementById('confirm-passError');
const contactError = document.getElementById('contactError');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (validateName() && validateEmail() && validatePassword() && validateConfirmPassword() && validateContact()) {
        showSuccessMessage("Form Submitted Successfully");
    }
});

function showSuccessMessage(message) {
    let successDiv = document.createElement("div");
    successDiv.innerText = message;
    successDiv.style.position = "fixed";
    successDiv.style.top = "15%";
    successDiv.style.left = "50%";
    successDiv.style.transform = "translate(-50%, -50%)";
    successDiv.style.background = "#198754";
    successDiv.style.color = "#f8f9fa";
    successDiv.style.padding = "15px 20px";
    successDiv.style.borderRadius = "6px";
    successDiv.style.fontSize = "15px";
    successDiv.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
    successDiv.style.opacity = "1";
    successDiv.style.transition = "opacity 0.5s ease-out";

    document.body.appendChild(successDiv);

    // Remove the message after 1 second with fade out
    setTimeout(() => {
        successDiv.style.opacity = "0";
        setTimeout(() => {
            successDiv.remove();
        }, 500); // Wait for fade-out transition to complete
    }, 1000);
}
function validateName(){
    let name = document.getElementById('name').value;

    if(name.length == 0){
        nameError.innerHTML = "Name is required";
        nameError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = "Write full Name";
        nameError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }
    nameError.innerHTML = "";
    nameError.previousElementSibling.classList.add('fa-check');
    return true;
}

function validateEmail(){
    let email = document.getElementById('email').value;

    if(email.length == 0){
        emailError.innerHTML = "Email is required";
        emailError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        emailError.innerHTML = "Enter Valid Email";
        emailError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }
    emailError.innerHTML = "";
    emailError.previousElementSibling.classList.add('fa-check');
    return true;
}
function validatePassword() {
    let password = document.getElementById('password').value;

    if (password.length === 0) {
        passError.innerHTML = "Password is required";
        passError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)) {
        passError.innerHTML = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character";
        passError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }
    passError.innerHTML = "";
    passError.previousElementSibling.classList.remove('fa-xmark');
    passError.previousElementSibling.classList.add('fa-check');
    return true;
}
function validateConfirmPassword() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmpassword').value;

    if (confirmPassword.length === 0) {
        confirmPassError.innerHTML = "Confirm Password is required";
        confirmPassError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    if (confirmPassword !== password) {
        confirmPassError.innerHTML = "Passwords do not match";
        confirmPassError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    confirmPassError.innerHTML = "";
    confirmPassError.previousElementSibling.classList.remove('fa-xmark');
    confirmPassError.previousElementSibling.classList.add('fa-check');
    return true;
}
function validateContact() {
    let contact = document.getElementById('contact').value;

    if (contact.length === 0) {
        contactError.innerHTML = "Contact number is required";
        contactError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    if (!contact.match(/^03\d{9}$/)) {
        contactError.innerHTML = "Enter a valid 11-digit number starting with 03";
        contactError.previousElementSibling.classList.add('fa-xmark');
        return false;
    }

    contactError.innerHTML = "";
    contactError.previousElementSibling.classList.remove('fa-xmark');
    contactError.previousElementSibling.classList.add('fa-check');
    return true;
}
