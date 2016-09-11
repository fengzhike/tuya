(function(){
    var oHtml = document.getElementsByTagName('html')[0];
    var iWidth = document.documentElement.clientWidth;
    iWidth = iWidth >540? 540 : iWidth;
    oHtml.style.fontSize = iWidth/16 +'px';
            //alert(oHtml.style.fontSize)  
              

})();

