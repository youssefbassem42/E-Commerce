const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const emailError = document.getElementById('email-error');
const passError = document.getElementById('password-error');

function validateEmail(value) {
  if (!value) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) return 'Please enter a valid email';
  return '';
}

function validatePassword(value) {
  if (!value) return 'Password is required';
  return '';
}

emailInput.addEventListener('input', () => {
  const error = validateEmail(emailInput.value);
  emailInput.classList.toggle('invalid', !!error);
  emailError.textContent = error;
  emailError.style.display = error ? 'block' : 'none';
});

passInput.addEventListener('input', () => {
  const error = validatePassword(passInput.value);
  passInput.classList.toggle('invalid', !!error);
  passError.textContent = error;
  passError.style.display = error ? 'block' : 'none';
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const emailErr = validateEmail(emailInput.value);
  const passErr = validatePassword(passInput.value);

  emailInput.classList.toggle('invalid', !!emailErr);
  passInput.classList.toggle('invalid', !!passErr);
  emailError.textContent = emailErr;
  passError.textContent = passErr;
  emailError.style.display = emailErr ? 'block' : 'none';
  passError.style.display = passErr ? 'block' : 'none';

  if (!emailErr && !passErr) {
    window.location.href = 'home.html';
  }
});