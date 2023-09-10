import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ReactComponent as HeartHandShake } from "../../assets/icons/heart-handshake.svg";
import styles from "./sidebar.css";

const Sidebar = () => {
    return (
        <Box
            className="sidebar"
            sx={{
                textAlign: "center",
                margin: "24% 19% 19%",
            }}
        >
            <h1>Agile</h1>
            <Grid
                container
                sx={{
                    textAlign: "center",
                    marginTop: "64px",
                }}
            >
                <Grid item sx={{ marginRight: "4px" }}>
                    <HeartHandShake />
                </Grid>
                <Grid item>
                    <p>AI Agile Coach</p>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Sidebar;
