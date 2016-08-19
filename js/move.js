/**
 * Created by tongchao on 2016/7/5.
 */
(function(){
    var zhufengEffect={//tween公式 贝塞尔曲线公式可以自动算出公式
        //匀速
        Linear:function(t,b,c,d){
            return c*t/d+b;
        },
        //指数衰减的反弹缓动
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - zhufengEffect.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return zhufengEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return zhufengEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
        //二次方的缓动
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        //三次方的缓动
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        //四次方的缓动
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        //五次方的缓动
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        //正弦曲线的缓动
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        //指数曲线的缓动
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        //圆形曲线的缓动
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        //超过范围的三次方缓动
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        //指数衰减的正弦曲线缓动
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        }
    };

    /**
     *
     * @param curEle: 元素对象  当前元素
     * @param target: {}对象 总距离 比如{left:1200,top:500}
     * @param duration: 总时间 比如 1000
     * @param effect: 运动效果  比如匀速运动 可传可不传，不传就是默认的匀速运动
     * @param callback: 回调函数 是运动结束后要干的事可传可不传
     */
    function move(curEle,target,duration,effect,callback){//第四个参数可传可不传它是运动结束后要干的事
        var tmpEffect=zhufengEffect.Linear;//刚开始默认是匀速运动
        //把这些运动的公式添加到一个数组里，这里可以随便加都在zEffect里面
        var ary=["Linear","Elastic-easeOut","Back-easeOut","Bounce-easeOut","Expo-easeIn"];
        //根据用户传的数字来实现不同的运动
        if(typeof effect==='number'){//如果传进来的值是一个数字的话才执行
            var str=ary[effect%ary.length];
            //这样有几种情况就%几长度不会超出  ary[0%5]=ary[0] 这里也可以用switch
            //把数字做为索引取到数组中对应的字符串 防止索引出错这里用到了% 比如它要是传大于数组的长度就会出错
            ary=str.split('-');//把传进来的字符串通过-来拆分成数组["Elastic","easeOut"]
            tmpEffect=ary.length>=2?zhufengEffect[ary[0]][ary[1]]:zhufengEffect[ary[0]];
            //如果数组里面的长度>=2的话就是 zhufengEffect.Elastic.easeOut否则的话zhufengEffect.Linear
        }else if(typeof effect==='object'){
        //如果它是一个对象的话比如直接传一个数组["Elastic","easeOut"] 也得判断数组的长度
            tmpEffect=effect.length>=2?zhufengEffect[effect[0]][effect[1]]:zhufengEffect[effect[0]];
        }else if(typeof effect==='function'){
        //如果传进来的是一个函数，其实它是想用回调函数用的是最后一个参数 让它直接等于effect这个参数
            callback=effect;
        }
        //为Linear里面的参数做准备
        var begin={};//是一个大对象
        var change={};
        var time=null;
        for(var attr in target){
        //遍历target attr 当调用的时候传left和top 这里就是left和top 可以根据这个求出begin
            begin[attr]=utils.css(curEle,attr);//根据target里面的值，来获取begin和change
            change[attr]=target[attr]-begin[attr];//在这里只是为了得到里面的属性
        }
        clearInterval(curEle.timer);//开启一个定时器就要先关闭一个定时器 把之前没用的关闭，性能优化
        curEle.timer=setInterval(function(){
            time+=10;//每次都累加时间
            if(time>=duration){//如果时间大于最大时间了 停止条件
                utils.css(curEle,target);//把它直接设置到最大值 这里的target本来就是一个大对象所以不用一个个设置
                clearInterval(curEle.timer);//此时关的是现在正开着的定时器
                /*if(typeof callback==='function'){//如果传的第四个参数是一个函数的话就调用它，不是的话不调用
                    callback.call(curEle);//把回调函数里的this指向改成当前的元素
                }*/
                callback && callback.call(curEle);//这样写也可以
                return;
            }
            for(var attr in target){
            //在循环遍历里面的left和top 这里遍历target,begin,change都行只是为了拿到属性
                var curPos=tmpEffect(time,begin[attr],change[attr],duration);
                //这里的tmpEffect是看外面选择哪种形式的运动就传谁，比如默认是匀速的
                //获取每个属性的最新位置 都需要分别设置
                utils.css(curEle,attr,curPos);//对新位置的分别设置
            }
        },10);
    }
    window.animate=move;//暴露接口让外面调用
})();