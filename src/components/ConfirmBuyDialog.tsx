import { BuyCallback, ItemConfiguration } from "../index";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import { ProductPreview } from "./preview";
import style from "../styles/ConfirmBuyDialog.scss";
import ButtonGroup from "@material-ui/core/ButtonGroup";

interface props {
    currentSelection: ItemConfiguration;
    onConfirm?: BuyCallback;
    onAbort?: () => any;
    onPrivacyPolicy?: () => any;
}

interface state {
    open: boolean;
}

export class ConfirmBuyDialog extends React.Component<props, state> {
    constructor(props: props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleAbort = this.handleAbort.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
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

    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleAbort}
                className={style.dialog}
                fullWidth
                maxWidth="md"
            >
                <DialogContent className={style.content}>
                    <div className={style["product-preview"]}>
                        <ProductPreview
                            currentSelection={this.props.currentSelection}
                        />
                    </div>
                    <div className={style.description}>
                        <h1 style={{ margin: "0" }}>Buy</h1>
                        <p>Price: 14.00 &euro;</p>
                        <ButtonGroup size="large" className={style.buttons}>
                            <Button
                                onClick={this.handleAbort}
                                variant="outlined"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={this.handleBuy}
                                variant="outlined"
                                color="primary"
                            >
                                Confirm
                            </Button>
                        </ButtonGroup>
                        <p>
                            With buying this product you accept our
                            <Button
                                color="primary"
                                onClick={this.props.onPrivacyPolicy}
                            >
                                Privacy Policy
                            </Button>
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}
