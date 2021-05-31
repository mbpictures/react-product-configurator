import React from "react";
import { Category, Item } from "../index";
import { createStyles, Hidden, Theme, withStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ProductCategory, { ItemChangeCallback } from "./ProductCategory";
import PriceBuy from "./PriceBuy";
import mainStyle from "../styles/Main.scss";

const drawerWidth = 400;

const useStyles = (theme: Theme) =>
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
        drawerMobile: {
            [theme.breakpoints.up("lg")]: {
                display: "none",
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
    });

interface props {
    categories: Category[];
    onChangeSelection: ItemChangeCallback;
    name: string;
    price: number;
    onBuy: () => any;
    window?: () => Window;
    classes: any;
    setOpenCategory: (openCategory: (category: string) => any) => any;
}

interface state {
    mobileDrawerOpen: boolean;
}

export class ProductSelection extends React.Component<props, state> {
    private openProductCategories: Record<string, (() => any)[]> = {};
    private closeProductCategories: Record<string, (() => any)[]> = {};
    constructor(props: props) {
        super(props);
        this.state = {
            mobileDrawerOpen: false,
        };
        this.openSpecificCategory = this.openSpecificCategory.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    }

    componentDidMount() {
        this.props.setOpenCategory(this.openSpecificCategory);
    }

    handleDrawerToggle() {
        this.setState((prevState: state) => {
            return { mobileDrawerOpen: !prevState.mobileDrawerOpen };
        });
    }

    handleDrawerClose() {
        this.setState({ mobileDrawerOpen: false });
    }

    handleDrawerOpen() {
        this.setState({ mobileDrawerOpen: true });
    }

    openSpecificCategory(category: string) {
        if (!(category in this.openProductCategories)) return;
        this.handleDrawerOpen();
        Object.values(this.closeProductCategories).forEach((closeHandlers) =>
            closeHandlers.forEach((handler) => handler())
        );
        this.openProductCategories[category].forEach((value) => value());
    }

    addProductCategoryHandlers(
        categoryName: string,
        openSubmenu: () => any,
        closeSubmenu: () => any
    ) {
        if (!this.openProductCategories[categoryName])
            this.openProductCategories[categoryName] = [];
        if (!this.closeProductCategories[categoryName])
            this.closeProductCategories[categoryName] = [];
        this.openProductCategories[categoryName].push(openSubmenu);
        this.closeProductCategories[categoryName].push(closeSubmenu);
    }

    render() {
        const { window, classes } = this.props;

        const container =
            window !== undefined ? () => window().document.body : undefined;

        const categories = this.props.categories.map((val) => (
            <ProductCategory
                setSubmenuHandlers={(
                    openSubmenu: () => any,
                    closeSubmenu: () => any
                ) => {
                    this.addProductCategoryHandlers(
                        val.name,
                        openSubmenu,
                        closeSubmenu
                    );
                }}
                key={val.name}
                category={val}
                drawerWidth={drawerWidth}
                onItemChange={(category: string, item: Item) =>
                    this.props.onChangeSelection(category, item)
                }
            />
        ));

        const drawer = (
            <div className={mainStyle["drawer-main"]}>
                <div className={classes.drawerHeader}>
                    <IconButton
                        onClick={this.handleDrawerClose}
                        className={classes.closeButton}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                    {this.props.name}
                </div>
                <Divider />
                <div className={mainStyle["drawer-content-holder"]}>
                    <div className={mainStyle["outer-drawer-content"]}>
                        <div className={mainStyle["drawer-content"]}>
                            <List
                                className={`${mainStyle["drawer-items"]} ${mainStyle["list-padding-overwrite"]}`}
                            >
                                {categories}
                            </List>
                            <PriceBuy
                                price={this.props.price}
                                onBuy={this.props.onBuy}
                            />
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
                    onClick={this.handleDrawerToggle}
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
                            open={this.state.mobileDrawerOpen}
                            onClose={this.handleDrawerClose}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            className={classes.drawerMobile}
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
}

export default withStyles(useStyles)(ProductSelection);
