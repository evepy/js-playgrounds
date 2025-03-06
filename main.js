// canvas id = "lienzo"
//Obtener la area del canvas por su id de la etiqueta html
const canvas = document.getElementById("lienzo");
//Dar el contexto al canvas
const ctx = canvas.getContext("2d");


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
            ctx.fillStyle = "green";
            ctx.fillRect(x*casillaVertical,y*casillaHorizontal,50,50);
        }
    }
}

//protagonista del juego
const protagonista = function(posX,posY,ancho,alto,color,velocidad){
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
    };
};
//instancia del objeto
const prota = new protagonista(50,50,50,50,"blue",2);

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
}
//instancia del objeto enemigo
const enemigo1 = new enemigo(200,200,50,50,"red",2);


//Bucle principal del juego
function principal(){
    requestAnimationFrame(principal);
    prota.dibuja();
    enemigo1.dibuja();
};

principal();