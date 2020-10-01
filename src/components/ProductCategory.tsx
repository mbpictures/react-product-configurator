import { Category, Item } from "../index";
import React from "react";
import { createStyles, ListItemText } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Thumbnail } from "./Thumbnail";

interface props {
    category: Category;
    drawerWidth: number;
    onItemChange: (category: string, item: Item) => any;
    window?: () => Window;
}

const useStyles = makeStyles(() =>
    createStyles({
        listItem: {
            height: "80px",
        },
        drawerPaper: {
            width: (props: props) => props.drawerWidth,
        },
        closeButton: {
            position: "absolute",
            left: "5px",
        },
        drawerHeader: {
            padding: "15px",
            fontSize: "2em",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    })
);

export function ProductCategory(props: props) {
    const classes = useStyles(props);
    const { window } = props;

    let defaultItem: Item = props.category.items[0];
    props.category.items.forEach((item: Item) => {
        if (!item.default) return;
        defaultItem = item;
    });

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState(defaultItem);

    const container =
        window !== undefined ? () => window().document.body : undefined;

    const toggleSubmenu = () => {
        setDrawerOpen(!drawerOpen);
    };

    const updateItem = (item: Item) => {
        setCurrentItem(item);
        props.onItemChange(props.category.name, item);
    };

    const items = props.category.items.map((item) => {
        return (
            <ListItem
                button
                key={`product-category-item-${item.name}`}
                className={classes.listItem}
                onClick={() => updateItem(item)}
            >
                <ListItemAvatar>
                    <Thumbnail color={item.color} thumbnail={item.thumbnail} />
                </ListItemAvatar>
                <ListItemText primary={item.name} />
            </ListItem>
        );
    });

    const drawer = (
        <div>
            <div className={classes.drawerHeader}>
                <IconButton
                    onClick={toggleSubmenu}
                    className={classes.closeButton}
                >
                    <CloseIcon />
                </IconButton>
                {props.category.name}
            </div>
            <Divider />
            <List>{items}</List>
        </div>
    );

    return (
        <ListItem
            button
            key={`product-category${props.category.name}`}
            className={classes.listItem}
            onClick={toggleSubmenu}
        >
            <ListItemAvatar>
                <Thumbnail
                    color={currentItem.color}
                    thumbnail={currentItem.thumbnail}
                />
            </ListItemAvatar>
            <ListItemText primary={props.category.name} />
            <Drawer
                container={container}
                variant="persistent"
                anchor="right"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
        </ListItem>
    );
}
