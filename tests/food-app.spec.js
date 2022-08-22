// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://lunch.devbstaging.com/login-password');
});

test('Should be able login with valid credentials', async ({ page }) => {
  await page.locator('[aria-label="Email"]').click();
  await page.locator('[aria-label="Email"]').fill('Karolis.Jakstas@sourceryacademy.com');
  await page.locator('[aria-label="Password"]').fill('nera_svarbus9');
  await page.locator('button:has-text("Login")').click();
});


test('Should not be able login with invalid credentials', async ({ page }) => {
  await page.locator('[aria-label="Email"]').click();
  await page.locator('[aria-label="Email"]').fill('test@sourceryacademy.com');
  await page.locator('[aria-label="Password"]').fill('test');
  await page.locator('button:has-text("Login")').click();
});


test('Adding new supplier to get success message', async ({ page }) => {
  await page.locator('[aria-label="Email"]').fill('admin5@sourceryacademy.com');
  await page.locator('[aria-label="Password"]').fill('nera_svarbus34');
  await page.locator('button:has-text("Login")').click();
  await page.waitForLoadState();
  await page.locator('text=Patiekalų Redagavimas').click();
  await page.locator('button:has-text("buildclose")').hover();
  await page.locator('button:has-text("add")').click();
  await page.locator('text=Tiekėjo Pavadinimasarrow_drop_down >> [aria-label="Tiekėjo Pavadinimas"]').fill('Test_supplier');
  await page.locator('text=Tiekėjo Pavadinimasarrow_drop_down >> [aria-label="Tiekėjo Pavadinimas"]').press('Tab');
  await page.locator('[aria-label="Spalva"]').fill('red');  
  await page.locator('text=Sriubos (Soups)more_vertkeyboard_arrow_down delete KainaKiekisPatiekalo pavadini >> [aria-label="Kaina"]').fill('3');  
  await page.locator('text=Sriubos (Soups)more_vertkeyboard_arrow_down delete KainaKiekisPatiekalo pavadini >> [aria-label="Kiekis"]').fill('3');  
  await page.locator('text=Sriubos (Soups)more_vertkeyboard_arrow_down delete KainaKiekisPatiekalo pavadini >> [aria-label="Patiekalo pavadinimas"]').fill('sriuba');
  await page.locator('text=Sriubos (Soups)more_vertkeyboard_arrow_down delete KainaKiekisPatiekalo pavadini >> [aria-label="Patiekalo pavadinimas"]').press('Tab'); 
  await page.locator('text=Sriubos (Soups)more_vertkeyboard_arrow_down delete KainaKiekisPatiekalo pavadini >> [aria-label="Vertimas"]').fill('soup'); 
  await page.locator('text=Kategorijos').click();
  await page.locator('text=(Main Dishes)').click(); 
  await page.locator('text=Pagrindiniai Patiekalai (Main Dishes)restaurantmore_vertkeyboard_arrow_down dele >> [aria-label="Kaina"]').fill('3');
  await page.locator('text=Pagrindiniai Patiekalai (Main Dishes)restaurantmore_vertkeyboard_arrow_down dele >> [aria-label="Kiekis"]').fill('3');
  await page.locator('text=Pagrindiniai Patiekalai (Main Dishes)restaurantmore_vertkeyboard_arrow_down dele >> [aria-label="Patiekalo pavadinimas"]').fill('kepsnys');  
  await page.locator('text=Pagrindiniai Patiekalai (Main Dishes)restaurantmore_vertkeyboard_arrow_down dele >> [aria-label="Vertimas"]').fill('steak');  
  await page.locator('button:has-text("Išsaugoti")').first().click();
  await page.waitForLoadState();

  await expect(page.locator('text=Tiekėjas sėkmingai išsaugotas. Close'), 'Tiekėjas sėkmingai išsaugotas').toBeVisible();
});


test('Should be able to order food', async ({ page }) => {
  await page.locator('[aria-label="Email"]').click();
  await page.locator('[aria-label="Email"]').fill('Karolis.Jakstas@sourceryacademy.com');
  await page.locator('[aria-label="Password"]').fill('nera_svarbus9');
  await page.locator('button:has-text("Login")').click();
  await page.waitForLoadState();
  await page.locator('text=Test_supplier').nth(1).click();
  await expect(page).toHaveURL('https://lunch.devbstaging.com/dishes/monday/Test_supplier'); 
  await page.locator('main >> text=sriuba').click();
  await page.locator('main >> text=kepsnys').click();
  await page.locator('button:has-text("0.00 €send")').click();
});