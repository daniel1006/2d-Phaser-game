export default class Enemies extends Phaser.Physics.Matter.Sprite {
       constructor(scene, x, y, key, type) {
        super(scene, x, y, key, type);
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.enemy = this.scene.physics.add.sprite(x, y, 'bandit');
}
    


    static preload(scene) {
        scene.load.atlas('bandit', 'assets/images/bandit.png', 'assets/images/bandit_atlas.json');
        scene.load.animation('bandit_anim', 'assets/images/bandit_anim.json', )
    }
   
}