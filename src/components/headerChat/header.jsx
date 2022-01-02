import React from "react";
import styles from '../../styles/styleChat.css'
import closeChat from '../../assets/svg/CloseChat.svg'
export const Header = () => {
    return (
        <>
            <div id="chat-header">
                <div id="chat-header-Itens">
                    <div id="chat-header-itens-textos">
                        <p id="nomeChat">BALINU</p>
                        <p id="descricaoChat">Assistente Virtual da PROPPG</p>
                    </div>
                    <div id="chat-header-itens-img">
                        <img src={closeChat} alt="Fechar" id="chat-header-itens-img-item"/>
                    </div>
                </div>
            </div>
        </>
    );
}