import Player from "./Player.js";
import Enemies from "./Enemies.js";
import Chests from "./Chests.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
    preload() {
        Player.preload(this);
        Chests.preload(this);
        this.load.image('tiles', 'assets/images/addwork.png');
        this.load.tilemapTiledJSON('map', 'assets/images/RPGmap.json')
    }

    create() {
        const map = this.make.tilemap({key: 'map'});
        this.map = map;
        const tileset = map.addTilesetImage('addwork', 'tiles', 32,32,0,0);
        const layer1 = map.createStaticLayer('Tile Layer 1', tileset,0,0);
        const layer2 = map.createStaticLayer('Tile Layer 2', tileset,0,0);
        layer1.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(layer1);
    
        this.addChests();
        
        this.player = new Player({scene:this,x:100,y:100,texture:'knight', frame: 'knight.png'});
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            strongAttack: Phaser.Input.Keyboard.KeyCodes.J,
        });
       
         this.cameras.main.startFollow(this.player); 

    }

    addChests(){
        const chests = this.map.getObjectLayer('chests');
        chests.objects.forEach(chest => {
            let chestItem = new Chests({scene:this,chest});       
        })
    }
    
    update() {
        this.player.update();
    }
}