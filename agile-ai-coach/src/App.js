import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import io, { Socket } from "socket.io-client";
import Sidebar from "./components/sidebar/sidebar";
import Chat from "./components/chat/chat";

function App() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    const send = (value) => {
        setMessages([...messages, value]);
        socket?.emit("message", value);
    };

    useEffect(() => {
        const newSocket = io("http://localhost:1001");
        setSocket(newSocket);
    }, [setSocket]);

    const messageListener = (message) => {
        setMessages([...messages, message]);
    };

    useEffect(() => {
        socket?.on("message", messageListener);

        return () => {
            socket?.off("message", messageListener);
        };
    }, [messageListener]);

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1, backgroundColor: "#D8E1ED" }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={10}>
                        <Chat send={send} messages={messages} />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default App;
