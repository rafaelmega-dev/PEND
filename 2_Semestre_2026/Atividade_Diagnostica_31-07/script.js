const themeToggleBtn = document.getElementById('themeToggle');
const hamburgerBtn = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');
const form = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('form-success');
const errorElements = {
  name: document.getElementById('name-error'),
  email: document.getElementById('email-error'),
  subject: document.getElementById('subject-error'),
  message: document.getElementById('message-error')
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const preferredTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(preferredTheme);
}

function toggleMenu() {
  navLinks.classList.toggle('active');
  hamburgerBtn.classList.toggle('active');
  const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
  hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
}

function closeMenu() {
  navLinks.classList.remove('active');
  hamburgerBtn.classList.remove('active');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}

function showError(input, errorElement, message) {
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  errorElement.textContent = message;
}

function showSuccessState(input, errorElement) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  input.setAttribute('aria-invalid', 'false');
  errorElement.textContent = '';
}

function clearErrors() {
  Object.values(errorElements).forEach((element) => {
    element.textContent = '';
  });

  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    input.classList.remove('is-invalid', 'is-valid');
    input.setAttribute('aria-invalid', 'false');
  });

  successMessage.textContent = '';
}

function validateName() {
  const value = nameInput.value.trim();
  if (value.length >= 3) {
    showSuccessState(nameInput, errorElements.name);
    return true;
  }

  showError(nameInput, errorElements.name, 'Digite seu nome com pelo menos 3 caracteres.');
  return false;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(value)) {
    showSuccessState(emailInput, errorElements.email);
    return true;
  }

  showError(emailInput, errorElements.email, 'Informe um e-mail válido.');
  return false;
}

function validateSubject() {
  const value = subjectInput.value.trim();
  if (value.length >= 5) {
    showSuccessState(subjectInput, errorElements.subject);
    return true;
  }

  showError(subjectInput, errorElements.subject, 'Informe um assunto com pelo menos 5 caracteres.');
  return false;
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (value.length >= 10) {
    showSuccessState(messageInput, errorElements.message);
    return true;
  }

  showError(messageInput, errorElements.message, 'Escreva uma mensagem com pelo menos 10 caracteres.');
  return false;
}

function validateForm() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isSubjectValid = validateSubject();
  const isMessageValid = validateMessage();

  return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
}

function attachFieldValidation() {
  const fields = [
    { input: nameInput, validator: validateName },
    { input: emailInput, validator: validateEmail },
    { input: subjectInput, validator: validateSubject },
    { input: messageInput, validator: validateMessage }
  ];

  fields.forEach(({ input, validator }) => {
    input.addEventListener('input', validator);
    input.addEventListener('blur', validator);
  });
}

function initNavigation() {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  hamburgerBtn.addEventListener('click', toggleMenu);

  navLinksItems.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth < 768 && !navLinks.contains(event.target) && !hamburgerBtn.contains(event.target)) {
      closeMenu();
    }
  });
}

function initForm() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    if (validateForm()) {
      successMessage.textContent = 'Mensagem validada com sucesso! Este formulário é apenas para demonstração.';
      form.reset();
    }
  });
}

function setCurrentYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

initTheme();
initNavigation();
attachFieldValidation();
initForm();
setCurrentYear();