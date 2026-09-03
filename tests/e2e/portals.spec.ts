import { test, expect } from "@playwright/test";

const roles = [
  { role: "PARENT", path: "/portail/parent", marker: "Bureau Scolaire" },
  { role: "TEACHER", path: "/portail/enseignant", marker: "Salle de Classe" },
  { role: "STUDENT", path: "/portail/etudiant", marker: "salle de classe numérique" },
  { role: "ADMIN", path: "/admin/centre-de-commandement", marker: "Centre de commandement" },
];

test.describe("DEV/TEST bypass — portal navigation", () => {
  for (const { role, path, marker } of roles) {
    test(`${role} can enter ${path} without credentials`, async ({ page }) => {
      // Use page.request (shares the page's cookie jar) — a standalone
      // `request` fixture has its own cookie jar and would not authenticate `page`.
      const res = await page.request.post("/api/dev-bypass", { data: { role } });
      expect(res.ok()).toBeTruthy();

      await page.goto(path);
      await expect(page.locator("body")).toContainText(marker, { ignoreCase: true });
      // Defense against a false positive: AdminNav's own tab labels repeat
      // "Centre de commandement" on every /admin/* page, including the
      // institution picker — so the marker text alone isn't proof the real
      // page loaded. Confirm we actually landed there, not redirected.
      if (path.startsWith("/admin")) {
        await expect(page).not.toHaveURL(/\/admin\/institution/);
      }
    });
  }

  test("Android Back-equivalent: browser back returns to the previous portal screen", async ({ page }) => {
    await page.request.post("/api/dev-bypass", { data: { role: "PARENT" } });
    await page.goto("/portail/parent");
    await page.goto("/dev-bypass");
    await page.goBack();
    await expect(page).toHaveURL(/\/portail\/parent/);
  });
});

test.describe("Institution separation — three-institution gate", () => {
  test("ADMIN hitting a data page with no institution chosen is redirected to the picker", async ({ page }) => {
    await page.request.post("/api/dev-bypass", { data: { role: "ADMIN" } });
    await page.goto("/admin/courses");
    await expect(page).toHaveURL(/\/admin\/institution/);
    await expect(page.locator("body")).toContainText("Choisir une institution", { ignoreCase: true });
  });

  test("choosing an institution persists and unlocks the originally requested page", async ({ page }) => {
    await page.request.post("/api/dev-bypass", { data: { role: "ADMIN" } });
    await page.goto("/admin/courses");
    await expect(page).toHaveURL(/\/admin\/institution/);

    await page.getByRole("button", { name: /École Classique/i }).click();
    await expect(page).toHaveURL(/\/admin\/courses/);
    await expect(page.locator("body")).toContainText("École Classique", { ignoreCase: true });

    // Persisted: a second unrelated admin page no longer redirects to the picker.
    await page.goto("/admin/users");
    await expect(page).not.toHaveURL(/\/admin\/institution/);
  });

  test("Centre de commandement is reachable directly (its own cross-institution scope selector)", async ({ page }) => {
    await page.request.post("/api/dev-bypass", { data: { role: "ADMIN" } });
    await page.goto("/admin/centre-de-commandement");
    await expect(page).not.toHaveURL(/\/admin\/institution/);
    await expect(page.getByText("Vue globale", { exact: false }).first()).toBeVisible();
  });
});

test.describe("RBAC — protected routes redirect when unauthenticated", () => {
  test("an unauthenticated visitor is redirected away from /admin/dashboard", async ({ page }) => {
    await page.context().clearCookies();
    await page.goto("/admin/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("an unauthenticated visitor is redirected away from /portail/parent", async ({ page }) => {
    await page.context().clearCookies();
    await page.goto("/portail/parent");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Login screen", () => {
  test("renders Email, Mot de passe and Se connecter", async ({ page }) => {
    await page.context().clearCookies();
    await page.goto("/login");
    await expect(page.getByText("Email")).toBeVisible();
    await expect(page.getByText("Mot de passe")).toBeVisible();
    await expect(page.getByRole("button", { name: /se connecter/i })).toBeVisible();
  });
});

test.describe("Public site — no regression", () => {
  test("homepage loads and shows the official links section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Liens officiels/i })).toBeVisible();
  });

  test("contact page loads", async ({ page }) => {
    const res = await page.goto("/contact");
    expect(res?.ok()).toBeTruthy();
  });
});
