import React from "react";

import style from "../styles/Price.scss";

interface props {
    price: number;
}

export class Price extends React.Component<props> {
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
        return (
            <div className={style.price}>
                <span>Price:</span>
                <span
                    ref={this.priceElem}
                    onAnimationEnd={this.removeAnimationClass}
                >
                    {this.props.price} &euro;
                </span>
            </div>
        );
    }
}
