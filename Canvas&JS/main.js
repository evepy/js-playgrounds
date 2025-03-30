// canvas id = "lienzo"
//Obtener la area del canvas por su id de la etiqueta html
const canvas = document.getElementById("lienzo");
//Dar el contexto al canvas
const ctx = canvas.getContext("2d");

const vidas = document.querySelector("#vidas");
let vidasVar=3;
vidas.textContent = vidasVar;
if (vidas) {
    vidas.textContent = vidasVar;
}
//escenario 500x500

//cada cuadrado mide 50x50
let casillaHorizontal = 50;
let casillaVertical = 50;

let escenario = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
];
//recorrer escenario para pintarlo
for(y=0;y<10; y++){
    for(x=0; x<10; x++){
        if(escenario[y][x] == 0){
            ctx.fillStyle = "pink";
            ctx.fillRect(x*casillaVertical,y*casillaHorizontal,50,50);
        }
    }
}

//protagonista del juego
const protagonista = function(posX,posY,ancho,alto,color,velocidad, isMove){
    this.posX = posX;
    this.posY = posY;
    this.alto = alto;
    this.ancho = ancho;
    this.color = color;
    this.velocidad = velocidad;
    this.isMove = isMove !== undefined ? isMove : true; 

    this.dibuja = function () {
        ctx.fillStyle = this.color;
        //console.log("Colors aplicado: ",ctx.fillStyle);
        ctx.fillRect(this.posX, this.posY, this.ancho, this.alto);
    };
    this.mover = function () {
        if(this.isMove==true){
            if(this.posX<500-50)
                this.posX+=5;
                else{
                    this.isMove=false;
                }
            
        }
        else{
            if(this.posX>0)
                this.posX-=5;
            else{
                this.isMove=true;
            }
        }
    };
};
//instancia del objeto
const prota = new protagonista(200,200,50,50,"blue",2, true);

//enemigo del juego
const enemigo = function(posX,posY,ancho,alto,color,velocidad){
    this.posX = posX;
    this.posY = posY;
    this.alto = alto;
    this.ancho = ancho;
    this.color = color;
    this.velocidad = velocidad;

    this.dibuja = function () {
        ctx.fillStyle = this.color;
        //console.log("Colors aplicado: ",ctx.fillStyle);
        ctx.fillRect(this.posX, this.posY, this.ancho, this.alto);

    }
    this.subir = function () {
        if(this.posY>2)
            this.posY-=10
    }
    this.bajar = function () {
        if(this.posY<500-50)
            this.posY+=10
    }
    this.izquierda = function () {
        if(this.posX>2)
            this.posX-=10
        
    }
    this.derecha = function () {
        if(this.posX<500-50)
            this.posX+=10
    }
}
//instancia del objeto enemigo
const enemigo1 = new enemigo(200,450,50,50,"purple",2);

// Colisiones de jugador
function colisiones(){
    if(
        enemigo1.posX < prota.posX + prota.ancho &&  // El lado derecho del enemigo no ha pasado el lado izquierdo del prota
        enemigo1.posX + enemigo1.ancho > prota.posX &&  // El lado izquierdo del enemigo no ha pasado el lado derecho del prota
        enemigo1.posY < prota.posY + prota.alto &&  // El lado inferior del enemigo no ha pasado el lado superior del prota
        enemigo1.posY + enemigo1.alto > prota.posY 
    ) {
        vidasVar--;
        if (vidas) {
            vidas.textContent = vidasVar; 
        }
        enemigo1.posX = 200;
        enemigo1.posY = 450;
    }
}



// Eventos de jugador
window.addEventListener('keydown', (e) =>{
    //previene eventos burbujas cuando hay muchos elementos
    e.preventDefault()
    if(e.key ==='w' || e.key === 'W'){
        enemigo1.subir();
    }
    if(e.key ==='s' || e.key === 'S'){
        enemigo1.bajar();
    }
    if(e.key ==='a' || e.key === 'A'){
        enemigo1.izquierda();
    }
    if(e.key ==='d' || e.key === 'D'){
        enemigo1.derecha();
    }
})


//Actualizar el canvas
function borraCanvas(){
    canvas.width=500
    canvas.height=500
};
//visibilidad de reinicio
function verBoton(){
    const ver = document.querySelector("#boton").style.visibility="hidden";
    if(vidasVar==0){
        mostrarGameOver();
        document.querySelector("#boton").style.visibility="visible";
    }
    document.querySelector("#boton").addEventListener("click",()=>{
        location.reload();
    })
    
}
//mostrar el reinicio del juego
function mostrarGameOver(){
    // Configurar el texto
    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Dibujar el texto en el centro del canvas
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    
    // Opcional: añadir texto adicional más pequeño
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Presiona el botón para jugar de nuevo", canvas.width/2, canvas.height/2 + 50);
}

//Bucle principal del juego
function principal(){
    requestAnimationFrame(principal);
    borraCanvas();
    verBoton();
    if (vidasVar > 0) {
        colisiones();
        prota.dibuja();
        prota.mover();
        enemigo1.dibuja();
    }
};

principal();