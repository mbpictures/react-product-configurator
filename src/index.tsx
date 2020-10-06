import * as React from "react";
import { ProductPreview } from "./components/preview";
import ProductSelection from "./components/ProductSelection";
import style from "./styles/Main.scss";
import { SummaryDialog } from "./components/SummaryDialog";
import { BackButton } from "./components/BackButton";

export type ItemConfiguration = { [keys: string]: Item };
export type BuyCallback = (items: ItemConfiguration) => any;
export type BackCallback = () => any;
export type AbortCallback = () => any;
export type PrivacyCallback = () => any;

export { ProductPreview } from "./components/preview";

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
    onBack?: BackCallback;
    onBuy?: BuyCallback;
    displayBackButton?: boolean;
    backButton?: React.ReactNode;
    onAbortBuy?: AbortCallback;
    onPrivacyPolicy?: PrivacyCallback;
    preloadImages?: boolean;
    categories: Category[];
}

interface state {
    currentSelection: ItemConfiguration;
}

export class ProductConfigurator extends React.Component<props, state> {
    private readonly confirmBuyDialog: React.RefObject<SummaryDialog>;
    private openSelectionCategory: (category: any) => any;

    constructor(props: props) {
        super(props);
        const currentSelection = {};
        this.props.categories.forEach((val) => {
            val.items.forEach((item) => {
                if (!item.layer && val.layer) item.layer = val.layer;
                if (!item.default) return;
                currentSelection[val.name] = item;
            });
        });
        this.state = {
            currentSelection: currentSelection,
        };

        this.updateSelection = this.updateSelection.bind(this);
        this.handleBuyClick = this.handleBuyClick.bind(this);

        this.confirmBuyDialog = React.createRef<SummaryDialog>();
    }

    componentDidMount() {
        if (this.props.preloadImages) {
            this.props.categories.forEach((cat: Category) => {
                cat.items.forEach((item: Item) => {
                    const img = new Image();
                    img.src = item.image;
                    if (item.thumbnail) {
                        const thumb = new Image();
                        thumb.src = item.thumbnail;
                    }
                });
            });
        }
    }

    updateSelection(category: string, item: Item) {
        const state = this.state;
        state.currentSelection[category] = item;
        this.setState(state);
    }

    handleBuyClick(): void {
        if (
            this.confirmBuyDialog !== null &&
            this.confirmBuyDialog.current !== null
        )
            this.confirmBuyDialog.current.open();
    }

    render() {
        return (
            <div className={style.page}>
                <BackButton
                    backButton={this.props.backButton}
                    displayBackButton={this.props.displayBackButton}
                    onBack={this.props.onBack}
                />
                <ProductPreview
                    currentSelection={this.state.currentSelection}
                />
                <ProductSelection
                    categories={this.props.categories}
                    onChangeSelection={this.updateSelection}
                    name={this.props.name}
                    price={this.calculatePrice()}
                    onBuy={this.handleBuyClick}
                    setOpenCategory={(openCategory) =>
                        (this.openSelectionCategory = openCategory)
                    }
                />
                <SummaryDialog
                    ref={this.confirmBuyDialog}
                    currentSelection={this.state.currentSelection}
                    onConfirm={this.props.onBuy}
                    onAbort={this.props.onAbortBuy}
                    onPrivacyPolicy={this.props.onPrivacyPolicy}
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
