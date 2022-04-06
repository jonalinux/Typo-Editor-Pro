// Copyright (C) 2022 Jonathan Sanfilippo <jonathansanfilippo.uk@gmail.com>





// save
function dynamicSave(){
    var userInput = document.getElementById("ta").value;
    var blob = new Blob([userInput], { type: "text/html;charset=utf-8" });
     saveAs(blob, "index.html");}
function dynamicSave2(){
    var userInput = document.getElementById("css").value;
    var blob = new Blob([userInput], { type: "text/html;charset=utf-8" });
     saveAs(blob, "style.css");}

function dynamicSave3(){
    var userInput = document.getElementById("js").value;
    var blob = new Blob([userInput], { type: "text/html;charset=utf-8" });
     saveAs(blob, "myscript.js");}

// Copia Testo

  function copia(testo) {
    var input = document.createElement('input');
    var ta = document.getElementById(testo).value;
    input.setAttribute('value', ta);
    document.body.appendChild(input);
    input.select();
    var risultato = document.execCommand('copy');
    document.body.removeChild(input);
    return risultato;
 };

 function copia(testo) {
    var input = document.createElement('input');
    var css = document.getElementById(testo).value;
    input.setAttribute('value', css);
    document.body.appendChild(input);
    input.select();
    var risultato = document.execCommand('copy');
    document.body.removeChild(input);
    return risultato;
 };



function copia(testo) {
    var input = document.createElement('input');
    var js = document.getElementById(testo).value;
    input.setAttribute('value', js);
    document.body.appendChild(input);
    input.select();
    var risultato = document.execCommand('copy');
    document.body.removeChild(input);
    return risultato;
 };



function copyHTML() {
    
    compilecss(1); 
    compilejs(1); 
    compile(1); 
    load(); 
    notifica10(); 
    setTimeout(notifica0, 5000); 
    calculateHeight(); 
    calculateHeight2(); 
    calculateHeight3();
    
    copia("ta");
    
}


function copyCSS() {
    
    compilecss(1); 
    compilejs(1); 
    compile(1); 
    load(); 
    notifica10(); 
    setTimeout(notifica0, 5000); 
    calculateHeight(); 
    calculateHeight2(); 
    calculateHeight3();
    
    copia("css");
    
}



function copyJS() {
    
    compilecss(1); 
    compilejs(1); 
    compile(1); 
    load(); 
    notifica10(); 
    setTimeout(notifica0, 5000); 
    calculateHeight(); 
    calculateHeight2(); 
    calculateHeight3();
    
    copia("js");
    
}

function csstogglecopy() {
  document.getElementById("copytoggle").innerHTML = '<a onClick="copyCSS();">Copy<span class="smallmenu">CSS</span></a>';
}

function htmltogglecopy() {
  document.getElementById("copytoggle").innerHTML = '<a onClick="copyHTML();">Copy<span class="smallmenu">HTML</span></a>';
}



function jstogglecopy() {
  document.getElementById("copytoggle").innerHTML = '<a onClick="copyJS();">Copy<span class="smallmenu">JavaScript</span></a>';
}


// Console Notified


function notifica0() {
  document.getElementById("testo-console").innerHTML = "~ %";
}

function notifica1() {
  document.getElementById("testo-console").innerHTML = "~ % Code compiled by the editor and downloaded file";
}

function notifica2() {
  document.getElementById("testo-console").innerHTML = "~ % Code compiled by the user";
}

function notifica2b() {
  document.getElementById("testo-console").innerHTML = "~ % Code compiled by the editor";
}

function notifica3() {
  document.getElementById("testo-console").innerHTML = "~ % Font size has been changed";
}
function notifica4() {
  document.getElementById("testo-console").innerHTML = "~ % Pomodoro PowerOff";
}
function notifica5() {
  document.getElementById("testo-console").innerHTML = "~ % Full screen has been selected";
}
function notifica6() {
  document.getElementById("testo-console").innerHTML = "~ % Workspace rotation activated";
}

function notifica7() {
  document.getElementById("testo-console").innerHTML = "~ % HTML workspace has been changed";
}
function notifica8() {
  document.getElementById("testo-console").innerHTML = "~ % Pomodoro Started";
}
function notifica9() {
  document.getElementById("testo-console").innerHTML = "~ % Pomodoro Stopped";
}
function notifica10() {
  document.getElementById("testo-console").innerHTML = "~ % Code Copied";
}



// FullScreen

var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}


function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}



// Data-Time

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "";
   
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + session;
    document.getElementById("time").innerText = time;
    document.getElementById("time").textContent = time;
    
    setTimeout(showTime, 1000);}

showTime();

window.onload = setInterval(clock,1000);
function clock()
{
    var d = new Date();
    var date = d.getDate();
    var weekday = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
    dayOfWeek = weekday[d.getDay()];
    var year = d.getFullYear();
    var month = d.getMonth();
    var monthArr = ["Jan", "Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
    month = monthArr[month];

    document.getElementById("data").innerHTML=dayOfWeek+" "+date+" "+month+" ";
}



// Font-Size

function fontpiu() {
// Get a NodeList of all .demo elements
const CodeMirrorClasses = document.querySelectorAll('.CodeMirror');
   txt = document.getElementsByClassName("CodeMirror")[0];
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
// Change the text of multiple elements with a loop
CodeMirrorClasses.forEach(element => {
  element.style.fontSize = (currentSize + 1) + 'px';
});

// Access the first element in the NodeList
CodeMirrorClasses[0];
}

function fontmeno() {
// Get a NodeList of all .demo elements
const CodeMirrorClasses = document.querySelectorAll('.CodeMirror');
   txt = document.getElementsByClassName("CodeMirror")[0];
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
// Change the text of multiple elements with a loop
CodeMirrorClasses.forEach(element => {
  element.style.fontSize = (currentSize - 1) + 'px';
});

// Access the first element in the NodeList
CodeMirrorClasses[0];
}

function fontreset() {
// Get a NodeList of all .demo elements
const CodeMirrorClasses = document.querySelectorAll('.CodeMirror');
   txt = document.getElementsByClassName("CodeMirror")[0];
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
// Change the text of multiple elements with a loop
CodeMirrorClasses.forEach(element => {
  element.style.fontSize = '14px';
});

// Access the first element in the NodeList
CodeMirrorClasses[0];
}


// ColorPicker

 let colorInput = document.querySelector('#colorpicker');
    let hexInput = document.querySelector('#color');
    colorInput.addEventListener('input', () =>{
    let color = colorInput.value;
    hexInput.value = color;
    
});





// Pomodoro

const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
};

let interval;

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = parseInt(difference / 1000);
  const minutes = parseInt((total / 60) % 60);
  const seconds = parseInt(total % 60);

  return {
    total,
    minutes,
    seconds,
  };
}

function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');

  const min = document.getElementById('js-minutes');
  const sec = document.getElementById('js-seconds');
  const time = `${minutes}:${seconds}`;
  min.textContent = minutes;
  sec.textContent = seconds;


}

function startTimer() {
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;

  if (timer.mode === 'pomodoro') timer.sessions++;

  mainButton.dataset.action = 'stop';
  mainButton.classList.add('active');
  mainButton.textContent = 'Stop';

  interval = setInterval(function() {
    timer.remainingTime = getRemainingTime(endTime);
    total = timer.remainingTime.total;
    updateClock();
    if (total <= 0) {
      clearInterval(interval);

      switch (timer.mode) {
        case 'pomodoro':
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode('longBreak');
          } else {
            switchMode('shortBreak');
          }
          break;
        default:
          switchMode('pomodoro');
      }

      if (Notification.permission === 'granted') {
        const text =
          timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
        new Notification(text);
      }

      document.querySelector(`[data-sound="${timer.mode}"]`).play();
      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);

  mainButton.dataset.action = 'start';
  mainButton.classList.remove('active');
  mainButton.textContent = 'Start';
}

function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };

  document
    .querySelectorAll('button[data-mode]')
    .forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  document
    .getElementById('js-progress')
    .setAttribute('max', timer.remainingTime.total);
    document.getElementById("colortimer").style.color = `var(--${mode})`;
 

  updateClock();
}

function handleMode(event) {
  const { mode } = event.target.dataset;

  if (!mode) return;

  timer.sessions = 0;
  switchMode(mode);
  stopTimer();
}

const buttonSound = new Audio('audio/button-sound.wav');
const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {
  const { action } = mainButton.dataset;
  buttonSound.play();
  if (action === 'start') {
    startTimer();
     notifica8();
  } else {
    stopTimer();
     notifica9();
  }
});

const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

document.addEventListener('DOMContentLoaded', () => {
  if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        new Notification(
          'Awesome! You will receive notifications at the start of a pomodoro or a break'
        );
      }
    });
  }

  switchMode('pomodoro');
});


function PomodoroShow() {
  var element = document.getElementById("colortimer");
  element.classList.remove("hidden");
}

function PomodoroReset() {
   var element = document.getElementById("colortimer");
   element.classList.add("hidden");
}

function StartOn() {
  var element = document.getElementById("btn-start");
  element.classList.remove("hidden");
}


function StartOff() {
  var element = document.getElementById("btn-start");
  element.classList.remove("hidden");
}



// Palette

class Colour {
	constructor(hex, element) {
		this.hex = hex;
		this.element = element;
		this.locked = false;
	}

	setHex(hex) {
		this.hex = hex;
		this.element.style.backgroundColor = hex;
		this.element.querySelector(".colour-input").value = hex;
	}

	setLocked(locked) {
		this.locked = locked;

		if (locked) {
			this.element
				.querySelector(".lock-toggle")
				.classList.add("is-locked");

			this.element
				.querySelector("img")
				.src = "icons/lock-closed.svg";
		} else {
			this.element
				.querySelector(".lock-toggle")
				.classList.remove("is-locked");

			this.element
				.querySelector("img")
				.src = "icons/lock-open.svg";
		}
	}

	toggleLocked() {
		this.setLocked(!this.locked);
	}

	generateHex() {
		if (this.locked) {
			return
		}
		
		const chars = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += chars[Math.floor(Math.random() * 16)];
		}
		
		this.setHex(color);
	}
 
	copyToClipboard() {
		const input = this.element.querySelector(".colour-input");
		input.select();
		document.execCommand("copy");
		input.blur();

		this.element.classList.add("copied");
		setTimeout(() => {
			this.element.classList.remove("copied");
		}, 1000);
	}
}

const colour_elements = document.querySelectorAll('.colours .colour');

const colours = [];

for (let i = 0; i < colour_elements.length; i++) {
	const colour_element = colour_elements[i];

	const input = colour_element.querySelector(".colour-input");
	const lock_toggle = colour_element.querySelector(".lock-toggle");
	const copy_btn = colour_element.querySelector(".copy-hex");

	const hex = input.value;

	const colour = new Colour(hex, colour_element);

	input.addEventListener('input', (e) => colour.setHex(e.target.value));
	lock_toggle.addEventListener('click', () => colour.toggleLocked());
	copy_btn.addEventListener('click', () => colour.copyToClipboard());

	colour.generateHex();
	colours.push(colour);
}

document.querySelector(".generator-button").addEventListener("click", () => {
	for (let i = 0; i < colours.length; i++) {
		colours[i].generateHex();
	}
});

document.addEventListener('keypress', (e) => {
	if (e.code.toLowerCase() === "space") {
		document.querySelector(".generator-button").click();
	}
})

