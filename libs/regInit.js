import {Application, Container, Graphics} from 'pixi.js';
import contentGame from '../ui/contentGame';
let self;
let obj;
export default class regInit{
    constructor(stage,start) {
        this.stage=stage;
        this.start=start;
        this.scenerObj={
           /* Bg:new Container(),
            startCon:new Container(),
            courseCon:new Container(),
            gameCon:new Container(),
            gameKpCon:new Container(),
            gameBoxCon:new Container(),
            gameBtnCon:new Container(),
            spineCon:new Container(),
            EndCon:new Container(),
            boxCon:new Container(),
            scoreCon:new Container(),
            audioCon:new Container(),
            rightCon:new Container(),*/
        };
        self=this;
        return this.init();
    }
    init(){
         obj={
            contentGame: contentGame,
            scenerObj: this.scenerObj,
            show: false,
            config: {
                debug: false,
            },
            style: {
                /*text:{
                    fontFamilyu: '微软雅黑',
                    fontSize: '66px',
                    align: 'center',
                    fill: '#fcbc3a',
                    lineHeight: '9',
                    stroke: '#0d3f4c',
                    strokeThickness: 10,
                }*/
                debug: {
                    fontFamilyu: 'Arial',
                    fontSize: '34px',
                    align: 'center',
                    fill: '#f90656',
                    lineHeight: '9',
                },
                text: {
                    fontFamilyu: 'MicrosoftYaHei',
                    fontSize: '41px',
                    align: 'center',
                    fill: '#fff',
                    lineHeight: '5',
                },
                topic: {
                    fontFamilyu: 'MicrosoftYaHei',
                    fontSize: '42px',
                    align: 'center',
                    fill: '#fff',
                    lineHeight: '5',
                },
                topicNum: {
                    fontFamilyu: 'MicrosoftYaHei',
                    fontSize: '38px',
                    align: 'center',
                    fill: '#fff',
                    lineHeight: '5',
                },
                tips: {
                    fontFamilyu: 'MicrosoftYaHei',
                    fontSize: '42px',
                    align: 'center',
                    fill: '#552A06',
                    lineHeight: '5',
                },
                end: {
                    fontFamilyu: 'MicrosoftYaHei',
                    fontSize: '55px',
                    align: 'center',
                    fill: '#552A06',
                    lineHeight: '5',
                },
                time: {
                    fontFamilyu: 'Arial',
                    fontSize: '48px',
                    align: 'center',
                    fill: '#fff',
                    lineHeight: '9',
                    /*  stroke: '#ff6400',
                      strokeThickness: 5,*/
                },
                win: {
                    fontFamilyu: 'MicrosoftYaHei',
                    fontSize: '48px',
                    align: 'center',
                    fill: '#f90656',
                    lineHeight: '9',
                    /*  stroke: '#ff6400',
                      strokeThickness: 5,*/
                }
            },
            initData: {
                startPage: {},
                coursePage: {},
                gamePage: {
                    timeText: 30,
                },
                option: [
                    {
                        value1: 2,
                        value2: 2,
                        value3: 3,
                        value4: 9,
                        text: ''
                    },
                    {
                        value1: 3,
                        value2: 6,
                        value3: 7,
                        value4: 8,
                        text: ''
                    }
                ],
                endPage: {}
            },
            reginit: () => {
                //容器场景
                addChildName('Bg');
                Bg();

        /**
         * 舞台容器插入
         *
         */
        let courseCon1 = addChildName('courseCon');
                         addChildName('CourseConBox', courseCon1);
                         addChildName('CourseHand', courseCon1);

        let gameCon1 =   addChildName('gameCon');
                         addChildName('gameConBox', gameCon1);


                         addChildName('EndCon');
                         addChildName('boxCon');
                         addChildName('scoreCon');
                         self.stage.addChild(self.start);
                         addChildName('rightCon');
                         addChildName('audioCon');

                configDebug();
                if(jl.GLOBAL_OBJ.scenerObj){
                    jl.GLOBAL_OBJ.scenerObj=this.scenerObj;
                }
            },
        }

       return obj;
            // initFn:function (){
            //     if(config.debug){
            //         document.oncontextmenu = function(){
            //             return false;
            //         }
            //     }
            // }
    }


}

function Bg(){
    let Bg=self.stage.getChildByName("Bg");
    let Bg1= new PIXI.Graphics();
    Bg1.beginFill(0x000000,1);
    Bg1.position.x = 0;
    Bg1.position.y = 0;
    Bg1.drawRect(0, 0, 1920, 1080);
    Bg.addChild(Bg1);
}

function configDebug(){
    if(window.jl.debug){
        jl.Pt('测试模式',jl.GLOBAL_OBJ.style.debug).imagesPX('winText',false,895,10, self.stage, 0, 0, 1)
    }
}
function addChildName(name,rq){
    obj.scenerObj[name]=self.scenerObj[name]=new Container();
    self.scenerObj[name].name=name;
    if(rq){
        rq.addChild(self.scenerObj[name]);
    }else{
        self.stage.addChild(self.scenerObj[name]);
    }
    return self.scenerObj[name];
}

export let config = {
    debug:false,
}
