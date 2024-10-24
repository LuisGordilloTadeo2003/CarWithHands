class Car {
    constructor(isPlayer, rail) {
        this.isPlayer = isPlayer; // Indica si es el coche del jugador
        this.currentRail = rail; // Asignar el carril al coche
        this.x = this.currentRail ? (this.currentRail.x1 + this.currentRail.x2) / 2 : 0; // Posición inicial en x (centro del carril)
        this.y = isPlayer ? height - 120 : 100; // Posición Y inicial del coche
        this.width = isPlayer ? 20 : 10; // Ancho del coche
        this.height = isPlayer ? 40 : 30; // Altura del coche
        this.color = isPlayer ? 'blue' : 'red'; // Azul para el jugador, rojo para otros coches
        this.speed = isPlayer ? 0 : random(1.5, 3); // Velocidad del coche
    }

    display() {
        fill(this.color);
        rect(this.x - this.width / 2, this.y, this.width, this.height); // Dibujar el coche como un rectángulo
    }

    move() {
        let dx = this.currentRail.x2 - this.currentRail.x1;
        let dy = this.currentRail.y2 - this.currentRail.y1;

        let distance = dist(this.currentRail.x1, this.currentRail.y1, this.currentRail.x2, this.currentRail.y2)

        if (distance > 0) {
            let fraction = this.speed / distance;

            this.x += dx * fraction;
            this.y += dy * fraction;

            if (!this.isPlayer) {
                this.width += 0.07;
                this.height += 0.07;
            }
        }
    }
}
