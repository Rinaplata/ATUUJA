import { test, expect } from '@playwright/test';

const wbeUrllogin = "http://localhost:5173/auth/login"
const wbeUrlAdminLayout  = "http://localhost:5173/adminLayout"
const managementRedward = "http://localhost:5173/reward"

async function login(page) {
    await page.goto(wbeUrllogin);
    
    // Completar el campo de correo electrónico
    await page.getByPlaceholder('Correo electrónico').fill('rn@gmail.com');
  
    // Completar el campo de contraseña
    await page.getByPlaceholder('Contraseña').fill('123');
  
    // Hacer clic en el botón de iniciar sesión
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();
  
    // Esperar a que la navegación ocurra y validar que la página principal se cargue
    await expect(page.getByRole('navigation')).toBeVisible();
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
    await page.screenshot({ path: './screenshots/Test5-page-rewards.png' });  
}

//Crear nueva recompensa
async function newredward(page) { 
    await login(page);
    await page.goto(managementRedward);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/Test5-new-redward-part.png' });
     
  
    // completar el campo nombre
    await page.getByPlaceholder('Ingrese el nombre').fill('hamacas');
    await page.screenshot({ path: './screenshots/Test5-reward-name.png' });
  
    // Completar el campo de descripcion
    await page.getByPlaceholder('Ingrese la descripción del premio').fill('23');
    await page.screenshot({ path: './screenshots/Test5-reward-description.png' });

    //Completar el campo puntos
    await page.getByPlaceholder('Ingrese los puntos').fill('300');
    await page.screenshot({ path: './screenshots/Test5-reward-points.png' });
  
    //Completar el campo url imagen
    await page.getByPlaceholder('Ingrese la URL de la imagen').fill('https://encantos.com.co/cdn/shop/products/arcoiris-04.png?v=1631226155&width=713');
    await page.screenshot({ path: './screenshots/Test5-reward-imageurl.png' });
  
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Registrar/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/Test5-redward-new.png' });
  
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
    await page.screenshot({ path: './screenshots/Test5-edit-reward.png' });
     
  
    // completar el campo nombre
    await page.getByPlaceholder('Ingrese el nombre').fill('hamacas');
    await page.screenshot({ path: './screenshots/Test5-edit-reward-name.png' });
  
    // Completar el campo de descripcion
    await page.getByPlaceholder('Ingrese descripción').fill('fino hilo tejido por los wayuu');
    await page.screenshot({ path: './screenshots/Test5-edit-reward-description.png' });

    //Completar el campo puntos
    await page.getByPlaceholder('Ingrese los puntos').fill('300');
    await page.screenshot({ path: './screenshots/Test5-edit-reward-points.png' });
  
    //Completar el campo url imagen
    await page.getByPlaceholder('Ingrese la URL de la imagen').fill('https://encantos.com.co/cdn/shop/products/arcoiris-04.png?v=1631226155&width=713');
    await page.screenshot({ path: './screenshots/Test5-edit-reward-imageurl.png' });
  
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Actualizar/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/Test5-editredward-new.png' });
    
})

test('Delete redward', async ({ page }) => {
    await login(page);
    await page.goto(managementRedward);
  
    //Dar clik al boton eliminar
    await page.waitForTimeout(3000); 
    await page.click('button:nth-of-type(2)'); 
    await page.screenshot({ path: './screenshots/Test5-delete-redward.png' });
  
    /*/Eliminar Historia
    await page.getByRole('button', { name: /Si, estoy seguro/i }).click();
    await page.screenshot({ path: './screenshots/delete-userdefinitive.png' });*/
  })

  test('new reward fail', async ({ page }) => {
    await login(page);
    await page.goto(managementRedward);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo/i }).click();
    await page.waitForTimeout(3000); 
    
     
  
    // completar el campo nombre
    await page.getByPlaceholder('Ingrese el nombre').fill('');
    
  
    // Completar el campo de descripcion
    await page.getByPlaceholder('Ingrese la descripción del premio').fill('hola');
    

    //Completar el campo puntos
    await page.getByPlaceholder('Ingrese los puntos').fill('300');
    
  
    //Completar el campo url imagen
    await page.getByPlaceholder('Ingrese la URL de la imagen').fill('https://encantos.com.co/cdn/shop/products/arcoiris-04.png?v=1631226155&width=713');
    
  
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Registrar/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/Test5-redward-newf.png' });
    
  })

  test('edit redward fail', async ({ page }) => {
    await login(page);
    await page.goto(managementRedward);
    await page.waitForTimeout(3000); 

    //Dar clik al boton editar 
    await page.click('svg.h-5.w-5'); 
    
     
  
    // completar el campo nombre
    await page.getByPlaceholder('Ingrese el nombre').fill('');
    
  
    // Completar el campo de descripcion
    await page.getByPlaceholder('Ingrese descripción').fill('fino hilo tejido por los wayuu');
    

    //Completar el campo puntos
    await page.getByPlaceholder('Ingrese los puntos').fill('300');
    
  
    //Completar el campo url imagen
    await page.getByPlaceholder('Ingrese la URL de la imagen').fill('https://encantos.com.co/cdn/shop/products/arcoiris-04.png?v=1631226155&width=713');
    
  
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Actualizar/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/Test5-editredward-newf.png' });
  })