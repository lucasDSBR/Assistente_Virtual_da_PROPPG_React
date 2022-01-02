import React from "react";
import styles from '../../styles/styleChat.css'
import Avatar from '../../assets/svg/avatar.png'
export const Body = () => {
    return (
        <>
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
        </>
    );
}