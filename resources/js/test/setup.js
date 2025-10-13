import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Make React available globally for JSX transformation
globalThis.React = React;

// Mock Inertia route function
global.route = vi.fn((name) => `/${name}`);

// Mock window.route function
Object.defineProperty(window, "route", {
    value: global.route,
    writable: true,
});
