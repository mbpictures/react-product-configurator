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
            layer: 1,
            items: [
                    {
                        name: "Default",
                        thumbnail: CaseDefault,
                        price: 10.99,
                        image: CaseDefault,
                        default: true
                    },
                    {
                        name: "Red",
                        thumbnail: CaseRed,
                        price: 15.99,
                        image: CaseRed
                    },
                    {
                        name: "Blue",
                        thumbnail: CaseBlue,
                        price: 15.99,
                        image: CaseBlue
                    },
                    {
                        name: "Green",
                        thumbnail: CaseGreen,
                        price: 15.99,
                        image: CaseGreen
                    }
                ]
        },
        {
            name: "Belt",
            thumbnail: BeltDefault,
            layer: 0,
            items: [
                {
                    name: "Default",
                    thumbnail: BeltDefault,
                    price: 10.99,
                    default: true,
                    image: BeltDefault
                },
                {
                    name: "Red",
                    thumbnail: BeltRed,
                    price: 15.99,
                    image: BeltRed
                },
                {
                    name: "Blue",
                    thumbnail: BeltBlue,
                    price: 15.99,
                    image: BeltBlue
                },
                {
                    name: "Green",
                    thumbnail: BeltGreen,
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
                    thumbnail: HandleDefault,
                    price: 10.99,
                    default: true,
                    image: HandleDefault
                },
                {
                    name: "Red",
                    thumbnail: HandleRed,
                    price: 15.99,
                    image: HandleRed
                },
                {
                    name: "Blue",
                    thumbnail: HandleBlue,
                    price: 15.99,
                    image: HandleBlue
                },
                {
                    name: "Green",
                    thumbnail: HandleGreen,
                    price: 15.99,
                    image: HandleGreen
                }
            ]
        },
    ];
    return <ProductConfigurator name="Hi!" categories={cats} />
}

export default App
