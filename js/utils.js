//自执行函数形成一个私有作用域，用return 可以返回一个大对象
var utils=(function(){
    var flag='getComputedStyle' in window;
    //rnd: 兼容版取随机数
    function rnd(n,m){
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();//如果
        }
        if(n>m){
            var tmp=n;
            n=m;
            m=tmp;
        }
        return Math.round(Math.random()*(m-n)+n);
    }
    //listToArray: 类数组转数组
    function listToArray(arg){
        if(flag){
            return Array.prototype.slice.call(arg);
        }
        var ary=[];
        for(var i=0; i<arg.length; i++){
            ary[ary.length]=arg[i];
        }
        return ary;
    }
    //jsonParse: 把JSON格式的字符串转成JSON格式的数据
    function jsonParse(jsonStr){
        return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
    }
    //win: 处理(获取,设置)浏览器盒子模型的兼容性
    function win(attr,value){
        if(typeof value==='undefined'){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=document.body[attr]=value;
    }
    //offset: 当前元素到body的距离 {left:l top:t}
    function offset(curEle){
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var par=curEle.offsetParent;
        while(par){
            if(navigator.userAgent.indexOf('MSIE 8.0')===-1){
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par=par.offsetParent;
        }
        return {left:l,top:t}
    }
    //getByClass: 通过class名来获取元素
    function getByClass(strClass,curEle){
        curEle=curEle||document;
        if(flag){
            return this.listToArray(curEle.getElementsByClassName(strClass));
        }
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        var nodeList=curEle.getElementsByTagName('*');
        var ary=[];
        for(var i=0; i<nodeList.length; i++){
            var curNode=nodeList[i];
            var bOk=true;
            for(var k=0; k<aryClass.length; k++){
                var curClass=aryClass[k];
                var reg=new RegExp('(^| +)'+curClass+'( +|$)');
                if(!reg.test(curNode.className)){
                    bOk=false;
                    break;
                }
            }
            if(bOk){
                ary[ary.length]=curNode;
            }
        }
        return ary;
    }
    //hasClass: 验证元素的className 上是否有某个class名  只能验证一个
    function hasClass(curEle,cName){
        cName=cName.replace(/(^ +)|( +$)/g,'');
        var reg=new RegExp('\\b'+cName+'\\b');
        return reg.test(curEle.className);

    }
    //addClass: 元素的className上如果没有这个class名，才会添加  'box1  box2  '
    function addClass(curEle,strClass){
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0; i<aryClass.length; i++){
            if(!this.hasClass(curEle,aryClass[i])){
                curEle.className+=' '+aryClass[i];
            }
        }
    }
    //如果元素身上有这个class名才能删除
    function removeClass(curEle,strClass){
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0; i<aryClass.length; i++){
            var reg=new RegExp('(^| +)'+aryClass[i]+'( +|$)');
            if(reg.test(curEle.className)){
                curEle.className=curEle.className.replace(reg,' ').replace(/(^ +)|( +$)/g,'');
            }
        }
    }
    //getCss: 获取非行间样式(获取哪个元素经浏览器计算过的样式)
    function getCss(curEle,attr){
        var val,reg;
        if(flag){
            val=getComputedStyle(curEle,false)[attr];
        }else{
            if(attr==='opacity'){
                val=curEle.currentStyle['filter'];
                reg=/^alpha\(opacity[=:](\d+)\)$/g;
                return reg.test(val)?RegExp.$1/100:1;
            }
            val=curEle.currentStyle[attr];
        }
        reg=/^([+-])?\d+(\.\d+)?(px|pt|rem|em)$/;
        return reg.test(val)?parseFloat(val):val;
    }
    //setCss: 设置样式 只能设置一个元素
    function setCss(curEle,attr,value){
        if(attr==='float'){
            curEle.style.styleFloat=value;
            curEle.style.cssFloat=value;
            return;
        }
        if(attr==='opacity'){
            curEle.style.opacity=value;
            curEle.style.filter='alpha(opacity='+value*100+')';
            return;
        }
        var reg=/(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/;
        if(reg.test(attr)){
            value=parseFloat(value)+'px';
        }
        curEle.style[attr]=value;
    }
    //setGroupCss: 设置样式(也就是添加样式)可以批量添加
    function setGroupCss(curEle,options){
        for(var attr in options){
            this.setCss(curEle,attr,options[attr]);
        }
    }
    //css: 取值赋值合体的函数 getCss、setCss、setGroupCss三合一
    function css(curEle){
        var arg2=arguments[1];
        if(typeof arg2==='string'){
            var arg3=arguments[2];
            if(typeof arg3==='undefined'){
                return this.getCss(curEle,arg2);
            }else{
                this.setCss(curEle,arg2,arg3);
            }
        }
        if(arg2.toString()==='[object Object]'){
            this.setGroupCss(curEle,arg2);
        }
    }
    //getChildren: 获取当前元素下的所有子元素
    function getChildren(curEle,tag){//tag:ul
        /*if(flag){//就不判断高级浏览器了
            return this.listToArray(curEle.children);
        }*/
        //获取当前元素下的所有子节点：文本节点，注释节点，document节点，元素节点
        var ary=[];
        var nodeList=curEle.childNodes;
        for(var i=0; i<nodeList.length; i++){
            if(nodeList[i].nodeType===1){
                //如果传了第二个参数，对所选元素进行再次过滤
                if(typeof tag!=='undefined'){
                    if(nodeList[i].tagName.toLowerCase()===tag){
                        ary[ary.length]=nodeList[i];
                        break;
                    }
                }else{//如果没传第二个参数，直接把元素放入数组
                    ary[ary.length]=nodeList[i];
                }
            }
        }
        return ary;
    }
    //prev: 获取上一个哥哥元素节点 如果没有上一个节点就是null
    function prev(curEle){
        if(flag){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while(pre && pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    }
    //prevAll: 获取当前元素所有的哥哥元素节点
    function prevAll(curEle){
        var pre=this.prev(curEle);
        var ary=[];
        while(pre){
            ary.unshift(pre);
            pre=this.prev(pre);
        }
        return ary;
    }
    //next: 获取当前元素的下一个弟弟元素节点
    function next(curEle){
        if(flag){
            return curEle.nextElementSibling;
        }
        var nex=curEle.nextSibling;
        while(nex && nex.nodeType!==1){
            nex=nex.nextSibling;
        }
        return nex;
    }
    //nextAll: 获取当前元素下的所有的弟弟元素节点
    function nextAll(curEle){
        var nex=this.next(curEle);
        var ary=[];
        while(nex){
            ary[ary.length]=nex;
            nex=this.next(nex);
        }
        return ary;
    }
    //sibling: 获取当前元素的相邻元素(兄弟元素): 上一个哥哥元素+下一个弟弟元素
    function sibling(curEle){
        var pre=this.prev(curEle);
        var nex=this.next(curEle);
        var ary=[];
        if(pre) ary.push(pre);
        //pre?ary.push(pre):null;
        if(nex) ary.push(nex);
        return ary;
    }
    //siblings: 获取当前元素的所有的兄弟元素: 所有的哥哥+所有的弟弟
    function siblings(curEle){
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }
    //firstChild: 获取当前元素下的第一个子元素
    function firstChild(curEle){
        return this.getChildren(curEle)[0];
    }
    //lastChild: 获取当前元素下的最后一个子元素
    function lastChild(curEle){
        var aChs=this.getChildren(curEle);
        return aChs[aChs.length-1];
    }
    //index: 获取当前元素的索引: 就是当前元素的哥哥的个数
    function index(curEle){
        return this.prevAll(curEle).length;
    }
    //appendChild: 把新元素插入到容器的末尾
    function appendChild(parent,newEle){
        parent.appendChild(newEle);
    }
    //prependChild: 把新元素插入到容器的开头
    function prependChild(parent,newEle){
        /*var aChs=this.getChildren(parent);
         if(aChs.length){
         var first=this.firstChild(parent);
         parent.insertBefore(newEle,first);
         }else{
         this.appendChild(parent,newEle);
         }*/
        var first=this.firstChild(parent);
        if(first){
            parent.insertBefore(newEle,first);
        }else{
            parent.appendChild(newEle);
        }
    }
    //insertBefore: 把新元素插入到指定元素的前面
    function insertBefore(newEle,oldEle){
        oldEle.parentNode.insertBefore(newEle,oldEle);
    }
    //insertAfter: 把新元素插入到指定元素的后面: 也就是弟弟元素的前面
    function insertAfter(newEle,oldEle){
        var nex=this.next(oldEle);
        if(nex){
            oldEle.parentNode.insertBefore(newEle,nex);
        }else{
            oldEle.parentNode.appendChild(newEle);
        }
    }
    return{
        rnd:rnd,
        listToArray:listToArray,
        jsonParse:jsonParse,
        win:win,
        offset:offset,
        getByClass:getByClass,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        getChildren:getChildren,
        prev:prev,
        prevAll:prevAll,
        next:next,
        nextAll:nextAll,
        sibling:sibling,
        siblings:siblings,
        firstChild:firstChild,
        lastChild:lastChild,
        index:index,
        appendChild:appendChild,
        prependChild:prependChild,
        insertBefore:insertBefore,
        insertAfter:insertAfter
    }
})();