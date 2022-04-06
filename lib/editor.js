
// MIT License

// Copyright (C) 2022 Jonathan Sanfilippo <jonathansanfilippo.uk@gmail.com> 

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.




function htmlview() {
  const element = document.getElementById("textareacontainer");
  if (element.className == "textareacontaineroff") {
    element.className = "textareacontaineron";
  } else {
    element.className = "textareacontaineron";
  }
}
function htmlhidden() {
  const element = document.getElementById("textareacontainer");
  if (element.className == "textareacontaineron") {
    element.className = "textareacontaineroff";
  } else {
    element.className = "textareacontaineroff";
  }
}


function csshidden() {
  const element = document.getElementById("textareacontainer2");
  if (element.className == "textareacontainer2on") {
    element.className = "textareacontainer2off";
  } else {
    element.className = "textareacontainer2off";
  }
}

function jshidden() {
  const element = document.getElementById("textareacontainer3");
  if (element.className == "textareacontainer3on") {
    element.className = "textareacontainer3off";
  } else {
    element.className = "textareacontainer3off";
  }
}





function cssview() {
  const element = document.getElementById("textareacontainer2");
  if (element.className == "textareacontainer2off") {
    element.className = "textareacontainer2on";
  } 
}


function scssview() {
  const element = document.getElementById("textareacontainer4");
  if (element.className == "textareacontainer4off") {
    element.className = "textareacontainer4on";
  } 
}

function jsview() {
  const element = document.getElementById("textareacontainer3");
  if (element.className == "textareacontainer3off") {
    element.className = "textareacontainer3on";
   
  }
}

function palette() {
  const element = document.getElementById("palette");
  if (element.className == "paletteoff") {
    element.className = "paletteon";
  } else {
     element.className = "paletteoff"; 
  }
  
}

function paletteoff() {
  const element = document.getElementById("palette");
  if (element.className == "paletteon") {
    element.className = "paletteoff";
  } else {
     element.className = "paletteoff"; 
  }
  
}



function note() {
  const element = document.getElementById("note");
  if (element.className == "noteoff") {
    element.className = "noteon";
  } else {
     element.className = "noteoff"; 
  }
  
}

function noteoff() {
  const element = document.getElementById("note");
  if (element.className == "noteon") {
    element.className = "noteoff";
  } else {
     element.className = "noteoff"; 
  }
  
}



if (window.addEventListener) {              
    window.addEventListener("resize", browserResize);
} else if (window.attachEvent) {                 
    window.attachEvent("onresize", browserResize);
}
var xbeforeResize = window.innerWidth;

function browserResize() {
    var afterResize = window.innerWidth;
    if ((xbeforeResize < (970) && afterResize >= (970)) || (xbeforeResize >= (970) && afterResize < (970)) ||
        (xbeforeResize < (728) && afterResize >= (728)) || (xbeforeResize >= (728) && afterResize < (728)) ||
        (xbeforeResize < (468) && afterResize >= (468)) ||(xbeforeResize >= (468) && afterResize < (468))) {
        xbeforeResize = afterResize;
        
        if (document.getElementById("board-0")) {
                adngin.queue.push(function(){  adngin.cmd.startAuction(["board"]); });
              }
         
    }
    
    fixDragBtn();
    showFrameSize();    
}

var fileID = "";

compile();
function compile(n) {
  if (window.editor) {
    window.editor.save();
  }

  var text = document.getElementById("ta").value + "<brunch></brunch>";
  var ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("id", "iframeResult");
  ifr.setAttribute("name", "iframeResult");  
  ifr.setAttribute("allowfullscreen", "true");  
  document.getElementById("iframewrapper").innerHTML = "";
  document.getElementById("iframewrapper").appendChild(ifr)
  


    
    
  if (fileID != "") { 
    var t=text;
    t=t.replace(/=/gi,"equalsign");
    t=t.replace(/\+/gi,"plussign");    
    var pos=t.search(/script/i)
    while (pos>0) {
      t=t.substring(0,pos) + "ta" + t.substr(pos,3) + "ta" + t.substr(pos+3,3) + "tag" + t.substr(pos+6);
	    pos=t.search(/script/i);
    }
      
      
   
    document.getElementById("code").value=t;
    document.getElementById("codeForm").action = "" + Math.random();
    document.getElementById('codeForm').method = "post";
    document.getElementById('codeForm').acceptCharset = "utf-8";
    document.getElementById('codeForm').target = "iframeResult";
    
    document.getElementById("codeForm").submit();
  } else {
    var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
    ifrw.document.open();
    ifrw.document.write(text);  
    ifrw.document.close();
  
    if (ifrw.document.body && !ifrw.document.body.isContentEditable) {
      ifrw.document.body.contentEditable = true;
      ifrw.document.body.contentEditable = false;
    
    }
  }
}

function compilecss(n) {
  if (window.editor2) {
    window.editor2.save();
  }
    
  

  var text = document.getElementById("css").value;
  var ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("id", "iframeResult");
  ifr.setAttribute("name", "iframeResult");  
  ifr.setAttribute("allowfullscreen", "true");  
  document.getElementById("iframewrapper").innerHTML = "";
  document.getElementById("iframewrapper").appendChild(ifr);
  if (fileID != "") {
    var t=text;
    t=t.replace(/=/gi,"equalsign");
    t=t.replace(/\+/gi,"plussign");    
    var pos=t.search(/script/i)
    while (pos>0) {
      t=t.substring(0,pos) + "ta" + t.substr(pos,3) + "ta" + t.substr(pos+3,3) + "tag" + t.substr(pos+6);
	    pos=t.search(/script/i);
    }
    document.getElementById("code").value=t;
    document.getElementById("codeForm").action = "" + Math.random();
    document.getElementById('codeForm').method = "post";
    document.getElementById('codeForm').acceptCharset = "utf-8";
    document.getElementById('codeForm').target = "iframeResult";
    document.getElementById("codeForm").submit();
  } else {
    var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
    ifrw.document.open();
    ifrw.document.write(text);  
    ifrw.document.close();
    //23.02.2016: contentEditable is set to true, to fix text-selection (bug) in firefox.
    //(and back to false to prevent the content from being editable)
    //(To reproduce the error: Select text in the result window with, and without, the contentEditable statements below.)  
    if (ifrw.document.body && !ifrw.document.body.isContentEditable) {
      ifrw.document.body.contentEditable = true;
      ifrw.document.body.contentEditable = false;
    }
  }
}




function compilejs(n) {
  if (window.editor3) {
    window.editor3.save();
  }
    
  

  var text = document.getElementById("js").value;
  var ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("id", "iframeResult");
  ifr.setAttribute("name", "iframeResult");  
  ifr.setAttribute("allowfullscreen", "true");  
  document.getElementById("iframewrapper").innerHTML = "";
  document.getElementById("iframewrapper").appendChild(ifr);
  if (fileID != "") {
    var t=text;
    t=t.replace(/=/gi,"equalsign");
    t=t.replace(/\+/gi,"plussign");    
    var pos=t.search(/script/i)
    while (pos>0) {
      t=t.substring(0,pos) + "ta" + t.substr(pos,3) + "ta" + t.substr(pos+3,3) + "tag" + t.substr(pos+6);
	    pos=t.search(/script/i);
    }
    document.getElementById("code").value=t;
    document.getElementById("codeForm").action = "" + Math.random();
    document.getElementById('codeForm').method = "post";
    document.getElementById('codeForm').acceptCharset = "utf-8";
    document.getElementById('codeForm').target = "iframeResult";
    document.getElementById("codeForm").submit();
  } else {
    var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
    ifrw.document.open();
    ifrw.document.write(text);  
    ifrw.document.close();
    //23.02.2016: contentEditable is set to true, to fix text-selection (bug) in firefox.
    //(and back to false to prevent the content from being editable)
    //(To reproduce the error: Select text in the result window with, and without, the contentEditable statements below.)  
    if (ifrw.document.body && !ifrw.document.body.isContentEditable) {
      ifrw.document.body.contentEditable = true;
      ifrw.document.body.contentEditable = false;
    }
  }
}



function showFrameSize() {
  var t;
  var width, height;
  width = Number(getStyleValue(document.getElementById("iframeResult"), "width").replace("px", "")).toFixed();
  height = Number(getStyleValue(document.getElementById("iframeResult"), "height").replace("px", "")).toFixed();
  document.getElementById("framesize").innerHTML = "<span>" + width + " x " + height + "</span>";
}
var dragging = false;
var stack;
function fixDragBtn() {
  var textareawidth, leftpadding, dragleft, containertop, buttonwidth
  var containertop = Number(getStyleValue(document.getElementById("container"), "top").replace("px", ""));
  if (stack != " horizontal") {
    document.getElementById("dragbar").style.width = "5px";    
    textareasize = Number(getStyleValue(document.getElementById("textareawrapper"), "width").replace("px", ""));
    leftpadding = Number(getStyleValue(document.getElementById("textarea"), "padding-left").replace("px", ""));
    buttonwidth = Number(getStyleValue(document.getElementById("dragbar"), "width").replace("px", ""));
    textareaheight = getStyleValue(document.getElementById("textareawrapper"), "height");
    dragleft = textareasize + leftpadding + (leftpadding / 2) - (buttonwidth / 2);
    document.getElementById("dragbar").style.top = containertop + "px";
    document.getElementById("dragbar").style.left = dragleft + "px";
    document.getElementById("dragbar").style.height = textareaheight;
    document.getElementById("dragbar").style.cursor = "col-resize";
    
  } else {
    document.getElementById("dragbar").style.height = "5px";
    if (window.getComputedStyle) {
        textareawidth = window.getComputedStyle(document.getElementById("textareawrapper"),null).getPropertyValue("height");
        textareaheight = window.getComputedStyle(document.getElementById("textareawrapper"),null).getPropertyValue("width");
        leftpadding = window.getComputedStyle(document.getElementById("textarea"),null).getPropertyValue("padding-top");
        buttonwidth = window.getComputedStyle(document.getElementById("dragbar"),null).getPropertyValue("height");
    } else {
        dragleft = document.getElementById("textareawrapper").currentStyle["width"];
    }
    textareawidth = Number(textareawidth.replace("px", ""));
    leftpadding = Number(leftpadding .replace("px", ""));
    buttonwidth = Number(buttonwidth .replace("px", ""));
    dragleft = containertop + textareawidth + leftpadding + (leftpadding / 2);
    document.getElementById("dragbar").style.top = dragleft + "px";
    document.getElementById("dragbar").style.left = "5px";
    document.getElementById("dragbar").style.width = textareaheight;
    document.getElementById("dragbar").style.cursor = "row-resize";        
  }
}
function dragstart(e) {
  e.preventDefault();
  dragging = true;
  var main = document.getElementById("iframecontainer");
}
	
function dragmove(e) {
  if (dragging) 
  {
    document.getElementById("shield").style.display = "block";        
    if (stack != " horizontal") {
      var percentage = (e.pageX / window.innerWidth) * 100;
      if (percentage > 5 && percentage < 98) {
        var mainPercentage = 100-percentage;
        document.getElementById("textareacontainer").style.width = percentage + "%";
        document.getElementById("textareacontainer2").style.width = percentage + "%";
        document.getElementById("textareacontainer3").style.width = percentage + "%";
        document.getElementById("iframecontainer").style.width = mainPercentage + "%";
        document.getElementById("palette").style.width = mainPercentage + "%";
        document.getElementById("note").style.width = mainPercentage + "%";
        //document.getElementById("").style.width = mainPercentage + "%";
        fixDragBtn();
      }
    } else {
      var containertop = Number(getStyleValue(document.getElementById("container"), "top").replace("px", ""));
      var percentage = ((e.pageY - containertop + 20) / (window.innerHeight - containertop + 20)) * 100;
      if (percentage > 5 && percentage < 98) {
        var mainPercentage = 100-percentage;
        document.getElementById("textareacontainer").style.height = percentage + "%";
        document.getElementById("textareacontainer2").style.height = percentage + "%";
        document.getElementById("textareacontainer3").style.height = percentage + "%";
        document.getElementById("iframecontainer").style.height = mainPercentage + "%";
         document.getElementById("palette").style.height = mainPercentage + "%";
        document.getElementById("note").style.height = mainPercentage + "%";
        //document.getElementById("").style.height = mainPercentage + "%";
        fixDragBtn();
      }
    }
    showFrameSize();    
  }
}

	
function dragend() {
  document.getElementById("shield").style.display = "none";
  dragging = false;
  var vend = navigator.vendor;
  if (window.editor && vend.indexOf("Apple") == -1) {
      window.editor.refresh();
  }
}
if (window.addEventListener) {              
  document.getElementById("dragbar").addEventListener("mousedown", function(e) {dragstart(e);});
  document.getElementById("dragbar").addEventListener("touchstart", function(e) {dragstart(e);});
  window.addEventListener("mousemove", function(e) {dragmove(e);});
  window.addEventListener("touchmove", function(e) {dragmove(e);});
  window.addEventListener("mouseup", dragend);
  window.addEventListener("touchend", dragend);
  window.addEventListener("load", fixDragBtn);
  window.addEventListener("load", showFrameSize);
}

		

function getStyleValue(elmnt,style) {
   if (window.getComputedStyle) {
        return window.getComputedStyle(elmnt,null).getPropertyValue(style);
    } else {
        return elmnt.currentStyle[style];
   }
}

var calculateContentHeight = function( ta, scanAmount ) {
    var origHeight = ta.style.height,
        height = ta.offsetHeight,
        scrollHeight = ta.scrollHeight,
        overflow = ta.style.overflow;
    /// only bother if the ta is bigger than content
    if ( height >= scrollHeight ) {
        /// check that our browser supports changing dimension
        /// calculations mid-way through a function call...
        ta.style.height = (height + scanAmount) + 'px';
        /// because the scrollbar can cause calculation problems
        ta.style.overflow = 'hidden';
        /// by checking that scrollHeight has updated
        if ( scrollHeight < ta.scrollHeight ) {
            /// now try and scan the ta's height downwards
            /// until scrollHeight becomes larger than height
            while (ta.offsetHeight >= ta.scrollHeight) {
                ta.style.height = (height -= scanAmount)+'px';
            }
            /// be more specific to get the exact height
            while (ta.offsetHeight < ta.scrollHeight) {
                ta.style.height = (height++)+'px';
            }
            /// reset the ta back to it's original height
            ta.style.height = origHeight;
            /// put the overflow back
            ta.style.overflow = overflow;
            return height;
        }
    } else {
        return scrollHeight;
        
    }
}


var calculateHeight = function() {
    var ta = document.getElementById("ta"),
        style = (window.getComputedStyle) ?
            window.getComputedStyle(ta) : ta.currentStyle,
        
        // This will get the line-height only if it is set in the css,
        // otherwise it's "normal"
        taLineHeight = parseInt(style.lineHeight, 10),
        // Get the scroll height of the textarea
        taHeight = calculateContentHeight(ta, taLineHeight),
        // calculate the number of lines
        numberOfLines = Math.ceil(taHeight / taLineHeight);

    document.getElementById("linehtml").innerHTML = "" +
        (numberOfLines - 1 ) + " ";
    
};


var calculateHeight2 = function() {
    var ta = document.getElementById("css"),
        style = (window.getComputedStyle) ?
            window.getComputedStyle(ta) : ta.currentStyle,
        
        // This will get the line-height only if it is set in the css,
        // otherwise it's "normal"
        taLineHeight = parseInt(style.lineHeight, 10),
        // Get the scroll height of the textarea
        taHeight = calculateContentHeight(ta, taLineHeight),
        // calculate the number of lines
        numberOfLines = Math.ceil(taHeight / taLineHeight);

    document.getElementById("linecss").innerHTML = " " +
        (numberOfLines - 1 ) + " ";
    
};

var calculateHeight3 = function() {
    var ta = document.getElementById("js"),
        style = (window.getComputedStyle) ?
            window.getComputedStyle(ta) : ta.currentStyle,
        
        // This will get the line-height only if it is set in the css,
        // otherwise it's "normal"
        taLineHeight = parseInt(style.lineHeight, 10),
        // Get the scroll height of the textarea
        taHeight = calculateContentHeight(ta, taLineHeight),
        // calculate the number of lines
        numberOfLines = Math.ceil(taHeight / taLineHeight);

    document.getElementById("linejs").innerHTML = " " +
        (numberOfLines - 1 ) + " ";
    
};


calculateHeight3();
calculateHeight2();
calculateHeight();


if (ta.addEventListener) {
    ta.addEventListener("mouseup", calculateHeight, false);
    ta.addEventListener("keyup", calculateHeight, false);
} else if (ta.attachEvent) { // IE
    ta.attachEvent("onmouseup", calculateHeight);
    ta.attachEvent("onkeyup", calculateHeight);
    
}



function  tabHTML() {
    htmltogglecopy(); 
    compilecss(1); 
    compilejs(1); 
    compile(1); 
    load();
    htmlview();
    jshidden();
    csshidden();
    calculateHeight(); 
    calculateHeight2(); 
    calculateHeight3(); 
     
    notifica2b(); 
    setTimeout(notifica0, 5000);    

}

function tabCSS() {
    csstogglecopy();
    htmlhidden();
    jshidden();
    cssview();
    compilecss(1); 
    compilejs(1); 
    compile(1); 
    load();
    calculateHeight(); 
    calculateHeight2(); 
    calculateHeight3();
    notifica2b(); 
    setTimeout(notifica0, 5000);  
    
}

function tabSCSS() {
    scsstogglecopy();
    htmlhidden();
    jshidden();
    csshidden();
    compilecss(1); 
    compilejs(1); 
    compile(1); 
    load();
    calculateHeight(); 
    calculateHeight2(); 
    calculateHeight3();
    notifica2b(); 
    setTimeout(notifica0, 5000);  
    
}



function  tabJS() {
    jstogglecopy()
    htmlhidden();
    csshidden();
    jsview();
    compilecss(1); 
    compilejs(1); 
    compile(1); 
    load();
    calculateHeight(); 
    calculateHeight2(); 
    calculateHeight3();
    notifica2b(); 
    setTimeout(notifica0, 5000);
    
}

function compileAll() {
  
    compilecss(1); 
    compilejs(1); 
    compile(1); 
    load(); 
    notifica2(); 
    setTimeout(notifica0, 5000); 
    calculateHeight(); 
    calculateHeight2(); 
    calculateHeight3();
     
    
}

function save() {
    
    compilecss(1); 
    compilejs(1); 
    compile(1); 
    load();  
    dynamicSave();
    dynamicSave2();
    dynamicSave2b()
    dynamicSave3();
    notifica1(); 
    setTimeout(notifica0, 5000);
   
}




function FullScreen() {
    openFullscreen();
    closeFullscreen();
    notifica5();
    setTimeout(notifica0, 5000);
    testomenufs();
}

function FontSize() {
    notifica3();
    setTimeout(notifica0, 5000);
    testomenufont();
}

function StartStop() {
   
    setTimeout(notifica0, 5000);
    timerdisplay();
}


function PomodoroOff(){
    StartOff();
    PomodoroReset(); 
    notifica4(); 
    setTimeout(notifica0, 5000);
}


 