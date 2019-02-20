import {createSprite, getAnimation, getSound} from "../../loader";
const pixiSound = require('pixi-sound');
import {TweenLite, TimeLine, TweenMax} from 'gsap';
import COURSEUI from "./course";
import TIMEUI from './time';
import {AnswerInfo,Loading,Question} from 'xes-answer';
let self;
export default class GAME extends window.jl.init {
    constructor(stage, objGlobal) {
        super();
        this.gameCon=stage.getChildByName("gameCon");
        this.audioCon=stage.getChildByName("audioCon");
        this.gameConBox=this.gameCon.getChildByName("gameConBox");
        this.EndCon=stage.getChildByName("EndCon");

        this.maskGg1;
        this.stage=stage;
        this.globalApi=this.GLOBAL_OBJ.contentGame;
        this.global=this.GLOBAL_OBJ;
        this.moveNum=1;
        this.moveNump=0;
        this.api={
            timeApi:this.globalApi.timeNum,
            scoreApi:this.globalApi.score,
            timeApiEnd:this.globalApi.timeNum,
            timeName:this.globalApi.timeName,
            courseX:this.globalApi.courseX,
            sum1:this.globalApi.bear1.sum,
            sum2:this.globalApi.big_bear2.sum,
            speed:this.globalApi.robotSpeed,
            "data":[]
        }
        this.scoreApi=this.globalApi.score;
        this.timeApi=this.globalApi.timeNum;
        this.timeApiEnd=this.globalApi.timeNum;
        this.timeName=this.globalApi.timeName;
        this.courseX=this.globalApi.courseX;
        this.sum1=this.globalApi.bear1.sum;
        this.sum2=this.globalApi.big_bear2.sum;
        this.speed=this.globalApi.robotSpeed;
        this.statusFind=false;
        this.findArr1=[];
        this.findArr2=[];
        this.sumHoney=null;
        this._score=0;
        this.sub1=0;
        this.sub2=0;
        this.score=0;
        this.topic=0;
        this.stopStatus1=false;
        this.stopStatus2=false;
        this.statusEnd=0;
        this.robotGlobal=false;
        this.fn=null;
        this.xnum=0;
        this.statusx1=true;
        this.statusx2=true;
        this.stopX;
        this.globalEnd=false;
        self=this;
        this.game();
    }
    game(){

        /**
         * 游戏入口
         */
        this.gameBox();
    };
    gameBox(){
        new TIMEUI(self.stage,self.objGlobal,self);
        this.globalApi.data.forEach((item)=>{
            this.api.data.push({
                "honey":item.honey
            })
        });
        this.globalApi.data.forEach((item)=>{
            this.sumHoney+=item.honey;
        });
        this.bg=this.Ps("image_gameBg").imagesPX('image_gameBg',false, 0,0, this.gameConBox, 0, 0, 1);
        this.time=this.Ps("image_time").imagesPX('image_time',false, 1596,31, this.gameConBox, 0, 0, 1);
        this.topicBox=this.Ps("image_topicBox").imagesPX('image_topicBox',false, 55,31, this.gameConBox, 0, 0, 1);
        //this.topicNum=this.Pt("12",this.global.style.topicNum).imagesPX('topicText',false, 190,105, this.gameConBox, .5, 1, 1);
       // this.topicText=this.Pt("12/100",this.global.style.topic).imagesPX('topicText',false, 266,84, this.gameConBox, 0.5, 0.5, 1);
        this.topicText=this.Pt(this.score+"/"+this.sumHoney,this.global.style.topic).imagesPX('topicText',false, 240,84, this.gameConBox, 0.5, 0.5, 1);
        this.timeText=this.Pt(this.timeApi,this.global.style.topic).imagesPX('timeText',false, 1771,83, this.gameConBox, 0.5, 0.5, 1);
        this.Castle=getAnimation('animation_castle').spineAnimation('animation_castle',false,960,427,this.gameConBox,'',1,false,1,1,1);
        this.Castle.state.setAnimation(1,'castle_open',false).timeScale=0;

        this.Castle.skeleton.setAttachment('digital',this.globalApi.data[this.topic].honey);
        this.gameInit();
        this.CastleFn();
        this.pit=this.Ps("image_pit").imagesPX('image_pit',false, 1366,329, this.gameConBox, 0, 0, 1);

        this.robot1=this.Ps("image_alpha").imagesPX('alpha1',false, 344,480, this.gameConBox, 0, 0, 1);
        this.robot1.just=getAnimation('animation_robot1').spineAnimation('animation_robot1',false,0,0,this.robot1,'',1,false,1,1,0);
        this.robot1.turn=getAnimation('animation_robot2').spineAnimation('animation_robot1',false,0,0,this.robot1,'',1,false,1,1,0);
        this.robot1.just.state.setAnimation(1,'robot_attack',false).time=35/30;
        this.robot1.just.skeleton.filpX=false;
        this.robot1.robotStatus=true;


        this.robot2=this.Ps("image_alpha").imagesPX('alpha2',false, 1591,480, this.gameConBox, 0, 0, 1);
        this.robot2.just=getAnimation('animation_robot1').spineAnimation('animation_robot2',false,0,0,this.robot2,'',1,false,1,1,0);
        this.robot2.turn=getAnimation('animation_robot2').spineAnimation('animation_robot2',false,0,0,this.robot2,'',1,false,1,1,0);
        this.robot2.just.state.setAnimation(1,'robot_attack',false).time=35/30;
        this.robot2.just.skeleton.flipX=true;
        this.robot2.robotStatus=true;




        // this.robot2=getAnimation('animation_robot1').spineAnimation('animation_robot2',false,1591,480,this.gameConBox,'',1,false,1,1,1);
        // this.robot2.state.setAnimation(0,'robot_attack',false).time=35/30;
        // this.robot2.skeleton.flipX=true;
        this.grass1=getAnimation('animation_grass1').spineAnimation('grass1',false,431,910,this.gameConBox,'',1,false,1,1,1);
        this.grass1.state.setAnimation(1,'grass_click',false).time=13/30;
        this.grass1.skeleton.setAttachment('digital',self.globalApi.bear1.sum);

        this.grass2=getAnimation('animation_grass2').spineAnimation('grass2',false,1548,950,this.gameConBox,'',1,false,1,1,1);
        this.grass2.state.setAnimation(1,'click',false).time=13/30;
        this.grass2.skeleton.setAttachment('digital',self.globalApi.big_bear2.sum);
        this.tips1=this.Ps("image_tips1").imagesPX('tips1',false, 303,926, this.gameConBox, 0, 0, 1);

        this.tips2=this.Ps("image_tips2").imagesPX('tips2',false, 1420,926, this.gameConBox, 0, 0, 1);
        this.grassClick();
        this.grassStop1=this.Ps("image_grassStop").imagesPX('image_grassStop',false, 128,706, this.gameConBox, 0, 0, 1);
        this.grassStop2=this.Ps("image_grassStop").imagesPX('image_grassStop',false, 1286,673, this.gameConBox, 0, 0, 1);
        self.button(self.grassStop1,false);
        self.button(self.grassStop2,false);
        /**
         * 结果页面end ，排版。
         */

        this.maskGg1=this.maskBg(this.maskGg1, this.EndCon, .5);
        this.maskGg1.alpha=0;
        this.failAn=getAnimation('animation_fail').spineAnimation('animation_fail',false,970,545,this.EndCon,'',1,false,1,1,0);
        this.winAn=getAnimation('animation_win').spineAnimation('animation_win',false,970,545,this.EndCon,'',1,false,1,1,0);
        this.generalAn=getAnimation('animation_general').spineAnimation('animation_general',false,970,545,this.EndCon,'',1,false,1,1,0);
        this.closeBtn=this.Ps("image_close").imagesPX('image_close',false, 1774,36, this.EndCon, 0, 0, 0);
        this.againBtn=this.Ps("image_again").imagesPX('image_again',false, 763,872, this.EndCon, 0, 0, 0);



        /**
         * 机器人移动 ———————— 本身，  数据json， 全局变量， 全局第二变量， 速度；
         */

        new this.robotMove(this.robot1,this.globalApi.robotPos1,this.moveNum,this.moveNump,this.speed,0);
        new this.robotMove(this.robot2,this.globalApi.robotPos2,this.moveNum,this.moveNump,this.speed,0);

        this.wacth();
    };

    /**
     * game 初始化 数据 ;
     */
    gameInit(num){
        if(num==this.globalApi.data.length){
            console.log('游戏技术');
            return;
        }
        this.sub1=this.globalApi.data[this.topic].honey;
        this.sub2=this.globalApi.data[this.topic].honey;
        this.Castle.skeleton.setAttachment('digital',this.globalApi.data[this.topic].honey);
        this.spineHoneyPic();
    }

    /**
     * 城堡出蜂蜜
     */

    CastleFn(){
        self.Pm('audio_Door',false);
        this.Castle.state.setAnimation(1,'castle_open',false,function(){
            self.button(self.grassStop1,true);
            self.button(self.grassStop2,true);
        });
    }

    /**
     * 往熊，数组传值
     */
    bearArr1(bear2){
        self.findArr1.push(bear2);
    }
    /**
     * 往熊，数组传值
     */
    bearArr2(bear2){
        self.findArr2.push(bear2);
    }
    /**
     * 金币添加
     */
    addScore(num){
        this._score+=num;
        this.topicText.text=this._score+'/'+this.sumHoney;
    }



    /**
     * 草丛数值变换，
     */
    grassNum(bear,math){
       if(bear){
           if(math){

               if(self.globalApi.bear1.sum==self.sum1){
                   self.globalApi.bear1.sum=self.sum1-1;
               }
               self.globalApi.bear1.sum++;
               self.grass1.skeleton.setAttachment('digital',self.globalApi.bear1.sum);

               //console.log(self.globalApi.bear1.sum);
           }else{
               if(self.globalApi.bear1.sum==0){
                   self.globalApi.bear1.sum=1;
               }
               self.globalApi.bear1.sum--;

               //console.log(self.globalApi.bear1.sum);
               self.grass1.skeleton.setAttachment('digital',self.globalApi.bear1.sum);
           }
       }else{
           if(math){
               if(self.globalApi.big_bear2.sum==self.sum2){
                   self.globalApi.big_bear2.sum=self.sum2-1;
               }

               self.globalApi.big_bear2.sum++;
               self.grass2.skeleton.setAttachment('digital',self.globalApi.big_bear2.sum);
           }else{
               if(self.globalApi.big_bear2.sum==0){
                   self.globalApi.big_bear2.sum=1;
               }

               self.globalApi.big_bear2.sum--;
               self.grass2.skeleton.setAttachment('digital',self.globalApi.big_bear2.sum);
           }
       }



    }
    /**
     * 点击草丛
     */
    grassClick(){

        this.button(this.grass1,true);
        this.button(this.tips1,true);
        this.grass1.state.setAnimationPX(1,'grass_idle',true);
        this.grass1.on('pointerdown',runBear1);
        this.tips1.on('pointerdown',runBear1);
        function runBear1(){
            self.button(self.grass1,false);
            self.button(self.tips1,false);

            console.log(self.sub1,'小熊');
            if(self.sub1<=0){
                self.btnStatus();
                return;
            }
            if(self.globalApi.bear1.sum==0){
                self.button(self.grass1,false);
                self.button(self.tips1,false);
                return;
            }
            let _this=this;
            self.Pm('audio_click',false);
            self.grass1.state.setAnimationPX(1,'grass_click',false,()=>{
                self.grass1.state.setAnimationPX(1,'grass_idle',true);
            });
            self.grassNum(true,false);

            new self.runX();

        }
        this.button(this.grass2,true);
        this.button(this.tips2,true);
        this.grass2.state.setAnimationPX(1,'idle1',true);
        this.grass2.on('pointerdown',runBear2);
        this.tips2.on('pointerdown',runBear2);
        function runBear2(){
            self.button(self.grass2,false);
            self.button(self.tips2,false);
            // if(self.sub2<-(self.globalApi.big_bear2.score-1)){
            //     self.button(self.grass1,false);
            //     self.button(self.grass2,false);
            //     return;
            // }

            console.log(self.sub1,'大熊');
            if(self.sub1<=0){
                self.btnStatus();
                return;
            }
            if(self.globalApi.big_bear2.sum==0){
                self.button(self.grass2,false);
                self.button(self.tips2,false);
                return;
            }
            let _this=this;
            self.Pm('audio_click',false);
            self.grass2.state.setAnimationPX(1,'click',false,()=>{
                self.grass2.state.setAnimationPX(1,'idle1',true);
            });


            self.grassNum(false,false);
            new self.runD();
        }
    }


    /**
     * 点击操纵  run 小熊
     */
    runX(){
        self.button(self.grass1,false);
        self.button(self.tips1,false);

        this.bear1=getAnimation('animation_bear1').spineAnimation('bear1',false,819,658,self.gameConBox,'',1,false,1,1,0);
        this.bear2=getAnimation('animation_bear2').spineAnimation('bear2',false,633,895,self.gameConBox,'',1,false,1,1,0);
        this.bear2.alpha=1;
        if(self.statusFind){
            self.grabBear1.call(this);
            return;
        }
        self.statusx1=true;
        if(self.statusx1){
            self.statusx1=false;
            self.sub1=self.sub1-self.globalApi.bear1.score;
        }
        this.bear2.state.setAnimationPX(1,'bear2_enter',false);
        this.__proto__._setTimeout=setTimeout(()=>{
            if(self.globalApi.data[self.topic].honey-self.globalApi.bear1.score<=0&&!self.statusFind){
                self.button(self.grass1,false);
                self.button(self.tips1,false);
            }else{
                self.button(self.grass1,true);
                self.button(self.tips1,true);
            }
            this.bear2.state.setAnimationPX(1,'bear2_walk',false,function(){

            });//bear2_idle
            TweenMax.to(this.bear2, self.globalApi.bear1.speed, {
                x: 819, y: 658, onComplete: () => {
                    if(self.globalApi.data[self.topic].honey-self.globalApi.bear1.score<0&&!self.statusFind){
                        this.bear1.alpha=1;
                        this.bear2.alpha=0;
                        self.bearArr1(this.bear1);
                        this.bear1.state.setAnimationPX(1,'bear1_idle',true);
                        return;
                    }else{
                        self.globalApi.data[self.topic].honey=self.globalApi.data[self.topic].honey-self.globalApi.bear1.score;
                        self.Castle.skeleton.setAttachment('digital',self.globalApi.data[self.topic].honey);
                        self.spineHoneyPic();
                        self.findArr1=[];
                        this.bear1.state.setAnimationPX(1,'bear1_walk',false);
                        this.bear1.alpha=1;
                        this.bear2.alpha=0;
                        TweenMax.to(this.bear1, self.globalApi.bear1.speed, {
                            x: 627, y: 900, onComplete: () => {
                                this.bear1.state.setAnimationPX(1,'bear1_exit',false);
                                setTimeout(()=>{
                                    self.grassNum(true,true);
                                    if(self.globalApi.bear1.sum!=0){
                                        self.button(self.grass1,true);
                                        self.button(self.tips1,true);

                                    }
                                },700)
                                self.addScore(self.globalApi.bear1.score);
                            }
                        });
                    }
                }});
        },self.globalApi.bear1.speed*1000)

    }

    /**
     *  被抓 小熊
     */
    grabBear1(){
        self.xnum++;
        this.bear1=self.findArr1[0];
        this.bear1.alpha=1;
        this.bear2.alpha=0;
        this.bear1.state.setAnimationPX(1,'bear1_idle',true);
        self.robot1.just.state.setAnimationPX(1,'robot_idle',false,()=>{
            //setTimeout(()=>{},1000)
                self.Pm('audio_Bubble',false);

            this.bear1.state.setAnimationPX(1,'bear1_trapped',true,()=>{});
            self.robot1.just.state.setAnimationPX(1,'robot_attack',false,()=>{
                TweenMax.to(this.bear1, 5, {
                    y: -100, onComplete: () => {

                    }
                });
                self.findArr1=[];
            })
        });
        self.statusFind=false;
    }



    /**
     * 点击操纵  run 大熊
     */
    runD(){
        self.button(self.grass2,false);
        self.button(self.tips2,false);
        this.bear1=getAnimation('animation_big_bear1').spineAnimation('big_bear1',false,1123,672,self.gameConBox,'',1,false,1,1,0);
        this.bear2=getAnimation('animation_Big_bear2').spineAnimation('big_bear2',false,1230,912,self.gameConBox,'',1,false,1,1,0);
        this.bear2.alpha=1;
        if(self.statusFind){
            self.grabBig_bear2.call(this);
            return;
        }
        self.statusx2=true;
        if(self.statusx2){
            self.statusx2=false;
            self.sub1=self.sub1-self.globalApi.big_bear2.score;
        }
        this.bear2.state.setAnimationPX(1,'big_bear_enter',false,function(){

        });
        this.__proto__._setTimeout=setTimeout(()=>{
            if(self.globalApi.data[self.topic].honey-self.globalApi.big_bear2.score<=0&&!self.statusFind){
                self.button(self.grass2,false);
                self.button(self.tips2,false);
            }else{
                self.button(self.grass2,true);
                self.button(self.tips2,true);
            }
            this.bear2.state.setAnimationPX(1,'big_bear_walk',false,function(){

            });//bear2_idle
            TweenMax.to(this.bear2, self.globalApi.bear1.speed, {
                x: 1123, y: 672, onComplete: () => {
                    if(self.globalApi.data[self.topic].honey-self.globalApi.big_bear2.score<0&&!self.statusFind){
                        this.bear1.alpha=1;
                        this.bear2.alpha=0;
                        self.bearArr2(this.bear1);
                        this.bear1.state.setAnimationPX(1,'big_bear_idle',true);
                       // this.bear1.state.setAnimationPX(1,'big_bear_idle',true);
                        return;
                    }else{
                        self.globalApi.data[self.topic].honey=self.globalApi.data[self.topic].honey-self.globalApi.big_bear2.score;
                        self.Castle.skeleton.setAttachment('digital',self.globalApi.data[self.topic].honey);

                        self.spineHoneyPic();
                        self.findArr2=[];
                        this.bear1.state.setAnimationPX(1,'big_bear_walk',false);
                        this.bear1.alpha=1;
                        this.bear2.alpha=0;
                        TweenMax.to(this.bear1, self.globalApi.bear1.speed, {
                            x: 1220, y: 916, onComplete: () => {
                                this.bear1.state.setAnimationPX(1,'big_bear_exit',false);
                                setTimeout(()=>{
                                    self.grassNum(false,true);
                                    if(self.globalApi.big_bear2.sum!=0){
                                        self.button(self.grass2,true);
                                        self.button(self.tips2,true);
                                    }
                                },700)
                                self.addScore(self.globalApi.big_bear2.score);
                            }
                        });
                    }
                }});
        },self.globalApi.bear1.speed*1000)
    }

    /**
     *  被抓 大熊
     */
    grabBig_bear2(){
        self.xnum++;
        console.log(self.xnum);
        this.bear1=self.findArr2[0];
        this.bear1.alpha=1;
        this.bear2.alpha=0;
        this.bear1.state.setAnimationPX(1,'big_bear_idle',true);
        self.robot2.just.state.setAnimationPX(1,'robot_idle',false,()=>{
            this.bear1.state.setAnimationPX(1,'big_bear_trapped',true,()=>{});
            //setTimeout(()=>{},1000)
                self.Pm('audio_Bubble',false);

            self.robot2.just.state.setAnimationPX(1,'robot_attack',false,()=>{
                TweenMax.to(this.bear1, 5, {
                    y: -100, onComplete: () => {

                    }
                });
                self.findArr2=[];
            })
        });
        self.statusFind=false;
    }



    /**
     * 机器人移动
     */
    robotMove(el,obj,num,nump,speed,statusEnd){
        this.statusEnd=statusEnd;
        self.stopX=statusEnd;
        // if(el.aName=='alpha1'){
        //     // console.log(self._score,self.sumHoney,self.timeText.text);
        //     // console.log(self.globalApi.data.length,this.statusEnd);
        //     if(self.globalApi.data.length==this.statusEnd){
        //         if(self.timeText.text!=0){
        //             if(self._score==self.sumHoney){
        //                 self.win();
        //             }else{
        //                 self.fail();
        //             }
        //         }
        //     }
        // }
        if(self.globalApi.data.length==this.statusEnd){

                return
            console.log('游戏结束-机器人移动,end页面弹出，');
        }

        self.Pm('audio_Pace',false);
        setTimeout(()=>{
            self.Pm('audio_Pace',false);
        },1000)

        // console.log(self._score,self.sumHoney,self.timeText.text);
        // console.log(self.globalApi.data.length,this.statusEnd);
        //
        // if(self.globalApi.data.length==this.statusEnd){
        //     if(self._score==self.sumHoney){
        //         self.win();
        //     }else{
        //         self.fail();
        //     }
        //     console.log('游戏结束-机器人移动,end页面弹出，');
        //     if(self.globalApi.data.length==this.statusEnd){
        //         return;
        //     }
        // }

        this.el=el;
        this.obj=obj;
        this.num=num;
        this.nump=nump;
        if(this.num==-1){
            this.nump=0;
            this.num=1;
            this.el.robotStatus=true;
        }
        this.objNew={};
        this.objNew.x=this.obj[this.num].x;
        this.objNew.y=this.obj[this.num].y;
        this.objNew.scale=this.obj[this.num].scale;
        this.objNew.speed=speed;
        this.el.x=this.objNew.x;
        this.el.y=this.objNew.y;
        this.an1=null;
        this.an2=null;
        this.an3=null;
        this.an4=null;
        this.sudu=this.objNew.speed;
        if(this.el.robotStatus){
            if(this.num<3){
                if(this.el.aName=='alpha1'){
                    this.el.just.skeleton.flipX=true;
                }else{
                    this.el.just.skeleton.flipX=false;
                }
                this.el.turn.alpha=0;
                this.el.just.alpha=1;
                this.an1=this.el.just.state.setAnimation(1,'robot_walk',false);

                this.an1.timeScale=this.sudu;
            }else{
                this.el.just.alpha=0;
                this.el.turn.alpha=1;
                if(this.el.aName=='alpha1'){
                    this.el.just.skeleton.flipX=false;
                }else{
                    this.el.just.skeleton.flipX=true;
                    this.el.turn.skeleton.flipX=true;
                }
                this.an2=this.el.turn.state.setAnimation(1,'robot2_walk',false);
                this.an2.timeScale=this.sudu;
            }
        }else{
            if(this.num<3){
                this.el.just.alpha=1;
                this.el.turn.alpha=0;
                if(this.el.aName=='alpha1'){
                    this.el.just.skeleton.flipX=false;
                }else{
                    this.el.just.skeleton.flipX=true;
                }

                this.an3=this.el.just.state.setAnimation(1,'robot_walk',false);
                this.an3.timeScale=this.sudu;
            }else{
                this.el.just.alpha=1;
                this.el.turn.alpha=0;
                if(this.el.aName=='alpha1'){
                    this.el.just.skeleton.flipX=true;
                }else{
                    this.el.just.skeleton.flipX=false;
                }
                this.an4=this.el.just.state.setAnimation(1,'robot_walk',false);
                this.an4.timeScale=this.sudu;
            }
        }
        if(this.num==5){
            this.el.robotStatus=false;
        }
        TweenMax.to(this.el.scale, .3, {x: this.objNew.scale,y:this.objNew.scale });


        TweenLite.to(this.el, 0, {
            x:this.obj[this.nump].x,y:this.obj[this.nump].y,
            onComplete: () => {
                setTimeout(()=>{
                    if(this.num==1&&!this.el.robotStatus){
                        self.button(self.grassStop1,true);
                        self.button(self.grassStop2,true);
                    }
                },((30/32)/this.objNew.speed)*400)
                TweenLite.to(this.el, (30/32)/this.objNew.speed, {
                    x:this.objNew.x,y:this.objNew.y,
                    onComplete: () => {
                        if(this.num==2&&!this.el.robotStatus){
                        }
                        if(this.num==1&&!this.el.robotStatus){
                            self.spineHoneyPicClose();
                            self.Pm('audio_Door',false);
                            self.Castle.state.setAnimation(1,'castle_close',false);
                        }
                        if(this.num==0){
                            self.stopStatus2=true;
                            if(self.findArr1.length){
                                self.statusFind=true;
                                if(self.findArr1[0].aName=='bear1'){
                                    new self.runX();
                                }
                            }
                            if(self.findArr2.length){
                                self.statusFind=true;
                                if(self.findArr2[0].aName=='big_bear1'){
                                    new self.runD();
                                }
                            }
                            this.num--;

                            if(self.findArr1.length||self.findArr2.length){
                                setTimeout(()=>{
                                    self.result.call(this);
                                },this.objNew.speed*5000);
                            }else{
                               self.result.call(this);
                            }
                            return;
                        }
                        if(this.el.robotStatus){
                            if(this.num){
                                this.nump++;
                            }
                            this.num++;
                        }else{
                            if(this.num==5){
                                this.nump=5;
                            }
                            if(this.num<5){

                                this.nump--;
                            }
                            this.num--;
                        }
                        if(self.robotGlobal){
                            this.statusEnd=self.globalApi.data.length;
                        }
                        new self.robotMove(this.el,this.obj,this.num,this.nump,this.objNew.speed,this.statusEnd);
                    }
                });
            }
        });
    }

    spineSlot(An,AnName,slot,slotPic,num=0){
        let i=num;
        //console.log(self.Castle.spineData.findSlot(slot),self.Castle.spineData.findSlot(slot).attachmentName);
        An.state.data.skeletonData.findAnimation(AnName).timelines.forEach((item)=>{
            if(item.slotIndex==self.Castle.spineData.findSlot(slot).index){
                if(item.attachmentNames){
                    if(item.attachmentNames[i]==self.Castle.spineData.findSlot(slot).attachmentName){
                        item.attachmentNames[i]=slotPic;
                        if(item.attachmentNames.length!=i){
                            i++;
                            self.spineSlot(An,AnName,slot,slotPic,i)
                        }else{
                            return;
                        }
                    }
                }
            }
        })
    }

    /**
     * spine 出场，动画蜂蜜 图片数量
     */
    spineHoneyPic(){
        console.log(self.Castle.state.data.skeletonData);
        //self.spineSlot(self.Castle,'castle_open','honey','honey4');
        //console.log(self.Castle,self.Castle.spineData.findAnimation('castle_open'),self.Castle.spineData.findSlot('honey'));
        for(var i=0;i<=14;i++){
            if(self.globalApi.data[self.topic].honey==i){
                self.Castle.state.data.skeletonData.animations[2].timelines[10].attachmentNames[0]='honey'+i;
            }
        }

    };

    /**
     * spine 退场，动画蜂蜜 图片数量
     */
    spineHoneyPicClose(){
        for(var i=0;i<=14;i++){
            if(self.globalApi.data[self.topic].honey==i){
                self.Castle.state.data.skeletonData.animations[1].timelines[10].attachmentNames[0]='honey'+i;
            }
        }
    };

    /**
     * 结果 跳题
     */
    btnStatus(){
        self.button(self.grass1,false);
        self.button(self.tips1,false);
        self.button(self.grass2,false);
        self.button(self.tips2,false);
        self.button(self.grassStop1,true);
        self.button(self.grassStop2,true);
    }

    /**
     * 结果 跳题
     */
    result(){
        self.statusFind=false;
        if(this.el.aName=="alpha1"){
            if(self.globalApi.data.length==self.topic+1){
                return;
            }else{
                self.topic++;
                self.gameInit(self.topic);
                if(!self.globalEnd){
                    self.Pm('audio_Door',false);
                }
                self.Castle.state.setAnimationPX(1,'castle_open',false,function(){
                    //self.Castle.skeleton.setAttachment('honey','honey4');
                    self.button(self.grassStop1,false);
                    self.button(self.grassStop2,false);
                    self.button(self.grass1,true);
                    self.button(self.tips1,true);
                    self.button(self.grass2,true);
                    self.button(self.tips2,true);
                });
                setTimeout(()=>{
                    self.Castle.skeleton.setAttachment('honey','honey4');
                },700)
            }
        }
        this.statusEnd++;
        if(self.robotGlobal){
            this.statusEnd=self.globalApi.data.length;
        }
        new self.robotMove(this.el,this.obj,this.num,this.nump,this.objNew.speed,this.statusEnd);
    }



    /**
     * 时间到
     */
    timeOver(){
        self.maskGg1.alpha=1;
        self.closeBtn.alpha=1;
        self.generalAn.alpha=1;
        self.againBtn.alpha=1;
        self.Pm('audio_fail',false);
        self.statusEnd=5;
        self.robotGlobal=true;

        if(self.xnum){
            self.generalAn.state.setAnimationPX(1,'general_enter',false,function(){
                self.generalAn.state.setAnimationPX(1,'general_idle',true);
            });
        }else{
            self.generalAn.state.setAnimationPX(1,'general_enter1',false,function(){
                self.generalAn.state.setAnimationPX(1,'general_idle1',true);
            });
        }
        /**
         * 再来一次
         */
        self.again();

        /**
         * 接口api
         */
        self.endApi();
    }

    /**
     * 判定成功，失败，
     */
    atLast(sum1){

        //console.log(self.globalApi.data.length,self.stopX);
        if((sum1*2)==self.xnum){
            self.globalEnd=true;
            setTimeout(()=>{
                self.fail();
            },2000)
            self.robotGlobal=true;
            clearInterval(self.timeName);
        };

        if(self.globalApi.data.length==self.topic+1){
            if(self.timeText.text!=0){
                self.globalEnd=true;
                if(self._score==self.sumHoney){
                    self.win();
                    self.robotGlobal=true;
                    clearInterval(self.timeName);
                    return;
                }

                if(self.globalApi.data.length==self.stopX){
                    self.timeOver();
                    clearInterval(self.timeName);
                    return;
                }
            }
        }
    }


    wacth(){
        // this.
        // this.sum2

        // console.log(self.globalApi.bear1);
        //
        // var val=self.globalApi.big_bear2.sum
        // Object.defineProperty(self.globalApi.big_bear2, 'sum', {
        //     get: function(){
        //        return val;
        //     },
        //     set: function(newVal){
        //
        //        console.log(newVal);
        //     }
        // });

        let sum1;
        let sum2;
        let sum3;
        sum1=self.globalApi.bear1.sum;
        sum2=self.globalApi.big_bear2.sum;
        sum3=sum1+sum2;

    }


    /**
     * 失败
     */
    fail(){

        self.maskGg1.alpha=1;
        self.failAn.alpha=1;
        self.closeBtn.alpha=1;
        self.againBtn.alpha=1;
        self.btnStatus();
        self.Pm('audio_fail',false);

        self.failAn.state.setAnimationPX(1,'fail_enter',false,function(){
            self.failAn.state.setAnimationPX(1,'fail_idle',true);
        });

        /**
         * 再来一次
         */
        self.again();

        /**
         * 接口api
         */
        self.endApi();

    }


    // failAn
    // winAn
    // generalAn
    // closeBtn
    // againBtn



    /**
     * 成功
     */
    win(){
        self.maskGg1.alpha=1;
        self.winAn.alpha=1;
        self.closeBtn.alpha=1;
        self.againBtn.alpha=1;
        self.btnStatus();

        self.Pm('audio_win',false);

        self.winAn.state.setAnimationPX(1,'win_enter',false,function(){
            self.winAn.state.setAnimationPX(1,'win_idle',true);
        });

        /**
         * 再来一次
         */
        self.again();

        /**
         * 接口api
         */
        self.endApi();
        self.globalApi.right=true;
    }

    /**
     * 再来一次
     */

    again(){
        this.button(this.againBtn,true);
        this.againBtn.on('pointerdown',function(){
            self.button(self.againBtn,false);
            self.Pm('audio_click',false);
            self.gameConBox.removeChildren();
            self.EndCon.removeChildren();
            self.moveNum=1;
            self.moveNump=0;
            self.globalApi.timeNum=self.timeApiEnd;
            self.globalApi.timeApi=self.timeApiEnd;
            self.globalApi.bear1.sum=self.api.sum1;
            self.globalApi.big_bear2.sum=self.api.sum2;
            self.globalApi.robotSpeed=self.api.speed;
            self.globalApi.courseX=self.api.courseX;
            self.globalApi.score=self.api.score;
            self.globalApi.data.forEach((item1,index1)=>{
                self.api.data.forEach((item2,index2)=>{
                    if(index1==index2){
                        item1.honey=item2.honey
                    }
                })
            });
            self.statusFind=false;
            self.findArr1=[];
            self.findArr2=[];
            self.sumHoney=60;
            self._score=0;
            self.sub1=0;
            self.sub2=0;
            self.score=0;
            self.topic=0;
            self.statusEnd=0;
            self.xnum=0;
            new GAME(self.stage,self.objGlobal);
        });

    }

    endApi(){
        self.button(self.closeBtn,true);
        if(self.globalApi.right){
            self.globalApi.show=true;
        }
        self.closeBtn.on('pointerdown',function(){
            self.Pm('audio_click',false);
            self.button(self.againBtn,false)
            if(self.globalApi.right){
                console.log('成功');
                let answer = new AnswerInfo();
                answer.init({type: 0, useranswer:'' , answer: '' , id: 0, rightnum: 1, wrongnum: 0});
                store.dispatch('pushToPostArr', answer);//存放每题数据
                store.dispatch('postAnswer');//最后提交数据*/
            }else{
                if(self.globalApi.show){
                    console.log('成功');
                    let answer = new AnswerInfo();
                    answer.init({type: 0, useranswer:'' , answer: '' , id: 0, rightnum: 1, wrongnum: 0});
                    store.dispatch('pushToPostArr', answer);//存放每题数据
                    store.dispatch('postAnswer');//最后提交数据*/
                }else{
                    console.log('失败');
                    let answer = new AnswerInfo();
                    answer.init({type: 0, useranswer:'' , answer: '' , id: 0, rightnum: 0, wrongnum: 1});
                    store.dispatch('pushToPostArr', answer);//存放每题数据
                    store.dispatch('postAnswer');//最后提交数据*/
                }
            }
        })
    }


}