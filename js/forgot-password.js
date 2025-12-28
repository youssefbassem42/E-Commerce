const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const emailError = document.getElementById('email-error');

function validateEmail(value) {
  if (!value) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) return 'Please enter a valid email';
  return '';
}

emailInput.addEventListener('input', () => {
  const error = validateEmail(emailInput.value);
  emailInput.classList.toggle('invalid', !!error);
  emailError.textContent = error;
  emailError.style.display = error ? 'block' : 'none';
});

document.getElementById('forgotForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const emailErr = validateEmail(emailInput.value);
  emailInput.classList.toggle('invalid', !!emailErr);
  emailError.textContent = emailErr;
  emailError.style.display = emailErr ? 'block' : 'none';

  if (!emailErr) {
    window.location.href = 'login.html';
  }
});