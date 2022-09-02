class Cell{
    static livingColor = "black";
    static cellSize = 10;

    constructor(posX, posY, initState) {
        this.posX = posX;
        this.posY = posY;
        this.alive = initState;
        this.nextState = null;
    }

    render(ctx){
        let x = Cell.cellSize * this.posX;
        let y = Cell.cellSize * this.posY;
        // ctx.clearRect(x, y, Cell.cellSize, Cell.cellSize);
        ctx.beginPath();
        ctx.rect(x, y, Cell.cellSize, Cell.cellSize);
        ctx.strokeStyle = 'grey';
        ctx.fillStyle = this.alive ? Cell.livingColor : "#FFFFFF";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    // must be rectangular or else the irresponsible caller will feel the wrath of the mighty error
    static nextGen(grid){
        for (let i = 1; i < grid.length - 1; i++){
            for (let j = 1; j < grid[0].length - 1; j++){
                let livingCount = 0;
                livingCount += grid[i][j - 1].alive;
                livingCount += grid[i][j + 1].alive;
                for (let k = j - 1; k <= j + 1; k++){
                    livingCount += grid[i - 1][k].alive;
                }
                for (let k = j - 1; k <= j + 1; k++){
                    livingCount += grid[i + 1][k].alive;
                }

                let curr = grid[i][j];
                if (curr.alive){
                    curr.nextState = livingCount === 2 || livingCount === 3;
                } else {
                    curr.nextState = livingCount === 3;
                }
            }
        }

        for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid[0].length; j++) {
                if (i === 0 || i === grid.length - 1 || j === 0 || j === grid[0].length - 1){
                    grid[i][j].alive = false;
                } else {
                    grid[i][j].alive = grid[i][j].nextState;
                    grid[i][j].nextState = null;
                }
            }
        }

    }
}