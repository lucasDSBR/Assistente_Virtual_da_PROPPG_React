import React from "react";
import styles from '../../styles/styleChat.css';
import Send from '../../assets/svg/Send.svg';
import Record from '../../assets/svg/Record.svg';
import RecordOff from '../../assets/svg/RecordOff.svg';
import RecordGif from '../../assets/gif/record.gif';
import Avatar from '../../assets/svg/avatar.png';
import Options from '../../assets/svg/Options.svg';
import close from '../../assets/svg/close.svg';
import back from '../../assets/svg/back.svg';
import {Salutation} from '../../util/functions/getTimeForSalutation';
export const Chat = () => {
    const [messages, setMessages] = React.useState([]);
    const [message, setMessage] = React.useState([]);
    const [startRecord, setStartRecord] = React.useState(false);
    const [abrirChat, setAbrirChat] = React.useState(false);
    const [salutation, setSalutation] = React.useState('');
    const [digitando, setDigitando] = React.useState(false);
    const [abrirOptions, setAbrirOptions] = React.useState(false);
    const [abrirSubOptions, setAbrirSubOptions] = React.useState(false);
    const [fecharPopup, setFecharPopup] = React.useState(false);
    const [fecharPopupPermenente, setFecharPopupPermenente] = React.useState(false);
    const divRef = React.useRef();

    React.useLayoutEffect(() => {
        var msgSalutation = Salutation()
        setSalutation(msgSalutation)
        if(abrirChat){
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    });

    React.useEffect(() => {
        if(localStorage.getItem("fecharPopupPermenente") == "true"){
            setFecharPopupPermenente(true);
        }
    });

    const handleClick = (text) =>{
        const clearInput = document.getElementById('chat-footer-itens-input-input-id').value = ""
        setDigitando(true)
        let messagee = "";
        setStartRecord(false)
        if(text != null){
            setMessages((c) => [...c, {'user': text, 'id': 1}]);
            messagee = text
        }else {
            setMessages((c) => [...c, {'user': message}]);
            messagee = message
        }
            
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "projectId": "newagent-oqdb",
                "requestText": `${message}`
            })
        };
        setStartRecord(false)
        fetch('https://appbalinu.herokuapp.com/api/requestText/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setMessages((c) => [...c, {'bot': data.responseMessage}])
                setDigitando(false);
            });
    }
    
    const handleClosePopup = () => {
        setFecharPopup(true);
        
    }

    const handleClosePopupPermanente = (permenente) => {
        if(permenente){
            localStorage.setItem('fecharPopupPermenente', true);
            setFecharPopup(true);
        }else{
            localStorage.removeItem('fecharPopupPermenente');
            setFecharPopupPermenente(true)
            setFecharPopup(true)
        }
    }

    const handleOpenChat = () => {
        setAbrirOptions(false)
        setAbrirChat(!abrirChat)
        handleClosePopupPermanente(false);
    }

    const handleOpenOptions = () => {
        setAbrirOptions(!abrirOptions)
        setAbrirSubOptions(false)
    }

    const handleOpenSubOptions = () => {
        setAbrirOptions(!abrirOptions)
        setAbrirSubOptions(!abrirSubOptions)
    }

    const RecordAudio = (action) => {
        setStartRecord(true)
        let speechRecognition = new window.webkitSpeechRecognition ();

        speechRecognition.continuous = false;
        speechRecognition.lang = 'pt-BR';
        speechRecognition.onresult = (event) => {
            let interim_transcript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                setStartRecord(false)
                handleClick(event.results[i][0].transcript)
            }
        };
        if(action == true){
            speechRecognition.start()
        }else{
            setStartRecord(false)
            speechRecognition.start()
            speechRecognition.stop();
        }
        
    }
    return (
        <>
            <div className="all-chat" style={styles}>
                {abrirChat && <div className="chat" style={styles}>
                        <div className="chat-header">
                            <div className="chat-header-Itens">
                                <div className="chat-header-itens-textos">
                                    <span className="chat-header-itens-nomeChat">BALINU</span>
                                    <span className="chat-header-itens-descricaoChat">Assistente Virtual da PROPPG</span>
                                </div>
                                <div className="chat-header-itens-img">
                                    <img src={Options} alt="Fechar" className="chat-header-itens-img-item" onClick={() => handleOpenOptions()}/>
                                    {abrirOptions && 
                                        <div className="chat-header-itens-options">
                                            <ul className="chat-header-itens-options-ul">
                                                <li className="chat-header-itens-options-ul-li" onClick={() => handleOpenSubOptions()}>Configurações</li>
                                                <li className="chat-header-itens-options-ul-li" onClick={() => handleOpenChat()}>Sair da Conversa</li>
                                            </ul>
                                        </div>
                                    }
                                    {abrirSubOptions && 
                                        <div className="chat-header-itens-suboptions">
                                            
                                            <ul className="chat-header-itens-suboptions-ul">
                                            <div className="chat-header-itens-suboptions-back-img"><img src={back} onClick={() => handleOpenSubOptions()}/></div>
                                                <li className="chat-header-itens-suboptions-ul-li"><div>Desativar PopUp</div> <input type="checkbox" className="chat-header-itens-suboptions-ul-li-checkbox" checked={!fecharPopupPermenente} onClick={() => handleClosePopupPermanente(!fecharPopupPermenente)}></input></li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="chat-body" ref={divRef}>
                            <div className="chat-body-itens">
                                    {messages.map((c) => {
                                            return (
                                                <>
                                                    {c.user &&
                                                    <div className="chat-body-item-msg-user" key={c.user}>
                                                        <div className="chat-body-item-msg-user-texto">
                                                            <div className="chat-body-item-msg-user-texto-p" >{c.user}</div>
                                                        </div>
                                                    </div>
                                                    }
                                                    {c.bot &&
                                                    <div className="chat-body-item-msg-bot" key={c.user}>
                                                        <div className="chat-body-item-msg-bot-foto">
                                                            <img src={Avatar} className="chat-body-item-msg-bot-foto-img"/>
                                                        </div>
                                                        <div className="chat-body-item-msg-bot-texto">
                                                            <div className="chat-body-item-msg-bot-texto-p" >{c.bot}</div>
                                                        </div>
                                                    </div>
                                                    }
                                                </>
                                            )
                                    })
                                    }
                                    {digitando &&
                                        <div className="chat-body-item-msg-bot-digitando">
                                            <div className="chat-body-item-msg-bot-digitando-texto">
                                                <p className="chat-body-item-msg-bot-digitando-texto-p" >
                                                    Digitando...
                                                </p>
                                            </div>
                                        </div>
                                    }
                            </div>
                        </div>
                        <div className="chat-footer">
                            <div className="chat-footer-itens">
                                <div className="chat-footer-itens-record">
                                    {!startRecord && <img src={Record} alt="Record" className="chat-footer-itens-record-item" onClick={() => RecordAudio(true)}/> }
                                    {startRecord && <img src={RecordOff} alt="Record" className="chat-footer-itens-record-item" onClick={() => RecordAudio(false)}/>}
                                </div>
                                <div className="chat-footer-itens-input">
                                    {!startRecord && <input type="text" onKeyUp={(e)=> {if(e.keyCode === 13){handleClick(null)}}} className="chat-footer-itens-input-input" id="chat-footer-itens-input-input-id" onChange={(e) => setMessage(e.target.value)} autoComplete="off"></input>}
                                    {startRecord && <img src={RecordGif} alt="RecordGif" className="chat-footer-itens-recordGif-item"/>}
                                </div>
                                <div className="chat-footer-itens-send">
                                    <img src={Send} alt="send" className="chat-footer-itens-img-item" onClick={() => handleClick()}/>
                                </div>
                            </div>
                        </div>
                    </div>}
                <div className="chat-popup">
                    {!fecharPopupPermenente &&
                    <div className="chat-popup-msg-alert" >
                        <span className="chat-popup-msg-alert-close">
                            <div className="chat-popup-msg-alert-close-img"><img src={close} onClick={() => handleClosePopup()} className="chat-popup-msg-alert-close-img"/></div>
                        </span>
                        <div className="chat-popup-msg-alert-texto" onClick={() => handleOpenChat()}>
                            {!fecharPopup &&
                                <div className="chat-popup-msg-alert-texto-p">👋😃{salutation}! Me chamo BALINU! Em que posso ajudar?</div>
                            }
                            {fecharPopup &&
                                <div className="chat-popup-msg-alert-texto-p">
                                    🙂 Deseja que eu pare de mandar mensagens como essa ? 
                                    <botton className="chat-popup-msg-alert-texto-bottom-sim" onClick={() => handleClosePopupPermanente(true)}>Sim</botton>
                                    <botton  className="chat-popup-msg-alert-texto-bottom-nao" onClick={() => handleClosePopupPermanente(false)}>Não</botton>
                                </div> 
                            }
                            
                        </div>
                    </div>}
                    {fecharPopupPermenente &&<div className="chat-popup-msg-none" ></div>}
                    <div className="chat-popup-img-e-sombra">
                        <img src={Avatar} className="chat-popup-foto-img" onClick={() => handleOpenChat()}/>
                    </div>
                </div>
            </div>
        </>
    );
}