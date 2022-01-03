import React from "react";
import { Header } from '../../components/headerChat/header'
import { Body } from '../../components/bodyChat/body'
import { Footer } from '../../components/footerChat/footer'
import styles from '../../styles/styleChat.css'
import Send from '../../assets/svg/Send.svg'
import Avatar from '../../assets/svg/avatar.png'
import closeChat from '../../assets/svg/CloseChat.svg'
import { popupMsg } from '../../components/popup-msg/popupMsg'
import closeAlert from '../../assets/svg/CloseAlert.svg'
export const Chat = () => {
    const [texto, setTexto] = React.useState([]);
    const [tex, setTex] = React.useState([]);
    const [fecharChart, setFecharChart] = React.useState(false);
    const divRef = React.useRef();
    React.useLayoutEffect(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight;
    });
    const handleClick = () =>{

        setTexto((c) => [...c, {'user': tex}]);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "projectId": "newagent-oqdb",
                "requestText": `${tex}`
            })
        };
        fetch('https://appbalinu.herokuapp.com/api/requestText/', requestOptions)
            .then(response => response.json())
            .then(data => setTexto((c) => [...c, {'bot': data.responseMessage}]));
    }
    return (
        <>
            <div id="all-chat">
                <div class="chat-popup-msg-alert" >
                    <span id="chat-popup-msg-alert-close">
                        <img src={closeAlert} id="chat-popup-msg-alert-close-img"/>
                    </span>
                    <div id="chat-popup-msg-alert-texto">
                        <p id="chat-popup-msg-alert-texto-p">👋😃Olá! Me chamo BALINU! Em que posso ajudar?</p>
                    </div>
                </div>
                <div id="chat-popup">
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
                        <div id="chat-body" ref={divRef}>
                            <div id="chat-body-itens">
                                    {texto.map((c) => {
                                        if(c.user){
                                            return (
                                                <>
                                                <div id="chat-body-item-msg-user" key={c.user}>
                                                    <div id="chat-body-item-msg-user-texto">
                                                        <p id="chat-body-item-msg-user-texto-p">{c.user}</p>
                                                    </div>
                                                </div>
                                                </>
                                            )
                                        }
                                        if(c.bot){
                                            return (
                                                <>
                                                    <div id="chat-body-item-msg-bot" key={c.bot}>
                                                        <div id="chat-body-item-msg-bot-foto">
                                                            <img src={Avatar} id="chat-body-item-msg-bot-foto-img"/>
                                                        </div>
                                                        <div id="chat-body-item-msg-bot-texto">
                                                            <p id="chat-body-item-msg-bot-texto-p">{c.bot}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })}
                            </div>
                        </div>
                        <div id="chat-footer">
                            <div id="chat-footer-itens">
                                <div id="chat-footer-itens-input">
                                    <input type="text" onKeyUp={(e)=> {if(e.keyCode === 13){handleClick()}}} id="chat-footer-itens-input-input" onChange={(e) => setTex(e.target.value)}></input>
                                </div>
                                <div id="chat-footer-itens-send">
                                    <img src={Send} alt="send" id="chat-header-itens-img-item" onClick={() => handleClick()}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={Avatar} id="chat-popup-foto-img"/>
                    <div id="chat-sombra-img"></div>
                </div>
                
            </div>
            
        </>
    );
}