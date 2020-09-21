import { startGame } from "./game.js";

document.querySelector(".play-button").addEventListener("click", () => {
  Swal.fire({
    title: 'Entre no tetr.io',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      placeholder: 'Digite seu nome'
    },
    confirmButtonText: 'Iniciar',
    heightAuto: false,
    customClass: {
      popup: 'popup-modal',
      header: 'header-modal',
      title: 'title-modal',
      input: 'input-modal',
      confirmButton: 'confirm-button-modal',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".main").classList.add("d-none");
      document.querySelector(".game").classList.remove("d-none");
      startGame(result.value);
    }
  });
});

document.querySelector(".reset-button").addEventListener("click", () => {
  Swal.fire({
    title: 'Entre no tetr.io',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      placeholder: 'Digite seu nome'
    },
    confirmButtonText: 'Iniciar',
    heightAuto: false,
    customClass: {
      popup: 'popup-modal',
      header: 'header-modal',
      title: 'title-modal',
      input: 'input-modal',
      confirmButton: 'confirm-button-modal',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".score").classList.add("d-none");
      document.querySelector(".game").classList.remove("d-none");
      startGame(result.value);
    }
  });
});

document.querySelector(".back-button").addEventListener("click", () => {
  document.querySelector(".score").classList.add("d-none");
  document.querySelector(".main").classList.remove("d-none");
});