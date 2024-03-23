import { RexComponent } from "../common";
import { COLOR } from "../color";
import Paper from "paper";
import { RexComponentColor, RexComponentOptions } from "../../interfaces";
import RexPaperUtils from "../../RexPaperUtils";
import svg from "./selected.svg";

interface CheckboxOptions extends RexComponentOptions {
    label?: string;
    fontSize?: number;
    selected?: boolean;
    color?: RexComponentColor;
}

class Checkbox extends RexComponent<CheckboxOptions> {
    _selected: boolean = false;
    _selectedSvg: paper.Group | null = null;

    _primaryColor: paper.Color | null = null;
    _primaryColorLight: paper.Color | null = null;

    constructor(options: CheckboxOptions) {
        super(options);

        this._selected = options.selected || false;
        this.handleOptionsColor();

        this.paperElement = new Paper.Group();
        this.paperElement.applyMatrix = false;
        this.paperElement.pivot = new Paper.Point(0, 0);

        const rect = new Paper.Path.Rectangle({
            point: [0, 0],
            size: [16, 16],
            radius: 4,
            strokeWidth: 1,
            strokeColor: this._primaryColor,
            fillColor: COLOR.Withe,
        });

        this.addChild("checkbox", rect);

        if (this.options?.label) {
            const fontSize = this.options.fontSize || 16;
            const text = new Paper.PointText({
                point: [0, 0],
                content: this.options.label,
                fontSize,
            });
            this.addChild("text", text);
            text.position.y =
                this.paperElement.bounds.center.y + text.bounds.height / 3;
            text.position.x =
                rect.position.x + rect.bounds.width + text.bounds.width / 2;
        }

        this.paperElement.position = this.options?.point!;
        this.paperElement.onMouseEnter = this.hover.bind(this);
        this.paperElement.onMouseLeave = this.leave.bind(this);
        this.paperElement.onClick = this.click.bind(this);

        this.updateSelectedState();
    }

    hover() {
        RexPaperUtils.getInstance().getCanvas()!.style.cursor = "pointer";
        this.handleCheckBoxColor(this._primaryColorLight!);
    }

    leave() {
        RexPaperUtils.getInstance().getCanvas()!.style.cursor = "auto";
        this.handleCheckBoxColor(this._primaryColor!)!.fillColor = COLOR.Withe;
    }

    updateSelectedState = () => {
        if (this._selected) {
            if (this._selectedSvg) {
                this._selectedSvg.visible = true;
            } else {
                Paper.project.importSVG(svg, (item: paper.Group) => {
                    this._selectedSvg = item;
                    item.fillColor = this._primaryColor;
                    item.position.x = item.position.x;
                    item.position.y = item.position.y;
                    item.bounds.size = new Paper.Size(16, 16);
                    this.addChild("svg", item);
                });
            }
        } else {
            if (this._selectedSvg) {
                this._selectedSvg.visible = false;
            }
        }
    };

    click() {
        this._selected = !this._selected;
        this.updateSelectedState();
    }

    handleOptionsColor = () => {
        const color = this.options?.color;
        if (color === "neutral") {
            this._primaryColor = COLOR.Neutral;
            this._primaryColorLight = COLOR.Neutral2;
        } else if (color === "danger") {
            this._primaryColor = COLOR.Danger;
            this._primaryColorLight = COLOR.Danger2;
        } else if (color === "success") {
            this._primaryColor = COLOR.Success;
            this._primaryColorLight = COLOR.Success2;
        } else if (color === "warning") {
            this._primaryColor = COLOR.Warning;
            this._primaryColorLight = COLOR.Warning2;
        } else {
            this._primaryColor = COLOR.Primary;
            this._primaryColorLight = COLOR.Primary2;
        }
    };

    handleCheckBoxColor = (color: paper.Color) => {
        const checkbox = this.getChildren("checkbox");
        if (checkbox) {
            checkbox.fillColor = color;
        }
        return checkbox;
    };

    getSelected() {
        return this._selected;
    }

    setSelected(selected: boolean) {
        this._selected = selected;
        this.updateSelectedState();
    }
}

export default Checkbox;
