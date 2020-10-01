import * as React from "react";
import { ProductPreview } from "./components/preview";
import { ProductSelection } from "./components/ProductSelection";
import style from "./styles/Main.scss";

export type ItemConfiguration = { [keys: string]: string | number };

export interface Item {
    name: string;
    price?: number;
    image: string;
    thumbnail?: string;
    color?: string;
    default?: boolean;
    layer?: number;
}

export interface Category {
    name: string;
    thumbnail: string;
    layer?: number;
    items: Item[];
}

interface props {
    name: string;
    onBack?: () => any;
    onBuy?: (items: ItemConfiguration[]) => any;
    categories: Category[];
}

interface state {
    currentSelection: { [keys: string]: Item };
}

export class ProductConfigurator extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        const currentSelection = {};
        this.props.categories.forEach((val) => {
            val.items.forEach((item) => {
                if (!item.default) return;
                if (!item.layer && val.layer) item.layer = val.layer;
                currentSelection[val.name] = item;
            });
        });
        this.state = {
            currentSelection: currentSelection,
        };

        this.updateSelection = this.updateSelection.bind(this);
    }

    updateSelection(category: string, item: Item) {
        const state = this.state;
        state.currentSelection[category] = item;
        this.setState(state);
    }

    render() {
        return (
            <div className={style.page}>
                <ProductPreview
                    currentSelection={this.state.currentSelection}
                />
                <ProductSelection
                    categories={this.props.categories}
                    onChangeSelection={this.updateSelection}
                    name={this.props.name}
                    price={this.calculatePrice()}
                />
            </div>
        );
    }

    calculatePrice(): number {
        let price: number = 0;
        Object.entries(this.state.currentSelection).forEach(
            (val: [string, Item]) => {
                price += val[1].price ?? 0;
            }
        );
        return price;
    }
}
