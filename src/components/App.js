import "../index.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup.js";
import React, { useState } from "react";

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };

    const handleAddCardClick = () => {
        setAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };

    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setImagePopupOpen(false);
    };

    const handleCardClick = (card) => {
        setSelectedCard({
            ...selectedCard,
            name: card.name,
            link: card.link,
        });
        setImagePopupOpen(true);
    };

    return (
        <div className="page__container">
            <>
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddCardClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />
                <Footer />
                <PopupWithForm
                    name="avatar"
                    title="Обновить аватар"
                    titleButton="Сохранить"
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                >
                    <input
                        type="url"
                        id="avatar-input-error"
                        className="form__item form__item_input-avatar"
                        name="link"
                        placeholder="Ссылка на аватар"
                        required=""
                    />
                    <span className="form__item-error" />
                </PopupWithForm>
                <PopupWithForm
                    name="profile"
                    title="Редактировать профиль"
                    titleButton="Сохранить"
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                >
                    <input
                        type="text"
                        id="name-input-error"
                        className="form__item form__item_input_name"
                        name="name"
                        placeholder="name"
                        minLength={2}
                        maxLength={40}
                        required=""
                    />
                    <span className="form__item-error" />
                    <input
                        type="text"
                        id="description-input-error"
                        className="form__item form__item_input_description"
                        name="about"
                        placeholder="description"
                        minLength={2}
                        maxLength={200}
                        required=""
                    />
                    <span className="form__item-error" />
                </PopupWithForm>
                <PopupWithForm
                    name="add"
                    title="Новое место"
                    titleButton="Сохранить"
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                >
                    <input
                        type="text"
                        id="name-input-second-error"
                        className="form__item form__item_input-name form__item_input-name_second"
                        name="title"
                        placeholder="Название"
                        minLength={2}
                        maxLength={30}
                        required=""
                    />
                    <span className="form__item-error" />
                    <input
                        type="url"
                        id="url-input-error"
                        className="form__item form__item_input-description form__item_input-description_second"
                        name="link"
                        placeholder="Ссылка на картинку"
                        required=""
                    />
                    <span className="form__item-error" />
                </PopupWithForm>
                <ImagePopup
                    id="popup_image"
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                />
                <div className="popup_confirm" id="popup_confirm">
                    <div className="popup__container_confirm">
                        <button
                            className="popup__close-button_confirm"
                            type="button"
                        />
                        <h2 className="popup__title_confirm">Вы уверены?</h2>
                        <form
                            className="form_confirm"
                            name="formDeleteConfirm"
                            noValidate=""
                        >
                            <button
                                className="form__submit-button_confirm"
                                type="submit"
                                aria-label="Подтвердить удаление"
                            >
                                Да
                            </button>
                        </form>
                    </div>
                </div>
            </>
        </div>
    );
}

export default App;
