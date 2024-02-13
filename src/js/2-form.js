const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const textarea = form.elements.message;
const localStorageKey = 'feedback-form-state';

function updateFormFields() {
  const formData = JSON.parse(localStorage.getItem(localStorageKey)) || {};
  emailInput.value = formData.email ?? '';
  textarea.value = formData.message ?? '';
}

updateFormFields();

form.addEventListener('input', function () {
  const formData = {
    email: emailInput.value.trim(),
    message: textarea.value.trim(),
  };

  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = JSON.parse(localStorage.getItem(localStorageKey)) || {};

  if (formData.email && formData.message) {
    console.log(formData);

    localStorage.removeItem(localStorageKey);
    form.reset();
  }
});
