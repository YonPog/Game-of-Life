let mainCanvas = document.getElementById("mainCanvas");
let ctx = mainCanvas.getContext("2d");

let grid = [];
let running = false;
let interval;

function main(){
    init();
    setInterval(renderGrid, 10);
    coloring();
}

function init() {
    let gridWidth = Math.floor(Number.parseInt(mainCanvas.getAttribute("width")) / Cell.cellSize);
    let gridHeight = Math.floor(Number.parseInt(mainCanvas.getAttribute("height")) / Cell.cellSize);

    for (let i = 0; i < gridWidth; i++) {
        let row = [];
        for (let j = 0; j < gridHeight; j++) {
            row.push(new Cell(i, j, false));
        }
        grid.push(row);
    }
}

function generateNext(){
    Cell.nextGen(grid);
}

function startStop(){
    if (running){
        running = false;
        let startButton = document.getElementById("start/stop");
        startButton.innerText = "Start";
        clearInterval(interval);
    } else {
        running = true;
        let startButton = document.getElementById("start/stop");
        startButton.innerText = "Stop";
        interval = setInterval(generateNext, 1000);
    }

}

function clearGrid(){
    if (!running){
        for (let c of grid.flat()){
            c.alive = false;
        }
    }
}

function renderGrid(){
    for (let c of grid.flat()){
        c.render(ctx);
    }
}

main()