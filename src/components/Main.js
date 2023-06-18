import vectorEditProfile from "../images/Vector.svg";
import vectorAddButton from "../images/add.svg";
import React, { useState, useEffect } from "react";
import { api } from "../utils/utils.js";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(initialCards);
            })
            .catch((err) => console.log("There is an error:", err));
    }, []);

    return (
        <main className="main">
            <section className="profile">
                <button
                    className="profile__avatar-button"
                    onClick={onEditAvatar}
                >
                    <img
                        src={userAvatar}
                        className="profile__avatar"
                        alt="Аватарка"
                    />
                </button>
                <div className="profile__info">
                    <div className="profile__items">
                        <h1 className="profile__name">{userName}</h1>
                        <p className="profile__description">
                            {userDescription}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    >
                        <img
                            src={vectorEditProfile}
                            className="profile__edit-image"
                            alt="Вектор"
                        />
                    </button>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                >
                    <img
                        src={vectorAddButton}
                        className="profile__vector"
                        alt="кнопка"
                    />
                </button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        card={card}
                        key={card._id}
                        link={card.link}
                        name={card.name}
                        likes={card.likes.length}
                        onCardClick={onCardClick}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;
