class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
        this.keys = ['W', 'A', 'S', 'D'];
    }

    preload() {
        // Path to the image assets.
        const assetsPath = 'assets/firstChar/';
        const directions = ['Down', 'Right', 'Up', 'Left'];
        directions.forEach(direction => {
            this.load.spritesheet(`char${direction}`, `${assetsPath}${direction}/char${direction}.png`, {
                frameWidth: 32,
                frameHeight: 32
            });
        });
        
        this.load.tilemapTiledJSON("map", "./src/mainMap1_1.json");
        this.load.image("bat_all", "src/tiledResources/cozyFarm/full version/enemies/bat/bat_all.png")
        this.load.image("farmGlobal", "./src/tiledResources/cozyFarm/full version/global.png");
        this.load.image("global", "./src/tiledResources/cozyTown/town full/global.png");
        this.load.image("Nature_global_shadow", "src/tiledResources/cozyNature/nature full/global_shadow.png");
    }
    
    create() {
        // Add key listeners for WASD keys.
        this.cursors = this.input.keyboard.addKeys('W,A,S,D');
        
        const map = this.make.tilemap({key: "map"});
        const batAll = map.addTilesetImage("bat_all");
        const tilesetFarmGlobal = map.addTilesetImage("farmGlobal");
        const tilsetCozyTownGlobal = map.addTilesetImage("global");
        const nature = map.addTilesetImage("Nature_global_shadow");
        this.B1 = map.createLayer("B1", [tilesetFarmGlobal, tilsetCozyTownGlobal]);
        this.Ground = map.createLayer("Ground", [tilesetFarmGlobal, tilsetCozyTownGlobal]);
        this.Lv2 = map.createLayer("Lv2", [tilesetFarmGlobal, tilsetCozyTownGlobal]);
        this.Lv3Collides = map.createLayer("Lv3Collides", [tilesetFarmGlobal, tilsetCozyTownGlobal]);
        this.Lv4Collides = map.createLayer("Lv4Collides", [tilesetFarmGlobal, tilsetCozyTownGlobal]);
        this.B1.setScale(1.5);
        this.Ground.setScale(1.5);
        this.Lv2.setScale(1.5);
        this.Lv3Collides.setScale(1.5);
        this.Lv4Collides.setScale(1.5);
        
        map.setCollisionByProperty({ collides: true });
        
        this.player = new Player(this, 30*16, 23*16);
        this.player.setFixedRotation();
        this.player.setFriction(0);
        this.Lv3Collides.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(this.Lv3Collides);
        this.Lv4Collides.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(this.Lv4Collides);
        
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        map.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }
    
    update() {
        this.player.update(this.cursors);
    }
    
}
