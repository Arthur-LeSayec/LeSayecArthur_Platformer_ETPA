var player;
var cursors;
var gravite;
var etatgravite = 0;
var position_x = 155;
var position_y = 992;
var invincible=false;
var compteur = 120; 
var playerPdv=5;
var gameOver = false;
var scorevie;
var spike;
var ennemi;
var ennemi_01;
var agro_ennemi_01 = false;
var etat_ennemi_01 = true;
var vaDroite= true;
var parallax1;
var collectible1;
var collectibles1;
var ScoreBillet;
var billet = 0;
var timedEvent;
var text;
var chronoText;
var monTimer;
var chrono=0;
var bouton_stop_resume;
var bouton_reset;
var stopped = false;
var narrato;
var gameStarted = false;
var tutoChrono;
var credit;
var imageVie;
var musiqueFond;


class Scene_jeu extends Phaser.Scene{
    constructor(){
        super("Scene_jeu");
    }
    init(data){}
    
 



preload ()
{
    this.load.spritesheet('player', 'assets/images/spritesheet_perso.png', { frameWidth: 65, frameHeight: 64 });
    this.load.image('tuiles', 'assets/tilesets/tilesheet2.png');
    this.load.tilemapTiledJSON('carte', 'assets/tilemaps/map.json');
    this.load.image('ciel', 'assets/images/ciel_1.png');
    this.load.image('ville', 'assets/images/ville.png');
    this.load.image('billet', 'assets/images/billet.png');
    this.load.image('ennemi', 'assets/images/ennemi.png');
    this.load.image('intro', 'assets/images/intro.png')
    this.load.image('chrono', 'assets/images/chrono.png')
    this.load.spritesheet('vie', 'assets/images/spritesheet_vie.png', { frameWidth: 12, frameHeight: 32 });
    this.load.audio('musique','assets/images/musique_fond.mp3');
    
}



create ()
{
    
    
    parallax1 = this.add.image (10,10, 'ciel').setScrollFactor(0.1);
    parallax1 = this.add.image (50,600, 'ville').setScrollFactor (0.5).setOrigin(0);
    const map = this.make.tilemap({key: 'carte'});
    const tileset = map.addTilesetImage('tilesheet2', 'tuiles')
    const bloquant = map.createLayer('platform', tileset, 0,0);
    const fond = map.createLayer ('fond', tileset, 0,0);
    const fleches = map.createLayer ('fleches', tileset, 0,0);
    const spike = map.createLayer ('spike', tileset, 0,0);
    const collectibleObject = map.getObjectLayer('collectible').objects;
    
    
    //musique
    this.musique = this.sound.add("musique");

        var musicConfig = {
            mute : false,
            volume : 0.2,
            rate : 1.2,
            deturne : 0,
            seek : 0,
            loop : true,
            delay : 0,

        }
    this.musique.play(musicConfig)
    
    
    
    
    bloquant.setCollisionByExclusion(-1, true);
    spike.setCollisionByExclusion (-1, true);
    
    
    ennemi_01 = this.physics.add.sprite(8656,1810 , 'ennemi').setScale(1.5);
    ennemi_01.body.setAllowGravity(false);
    
    
    collectibles1 = this.physics.add.group({
    });
     for (const collectible1 of collectibleObject) {
        collectibles1.create(collectible1.x, collectible1.y, 'billet')
    }  
    
    player = this.physics.add.sprite(position_x, position_y, 'player');
    player.setMaxVelocity(1500, 1500);
    
    cursors = this.input.keyboard.createCursorKeys();

    
    //camera
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, 32000, 1920);
    this.cameras.main.zoom = 0.7;
    
    
    //animation
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
        frameRate: 20,
        repeat: -1,
        });
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
        frameRate: 20,
        repeat: -1,
        });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 10 } ],
        frameRate: 20
        });
    
    //collider
    this.physics.add.collider(player, bloquant);
    this.physics.add.collider(ennemi_01, bloquant);
    this.physics.add.collider(player, spike, hitSpike, null, this);
    
    
    
    this.physics.add.collider(player, ennemi_01,hitEnnemi, null, this);
    
    
    this.physics.add.overlap(player, collectibles1, collecteBillet, null, this);
    
    
    function kill(player,ennemi_01){
    
        
    }

    
    //perd PV
    function hitSpike(player, spike){
        perdPdv()
    }
    function hitEnnemi(player, ennemi_01){
        
        if (player.body.touching.down && ennemi_01.body.touching.up){
            ennemi_01.destroy(true,true);
            etat_ennemi_01 = false;
        }
        else{
            if(invincible == false){
                playerPdv -= 1;
                ennemi_01.destroy(true,true);
                etat_ennemi_01 = false
                scorevie.setText("Vie"+playerPdv)
            }
                invincible = true;
        }
    }

    
    //collecte billet
    
    this.add.image(900,-55, 'billet').setScrollFactor(0);
    ScoreBillet = this.add.text(950, -75, ScoreBillet, {fontStyle: "bold", fontSize: '32px', fill: '#000797' }).setScrollFactor(0) ;
    
        
    
    function collecteBillet(player,collectible1){
            collectible1.destroy();
            billet +=  1;

            ScoreBillet.setText("X" +billet);
    }
    
    imageVie= this.physics.add.sprite(-110,-30, 'vie').setScrollFactor(0).setScale(3);
    imageVie.body.allowGravity = false
    this.anims.create({
        key: 'vie1',
        frames: [{key:'vie',frame:4}],
        frameRate: 20,
        });
    
        this.anims.create({
        key: 'vie2',
        frames: [{key:'vie',frame:3}],
        frameRate: 20,
        });
    
        this.anims.create({
        key: 'vie3',
        frames: [{key:'vie',frame:2}],
        frameRate: 20,
        });
    
        this.anims.create({
        key: 'vie4',
        frames: [{key:'vie',frame:1}],
        frameRate: 20,
        });
    
        this.anims.create({
        key: 'vie5',
        frames: [{key:'vie',frame:0}],
        frameRate: 20,
        });
    

    
    
    
    
    
    
    
    
    /* Inputs */

    cursors = this.input.keyboard.createCursorKeys();
    gravite = this.input.keyboard.addKeys('F');
    
    /*hitbox*/
    player.body.setSize(42, 64, true);
    player.body.setOffset(15,0);
    
    ennemi_01.body.setSize(35, 40, true);
    ennemi_01.body.setOffset(15,20);
    
    
    
    
    
    //affiche vie
    scorevie = this.add.text(-1000, -1000, playerPdv, { fontStyle: "bold",fontSize: '32px', fill: '#000797' }).setScrollFactor(0);
    
    
    //timer
    
    monTimer = this.time.addEvent({
      delay: 1000,
      callback: compteUneSeconde,
      callbackScope: this,
      loop: true
    });  
    
    chronoText = this.add.text(300, -75, "Temps: 0", {
    fontStyle: "bold",
    fontSize: "32px",
    fill: "#000797" //Couleur de l'écriture
    });
    chronoText.setScrollFactor(0);
    
    bouton_stop_resume = this.input.keyboard.addKey("S");
    bouton_reset = this.input.keyboard.addKey("R");
    

        //tuto chrono
    tutoChrono = this.add.image(250, 700, 'chrono').setInteractive().setOrigin(0);
        
    tutoChrono.on('pointerdown', function(){
        tutoChrono.destroy();
        gameStarted = true;
    }); 
    //narrato
    
    narrato = this.add.image(-20, 640, 'intro').setInteractive().setOrigin(0).setScale(1.5);
        
    narrato.on('pointerdown', function(){
        narrato.destroy();
        gameStarted = true;
    }); 
    

    
   
}
    

update ()
{
  
    if (playerPdv ==5){
        imageVie.anims.play('vie1',true);
    }
    if (playerPdv ==4){
        imageVie.anims.play('vie2',true);
    }
    if (playerPdv ==3){
        imageVie.anims.play('vie3',true);
    }
    if (playerPdv ==2){
        imageVie.anims.play('vie4',true);
    }
    if (playerPdv ==1){
        imageVie.anims.play('vie5',true);
    }

    
    
    if(etat_ennemi_01 == true){
        if (player.x - ennemi_01.x <481 && player.x - ennemi_01.x > 32 && ennemi_01.y - player.y < 321 && ennemi_01.y - player.y > -64){
            ennemi_01.setVelocityX(200);
        }
        else {
            ennemi_01.setVelocityX(0);
        }
    }
    /*Mouvement personnage*/

    if (cursors.right.isDown)
        
    {
        player.anims.play("right", true);
        player.setVelocityX(1000);
        player.setFlipX(false);
    }
    
    else if (cursors.left.isDown)
    {
        player.anims.play("left", true);
        player.setVelocityX(-1000);
        player.setFlipX(true);
    }

    else
    {
        player.anims.play("turn", true);
        player.setVelocityX(0); 
    }
    
    
    if (gameStarted == false) {
        this.physics.pause();
    } 
    else if (gameStarted == true){
        this.physics.resume();
    }  
    




    

    const inversion = Phaser.Input.Keyboard.JustDown(gravite.F);

    if (etatgravite === 0)
        {
            player.setVelocityY(2000);
            player.setFlipY(false)
        }
        else if (etatgravite === 1)
        {
            player.setVelocityY(-2000);
            player.setFlipY(true)
        }
    
    if (inversion)
    {
        if (etatgravite === 0)
        {
            player.setVelocityY(2000);
            etatgravite = 1;
            player.setFlipY(false)
        }
        else if (etatgravite === 1)
        {
            player.setVelocityY(-2000); 
            etatgravite = 0;
            player.setFlipY(true)
        }
    }
    
    


    
    
    //invulénrabilité
    
     if(invincible == true){ 
            compteur-- ;
            if ((compteur)%15 <8)
                {
                    player.setVisible(true);
                }
            else {
                player.setVisible(false);
            }
            if(compteur == 0){
                compteur = 120;
                invincible = false;
            }
            player.setTint(0xff0000)
         
        } 
        else player.setTint(0xffffff)

    
    if(playerPdv <1 ){
                gameOver = true;
                this.physics.pause();
                this.add.text(300, 200, "GAME OVER", { fontStyle: "bold",fontSize: '50px', fill: '#000797' }).setScrollFactor(0);
                this.add.text(180, 250, "Pressez F5 pour recommencer", { fontStyle: "bold",fontSize: '32px', fill: '#000797' }).setScrollFactor(0);
            }
    
//timer
    
    // reset du chrono (bouton R)
if (Phaser.Input.Keyboard.JustDown(bouton_reset)) {
   chrono = 0;
   chronoText.setText("Temps: " + chrono);
   monTimer.reset({ delay:1000, callback: compteUneSeconde, callbackScope: this,
                  loop: true});
}

// pause / reprise (bouton S)
if (Phaser.Input.Keyboard.JustDown(bouton_stop_resume)) {
   if (stopped == false) {  // on stoppe le timer
   monTimer.reset({ paused: true });
   stopped = true; // on met a jour le booleen
   } else {
   monTimer.reset({ delay:1000, callback: compteUneSeconde, callbackScope: this,
                  loop: true});
   stopped = false; // on met a jour le booleen
}     
}




if (player.x >31884){
        this.scene.start("Scene_credit");
}


    
}
}


function perdPdv(){ // si le joueur touche un monstre il perd un point de vie //
    
    if(invincible == false){
        playerPdv -= 1;
        scorevie.setText("Vie"+playerPdv)
    }
    invincible = true;
    
}
function compteUneSeconde () {
    chrono= chrono+1; // on incremente le chronometre d'une unite
    chronoText.setText("Temps: "+ chrono);
}  


