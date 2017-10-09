
//$选择器：
//参数说明：
//一、selector：第一个参数，id选择时，传入#id名字;tagName选择时，传入tagName;classname选择时 ，传入'.className';
//二、content：第二个参数，tagName选择时，传入选择范围，默认document;
// function $(selector,content){
//     //拿到selector的第一个字符
//     var firstChar = selector.charAt(0); 
//     var obj = content || document;
//     return (firstChar === "#")? document.getElementById(selector.slice(1)): obj.getElementsByTagName(selector);
// };
function $(selector,content){
    var fistChar = selector.substring(0,1);
    var content = content||document;
    if( fistChar ==='#' ){
        return document.getElementById(selector.substring(1));
    }else if( fistChar === '.' ){
        var allElement = content.getElementsByTagName('*');
        var elements = [];
        for( var i = 0; i < allElement.length; i++ ){
            var classNames = allElement[i].className;
            var arr= classNames.split(' ');
            for( var j = 0; j < arr.length;j++){
                if(arr[j] === selector.slice(1)){
                    elements.push(allElement[i]);
                    break;
                };
            };
        };
        return elements;

    }else{
        return content.getElementsByTagName(selector,content);
    }
};

function IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
            }
       }
    return flag;
 }



//getStyle，获取属性函数
//参数说明：
//一、obj，要获取属性的对象
//二、attr，要获取的属性
function getStyle( obj,attr ){
    return  obj.currentStyle? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
};

//doMove():函数
//      作用：做动画
//      参数说明：
//      一、obj，要运动的元素
//      二、attr，运动元素改变的属性
//      三、speed，步长(速度值)
//      四、aTime，频率(间隔时间)
//      五、target，目标值(停止条件)
//      六、callBack，回调函数
function doMove (obj,attr,speed,aTime,target,callBack) {
    if(obj.timerMove) return;  //定时器存在时，不能再点了，再点不生效
    var num = parseFloat(getStyle(obj,attr));//获取元素初始位置
    speed = num > target? -Math.abs(speed) : Math.abs(speed);//给速度赋值，根据target和元素属性值判断如何运动，根据运动方向确定speed的正负
    obj.timerMove = setInterval(function(){//给obj定义timer属性存储定时器

        num += speed;  //定时器工作一次，运动的距离为步长

        if( speed < 0 && num <= target ||speed > 0 && num >= target ){//确保正方向运动用num >= target判断，负方向运动用num <= target判断，防止一步弹到；
         //也可以用 if(Math.abs( target - num ) < Math.abs(speed))判断是否到终点
            num = target;
            clearInterval(obj.timerMove);//到达目标，停止定时器
            obj.timerMove = null;//定时器停止，按钮要有作用，不清空，点击无效
            obj.style[attr] = num + 'px';
            (typeof callBack === 'function') && callBack();//若是函数，则回调函数
        }else{
            obj.style[attr] = num + 'px';
        };
    } , aTime);  
};
//用时间版doMove


//tab选项卡函数
//参数说明：
//      一、obj，选项按钮组
//      二、activeObj，响应元素组
//      三、className，选项按钮选中样式
//      四、action，按钮组事件，默认onclick，可以传入其他事件
//  
function tab( obj,activeObj,classNames,action ){
    
    for( var i = 0; i < obj.length; i++ ){
        obj[i].index = i;
        obj[i][ action || "onclick" ] = function (){
            for( var j = 0; j < obj.length; j++ ){
                obj[j].className = "";
                activeObj[j].style.display = "none";    
            };
            this.className = classNames;
            activeObj[this.index].style.display = "block";  
        };
    };   
};

//抖函数
//参数说明：
//      一、obj：抖动对象
//      二、attr：变化的属性
//      三、speed：振幅最大值，控制抖动频率
function shake( obj,attr,speed ,callBack){
    //6. 如果定时器已经在开启，移入的时候，就不向下执行
    if(obj.timerShake) return;
    // 1.
    var arr = [],
        l = parseFloat(getStyle(obj,attr)); //获取一下元素最开始的位置。
    //2.
    for( var i = speed; i > 0; i-=3 ){
        arr.push(-i,i);
    };
    //4. 始终保持最后一个数为0；
    arr.push(0);
    //3.开定时器，变换left值
    var n = 0;
    obj.timerShake = setInterval(function(){
        obj.style[attr] = l + arr[n] + "px";
        n++;
        // 5. 清掉定时器
        if( n > arr.length - 1 ){
            clearInterval(obj.timerShake);
            obj.timerShake = null;
            if(typeof callBack === "function"){
                callBack();
            }
        }
    },30)   
};
function addZero(m){
    if( m < 10 ){
        return "0"+m;
    }else{
        return m;
    }
}
  

//forEack:
//      对数组循环
//      参数
//          一、arr，要循环的数组
//          二、callback ，回调函数
//          callBack(arr[i],i);
//              回调函数传入数组的某一项和对应的索引
function forEach (arr,callBack){
    for ( var i = 0; i < arr.length; i++ ){
        callBack(arr[i],i);
    };
};


//indexOf()  数组查找元素位置方法
//      用法：indexOf(arr,searchValue,searchIndex);
//      参数说明：
//          一、arr，要操作的数组
//          二、searchValue：要查找的元素
//          三、searchIndex：起始查找位置
function indexOf(arr,searchValue,searchIndex){
    var onOff = true;
    if(arguments.length === 1||arguments.length === 0) return -1;
    for(var i = searchIndex||0; i < arr.length; i++){
        if( arr[i] === searchValue ) return i;
    }
    return -1;
};
///////////////////DOM//////////////////////////////////////////
//element的第一个子节点
function first(element){
    var firstElement = element.firstElementChild || element.firstChild;
    if( !firstElement || firstElement.nodeType !== 1 ){
        return null
    }else{
        return firstElement;
    }
};
//element的最后一个子节点
function last(element){
    var lastElement = element.lastElementChild || element.lastChild;
    if( !lastElement || lastElement.nodeType !== 1 ){
        return null
    }else{
        return lastElement;
    }
}
//element的下一个子节点
function next(element){
    var nextElement = element.nextElementSibling || element.nextSibling;
    if( !nextElement || nextElement.nodeType !== 1 ){
        return null
    }else{
        return nextElement;
    }
};
//element的前一个子节点
function prev(element){
    var prevElement = element.previousElementSibling || element.previousSibling;
    if( !prevElement || prevElement.nodeType !== 1 ){
        return null
    }else{
        return prevElement;
    }
};
//obj距离页面左侧和顶部的距离{}
//  top:  getOffset(obj).top
//  left: getOffset(obj).left
function getOffset( obj ){
    var left = 0, top = 0;
    var borderLeft = parseInt( getStyle(obj,"borderLeftWidth") );
    var borderTop = parseInt( getStyle(obj,"borderTopWidth") );
    borderLeft = isNaN( borderLeft )? 0 : borderLeft;
    borderTop = isNaN( borderTop )? 0 : borderTop;

    while( obj ){
        var borderL = parseInt( getStyle(obj,"borderLeftWidth") ) || 0;
        var borderT = parseInt( getStyle(obj,"borderTopWidth") ) || 0;

        left += obj.offsetLeft+borderL;
        top += obj.offsetTop+borderT;
        obj = obj.offsetParent;
    };

    return {
        left:left-borderLeft,
        top:top-borderTop
    };
};

//检测碰撞  碰上 返回true，没碰上false
function collisionTest(obj1,obj2){

    //碰撞的元素
    var obj1L = obj1.offsetLeft;
    var obj1T = obj1.offsetTop;
    var obj1W = obj1.offsetWidth;
    var obj1H = obj1.offsetHeight;

    //被碰撞的元素
    var obj2L = obj2.offsetLeft;
    var obj2T = obj2.offsetTop;
    var obj2W = obj2.offsetWidth;
    var obj2H = obj2.offsetHeight;

    if( obj1L+obj1W < obj2L || obj1T + obj1H < obj2T || obj1L > obj2L + obj2W || obj1T > obj2T + obj2H  ){ //没碰上 返回false
        return false;
    }else{
        return true;
    };
};
 /////////鼠标滚轮函数，参数说明：
        //          一、发生元素
        //          二、上滚动函数
        //          三、下滚动函数
function mousewheel (oDiv,upFn,downFn){
    oDiv.onmousewheel = fn;
    if(oDiv.addEventListener ){
        oDiv.addEventListener('DOMMouseScroll',fn, false);
    };

    function fn(ev){
        ev = ev || event;
        var direc = false;
        if( ev.wheelDelta ){
            direc = ev.wheelDelta>0 ? true:false;
        };
        if( ev.detail ){
            direc = ev.detail<0 ? true:false;
            ev.preventDefault();
        };

        if( direc ){
            typeof upFn === "function" && upFn(ev);
        }else{
            typeof downFn === "function" && downFn(ev)
        };
        
        return false;
    }
};
//cookie的设置
function setCookie( k,v,t ){//t:天数
    var now = new Date();
    now.setDate(now.getDate() + t);
    console.log(now.toUTCString())//变为国际时间
    document.cookie = k+'='+v+';expires='+now.toUTCString();
}
//cookie的获取
function getCookie( key ){
    var cookies = document.cookie;
    var arr = cookies.split('; ');
    for(var i=0;i< arr.length ;i++){
        var newArr = arr[i].split( '=' );
        if( newArr[0]===key ) return newArr[1];
    };
    return '没有该cookie';     
}
//cookie的清除
function removeCookie(key){
    setCookie(key,"",-2);
};
//可视区域的宽高

function view(){
    return {
        W:document.documentElement.clientWidth,
        H:document.documentElement.clientHeight
    }
}

//获取滚动条的距离  
// Y轴上  scrollTop  X轴上 scrollLeft
function scrollT(){
    return document.body.scrollTop || document.documentElement.scrollTop;
}
function scrollL(){
    return document.body.scrollLeft || document.documentElement.scrollLeft;
}
