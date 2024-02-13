const promiseForm = document.querySelector("form");
promiseForm.addEventListener("submit", createPromise);

function createPromise(event) {
  event.preventDefault();

  const delayInput = document.querySelector("input[name='delay']");
  const delay = parseInt(delayInput.value);

  const stateRadios = document.getElementsByName("state");
  let selectedState;

  for (const radio of stateRadios) {
    if (radio.checked) {
      selectedState = radio.value;
      break;
    }
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === "fulfilled") {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });

  promise
    .then(() => {
      iziToast.success({
        title: "",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "center",
      });
    })
    .catch(() => {
      iziToast.error({
        title: "",
        message: `❌ Rejected promise in ${delay}ms`,
        position: "center",
      });
    });
}
