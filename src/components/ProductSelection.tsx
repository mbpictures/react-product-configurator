import React from "react";
import { Category, Item } from "../index";
import { createStyles, Hidden, Theme } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ProductCategory from "./ProductCategory";
import { PriceBuy } from "./PriceBuy";

const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        drawer: {
            [theme.breakpoints.up("lg")]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        menuButton: {
            position: "absolute",
            right: "0px",
            top: "0px",
            [theme.breakpoints.up("lg")]: {
                display: "none",
            },
        },
        closeButton: {
            position: "absolute",
            left: "5px",
            [theme.breakpoints.up("lg")]: {
                display: "none",
            },
        },
        drawerHeader: {
            padding: "15px",
            fontSize: "2em",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        drawerPaper: {
            width: "80%",
            [theme.breakpoints.up("lg")]: {
                width: drawerWidth,
            },
            boxShadow: "-3px 0px 29px 6px rgba(0,0,0,0.35)",
            overflowX: "hidden",
        },
        holder: {
            flexGrow: 1,
        },
        outerDrawerContent: {
            display: "flex",
            height: "100%",
            justifyContent: "center",
        },
        drawerContent: {
            boxSizing: "border-box",
            alignSelf: "center",
            display: "flex",
            flexFlow: "column",
            height: "100px", // value is not relevant, it just enables scrolling of the list
            flex: "1", // expand elements horizontally
            minHeight: "100%", // ensure the usage of the full height
        },
        drawerItems: {
            flex: "1",
            overflowY: "auto",
        },
        drawerMain: {
            display: "flex",
            height: "100%",
            flexDirection: "column",
        },
    })
);

interface props {
    categories: Category[];
    onChangeSelection: (categoryName: string, item: Item) => any;
    name: string;
    price: number;
    onBuy: () => any;
    window?: () => Window;
}

export function ProductSelection(props: props) {
    const { window } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    const categories = props.categories.map((val) => (
        <ProductCategory
            key={val.name}
            category={val}
            drawerWidth={drawerWidth}
            onItemChange={(category, item) =>
                props.onChangeSelection(category, item)
            }
        />
    ));

    const drawer = (
        <div className={classes.drawerMain}>
            <div className={classes.drawerHeader}>
                <IconButton
                    onClick={handleDrawerClose}
                    className={classes.closeButton}
                >
                    <ChevronRightIcon />
                </IconButton>
                {props.name}
            </div>
            <Divider />
            <div className={classes.holder}>
                <div className={classes.outerDrawerContent}>
                    <div className={classes.drawerContent}>
                        <List className={classes.drawerItems}>
                            {categories}
                        </List>
                        <PriceBuy price={props.price} onBuy={props.onBuy} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={classes.root}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden lgUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor="right"
                        open={mobileOpen}
                        onClose={handleDrawerClose}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                        anchor="right"
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}
