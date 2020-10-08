import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});
