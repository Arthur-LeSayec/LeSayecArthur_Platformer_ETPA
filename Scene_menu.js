var jouer1
var jouer2

class Scene_menu extends Phaser.Scene{
    constructor(){
        super("Scene_menu");
    }
    init(data){}
    

    


preload(){
    this.load.image('menu', "assets/images/menu.png");
    this.load.image('jouer1', "assets/images/jouer_nor.png");
    this.load.image('jouer2', "assets/images/jouer_bo.png");
    
}
    
    
create(){
    this.add.image(10,10, 'menu').setOrigin(0);
    
    jouer1 = this.physics.add.sprite(448,386,'jouer1').setInteractive();
        jouer1.body.setAllowGravity(false);
        jouer1.body.immovable = true;
        jouer1.setCollideWorldBounds(true);

        jouer2 = this.physics.add.sprite(448,400,'jouer2').setAlpha(0).setInteractive();
        jouer2.body.setAllowGravity(false);
        jouer2.body.immovable = true;
        jouer2.setCollideWorldBounds(true);

        jouer1.on('pointerover', function (pointer) {

            jouer1.setAlpha(0);
            jouer2.setAlpha(1);
    
        });
        

        jouer1.on('pointerout', function (pointer) {

            jouer1.setAlpha(1);
            jouer2.setAlpha(0);
    
        });

        jouer2.on('pointerover', function (pointer) {

            jouer1.setAlpha(0);
            jouer2.setAlpha(1);
    
        });
        

        jouer2.on('pointerout', function (pointer) {

            jouer1.setAlpha(1);
            jouer2.setAlpha(0);
    
        });

        jouer2.on('pointerup', function () {
            this.scene.start("Scene_jeu");
        }, this);
    
}
    
    
    
update(){
    
    
}
}