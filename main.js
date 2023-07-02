var config = {
    type: Phaser.CANVAS,
    parent: 'game-wrapper',
    width: 1280 * 1.5,
    height: 720 * 1.5,
    antialias: false, // Disable antialiasing for sprite graphical issue
    physics: {
        default: 'matter',
        matter: {
            gravity: {y:0},
            debug: true
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Scene1]
};


var game = new Phaser.Game(config);

function preload() {
    
}

function create() {
    
}

function update() {
}