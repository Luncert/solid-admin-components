import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // 构建 commonJS 和 ESmodules 
  dts: true, // 生成声明文件 (.d.ts )
  splitting: false,
  sourcemap: true,
  clean: true,
});
