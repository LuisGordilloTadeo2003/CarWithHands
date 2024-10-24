class Rail {
    constructor(x1, y1, x2, y2, dash = false) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.dash = dash;
    }

    dibujar() {
        if (this.dash) {
            drawingContext.setLineDash([10, 10]); // Línea discontinua
        } else {
            drawingContext.setLineDash([]); // Línea continua
        }

        line(this.x1, this.y1, this.x2, this.y2);
    }
}