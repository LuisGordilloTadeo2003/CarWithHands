class Road {
    constructor(x, y, topBase, bottomBase, height, laneCount = 4) {
        this.x = x;
        this.y = y;
        this.topBase = topBase;
        this.bottomBase = bottomBase;
        this.height = height;
        this.laneCount = laneCount;
        this.rails = [];

        this.makeRail();
    }

    makeRail() {
        let centerX = width / 2; // Centrar en el ancho del lienzo
        let topQuarterWidth = this.topBase / this.laneCount;

        for (let i = 0; i <= this.laneCount; i++) {
            // Ajustar posX para estar centrado en width / 2
            let posX = centerX - this.topBase / 2 + i * topQuarterWidth;

            // Ajustar posXBottom para estar centrado en width / 2
            let posXBottom = map(posX, centerX - this.topBase / 2, centerX + this.topBase / 2, centerX - this.bottomBase / 2, centerX + this.bottomBase / 2);

            // Carril discontinuo para líneas interiores
            let isDashed = i > 0 && i < this.laneCount;

            // Agregar el carril al array de rails
            this.rails.push(new Rail(posX, this.y - this.height / 2, posXBottom, this.y + this.height / 2, isDashed));
        }
    }

    dibujar() {
        // Dibujar el trapecio de la carretera, centrado en width / 2
        let centerX = width / 2; // Posición centrada en el ancho del lienzo

        fill(30); // Relleno de la carretera
        noStroke(); // Sin borde para el relleno
        beginShape();
        vertex(centerX - this.topBase / 2, this.y - this.height / 2);
        vertex(centerX + this.topBase / 2, this.y - this.height / 2);
        vertex(centerX + this.bottomBase / 2, this.y + this.height / 2);
        vertex(centerX - this.bottomBase / 2, this.y + this.height / 2);
        endShape(CLOSE);

        // Dibujar solo los lados con stroke
        stroke(211, 211, 211); // Color del borde
        strokeWeight(2); // Grosor del borde

        // Lado izquierdo
        line(centerX - this.topBase / 2, this.y - this.height / 2, centerX - this.bottomBase / 2, this.y + this.height / 2);

        // Lado derecho
        line(centerX + this.topBase / 2, this.y - this.height / 2, centerX + this.bottomBase / 2, this.y + this.height / 2);

        // Dibujar los carriles
        stroke(255); // Color de las líneas de carriles
        strokeWeight(2); // Grosor de las líneas
        this.rails.forEach(carril => carril.dibujar());
    }

}