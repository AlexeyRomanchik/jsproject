import postData from "../services/postData";
import {openModel, closeModal} from "./modal";

function forms(formSelector, modalSelector) {
    const message = {
        loading: "img/form/spinner.svg",
        sucsess: "Спасибо! Наши специалисты свяжутся с вами в ближайшее время.",
        failure: "Что-то произошло не так..."
    };

    const forms = document.querySelectorAll(formSelector);

    const showPostResultModal = (message) => {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        openModel(modalSelector);

        const tanksModal = document.createElement("div");
        tanksModal.classList.add("modal__dialog");
        tanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>`;

        prevModalDialog.parentElement.append(tanksModal);

        setTimeout(() => {
            tanksModal.remove();
            prevModalDialog.classList.remove("hide");
            prevModalDialog.classList.add("show");
            closeModal(modalSelector);
        }, 5000);
    };

    const bindData = (form) => {
        form.addEventListener("submit", event => {
            event.preventDefault();

            const formData = new FormData(event.target),
                statusImage = document.createElement("img"),
                json = JSON.stringify(Object.fromEntries(formData.entries()));

            statusImage.src = message.loading;
            statusImage.style.cssText = `
                display: block;
                margin: 0px auto;
            `;
            form.after(statusImage);

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showPostResultModal(message.sucsess);
                })
                .catch(() => {
                    showPostResultModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    statusImage.remove();
                });
        });
    };

    forms.forEach(form => {
        bindData(form);
    });
}

export default forms;