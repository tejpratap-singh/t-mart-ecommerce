const anotherWay = document.getElementById("anotherWay");

const emailSection = document.getElementById("emailLoginSection");

const phoneSection = document.getElementById("phoneLoginSection");

const backToEmail = document.getElementById("backToEmail");

anotherWay.addEventListener("click", function (e) {

    e.preventDefault();

    emailSection.style.display = "none";

    phoneSection.style.display = "block";

});

backToEmail.addEventListener("click", function (e) {

    e.preventDefault();

    phoneSection.style.display = "none";

    emailSection.style.display = "block";

});
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }else{

        passwordInput.type = "password";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    }

});