export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let{ scene,x,y,texture,frame } = data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

  //this.scene.input.on('pointer',pointer => this.anims.play('strongAttack'),pointer.worldX );
  
        const { Body,Bodies } = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x,this.y,12,{isSensor:false,label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x,this.y,24,{isSensor:true,label:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider,playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }
  
    static preload(scene) {
        scene.load.atlas('knight', 'assets/images/knight.png', 'assets/images/knight_atlas.json');
        scene.load.animation('knight_anim', 'assets/images/knight_anim.json');
        scene.load.spritesheet('items', 'assets/images/items.png',{frameWidth:32,frameHeight:32});
    }

    get velocity() {
        return this.body.velocity;
    }

    update() {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
         if(this.inputKeys.left.isDown) {
            playerVelocity.x = -1; 
            
             if (this.inputKeys.left.isDown) {
                this.setFlipX(this.velocity.x < -1); 
            } 
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }
            if (this.inputKeys.right.isDown) {
                this.setFlipX(this.velocity.x < 1); 
        }
        if(this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x,playerVelocity.y);
        if(Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play('knight_run',true);
        } else {
            this.anims.play('knight_idle',true);    
        } 
        if(this.inputKeys.strongAttack.isDown) {  // This is the attack function that would trigger the animation.
            this.anims.play.('strongAttack',false) // false means that it won't loop and should only play through animation once.
        }
    }
}

