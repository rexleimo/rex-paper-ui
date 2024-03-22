// 单列
class RexPaperUtils {
    static _instance: RexPaperUtils | null = null;
    public static getInstance() {
        if (!RexPaperUtils._instance) {
            RexPaperUtils._instance = new RexPaperUtils();
        }
        return RexPaperUtils._instance;
    }

    _canvas: HTMLElement | null = null;
    setCanvas(canvas: HTMLElement) {
        this._canvas = canvas;
    }

    getCanvas() {
        return this._canvas;
    }
}

export default RexPaperUtils;
