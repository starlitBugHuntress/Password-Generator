// Element references
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");
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

function getPreferences() {
  // Prompt for length
  var length = parseInt(prompt("How many characters would you like your password to be? (8-128)"));
  if (isNaN(length) || length < 8 || length > 128) {
    alert("Please enter a valid length between 8 and 128 characters.");
    return null;
  }

  // Confirm character types
  var hasLower   = confirm("Press OK to include lowercase letters, or Cancel to skip.");
  var hasUpper   = confirm("Press OK to include uppercase letters, or Cancel to skip.");
  var hasNumber  = confirm("Press OK to include numbers, or Cancel to skip.");
  var hasSpecial = confirm("Press OK to include special characters, or Cancel to skip.");

  // Require at least one type
  if (!hasLower && !hasUpper && !hasNumber && !hasSpecial) {
    alert("You must select at least one character type.");
    return null;
  }

  return { length, hasLower, hasUpper, hasNumber, hasSpecial };
}

function generatePassword(lower, upper, number, symbol, length) {
  var generatedPassword = '';
  var typesCount = lower + upper + number + symbol;
  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
    item => Object.values(item)[0]
  );

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += variables[funcName]();
    });
  }

  return generatedPassword.slice(0, length);
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

// Generate password on button click
generateBtn.addEventListener("click", () => {
  var preferences = getPreferences();
  if (!preferences) return;

  var { length, hasLower, hasUpper, hasNumber, hasSpecial } = preferences;
  var result = generatePassword(hasLower, hasUpper, hasNumber, hasSpecial, length);

  passwordText.value = result;
  copyBtn.disabled = false;
});