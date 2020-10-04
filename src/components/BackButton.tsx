import React from "react";
import { Button } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import style from "../styles/BackButton.scss";

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
            <Button
                onClick={this.props.onBack}
                className={style["back-button"]}
                size="large"
                variant="contained"
                disableElevation
            >
                {buttonIcon}
            </Button>
        );
    }
}
