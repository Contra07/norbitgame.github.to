//Класс 2D плоскости
class Plane{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
}

class Game {
    constructor(canvas) {
        this.window = Plane(canvas);
    }  
    
    Init(){

    }

    Update()
    {
        
    }


    Draw(){
        ClearCanvas();
        background.Draw();
        player.Draw();
    }

    ClearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    keyDownListener(e) {
        if(e.keyCode == 32){
            player.dy = -50  ;
        }
    }
}

(new Game(document.getElementById('mycanvas'))).Init();

