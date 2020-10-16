import { Item } from "../index";
import React from "react";
import { Button, ListItem } from "@material-ui/core";
import mainStyle from "../styles/Main.scss";
import { Thumbnail } from "./Thumbnail";
import { EditCallback } from "./SummaryList";
import EditIcon from "@material-ui/icons/Edit";
import { LocalizationProvider } from "../provider/Localization";

interface props {
    category: string;
    item: Item;
    displayEdit?: boolean;
    onEdit?: EditCallback;
}

export class SummaryListItem extends React.Component<props, any> {
    constructor(props: props) {
        super(props);
        this.handleOnEdit = this.handleOnEdit.bind(this);
    }

    handleOnEdit() {
        if (!this.props.onEdit) return;
        this.props.onEdit(this.props.category);
    }

    render() {
        const editButton = this.props.displayEdit ? (
            <Button
                onClick={this.handleOnEdit}
                style={{
                    position: "absolute",
                    right: 0,
                    transform: "translateX(100%)",
                }}
            >
                <EditIcon />
            </Button>
        ) : null;
        return (
            <ListItem
                className={mainStyle["flex-stretch"]}
                style={{ padding: "0" }}
            >
                <div style={{ display: "flex" }}>
                    <Thumbnail
                        thumbnail={this.props.item.thumbnail}
                        color={this.props.item.color}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "12px",
                        }}
                    >
                        <span>
                            <strong>
                                {LocalizationProvider.Instance.getTranslation(
                                    this.props.category,
                                    true
                                )}
                            </strong>
                        </span>
                        <span>
                            {LocalizationProvider.Instance.getTranslation(
                                this.props.item.name,
                                true
                            )}
                        </span>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {this.props.item.price}&euro;
                    {editButton}
                </div>
            </ListItem>
        );
    }
}
