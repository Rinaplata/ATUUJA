import { test, expect } from '@playwright/test';

const wbeUrllogin = "http://localhost:5173/auth/login"
const wbeUrlAdminLayout  = "http://localhost:5173/adminLayout"
const managementStory = "http://localhost:5173/story"

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
async function storypage(page) {
    await login(page); 
    await page.goto(wbeUrlAdminLayout);
    await page.waitForTimeout(3000); 

    //Ir al apartado relatos
    await page.getByRole('link', { name: /Gestión de relatos/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/Test3-page-story.png' });  
}

//Crear nuevo Relato
async function newstory(page) { 
    await login(page);
    await page.goto(managementStory);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo/i }).click();
    await page.screenshot({ path: './screenshots/Test3-storypart.png' });
    await page.waitForTimeout(3000);  
  
    // Completar el campo de ID
    await page.getByPlaceholder('Ingrese el ID del relato').fill('Jgl84');
    await page.screenshot({ path: './screenshots/Test3-story-ID.png' });
  
    // Completar el campo de titulo
    await page.getByPlaceholder('Ingrese el título del relato').fill('Tejedores de sueños');
    await page.screenshot({ path: './screenshots/Test3-story-title.png' });
  
    // Completar el campo de contenido
    await page.getByPlaceholder('Ingrese el contenido del relato').fill('Unos niños que tejen sus sueños con historias');
    await page.screenshot({ path: './screenshots/Test3-story-contend.png' });
  
    // Completar el campo de Correo palabras resaltadas
    await page.getByPlaceholder('Ingrese palabras resaltadas separadas por comas').fill('niños, tejer, sueños');
    await page.screenshot({ path: './screenshots/Test3-story-words.png' });
  
    // Completar el campo de url audio
    await page.getByPlaceholder('Ingrese la URL del audio').fill('https://soundcloud.com/yesspyro/spyro-boomtown-2024-promo-mix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing');
    await page.screenshot({ path: './screenshots/Test3-story-audio.png' });
    
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Registrar/i }).click();
    await page.screenshot({ path: './screenshots/Test3-story-new.png' });
  
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
  await page.screenshot({ path: './screenshots/Test3-edit-story.png' });

  // Editar el campo de titulo
  await page.getByPlaceholder('Ingrese el título del relato').fill('Tejedores de sueños');
  await page.screenshot({ path: './screenshots/Test3-edit-story-title.png' });

  // Editar el campo de contenido
  await page.getByPlaceholder('Ingrese el contenido del relato').fill('Unos niños que tejen sus sueños con historias');
  await page.screenshot({ path: './screenshots/Test3-edit-story-contend.png' });

  // Editar el campo de palabras resaltadas
  await page.getByPlaceholder('Ingrese palabras resaltadas separadas por comas').fill('niños, tejer, sueños');
  await page.screenshot({ path: './screenshots/Test3-edit-story-words.png' });

  // Editar el campo de url audio
  await page.getByPlaceholder('Ingrese la URL del audio').fill('https://soundcloud.com/yesspyro/spyro-boomtown-2024-promo-mix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing');
  await page.screenshot({ path: './screenshots/Test3-edit-story-audio.png' });

   // Editar el campo de url imagen
   await page.getByPlaceholder('Ingrese la URL de la imagen').fill('https://artesaniasdecolombia.com.co/Documentos/Contenido/37975_mes-madre-carmen-maria-gonzalez-artesanias-colombia-2021-g.jpg');
   await page.screenshot({ path: './screenshots/Test3-edit-story-image.png' });
  
 //Dar click en resgistrar
  await page.getByRole('button', { name: /Registrar/i }).click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './screenshots/Test3-edit-story-new.png' });
})

test('Delete story', async ({ page }) => {
  await login(page);
  await page.goto(managementStory);

  //Dar clik al boton eliminar
  await page.waitForTimeout(3000); 
  await page.click('button:nth-of-type(2)'); 
  await page.screenshot({ path: './screenshots/Test3-delete-story.png' });

  /*/Eliminar Historia
  await page.getByRole('button', { name: /Si, estoy seguro/i }).click();
  await page.screenshot({ path: './screenshots/delete-userdefinitive.png' });*/
})

test('new story fail', async ({ page }) => {
    await login(page);
    await page.goto(managementStory);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo/i }).click();
    await page.waitForTimeout(3000);  
  
    // Completar el campo de ID
    await page.getByPlaceholder('Ingrese el ID del relato').fill('Jgl84');
    
  
    // Completar el campo de titulo
    await page.getByPlaceholder('Ingrese el título del relato').fill('');
    
  
    // Completar el campo de contenido
    await page.getByPlaceholder('Ingrese el contenido del relato').fill('Unos niños que tejen sus sueños con historias');
    
  
    // Completar el campo de Correo palabras resaltadas
    await page.getByPlaceholder('Ingrese palabras resaltadas separadas por comas').fill('niños, tejer, sueños');
    
  
    // Completar el campo de url audio
    await page.getByPlaceholder('Ingrese la URL del audio').fill('https://soundcloud.com/yesspyro/spyro-boomtown-2024-promo-mix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing');
    
    
   //Dar click en resgistrar
    await page.getByRole('button', { name: /Registrar/i }).click();
    await page.screenshot({ path: './screenshots/Test3-story-newf.png' });
})

test('Edit story fail', async ({ page }) => {
  await login(page);
  await page.goto(managementStory);
  await page.waitForTimeout(3000);

  //Dar clik al boton editar 
  await page.click('svg.h-5.w-5'); 
  

  // Editar el campo de titulo
  await page.getByPlaceholder('Ingrese el título del relato').fill('');
  

  // Editar el campo de contenido
  await page.getByPlaceholder('Ingrese el contenido del relato').fill('Unos niños que tejen sus sueños con historias');
  

  // Editar el campo de palabras resaltadas
  await page.getByPlaceholder('Ingrese palabras resaltadas separadas por comas').fill('niños, tejer, sueños');
  

  // Editar el campo de url audio
  await page.getByPlaceholder('Ingrese la URL del audio').fill('https://soundcloud.com/yesspyro/spyro-boomtown-2024-promo-mix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing');
  

   // Editar el campo de url imagen
   await page.getByPlaceholder('Ingrese la URL de la imagen').fill('https://artesaniasdecolombia.com.co/Documentos/Contenido/37975_mes-madre-carmen-maria-gonzalez-artesanias-colombia-2021-g.jpg');
   
  
 //Dar click en resgistrar
  await page.getByRole('button', { name: /Registrar/i }).click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './screenshots/Test3-edit-story-newf.png' });
})
