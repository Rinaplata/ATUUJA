const { test, expect } = require('@playwright/test');

const wbeUrllogin = "http://localhost:5173/auth/login"
const wbeUrlAdminLayout  = "http://localhost:5173/adminLayout"

async function login(page) {
  await page.goto(wbeUrllogin);
  await page.screenshot({ path: './screenshots/Test1-login.png' });
  
  // Completar el campo de correo electrónico
  await page.getByPlaceholder('Correo electrónico').fill('rn@gmail.com');
  await page.screenshot({ path: './screenshots/Test1-login-userset.png' });

  // Completar el campo de contraseña
  await page.getByPlaceholder('Contraseña').fill('123');
  await page.screenshot({ path: './screenshots/Test1-login-passwordset.png' });

  // Hacer clic en el botón de iniciar sesión
  await page.getByRole('button', { name: /Iniciar sesión/i }).click();

  // Esperar a que la navegación ocurra y validar que la página principal se cargue
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.screenshot({ path: './screenshots/Test1-after-login.png' });
  await expect(page.getByAltText('Logo')).toBeVisible();
}

// Test1 Login
test('Login pass', async ({ page }) => {
  await login(page);
})

//Test 1 Login ivalido
test('Login invalid', async ({ page }) => {
    await page.goto(wbeUrllogin);
    await page.screenshot({ path: './screenshots/Test1-loginf.png' });
    await page.waitForTimeout(3000);  
    await page.getByPlaceholder('Correo electrónico').fill('XXXXXXX@gmail.com');
    await page.screenshot({ path: './screenshots/Test1-login-usersetf.png' });
    await page.waitForTimeout(3000);  
    await page.getByPlaceholder('Contraseña').fill('123');
    await page.screenshot({ path: './screenshots/Test1-login-passwordsetf.png' });
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();
  
    await page.waitForTimeout(3000);  
    // Expect main page  
    await expect(await page.getByRole('navigation')).not.toBeVisible();
    await page.screenshot({ path: './screenshots/Test1-after-loginf.png' });
    await expect(await page.getByText('Usuario o contraseña incorrecto, intente de nuevo')).toBeVisible();
  });

// Test 1 sing off
test('Sign off', async ({ page }) => {
    await login(page); 
    await page.goto(wbeUrlAdminLayout);
    await page.waitForTimeout(3000); 
    await page.click('svg.fill-current.sm\\:block');
    await page.screenshot({ path: './screenshots/Test1-sign-off.png' });
    await page.waitForTimeout(3000);
    // button Sign off
    await page.getByRole('button').click('Cerrar sesión');
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/.login/);
    await expect(page.getByText('Inicia sesión con tu cuenta')).toBeVisible();


  });
