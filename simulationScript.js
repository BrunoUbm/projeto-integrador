class Particle {
    constructor(id, velocity, center, radius, color) {
        this.id = id;
        this.velocity = velocity;
        this.center = center;
        this.radius = radius;
        this.color = color;
    }

    render = () => {
        context.beginPath();
        context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }

    move = () => {
        this.center.x += this.velocity.x;
        this.center.y += this.velocity.y;
    }

    verifyCollisionWalls = (particles, index) => {
        if(this.center.y - this.radius <= 0 || this.center.y + this.radius >= canvas.height) {
            this.velocity.y *= -1;
        }

        else if(this.center.x - this.radius <= 0 || this.center.x + this.radius >= canvas.width) {
            this.velocity.x *= -1;
        }
    }

    static verifyCollisionBetween = (particle1, particle2) => {
        const distance = distanceBetweenTwoPoints(particle1.center, particle2.center);

        if(distance < particle1.radius + particle2.radius) {
            const backupVelocity = {
                x: particle1.velocity.x,
                y: particle1.velocity.y
            }

            const newParticle1Velocity = {
                x: particle1.velocity.x - ((particle1.velocity.x - particle2.velocity.x) * (particle1.center.x - particle2.center.x) / Math.pow(Math.abs(particle1.center.x - particle2.center.x), 2)) * (particle1.center.x - particle2.center.x),
                y:  particle1.velocity.y - ((particle1.velocity.y - particle2.velocity.y) * (particle1.center.y - particle2.center.y) / Math.pow(Math.abs(particle1.center.y - particle2.center.y), 2)) * (particle1.center.y - particle2.center.y)
            };

            const newParticle2Velocity = {
                x: particle2.velocity.x - ((particle2.velocity.x - backupVelocity.x) * (particle2.center.x - particle1.center.x) / Math.pow(Math.abs(particle2.center.x - particle1.center.x), 2)) * (particle2.center.x - particle1.center.x),
                y: particle2.velocity.y - ((particle2.velocity.y - backupVelocity.y) * (particle2.center.y - particle1.center.y) / Math.pow(Math.abs(particle2.center.y - particle1.center.y), 2)) * (particle2.center.y - particle1.center.y)
            };

            particle1.velocity = {
                x: isNaN(newParticle1Velocity.x) ? 0 : newParticle1Velocity.x,
                y: isNaN(newParticle1Velocity.y) ? 0 : newParticle1Velocity.y
            }

            particle2.velocity = {
                x: isNaN(newParticle2Velocity.x) ? 0 : newParticle2Velocity.x,
                y: isNaN(newParticle2Velocity.y) ? 0 : newParticle2Velocity.y
            }
        }
    }

    static generateParticles = (() => {
        let currentIndex = 0;
        return ((radius, quantity, maxVelocity) => {
            const particles = [];
            const collisionTable = [];

            for(let i = 0; i < quantity; i++) {
                if(particles.length == 0) {
                    particles.push(new Particle(
                        currentIndex,
                        {
                            x: getRandomFloatInclusive(-maxVelocity, maxVelocity),
                            y: getRandomFloatInclusive(-maxVelocity, maxVelocity)
                        },
                        {
                            x: Math.floor(getRandomFloatInclusive(radius, canvas.width - radius)),
                            y: Math.floor(getRandomFloatInclusive(radius, canvas.height - radius))
                        },
                        radius,
                        'blue'
                    ));

                    currentIndex++;
                }
                else {
                    let insertionAttempts = 0;

                    while(insertionAttempts < 100) {
                        const newInsertPosition = {
                            x: Math.floor(getRandomFloatInclusive(radius, canvas.width - radius)),
                            y: Math.floor(getRandomFloatInclusive(radius, canvas.height - radius))
                        };
                        let collisionDetected = false;

                        for(let j = 0; j < particles.length; j++) {
                            const distance = distanceBetweenTwoPoints(newInsertPosition, particles[j].center);

                            if(distance < radius * 2 + radius * 0.1) {
                                collisionDetected = true;
                            }
                        }

                        if(!collisionDetected) {
                            particles.push(new Particle(
                                    currentIndex,
                                    {
                                        x: getRandomFloatInclusive(-maxVelocity, maxVelocity),
                                        y: getRandomFloatInclusive(-maxVelocity, maxVelocity)
                                    },
                                    newInsertPosition,
                                    radius,
                                    'blue'
                                ));

                                currentIndex++;

                            break;
                        }

                        insertionAttempts++;
                    }

                    if(insertionAttempts == 100) {
                        console.log(`Erro, foi possivel gerar apenas ${particles.length} particulas`);
                        break;
                    }
                }
            }

            // Gerador hash table
            for(let i = 0; i < particles.length; i++) {
                for(let j = 0; j < particles.length; j++) {
                    const exists = collisionTable.find(elem => elem.idx1 == i && elem.idx2 == j|| elem.idx1 == j && elem.idx2 == i);
                    if(i != j && !exists) {
                        collisionTable.push({idx1: i, idx2: j});
                    }
                }
            }

            return {particles, collisionTable};
        });
    })();
}

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

let requestAnim;


let particles;
let collisionTable;


generateCanvas = () => {
    const generationRes = Particle.generateParticles(30, 30, 2);
    
    particles = generationRes.particles;
    collisionTable = generationRes.collisionTable;
}

generateCanvas();

//Main render screen loop (60fps)
mainLoop = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < particles.length; j++) {
            particles[j].move();
        }

        for(let j = 0; j < particles.length; j++) {
            particles[j].verifyCollisionWalls();
        }

        for(let j = 0; j < collisionTable.length; j++) {
            Particle.verifyCollisionBetween(particles[collisionTable[j].idx1], particles[collisionTable[j].idx2]);
        }
    }

    for(let i = 0; i < particles.length; i++) {
        particles[i].render();
    }

    // setTimeout(() => requestAnim = window.requestAnimationFrame(mainLoop), 400);

    requestAnim = window.requestAnimationFrame(mainLoop);
}

//init data here
initAnimation = () => {
    requestAnim = window.requestAnimationFrame(mainLoop);
}

stopAnimation = () => {
    window.cancelAnimationFrame(requestAnim);
}

//UI code
//====================================================================

let animationRunning = false;

const elemStateButton = document.getElementById('stateButton');

elemStateButton.addEventListener('click', () => {
    if(animationRunning) {
        stopAnimation();

        context.clearRect(0, 0, canvas.width, canvas.height);

        generateCanvas();

        elemStateButton.innerHTML = 'Iniciar Simulação';
    }
    else {
        initAnimation();

        elemStateButton.innerHTML = 'Parar Simulação';
    }

    animationRunning = !animationRunning;
});

//Utils
//====================================================================

function getRandomFloatInclusive(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function distanceBetweenTwoPoints(point1, point2) {
    return Math.sqrt((Math.pow(point2.x - point1.x, 2)) + (Math.pow(point2.y - point1.y, 2)));
}