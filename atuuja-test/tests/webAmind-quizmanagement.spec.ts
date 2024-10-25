import { test, expect } from '@playwright/test';

const wbeUrllogin = "http://localhost:5173/auth/login"
const wbeUrlAdminLayout  = "http://localhost:5173/adminLayout"
const managementQuiz = "http://localhost:5173/quiz"

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
  async function quizpage(page) {
    await login(page); 
    await page.goto(wbeUrlAdminLayout);
    await page.waitForTimeout(3000); 

    //Ir al apartado Quizes
    await page.getByRole('link', { name: /Quizes/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/Test4-page-quizes.png' });  
}

//Crear nuevo Quiz
async function newquiz(page) { 
    await login(page);
    await page.goto(managementQuiz);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo Quiz/i }).click();
    await page.screenshot({ path: './screenshots/Test4-quiz-part.png' });
    await page.waitForTimeout(3000);  
  
    // Seleccionar el relato para el quiz
    await page.selectOption('#relato-select', { index: 1 });
    await page.screenshot({ path: './screenshots/Test4-select-story-quiz.png' });
  
    // Seleccionar estado del relato
    await page.selectOption('#estado-select', '0');
    await page.screenshot({ path: './screenshots/Test4-select-status-quiz.png' });
  
    //Dar click en agregar nueva pregunta
    await page.getByRole('button', { name: /Agregar Pregunta/i }).click();
    await page.screenshot({ path: './screenshots/Test4-Add-quiz-select.png' });
  
    //llenar la informacion de la nueva pregunta
    await page.selectOption('#tipo-pregunta-select', 'Texto'); // Seleccionar el tipo de pregunta
    await page.screenshot({ path: './screenshots/Test4-select-type-quiz.png' });

    // llenar el campo agregar orden
    await page.getByPlaceholder('Agregar orden').fill('1');
    await page.screenshot({ path: './screenshots/Test4-quiz-add-order.png' }); 

    // llenar el campo agregar enunciado
    await page.getByPlaceholder('Enunciado de la pregunta').fill('Como se le dice a las abejas en wayuu');
    await page.screenshot({ path: './screenshots/Test4-quiz-add-statement.png' }); 

    // llenar el campo agregar link de imagen o audio
    await page.getByPlaceholder('Link...').fill('https://img.freepik.com/vector-gratis/abeja-insecto-volando_24908-82216.jpg?semt=ais_hybrid');
    await page.screenshot({ path: './screenshots/Test4-quiz-add-link.png' }); 

    // llenar el campo agregar pista
    await page.getByPlaceholder('Pista').fill('comienza con...');
    await page.screenshot({ path: './screenshots/Test4-quiz-add-clue.png' }); 

    // llenar el campo agregar puntos
    await page.getByPlaceholder('Puntos por respuesta correcta').fill('200');
    await page.screenshot({ path: './screenshots/Test4-quiz-add-points.png' }); 

    // llenar el campo agregar respuesta 1
    await page.getByPlaceholder('Respuesta 1').fill('abeja');
    await page.screenshot({ path: './screenshots/Test4-quiz-add-answer.png' }); 

    // llenar el campo agregar respuesta 2
    await page.getByPlaceholder('Respuesta 2').fill('abeja2');
    await page.screenshot({ path: './screenshots/Test4-quiz-add-answer2.png' }); 

    // llenar el campo agregar respuesta 3
    await page.getByPlaceholder('Respuesta 3').fill('abeja3');
    await page.screenshot({ path: './screenshots/Test4-quiz-add-answer3.png' }); 

    // llenar el campo agregar respuesta 4
    await page.getByPlaceholder('Respuesta 4').fill('abeja4');
    await page.screenshot({ path: './screenshots/Test4-quiz-add-answer4.png' }); 

    //Seleccionar respuesta correcta
    await page.click('input[name="respuesta-correcta-0"]');
    await page.screenshot({ path: './screenshots/Test4-quiz-correct-answer.png' });

    //Dar click a Registrar cuestionario
    await page.getByRole('button', { name: /Registrar Cuestionario/i }).click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: './screenshots/Test4-quiz-new-create.png' });
  }

test('Quiz page', async ({ page }) => {
    await quizpage(page);
})

test('New quiz', async ({ page }) => {
  await newquiz(page);
})

test('Edit quiz', async ({ page }) => {
  await login(page);
  await page.goto(managementQuiz);

  // Dar click en el botón editar
  await page.waitForSelector('button:nth-of-type(2)', { state: 'visible' });
  await page.click('button:nth-of-type(2)'); 
  await page.screenshot({ path: './screenshots/Test4-edit-quiz.png' });

  // Seleccionar el relato para el quiz
  await page.selectOption('#relato-select', { index: 1 });
  await page.screenshot({ path: './screenshots/Test4-edit-story-quiz.png' });

  // Seleccionar estado del relato
  await page.selectOption('#estado-select', '1');
  await page.screenshot({ path: './screenshots/Test4-edit-status-quiz.png' });

  // Llenar el campo enunciado 
  await page.fill('input[value="Esto es una prueba urgente de puntos "]', 'prueba')
  await page.screenshot({ path: './screenshots/Test4-edit-quiz-statement.png' }); 

  //Seleccionar el tipo de pregunta 
  await page.selectOption('select:below(label:text("Tipo de pregunta"))', '2');
  await page.screenshot({ path: './screenshots/Test4-edit-select-type-quiz.png' });
 
  // Llenar el campo puntos pregunta 1
  await page.fill('input[type="number"]:nth-of-type(1)', '300');
  await page.screenshot({ path: './screenshots/Test4-edit-quiz-points.png' }); 

  // Llenar el campo agregar respuesta 1 
  await page.fill('input[type="text"][value="no"]', 'si');
  await page.screenshot({ path: './screenshots/Test4-edit-quiz-answer.png' }); 

  // Llenar el campo agregar respuesta 2 
  await page.fill('input[type="text"][value="si"]', 'no');
  await page.screenshot({ path: './screenshots/Test4-edit-quiz-answer2.png' }); 

  // Llenar el campo agregar respuesta 3 
  await page.fill('input[type="text"][value="si"]', 'si');
  await page.screenshot({ path: './screenshots/Test4-edit-quiz-answer3.png' }); 

  // Llenar el campo agregar respuesta 4
  await page.fill('input[type="text"][value="no"]', 'si');
  await page.screenshot({ path: './screenshots/Test4-edit-quiz-answer4.png' }); 

  // Seleccionar respuesta correcta 
  await page.check('div.mt-2.border.p-2:nth-of-type(2) input.form-checkbox');
  await page.screenshot({ path: './screenshots/Test4-edit-quiz-correct-answer.png' });

  // Dar click en "Registrar Cuestionario"
  await page.click('button:text("Guardar Cambios")');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './screenshots/Test4-quiz-new-create.png' });
});

test('Delete quiz', async ({ page }) => {
  await login(page);
  await page.goto(managementQuiz);

  //Dar clik al boton eliminar
  await page.waitForTimeout(3000); 
  await page.click('svg.h-5.w-5'); 
  await page.screenshot({ path: './screenshots/Test4-delete-quiz.png' });

  /*/Eliminar Usuario
  await page.getByRole('button', { name: /Si, estoy seguro/i }).click();
  await page.screenshot({ path: './screenshots/delete-quiz-definitily.png' });*/
})

test('new quiz fail', async ({ page }) => {
  await login(page);
  await page.goto(managementQuiz);
  await page.waitForTimeout(3000); 
  await page.getByRole('button', { name: /Nuevo Quiz/i }).click();
  await page.waitForTimeout(3000);  

  // Seleccionar el relato para el quiz
  await page.selectOption('#relato-select', { index: 1 });
  
  // Seleccionar estado del relato
  await page.selectOption('#estado-select', '0');
  
  //Dar click en agregar nueva pregunta
  await page.getByRole('button', { name: /Agregar Pregunta/i }).click();
  
  //llenar la informacion de la nueva pregunta
  await page.selectOption('#tipo-pregunta-select', 'Texto'); // Seleccionar el tipo de pregunta

  // llenar el campo agregar orden
  await page.getByPlaceholder('Agregar orden').fill('1');
   
  // llenar el campo agregar enunciado
  await page.getByPlaceholder('Enunciado de la pregunta').fill('');
   
  // llenar el campo agregar link de imagen o audio
  await page.getByPlaceholder('Link...').fill('https://img.freepik.com/vector-gratis/abeja-insecto-volando_24908-82216.jpg?semt=ais_hybrid');
   
  // llenar el campo agregar pista
  await page.getByPlaceholder('Pista').fill('comienza con...');
   
  // llenar el campo agregar puntos
  await page.getByPlaceholder('Puntos por respuesta correcta').fill('200');
   
  // llenar el campo agregar respuesta 1
  await page.getByPlaceholder('Respuesta 1').fill('abeja');
   
  // llenar el campo agregar respuesta 2
  await page.getByPlaceholder('Respuesta 2').fill('abeja2');
   
  // llenar el campo agregar respuesta 3
  await page.getByPlaceholder('Respuesta 3').fill('abeja3');
  
  // llenar el campo agregar respuesta 4
  await page.getByPlaceholder('Respuesta 4').fill('abeja 4');
  
  //Seleccionar respuesta correcta
  await page.click('input[name="respuesta-correcta-0"]');
  
  //Dar click a Registrar cuestionario
  await page.getByRole('button', { name: /Registrar Cuestionario/i }).click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './screenshots/Test4-quiz-new-createf.png' });
})

test('edit quiz fail', async ({ page }) => {
  await login(page);
  await page.goto(managementQuiz);

  // Dar click en el botón editar
  await page.waitForSelector('button:nth-of-type(2)', { state: 'visible' });
  await page.click('button:nth-of-type(2)'); 

  // Seleccionar el relato para el quiz
  await page.selectOption('#relato-select', { index: 1 });
  
  // Seleccionar estado del relato
  await page.selectOption('#estado-select', '1');
  
  // Llenar el campo enunciado 
  await page.fill('input[value="Esto es una prueba urgente de puntos "]', 'prueba')
  

  //Seleccionar el tipo de pregunta 
  await page.selectOption('select:below(label:text("Tipo de pregunta"))', '2');
  
 
  // Llenar el campo puntos pregunta 1
  await page.fill('input[type="number"]:nth-of-type(1)', '');
   

  // Llenar el campo agregar respuesta 1 
  await page.fill('input[type="text"][value="no"]', 'si');
   

  // Llenar el campo agregar respuesta 2 
  await page.fill('input[type="text"][value="si"]', 'no');
  

  // Llenar el campo agregar respuesta 3 
  await page.fill('input[type="text"][value="si"]', 'si');
   

  // Llenar el campo agregar respuesta 4
  await page.fill('input[type="text"][value="no"]', 'si');
   

  // Seleccionar respuesta correcta 
  await page.check('div.mt-2.border.p-2:nth-of-type(2) input.form-checkbox');
  

  // Dar click en "Registrar Cuestionario"
  await page.click('button:text("Guardar Cambios")');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './screenshots/Test4-quiz-new-create.png' });
})