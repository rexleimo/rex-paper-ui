import { RexComponentOptions } from "../../interfaces";
import { RexComponent } from "../common";
import Paper from "paper";
import { COLOR } from "../color";
import RexPaperUtils from "../../RexPaperUtils";

interface ButtonOptions extends RexComponentOptions {
    text?: string;
    fontSize?: number;
    color?: paper.Color;
}

const BUTTON_PADDING = 20;

class Button extends RexComponent<ButtonOptions> {
    constructor(options?: ButtonOptions) {
        super(options);
        this.paperElement = new Paper.Group();
        const fontSize = this.options?.fontSize || 14;

        if (this.options?.text) {
            const text = new Paper.PointText({
                content: this.options.text || "Button",
                fillColor: this.options.color || COLOR.TextColor1,
                fontSize,
                fontFamily: "Roboto",
                point: new Paper.Point(0, 0),
            } as ButtonOptions);
            this.paperElement.addChild(text);

            const rect = new Paper.Path.Rectangle({
                fillColor: COLOR.Primary,
                point: [0, 0],
                size: [
                    text.bounds.width + BUTTON_PADDING,
                    text.bounds.height + BUTTON_PADDING,
                ],
                radius: 4,
                shadowColor: COLOR.Shadow,
                shadowBlur: 12,
                shadowOffset: [3, 1],
                ...this.options,
            } as RexComponentOptions);
            this.paperElement.addChild(rect);
            text.bringToFront();
            text.point = rect.bounds.center;
            text.point.x = text.point.x - text.bounds.width / 2;
            text.point.y = text.point.y + text.bounds.height / 4;
        } else {
            const rect = new Paper.Path.Rectangle({
                fillColor: COLOR.Primary,
                point: [0, 0],
                size: [100, 50],
                radius: 4,
                shadowColor: COLOR.Shadow,
                shadowBlur: 12,
                shadowOffset: [3, 1],
                ...this.options,
            } as RexComponentOptions);
            this.paperElement.addChild(rect);
        }

        this.paperElement.onMouseEnter = () => {
            RexPaperUtils.getInstance().getCanvas()!.style.cursor = "pointer";
        };

        this.paperElement.onMouseLeave = () => {
            RexPaperUtils.getInstance().getCanvas()!.style.cursor = "default";
        };
    }
}

export default Button;
