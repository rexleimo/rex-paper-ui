const esbuild = require("esbuild");

const esbuild = require("esbuild");

// 构建选项
const buildOptions = {
    entryPoints: ["src/index.js"], // 入口文件
    bundle: true, // 是否打包
    outfile: "dist/bundle.js", // 输出文件
    minify: true, // 是否压缩
    sourcemap: true, // 是否生成源码映射
    target: ["es6"], // 目标环境
    platform: "browser", // 平台环境
};

// 构建并输出结果
esbuild.build(buildOptions).catch((err) => console.error(err));
