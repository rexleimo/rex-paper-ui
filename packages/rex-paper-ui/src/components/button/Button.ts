import { RexComponentOptions } from "../../interfaces";
import { RexComponent } from "../common";
import Paper from "paper";
import { COLOR } from "../color";
import RexPaperUtils from "../../RexPaperUtils";

interface ButtonOptions extends RexComponentOptions {
    text?: string;
    fontSize?: number;
}

class Button extends RexComponent<ButtonOptions> {
    constructor(options?: ButtonOptions) {
        super(options);
        this.paperElement = new Paper.Group();
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
        this.paperElement;
        this.paperElement.addChild(rect);
        if (this.options?.text) {
            const text = new Paper.PointText({
                content: this.options.text || "Button",
                fillColor: COLOR.TextColor1,
                fontSize: this.options.fontSize || 20,
                fontFamily: "Roboto",
                point: rect.bounds.center,
                zIndex: 10,
            } as ButtonOptions);
            this.paperElement.addChild(text);
            text.point.x = text.point.x - text.bounds.width / 2;
            text.point.y = text.point.y + text.bounds.height / 4;
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
