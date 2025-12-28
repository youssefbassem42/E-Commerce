const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');
const submitBtn = document.getElementById('submitBtn');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const confirmError = document.getElementById('confirm-error');
const ruleMessage = document.getElementById('rule-message');
const rulesEl = document.getElementById('password-rules');

function validateName(value) {
  if (!value) return 'Full name is required';
  if (value.length < 3) return 'Name must be at least 3 characters';
  if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name must contain letters and spaces only';
  return '';
}

function validateEmail(value) {
  if (!value) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) return 'Please enter a valid email';
  return '';
}

function validatePassword(value) {
  if (!value) return '';
  return {
    length: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /\d/.test(value)
  };
}

function validateConfirm(pass, confirm) {
  if (!confirm) return '';
  return pass === confirm ? '' : 'Passwords do not match';
}

function showFirstError(focus = false) {
  const nameErr = validateName(nameInput.value);
  nameInput.classList.toggle('invalid', !!nameErr);
  nameInput.classList.toggle('valid', !nameErr);
  nameError.textContent = nameErr;
  nameError.style.display = nameErr ? 'block' : 'none';
  if (nameErr && focus) { nameInput.focus(); return false; }

  const emailErr = validateEmail(emailInput.value);
  emailInput.classList.toggle('invalid', !!emailErr);
  emailInput.classList.toggle('valid', !emailErr);
  emailError.textContent = emailErr;
  emailError.style.display = emailErr ? 'block' : 'none';
  if (emailErr && focus) { emailInput.focus(); return false; }

  const passChecks = validatePassword(passInput.value);
  const passValid = passChecks.length && passChecks.uppercase && passChecks.lowercase && passChecks.number;
  passInput.classList.toggle('invalid', !passValid);
  passInput.classList.toggle('valid', passValid);
  if (!passValid && focus) { passInput.focus(); return false; }

  const confirmErr = validateConfirm(passInput.value, confirmInput.value);
  confirmInput.classList.toggle('invalid', !!confirmErr);
  confirmInput.classList.toggle('valid', !confirmErr);
  confirmError.textContent = confirmErr;
  confirmError.style.display = confirmErr ? 'block' : 'none';
  if (confirmErr && focus) { confirmInput.focus(); return false; }

  return true;
}

function updateSubmitButton() {
  const nameOk = !validateName(nameInput.value);
  const emailOk = !validateEmail(emailInput.value);
  const passChecks = validatePassword(passInput.value);
  const passOk = passChecks.length && passChecks.uppercase && passChecks.lowercase && passChecks.number;
  const confirmOk = !validateConfirm(passInput.value, confirmInput.value) && confirmInput.value;

  submitBtn.disabled = !(nameOk && emailOk && passOk && confirmOk);
}

nameInput.addEventListener('input', () => {
  const err = validateName(nameInput.value);
  nameInput.classList.toggle('invalid', !!err);
  nameInput.classList.toggle('valid', !err);
  nameError.textContent = err;
  nameError.style.display = err ? 'block' : 'none';
  updateSubmitButton();
});

emailInput.addEventListener('input', () => {
  const err = validateEmail(emailInput.value);
  emailInput.classList.toggle('invalid', !!err);
  emailInput.classList.toggle('valid', !err);
  emailError.textContent = err;
  emailError.style.display = err ? 'block' : 'none';
  updateSubmitButton();
});

passInput.addEventListener('input', () => {
  const value = passInput.value;
  rulesEl.style.display = 'none';
  passInput.classList.remove('invalid', 'valid');

  const checks = validatePassword(value);

  if (!value) {
    updateSubmitButton();
    return;
  }

  if (!checks.length) {
    ruleMessage.textContent = '• At least 8 characters';
    rulesEl.style.display = 'block';
    passInput.classList.add('invalid');
  } else if (!checks.uppercase) {
    ruleMessage.textContent = '• One uppercase letter';
    rulesEl.style.display = 'block';
    passInput.classList.add('invalid');
  } else if (!checks.lowercase) {
    ruleMessage.textContent = '• One lowercase letter';
    rulesEl.style.display = 'block';
    passInput.classList.add('invalid');
  } else if (!checks.number) {
    ruleMessage.textContent = '• One number';
    rulesEl.style.display = 'block';
    passInput.classList.add('invalid');
  } else {
    passInput.classList.add('valid');
    rulesEl.style.display = 'none';
  }

  if (confirmInput.value) {
    const err = validateConfirm(passInput.value, confirmInput.value);
    confirmInput.classList.toggle('invalid', !!err);
    confirmInput.classList.toggle('valid', !err);
    confirmError.style.display = err ? 'block' : 'none';
  }
  updateSubmitButton();
});

confirmInput.addEventListener('input', () => {
  const err = validateConfirm(passInput.value, confirmInput.value);
  confirmInput.classList.toggle('invalid', !!err);
  confirmInput.classList.toggle('valid', !err);
  confirmError.textContent = err;
  confirmError.style.display = err ? 'block' : 'none';
  updateSubmitButton();
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const isValid = showFirstError(true);
  if (isValid && !submitBtn.disabled) {
    window.location.href = 'login.html';
  }
});