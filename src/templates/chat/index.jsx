import React from "react";
import { Header } from '../../components/headerChat/header'
import { Body } from '../../components/bodyChat/body'
import { Footer } from '../../components/footerChat/footer'
import styles from '../../styles/styleChat.css'
import closeAlert from '../../assets/svg/CloseAlert.svg'
import Send from '../../assets/svg/Send.svg'
import Avatar from '../../assets/svg/avatar.png'
import closeChat from '../../assets/svg/CloseChat.svg'
export const Chat = () => {
    return (
        <>
            <div id="chat" style={styles}>
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
                <div id="chat-body">
                    <div id="chat-body-itens">
                        <div id="chat-body-item-msg-user">
                            <div id="chat-body-item-msg-user-texto">asds</div>
                        </div>
                        <div id="chat-body-item-msg-bot">
                            <div id="chat-body-item-msg-bot-foto">
                                <img src={Avatar} id="chat-body-item-msg-bot-foto-img"/>
                            </div>
                            <div id="chat-body-item-msg-bot-texto">
                                <p id="chat-body-item-msg-bot-texto-p">oiasdasdasdlasçkdçldfaçlsfdajsdlçfkasdkçl</p>
                            </div>
                        </div>
                    </div>
                </div>
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
            </div>
        </>
    );
}