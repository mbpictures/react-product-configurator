import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import style from "../styles/BackButton.scss";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { LocalizationProvider } from "../provider/Localization";
import FlagIcon from "./FlagIcon";

interface props {
    onBack?: () => any;
    backButton?: React.ReactNode;
    displayBackButton?: boolean;
}

interface state {
    languageMenuAnchor: HTMLElement | null;
}

export class MenuBox extends React.Component<props, state> {
    constructor(props: props) {
        super(props);

        this.state = {
            languageMenuAnchor: null,
        };

        this.closeLanguageMenu = this.closeLanguageMenu.bind(this);
        this.openLanguageMenu = this.openLanguageMenu.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    closeLanguageMenu() {
        this.setState({ languageMenuAnchor: null });
    }

    openLanguageMenu(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({ languageMenuAnchor: event.currentTarget });
    }

    handleLanguageChange(newLanguage: string) {
        LocalizationProvider.Instance.language = newLanguage;
        this.closeLanguageMenu();
    }

    render() {
        if (!this.props.displayBackButton) return null;
        const buttonIcon = this.props.backButton ?? <ChevronLeftIcon />;

        const languages = LocalizationProvider.Instance.availableLanguages.map(
            (value) => {
                return (
                    <MenuItem
                        key={value}
                        onClick={() => this.handleLanguageChange(value)}
                    >
                        <FlagIcon
                            code={LocalizationProvider.Instance.getFlagCode(
                                value
                            )}
                        />
                    </MenuItem>
                );
            }
        );

        return (
            <div className={style.root}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.props.onBack}
                    className={style["back-button"]}
                >
                    {buttonIcon}
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.openLanguageMenu}
                    className={style["back-button"]}
                >
                    <FlagIcon
                        code={LocalizationProvider.Instance.getFlagCode(
                            LocalizationProvider.Instance.language
                        )}
                    />
                </IconButton>
                <Menu
                    anchorEl={this.state.languageMenuAnchor}
                    open={this.state.languageMenuAnchor !== null}
                    onClose={this.closeLanguageMenu}
                    keepMounted
                >
                    {languages}
                </Menu>
            </div>
        );
    }
}
