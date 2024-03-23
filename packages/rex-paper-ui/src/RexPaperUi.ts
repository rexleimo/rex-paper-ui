import Paper from "paper";
import { RexPaperOptions } from "./interfaces";
import RexPaperUtils from "./RexPaperUtils";
class RexPaperUi {
    _el: HTMLElement | null = null;
    _canvas: HTMLCanvasElement | null = null;
    _options: RexPaperOptions | undefined | null = null;

    constructor(el: HTMLElement, options?: RexPaperOptions) {
        this._el = el;
        this._options = options;

        const canvas = document.createElement("canvas");
        // 不设置，鼠标获取有问题
        canvas.width = this._el.clientWidth;
        canvas.height = this._el.clientHeight;
        this._canvas = canvas;
        el.appendChild(this._canvas);
        RexPaperUtils.getInstance().setCanvas(this._canvas);
        Paper.setup(this._canvas!);
    }
}

export default RexPaperUi;
