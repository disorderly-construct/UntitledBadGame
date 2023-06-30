class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
        this.keys = ['W', 'A', 'S', 'D'];
    }

    preload() {
        // Path to the image assets.
        const assetsPath = 'assets/images/cozyPeople/firstChar/';
        const directions = ['Down', 'Right', 'Up', 'Left'];
        directions.forEach(direction => {
            this.load.spritesheet(`char${direction}`, `${assetsPath}${direction}/char${direction}.png`, {
                frameWidth: 32,
                frameHeight: 32
            });
        });
    
        this.load.image("farmGlobal", "./src/tiledResources/cozyFarm/full version/global.png");
        this.load.image("global", "src/tiledResources/cozyTown/town full/global.png");
        this.load.tilemapTiledJSON("map", "./src/mainMap.json");
    }
    
    create() {
        // Add key listeners for WASD keys.
        this.cursors = this.input.keyboard.addKeys('W,A,S,D');
        
    
        const map = this.make.tilemap({key: "map", tileWidth: 16, tileHeight: 16});
        const tilesetFarmGlobal = map.addTilesetImage("farmGlobal");
        const tilsetCozyTownGlobal = map.addTilesetImage("global");
    
        this.Ground = map.createLayer("Ground", tilesetFarmGlobal);
        this.Fences = map.createLayer("Fences", tilsetCozyTownGlobal);
        map.setCollisionByProperty({ collides: true });
        this.player = new Player(this, 30*16, 23*16);
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        map.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        // Use an appropriate property here instead of 0, 6100
        map.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.Fences);
    }
    
    update() {
        this.player.update(this.cursors);
    }
    
}
