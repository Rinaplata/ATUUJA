import { test, expect } from '@playwright/test';

const wbeUrllogin = "http://localhost:5173/auth/login"
const wbeUrlAdminLayout  = "http://localhost:5173/adminLayout"
const managementStory = "http://localhost:5173/story"

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
async function storypage(page) {
    await login(page); 
    await page.goto(wbeUrlAdminLayout);
    await page.waitForTimeout(3000); 

    //Ir al apartado relatos
    await page.getByRole('link', { name: /Gestión de relatos/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/page-story.png' });  
}

//Crear nuevo Relato
async function newstory(page) { 
    await login(page);
    await page.goto(managementStory);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo/i }).click();
    await page.screenshot({ path: './screenshots/storypart.png' });
    await page.waitForTimeout(3000);  
  
    // Completar el campo de ID
    await page.getByPlaceholder('Ingrese el ID del relato').fill('Jgl84');
    await page.screenshot({ path: './screenshots/story-ID.png' });
  
    // Completar el campo de titulo
    await page.getByPlaceholder('Ingrese el título del relato').fill('Tejedores de sueños');
    await page.screenshot({ path: './screenshots/story-title.png' });
  
    // Completar el campo de contenido
    await page.getByPlaceholder('Ingrese el contenido del relato').fill('Unos niños que tejen sus sueños con historias');
    await page.screenshot({ path: './screenshots/story-contend.png' });
  
    // Completar el campo de Correo palabras resaltadas
    await page.getByPlaceholder('Ingrese palabras resaltadas separadas por comas').fill('niños, tejer, sueños');
    await page.screenshot({ path: './screenshots/story-words.png' });
  
    // Completar el campo de url audio
    await page.getByPlaceholder('Ingrese la URL del audio').fill('https://soundcloud.com/yesspyro/spyro-boomtown-2024-promo-mix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing');
    await page.screenshot({ path: './screenshots/story-audio.png' });
    
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Registrar/i }).click();
    await page.screenshot({ path: './screenshots/story-new.png' });
  
  }

test('Storypage', async ({ page }) => {
    await storypage(page);
})

test('New story', async ({ page }) => {
    await newstory(page);
})

test('Edit story', async ({ page }) => {
  await login(page);
  await page.goto(managementStory);
  await page.waitForTimeout(3000);

  //Dar clik al boton editar 
  await page.click('svg.h-5.w-5'); 
  await page.screenshot({ path: './screenshots/edit-story.png' });

  // Completar el campo de titulo
  await page.getByPlaceholder('Ingrese el título del relato').fill('Tejedores de sueños');
  await page.screenshot({ path: './screenshots/editstory-title.png' });

  // Completar el campo de contenido
  await page.getByPlaceholder('Ingrese el contenido del relato').fill('Unos niños que tejen sus sueños con historias');
  await page.screenshot({ path: './screenshots/editstory-contend.png' });

  // Completar el campo de Correo palabras resaltadas
  await page.getByPlaceholder('Ingrese palabras resaltadas separadas por comas').fill('niños, tejer, sueños');
  await page.screenshot({ path: './screenshots/editstory-words.png' });

  // Completar el campo de url audio
  await page.getByPlaceholder('Ingrese la URL del audio').fill('https://soundcloud.com/yesspyro/spyro-boomtown-2024-promo-mix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing');
  await page.screenshot({ path: './screenshots/editstory-audio.png' });
  
 //Dar click en resgistrar
  await page.getByRole('button', { name: /Registrar/i }).click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './screenshots/editstory-new.png' });
})

test('Delete story', async ({ page }) => {
  await login(page);
  await page.goto(managementStory);

  //Dar clik al boton eliminar
  await page.waitForTimeout(3000); 
  await page.click('button:nth-of-type(2)'); 
  await page.screenshot({ path: './screenshots/delete-story.png' });

  /*/Eliminar Historia
  await page.getByRole('button', { name: /Si, estoy seguro/i }).click();
  await page.screenshot({ path: './screenshots/delete-userdefinitive.png' });*/
})