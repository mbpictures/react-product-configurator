import * as React from "react";
import { Item } from "..";
import style from "../styles/ProductPreview.scss";

interface props {
    currentSelection: { [keys: string]: Item };
}

export class ProductPreview extends React.Component<props, any> {
    render() {
        const selection: { [keys: string]: Item } = this.props.currentSelection;
        const images = Object.keys(selection)
            .sort(
                (a: string, b: string) =>
                    (selection[a].layer ?? 0) - (selection[b].layer ?? 0)
            )
            .map((key: string) => {
                return (
                    <img
                        className={style.images}
                        key={`preview-image-${key}`}
                        src={selection[key].image}
                        alt={selection[key].name}
                    />
                );
            });

        return <div className={style.preview}>{images}</div>;
    }
}
