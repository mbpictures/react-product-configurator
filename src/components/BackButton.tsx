import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import style from "../styles/BackButton.scss";
import { IconButton } from "@material-ui/core";

interface props {
    onBack?: () => any;
    backButton?: React.ReactNode;
    displayBackButton?: boolean;
}

export class BackButton extends React.Component<props, any> {
    render() {
        if (!this.props.displayBackButton) return null;
        const buttonIcon = this.props.backButton ?? <ChevronLeftIcon />;
        return (
            <div className={style.root}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.props.onBack}
                    className={style["back-button"]}
                >
                    {buttonIcon}
                </IconButton>
            </div>
        );
    }
}
