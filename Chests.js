export default class Chests extends Phaser.Physics.Matter.Sprite {
    static preload(scene) {
        scene.load.atlas('chests', 'assets/images/chests.png', 'assets/images/chests_atlas.json')
    }

    constructor(data) {
        let { scene,chest } = data;
        super(scene.matter.world,chest.x,chest.y, 'chests',chest.type),
        this.scene.add.existing(this);

        const { Body,Bodies } = Phaser.Physics.Matter.Matter;
            var circleCollider = Bodies.circle(this.x,this.y,12,{isSensor:false,label:'collider'});
            this.setExistingBody(circleCollider);
            this.setStatic(true); 
    }
}