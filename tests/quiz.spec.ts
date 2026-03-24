import { test, expect } from "@playwright/test";

test.describe("Statistikaameti viktoriin", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

test("avab rakenduse ja näitab intro kaarti", async ({ page }) => {
    await expect(
        page.getByRole("heading", { name: "Viktoriin", exact: true })
    ).toBeVisible();

    await expect(
        page.getByRole("heading", { name: /Kas oled valmis viktoriiniks/i })
    ).toBeVisible();

    await expect(
        page.getByRole("button", { name: "Alusta viktoriini", exact: true })
    ).toBeVisible();
});

  test("õige vastus suurendab punktisummat", async ({ page }) => {
    await page.getByRole("button", { name: "Alusta viktoriini" }).click();

    await expect(page.getByText("Skoor: 0")).toBeVisible();

    await page
      .getByRole("button", {
        name: /Vastus B: Sofia/i,
      })
      .click();

    await expect(page.getByText("Õige vastus!")).toBeVisible();
    await expect(page.getByText("Skoor: 0")).toBeVisible();

    await page
      .getByRole("button", { name: /Mine järgmise küsimuse juurde/i })
      .click();

    await expect(page.getByText("Skoor: 1")).toBeVisible();
  });

  test("vale vastuse korral kuvatakse tagasiside ja õige vastus", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Alusta viktoriini" }).click();

    await page
      .getByRole("button", {
        name: /Vastus A: Emilia/i,
      })
      .click();

    await expect(page.getByText("Vale vastus!")).toBeVisible();
    await expect(
      page.getByText("Õige vastus oli: Sofia")
    ).toBeVisible();
  });

  test("näitab lõpptulemust pärast kõigi küsimuste vastamist", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Alusta viktoriini" }).click();

    // 1. küsimus - õige
    await page.getByRole("button", { name: /Vastus B: Sofia/i }).click();
    await page
      .getByRole("button", { name: /Mine järgmise küsimuse juurde/i })
      .click();

    // 2. küsimus - õige
    await page.getByRole("button", { name: /Vastus A: 43 900/i }).click();
    await page
      .getByRole("button", { name: /Mine järgmise küsimuse juurde/i })
      .click();

    // 3. küsimus - vale
    await page
      .getByRole("button", { name: /Vastus A: Hiiu maakond/i })
      .click();
    await page
      .getByRole("button", { name: /Mine järgmise küsimuse juurde/i })
      .click();

    await expect(
      page.getByText("Lõpptulemus")
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "2 / 3" })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Tulemuste ülevaade" })
    ).toBeVisible();

    await expect(page.getByText("Sofia")).toBeVisible();
    await expect(page.getByText("43 900")).toBeVisible();
    await expect(page.getByText("Hiiu maakond")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Alusta uuesti" })
    ).toBeVisible();
  });
});