
var mushroom=(function(){
    /*回到顶部和移动的搜索框*/
    function toTop(){
        var oBtn=document.getElementById('toTop'),
            sticky=document.getElementById('sticky');
        window.onscroll=computedDisplay;
        function computedDisplay(){
            //滚动条卷去的高度>1就让top按钮显示
            oBtn.style.display=utils.win('scrollTop')>=1?'block':'none';
            //滚动条卷去的高度>(可视窗口的高度+搜索框的高度)就让移动的搜索框显示 不加括号也行
            var s=utils.win('scrollTop')>=(utils.win('clientHeight')+utils.css(sticky,'height'));
            sticky.style.top=s?0:-50+'px';
        }
        oBtn.onclick=function(){//让它直接回到顶部不用设置步长
            this.style.display='none';
            sticky.style.top=-50+'px';//当回到顶部的时候让搜索框也隐藏
            window.onscroll=null;
            var timer=setInterval(function(){
                    var curTop=utils.win('scrollTop');
                    if(curTop<=0){
                        clearInterval(timer);
                        window.onscroll=computedDisplay;
                        return;
                    }
                    curTop=0;//让它直接等于0直接到顶部
                    utils.win('scrollTop',curTop);
                },30);
        };
    }
    /*右侧导航hover*/
    function rightBar(){
        var rightBar=document.getElementById('rightBar'),
            oA1=document.getElementById('a1'),
            oA5=document.getElementById('a5'),
            hideNav=document.getElementById('hideNav');
        window.onresize=function(){/*浏览器窗口放大缩小的事件*/
            if(utils.win('clientWidth')>=1260){
                rightBar.style.right=0;//显示
                oA1.style.borderBottom=oA5.style.borderTop='1px solid #919191';
                hideNav.onmouseleave=function(){//当>=1260时不在隐藏
                    rightBar.style.right=0;
                };
            }else{
                rightBar.style.right=-30+'px';
                oA1.style.borderBottom=oA5.style.borderTop='none';
                //鼠标移入显示移出隐藏
                hideNav.onmouseenter=function(){//把事件委托给最外面的盒子这样当鼠标移上去的时候不会离开
                    rightBar.style.right=0;
                    oA1.style.borderBottom=oA5.style.borderTop='1px solid #919191';
                };
                hideNav.onmouseleave=function(){
                    oA1.style.borderBottom=oA5.style.borderTop='none';
                    rightBar.style.right=-30+'px';
                };
            }

        };
    }
    /*搜索框*/
    function search(){
        var txt=document.getElementById('txt'),
            searchHide=document.getElementById('searchHide'),
            hist=document.getElementById('hist'),
            searchBox=document.getElementById('searchBox');

        txt.onkeyup=txt.onfocus=function(){//在聚焦和键盘事件(输入内容时)时都是一样的这里可以连等
            var val=this.value.replace(/(^ +)|( +$)/g,'');//去除首尾空格 中间的空格可以不管
            searchHide.style.display=val.length>=0?'block':'none';//当内空的长度>0时代表有内容
            if(val.length>0){
                searchBox.style.display='block';
                hist.style.display='none';//让h3隐藏 ul显示
            }else{
                searchBox.style.display='none';
                hist.style.display='block';
            }
        };
        document.body.onclick=function(e){//用事件委托来实现点击任何地方都隐藏
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            //input处理1: 当事件源的id 是search也就是input时
            if(tar.id==='txt'){//如果点击时的是input时就不隐藏
                return;
            }
            //当 当前的事件源的标签名转成小写的时候是a的话 && 它的父级的父级的id名是list的话 把a里的内容放入到input里
            if(tar.tagName.toLowerCase()==='li' && tar.parentNode.id==='searchBox'){
                txt.value=tar.innerHTML;//当点击列表中的每一行(ul下面的a)让它到input里去
            }
            searchHide.style.display='none';//点击其它地方下拉列表隐藏 这里用的是事件委托
        };
    }
    /*function search1(txt,searchHide,hist,searchBox){
        var txt1=document.getElementById(txt),
            searchHide1=document.getElementById(searchHide),
            hist1=document.getElementById(hist),
            searchBox1=document.getElementById(searchBox);
        txt1.onkeyup=txt1.onfocus=function(){//在聚焦和键盘事件(输入内容时)时都是一样的这里可以连等
            var val=this.value.replace(/(^ +)|( +$)/g,'');//去除首尾空格 中间的空格可以不管
            searchHide1.style.display=val.length>=0?'block':'none';//当内空的长度>0时代表有内容
            if(val.length>0){
                searchBox1.style.display='block';
                hist1.style.display='none';//让h3隐藏 ul显示
            }else{
                searchBox1.style.display='none';
                hist1.style.display='block';
            }
        };
        document.body.onclick=function(e){//用事件委托来实现点击任何地方都隐藏
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            //input处理1: 当事件源的id 是search也就是input时
            if(tar.id===txt){//如果点击时的是input时就不隐藏
                return;
            }
            //当 当前的事件源的标签名转成小写的时候是a的话 && 它的父级的父级的id名是list的话 把a里的内容放入到input里
            if(tar.tagName.toLowerCase()==='li' && tar.parentNode.id===searchBox){
                txt1.value=tar.innerHTML;//当点击列表中的每一行(ul下面的a)让它到input里去
            }
            searchHide1.style.display='none';//点击其它地方下拉列表隐藏 这里用的是事件委托
        };
    }
    search1('txt','searchHide','hist','searchBox');
    /!*移动的搜索框*!/
    search1('txt1','searchHide1','hist1','searchBox1');*/
    /*轮播图区域*/
    function banner(){
        var bannerNav=document.getElementById('bannerNav'),
            bannerImg=bannerNav.getElementsByTagName('div')[0],
            aDiv=bannerImg.getElementsByTagName('div'),
            aImg=bannerImg.getElementsByTagName('img'),
            oUl=bannerNav.getElementsByTagName('ul')[0],
            aLi=bannerNav.getElementsByTagName('li'),
            btnLeft=bannerNav.getElementsByTagName('a')[0],
            btnRight=bannerNav.getElementsByTagName('a')[1],
            data=null,
            autoTimer=null,/*定时器名称*/
            interval=5000,/*定时器的时间*/
            step=0;/*张数看到达第几张了*/
        //1.获取并解析数据
        function getData(){
            var xhr=new XMLHttpRequest;
            xhr.open('get','json/data.txt?_='+Math.random(),false);
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
                    data=utils.jsonParse(xhr.responseText);
                    console.log(data);
                }
            };
            xhr.send(null);
        }
        getData();
        //2.绑定数据
        function bind(){
            var str1='';
            var str2='';
            for(var i=0; i<data.length; i++){
                str1+='<div><a href="javascript:;"><img realImg="'+data[i].imgSrc+'" alt=""/></a></div>';
                str2+=i===0?'<li class="bg"></li>':'<li></li>';
            }
            str1+='<div><a href="javascript:;"><img realImg="'+data[0].imgSrc+'" alt=""/></a></div>';
            bannerImg.innerHTML=str1;
            oUl.innerHTML=str2;
           // bannerImg.style.width=aDiv.length*aDiv[0].offsetWidth+'px';
        }
        bind();
        //3.延迟加载
        function lazyImg(){
            for(var i=0; i<aImg.length; i++){
                (function(index){
                    var tmpImg=new Image;
                    tmpImg.src=aImg[index].getAttribute('realImg');
                    tmpImg.onload=function(){
                        aImg[index].src=this.src;
                        utils.css(aDiv[0],'zIndex',1);//把第一张的层级提高为1
                        animate(aDiv[0],{opacity:1},500);/*以500ms的时间显示这样就不用设置定时器了*/
                        tmpImg=null;
                    };
                    tmpImg.onerror=function(){
                        tmpImg=null;
                    };
                })(i);
            }
        }
        lazyImg();
        //4.图片自动轮播
        clearInterval(autoTimer);
        autoTimer=setInterval(autoMove,interval);
        function autoMove(){
            if(step>=aDiv.length-1){
                step=0;
                utils.css(bannerImg,'left',-step*715);
            }
            step++;
            animate(bannerImg,{left:-step*715},300);
            setBanner();
        }
        function setBanner(){
            for(var i=0; i<aDiv.length; i++){
                var curEle=aDiv[i];
                if(i===step){
                    utils.css(curEle,'zIndex',1);
                    animate(curEle,{opacity:1},500);
                    continue;
                }
                utils.css(curEle,'zIndex',0);
            }
            bannerTip();
        }
        //5.焦点自动轮播
        function bannerTip(){
            var tmpStep=step>=aLi.length?0:step;
            for(var i=0; i<aLi.length; i++){
                aLi[i].className=i===tmpStep?'bg':'';
            }
        }
        //6.移入移出 让左右按钮也根着显示和隐藏
        bannerNav.onmouseover = function () {
            clearInterval(autoTimer);
            btnLeft.style.display = btnRight.style.display = 'block';
        };
        bannerNav.onmouseout = function () {
            autoTimer = setInterval(autoMove, interval);
            btnLeft.style.display = btnRight.style.display = 'none';
        };
        //7.点击焦点手动切换
        function handleChange(){
            for(var i=0; i<aLi.length; i++){
                (function(index){
                    aLi[index].onmouseover=function(){
                        step=index;
                        animate(bannerImg,{left:-step*715},500);
                        setBanner();
                    };
                })(i);
            }
        }
        handleChange();
        //8.点击左右按钮切换
        btnLeft.onclick=function(){
            if(step<=0){//当它<=0的时候，让它等于它的长度，到达最后一张这也可以用aLi.length
                step=aLi.length;//它的长度是4 下面在--变成索引3
                utils.css(bannerImg,'left',-step*715);
            }
            step--;
            animate(bannerImg,{left:-step*715},500);
            setBanner();
        };
        btnRight.onclick=autoMove;


    }
    /*限时抢购 倒计时区域*/
    function down(){
        var count=document.getElementById('count'),
            span1=count.getElementsByTagName('span')[0],
            span2=count.getElementsByTagName('span')[1],
            span3=count.getElementsByTagName('span')[2];
        function zore(n){//补0如果小于2位数就在前面加一个0
            return n>=0 && n<10?'0'+n:''+n;
        }
        function countDown(){
            var oDate=new Date();
            var newDate=new Date('2016/8/19 18:00:00');
            var s=Math.floor((newDate.getTime()-oDate.getTime())/1000);//得到的是秒数
            //开始秒转换       一天24小时，一小时有60分 1分有60秒
            var d=Math.floor(s/86400);//整数部分：天数  余数部分：剩下的秒数
            s%=86400;//把余数部分求出来
            var h=Math.floor(s/3600);//整数部分：小时 余数部分：剩下的秒数
            s%=3600;
            var m=Math.floor(s/60);
            s%=60;//最后剩下的秒数
            span1.innerHTML=zore(h);
            span2.innerHTML=zore(m);
            span3.innerHTML=zore(s);
        }
        countDown();
        clearInterval(timer);
        var timer=setInterval(countDown,1000);
    }

    function init(){
        toTop();
        rightBar();
        search();
        banner();
        down();
    }
    return{
        init:init
    }
})();

mushroom.init();
























