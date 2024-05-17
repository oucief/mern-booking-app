import { test, expect } from "@playwright/test";

const FRONTEND_URL = "http://localhost:5173";

test("Should allow the user to login", async ({ page }) => {
  // Getting the login page
  await page.goto(FRONTEND_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(
    page.getByRole("heading", { name: "Login To Your Account" })
  ).toBeVisible();

  // Filling the login form
  await page.locator("[name=email]").fill("test@one.com");
  await page.locator("[name=password]").fill("123456");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Checking the changes in the page after the user is logged in
  await expect(page.getByText("HEY! Welcome Back.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("Should allow the user to register", async ({ page }) => {
  const testRegisterEmail = `testing_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;

  // Getting the registration page
  await page.goto(FRONTEND_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Sign up here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  // Filling the registration form
  await page.locator("[name=firstName]").fill("End2end");
  await page.locator("[name=lastName]").fill("testing");
  await page.locator("[name=email]").fill(testRegisterEmail);
  await page.locator("[name=password]").fill("end2end");
  await page.locator("[name=confirmPassword]").fill("end2end");
  await page.getByRole("button", { name: "Create Account" }).click();

  // Checking the changes in the page after the user is registered
  await expect(page.getByText("Registered Successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
