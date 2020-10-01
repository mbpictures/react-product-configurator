import React from "react";

import style from "../styles/Price.scss";

interface props {
    price: number;
}

export function Price(props: props) {
    return (
        <div className={style.price}>
            <span>Price:</span>
            <span>{props.price} &euro;</span>
        </div>
    );
}
