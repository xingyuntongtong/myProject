
var regModule=(function(){
    /*获取验证码*/
    function myCode(){
        var getCode=document.getElementById('getCode'),
            hide=document.getElementById('hide'),
            span=document.getElementById('span'),
            code=document.getElementById('code');
        function change(){
            var strCode='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                str='',
                ary=[];
            while(ary.length<4){
                var num=utils.rnd(0,61);
                if(ary.indexOf(num)===-1){
                    ary.push(num);
                    str+=strCode.charAt(num);
                }
            }
            span.innerHTML=str;
        }
        getCode.onclick=function(){
            hide.style.display='block';
            change();
            this.disabled=true;//当点击一次的时候让按钮不能在点击直到5秒以后在重新点击
            this.style.cursor='no-drop';//让它的小手处于红圈状态
            this.value='5 秒后获取验证码';
            this.num=5;//自定义一个num属性让它一开始等于5
            //写一个定时器让每次num的数都--直到<1时在让按钮能点击 否则不能点击
            var timer=setInterval(function(){
                getCode.num--;
                getCode.value=getCode.num+' 秒后获取验证码';
                if(getCode.num<1){
                    clearInterval(timer);
                    getCode.disabled=false;
                    getCode.style.cursor='pointer';
                    getCode.value='点击获取验证码';
                }
            },1000);
            //当点击验证码把它放入文本框中同时让按钮恢复点击状态让验证码隐藏
            span.onclick=function(){
                code.value=span.innerHTML;
                hide.style.display='none';
                clearInterval(timer);
                getCode.disabled=false;
                getCode.style.cursor='pointer';
                getCode.value='点击获取验证码';
            };
        };
    }
    function init(){
        myCode();
    }
    return{
        init:init
    }
})();
regModule.init();