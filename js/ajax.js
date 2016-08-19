~function () {
    //创建ajax对象(xml)，兼容所有浏览器，用惰性思想来改写
    function createXML() {
        var xml = null,
            flag = false,
            ary = [
                function () {
                    return new XMLHttpRequest;
                },
                function () {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                },
                function () {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                },
                function () {
                    return new ActiveXObject('Msxml3.XMLHTTP');
                }
            ];
        for (var i = 0; i < ary.length; i++) {
            var curFn = ary[i];
            try {
                //本次循环获取的方法执行没有出现错误才会走这里: 说明此方法是我想要的，我们下一次直接执行这个小方法即可，这就需要我们把createXML重写这个小方法(完成后不需要在判断下面的了，直接退出循环即可)
                xml = curFn();
                createXML = curFn;//让createXML等于这个兼容的小方法
                flag = true;//代表有兼容
                break;
            } catch (e) {
                //本次循环获取的方法执行出现错误: 继续执行下一次循环 这里可以什么都不写
            }
        }
        if (!flag) {
            throw new Error('your browser is not support ajax,please change your browser,try again!');
            //创建Error这个实例,抛出异常
        }
        return xml;
    }

//ajax: 实现ajax请求的公共方法 把不固定的当参数，如果参数多并且以后还可能在加 我们使用对象统一传值法，把需要传递的
//参数值都放在一个对象中，一起传递进去即可
    function ajax(options) {
        //把需要使用的参数值设定一个规则和初始值(默认值)
        var _default = {
            type: "get",//请求的方式
            url: "",//请求的地址
            dataType: "json",
            //设置请求回来的内容格式，json是返回的是json格式的对象，txt：就是字符串或者json格式的字符串
            async: true,//请求是同步还是异步，默认是异步
            data: null,//send 放在请求主体中的内容，因为post会把内容放到send里
            getHead: null,//函数数据类型的(回调函数)当readyState=2的时候执行的回调方法
            success: null//当readyState=4的时候执行的回调方法
        };
        //使用用户自己传进来的值覆盖我们的默认值
        for (var key in options) {
            if (options.hasOwnProperty(key)) {//只把私有的遍历到
                _default[key] = options[key];
                //把它覆盖 比如url 只会改变url其它的不会改变，顺序也没有关系，多传少传都行，可方便扩展
            }
        }
        //如果当前的请求方式是get我们需要在url的末尾加随机数来清除缓存
        if (_default.type === "get") {
            //判断url里面有没有？没有就是？有就是&
            _default.url.indexOf('?') >= 0 ? _default.url += '&' : _default.url += '?';
            _default.url += '_=' + Math.random();
        }
        //开始send ajax
        var xml = createXML();
        xml.open(_default.type, _default.url, _default.async);//这里的3个参数不固定
        xml.onreadystatechange = function () {
            if (/^2\d{2}$/.test(xml.status)) {
            //想要在 2 的时候做一些操作，需要保证ajax是异步请求，因为同步的时候只有4的时候才可以，永远不会等于2
                if (xml.readyState === 2) {
                    if (typeof _default.getHead === 'function') {
                        _default.getHead.call(xml);//把this变成xml 如果是2的话就把传进来的回调函数执行了
                    }
                }
                if (xml.readyState === 4) {
                    var val = xml.responseText;//它本身就是字符串类型的
                    //如果传递的参数值是json说明获取的内容应该是json格式的对象
                    if (_default.dataType === "json") {//把JSON格式的字符串转成JSON格式的数据
                        val = 'JSON' in window ? JSON.parse(val) : eval('(' + val + ')');
                    }
                    _default.success && _default.success.call(xml, val);
                    //如果它存在默认就是函数类型的了，就直接改变this,这里和上面的if判断function是一样的
                }
            }
        };
        xml.send(_default.data);
    }

    //把它放到全局上供外面调用
    window.ajax = ajax;
}();

//如果外面调用的话这样用
/*ajax({
    url: 'data.txt',
    type: 'get',
    dataType: 'json',
    async: false,
    getHead: function () {
        //this是当前的ajax对象 xml
        this.getResponseHeader('Date');//获取服务器的时间
    },
    success: function (data) {
        //this是当前的ajax对象 xml  data: 我们从服务器中获取的主体内容 和上面的val一样
    }
});*/































