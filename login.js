const anotherWay = document.getElementById("anotherWay");
const emailSection = document.getElementById("emailLoginSection");
const phoneSection = document.getElementById("phoneLoginSection");
const backToEmail = document.getElementById("backToEmail");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("phoneNumber");
const otpInput = document.getElementById("otp");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const togglePassword = document.getElementById("togglePassword");
const loginForm = document.getElementById("loginForm");

if (anotherWay) {
  anotherWay.addEventListener("click", function (e) {
    e.preventDefault();
    emailSection.style.display = "none";
    phoneSection.style.display = "block";

    // Remove required from email/password so browser doesn't block submission
    if (emailInput) emailInput.removeAttribute("required");
    if (passwordInput) passwordInput.removeAttribute("required");
    if (phoneInput) phoneInput.setAttribute("required", "true");
  });
}

if (backToEmail) {
  backToEmail.addEventListener("click", function (e) {
    e.preventDefault();
    phoneSection.style.display = "none";
    emailSection.style.display = "block";

    // Restore required attributes
    if (emailInput) emailInput.setAttribute("required", "true");
    if (passwordInput) passwordInput.setAttribute("required", "true");
    if (phoneInput) phoneInput.removeAttribute("required");
  });
}

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.classList.remove("fa-eye-slash");
      togglePassword.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      togglePassword.classList.remove("fa-eye");
      togglePassword.classList.add("fa-eye-slash");
    }
  });
}

if (sendOtpBtn && phoneInput) {
  sendOtpBtn.addEventListener("click", () => {
    if (!phoneInput.value || phoneInput.value.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      phoneInput.focus();
      return;
    }
    alert(`OTP sent to +91 ${phoneInput.value}! (Demo OTP: 123456)`);
    if (otpInput) otpInput.focus();
  });
}

if (verifyOtpBtn && otpInput) {
  verifyOtpBtn.addEventListener("click", () => {
    if (!otpInput.value || otpInput.value.length < 4) {
      alert("Please enter the 6-digit OTP.");
      otpInput.focus();
      return;
    }
    alert("Phone verified successfully! Welcome to T MART.");
    window.location.href = "index.html";
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (emailSection.style.display !== "none") {
      alert(`Welcome back! Logged in as ${emailInput ? emailInput.value : "User"}`);
      window.location.href = "index.html";
    }
  });
}