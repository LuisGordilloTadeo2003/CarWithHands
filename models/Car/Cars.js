class Cars {
    constructor(rails) {
        this.cars = [];
        this.rails = rails;
    }

    createCars(playerX, playerY, numCars) {
        // Crear el coche del jugador
        let lane = floor(random(4));
        let playerCar = new Car(true, this.rails[lane]); // Velocidad 0 para el coche del jugador
        this.cars.push(playerCar);

        // Crear coches enemigos
        for (let i = 0; i < numCars; i++) {
            this.addEnemyCar(); // Añadir coches enemigos
        }
    }

    addEnemyCar() {
        let lane = floor(random(4));
        let carX = this.rails[lane].x1 + ((this.rails[lane + 1].x1 - this.rails[lane].x1) / 2) + 2.5; // Posición aleatoria en el eje x
        let carY = 100; // Posición aleatoria para aparecer fuera del área visible
        let enemyCar = new Car(false, this.rails[lane]); // Velocidad aleatoria entre 2 y 5
        this.cars.push(enemyCar);
    }

    display() {
        // Dibujar todos los coches
        this.cars.forEach(car => car.display());
    }

    move() {
        // Mover todos los coches
        this.cars.forEach(car => {
            car.move();

            // Verificar si el coche enemigo ha salido por la parte inferior
            if (!car.isPlayer && car.y > height) {
                this.resetEnemyCar(car);
            }
        });

        this.checkCollisions(); // Verificar colisiones después de mover los coches
    }

    resetEnemyCar(enemyCar) {
        let carril = floor(random(4))
        // Reubicar el coche enemigo al fondo de la pantalla
        enemyCar.y = 100; // Nueva posición Y fuera de la pantalla
        enemyCar.x = this.rails[carril].x1 + ((this.rails[carril + 1].x1 - this.rails[carril].x1) / 2) + 2.5; // Nueva posición X aleatoria
        enemyCar.speed = floor(random(1.5, 3)); // Asignar nueva velocidad
        enemyCar.width = 10;
        enemyCar.height = 30;
    }

    movePlayer(angle) {
        let playerCar = this.cars[0]; // Asumiendo que el primer coche es el del jugador
        let movementFactor; // Declarar la variable para el factor de movimiento

        // Calcular el movimiento basado en el ángulo
        movementFactor = map(abs(angle), 0, HALF_PI, 0.5, 2); // Ajusta los límites como necesites

        if (angle < PI / 5 && angle > -PI / 5) {
            playerCar.x = playerCar.x;
        } else
            if (angle < -PI / 4) {
                // Si el ángulo es negativo (hacia la izquierda)
                playerCar.x += movementFactor; // Mover el coche a la izquierda
            } else if (angle > PI / 4) {
                // Si el ángulo es positivo (hacia la derecha)
                playerCar.x -= movementFactor; // Mover el coche a la derecha
            }

        // Asegúrate de que el coche no se salga de los límites de la pantalla
        playerCar.x = constrain(playerCar.x, 0, width); // Limitar la posición X dentro de la pantalla
    }

    checkCollisions() {
        let playerCar = this.cars[0]; // Coche del jugador
        this.cars.forEach(car => {
            if (!car.isPlayer) { // Solo comprobar coches enemigos
                if (this.isColliding(playerCar, car)) {
                    this.handleCollision(playerCar, car); // Manejar colisión
                }
            }
        });
    }

    isColliding(carA, carB) {
        // Verifica si hay colisión entre dos coches
        return !(
            carA.x - carA.width / 2 > carB.x + carB.width / 2 ||
            carA.x + carA.width / 2 < carB.x - carB.width / 2 ||
            carA.y > carB.y + carB.height ||
            carA.y + carA.height < carB.y
        );
    }

    handleCollision(playerCar, enemyCar) {
        // Manejar la colisión
        console.log("Colisión detectada!");
        // Aquí puedes implementar la lógica para manejar la colisión
        // Por ejemplo, puedes hacer que el coche del jugador se detenga o reinicie su posición
        playerCar.y = height - 120; // Reiniciar la posición Y del coche del jugador
        playerCar.x = width / 2; // Reiniciar la posición X del coche del jugador al centro
    }
}
