import { test, expect } from '@playwright/test';
import path from 'path';

const wbeUrllogin = "http://localhost:5173/auth/login"
const wbeUrlAdminLayout  = "http://localhost:5173/adminLayout"
const managementRedward = "http://localhost:5173/reward"

async function login(page) {
    await page.goto(wbeUrllogin);
    await page.screenshot({ path: './screenshots/login.png' });
    
    // Completar el campo de correo electrónico
    await page.getByPlaceholder('Correo electrónico').fill('rn@gmail.com');
    await page.screenshot({ path: './screenshots/login-userset.png' });
  
    // Completar el campo de contraseña
    await page.getByPlaceholder('Contraseña').fill('123');
    await page.screenshot({ path: './screenshots/login-passwordset.png' });
  
    // Hacer clic en el botón de iniciar sesión
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();
  
    // Esperar a que la navegación ocurra y validar que la página principal se cargue
    await expect(page.getByRole('navigation')).toBeVisible();
    await page.screenshot({ path: './screenshots/after-login.png' });
    await expect(page.getByAltText('Logo')).toBeVisible();
  }

  //Desplazamiento por el menu.
  async function rewardpage(page) {
    await login(page); 
    await page.goto(wbeUrlAdminLayout);
    await page.waitForTimeout(3000); 

    //Ir al apartado Quizes
    await page.getByRole('link', { name: /Recompensas/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/page-rewards.png' });  
}

//Crear nueva recompensa
async function newredward(page) { 
    await login(page);
    await page.goto(managementRedward);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/new-redward-part.png' });
     
  
    // completar el campo nombre
    await page.getByPlaceholder('Ingrese el nombre').fill('hamacas');
    await page.screenshot({ path: './screenshots/reward-name.png' });
  
    // Completar el campo de descripcion
    await page.getByPlaceholder('Ingrese la descripción del premio').fill('23');
    await page.screenshot({ path: './screenshots/reward-description.png' });

    //Completar el campo puntos
    await page.getByPlaceholder('Ingrese los puntos').fill('300');
    await page.screenshot({ path: './screenshots/reward-points.png' });
  
    //Completar el campo url imagen
    await page.getByPlaceholder('Ingrese la URL de la imagen').fill('https://encantos.com.co/cdn/shop/products/arcoiris-04.png?v=1631226155&width=713');
    await page.screenshot({ path: './screenshots/reward-imageurl.png' });
  
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Registrar/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/redward-new.png' });
  
  }

test('Quiz page', async ({ page }) => {
    await rewardpage(page);
})

test('New redward', async ({ page }) => {
    await newredward(page);
})

test('Edit reward', async ({ page }) => {
    await login(page);
    await page.goto(managementRedward);
    await page.waitForTimeout(3000); 

    //Dar clik al boton editar 
    await page.click('svg.h-5.w-5'); 
    await page.screenshot({ path: './screenshots/edit-reward.png' });
     
  
    // completar el campo nombre
    await page.getByPlaceholder('Ingrese el nombre').fill('hamacas');
    await page.screenshot({ path: './screenshots/edit-reward-name.png' });
  
    // Completar el campo de descripcion
    await page.getByPlaceholder('Ingrese descripción').fill('fino hilo tejido por los wayuu');
    await page.screenshot({ path: './screenshots/edit-reward-description.png' });

    //Completar el campo puntos
    await page.getByPlaceholder('Ingrese los puntos').fill('300');
    await page.screenshot({ path: './screenshots/edit-reward-points.png' });
  
    //Completar el campo url imagen
    await page.getByPlaceholder('Ingrese la URL de la imagen').fill('https://encantos.com.co/cdn/shop/products/arcoiris-04.png?v=1631226155&width=713');
    await page.screenshot({ path: './screenshots/edit-reward-imageurl.png' });
  
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Actualizar/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/editredward-new.png' });
    
})

test('Delete redward', async ({ page }) => {
    await login(page);
    await page.goto(managementRedward);
  
    //Dar clik al boton eliminar
    await page.waitForTimeout(3000); 
    await page.click('button:nth-of-type(2)'); 
    await page.screenshot({ path: './screenshots/delete-redward.png' });
  
    /*/Eliminar Historia
    await page.getByRole('button', { name: /Si, estoy seguro/i }).click();
    await page.screenshot({ path: './screenshots/delete-userdefinitive.png' });*/
  })