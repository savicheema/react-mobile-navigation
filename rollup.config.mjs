import typescript from "@rollup/plugin-typescript";
import resolve, {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" with { type: "json" };
import { jsx } from "react/jsx-runtime";

// const packageJson = require("./package.json")

export default [
  {
    input: "src/index.tsx",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
                plugins: [
                    resolve(
                        {
                            moduleDirectories: ["src"]
                        }
                    ),
                    commonjs(),
                    typescript({
                        tsconfig: "./tsconfig.json",
                    }),
                ],
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
                plugins: [
                    resolve({
                        mainFields: ["browser"],
                        moduleDirectories: ["src"]
                    }),
                    commonjs(),
                    typescript({
                        tsconfig: "./tsconfig.json",
                    }),
                ],
            },
            {
                "file": packageJson.types, 
                "format": "esm",
                "plugins": [dts(
                    {
                        tsconfig: "./tsconfig.json"
                    }
                )],
            },
            {
                "file": "./dist/cjs/index.d.ts", 
                "format": "cjs", 
                "plugins": [dts(
                    {
                        tsconfig: "./tsconfig.json",
                    }
                )],
            },
        ],
        jsx: "react"
    // external: ["react"],
    // bundle: ["src/**/*"]
  },
 
  
  
];
