import React from "react";
import styles from '../../styles/styleChat.css'
import Send from '../../assets/svg/Send.svg'
export const Footer = () => {
    return (
        <>
            <div id="chat-footer">
                <div id="chat-footer-itens">
                    <div id="chat-footer-itens-input">
                        <input tyoe="text" id="chat-footer-itens-input-input"></input>
                    </div>
                    <div id="chat-footer-itens-send">
                        <img src={Send} alt="send" id="chat-header-itens-img-item"/>
                    </div>
                </div>
            </div>
        </>
    );
}