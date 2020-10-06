import React from "react";
import style from "../styles/LoadingScreen.scss";
import { CircularProgress } from "@material-ui/core";

interface props {
    visible: boolean;
}

export class LoadingScreen extends React.Component<props> {
    render() {
        if (!this.props.visible) return null;
        return (
            <div className={style.overlay}>
                <CircularProgress />
            </div>
        );
    }
}
