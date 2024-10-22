import { test, expect } from '@playwright/test';

const wbeUrllogin = "http://localhost:5173/auth/login"
const wbeUrlAdminLayout  = "http://localhost:5173/adminLayout"
const managementUser = "http://localhost:5173/users"

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
  async function userpage(page) {
    await login(page); 
    await page.goto(wbeUrlAdminLayout);
    await page.waitForTimeout(3000); 

    //Ir al apartado usuarios
    await page.getByRole('link', { name: /Usuarios/i }).click();
    await page.waitForTimeout(4000); 
    await page.screenshot({ path: './screenshots/page-user.png' });  
}

//Crear nuevo usuario
async function newuser(page) { 
    await login(page);
    await page.goto(managementUser);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo/i }).click();
    await page.screenshot({ path: './screenshots/userpart.png' });
    await page.waitForTimeout(3000);  
  
    // Completar el campo de Nombre
    await page.getByPlaceholder('Ingrese el nombre del usuario').fill('Jonnathan');
    await page.screenshot({ path: './screenshots/user-nombre.png' });
  
    // Completar el campo de Edad
    await page.getByPlaceholder('ingrese la edad del usuario').fill('23');
    await page.screenshot({ path: './screenshots/user-age.png' });
  
    // Completar el campo de Ciudad
    await page.getByPlaceholder('ingrese la ciudad del usuario').fill('Medellin');
    await page.screenshot({ path: './screenshots/user-city.png' });
  
    // Completar el campo de Correo Electronico
    await page.getByPlaceholder('Ingrese el correo del usuario').fill('Jg@gmail.com');
    await page.screenshot({ path: './screenshots/user-mail.png' });
  
    // Completar el campo de contraseña
    await page.getByPlaceholder('ingrese la contraseña').fill('123');
    await page.screenshot({ path: './screenshots/user-password.png' });
    //marcar si es admin o no
    await page.click('div.box');
    await page.screenshot({ path: './screenshots/admin-yes.png' });
  
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Registrar/i }).click();
    await page.screenshot({ path: './screenshots/user-new.png' });
  
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
  await page.screenshot({ path: './screenshots/edit-user.png' });

  //modificar Correo
  await page.getByPlaceholder('ingrese el correo').fill('jgarces@gmail.com');
  await page.screenshot({ path: './screenshots/edituser-mail.png' });
  //Modificar Contraseña
  await page.getByPlaceholder('ingrese la nueva contraseña').fill('8888');
  await page.screenshot({ path: './screenshots/edituser-password.png' });
  
  //Modificar si es admin o no
  await page.click('div.box');
  await page.screenshot({ path: './screenshots/edit-admin.png' });

  //Actualizar informacion Usuario
  await page.getByRole('button', { name: /Actualizar/i }).click();
  await page.screenshot({ path: './screenshots/user-Update.png' });
})

test('Delete user', async ({ page }) => {
  await login(page);
  await page.goto(managementUser);

  //Dar clik al boton eliminar
  await page.waitForTimeout(3000); 
  await page.click('button:nth-of-type(3)'); 
  await page.screenshot({ path: './screenshots/delete-user.png' });

  /*/Eliminar Usuario
  await page.getByRole('button', { name: /Si, estoy seguro/i }).click();
  await page.screenshot({ path: './screenshots/delete-userdefinitive.png' });*/
})

