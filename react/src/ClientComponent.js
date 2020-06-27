import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './index.css'

const ENDPOINT = "http://localhost:4001/";

export default function ClientComponent() {
    const [response, setResponse] = useState("");
    const [login, setLogin] = useState(true);
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState("");
    const [online, setOnline] = useState("");
    const [datas, setData] = useState("");
    const users = [];
    useEffect(() => {
        let user = ''
        global.socket = socketIOClient(ENDPOINT);
        global.socket.on('welcome', data => {
            const previousmsgs = data.msgs.map((item) => (<p><b>{item.user}</b>: {item.msg}</p>))
            const previousonline = data.online.map((item) => (<li><b>{item.user}</b></li>))
            setResponse(previousmsgs);
            setOnline(previousonline)
        });

        global.socket.on('mensagens', data => {
            const it = data.map((item) => (<p><b>{item.user}</b>: {item.msg}</p>))
            setResponse(it);
        });

        global.socket.on('online', data => {
            
            const it = data.map((item) => (<li><b>{item.user}</b></li>))
            setOnline(it);
        });

        global.socket.on('user', data => {
            console.log('receveid', data)
            user = data
        });
    }, []);

    const sendText = () => {
        const bind = {
            user,
            msg,
        }
        global.socket.emit('msg', bind);
        setMsg('')
    }

    const sendUser = () => {
        global.socket.emit('online', user);
        setLogin(false)
    }

    const logout = () => {
        global.socket.emit('remove', user)
        global.socket.emit('disconnect')
        setLogin(true)
    }

    return (
        <>
            {
                login ? (<div className="general-login" >
                    <div className="login-container">
                    <h1 id="chat-title">Chatroom</h1> <h3>V0.1</h3>
                        <input type="text" name="username" placeholder="Digite seu nome de usuário" onChange={(e) => setUser(e.target.value)}></input>
                        <input type="submit" onClick={sendUser} value="Entrar"></input>
                    </div>
                </div>) : (
                        <div className="general">
                            <div className="status">
                                <ul>
                                    {online}
                                </ul>
                            </div>
                            <button onClick={logout} className="logout">Logout</button>
                            <div className="user" >
                                <input type="text" name="user" value={user} onChange={(e) => setUser(e.target.value)}></input>
                            </div>
                            <div className="content">
                                {response}
                            </div>

                            <div className="sender">
                                <div className="formulario">
                                    <input onChange={(e) => setMsg(e.target.value)} type="text" name="message" value={msg} ></input>
                                    <button onClick={sendText}>Send</button>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}



