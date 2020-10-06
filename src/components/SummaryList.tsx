import React from "react";
import { ItemConfiguration } from "../index";
import { SummaryListItem } from "./SummaryListItem";
import { List } from "@material-ui/core";

export type EditCallback = (category: string) => any;

interface props {
    itemConfiguration: ItemConfiguration;
    displayEdit?: boolean;
    onEdit?: EditCallback;
}

export class SummaryList extends React.Component<props, any> {
    render() {
        return (
            <List style={{ paddingBottom: "0" }} {...this.props}>
                {Object.entries(this.props.itemConfiguration).map((val) => {
                    return (
                        <SummaryListItem
                            category={val[0]}
                            item={val[1]}
                            key={`summary-list-item-${val[0]}`}
                            displayEdit={this.props.displayEdit}
                            onEdit={this.props.onEdit}
                        />
                    );
                })}
            </List>
        );
    }
}
