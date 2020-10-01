import * as React from "react";
import { ProductPreview } from "./components/preview";

export type ItemConfiguration = { [keys: string]: string | number };

export interface Item {
    name: string;
    price: number;
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
            <ProductPreview currentSelection={this.state.currentSelection} />
        );
    }
}
