// canvas id = "lienzo"
//Obtener la area del canvas por su id de la etiqueta html
const canvas = document.getElementById("lienzo");
//Dar el contexto al canvas
const ctx = canvas.getContext("2d");

const vidas = document.querySelector("#vidas");
let vidasVar=3;
vidas.textContent = vidasVar;

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
    this.isMove = isMove=true;

    this.dibuja = function () {
        ctx.fillStyle = this.color;
        //console.log("Colors aplicado: ",ctx.fillStyle);
        ctx.fillRect(this.posX, this.posY, this.ancho, this.alto, this.isMove);
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
    if(prota.posX == enemigo1.posX && prota.posY+50 > enemigo1.posY){
        console.log("colision");
        vidas.textContent = vidasVar-1;
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

//Bucle principal del juego
function principal(){
    requestAnimationFrame(principal);
    borraCanvas();
    colisiones();
    prota.dibuja();
    prota.mover();
    enemigo1.dibuja();
};

principal();