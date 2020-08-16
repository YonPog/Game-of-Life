let marking = null;

function mark(){
    marking = true;
}

function erase(){
    marking = false;
}

function coloring(){

    function mouseMoveHandler(e){
        if (e.buttons % 2 === 1 && !running){ // left button is down
            let x = e.offsetX;
            let y = e.offsetY;

            let posX = Math.floor(x / Cell.cellSize);
            let posY = Math.floor(y / Cell.cellSize);

            if (marking !== null){
                grid[posX][posY].alive = marking;
            }
        }
    }

    mainCanvas.addEventListener("mousemove", mouseMoveHandler);
    mainCanvas.addEventListener("mousedown", mouseMoveHandler);

}