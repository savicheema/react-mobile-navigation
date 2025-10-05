import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.tsx",
    output: {
      file: "dist/index.jsx",
      format: "esm",
      sourcemap: true,
    },
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    external: ["react", "react-dom", "styled-components", "react/jsx-runtime"],
  },
];
