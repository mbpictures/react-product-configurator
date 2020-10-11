import { Category, Item } from "../index";
import React from "react";
import {
    createStyles,
    ListItemText,
    Theme,
    withStyles,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
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
    classes: any;
    setSubmenuHandlers: (
        openSubmenu: () => any,
        closeSubmenu: () => any
    ) => any;
}

interface state {
    drawerOpen: boolean;
    currentItem: Item;
}

const useStyles = (theme: Theme) =>
    createStyles({
        listItem: {
            height: "80px",
        },
        listItemActive: {
            backgroundColor: theme.palette.divider,
        },
        drawerPaper: {
            width: "80%",
            [theme.breakpoints.up("lg")]: {
                width: (props: props) => props.drawerWidth,
            },
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
    });

export class ProductCategory extends React.Component<props, state> {
    constructor(props: props) {
        super(props);

        let defaultItem: Item = props.category.items[0];
        props.category.items.forEach((item: Item) => {
            if (!item.default) return;
            defaultItem = item;
        });

        this.state = {
            drawerOpen: false,
            currentItem: defaultItem,
        };

        this.toggleSubmenu = this.toggleSubmenu.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.openSubmenu = this.openSubmenu.bind(this);
        this.closeSubmenu = this.closeSubmenu.bind(this);
    }

    componentDidMount() {
        this.props.setSubmenuHandlers(this.openSubmenu, this.closeSubmenu);
    }

    toggleSubmenu() {
        this.setState((prevState: state) => {
            return { drawerOpen: !prevState.drawerOpen };
        });
    }

    openSubmenu() {
        if (this.state.drawerOpen) return;
        this.toggleSubmenu();
    }

    closeSubmenu() {
        if (!this.state.drawerOpen) return;
        this.toggleSubmenu();
    }

    updateItem(item: Item) {
        this.setState({ currentItem: item });
        this.props.onItemChange(this.props.category.name, item);
        this.closeSubmenu();
    }

    render() {
        const classes = this.props.classes;
        const window = this.props.window;
        const container =
            window !== undefined ? () => window().document.body : undefined;

        const items = this.props.category.items.map((item: Item) => {
            const classNames =
                classes.listItem +
                " " +
                (item === this.state.currentItem ? classes.listItemActive : "");
            return (
                <ListItem
                    button
                    key={`product-category-item-${item.name}`}
                    className={classNames}
                    onClick={() => this.updateItem(item)}
                >
                    <ListItemAvatar>
                        <Thumbnail
                            color={item.color}
                            thumbnail={item.thumbnail}
                        />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                </ListItem>
            );
        });

        const drawer = (
            <div>
                <div className={classes.drawerHeader}>
                    <IconButton
                        onClick={this.closeSubmenu}
                        className={classes.closeButton}
                    >
                        <CloseIcon />
                    </IconButton>
                    {this.props.category.name}
                </div>
                <Divider />
                <List>{items}</List>
            </div>
        );

        return (
            <ListItem
                button
                key={`product-category${this.props.category.name}`}
                className={classes.listItem}
                onClick={this.openSubmenu}
            >
                <ListItemAvatar>
                    <Thumbnail
                        color={this.state.currentItem.color}
                        thumbnail={this.state.currentItem.thumbnail}
                    />
                </ListItemAvatar>
                <ListItemText primary={this.props.category.name} />
                <Drawer
                    container={container}
                    variant="persistent"
                    anchor="right"
                    open={this.state.drawerOpen}
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
}

export default withStyles(useStyles)(ProductCategory);
