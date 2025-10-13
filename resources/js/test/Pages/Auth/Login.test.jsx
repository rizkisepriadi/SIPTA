import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Login from "@/Pages/Auth/Login";

// Mock Inertia hooks
const mockPost = vi.fn();
const mockSetData = vi.fn();
const mockReset = vi.fn();

vi.mock("@inertiajs/react", () => ({
    Head: ({ title }) => <title>{title}</title>,
    Link: ({ children, href, ...props }) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
    useForm: () => ({
        data: { email: "", password: "", remember: false },
        setData: mockSetData,
        post: mockPost,
        processing: false,
        errors: {},
        reset: mockReset,
    }),
}));

// Mock components
vi.mock("@/Components/Checkbox", () => ({
    default: ({ name, onChange, ...props }) => (
        <input
            type="checkbox"
            name={name}
            onChange={onChange}
            data-testid="checkbox"
            {...props}
        />
    ),
}));

vi.mock("@/Components/InputError", () => ({
    default: ({ message }) =>
        message ? <div data-testid="input-error">{message}</div> : null,
}));

vi.mock("@/Components/InputLabel", () => ({
    default: ({ htmlFor, value }) => <label htmlFor={htmlFor}>{value}</label>,
}));

vi.mock("@/Components/PrimaryButton", () => ({
    default: ({ children, disabled, ...props }) => (
        <button disabled={disabled} {...props}>
            {children}
        </button>
    ),
}));

vi.mock("@/Components/TextInput", () => ({
    default: ({ id, type, name, value, onChange, ...props }) => (
        <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            data-testid={`input-${name}`}
            {...props}
        />
    ),
}));

vi.mock("@/Layouts/GuestLayout", () => ({
    default: ({ children }) => <div data-testid="guest-layout">{children}</div>,
}));

describe("Login Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders login form correctly", () => {
        render(<Login />);

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByText("Remember me")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Log in" })
        ).toBeInTheDocument();
    });

    it("displays status message when provided", () => {
        const status = "Password reset link sent!";
        render(<Login status={status} />);

        expect(screen.getByText(status)).toBeInTheDocument();
    });

    it("shows forgot password link when canResetPassword is true", () => {
        render(<Login canResetPassword={true} />);

        expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
    });

    it("does not show forgot password link when canResetPassword is false", () => {
        render(<Login canResetPassword={false} />);

        expect(
            screen.queryByText("Forgot your password?")
        ).not.toBeInTheDocument();
    });

    it("calls setData when email input changes", async () => {
        const user = userEvent.setup();
        render(<Login />);

        const emailInput = screen.getByTestId("input-email");
        await user.type(emailInput, "test@example.com");

        expect(mockSetData).toHaveBeenCalled();
    });

    it("calls setData when password input changes", async () => {
        const user = userEvent.setup();
        render(<Login />);

        const passwordInput = screen.getByTestId("input-password");
        await user.type(passwordInput, "password123");

        expect(mockSetData).toHaveBeenCalled();
    });

    it("calls setData when remember checkbox is clicked", async () => {
        const user = userEvent.setup();
        render(<Login />);

        const checkbox = screen.getByTestId("checkbox");
        await user.click(checkbox);

        expect(mockSetData).toHaveBeenCalled();
    });

    it("calls post with correct route when form is submitted", async () => {
        const user = userEvent.setup();
        render(<Login />);

        const form = screen
            .getByRole("button", { name: "Log in" })
            .closest("form");
        await user.click(screen.getByRole("button", { name: "Log in" }));

        expect(mockPost).toHaveBeenCalledWith("/login");
    });

    it("calls reset with password on component unmount", () => {
        const { unmount } = render(<Login />);
        unmount();

        expect(mockReset).toHaveBeenCalledWith("password");
    });
});
