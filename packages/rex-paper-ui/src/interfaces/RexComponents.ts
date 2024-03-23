export type RexComponentColor =
    | "primary"
    | "danger"
    | "neutral"
    | "success"
    | "warning";

export interface RexComponentOptions {
    id?: number;
    radius?: number;
    fillColor?: paper.Color;
    point?: paper.Point;
    visible?: boolean;
    opacity?: number;
    shadowColor?: paper.Color;
    shadowBlur?: number;
    shadowOffset?: paper.Point;
}

export interface RexComponent {
    // 当前的paper元素
    paperElement: any;
    // 样式
    style?: any;
    options?: RexComponentOptions;

    childrenMap: Map<string, paper.Item>;
}
