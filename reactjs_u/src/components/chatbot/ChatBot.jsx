import React, { useState } from "react";
import FormEntretien from "./FormEntretien";
import FormNombreKm from "./FormNombrekm";
import Navbar from "../../components/navbar/Navbar";
import io from "socket.io-client";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);
function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [activeChat, setActiveChat] = useState(false);
    const [input, setInput] = useState("");
    const [liveChatBot, setliveChatBot] = useState(true);
    socket.on("connect", () => {
        setliveChatBot(true);
    
        socket.on("disconnect", () => {
            setliveChatBot(false);
            setMessages([]);
            setQuestions([]);
            setActiveChat(false);
            setInput("");
        });
    });
    socket.on("chatbot:questions", (data_question) => {
        if (data_question[0].id === 11 || data_question[0].id === 1300) {
            if (data_question[0].id === 11) {
                setInput(<FormEntretien returnFormObj={returnFormObj} />);
            } else if (data_question[0].id === 1300) {
                setInput(<FormNombreKm returnFormObj={returnFormObj} />);
            }
                setMessages([...messages, data_question[0]]);
                setQuestions([]);
            } else {
                setQuestions(data_question);
            }
        });

        
        socket.on("chatbot:reponses:contact", (el) => {
            setMessages([...messages, el.resp]);
            setQuestions(el.text);
        });
        
          // Close chatbot
        socket.on("chatbot:close", (msg) => {
            setMessages([...messages, msg]);
            setQuestions([]);
            setTimeout(() => {
                setActiveChat(false);
                setMessages([]);
            }, 3000);
            });
        
            function activeChatbot() {
                socket.emit("chatbot:questions");
                setActiveChat(true);
            }
        
            function responseChatbot(el) {
                setMessages([...messages, el]);
                socket.emit("chatbot:reponses", el.id);
                setQuestions([]);
            }
        
            function returnFormObj(obj) {
                responseChatbot(obj);
                setInput("");
            }

            return (<>
                <Navbar />
                <div className="ChatBot">
                    {activeChat ? (
                    <ul>
                    {messages.map((el, i) => (
                    <li key={i}>{el.text}</li>
                ))}
                    {questions.map((el, i) => (
                    <button onClick={() => responseChatbot(el)} key={i}>
                        {el.text}
                    </button>
                    ))}
                    {input}
                </ul>
                ) : (
                <div>
                    <button disabled={!liveChatBot} onClick={activeChatbot}>
                    Chatbot
                    </button>
                </div>
                )}
                {liveChatBot ? <p>Online</p> : <p>Offline</p>}
            </div></>
        );
    }  
export default ChatBot;