import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styles from "./chat.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { ReactComponent as Send } from "../../assets/icons/send.svg";

const Chat = ({ send, messages }) => {
    console.log("msgs:", messages);
    const [message, setMessage] = useState("");
    const [isWriting, setIsWriting] = useState(false);

    const splitMessageIntoLines = (message) => {
        return message.split("\n").map((line, index) => (
            <div key={index} className="message-line">
                {line}
            </div>
        ));
    };
    return (
        <Box className="chat">
            <div className="chat-history">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${index % 2 === 0 ? "sent-message" : "received-message"}`}>
                        {splitMessageIntoLines(msg)}
                    </div>
                ))}
            </div>

            <div className="input-container">
                {messages.length % 2 ? <p className="helper-text">AgileGPT writing..</p> : null}
                <div className="input-btn">
                    <TextField
                        sx={{ borderRadius: "20px !important" }}
                        className="input"
                        type="text"
                        placeholder="Ask me anything that I can help you or your team.. "
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        InputProps={{
                            sx: {
                                borderRadius: "20px !important",
                                "::placeholder": {
                                    fontFamily: "Nunito, sans-serif",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                },
                            },
                        }}
                    />
                    <Button
                        onClick={() => {
                            send(message);
                            setIsWriting(true);
                            setMessage("");
                        }}
                    >
                        <Send />
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default Chat;
