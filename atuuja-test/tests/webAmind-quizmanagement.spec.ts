import { test, expect } from '@playwright/test';

const wbeUrllogin = "http://localhost:5173/auth/login"
const wbeUrlAdminLayout  = "http://localhost:5173/adminLayout"
const managementQuiz = "http://localhost:5173/quiz"

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
  async function quizpage(page) {
    await login(page); 
    await page.goto(wbeUrlAdminLayout);
    await page.waitForTimeout(3000); 

    //Ir al apartado Quizes
    await page.getByRole('link', { name: /Quizes/i }).click();
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './screenshots/page-quizes.png' });  
}

//Crear nuevo Quiz
async function newquiz(page) { 
    await login(page);
    await page.goto(managementQuiz);
    await page.waitForTimeout(3000); 
    await page.getByRole('button', { name: /Nuevo Quiz/i }).click();
    await page.screenshot({ path: './screenshots/quiz-part.png' });
    await page.waitForTimeout(3000);  
  
    // Seleccionar el relato para el quiz
    await page.selectOption('#relato-select', { index: 1 });
    await page.screenshot({ path: './screenshots/select-story-quiz.png' });
  
    // Seleccionar estado del relato
    await page.selectOption('#estado-select', '0');
    await page.screenshot({ path: './screenshots/select-status-quiz.png' });
  
    //Dar click en agregar nueva pregunta
    await page.getByRole('button', { name: /Agregar Pregunta/i }).click();
    await page.screenshot({ path: './screenshots/Add-quiz-select.png' });
  
    //llenar la informacion de la nueva pregunta

    // Seleccionar el tipo de pregunta
    await page.selectOption('#tipo-pregunta-select', 'Texto');
    await page.screenshot({ path: './screenshots/select-type-quiz.png' });

    // llenar el campo agregar orden
    await page.getByPlaceholder('Agregar orden').fill('1');
    await page.screenshot({ path: './screenshots/quiz-add-order.png' }); 

    // llenar el campo agregar enunciado
    await page.getByPlaceholder('Enunciado de la pregunta').fill('Como se le dice a las abejas en wayuu');
    await page.screenshot({ path: './screenshots/quiz-add-statement.png' }); 

    // llenar el campo agregar link de imagen o audio
    await page.getByPlaceholder('Link...').fill('https://img.freepik.com/vector-gratis/abeja-insecto-volando_24908-82216.jpg?semt=ais_hybrid');
    await page.screenshot({ path: './screenshots/quiz-add-link.png' }); 

    // llenar el campo agregar pista
    await page.getByPlaceholder('Pista').fill('comienza con...');
    await page.screenshot({ path: './screenshots/quiz-add-clue.png' }); 

    // llenar el campo agregar puntos
    await page.getByPlaceholder('Puntos por respuesta correcta').fill('200');
    await page.screenshot({ path: './screenshots/quiz-add-points.png' }); 

    // llenar el campo agregar respuesta 1
    await page.getByPlaceholder('Respuesta 1').fill('abeja');
    await page.screenshot({ path: './screenshots/quiz-add-answer.png' }); 

    // llenar el campo agregar respuesta 2
    await page.getByPlaceholder('Respuesta 2').fill('abeja2');
    await page.screenshot({ path: './screenshots/quiz-add-answer2.png' }); 

    // llenar el campo agregar respuesta 3
    await page.getByPlaceholder('Respuesta 3').fill('abeja3');
    await page.screenshot({ path: './screenshots/quiz-add-answer3.png' }); 

    // llenar el campo agregar respuesta 4
    await page.getByPlaceholder('Respuesta 4').fill('abeja4');
    await page.screenshot({ path: './screenshots/quiz-add-answer4.png' }); 

    //Seleccionar respuesta correcta
    await page.click('input[name="respuesta-correcta-0"]');
    await page.screenshot({ path: './screenshots/quiz-correct-answer.png' });

    //Dar click a Registrar cuestionario
    await page.getByRole('button', { name: /Registrar Cuestionario/i }).click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: './screenshots/quiz-new-create.png' });
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
  await page.screenshot({ path: './screenshots/edit-quiz.png' });

  // Seleccionar el relato para el quiz
  await page.selectOption('#relato-select', { index: 1 });
  await page.screenshot({ path: './screenshots/edit-story-quiz.png' });

  // Seleccionar estado del relato
  await page.selectOption('#estado-select', '1');
  await page.screenshot({ path: './screenshots/edit-status-quiz.png' });

  // Llenar el campo enunciado pregunta 1
  await page.fill('input[type="text"][value="¿quien es Daniel?"]', '¿super cambios?');
  await page.screenshot({ path: './screenshots/edit-quiz-statement.png' }); 

  //Seleccionar el tipo de pregunta de la pregunta 1
  await page.selectOption('select:below(label:text("Tipo de pregunta"))', '2');
  await page.screenshot({ path: './screenshots/edit-select-type-quiz.png' });
 
  // Llenar el campo puntos pregunta 1
  await page.fill('input[type="number"]:nth-of-type(1)', '300');
  await page.screenshot({ path: './screenshots/edit-quiz-points.png' }); 

  // Llenar el campo agregar respuesta 1 pregunta 1
  await page.fill('input[type="text"][value="profesor "]', 'Estudiante');
  await page.screenshot({ path: './screenshots/edit-quiz-answer.png' }); 

  // Llenar el campo agregar respuesta 2 pregunta 1
  await page.fill('input[type="text"][value="no"]', 'Sí');
  await page.screenshot({ path: './screenshots/edit-quiz-answer2.png' }); 

  // Llenar el campo agregar respuesta 3 pregunta 1
  await page.fill('input[type="text"][value="no"]', 'Estudiante');
  await page.screenshot({ path: './screenshots/edit-quiz-answer3.png' }); 

  // Llenar el campo agregar respuesta 4 pregunta 1
  await page.fill('input[type="text"][value="no"]', 'Estudiante');
  await page.screenshot({ path: './screenshots/edit-quiz-answer4.png' }); 

  // Seleccionar respuesta correcta pregunta 1
  await page.check('div:nth-of-type(2) input.form-checkbox');
  await page.screenshot({ path: './screenshots/edit-quiz-correct-answer.png' });

  // Dar click en "Registrar Cuestionario"
  await page.click('button:text("Guardar Cambios")');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './screenshots/quiz-new-create.png' });
});

test('Delete quiz', async ({ page }) => {
  await login(page);
  await page.goto(managementQuiz);

  //Dar clik al boton eliminar
  await page.waitForTimeout(3000); 
  await page.click('svg.h-5.w-5'); 
  await page.screenshot({ path: './screenshots/delete-quiz.png' });

  /*/Eliminar Usuario
  await page.getByRole('button', { name: /Si, estoy seguro/i }).click();
  await page.screenshot({ path: './screenshots/delete-quiz-definitily.png' });*/
})
