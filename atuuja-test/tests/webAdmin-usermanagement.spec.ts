import { test, expect } from '@playwright/test';

const wbeUrllogin = "http://localhost:5173/auth/login"
const wbeUrlAdminLayout  = "http://localhost:5173/adminLayout"
const managementUser = "http://localhost:5173/users"

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
  async function userpage(page) {
    await login(page); 
    await page.goto(wbeUrlAdminLayout);
    await page.waitForTimeout(3000); 

    //Ir al apartado usuarios
    await page.getByRole('link', { name: /Usuarios/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/Test2-page-user.png' });  
}

//Crear nuevo usuario
async function newuser(page) { 
    await login(page);
    await page.goto(managementUser);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo/i }).click();
    await page.screenshot({ path: './screenshots/Test2-user-part.png' });
    await page.waitForTimeout(3000);  
  
    // Completar el campo de Nombre
    await page.getByPlaceholder('Ingrese el nombre del usuario').fill('PruebaJonnathan');
    await page.screenshot({ path: './screenshots/Test2-user-nombre.png' });

    // Completar el campo de Correo Electronico
    await page.getByPlaceholder('Ingrese el correo del usuario').fill('Pruebajg@gmail.com');
    await page.screenshot({ path: './screenshots/Test2-user-mail.png' });

    // Completar el campo de Edad
    await page.getByPlaceholder('ingrese la edad del usuario').fill('23');
    await page.screenshot({ path: './screenshots/Test2-user-age.png' });

    // Completar el campo de contraseña
    await page.getByPlaceholder('ingrese la contraseña').fill('123');
    await page.screenshot({ path: './screenshots/Test2-user-password.png' });

    // Completar el campo tipo de documento
    await page.selectOption('select.border', '0');
    await page.screenshot({ path: './screenshots/Test2-user-type-document.png' });

    // Completar el campo de documento
    await page.getByPlaceholder('Ingrese el número de documento').fill('1193542714');
    await page.screenshot({ path: './screenshots/Test2-user-document.png' });
  
    // Completar el campo de Ciudad
    await page.getByPlaceholder('ingrese la ciudad del usuario').fill('Medellin');
    await page.screenshot({ path: './screenshots/Test2-user-city.png' });
    
    //marcar si es admin o no
    await page.click('div.box');
    await page.screenshot({ path: './screenshots/Test2-admin-yes.png' });
  
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Registrar/i }).click();
    await page.screenshot({ path: './screenshots/Test2-user-new.png' });
  
  }

test('User page', async ({ page }) => {
    await userpage(page);
})


test('New user', async ({ page }) => {
  await newuser(page);
})

test('Edit user', async ({ page }) => {
  await login(page);
  await page.goto(managementUser);  
  //Dar clik al boton editar
  await page.waitForTimeout(3000); 
  await page.click('svg.h-5.w-5'); 
  await page.screenshot({ path: './screenshots/Test2-edit-user.png' });

  /*/modificar Correo
  await page.getByPlaceholder('Ingrese el correo').fill('Pruebajg@gmail.com');
  await page.screenshot({ path: './screenshots/Test2-edit-user-email.png' });

  // Modificar el campo de Edad
  await page.getByPlaceholder('ingrese la edad del usuario').fill('23');
  await page.screenshot({ path: './screenshots/Test2-edit-user-age.png' });*/

  //Modificar Contraseña
  await page.getByPlaceholder('ingrese la nueva contraseña').fill('8888');
  await page.screenshot({ path: './screenshots/Test2-edit-user-password.png' });

   // Modificar el campo tipo de documento
   await page.selectOption('select.border', '1');
   await page.screenshot({ path: './screenshots/Test2-edit-user-type-document.png' });

   // Modificar el campo de documento
   await page.getByPlaceholder('Ingrese el número de documento').fill('1193542714');
   await page.screenshot({ path: './screenshots/Test2-edit-user-document.png' });

   // Modificar el campo de Ciudad
   await page.getByPlaceholder('ingrese la ciudad del usuario').fill('Medellin');
   await page.screenshot({ path: './screenshots/Test2-edit-user-city.png' });
  
  //Modificar si es admin o no
  await page.click('div.box');
  await page.screenshot({ path: './screenshots/Test2-edit-admin.png' });

  //Actualizar informacion Usuario
  await page.getByRole('button', { name: /Actualizar/i }).click();
  await page.screenshot({ path: './screenshots/Test2-user-Update.png' });
})

test('Delete user', async ({ page }) => {
  await login(page);
  await page.goto(managementUser);

  //Dar clik al boton eliminar
  await page.waitForTimeout(3000); 
  await page.click('button:nth-of-type(3)'); 
  await page.screenshot({ path: './screenshots/Test2-delete-user.png' });

  /*/Eliminar Usuario
  await page.getByRole('button', { name: /Si, estoy seguro/i }).click();
  await page.screenshot({ path: './screenshots/Test2-delete-userdefinitive.png' });*/
})

test('new user fail', async ({ page }) => {
  await login(page);
    await page.goto(managementUser);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo/i }).click();
    await page.waitForTimeout(3000);  
  
    // Completar el campo de Nombre
    await page.getByPlaceholder('Ingrese el nombre del usuario').fill('PruebaJonnathan');
    
    // Completar el campo de Correo Electronico
    await page.getByPlaceholder('Ingrese el correo del usuario').fill('Pruebajg@gmail.com');
    
    // Completar el campo de Edad
    await page.getByPlaceholder('ingrese la edad del usuario').fill('23');
    
    // Completar el campo de contraseña
    await page.getByPlaceholder('ingrese la contraseña').fill('123');
    
    // Completar el campo tipo de documento
    await page.selectOption('select.border', '0');
   
    // Completar el campo de documento
    await page.getByPlaceholder('Ingrese el número de documento').fill('1193542714');
    
    // Completar el campo de Ciudad
    await page.getByPlaceholder('ingrese la ciudad del usuario').fill('Medellin');
    
    //marcar si es admin o no
    await page.click('div.box');
    
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Registrar/i }).click();
    await page.screenshot({ path: './screenshots/Test2-user-new.png' });
})

test('edit user fail', async ({ page }) => {
  await login(page);
  await page.goto(managementUser);  
  //Dar clik al boton editar
  await page.waitForTimeout(3000); 
  await page.click('svg.h-5.w-5'); 

  /*/modificar Correo
  await page.getByPlaceholder('Ingrese el correo').fill('Pruebajg@gmail.com');
  await page.screenshot({ path: './screenshots/Test2-edit-user-emailf.png' });

  // Modificar el campo de Edad
  await page.getByPlaceholder('ingrese la edad del usuario').fill('23');
  await page.screenshot({ path: './screenshots/Test2-edit-user-age.png' });*/

  //Modificar Contraseña
  await page.getByPlaceholder('ingrese la nueva contraseña').fill('');

   // Modificar el campo tipo de documento
   await page.selectOption('select.border', '1');

   // Modificar el campo de documento
   await page.getByPlaceholder('Ingrese el número de documento').fill('1193542714');

   // Modificar el campo de Ciudad
   await page.getByPlaceholder('ingrese la ciudad del usuario').fill('Medellin');
   
  //Modificar si es admin o no
  await page.click('div.box');
  

  //Actualizar informacion Usuario
  await page.getByRole('button', { name: /Actualizar/i }).click();
  await page.screenshot({ path: './screenshots/Test2-user-Updatef.png' });
})