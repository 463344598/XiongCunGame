import {Container} from "pixi.js";
import {getAnimation, load, createSprite,getTexture,getSound} from '../../loader';
const pixi_sound = require('pixi-sound');

class audioBg extends window.jl.init{
    constructor(stage,objGlobal) {
        super();
        this.audioCon=stage.getChildByName("audioCon");
        this.audio1=this.Ps("image_audio1").imagesPX('image_audio1',false, 1750,44, this.audioCon, 0, 0, 1);
        this.audio2=this.Ps("image_audio2").imagesPX('image_audio2',false, 1750,44, this.audioCon, 0, 0, 0);
       // this.sound1= PIXI.sound.Sound.from('./static/assets/audios/bg.mp3').play({loop: true})
        this.sound= this.Pm('audio_bg',true);
    }
    click() {

        this.sound.volume=0.28;
        let _this=this;
        this.audio1.interactive = true;
        this.audio1.buttonMode = true;
        this.audio1.on('pointerdown',function(){
            _this.audio1.interactive = false;
            _this.audio1.buttonMode = false;
            _this.audio2.interactive = true;
            _this.audio2.buttonMode = true;
            _this.audio1.alpha=0;
            _this.audio2.alpha=1;
            PIXI.sound.muteAll()

            console.log(_this.sound);
        })

        this.audio2.on('pointerdown',function(){
            _this.audio1.interactive = true;
            _this.audio1.buttonMode = true;
            _this.audio2.interactive = false;
            _this.audio2.buttonMode = false;
            _this.audio1.alpha=1;
            _this.audio2.alpha=0;
            PIXI.sound.unmuteAll()
        })
    }
}
export default audioBg;