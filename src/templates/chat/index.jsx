import React from "react";
import { Header } from '../../components/headerChat/header'
import { Body } from '../../components/bodyChat/body'
import { Footer } from '../../components/footerChat/footer'
import styles from '../../styles/styleChat.css'
import Send from '../../assets/svg/Send.svg'
import Record from '../../assets/svg/Record.svg'
import Avatar from '../../assets/svg/avatar.png'
import Options from '../../assets/svg/Options.svg'
import closeChat from '../../assets/svg/CloseChat.svg'
import { popupMsg } from '../../components/popup-msg/popupMsg'
import closeAlert from '../../assets/svg/CloseAlert.svg'
import close from '../../assets/svg/close.svg'
export const Chat = () => {
    const [texto, setTexto] = React.useState([]);
    const [tex, setTex] = React.useState([]);
    const [abrirChat, setAbrirChat] = React.useState(false);
    const [abrirOptions, setAbrirOptions] = React.useState(false);
    const [fecharPopup, setFecharPopup] = React.useState(false);
    const [fecharPopupPermenente, setFecharPopupPermenente] = React.useState(false);
    const divRef = React.useRef();
    React.useLayoutEffect(() => {
        if(abrirChat){
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    })
    React.useEffect(() => {
        if(localStorage.getItem("fecharPopupPermenente") == "true"){
            setFecharPopupPermenente(true)
        }
    })
    const handleClick = () =>{
        const clearInput = document.getElementById('chat-footer-itens-input-input').value = ""
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

    const handleClosePopup = () => {
        setFecharPopup(true)
    }
    const handleClosePopupPermanente = (permenente) => {
        if(permenente){
            localStorage.setItem('fecharPopupPermenente', true)
            setFecharPopupPermenente(true)
        }else{
            setFecharPopupPermenente(true)
        }
    }
    const handleOpenChat = () => {
        handleClosePopupPermanente(false)
        setAbrirOptions(false)
        setAbrirChat(!abrirChat)
    }
    const handleOpenOptions = () => {
        setAbrirOptions(!abrirOptions)
    }
    return (
        <>
            <div id="all-chat" style={styles}>
                {abrirChat && <div id="chat" style={styles}>
                        <div id="chat-header">
                            <div id="chat-header-Itens">
                                <div id="chat-header-itens-textos">
                                    <p id="nomeChat">BALINU</p>
                                    <p id="descricaoChat">Assistente Virtual da PROPPG</p>
                                </div>
                                <div id="chat-header-itens-img">
                                    <img src={Options} alt="Fechar" id="chat-header-itens-img-item" onClick={() => handleOpenOptions()}/>
                                    {abrirOptions && 
                                    <div id="chat-header-itens-options">
                                        <ul id="chat-header-itens-options-ul">
                                            <li id="chat-header-itens-options-ul-li">Configurações</li>
                                            <li id="chat-header-itens-options-ul-li">Sair da Conversa</li>
                                        </ul>
                                    </div>
                                    }
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
                                                        <p id="chat-body-item-msg-user-texto-p" >{c.user}</p>
                                                    </div>
                                                </div>
                                                </>
                                            )
                                        }
                                        if(c.bot){
                                            return (
                                                <>
                                                    <div id="chat-body-item-msg-bot">
                                                        <div id="chat-body-item-msg-bot-foto">
                                                            <img src={Avatar} id="chat-body-item-msg-bot-foto-img"/>
                                                        </div>
                                                        <div id="chat-body-item-msg-bot-texto">
                                                            <p id="chat-body-item-msg-bot-texto-p" >{c.bot}</p>
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
                                <div id="chat-footer-itens-record">
                                    <img src={Record} alt="Record" id="chat-footer-itens-record-item"/>
                                </div>
                                <div id="chat-footer-itens-input">
                                    <input type="text" onKeyUp={(e)=> {if(e.keyCode === 13){handleClick()}}} id="chat-footer-itens-input-input" onChange={(e) => setTex(e.target.value)} autocomplete="off"></input>
                                </div>
                                <div id="chat-footer-itens-send">
                                    <img src={Send} alt="send" id="chat-footer-itens-img-item" onClick={() => handleClick()}/>
                                </div>
                            </div>
                        </div>
                    </div>}
                <div id="chat-popup">
                    {!fecharPopupPermenente &&
                    <div className="chat-popup-msg-alert" >
                        <span id="chat-popup-msg-alert-close">
                            <img src={close} id="chat-popup-msg-alert-close-img" onClick={() => handleClosePopup()}/>
                        </span>
                        <div id="chat-popup-msg-alert-texto">
                            {!fecharPopup &&
                                <p id="chat-popup-msg-alert-texto-p">👋😃Olá! Me chamo BALINU! Em que posso ajudar?</p>
                            }
                            {fecharPopup &&
                                <p id="chat-popup-msg-alert-texto-p">
                                    🙂 Deseja que eu pare de mandar mensagens como essa ? 
                                    <botton id="chat-popup-msg-alert-texto-bottom-sim" onClick={() => handleClosePopupPermanente(true)}>Sim</botton>
                                    <botton  id="chat-popup-msg-alert-texto-bottom-nao" onClick={() => handleClosePopupPermanente(false)}>Não</botton>
                                </p> 
                            }
                            
                        </div>
                    </div>}
                    {fecharPopupPermenente &&<div className="chat-popup-msg-none" ></div>}
                    <div className="chat-popup-img-e-sombra">
                        <img src={Avatar} id="chat-popup-foto-img" onClick={() => handleOpenChat()}/>
                    </div>
                </div>
            </div>
        </>
    );
}