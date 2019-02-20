import {createSprite, getAnimation, getSound} from "../../loader";
const pixiSound = require('pixi-sound');

import GAME from "./game";
import {TweenLite, TimeLine, TweenMax} from 'gsap';
let self;
export default class COURSE extends window.jl.init {
    constructor(stage, objGlobal,gameSelf) {
        super();
        this.courseCon=stage.getChildByName("courseCon");
        this.audioCon=stage.getChildByName("audioCon");
        this.CourseConBox=this.courseCon.getChildByName("CourseConBox");
        this.CourseHand=this.courseCon.getChildByName("CourseHand");

        this.maskBgi;
        this.gameSelf=gameSelf;
        this.stage=stage;
        this.num=0;
        this.objGlobal=objGlobal;
        this.topicX=this.objGlobal.contentGame.topicX;
        this.scoreApi=this.objGlobal.contentGame.score;
        self=this;
        this.game();

    }
    game(){

        /**
         * 引导确定页
         */


        this.courseInit();
       // this.courseBox();
    };
    courseInit(){
        this.bg=this.Ps("image_courseBg").imagesPX('image_courseBg',false, 0,0, this.CourseConBox, 0, 0, 1);

        this.robot1=getAnimation('animation_robot1').spineAnimation('animation_robot1',false,344,480,this.CourseConBox,'',1,false,1,1,1);
        this.robot1.state.setAnimation(0,'robot_attack',false).time=35/30;

        this.robot2=getAnimation('animation_robot1').spineAnimation('animation_robot2',false,1591,480,this.CourseConBox,'',1,false,1,1,1);
        this.robot2.state.setAnimation(0,'robot_attack',false).time=35/30;
        this.robot2.skeleton.flipX=true;
        this.maskBg(this.maskBgi, this.CourseConBox, .5);
        //this.guide=this.Ps("image_guide").imagesPX('image_guide',false, 51,0, this.CourseConBox, 0, 0, 1);

        this.guideAn=getAnimation('animation_jieshao').spineAnimation('guideAn',false,240,132,this.CourseConBox,'',1,false,1,1,0);

        this.grass1=getAnimation('animation_grass1').spineAnimation('grass1',false,440,877,this.CourseConBox,'',1,false,1,1,0);
        this.grass1.state.setAnimation(0,'grass_click',false).time=13/30;
        this.grass1.skeleton.setAttachment('digital',3);
        this.grass2=getAnimation('animation_grass2').spineAnimation('grass2',false,1548,920,this.CourseConBox,'',1,false,1,1,0);
        this.grass2.state.setAnimation(0,'click',false).time=13/30;
        this.grass2.skeleton.setAttachment('digital',3);

        this.xiongAn=getAnimation('animation_yindao').spineAnimation('animation_yindao',false,422,859,this.CourseConBox,'',1,false,1,1,1);
        //this.xiongGuide=this.Ps("image_xiongGuide").imagesPX('image_xiongGuide',false, 243,314, this.CourseConBox, 0, 0, 0);
        //this.next=this.Ps("image_next").imagesPX('image_next',false, 1464,883, this.CourseConBox, 0, 0, 1);
        this.nextAn=getAnimation('animation_jieshao').spineAnimation('nextAn',false,1649,1033,this.CourseConBox,'',1,false,1,1,1);

        this.nextAn.state.setAnimation(1,'button',false).time=30/30;

        this.honey=this.Ps("image_honey").imagesPX('image_honey',false, 886,387, this.CourseConBox, 0, 0, 0);
        this.honey1=this.Ps("image_honey1").imagesPX('image_honey1',false, 886,387, this.CourseConBox, 0, 0, 0);
        this.honey2=this.Ps("image_honey2").imagesPX('image_honey2',false, 886,387, this.CourseConBox, 0, 0, 0);

        this.courseText1=this.Ps("image_courseText1").imagesPX('image_courseText1',false, 639,101, this.CourseConBox, 0, 0, 0);
        this.courseText2=this.Ps("image_courseText2").imagesPX('image_courseText2',false, 490,185, this.CourseConBox, 0, 0, 0);
        this.courseText3=this.Ps("image_courseText3").imagesPX('image_courseText3',false, 500,145, this.CourseConBox, 0, 0, 0);
        this.courseText4=this.Ps("image_courseText4").imagesPX('image_courseText4',false, 555,145, this.CourseConBox, 0, 0, 0);
        this.courseText4_1=this.Ps("image_courseText4_1").imagesPX('image_courseText4_1',false, 555,145, this.CourseConBox, 0, 0, 0);
        this.courseText4_2=this.Ps("image_courseText4_2").imagesPX('image_courseText4_2',false, 555,145, this.CourseConBox, 0, 0, 0);
        this.courseText5=this.Ps("image_courseText5").imagesPX('image_courseText5',false, 452,185, this.CourseConBox, 0, 0, 0);
        this.courseText6=this.Ps("image_courseText6").imagesPX('image_courseText6',false, 633,188, this.CourseConBox, 0, 0, 0);


        this.bear1=getAnimation('animation_bear1').spineAnimation('bear1',false,819,658,self.CourseConBox,'',1,false,1,1,0);
        this.bear2=getAnimation('animation_bear2').spineAnimation('bear2',false,633,895,self.CourseConBox,'',1,false,1,1,0);
        this.bear1d=getAnimation('animation_big_bear1').spineAnimation('big_bear1',false,1123,672,self.CourseConBox,'',1,false,1,1,0);
        this.bear2d=getAnimation('animation_Big_bear2').spineAnimation('big_bear2',false,1230,912,self.CourseConBox,'',1,false,1,1,0);


        //this.hand=this.Ps("image_hand").imagesPX('image_hand',false, 629,932, this.CourseConBox, .9, .9, 0);

        this.handAn=getAnimation('animation_jieshao').spineAnimation('nextAn',false,1790,1039,this.CourseConBox,'',1,false,1,1,1);
        this.alphaCon1(0,this.guideAn,.4);
        this.guideAn.state.setAnimation(1,'jieshao1',false);
        this.xiongAn.state.setAnimation(1,'bear_talk',true);
        this.handAn.state.setAnimation(1,'hand_mark_click',true);

        this.alphaCon1(0,this.courseText1,.4);
        /**
         * 引导btn next;
         */
        this.button(this.nextAn,true);
        this.nextAn.on('pointerdown',function(){
            self.Pm('audio_click',false);
            jl.button(self.nextAn,false);
            // setTimeout(()=>{
            //     self.button(self.nextAn,true);
            // },400)
            self.num++;
            if(self.num==1){
                self.course1();
            }
            if(self.num==2){
                self.course2();
            }
            if(self.num==3){
                self.course3();
            }
            if(self.num==4){
                //self.nextAn.alpha=1;
                //self.num=4;
                //jl.button(self.nextAn,true);
                self.course4();
            }
            if(self.num==5){
                self.course5();
            }
            if(self.num==6){
                self.nextGame();
            }
        });
    };
    course1(){
        self.nextAn.state.setAnimation(1,'button',false);
        jl.alphaCon2(0,self.xiongAn,.4);
        jl.alphaCon2(0,self.courseText1,.4);
        jl.alphaCon1(0,self.honey,.4);
        jl.alphaCon1(0,self.courseText2,.4);
        setTimeout(()=>{
            self.button(self.nextAn,true);
        },400)
    };
    course2(){
        self.nextAn.state.setAnimation(1,'button',false);
        jl.alphaCon2(0,self.courseText2,.4);
        setTimeout(()=>{
            jl.alphaCon1(0,self.grass1,.4);
            jl.alphaCon1(0,self.grass2,.4);
            jl.alphaCon1(0,self.courseText3,.4);
            self.button(self.nextAn,true);
        },400)
    };
    course3(){
        self.nextAn.state.setAnimation(1,'button',false);
        jl.alphaCon2(0,self.courseText3,.4);
        self.handAn.x=581;
        self.handAn.y=897;
        self.button(self.nextAn,false);
        self.nextAn.alpha=0;
        //jl.picAtuo(self.hand,600);
        jl.alphaCon1(0,self.courseText4_1,.4);
        setTimeout(()=>{
            jl.button(self.grass1,true);
            self.grass1.on('pointerdown',function(){
                self.handAn.alpha=0;
                self.grass1.skeleton.setAttachment('digital',2);
                self.Pm('audio_click',false);
                //jl.button(self.nextAn,false);
                // setTimeout(()=>{
                //     jl.button(self.nextAn,true);
                // },100)
                jl.button(self.grass1,false);
                self.bear2.alpha=1;
                self.bear2.state.setAnimationPX(1,'bear2_enter',false);
                setTimeout(()=>{
                    self.bear2.state.setAnimationPX(1,'bear2_walk',false,function(){

                    });
                    TweenMax.to(self.bear2, 1, {
                        x: 819, y: 658, onComplete: () => {
                            self.honey.alpha=0;
                            self.honey1.alpha=1;
                            self.bear1.state.setAnimationPX(1,'bear1_walk',false);
                            self.bear1.alpha=1;
                            self.bear2.alpha=0;
                            TweenMax.to(self.bear1, 1, {
                                x: 627, y: 900, onComplete: () => {
                                    self.bear1.state.setAnimationPX(1,'bear1_exit',false);
                                    jl.alphaCon2(0,self.courseText4_1,.4);
                                    setTimeout(()=>{
                                        self.grass1.skeleton.setAttachment('digital',3);

                                        /**
                                         * 大熊部分
                                         * @type {number}
                                         */
                                        jl.alphaCon1(0,self.courseText4_2,.4);
                                        self.handAn.alpha=1;
                                        self.handAn.x=1697;
                                        self.handAn.y=860;
                                        self.button(self.grass2,true);


                                        self.grass2.on('pointerdown',function(){
                                            self.grass2.skeleton.setAttachment('digital',2);
                                            self.handAn.alpha=0;
                                            self.Pm('audio_click',false);
                                            self.button(self.grass2,false);
                                            self.bear2d.alpha=1;
                                            self.bear2d.state.setAnimationPX(1,'big_bear_enter',false);
                                            setTimeout(()=>{
                                                self.bear2d.state.setAnimationPX(1,'big_bear_walk',false,function(){

                                                });
                                                TweenMax.to(self.bear2d, 1, {
                                                    x: 1123, y: 672, onComplete: () => {
                                                        self.honey1.alpha=0;
                                                        self.honey2.alpha=1;
                                                        self.bear1d.state.setAnimationPX(1,'big_bear_walk',false);
                                                        self.bear1d.alpha=1;
                                                        self.bear2d.alpha=0;
                                                        TweenMax.to(self.bear1d, 1, {
                                                            x: 1220, y: 916, onComplete: () => {
                                                                self.bear1d.state.setAnimationPX(1,'big_bear_exit',false);
                                                                jl.alphaCon2(0,self.courseText4_2,.4);
                                                                setTimeout(()=>{
                                                                    self.grass2.skeleton.setAttachment('digital',3);
                                                                    //return;
                                                                    self.num=4;
                                                                    self.nextAn.alpha=1;
                                                                    jl.button(self.nextAn,true);
                                                                    self.course4();
                                                                },600);
                                                            }
                                                        });
                                                    }});
                                            },1000)
                                        })
                                    },600);
                                }
                            });
                        }});
                },1000)
            });



            //jl.alphaCon1(0,self.hand,.4);
            //self.button(self.nextAn,true);
        },400)
    };
    course4(){
        self.button(self.nextAn,true);
        self.nextAn.alpha=1;
        jl.alphaCon2(0,self.grass1,.4);
        jl.alphaCon2(0,self.grass2,.4);
        //jl.alphaCon2(0,self.courseText4,.4);
        //jl.alphaCon2(0,self.hand,.4);
        self.handAn.x=1790;
        self.handAn.y=1039;
        setTimeout(()=>{
            self.CourseConBox.setChildIndex(self.robot1,8);
            self.CourseConBox.setChildIndex(self.robot2,9);
            jl.alphaCon1(0,self.courseText5,.4);
            self.button(self.nextAn,true);
        },400)
    };
    course5(){
        self.nextAn.state.setAnimation(1,'button',false);
        self.CourseConBox.setChildIndex(self.robot1,1);
        self.CourseConBox.setChildIndex(self.robot2,2);
        jl.alphaCon2(0,self.courseText5,.4);
        setTimeout(()=>{

            jl.alphaCon1(0,self.xiongAn,.4);
            jl.alphaCon1(0,self.courseText6,.4);
            self.button(self.nextAn,true);
        },400)
    };
    nextGame(){
        self.nextAn.state.setAnimation(1,'button',false);
        jl.alphaCon2(0,this.courseCon,.4);
        setTimeout(()=>{
            this.courseCon.removeChildren();
            new GAME(this.stage,this.objGlobal);
            this.courseCon.alpha=1;
        },400)
    }
}
