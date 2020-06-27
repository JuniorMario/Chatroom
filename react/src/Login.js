import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './login.css'

const ENDPOINT = "http://localhost:4001/";

export default function Login() {
    const [user, setUser] = useState("");

    useEffect(() => {
        global.socket = socketIOClient(ENDPOINT);
    }, []);

    const sendUser = () => {
        global.socket.emit('online', user);
    }

    return (
        <div className="general">
            <form action="/chat">
            <input name="username" onChange={(e) => setUser(e.target.value)}></input>
            <input type="submit" onClick={sendUser} value="Entrar"></input>
            </form>
        </div>
    );
}
