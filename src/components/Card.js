import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="element">
            <img
                src={props.link}
                className="element__photo"
                alt={props.alt}
                onClick={handleClick}
            />
            <button type="button" className="element__button-trash"></button>
            <div className="element__description">
                <h2 className="element__name">{props.name}</h2>
                <div className="element__likes-stuff">
                    <button
                        type="button"
                        className="element__button-heart"
                    ></button>
                    <div className="element__like-counter">{props.likes}</div>
                </div>
            </div>
        </div>
    );
}

export default Card;
