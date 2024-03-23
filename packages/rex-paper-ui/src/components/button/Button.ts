import { RexComponentOptions, RexComponentColor } from "../../interfaces";
import { RexComponent } from "../common";
import Paper from "paper";
import { COLOR } from "../color";
import RexPaperUtils from "../../RexPaperUtils";

interface ButtonOptions extends RexComponentOptions {
    text?: string;
    fontSize?: number;
    color?: RexComponentColor;
    disable?: boolean;
    startDecorator?: HTMLCanvasElement | string;
}

const BUTTON_PADDING = 20;

class Button extends RexComponent<ButtonOptions> {
    primaryColor: paper.Color | null = null;
    primaryColorHover: paper.Color | null = null;

    constructor(options?: ButtonOptions) {
        super(options);
        this.paperElement = new Paper.Group({
            applyMatrix: false,
        });
        const fontSize = this.options?.fontSize || 14;

        this.handleColor();

        if (this.options?.startDecorator) {
            Paper.project.importSVG(
                this.options.startDecorator as string,
                (item: paper.Group) => {
                    this.addChild("startIcon", item);
                    item.bringToFront();
                    item.fillColor = COLOR.Withe;

                    item.position.y =
                        this.paperElement!.bounds.center.y + fontSize / 4;

                    item.position.x = BUTTON_PADDING;

                    item.bounds.size = new Paper.Size(fontSize, fontSize);

                    const text = this.getChildren("text");
                    if (text) {
                        text.position.x =
                            text.position.x + item.bounds.width / 2 + 12;
                        text.position.y = item.position.y + 1;
                    }

                    const rect = this.getChildren("rect");
                    if (rect) {
                        rect.bounds.width =
                            rect.bounds.width + item.bounds.width / 2 + 12;
                    }
                }
            );
        }

        if (this.options?.text) {
            const text = new Paper.PointText({
                content: this.options.text || "Button",
                fillColor: COLOR.Withe,
                fontSize,
                fontFamily: "Roboto",
                point: new Paper.Point(0, 0),
            } as ButtonOptions);
            this.addChild("text", text);
            const rect = new Paper.Path.Rectangle({
                fillColor: this.primaryColor,
                point: [0, 0],
                size: [
                    text.bounds.width + BUTTON_PADDING,
                    text.bounds.height + BUTTON_PADDING,
                ],
                radius: 4,
                shadowColor: COLOR.Shadow,
                shadowBlur: 12,
                shadowOffset: [3, 1],
            });
            this.addChild("rect", rect);

            text.bringToFront();
            text.point = rect.bounds.center;
            text.point.x = text.point.x - text.bounds.width / 2;
            text.point.y = text.point.y + text.bounds.height / 4;
        } else {
            const rect = new Paper.Path.Rectangle({
                fillColor: this.primaryColor,
                point: [0, 0],
                size: [100, 50],
                radius: 4,
                shadowColor: COLOR.Shadow,
                shadowBlur: 12,
                shadowOffset: [3, 1],
            });
            this.addChild("rect", rect);
        }

        this.paperElement.onMouseEnter = this.hover.bind(this);
        this.paperElement.onMouseLeave = this.leave.bind(this);

        this.handleDisable();

        if (this.options?.point) {
            this.paperElement.position.x =
                this.paperElement.position.x + this.options.point.x;
            this.paperElement.position.y =
                this.paperElement.position.y + this.options.point.y;
        }
    }

    handleColor() {
        const color = this.options?.color;
        if (color === "danger") {
            this.primaryColor = COLOR.Danger;
            this.primaryColorHover = COLOR.DangerLight;
        } else if (color === "neutral") {
            this.primaryColor = COLOR.Neutral;
            this.primaryColorHover = COLOR.NeutralLight;
        } else if (color === "success") {
            this.primaryColor = COLOR.Success;
            this.primaryColorHover = COLOR.SuccessLight;
        } else if (color === "warning") {
            this.primaryColor = COLOR.Warning;
            this.primaryColorHover = COLOR.WarningLight;
        } else {
            this.primaryColor = COLOR.Primary;
            this.primaryColorHover = COLOR.PrimaryLight;
        }
    }

    init() {}

    handleDisable() {
        if (this.options?.disable) {
            const rect = this.getChildren("rect");
            if (rect) {
                rect.fillColor = COLOR.Disable;
            }

            const text = this.getChildren("text");
            if (text) {
                text.fillColor = COLOR.DisableText;
            }
        }
    }

    hover() {
        if (this.options?.disable) {
            return;
        }

        RexPaperUtils.getInstance().getCanvas()!.style.cursor = "pointer";
        if (this.paperElement) {
            const rect = this.getChildren("rect");
            if (rect) {
                rect.fillColor = this.primaryColorHover;
            }
            const line = this.getChildren("line");
            const rightLine = this.getChildren("rightLine");
            if (line) {
                line.fillColor = this.primaryColorHover;
            }
            if (rightLine) {
                rightLine.fillColor = this.primaryColorHover;
            }
        }
    }

    leave() {
        if (this.options?.disable) {
            return;
        }

        RexPaperUtils.getInstance().getCanvas()!.style.cursor = "default";
        if (this.paperElement) {
            const rect = this.getChildren("rect");
            if (rect) {
                rect.fillColor = this.primaryColor;
            }
            const line = this.getChildren("line");
            const rightLine = this.getChildren("rightLine");
            if (line) {
                line.fillColor = this.primaryColor;
            }
            if (rightLine) {
                rightLine.fillColor = this.primaryColor;
            }
        }
    }
}

export default Button;
