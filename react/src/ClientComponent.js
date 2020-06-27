import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './index.css'
const ENDPOINT = "http://127.0.0.1:4001/";


export default function ClientComponent() {
    const [response, setResponse] = useState("");

    const [msg, setMsg] = useState("");
    const [user, setUser] = useState("");
    const [online, setOnline] = useState("");

    useEffect(() => {
        global.socket = socketIOClient(ENDPOINT);
        global.socket.on("FromAPI", data => {
            setResponse(data);
        });
        global.socket.on('welcome', data => {
            const it = data.map((item) => (<p><b>{item.user}</b>: {item.msg}</p>))
            setResponse(it);
        });

        global.socket.on('mensagens', data => {
        const it = data.map((item) => (<p><b>{item.user}</b>: {item.msg}</p>))
            setResponse(it);
        });

        global.socket.on('online', data => {
            const it = data.map((item) => (<li><b>{item.user}</b>: {item.ID}</li>))
                setOnline(it);
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

    return (
        <div className="general">
            <div className="status">
                <ul>
                    {online}
                </ul>
            </div>
            <div className="user" >
                <input type="text" name="user" onChange={(e) => setUser(e.target.value)}></input>
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
    );
}
