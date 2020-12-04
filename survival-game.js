import MainScene from './MainScene.js'

const config = {
    width: 700,
    height:560,
    backgroundColor: '#ff1493',
    type: Phaser.AUTO,
    parent: 'survival-game',
    scene:[MainScene],
    scale: {
       zoom:2,
    },
    physics: {
        default: 'matter',
        matter: {
            debug:true,
            gravity:{y:0}
      }
    },
    plugins: {
        scene:[
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
}

new Phaser.Game(config);