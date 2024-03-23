import RexPaperUtils from "../../RexPaperUtils";
import { RexComponentOptions } from "../../interfaces";
import { COLOR } from "../color";
import { RexComponent } from "../common";
import Paper from "paper";

interface RadioOptions extends RexComponentOptions {
    label?: string;
}

class Radio extends RexComponent<RadioOptions> {
    _selected: boolean = false;
    _selectedCircle: paper.Path.Circle | null = null;

    constructor(options?: RadioOptions) {
        super(options);
        this.paperElement = new Paper.Group();
        this.paperElement.applyMatrix = false;
        this.paperElement.pivot = new Paper.Point(0, 0);

        const circle = new Paper.Path.Circle({
            point: [0, 0],
            radius: 8,
            strokeColor: COLOR.Neutral,
            fillColor: COLOR.Withe,
        });

        this.addChild("radio", circle);

        this.paperElement.position.x =
            this.options?.point?.x! + circle.bounds.width / 2;
        this.paperElement.position.y =
            this.options?.point?.y! + circle.bounds.height / 2;

        if (this.options?.label) {
            const text = new Paper.PointText({
                point: [0, 0],
                content: this.options.label,
                fillColor: COLOR.TextColor1,
                fontSize: 16,
            });
            this.addChild("text", text);
            text.position.x = circle.position.x + circle.bounds.width * 2;
            text.position.y = circle.position.y;
        }

        this.paperElement.onMouseEnter = this.hover;
        this.paperElement.onMouseLeave = this.leave;
        this.paperElement.onClick = this.click;
    }

    hover = () => {
        RexPaperUtils.getInstance().getCanvas()!.style.cursor = "pointer";
        const radio = this.getChildren("radio");
        if (radio) {
            radio.fillColor = COLOR.Neutral2;
        }
    };

    leave = () => {
        RexPaperUtils.getInstance().getCanvas()!.style.cursor = "default";
        const radio = this.getChildren("radio");
        if (radio) {
            radio.fillColor = COLOR.Withe;
        }
    };

    click = () => {
        this._selected = !this._selected;
        if (this._selected) {
            if (this._selectedCircle) {
                this._selectedCircle.visible = true;
            } else {
                const radio = new Paper.Path.Circle({
                    point: [0, 0],
                    radius: 4,
                    strokeColor: COLOR.Neutral,
                    fillColor: COLOR.Neutral,
                });
                this._selectedCircle = radio;
                this.addChild("radio2", radio);
            }
        } else {
            if (this._selectedCircle) {
                this._selectedCircle.visible = false;
            }
        }
    };
}

export default Radio;
