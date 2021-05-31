import * as React from "react";
import { ProductPreview } from "./components/preview";
import ProductSelection from "./components/ProductSelection";
import style from "./styles/Main.scss";
import { SummaryDialog } from "./components/SummaryDialog";
import { MenuBox } from "./components/MenuBox";
import { LoadingScreen } from "./components/LoadingScreen";
import { MuiThemeProvider, Theme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { lightTheme, darkTheme } from "./provider/Theme";
import { LocalizationProvider } from "./provider/Localization";
import { ItemChangeCallback } from "./components/ProductCategory";

export type ItemConfiguration = { [keys: string]: Item };
export type BuyCallback = (items: ItemConfiguration) => any;
export type BackCallback = () => any;
export type AbortCallback = () => any;
export type PrivacyCallback = () => any;

export { ProductPreview } from "./components/preview";
export * from "./provider/Localization";

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
    displayLanguageDropdown?: boolean;
    backButton?: React.ReactNode;
    onAbortBuy?: AbortCallback;
    onPrivacyPolicy?: PrivacyCallback;
    preloadImages?: boolean;
    showLoadingScreen?: boolean;
    categories: Category[];
    theme?: "dark" | "light" | Theme;
    translations?: Record<string, Record<string, string>>;
    localizeItems?: boolean;
    onItemChange?: ItemChangeCallback;
}

interface state {
    currentSelection: ItemConfiguration;
    loaded: boolean;
}

export class ProductConfigurator extends React.Component<props, state> {
    private readonly confirmBuyDialog: React.RefObject<SummaryDialog>;
    private openSelectionCategory: (category: any) => any;
    private imagesLeftToLoad = 0;

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
            loaded: false,
        };

        this.updateSelection = this.updateSelection.bind(this);
        this.handleBuyClick = this.handleBuyClick.bind(this);
        this.summaryDialogOnEdit = this.summaryDialogOnEdit.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);

        this.confirmBuyDialog = React.createRef<SummaryDialog>();
    }

    componentDidMount() {
        if (this.props.preloadImages) {
            this.props.categories.forEach((cat: Category) => {
                cat.items.forEach((item: Item) => {
                    const img = new Image();
                    img.src = item.image;
                    img.addEventListener("load", this.handleImageLoaded);
                    this.imagesLeftToLoad++;
                    if (item.thumbnail) {
                        const thumb = new Image();
                        thumb.src = item.thumbnail;
                        thumb.addEventListener("load", this.handleImageLoaded);
                        this.imagesLeftToLoad++;
                    }
                });
            });
        }

        // set custom translations
        LocalizationProvider.Instance.translations =
            this.props.translations || {};
        LocalizationProvider.Instance.setOnLanguageChanged(() =>
            this.setState({})
        );
        LocalizationProvider.Instance.localizeItems =
            this.props.localizeItems ?? false;
    }

    handleImageLoaded() {
        this.imagesLeftToLoad--;
        if (this.imagesLeftToLoad <= 0) this.setState({ loaded: true });
    }

    updateSelection(category: string, item: Item) {
        const state = this.state;
        state.currentSelection[category] = item;
        this.setState(state);
        if (this.props.onItemChange) this.props.onItemChange(category, item);
    }

    handleBuyClick(): void {
        if (
            this.confirmBuyDialog !== null &&
            this.confirmBuyDialog.current !== null
        )
            this.confirmBuyDialog.current.open();
    }

    summaryDialogOnEdit(category: string): void {
        this.openSelectionCategory(category);
    }

    render() {
        const theme =
            this.props.theme === undefined || this.props.theme === "light"
                ? lightTheme
                : this.props.theme === "dark"
                ? darkTheme
                : this.props.theme;
        const loadingScreenVisible =
            !this.state.loaded &&
            (this.props.preloadImages ?? false) &&
            (this.props.showLoadingScreen ?? false);
        return (
            <div className={style.page}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <LoadingScreen visible={loadingScreenVisible} />
                    <MenuBox
                        backButton={this.props.backButton}
                        displayBackButton={this.props.displayBackButton}
                        onBack={this.props.onBack}
                        displayLanguageDropdown={
                            this.props.displayLanguageDropdown
                        }
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
                        onEdit={this.summaryDialogOnEdit}
                    />
                </MuiThemeProvider>
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
