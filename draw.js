(function(){
        window.onload = function (){
                var oCon1 = $('#con1');
                var aPen = $('span',oCon1);
            
                //alert(aPen.length)
                ////改变笔画粗细 nThin
            var nThin = 0;
            var arrnThin = ['1','3','5']
            for(var i=0;i<aPen.length;i++){
                aPen[i].idx = i;
                aPen[i].onclick = function(){
                    for(var j = 0; j < aPen.length; j++){
                        aPen[j].className = '';
                    };
                    this.className = 'active';
                    nThin = this.idx;
                    //console.log( nThin )
                }
            };
        //改变颜色 nColor
            var nColor = 0;
            var arrColor = ['#fff','#fb9701','#21a8e7','#2fc','#2ecc71','#222'];
            var aColor = $('span',$('#color'));
            //alert(aColor.length)
            for(var j=0; j<aColor.length; j++){
                aColor[j].idx = j;
                aColor[j].onclick = function(){
                    for(var k=0; k<aColor.length;k++){
                        aColor[k].className = '';
                    };
                    this.className = 'checked';
                    nColor = this.idx;
                    //console.log(nColor);
                }
            };
        //涂鸦功能
            var oDrawBg = $('#drawBg');

            var  clientWidth = document.documentElement.clientWidth;
            clientWidth=clientWidth>540? 540:clientWidth;
            //根据设计图中的canvas画布的占比进行设置
            var canvasWidth = Math.floor(clientWidth*90/100);
            oDrawBg.setAttribute('width',canvasWidth +'px');
            oDrawBg.setAttribute('height',canvasWidth +'px');

            var oCx = oDrawBg.getContext("2d");
            var arr = [];
            
           //  兼容事件


            
        // oDrawBg.onmousedown = function(e){
        //         e = e ||event;
        //         handleDown(e)
        //  };
            // touch 事件


            oDrawBg.addEventListener('touchstart',handleTouchStart , false);

            function handleTouchStart (e){
                e = e.touches[0]
                handleDown(e)
            }
            
        //撤销
            var oRevoke = $('#revoke');
            oRevoke.onclick = function(){
                
                if(arr.length === 0  ) return;
                oCx.clearRect(0, 0,canvasWidth ,canvasWidth );
                oCx.putImageData(arr[arr.length-1], 0,0);
                arr.pop();
                //console.log(1)
                //console.dir(arr);
            }    
        //清空
            var oCancle = $('#cancle');
            oCancle.onclick = function(){
                oCx.clearRect(0, 0,canvasWidth ,canvasWidth );
                arr = [];
            }
            
            function handleDown (e){
                var l0 = e.clientX-oDrawBg.offsetLeft;
                var t0 = e.clientY-oDrawBg.offsetTop;
                //console.log( l0,t0)
                oCx.save();
                oCx.lineCap='round';
                oCx.lineWidth =arrnThin[nThin] ;
                oCx.strokeStyle =arrColor[nColor] ;
                oCx.beginPath();

                oCx.moveTo(e.clientX-oDrawBg.offsetLeft, e.clientY-oDrawBg.offsetTop);

                oDrawBg.removeEventListener('touchmove',handleTouchmove)
                oDrawBg.addEventListener('touchmove',handleTouchmove,false)

                function handleTouchmove(e){
                    debugger
                        e = e.touches[0];
                        var l = e.clientX;
                        var t = e.clientY;
                        oCx.lineTo(l-oDrawBg.offsetLeft, t-oDrawBg.offsetTop);
                        oCx.stroke();
                }
                oDrawBg.onmousemove = function(e){

                    e = e||event;
                    var l = e.clientX;
                    var t = e.clientY;
                    oCx.lineTo(l-oDrawBg.offsetLeft, t-oDrawBg.offsetTop);
                    oCx.stroke();
                };

                document.removeEventListener('touchend',handleTouchend)
                document.addEventListener('touchend',handleTouchend,false)
                function handleTouchend (e){
                        oCx.closePath();
                        oCx.restore();
                        oDrawBg.removeEventListener('touchstart', handleTouchStart);
                }
                document.onmouseup = function(){
                    oCx.closePath();
                    oCx.restore();
                    document.onmouseup = oDrawBg.onmousemove = null;
                }
                var imgData = oCx.getImageData(0,0, canvasWidth, canvasWidth);
                arr.push( imgData );
            }


            

        };
})()