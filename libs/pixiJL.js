import {getSound,getAnimation} from '../../loader';
import {TweenLite, TweenMax, TimelineMax} from 'gsap';
import regINIT, {config} from "./regInit";
let I=new regINIT();
let self;
//测试模式开关
let debug=false;
if(debug){
    document.oncontextmenu = function(){
        return false;
    }
}
/**
 * jl框架
 */
(function(global,Fn){
    Fn(global);
})(this||window,function(global){
    var version = "0.0.1";
    var jl=function(){
        return new jl.Fn.init();
    };
    jl.Fn= {
        init: function () {},
        GLOBAL_OBJ:I,
        jl:version,
        pixiJL:jl,
        debug:debug,
        picAtuo(el, time) {
            let picStatus = true;
            setInterval(() => {
                if (picStatus) {
                    el.rotation = .25;
                    picStatus = false;
                } else {
                    el.rotation = -0.1;
                    picStatus = true;
                }
            }, time)
        },
        spineCallback(spine, callback) {
            if (callback) {
                setTimeout(function () {
                    callback();
                }, spine.animation.duration * 955)
            }
        },
        picAtuoUp(el, time) {
            let picStatus = true;
            let ely = el.y;
            let setInter = setInterval(() => {
                if (picStatus) {
                    el.y = ely;

                    TweenMax.to(el, .1, {
                        alpha: 1, onComplete: () => {
                        }
                    });
                    picStatus = false;
                } else {
                    TweenMax.to(el, .3, {
                        y: el.y - 30, onComplete: () => {
                            TweenMax.to(el, .3, {
                                alpha: 0, onComplete: () => {
                                }
                            });
                        }
                    });

                    picStatus = true;
                }
            }, time)
            return setInter;
        },
        picAtuoDown(el, time) {
            let picStatus = true;
            let ely = el.y;
            let setInter = setInterval(() => {
                if (picStatus) {
                   // el.y = ely;

                    TweenMax.to(el.scale, .3, {
                        x: 1.15,y: 1.15, onComplete: () => {
                        }
                    });
                    picStatus = false;
                } else {
                    TweenMax.to(el.scale, .3, {
                        x: .9 ,y:.9, onComplete: () => {

                        }
                    });

                    picStatus = true;
                }
            }, time)
            return setInter;
        },
        picScoreUpScore(el, time){
            el.alpha=0;
            TweenMax.to(el, .3, {
                y: el.y-40, onComplete: () => {

                }
            });
            TweenMax.to(el, .3, {
                alpha: 1, onComplete: () => {
                    jl.Fn.alphaCon2(0,el,.2);
                    setTimeout(()=>{
                        el.y= el.y+40
                    },200)
                }
            });
        },
        picScoreUp(el,cont){
            el.alpha=0;
            TweenMax.to(el, .2, {
                y: 0, onComplete: () => {

                }
            });
            TweenMax.to(el, .3, {
                alpha: 1, onComplete: () => {
                    cont && jl.Fn.button(cont,true);
                }
            });
        },
        centerEl(el, num) {
            return ((1920 - el.width) / 2) + num;
        },
        picRight(el, time) {

            let picStatus = false;
            setInterval(() => {
                if (picStatus) {
                    TweenMax.to(el, 0, {
                        x: 950, onComplete: () => {
                            picStatus = false;
                        }
                    });
                } else {
                    TweenMax.to(el, .5, {
                        x: 1200, onComplete: () => {
                            picStatus = true;
                        }
                    });
                }
            }, time * 1000)
        },
        anchor(el, numX = 0, numY = 0) {
            el.anchor.x = numX;
            el.anchor.y = numY;
        },
        c(el) {
            return console.log(el);
        },
        Ps(pic) {
            return new PIXI.Sprite(PIXI.Texture.fromImage(pic));
        },
        PP(pic) {
            return new PIXI.extras.TilingSprite(PIXI.Texture.fromImage(getSound(pic).url), 8, 335);
        },
        Pt(text, style) {
            return new PIXI.Text(text, style);
        },
        Pg() {
            return new PIXI.Graphics();
        },
        Pc() {
            return new PIXI.Container();
        },
        Pm(src, Boolean) {
            return PIXI.sound.Sound.from(getSound(src)).play({loop: Boolean});
        },
        Pmc(src) {
            return PIXI.sound.Sound.from(getSound(src));
        },
        Pmt(src, Boolean) {
            return PIXI.sound.Sound.from(getSound(src)).stop();
        },
        button(rq, Boolean) {
            rq.interactive = Boolean;
            rq.buttonMode = Boolean;
        },
        //透明过渡容器    1 到 0  到 1
        alphaCon(delay, rq, rq1) {
            TweenMax.to(rq, 0, {
                alpha: 1, onComplete: () => {
                    TweenMax.to(rq, 0, {
                        alpha: 0, delay: delay, onComplete: () => {
                            TweenMax.to(rq, 0, {alpha: 1, delay: .2})
                        }
                    });

                }
            })
        },
        //透明过渡容器  0  到  1
        alphaCon1(delay, rq, time) {

            TweenMax.to(rq, 0, {
                alpha: 0, onComplete: () => {
                    TweenMax.to(rq, time, {
                        alpha: 1, delay: delay, onComplete: () => {

                        }
                    });

                }
            })

        },
        //透明过渡容器   1 到 0
        alphaCon2(delay, rq, time) {

            TweenMax.to(rq, 0, {
                alpha: 1, onComplete: () => {
                    TweenMax.to(rq, time || .3, {
                        alpha: 0, delay: delay, onComplete: () => {

                        }
                    });

                }
            })

        },
        conX(delay, rq, posX, posY, time) {
            rq.x = posY;
            TweenMax.to(rq, time || .3, {
                x: posX, delay: delay, ease: "linear"
            });
        },
        conY(delay, rq, posX, posY, time) {
            rq.x = posX;
            TweenMax.to(rq, time || .3, {
                y: posY, delay: delay, ease: "linear"
            });
        },
        //清除容器
        clearCon(delay, rq, time) {
            setTimeout(() => {

                TweenMax.to(rq, 0, {
                    alpha: 1, onComplete: () => {
                        TweenMax.to(rq, time, {alpha: 0,})
                    }
                })
                setTimeout(() => {
                    rq.removeChildren();
                }, time * 1000)
            }, delay * 1000)
        },
        //图层变暗
        conMat(rq, alpha) {
            let colorMatrix = new PIXI.filters.ColorMatrixFilter();
            rq.filters = [colorMatrix];
            colorMatrix.brightness(alpha);
        },
        //层级关系
        zIndex(rq, el, index) {
            rq.setChildIndex(el, index);
        },
        //坐标点X，Y
        Point(x, y) {
            return new PIXI.Point(x, y);
            //sprite1.pivot.scope.position
        },
        //拖拽触碰
        conPoint(el, Pot) {
            return el.containsPoint(Pot)
        },
        maskBg(_this, rq, alpha) {
            _this = new PIXI.Graphics();
            _this.beginFill(0x000000, alpha);
            _this.position.x = 0;
            _this.position.y = 0;
            _this.drawRect(0, 0, 1920, 1080);
            rq.addChild(_this);
            return _this;
        },
        SeeXY1(this1) {
            this1.buttonMode = true;
            this1.interactive = true;
            this1.on('mousedown', onDragStart)
                .on('mouseup', onDragEnd)
                .on('mouseupoutside', onDragEnd)
                .on('mousemove', onDragMove);
            this1.on('touchstart', onDragStart)
                .on('touchend', onDragEnd)
                .on('touchendoutside', onDragEnd)
                .on('touchmove', onDragMove);

            function onDragStart(event) {
                this1.data = event.data;
                this1.alpha = 0.5;
                this1.dragging = true;
            }

            function onDragEnd(event) {
                this1.alpha = 1;
                this1.dragging = false;
                this1.data = null;
            }

            function onDragMove(event) {
                if (this1.dragging) {
                    var newPosition = this1.data.getLocalPosition(this1.parent); //获取鼠标移动的位置
                    this1.position.x = newPosition.x - this1.width / 2;
                    this1.position.y = newPosition.y - this1.height / 2;

                    console.log(Math.floor(newPosition.x - this1.width / 2) + ',' + Math.floor(newPosition.y - this1.height / 2));
                }
            }
        }
    };
    jl.prototype=jl.Fn;
    jl.Fn.init.prototype=jl.Fn;
    (function(){
        function SeeXY() {
            this.on('mousedown', onDragStart)
                .on('mouseup', onDragEnd)
                .on('mouseupoutside', onDragEnd)
                .on('mousemove', onDragMove);
            this.on('touchstart', onDragStart)
                .on('touchend', onDragEnd)
                .on('touchendoutside', onDragEnd)
                .on('touchmove', onDragMove);

            // this.anchor.set(0.5);
            function onDragStart(event) {
                this.data = event.data;
                this.alpha = 0.5;
                this.dragging = true;

            }

            function onDragEnd(event) {
                this.alpha = 1;
                this.dragging = false;
                this.data = null;
                console.log('{x:'+Math.floor(this.x) + ',' + 'y:'+Math.floor(this.y)+'},');
            }

            function onDragMove(event) {
                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent); //获取鼠标移动的位置
                    this.position.x = newPosition.x - this.width / 2;
                    this.position.y = newPosition.y - this.height / 2;

                    console.log(Math.floor(newPosition.x - this.width / 2) + ',' + Math.floor(newPosition.y - this.height / 2));
                }
            }
        }
        function clickBg() {
            this.on('mousedown', onDragStart)
                .on('mouseup', onDragEnd)
                .on('mouseupoutside', onDragEnd)
                .on('mousemove', onDragMove);
            this.on('touchstart', onDragStart)
                .on('touchend', onDragEnd)
                .on('touchendoutside', onDragEnd)
                .on('touchmove', onDragMove);

            // this.anchor.set(0.5);
            function onDragStart(event) {
                this.data = event.data;
                this.alpha = 0.5;
                this.dragging = true;

            }

            function onDragEnd(event) {
                this.alpha = 1;
                this.dragging = false;
                this.data = null;
                console.log('{x:'+Math.floor(this.x) + ',' + 'y:'+Math.floor(this.y)+'},');
            }

            function onDragMove(event) {
                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent); //获取鼠标移动的位置
                    this.position.x = newPosition.x - this.width / 2;
                    this.position.y = newPosition.y - this.height / 2;

                    console.log(Math.floor(newPosition.x - this.width / 2) + ',' + Math.floor(newPosition.y - this.height / 2));
                }
            }
        }
        function SeeXYRight() {
            this.on('rightdown', onDragStart)
                .on('rightup', onDragEnd)
                .on('rightupoutside', onDragEnd)
                .on('rightmove', onDragMove);

            // this.anchor.set(0.5);
            function onDragStart(event) {
                this.data = event.data;
                this.alpha = 0.5;
                this.dragging = true;
            }

            function onDragEnd(event) {
                this.alpha = 1;
                this.dragging = false;
                this.data = null;
            }

            function onDragMove(event) {
                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent); //获取鼠标移动的位置
                    this.position.x = newPosition.x - this.width / 2;
                    this.position.y = newPosition.y - this.height / 2;

                    console.log(Math.floor(newPosition.x - this.width / 2) + ',' + Math.floor(newPosition.y - this.height / 2));
                }
            }
        }
        function objFn(name) {
            let _this = this;
            let this_obj = _this.name;
            let paren_obj = {};
            let num1 = 0;
            let on1 = false;
            let on2 = false;
            let x1 = _this.x;
            document.onkeydown=function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];

                //空格打开 键盘
                if(e && e.keyCode==32){
                    if(debug){
                        let arrObj=window.jl.GLOBAL_OBJ.scenerObj;
                        function arr1(arrObj1){
                            for(let item in arrObj1){
                                if(arrObj[item].children==0){
                                    arrObj[item].buttonMode = true;
                                    arrObj[item].interactive = true;

                                }else{
                                    arr2(arrObj[item].children)
                                }
                            }
                        }
                        function arr2(arrObj1){
                            console.log(arrObj1);
                            arrObj1.forEach((item)=>{
                                if(item.children){
                                    item.buttonMode = true;
                                    item.interactive = true;
                                }else{
                                    arr2(item)
                                }
                            })
                        }
                        arr1(arrObj);
                    }
                }
            }




            _this.on('rightdown', onDragStart2);

            function onDragStart2(event) {
                //查看this资料
                this_obj = {
                    'this': _this,
                    'name': name,
                    'x': _this.x,
                    'y': _this.y,
                    'position': _this.position,
                    /*'parentName': this.parent.name,*/
                }

                this_obj.oIndex = _this.parent.getChildIndex(_this);


                //查看父集资料
                let arr1 = [];
                let arr2 = [];
                let arr3 = [];
                let arr4 = [];
                paren_obj = {
                    'parentAName': _this.parent.name,
                    'this': _this.parent,
                    'x': _this.parent.x,
                    'y': _this.parent.y,
                    'position': _this.parent.position,
                    'parentCon': _this.parent.parent,

                };
                this.parent.children.map((item) => {
                    arr1.push(item.aName);
                    arr2.push(item);
                    paren_obj.parentChildrenName = arr1;
                    paren_obj.parentChildren_Arr = arr2;
                });

                this.parent.parent.children.map((item) => {
                    arr3.push(item.name);
                    arr4.push(item);
                    paren_obj.parentName = arr3;
                    paren_obj.parent_Arr = arr4;
                })
                let parents = paren_obj.parentCon;

                paren_obj.index = parents.getChildIndex(_this.parent);


                document.onkeydown = function (event) {
                    var e = event || window.event || arguments.callee.caller.arguments[0];
                    //q 查看this常用 属性
                    if (e.keyCode == 81 && num1 < 1) {
                        num1++;
                        console.log(this_obj)
                        _this.cursor = "pointer";
                    }
                    //v +右键 移动
                    if (e.keyCode == 86 && num1 < 1) {
                        num1++;

                        SeeXYRight.call(_this);
                        _this.cursor = 'move';

                    }
                    //w +右键 查看父集资料
                    if (e.keyCode == 87 && num1 < 1) {
                        num1++;
                        console.log(paren_obj);
                        _this.cursor = 'pointer';
                    }
                };
                  document.onkeyup = function (event) {
                      num1 = 0;
                      SeeXY.call(_this);
                      // _this.cursor="pointer";
                  };

            }

           onkeydown=function(event){
                 var e = event || window.event || arguments.callee.caller.arguments[0];

                // console.log(e);
                 if(e && e.keyCode==17&&num1<1){
                     num1++;console.log(num1);
                 }
                //空格打开 键盘
                 if(e && e.keyCode==32&&num1<1){
                     if(debug){
                         _this.buttonMode = true;
                         _this.interactive = true;
                     }
                 }
            };
           document.onkeyup=function(event){
                 var e = event || window.event || arguments.callee.caller.arguments[0];
                 num1=0;
                // console.log(num1);
            };
            // if(on1){ on1=true;}


        }
        function SeeXYan (self) {
            self.buttonMode = true;
            self.interactive = true;
            self.on('mousedown', onDragStart)
                .on('mouseup', onDragEnd)
                .on('mouseupoutside', onDragEnd)
                .on('mousemove', onDragMove);
            self.on('touchstart', onDragStart)
                .on('touchend', onDragEnd)
                .on('touchendoutside', onDragEnd)
                .on('touchmove', onDragMove);

            function onDragStart(event) {
                self.data = event.data;
                self.alpha = 0.5;
                self.dragging = true;
            }

            function onDragEnd(event) {
                self.alpha = 1;
                self.dragging = false;
                self.data = null;
            }

            function onDragMove(event) {
                if (self.dragging) {
                    var newPosition = self.data.getLocalPosition(self.parent); //获取鼠标移动的位置
                    self.position.x = newPosition.x - self.width / 2;
                    self.position.y = newPosition.y - self.height / 2;

                    console.log(Math.floor(newPosition.x - self.width / 2) + ',' + Math.floor(newPosition.y - self.height / 2));
                }
            }
        };
        //文字
        let time;
        PIXI.Text.prototype.texts = function (name, show, x, y, delay, rq, options, time, anX, axY) {
            this.x = x;
            this.y = y;
            this.aName = name;
            this.anchor.x = anX || 0;
            this.anchor.y = axY || 0;
            time = time || 0.3;
            this.alpha = 0;
            if (show == '') {
                show = false;
            }

            let x1, y1, x2, y2;
            if (options == 'bottom') {
                x1 = this.x;
                y1 = this.y - 70;
                x2 = this.x;
                y2 = this.y;
            } else if (options == 'up') {
                x1 = this.x;
                y1 = this.y + 70;
                x2 = this.x;
                y2 = this.y;
            } else if (options == 'left') {
                x1 = this.x + 70;
                y1 = this.y;
                x2 = this.x;
                y2 = this.y;
            } else if (options == 'right') {
                x1 = this.x - 70;
                y1 = this.y;
                x2 = this.x;
                y2 = this.y;
            }
            if (debug) {
                objFn.call(this, name);
            }
            setTimeout(() => {
                if (show) {
                    this.buttonMode = true;
                    this.interactive = true;
                    SeeXY.call(this);
                }
                TweenMax.to(this, time, {alpha: 1, delay: .1})
                TweenMax.to(this, 0, {
                    x: x1, y: y1, onComplete: () => {
                        TweenMax.to(this, time,
                            {x: x2, y: y2,})
                    }
                })
                rq.alpha = 1;

                rq.addChild(this);
            }, delay * 1000)
            return this;
        } //图片1
        PIXI.Sprite.prototype.images = function (name, show, x, y, delay, rq, time, anX, axY) {
            this.x = x;
            this.y = y;
            this.aName = name;
            this.anchor.x = anX || 0;
            this.anchor.y = axY || 0;
            time = time || 0.3;
            setTimeout(() => {
                TweenMax.to(rq, time, {
                    alpha: 1, onComplete: () => {
                        if (show == '') {
                            show =false;
                        }
                        if (show) {
                            this.buttonMode = true;
                            this.interactive = true;
                            SeeXY.call(this);
                        }

                        rq.addChild(this);
                        this.alpha = 0;
                        TweenMax.to(this, time, {
                            alpha: 1
                        });
                    }
                });

            }, delay * 1000);
            if (debug) {
                objFn.call(this, name);
            }

            return this;
        }

        //不带过渡效果创建图片
        PIXI.Sprite.prototype.imagesPX = function (name, show, x, y, rq, anX, axY, alpha,obj) {
            this.x = x;
            this.y = y;
            this.aName = name;
            this.anchor.x = anX || 0;
            this.anchor.y = axY || 0;
            this.alpha = alpha;
            for(let i in obj){
                this[i]=obj[i];
            }
            if (show == '') {
                show = false;
            }
            ;
            if (show) {
                this.buttonMode = true;
                this.interactive = true;
                SeeXY.call(this);
            }
             if (debug) {
                  objFn.call(this, name);
              }
            rq.addChild(this);
            return this;
        }

        //位置XY
        PIXI.spine.Spine.prototype.pos = function (x, y) {
            this.x = x;
            this.y = y;
        }

        PIXI.spine.Spine.prototype.spineAnimation=function(name,boolen,x,y,rq,An,track,loop,scaleX,scaleY,alpha,obj){

            this.alpha=alpha;
            this.name=name;
            this.scale.x=scaleX;
            this.scale.y=scaleY;
            this.x = x;
            this.y = y;
            this.aName = name;

            for(let i in obj){
                this[i]=obj[i];
            }

            if(An){
                this.state.setAnimation(track,An,loop);
            }

            if (debug) {
                objFn.call(this, name);
            }
            rq.addChild(this);
            if(boolen){
                SeeXYan(this);
            }
            return this;
        }
        //透明遮罩背景显示

        PIXI.Graphics.prototype.bgsky = function (rq, delay, color, alpha) {
            this.beginFill(color, alpha);   //填充色，如不设填充色，则为透明
            this.drawRect(0, 0, 1920, 1080);
            this.x=0;
            this.y=0;
            TweenMax.to(this, 0, {
                alpha: 0, onComplete: () => {
                    TweenMax.to(this, .3, {
                        alpha: 1, delay: delay, onComplete: () => {

                        }
                    })
                }
            })
            rq.addChild(this);
            return this;
        }
        PIXI.spine.core.Skeleton.prototype.setSkinPX = function (newSkin) {
            if (newSkin != null) {
                if (this.skin != null)
                    newSkin.attachAll(this, this.skin);
                else {
                    var slots = this.slots;
                    for (var i = 0, n = slots.length; i < n; i++) {
                        var slot = slots[i];
                        var name_1 = slot.data.attachmentName;
                        if (name_1 != null) {
                            var attachment = newSkin.getAttachment(i, name_1);
                            if (attachment != null){
                                slot.setAttachment(attachment);
                            }else{
                                slot.setAttachment(null);
                            }
                        }
                    }
                }
            }
            this.skin = newSkin;
        };

        PIXI.spine.core.AnimationState.prototype.setAnimationPX = function (trackIndex, animationName, loop,callback) {
            var animation = this.data.skeletonData.findAnimation(animationName);
            if (animation == null)
                throw new Error("Animation not found: " + animationName);
            return this.setAnimationWithPX(trackIndex, animation, loop,callback);
        };
        PIXI.spine.core.AnimationState.prototype.setAnimationWithPX = function (trackIndex, animation, loop,callback) {
            if (animation == null)
                throw new Error("animation cannot be null.");
            var interrupt = true;
            var current = this.expandToIndex(trackIndex);
            if (current != null) {
                if (current.nextTrackLast == -1) {
                    this.tracks[trackIndex] = current.mixingFrom;
                    this.queue.interrupt(current);
                    this.queue.end(current);
                    this.disposeNext(current);
                    current = current.mixingFrom;
                    interrupt = false;
                }
                else
                    this.disposeNext(current);
            }
            var entry = this.trackEntry(trackIndex, animation, loop, current);
            this.setCurrent(trackIndex, entry, interrupt);

            this.queue.drain();

            if(callback){
                setTimeout(()=>{
                    callback();
                },(animation.duration)*950)
            }
            return entry;
        };
    }());
    var _jl=window.jl=jl.Fn;
    return _jl;
});

