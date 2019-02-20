import {createSprite, getAnimation} from "../../loader";
const pixiSound = require('pixi-sound');
import {TweenLite, TimeLine, TweenMax} from 'gsap';
let self;
export default class Time extends window.jl.init{
    constructor(stage,objGlobal,gameSelf) {
        super();
        this.stage=stage;
        this.objGlobal=this.GLOBAL_OBJ;
        this.gameSelf=gameSelf;
        this.sum1=gameSelf.globalApi.bear1.sum+gameSelf.globalApi.big_bear2.sum;

        this.selfTime='';
        self=this;
        this.run();
    }
    run(){
        this.gameSelf.timeName= setInterval(() => {

            /**
             * end结果判定
             */
            this.gameSelf.atLast(this.sum1);

            this.gameSelf.timeApi--;
            this.objGlobal.contentGame.timeNum=this.gameSelf.timeApi;
            if (this.gameSelf.timeApi == 1) {
               // this.gameSelf.btnStatus();
            }
            if (this.gameSelf.timeApi == 0) {
               // this.gameSelf.generalAn.alpha=1;
                //this.alphaCon1(0,this.gameSelf.maskGg1,.8);
                this.gameSelf.btnStatus();
                this.gameSelf.globalEnd=true;
                this.gameSelf.timeOver();
                clearInterval(this.gameSelf.timeName);
            }
            self.timex();
        }, 1000)
        self.timex();
    }
    timex() {
      /*  var m = parseInt(this.timeNum / 60);
        var s = parseInt(this.timeNum % 60);
        this.selfTime = s+'';
        this.selfTime = m + ':' + self.toDub(s);*/
        setTimeout(()=>{
           // self.gameSelf.timeT.text = this.selfTime;
           self.gameSelf.timeText.text = this.gameSelf.timeApi+''
        },0);
    }
    toDub(n) {
        return n < 10 ? "0" + n : "" + n;
    }
}