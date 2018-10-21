var game;
window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        width: 900,
        height: 450,
        scene: [Game],
        physics: {
            default: "matter",
            matter: {
                debug: true
            }
        }
    };
    game = new Phaser.Game(config);
}

class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.resize();
        this.load.image('wall', './wall.png');
        this.load.image('ball', './ball.png');
        this.load.image('leftspike', './leftspike.png');
        this.load.image('rightspike', './rightspike.png');
    }

    create() {
        this.matter.add.image(10, this.sys.game.config.height / 2, 'wall', null, {
            isStatic: true,
            label: 'leftwall',
        });
        this.matter.add.image(this.sys.game.config.width - 10, this.sys.game.config.height / 2, 'wall', null, {
            isStatic: true,
            label: 'rightwall',
        });
        const leftSpikePath = this.matter.world.fromPath('-45 -35 45 0 -45 35');
        const rightSpikePath = this.matter.world.fromPath('-45 0 45 35 45 -35');
        this.leftSpike = this.matter.add.image(50, Phaser.Math.Between(50, this.sys.game.config.height - 50), 'leftspike', null, {
            isStatic: true,
            shape: {
                type: 'fromVerts',
                verts: leftSpikePath,
            },
            label: 'spike',
        });
        this.rightSpike = this.matter.add.image(this.sys.game.config.width - 50, Phaser.Math.Between(50, this.sys.game.config.height - 50), 'rightspike', null, {
            isStatic: true,
            shape: {
                type: 'fromVerts',
                verts: rightSpikePath,
            },
            label: 'spike',
        });
        this.ball = this.matter.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'ball');
        this.ball.setCircle();
        this.ball.setVelocity(7, 0);
        this.ball.setBounce(1);
        this.ball.setFriction(0);
        this.input.on('pointerdown', this.jump, this);
        this.matter.world.on('collisionstart', function (e, b1, b2) {
            if (b1.label === 'spike' || b2.label === 'spike') {
                this.scene.start('PlayGame');
            }
            if (b1.label === 'leftwall' || b2.label === 'leftwall') {
                this.rightSpike.y = Phaser.Math.Between(50, this.sys.game.config.height - 50);
                this.ball.setVelocity(7, 0);
            }
            if (b1.label === 'rightwall' || b2.label === 'rightwall') {
                this.leftSpike.y = Phaser.Math.Between(50, this.sys.game.config.height - 50);
                this.ball.setVelocity(-7, 0);
            }
        }, this);
    }

    jump() {
        this.ball.setVelocityY(-10);
    }

    update() {
        if (this.ball.y > this.sys.game.config.height || this.ball.y < 0) {
            this.scene.start('PlayGame');
        }
    }

    resize() {
        var game = this.sys.game
        var config = this.sys.game.config
        function resize() {
            var w = window.innerWidth;
            var h = window.innerHeight;
            var scale = Math.min(w / config.width, h / config.height);

            game.canvas.setAttribute('style',
                ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' +
                ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' +
                ' transform-origin: top left;'
            );
            var width = w / scale;
            var height = h / scale;
            game.resize(width, height);
            game.scene.scenes.forEach(function (scene) {
                scene.cameras.main.setViewport(0, 0, width, height);
            });
        }
        window.addEventListener('resize', resize);
        if(game.isBooted) resize();
        else game.events.once('boot', resize);
    }
}
