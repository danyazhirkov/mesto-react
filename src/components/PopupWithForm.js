import React from "react";

const PopupWithForm = ({ name, title, children, isOpen, onClose }) => {
    return (
        <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <button
                    type="button"
                    aria-label="Закрыть"
                    className="popup__close-button popup__close-button_first"
                    onClick={onClose}
                />
                <form name={`form_${name}`} className={`form form_${name}`}>
                    {children}
                    <input
                        type="submit"
                        defaultValue="Сохранить"
                        className="form__submit-button"
                    />
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
