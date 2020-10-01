import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import React from "react";

interface props {
    thumbnail?: string;
    color?: string;
}

export function Thumbnail(props: props) {
    const avatar =
        !props.thumbnail && props.color ? (
            <Box
                color={props.color}
                style={{
                    backgroundColor: props.color,
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                }}
            />
        ) : (
            <Avatar src={props.thumbnail} />
        );

    return avatar;
}
