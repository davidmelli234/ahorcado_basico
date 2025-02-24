// Función para dibujar el ahorcado en el Canvas según los intentos restantes

function dibujarAhorcado(intento) {
    let intentos = 10;
    const canvas = document.getElementById('ahorcadoCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue'; // Establece el color de relleno
    // limpiamos el canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // En este caso, (0, 0) es la esquina superior izquierda del canvas, 
    // y canvas.width y canvas.height son las dimensiones totales del canvas. 
    // Por lo tanto, se limpia todo el contenido del canvas, volviéndolo transparente.
     //Dibujamos cada parte de nuestro gráfico en funiocn de los intentos 
     if (intento <= intentos - 1)
        {
            // 10: La coordenada x (horizontal) del punto de inicio del rectángulo 
            // es 10 píxeles desde el borde izquierdo del lienzo.
            // 190: La coordenada y (vertical) del punto de inicio del rectángulo es 190 
            // píxeles desde el borde superior del lienzo.
            // 180: El ancho del rectángulo es de 180 píxeles.
            // 20: La altura del rectángulo es de   20 píxeles.

            ctx.fillRect(10,190,180,10); // Base del ahorcado
        } 
     if (intento <= intentos - 2)  
        {
            ctx.fillRect(50, 20, 10, 170); // poste vertical
        }  

     if (intento <= intentos - 3)  
        {
            ctx.fillRect(50, 20, 100, 10); // poste vertical
        }   

     if (intento <= intentos - 4)  
        {
            ctx.fillStyle = 'black'; // Establece el color de relleno
            ctx.fillRect(140, 30, 5, 40); // Cuerda
        }   

     if (intento <= intentos - 5) 
        {
            // Este método comienza una nueva ruta de dibujo o reinicia la ruta actual. 
            // Es esencial para comenzar a dibujar una nueva forma o ruta en el lienzo 
            // sin conectar con la forma anterior.
            // Imagina que levantas el lápiz del papel y te preparas para empezar a dibujar algo nuevo.
            ctx.beginPath();
            // 140: La coordenada x del centro del arco (140 píxeles desde el borde izquierdo del lienzo).
            // 85: La coordenada y del centro del arco (85 píxeles desde el borde superior del lienzo).
            // 15: El radio del arco (15 píxeles).
            // 0: El ángulo inicial del arco en radianes (0 es el punto en el extremo derecho del círculo).
            // 2 * Math.PI: El ángulo final del arco en radianes (2 * Math.PI es el círculo completo, 
            // ya que 2 * Pi radianes equivalen a 360 grados).
            ctx.arc(140, 85, 15, 0, 2 * Math.PI);  // Cabeza del ahorcado
            //hace el dibujo con el grosor , color , etc actual.
            ctx.stroke();
        }
     if (intento <= intentos - 6) 
        { 
            ctx.fillRect(140, 100, 2, 50); // Dibuja el cuerpo
        }  
     if (intento <= intentos - 7) 
        { 
             // Brazo izquierdo
             ctx.beginPath();
             //coordenada x, y deonde comienza el brazo
             ctx.moveTo(140, 110); // Inicio del brazo izquierdo
             //coordenada x, y deonde finaliza el brazo
             ctx.lineTo(120, 130); // Fin del brazo izquierdo
            ctx.stroke();
         }
      if (intento <= intentos - 8) 
          { 
             // Brazo derecho
             ctx.beginPath();
             //coordenada x, y deonde comienza el brazo
             ctx.moveTo(140, 110); // Inicio del brazo derecho
             //coordenada x, y deonde finaliza el brazo
             ctx.lineTo(160, 130); // Fin del brazo dserecho
             ctx.stroke();
           }
      if (intento <= intentos - 9) 
           { 
             // pierna izquierdo
              ctx.beginPath();
             //coordenada x, y desde donde comienza el pierna
              ctx.moveTo(140, 150); // Inicio del pierna izquierdo
              //coordenada x, y deonde finaliza el pierna
              ctx.lineTo(125, 170); // Fin del pierna izquierdo
              ctx.stroke();
            }
      if (intento <= intentos - 10) 
           { 
              // pierna izquierdo
              ctx.beginPath();
             //coordenada x, y deonde comienza el pierna
              ctx.moveTo(140, 150); // Inicio del pierna deecha
             //coordenada x, y deonde finaliza el pierna
              ctx.lineTo(160, 170); // Fin del pierna derecha
               ctx.stroke();
            }
}

// Clase que maneja la lógica del juego del Ahorcado

class Ahorcado {
    constructor(palabra, intentos) {
        this.palabra = palabra; // La palabra a adivinar
        this.intentos = intentos; // Cantidad de intentos disponibles
        this.letrasAdivinadas = []; // Letras adivinadas correctamente
        this.letrasIncorrectas = []; // Letras incorrectas
        this.estado = 'jugando'; // Estado actual del juego
    }

    // Método para verificar si la letra es correcta
    verificarLetra(letra) {
        if (this.estado !== 'jugando'){
             
             return; // Si el juego ha terminado, no hace nada

        }

        if (this.palabra.includes(letra)) {
            this.letrasAdivinadas.push(letra); // Agrega a letras correctas
        } else {
            this.letrasIncorrectas.push(letra); // Agrega a letras incorrectas
            this.intentos--; // Resta un intento
            dibujarAhorcado(this.intentos); // Llama a la función para dibujar en el Canvas
        }

        this.actualizarEstado(); // Actualiza el estado del juego
    }

    // Método para actualizar el estado (ganado o perdido)
    actualizarEstado() {
        if (this.intentos === 0) {
            iniciar.style.display='block';
            this.estado = 'perdido'; // Si no quedan intentos, se pierde
            document.getElementById('mensaje').textContent = '¡Perdiste! La palabra era: ' + this.palabra;
            
        } else if (this.obtenerPalabraMostrada().trim() === this.palabra) {
            iniciar.style.display='block';
            this.estado = 'ganado'; // Si se adivinan todas las letras, se gana
            document.getElementById('mensaje').textContent = '¡Ganaste!';
        }

        // Actualiza los intentos restantes y las letras incorrectas en el HTML
        document.getElementById('intentos').textContent = this.intentos;
        document.getElementById('letrasPulsadas').textContent = this.letrasIncorrectas.join(', ');
    }

    // Método que retorna la palabra actual con guiones y letras adivinadas
    obtenerPalabraMostrada() {
        let palabraMostrada = '';
        for (let letra of this.palabra) {
            if (this.letrasAdivinadas.includes(letra)) {
                palabraMostrada += letra; // Muestra las letras correctas
            } else {
                palabraMostrada += '_'; // Muestra guiones para letras no adivinadas
            }
        }
        return palabraMostrada.trim(); // Quita espacios adicionales
    }

    // Método que actualiza la palabra en el HTML
    actualizarPalabraMostrada() {
        document.getElementById('palabra').textContent = this.obtenerPalabraMostrada();
    }
}

 // Inicializa el juego con la palabra "javascript" y 10 intentos
   juego = new Ahorcado('java', 10);
  // Muestra los intentos iniciales y la palabra oculta en el HTML
  let iniciar = document.querySelector('#empezar');  
 
function empezar(){
    iniciar.style.display='none';
    juego.intentos=10;
    juego.letrasAdivinadas=[];
    juego.letrasIncorrectas=[];
    juego.estado='jugando';
    document.getElementById('intentos').textContent = juego.intentos;
    juego.actualizarPalabraMostrada();
    document.getElementById('mensaje').textContent='';
    dibujarAhorcado(juego.intentos);
}

empezar();
// Agrega un evento al botón para procesar la letra ingresada
document.getElementById('enviarLetra').addEventListener('click', () => {
    const letra = document.getElementById('letra').value.toLowerCase(); // Captura la letra en minúscula
    juego.verificarLetra(letra); // Verifica si la letra es correcta
    juego.actualizarPalabraMostrada(); // Actualiza la palabra en pantalla
    document.getElementById('letra').value = '';  // Borra el contenido del input
    document.getElementById('letra').focus();  // Enfoca nuevamente el input
});
document.getElementById('empezar').addEventListener('click', () => {
    empezar();
});
