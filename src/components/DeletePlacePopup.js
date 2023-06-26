import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ card, isOpen, onClose, onCardDelete }) {
    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(card);
    }
    return (
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            titleButton="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        ></PopupWithForm>
    );
}

export default DeletePlacePopup;
