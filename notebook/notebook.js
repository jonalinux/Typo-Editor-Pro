// JavaScript Document

// Notebook

   var menu2 = document.getElementById("menu2");
   var toolbar = document.getElementById("toolbar");
   var getFilename = document.getElementById("getFilename");
   var bar = document.getElementById("bar");
   var area = document.getElementById("area");
   var fileElem=document.getElementById("fileElem");
   var resetParamsBtn = document.getElementById("resetParamsBtn");
   var autoSaveSwitch = document.getElementById("autoSaveSwitch");
   var autoSaveNum = document.getElementById("autoSaveNum");
   var autoSaveSel = document.getElementById("autoSaveSel");
   var textLinesSwitch = document.getElementById("textLinesSwitch");
   var darkmodeSwitch = document.getElementById("darkmodeSwitch");
   var fontSizeNum=document.getElementById("fontSizeNum");
   var fontFamilySel=document.getElementById("fontFamilySel");
   var fontWeightSel=document.getElementById("fontWeightSel");
   var autoSaveDownBtn=document.getElementById("autoSaveDownBtn");
   var autoSavePrefBtn=document.getElementById("autoSavePrefBtn");
   var autoSaveModal=document.getElementById("autoSaveModal");
   var prefModal=document.getElementById("prefModal");
   var filename = document.getElementById("filename");
   var spellbtn = document.getElementById("spellbtn");

   var resetParamsFlag=false;
 	var browser;
   var chars,words;
	var selectedText = "";
	var selectionStart,selectionEnd;
   var browser;
	var txt_hist,pos_hist,ihist,nhist,Nhist;
	var ctrlDown=false;
	var key={tabKey:9,enterKey:13,shiftKey:16,ctrlKey:17,altKey:18,capsKey:20,pageupKey:33,pagedownKey:34,leftKey:37,upKey:38,rightKey:39,downKey:40,delKey:46,aKey:65,cKey:67,sKey:83,vKey:86,xKey:88,yKey:89,zKey:90};
   var autoSaveTimeout=null;
   var params;
   var paramsInit = {
      filename:"",
      autoSaveDelay:86400000, //ms
      autoSaveLast:0, //ms
      textLines:true,
      theme:0, //0-normal 1-dark
      fontSize:14,
      fontFamilySel:0, //Arial
      fontWeightSel:0 //Normal
   };

	$(window).blur( function()
	{
		selectedText="";
      if( area.value!="" )
		   LocalSave();
	});
	
	$(window).on("unload", function(e)
	{
		LocalSave();
      if( resetParamsFlag==true )
         localStorage.removeItem("notepad_params");
	});
	$(document).ready( function()
	{
		txt_hist = new Array();
		pos_hist = new Array();
		Nhist = 10;
		nhist = 0;
		ihist = 0;
		
		browser = get_browser();
      if( browser=="Firefox" ) paramsInit.textLines=false;

      LocalLoad();

		$("#area").keydown(function(e) { onkeydown(e); });
		$("#area").keyup(function(e) {
         var noCharKeys=[key.shiftKey,key.ctrlKey,key.altKey,key.capsKey,key.pageupKey,key.pagedownKey,key.leftKey,key.upKey,key.rightKey,key.downKey];
         if( noCharKeys.indexOf(e.which)==-1 )
		      SetBar(1);
         else
		      SetBar(0);
		});
		$("#area").click(function() {
			pos = getCaret();
			if( pos!=pos_hist[ihist] )
				Snapshot();
			SetBar(0);
         $(".dropdown-menu").dropdown('hide');
			return false;
		});

     

     
      resetParamsBtn.onclick = function() { resetParams(); }
      autoSaveSwitch.onchange = function() { setAutoSave(); }
      autoSaveNum.onchange = function() { setAutoSave(); }
      autoSaveSel.onchange = function() { setAutoSave(); }
      textLinesSwitch.onchange = function() { setTextLines(); }
      darkmodeSwitch.onchange = function() { darkModeToggle(); }
      fontSizeNum.onchange = function() { setFont(); }
      fontFamilySel.onchange = function() { setFont(); }
      fontWeightSel.onchange = function() { setFont(); }
      autoSaveDownBtn.onclick = function() { Save(); }
      autoSavePrefBtn.onclick = function() { showPrefModal(); } //!!!!!!!!!!!!!!!!!!!!<<<???

		//if( browser=="Chrome" )
		//	TextLinesToggle();
		setCaret(0);
		SetBar(1);
		Snapshot();
      initFontSel();
		//alert("Please press the Save button to backup your notes. Rapidtables.com will upgrade to secured http in several days.");

      if(!navigator.share) {
         var el = document.querySelector("#toolbar>button:nth-child(3)");
         el.style.display="none";
      }
      var p = GetURLParams();
      if( Object.keys(p).length>0 && p.txt!="" ) {
         area.value = decodeURIComponent(p.txt)+"\n\n"+area.value;
      }
	});
   function GetURLParams()
   {
      var url=window.location.href;
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
            //url = "www.domain.com/?v=123&p=hello",
            params = {},
            match;
      while(match = regex.exec(url)) {
         params[match[1]] = match[2];
      }
      return params;
   }
   function initFontSel()
   {
      // Init font family select
      for(var i=0; i<fontFamilySel.options.length; i++) {
         var ff=fontFamilySel.options[i];
         ff.style.fontFamily=ff.value;
      }
   }
	function onkeydown(e)
	{
		var evtobj = window.event? event : e;
		var ctrlKey=evtobj.ctrlKey;
		var keyCode=evtobj.keyCode;
		if( ctrlKey )
		{
			if( keyCode==key.aKey )
			{
            e.preventDefault();
            SelectAll();  
			}
			if( keyCode==key.sKey )
			{
				e.preventDefault();
				Save();
				return false;
			}
			// Ctrl+Z
			if( keyCode==key.zKey )
			{
				e.preventDefault();
				Undo();
			}
			// Ctrl+Y
			if( keyCode==key.yKey )
			{
				e.preventDefault();
				Redo();
			}
			// Ctrl+C
			if( keyCode==key.cKey )
			{
				//e.preventDefault();
				Copy();
			}
			// Ctrl+V
			if( keyCode==key.vKey )
			{
				if( selectedText.length!=0 )
					e.preventDefault();
				Paste();
			}
			// Ctrl+X
			if( keyCode==key.xKey )
			{
				//e.preventDefault();
				Cut(1);
			}
		}
		// page up/down
		if( keyCode==key.upKey || keyCode==key.downKey )
		{
			area.focus();
		}
		// tab
		if( keyCode==key.tabKey )
		{
			e.preventDefault();
			Snapshot();
			s = getSelect(area);
			var text = area.value;
			fillString(text, '\u0009', s.start, s.end);
			pos = s.start+1;
			setCaret(pos);
		}
		// delete
		if( keyCode==key.delKey )
		{
			Del2();
		}
      // enter: chrome bugfix of text jump when enter in textarea
		if( keyCode==key.enterKey )
		{
			e.preventDefault();
			//Snapshot();
			var text = area.value;
			s = getSelect(area);
         fillString(text, "\n", s.start, s.end);
		   var pos = s.start;
		   setCaret(pos+1);
			Snapshot();
		}
	}
	function LocalLoad()
	{
		area.value = localStorage.getItem("notepad_text");
		params = localStorage.getObject("notepad_params");
      //debugger;
      if( area.value=="" )
         setWarning();
      // Set default values
      if( params==null )
         params = paramsInit;
      if( typeof Object != "undefined" )
         if( typeof Object.keys != "undefined" ) {     
            var keyNames = Object.keys(paramsInit);
            var prop,name;
            for(prop in keyNames ) {
               name = keyNames[prop];
               if( typeof params[name] === "undefined" )
                  params[name]=paramsInit[name];
            }
         }

      getParams();
      setAutoSave();
      //autoSaveHandle();
      setTextLines();
      //setDarkMode();
      darkModeToggle();
      setFont();
      SetDocTitle();
	}
	function LocalSave()
	{
		localStorage.setItem("notepad_text",area.value);
	   localStorage.setObject("notepad_params",params);
		//area.focus();
	}
   function showPrefModal()
   {
      $('#prefModal').modal('show');
      $('#autoSaveModal').modal('hide');
   }
   function showAutoSaveModal()
   {
      $('#prefModal').modal('hide');
      $('#autoSaveModal').modal('show');
   }
   function setWarning()
   {
      var p=document.getElementById("private-alert");
      p.style.display="block";
   }
   function getParams()
   {
      filename.value = params.filename;
      //if( params.autoSave==0 ) {
      autoSaveSwitch.checked = (params.autoSaveDelay>0)?true:false;
      if( params.autoSaveDelay<3600000 ) params.autoSaveDelay=3600000;
      autoSaveNum.value = (params.autoSaveDelay>=86400000)?Math.round(params.autoSaveDelay/86400000):Math.round(params.autoSave/3600000);
      autoSaveSel.selectedIndex = (params.autoSaveDelay<86400000)?"0":"1";
      textLinesSwitch.checked = params.textLines;
      darkmodeSwitch.checked = (params.theme==0)?false:true;
      fontSizeNum.value = params.fontSize;
      fontFamilySel.selectedIndex = params.fontFamilySel;
      fontWeightSel.selectedIndex = params.fontWeightSel;
   }
   function resetParams()
   {
      resetParamsFlag=true;
      alert("Please reload page to finish reset");
   }
   function setAutoSave()
   {
      if( autoSaveTimeout!=null ) {
         clearTimeout(autoSaveTimeout);
         autoSaveTimeout = null;
      }

      if( autoSaveSwitch.checked ) {
         autoSaveNum.disabled=false;
         autoSaveSel.disabled=false;
         var i=autoSaveSel.selectedIndex;
         var dt=[3600000,86400000]; //1h,1day
         var num=autoSaveNum.value;
         if( num=="" ) num=1;
         var delay=dt[i]*num;
         if( delay<600000 ) return;
         params.autoSaveDelay = delay;
         //autoSaveTimeout = setTimeout(autoSaveHandle, delay);
         var now = Date.now();
         if( params.autoSaveLast==0 )
            params.autoSaveLast = now;
         var dt = params.autoSaveLast+params.autoSaveDelay-now;
         if( dt>0 )
            autoSaveTimeout = setTimeout(autoSaveHandle, dt);
         else {
            dt = dt%params.autoSaveDelay;
            params.autoSaveLast = now-dt;
            autoSaveHandle();
         }
      }
      else {
         autoSaveNum.disabled=true;
         autoSaveSel.disabled=true;
         params.autoSaveDelay = 0;
         params.autoSaveLast = 0;
      }
   }
   function autoSaveHandle()
   {
      var now = Date.now();
      params.autoSaveLast+=params.autoSaveDelay;
      var dt = params.autoSaveLast+params.autoSaveDelay-now;
      autoSaveTimeout = setTimeout(autoSaveHandle, dt);
      showAutoSaveModal();
      console.log(new Date().toLocaleString());
   }
   function setTextLines()
   {
      //if( params.textLines==true )
      if( textLinesSwitch.checked ) {
			$("#area").addClass("notes");
         params.textLines=true;
      }
		else {
			$("#area").removeClass("notes");
         params.textLines=false;
      }
   }
   function darkModeToggle()
   {
      if( !darkmodeSwitch.checked && params.theme==0 ) return;
      if( darkmodeSwitch.checked ) {
         $('.btn-light').toggleClass('btn-light').toggleClass('btn-dark');
         params.theme = 1;
      }
      else {
         $('.btn-dark').toggleClass('btn-light').toggleClass('btn-dark');
         params.theme = 0;
      }
      $('#area').toggleClass('notes').toggleClass('notes-dark');
      $('body,#menu2,#toolbar,#bar').toggleClass('bg-light').toggleClass('bg-dark');
      $('#bar').toggleClass('text-light').toggleClass('text-dark');
      $('.dropdown-menu').toggleClass('bg-dark').toggleClass('p-2');
      $('.dropdown-item').toggleClass('text-light').toggleClass('bg-dark').toggleClass('border-0');
      $('.modal-content').toggleClass('text-light').toggleClass('bg-dark');
      $('.modal .close').toggleClass('text-light');
      //$('.modal .btn-dark').toggleClass('btn-dark').toggleClass('btn-secondary');
   }
   function setFont()
   {
      area.style.fontSize = fontSizeNum.value+"px";
      area.style.fontFamily = fontFamilySel.options[fontFamilySel.selectedIndex].text;
      area.style.fontWeight = (fontWeightSel.selectedIndex==0)?"normal":"bold";
      params.fontSize = fontSizeNum.value;
      params.fontFamilySel = fontFamilySel.selectedIndex;
      params.fontWeightSel = fontWeightSel.selectedIndex;
   }
   function OnSpell()
   {
      if( spellbtn.classList.contains("active") )
      {
         area.setAttribute("spellcheck", "false");
         spellbtn.classList.remove("active");
      }
      else
      {
         area.setAttribute("spellcheck", "true");
         spellbtn.classList.add("active");
      }
      area.focus();
   }
	function Print()
	{
      win = window.open();
      //if(!win || win.closed || typeof win.closed=='undefined')
      //   alert("Can't open print tab. Please allow pop-ups in Settings>Privacy>Pop-ups menu");
      //win.document.open();
      win.document.write('<html lang="en"><head></head><body style="font-size:'+params.fontSize+'px">');
      var txt=area.value;
      txt=txt.replace(/\t/gi,'&emsp;');
      txt=txt.replace(/\n/gi,'<br>');
      win.document.write(txt);
      win.document.write('</body></html>');
      win.alert("Press browser Menu button and select Print...\nTo save paper & trees: print to PDF file or set 2-sided printing.");
      win.print();
      //win.document.close();
      //win.close();
   }
   function Help()
   {
      window.location.href = 'doc.html';
   }
   // works with chrome, not in FF
   function Exit()
   {
      window.open('','_self','');
      window.close();
   }
	function New()
	{
		cancelSaveFile();
		Snapshot();
		if( area.value != "" )
		{
			var r=confirm("All old text will be deleted. Are you sure?");
			if (r==true)
			{
				area.value = "";
	    		//localStorage.notepad_filename = '';
            params.filename = '';
				SetDocTitle();
				//Snapshot();
			}
		}
		area.focus();
	}
	function Open()
	{
		cancelSaveFile();
		fileElem.focus();
		fileElem.click();
	}
	function Save_As()
	{
		if( area.value=='' ) return;
		getFilename.style.display = "flex";
		//return false;
	}
	function Save()
	{
		if( area.value=='' ) {
         $('#autoSaveModal').modal('hide');
         alert("Save canceled - there is no text to save...");
         return;
      }
		
		//if( localStorage.notepad_filename=='' )
		if( params.filename=='' ) {
         $('#autoSaveModal').modal('hide');
			getFilename.style.display = "flex";
         filename.focus();
      }
		else
			saveFile();
		
		return false;
	}
   function getShareData()
   {
      var txt=window.getSelection().toString();
      if( txt=="" ) txt=area.value;
      var url="#?txt="+encodeURIComponent(txt);
      if( url.length>=16384 ) {
         url=url.substring(0,16384);
         alert("The URL length is limited to 16384");
      }
      return { txt:txt, url:url };
   }
   function Share()
   {
      if(navigator.share) {
         var data=getShareData();
         navigator.share({
            title: "My notes",
            text: data.txt,
            url: data.url
         })
         .then(() => console.log('Successful share'))
         .catch(error => console.log('Error sharing:', error));
      }
   }
   function shareFB()
   {
      var data=getShareData();
      sharefb.href = "https://facebook.com/sharer/sharer.php?u="+encodeURIComponent(data.url)+"&title="+encodeURIComponent("My notes");
   }
   function shareTW()
   {
      var data=getShareData();
      sharetw.href = "https://twitter.com/intent/tweet?text="+encodeURIComponent(data.txt)+"&url="+encodeURIComponent(data.url);
   }
   function shareWA()
   {
      var data=getShareData();
      sharewa.href = "https://api.whatsapp.com/send?text="+encodeURIComponent(data.txt)+" "+encodeURIComponent(data.url);
   }
   function shareMail()
   {
      var data=getShareData();
      shareml.href = "mailto:?to=&subject="+encodeURIComponent("My notes")+"&body="+encodeURIComponent(data.txt+"\n"+data.url);
   }
	function SelectAll()
	{
		area.select();
	}
	function Del()
	{
		s = getSelect(area);
		if( s.text.length!=0 )
		{
			Snapshot();
			var text = area.value;
			fillString(text,"", s.start, s.end);
		}
		pos = s.start;
		setCaret(pos);
	}
	function Del2()
	{
		s = getSelect(area);
		if( s.text.length!=0 )
		{
			Snapshot();
			var text = area.value;
			fillString(text,"", s.start, s.end-1);
		}
		pos = s.start;
		setCaret(pos);
	}
	function Cut(isKey)
	{
		s = getSelect(area);
		if( s.text.length!=0 )
		{
			Snapshot();
			selectedText = s.text;
         if( !isKey )
			   fillString(area.value,"", s.start, s.end);
		}
		else
			selectedText = '';
      if( !isKey )
		{
         pos = s.start;
		   setCaret(pos);
      }
		area.focus();
	}
	function Copy()
	{
		//document.execCommand('copy');
		s = getSelect(area);
		if( s.text.length!=0 )
			selectedText = s.text;
		else
			selectedText = '';
		setSelect(area,s.start,s.end);
		area.focus();
      //navigator.clipboard.writeText(text).then(function() {
      //   console.log("success");
      //}, function() {
      //   console.log("fail");
      //});
	}
	function Paste()
	{
		s = getSelect(area);
		Snapshot();
		if( selectedText.length!=0 )
		{
			//Snapshot();
			var text = area.value;
			fillString(text, selectedText, s.start, s.end);
			pos = s.start+selectedText.length;
			setCaret(pos);
		}
		area.focus();
      //navigator.clipboard.readText().then(clipText => var text=clipText);
	}
	function cancelSaveFile()
	{
		getFilename.style.display = "none";
	}
	function saveFile()
	{
		getFilename.style.display = "none";
		var name = filename.value;
		if( name=='' ) name='filename.txt';
		//localStorage.notepad_filename = name;
      params.filename = name;
		SetDocTitle();
		LocalSave();
		
		s = area.value;
		OSName = GetOS();
		if( OSName=="Windows" )
			s = s.replace(/\n/g,'\r\n');
		var blob = new Blob([s], {type: "text/plain;charset=utf-8"});
		//saveAs(blob, localStorage.notepad_filename);
		saveAs(blob, params.filename);
	}
	function loadFile()
	{
		var name = fileElem.files[0].name;
		var reader = new FileReader();
	   reader.onloadend = function(evt) {
	    	if( evt.target.readyState==FileReader.DONE ) {
	    		//localStorage.notepad_filename = name;
	    		params.filename = name;
				SetDocTitle();
	    		//area.value = evt.target.result;
	    		s = evt.target.result;
				OSName = GetOS();
				if( OSName=="Windows" )
		    		s = s.replace(/\r\n/g,'\n');
	    		area.value = s;
				area.focus();				
      	}
    	};
		reader.readAsText(fileElem.files[0]);
	}
	function getSelect(obj)
	{
		var s = obj.selectionStart;
		var e = obj.selectionEnd;
		var txt = obj.value.substring(s,e);
		return { start: s, end: e, text: txt };
	}
	function setSelect(obj, start, end) 
	{
		obj.focus(); 
		obj.selectionStart = start; 
		obj.selectionEnd = end; 
	}
	function fillString(text, selectText, start, end)
	{
		// split textarea value into three pieces: before startPosition,
	    // startPosition until endPosition, and after endPosition
		var str1 = text.substring(0,start);
		var str2 = text.substring(start,end);
		var str3 = text.substring(end,text.length);
		// replace str2 with formatted substring (selectedText)
		str2 = selectText;
		area.value = str1+str2+str3;
	}
	function getCaret()
	{
		return area.selectionStart;
	}
	function setCaret(pos)
	{
		area.selectionStart = pos;
		area.selectionEnd   = pos;
      area.focus();
	}
	function Snapshot()
	{
		var pos = getCaret();
		var txt = area.value;
		if( ihist>0 && txt_hist[ihist-1]==txt ) return;
		if( ihist==nhist )
		{
			pos_hist.push(pos);
			txt_hist.push(txt);
			ihist++;
			if( pos_hist.length > Nhist )
			{
				pos_hist.shift();
				txt_hist.shift();
				ihist--;
			}
		}
		else
		{
			ihist++;
			pos_hist[ihist] = pos;
			txt_hist[ihist] = txt;
         for(i=ihist+1; i<nhist; i++)
         {
            pos_hist.pop();
            txt_hist.pop();
         }
         ihist++;
		}
		nhist = ihist;
      //console.log("snap: i="+ihist+" n="+nhist);
      //console.log(txt_hist);
	}
	function Undo()
	{
		if( nhist==0 ) return;
		if( ihist==nhist && txt_hist[ihist-1]!=area.value )
			Snapshot();
		if( txt_hist[ihist-1]==area.value )
			ihist--;
      if( ihist<1 ) ihist=1;
		var pos = pos_hist[ihist-1];
		var txt = txt_hist[ihist-1];
		area.value = txt;
		setCaret(pos);
		ihist--;
      if( ihist<1 ) ihist=1;
      //console.log("undo: i="+ihist+" n="+nhist);
      //console.log(txt_hist);
	}
	function Redo()
	{
		if( nhist==0 ) return;
		if( ihist==nhist ) return;
		var pos = pos_hist[ihist];
		var txt = txt_hist[ihist];
		ihist++;
		area.value = txt;
		setCaret(pos);
      //console.log("redo: i="+ihist+" n="+nhist);
      //console.log(txt_hist);
	}
	function DecSize()
	{
		if( params.fontSize > 8 ) 
		{
			params.fontSize--;
			if( params.fontSize >= 15 ) params.fontSize--;
			SetFontSize();
		}
	}
	function IncSize()
	{
		if( params.fontSize < 50 ) 
		{
			params.fontSize++;
			if( params.fontSize >= 15 ) params.fontSize++;
			SetFontSize();
		}
	}
	function SetFontSize()
	{
		area.style.fontSize = params.fontSize+'px';
	}
	function SetDocTitle()
	{
		var name = params.filename;
		if( name=='' )
			document.title = 'Typo Editor Pro';
		else
			document.title = 'Typo Editor Pro';
	}
	function SetBar(isNewChar) {
		var pos=area.selectionEnd;
		var txt=area.value;
      if( isNewChar ) {
         chars = txt.length;
         words = txt.countWords();
      }
		txt = txt.substring(0,pos);
      var lines = txt.split('\n');
		var line = lines.length;
		var col = lines[line-1].length+1;
		$("#testo-console").html("~ % Notebook&emsp;" + "Line "+line+", Column "+col+"&emsp; Chars "+chars+", Words "+words);
	}
   Storage.prototype.setObject = function(key, value) {
      this.setItem(key, JSON.stringify(value));
   }

   Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      if( value==null || value=="undefined" ) return null;
      return value && JSON.parse(value);
   }
   String.prototype.countWords = function() {
		return this.trim().split(/\s+\b/).length;
	}
