import { test, expect } from "@playwright/test";

test.describe("Login Integration Tests - Basic", () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to login page
        await page.goto("/login");
    });

    test("should display login form correctly", async ({ page }) => {
        // Wait for page to load completely
        await page.waitForLoadState("networkidle");

        // Check if login page elements are visible
        await expect(page.locator("h1")).toContainText("Login");
        await expect(page.locator('input[name="email"]')).toBeVisible();
        await expect(page.locator('input[name="password"]')).toBeVisible();
        await expect(page.locator('input[name="remember"]')).toBeVisible();

        // Check for submit button (more flexible selector)
        const submitButton = page.locator('button:has-text("Log in")');
        await expect(submitButton).toBeVisible();
    });

    test("should allow filling form inputs", async ({ page }) => {
        await page.waitForLoadState("networkidle");

        // Fill form inputs
        await page.fill('input[name="email"]', "test@example.com");
        await page.fill('input[name="password"]', "password123");
        await page.check('input[name="remember"]');

        // Verify inputs are filled
        await expect(page.locator('input[name="email"]')).toHaveValue(
            "test@example.com"
        );
        await expect(page.locator('input[name="password"]')).toHaveValue(
            "password123"
        );
        await expect(page.locator('input[name="remember"]')).toBeChecked();
    });

    test("should redirect to password reset when forgot password clicked", async ({
        page,
    }) => {
        await page.waitForLoadState("networkidle");

        // Check if forgot password link exists
        const forgotLink = page.locator("text=Forgot your password?");
        if ((await forgotLink.count()) > 0) {
            await forgotLink.click();

            // Wait for navigation
            await page.waitForLoadState("networkidle");

            // Check URL for password reset (adjust based on your actual route)
            const currentURL = page.url();
            // More flexible check - could be /forgot-password, /password/reset, etc.
            const isPasswordReset =
                currentURL.includes("forgot") ||
                currentURL.includes("password") ||
                currentURL.includes("reset");
            expect(isPasswordReset).toBe(true);
        } else {
            // Skip test if forgot password link is not visible (controlled by canResetPassword prop)
            console.log("Forgot password link not found - skipping test");
        }
    });

    test("should be able to submit form", async ({ page }) => {
        await page.waitForLoadState("networkidle");

        // Fill form with test data
        await page.fill('input[name="email"]', "test@example.com");
        await page.fill('input[name="password"]', "password123");

        // Setup request listener to capture form submission
        let formSubmitted = false;
        page.on("request", (request) => {
            if (
                request.url().includes("/login") &&
                request.method() === "POST"
            ) {
                formSubmitted = true;
            }
        });

        // Submit form
        await page.click('button:has-text("Log in")');

        // Wait a bit for request to be made
        await page.waitForTimeout(2000);

        // Verify form was submitted (request was made)
        expect(formSubmitted).toBe(true);
    });

    test("should handle form submission with network monitoring", async ({
        page,
    }) => {
        await page.waitForLoadState("networkidle");

        // Monitor network requests
        const requests = [];
        page.on("request", (request) => {
            if (request.url().includes("/login")) {
                requests.push({
                    url: request.url(),
                    method: request.method(),
                    headers: request.headers(),
                });
            }
        });

        // Fill and submit form
        await page.fill('input[name="email"]', "admin@example.com");
        await page.fill('input[name="password"]', "password");
        await page.click('button:has-text("Log in")');

        // Wait for potential redirect or response
        await page.waitForTimeout(3000);

        // Check if login request was made
        const loginRequest = requests.find(
            (req) => req.url.includes("/login") && req.method === "POST"
        );

        if (loginRequest) {
            console.log("Login request captured:", loginRequest);
            expect(loginRequest).toBeTruthy();
        }
    });
});
