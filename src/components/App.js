import "../index.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/utils";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [deletePlace, setDeletePlace] = useState(null);

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch(() => console.error(`Получение данных по лайкам, App`));
    }

    function handleDeleteCard(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .then(closeAllPopups)
            .catch(() => console.error(`Удаление карточки, App`));
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };

    const handleAddCardClick = () => {
        setAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };

    const handleConfirmDeleteClick = (card) => {
        setConfirmPopupOpen(true);
        setDeletePlace(card);
    };

    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setImagePopupOpen(false);
        setConfirmPopupOpen(false);
    };

    const handleCardClick = (card) => {
        setSelectedCard({
            ...selectedCard,
            name: card.name,
            link: card.link,
        });
        setImagePopupOpen(true);
    };

    useEffect(() => {
        api.getUserData()
            .then((userData) => setCurrentUser(userData))
            .catch(() => console.error(`Получение данных пользователя, App`));
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((cards) => setCards(cards))
            .catch(() => console.error(`Получение карточек, App`));
    }, []);

    function handleUpdateUser(userData) {
        api.updateUserData(userData)
            .then(setCurrentUser)
            .then(closeAllPopups)
            .catch(() => console.error(`Обновление данных профиля, App`));
    }

    function handleUpdateAvatar(avatarLink) {
        api.updateUserAvatar(avatarLink)
            .then(setCurrentUser)
            .then(closeAllPopups)
            .catch(() => console.error(`Обновление аватарки, App`));
    }

    function handleAppPlaceSubmit(userData) {
        api.sendingCard(userData)
            .then((newCard) => setCards([newCard, ...cards]))
            .then(closeAllPopups)
            .catch(() => console.error(`Добавление новой карточки, App`));
    }

    return (
        <div className="page__container">
            <>
                <CurrentUserContext.Provider value={currentUser}>
                    <Header />
                    <Main
                        cards={cards}
                        onCardLike={handleCardLike}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddCardClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardDelete={handleConfirmDeleteClick}
                    />
                    <Footer />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAppPlaceSubmit}
                    />
                    <ImagePopup
                        id="popup_image"
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                    />
                    <DeletePlacePopup
                        isOpen={isConfirmPopupOpen}
                        onClose={closeAllPopups}
                        onCardDelete={handleDeleteCard}
                        card={deletePlace}
                    />
                </CurrentUserContext.Provider>
            </>
        </div>
    );
}

export default App;
