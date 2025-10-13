/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    esbuild: {
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./resources/js/test/setup.js"],
        include: ["resources/js/**/*.{test,spec}.{js,jsx}"],
        exclude: ["node_modules", "vendor"],
        transformMode: {
            web: [/\.[jt]sx?$/],
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./resources/js"),
        },
    },
});
