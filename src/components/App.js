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
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true)
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .then(closeAllPopups)
            .catch(() => console.error(`Удаление карточки, App`))
            .finally(() => setIsLoading(false));
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

    const isOpen =
        isEditAvatarPopupOpen ||
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        isImagePopupOpen;

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === "Escape") {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", closeByEscape);
            return () => {
                document.removeEventListener("keydown", closeByEscape);
            };
        }
    }, [isOpen]);

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
        setIsLoading(true)
        api.updateUserData(userData)
            .then(setCurrentUser)
            .then(closeAllPopups)
            .catch(() => console.error(`Обновление данных профиля, App`))
            .finally(() => setIsLoading(false));
    }

    function handleUpdateAvatar(avatarLink) {
        setIsLoading(true)
        api.updateUserAvatar(avatarLink)
            .then(setCurrentUser)
            .then(closeAllPopups)
            .catch(() => console.error(`Обновление аватарки, App`))
            .finally(() => setIsLoading(false));
    }

    function handleAppPlaceSubmit(userData) {
        setIsLoading(true)
        api.sendingCard(userData)
            .then((newCard) => setCards([newCard, ...cards]))
            .then(closeAllPopups)
            .catch(() => console.error(`Добавление новой карточки, App`))
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="page__container">
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
                        isLoading={isLoading}
                    />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAppPlaceSubmit}
                        isLoading={isLoading}
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
                        isLoading={isLoading}
                    />
                </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
