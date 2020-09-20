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
      document.querySelector(".login").classList.add("d-none");
      document.querySelector(".content").classList.remove("d-none");
      startGame(name);
    }
  });
});