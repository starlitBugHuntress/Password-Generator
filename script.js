// Element references
var generateBtn = document.querySelector("#generate");
var formEl = document.querySelector("#preferences");
var submitBtn = document.querySelector("#submit");
var passwordText = document.querySelector("#password");
var lengthEl = document.querySelector("#length");
var lowercaseEl = document.querySelector("#lowercase");
var uppercaseEl = document.querySelector("#uppercase");
var numbersEl = document.querySelector("#numbers");
var specialEl = document.querySelector("#special");
var copyBtn = document.querySelector("#copy");

// Character generator functions
// Technique learned from Traversy Media "Javascript Password Generator", modified to fit project needs
const variables = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(lower, upper, number, symbol, length) {
  var generatedPassword = '';
  var typesCount = lower + upper + number + symbol;
  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
    item => Object.values(item)[0]
  );

  // Validate: at least one type selected
  if (typesCount === 0) {
    return "Please select at least one character type.";
  }
  // Validate: length range
  if (length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (length > 128) {
    return "Password must be no more than 128 characters.";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += variables[funcName]();
    });
  }

  return generatedPassword.slice(0, length);
}

function showForm() {
  formEl.style.display = "block";
}

// Copy to clipboard
copyBtn.addEventListener("click", () => {
  if (!passwordText.value) return;
  navigator.clipboard.writeText(passwordText.value).then(() => {
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");
    setTimeout(() => {
      copyBtn.textContent = "Copy to Clipboard";
      copyBtn.classList.remove("copied");
    }, 2000);
  });
});

// Show preferences panel
generateBtn.addEventListener("click", showForm);

// Generate password on submit
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  var length = +lengthEl.value;
  var hasLower = lowercaseEl.checked;
  var hasUpper = uppercaseEl.checked;
  var hasNumber = numbersEl.checked;
  var hasSpecial = specialEl.checked;

  var result = generatePassword(hasLower, hasUpper, hasNumber, hasSpecial, length);

  // If result is an error message, show it and don't update the password field
  var isError = (
    result === "Please select at least one character type." ||
    result === "Password must be at least 8 characters." ||
    result === "Password must be no more than 128 characters."
  );

  if (isError) {
    alert(result);
    return;
  }

  passwordText.value = result;

  // Enable copy button and hide form
  copyBtn.disabled = false;
  formEl.style.display = "none";
});