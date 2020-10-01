import React from 'react'

import { ProductConfigurator } from 'react-product-configurator'
import 'react-product-configurator/dist/index.css'
import {Category} from "../../src";

import CaseDefault from "./img/thumbnail-case.png";
import CaseRed from "./img/case/case-red.png";
import CaseBlue from "./img/case/case-blue.png";
import CaseGreen from "./img/case/case-green.png";
import BeltDefault from "./img/belt/belt-default.png";
import BeltRed from "./img/belt/belt-red.png";
import BeltBlue from "./img/belt/belt-blue.png";
import BeltGreen from "./img/belt/belt-green.png";
import HandleDefault from "./img/handle/handle-default.png";
import HandleRed from "./img/handle/handle-red.png";
import HandleBlue from "./img/handle/handle-blue.png";
import HandleGreen from "./img/handle/handle-green.png";

const App = () => {
    let cats: Category[] = [
        {
            name: "Case",
            thumbnail: CaseDefault,
            layer: 0,
            items: [
                {
                    name: "Default",
                    color: "#444444",
                    price: 10.99,
                    image: CaseDefault,
                    default: true
                },
                {
                    name: "Red",
                    color: "#a42020",
                    price: 15.99,
                    image: CaseRed
                },
                {
                    name: "Blue",
                    color: "#1f47ae",
                    price: 15.99,
                    image: CaseBlue
                },
                {
                    name: "Green",
                    color: "#4a924a",
                    price: 15.99,
                    image: CaseGreen
                }
            ]
        },
        {
            name: "Belt",
            thumbnail: BeltDefault,
            layer: 1,
            items: [
                {
                    name: "Default",
                    color: "#444444",
                    price: 10.99,
                    default: true,
                    image: BeltDefault
                },
                {
                    name: "Red",
                    color: "#a42020",
                    price: 15.99,
                    image: BeltRed
                },
                {
                    name: "Blue",
                    color: "#1f47ae",
                    price: 15.99,
                    image: BeltBlue
                },
                {
                    name: "Green",
                    color: "#4a924a",
                    price: 15.99,
                    image: BeltGreen
                }
            ]
        },
        {
            name: "Handle",
            thumbnail: HandleDefault,
            layer: 2,
            items: [
                {
                    name: "Default",
                    color: "#444444",
                    price: 10.99,
                    default: true,
                    image: HandleDefault
                },
                {
                    name: "Red",
                    color: "#a42020",
                    price: 15.99,
                    image: HandleRed
                },
                {
                    name: "Blue",
                    color: "#1f47ae",
                    price: 15.99,
                    image: HandleBlue
                },
                {
                    name: "Green",
                    color: "#4a924a",
                    price: 15.99,
                    image: HandleGreen
                }
            ]
        },
    ];
    return <ProductConfigurator name="Backpack" categories={cats} preloadImages />
}

export default App
