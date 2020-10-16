import React from "react";

import style from "../styles/Price.scss";
import { Button, Theme, withStyles } from "@material-ui/core";
import { LocalizationProvider } from "../provider/Localization";

interface props {
    price: number;
    onBuy: () => any;
    classes: any;
    style?: React.CSSProperties;
}

const useStyles = (theme: Theme) => ({
    box: {
        background: theme.palette.divider,
    },
});

class PriceBuy extends React.Component<props> {
    priceElem: React.RefObject<any>;
    constructor(props: props) {
        super(props);
        this.state = {
            className: "",
        };

        this.priceElem = React.createRef();
        this.removeAnimationClass = this.removeAnimationClass.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<props>) {
        if (prevProps.price !== this.props.price) {
            this.priceElem.current.classList.add(style.play);
        }
    }

    removeAnimationClass() {
        this.priceElem.current.classList.remove(style.play);
    }

    render() {
        const { classes } = this.props;
        const buyBoxClasses = style["price-box"] + " " + classes.box;
        return (
            <div className={buyBoxClasses} style={this.props.style}>
                <div className={style.price}>
                    <span>
                        {LocalizationProvider.Instance.getTranslation("price")}:
                    </span>
                    <span
                        ref={this.priceElem}
                        onAnimationEnd={this.removeAnimationClass}
                    >
                        {this.props.price} &euro;
                    </span>
                </div>
                <Button
                    className={style.buy}
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={this.props.onBuy}
                >
                    {LocalizationProvider.Instance.getTranslation("buy")}
                </Button>
            </div>
        );
    }
}

export default withStyles(useStyles)(PriceBuy);
