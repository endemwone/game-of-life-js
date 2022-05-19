class GameOfLife {
    constructor(scale) {
        // Dimensions
        this.cols = 80;
        this.rows = 60;

        // Scales the canvas
        this.scale = scale;

        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        // Color
        this.color = "blue";

        // For drawing circles
        this.radius = this.scale / 2;
        // For gradient circles
        // this.innerRadius = 2;
        // this.outerRadius = 7;

        this.display = new Array(this.cols * this.rows);
    }

    clear() {
        this.display = new Array(this.cols * this.rows);
    }

    getIndex(x, y) {
        return x + y * this.cols;
    }

    randomize() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.display[this.getIndex(x, y)] = Math.random() < 0.1;
            }
        }
    }

    countNeighbors(x, y) {
        let sum = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) continue;

                let col = x + i;
                let row = y + j;

                sum += Number(this.display[this.getIndex(col, row)]);
            }
        }

        return sum;
    }

    render() {
        // Clear the screen every render cycle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.display[this.getIndex(x, y)]) {
                    this.ctx.fillStyle = this.color;

                    // Draw a rectangle at the given x and y coordinates
                    // this.ctx.fillRect(
                    //     x * this.scale,
                    //     y * this.scale,
                    //     this.scale,
                    //     this.scale
                    // );

                    // Draw a circle at the given x and y coordinates
                    this.ctx.beginPath();
                    this.ctx.arc(
                        x * this.scale + this.scale / 2,
                        y * this.scale + this.scale / 2,
                        this.radius,
                        0,
                        2 * Math.PI,
                        false
                    );
                    this.ctx.fill();

                    // Draw a gradient circle at the given x and y coordinates
                    // let gradient = this.ctx.createRadialGradient(
                    //     x * this.scale + this.scale / 2,
                    //     y * this.scale + this.scale / 2,
                    //     this.innerRadius,
                    //     x * this.scale + this.scale / 2,
                    //     y * this.scale + this.scale / 2,
                    //     this.outerRadius
                    // );
                    // gradient.addColorStop(0, "white");
                    // gradient.addColorStop(1, "blue");

                    // this.ctx.arc(
                    //     x * this.scale + this.scale / 2,
                    //     y * this.scale + this.scale / 2,
                    //     this.radius,
                    //     0,
                    //     2 * Math.PI
                    // );

                    // this.ctx.fillStyle = gradient;
                    // this.ctx.fill();
                }
            }
        }
    }
}

export default GameOfLife;
