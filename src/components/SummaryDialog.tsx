import { BuyCallback, Item, ItemConfiguration } from "../index";
import { Button, DialogContent, Hidden } from "@material-ui/core";
import React from "react";
import { ProductPreview } from "./preview";
import style from "../styles/Summary.scss";
import mainStyle from "../styles/Main.scss";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { ResponsiveDialog } from "./ResponsiveDialog";
import CloseIcon from "@material-ui/icons/Close";
import { SummaryList } from "./SummaryList";
import { LocalizationProvider } from "../provider/Localization";

interface props {
    currentSelection: ItemConfiguration;
    onConfirm?: BuyCallback;
    onAbort?: () => any;
    onPrivacyPolicy?: () => any;
    onEdit: (category: string) => any;
}

interface state {
    open: boolean;
}

export class SummaryDialog extends React.Component<props, state> {
    constructor(props: props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleAbort = this.handleAbort.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleOnEdit = this.handleOnEdit.bind(this);
    }

    open() {
        this.setState({ open: true });
    }

    close() {
        this.setState({ open: false });
    }

    handleBuy() {
        this.close();
        if (this.props.onConfirm)
            this.props.onConfirm(this.props.currentSelection);
    }

    handleAbort() {
        this.close();
        if (this.props.onAbort) this.props.onAbort();
    }

    handleOnEdit(category: string) {
        this.close();
        this.props.onEdit(category);
    }

    calculatePrice() {
        let price = 0;
        Object.values(this.props.currentSelection).forEach(
            (item: Item) => (price += item.price ?? 0)
        );
        return price;
    }

    render() {
        return (
            <ResponsiveDialog
                open={this.state.open}
                onClose={this.handleAbort}
                className={style.dialog}
                fullWidth
                maxWidth="md"
            >
                <Hidden lgUp>
                    <Button
                        onClick={this.handleAbort}
                        className={style.closeButton}
                    >
                        <CloseIcon />
                    </Button>
                </Hidden>
                <DialogContent className={style.content}>
                    <Hidden mdDown>
                        <div className={style["product-preview"]}>
                            <ProductPreview
                                currentSelection={this.props.currentSelection}
                            />
                        </div>
                    </Hidden>
                    <div className={style.description}>
                        <h1 style={{ margin: "0" }}>
                            {LocalizationProvider.Instance.getTranslation(
                                "summary"
                            )}
                        </h1>
                        <Hidden lgUp>
                            <div className={style["product-preview"]}>
                                <ProductPreview
                                    currentSelection={
                                        this.props.currentSelection
                                    }
                                />
                            </div>
                        </Hidden>
                        <SummaryList
                            itemConfiguration={this.props.currentSelection}
                            displayEdit
                            onEdit={this.handleOnEdit}
                        />
                        <div
                            className={mainStyle["flex-stretch"]}
                            style={{ marginTop: "0" }}
                        >
                            <span>
                                <h3 className={style["total-price"]}>
                                    {LocalizationProvider.Instance.getTranslation(
                                        "total"
                                    )}
                                </h3>
                            </span>
                            <span>
                                <h3 className={style["total-price"]}>
                                    {this.calculatePrice()} &euro;
                                </h3>
                            </span>
                        </div>
                        <ButtonGroup size="large" className={style.buttons}>
                            <Button
                                onClick={this.handleAbort}
                                variant="outlined"
                                color="secondary"
                            >
                                {LocalizationProvider.Instance.getTranslation(
                                    "cancel"
                                )}
                            </Button>
                            <Button
                                onClick={this.handleBuy}
                                variant="outlined"
                                color="primary"
                            >
                                {LocalizationProvider.Instance.getTranslation(
                                    "confirm"
                                )}
                            </Button>
                        </ButtonGroup>
                        <p>
                            {LocalizationProvider.Instance.localizedStrings.formatString(
                                LocalizationProvider.Instance.getTranslation(
                                    "privacyPolicyDescription"
                                ),
                                <Button
                                    color="primary"
                                    onClick={this.props.onPrivacyPolicy}
                                >
                                    {LocalizationProvider.Instance.getTranslation(
                                        "privacyPolicyButton"
                                    )}
                                </Button>
                            )}
                        </p>
                    </div>
                </DialogContent>
            </ResponsiveDialog>
        );
    }
}
