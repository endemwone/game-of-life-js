import GameOfLife from "./gameOfLife.js";

const gameOfLife = new GameOfLife(10);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let running = false;
let cleared = false;

document.querySelector("#start").addEventListener("click", () => {
    running = !running;
    gameLoop();
});

document.querySelector("#randomize").addEventListener("click", () => {
    gameOfLife.randomize();
});

document.querySelector("#clear").addEventListener("click", () => {
    gameOfLife.clear();
    gameOfLife.render();
    cleared = true;
    running = false;
});

gameOfLife.randomize();

function gameLoop() {
    if (cleared) {
        gameOfLife.randomize();
        cleared = false;
    }

    if (running) {
        gameOfLife.render();

        for (let i = 0; i < gameOfLife.cols; i++) {
            for (let j = 0; j < gameOfLife.rows; j++) {
                let neighbors = gameOfLife.countNeighbors(i, j);

                if (gameOfLife.display[gameOfLife.getIndex(i, j)]) {
                    if (neighbors < 2 || neighbors > 3) {
                        gameOfLife.display[gameOfLife.getIndex(i, j)] = false;
                    }
                } else {
                    if (neighbors == 3) {
                        gameOfLife.display[gameOfLife.getIndex(i, j)] = true;
                    }
                }
            }
        }

        setTimeout(() => {
            window.requestAnimationFrame(() => gameLoop());
        }, 100);
    }
}

gameLoop();
