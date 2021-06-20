class Scene_credit extends Phaser.Scene{
    constructor(){
        super("Scene_credit");
    }
    init(data){}
    
    

preload(){
    this.load.image('credit', "assets/images/credit.png");
}
    

create(){
    this.add.image(0,0, 'credit').setOrigin(0);
}

    
update(){

}
}