import { useMediaQuery, useTheme } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

export function ResponsiveDialog(props: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Dialog fullScreen={fullScreen} {...props}>
            {props.children}
        </Dialog>
    );
}
