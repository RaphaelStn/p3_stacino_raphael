class Formulaire {
	constructor(aside) {
		this.aside = aside;
		this.nom = this.aside.querySelector(".nom");
		this.prenom = this.aside.querySelector(".prenom");
		this.canvasDiv = this.aside.querySelector(".canvas-div");
		this.popupName = this.aside.querySelector(".popup-name");
		this.popupCanvas = this.aside.querySelector(".popup-canvas")
		this.canvas = this.aside.querySelector("#canvas");

		this.confirmNomBtn = this.aside.querySelector(".button-confirm-name");
		this.clearBtn = this.aside.querySelector(".button-clear");
		this.submitBtn = this.aside.querySelector(".button-submit");
		this.cancelBtn = this.aside.querySelector(".cancel-btn"); 

		this.timerNom = this.aside.querySelector(".timer-nom");
		this.timerPrenom = this.aside.querySelector(".timer-prenom");
		this.timerStation = this.aside.querySelector(".timer-station");
		this.timerDisplay = this.aside.querySelector(".timer-display");
		this.timerAdresse = this.aside.querySelector(".timer-adresse");
		this.timerVelo = this.aside.querySelector(".timer-velo");

		this.stationName = this.aside.querySelector(".station-name");
		this.stationAdresse = this.aside.querySelector(".station-adresse")
		this.stationVelo = this.aside.querySelector(".station-dispo");
		this.formEnabler = this.aside.querySelector(".form"); 
		this.timerEnabler = this.aside.querySelector(".timer");

		this.submitBtn.addEventListener("click", _ => {
			this.timerDuration = 20*60; 
			this.checkcanvas();
		})
		this.confirmNomBtn.addEventListener("click", _ => {
			this.displayError();
		})  		    
	}
	setStorage() {
		this.nom.value =  localStorage.getItem("nom");
		this.prenom.value = localStorage.getItem("prenom");
		if (sessionStorage.getItem("timer") != null && sessionStorage.getItem("timer") != 0)  {
			this.timerDuration = sessionStorage.getItem("timer");
			this.stationName.textContent = sessionStorage.getItem("stationName");
			this.stationAdresse.textContent = sessionStorage.getItem("stationAdresse");
			this.stationVelo.textContent = sessionStorage.getItem("stationVelo");
			this.startTimer(this.timerDuration,this.timerDisplay);
		}
	}
	canvasInit() {
		window.requestAnimFrame = (callback => {
    		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      	 		window.setTimeout(callback, 1000 / 60);
      		};
 		 })();
  		let ctx = this.canvas.getContext("2d");
  		ctx.lineWidth = 2;

  		let drawing = false; 
  		let mousePos = {
    		x: 0,
    		y: 0
  		};
  		let lastPos = mousePos;

  		this.canvas.addEventListener("mousedown", e => {
    		drawing = true; 
    		lastPos = getMousePos(this.canvas, e);
  		});

  		this.canvas.addEventListener("mouseup", e => { 
    		drawing = false;
  		});

  		this.canvas.addEventListener("mousemove", e => { 
    		mousePos = getMousePos(this.canvas, e);
  		});
  		this.canvas.addEventListener("touchmove", e => {
    		let touch = e.touches[0];
    		let me = new MouseEvent("mousemove", {
      			clientX: touch.clientX,
      			clientY: touch.clientY
    		});
    		canvas.dispatchEvent(me);
    		e.preventDefault();
  		});
  		this.canvas.addEventListener("touchstart", e => {
    		mousePos = getTouchPos(this.canvas, e);
    		let touch = e.touches[0];
    		let me = new MouseEvent("mousedown", {
      			clientX: touch.clientX,
      			clientY: touch.clientY
    		});
    		canvas.dispatchEvent(me);
    		e.preventDefault();
 		 });
 		 this.canvas.addEventListener("touchend", e => {
    		let me = new MouseEvent("mouseup", {});
    		canvas.dispatchEvent(me);
    		e.preventDefault();
    	})
  		function getMousePos(canvasDom, mouseEvent) {
    		let rect = canvasDom.getBoundingClientRect();
    		return {
      		x: mouseEvent.clientX - rect.left, 
      		y: mouseEvent.clientY- rect.top
    		}
    	}
    	function getTouchPos(canvasDom, touchEvent) {
    		let rect = canvasDom.getBoundingClientRect();
    		return {
    			x: touchEvent.touches[0].clientX - rect.left,
    			y: touchEvent.touches[0].clientY - rect.top
    		}
    	}	
  		function renderCanvas() {
    		if (drawing) {
      		ctx.moveTo(lastPos.x, lastPos.y); 
      		ctx.lineTo(mousePos.x, mousePos.y);  
      		ctx.stroke(); 
      		lastPos = mousePos;
    		}
  		}
  		function drawLoop() {
    		requestAnimFrame(drawLoop);
    		renderCanvas();
  		};
  		drawLoop()
  		this.cancelBtn.addEventListener("click", _ => {
  			ctx.beginPath()
  			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  		})
  		this.clearBtn.addEventListener("click", _ => {
  			ctx.beginPath()
  			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  		})
	}
	displayError() {
		if (this.nom.value == "" || this.prenom.value =="") { 
			this.popupName.className = ("popup-text popup-show"); 
			this.canvasDiv.className = ("div-canvas canvas-disabled");
			localStorage.removeItem("nom");
			localStorage.removeItem("prenom");
		}
		else {
			this.popupName.className = ("popup-text")
			this.canvasDiv.className = ("div-canvas canvas-enabled");
			localStorage.setItem("nom", this.nom.value );
			localStorage.setItem("prenom", this.prenom.value);
		}
	}
	checkcanvas() {
			let cnv = this.canvas
			if(isCanvasEmpty(cnv)) {
				this.popupCanvas.className = ("popup-text popup-show")
			}
			else {
				this.popupCanvas.className = ("popup-text")
				this.startTimer(this.timerDuration, this.timerDisplay);
			}
			function isCanvasEmpty(cnv) {
				const blank = document.createElement('canvas');
				blank.width = cnv.width
				blank.height = cnv.height
				return cnv.toDataURL() === blank.toDataURL();
			}
	}
	startTimer(duration, display) {
		let timer = duration;
		let minutes = 0;
		let seconds = 0;
		let interval = setInterval(_ => {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);
			display.textContent = minutes + "min" + seconds + "s";
			if (--timer < 0) {
				timer = duration;
			}
			else if(timer == 0 || duration == 0) {
				display.textContent = "Votre réservation est expiré, merci de re-valider une réservation";
				this.timerVelo.textContent = sessionStorage.getItem("stationVelo");
				clearInterval(interval);
			}
			sessionStorage.setItem("timer", timer);
			console.log(timer)
			this.cancelBtn.addEventListener("click",_ => {
				sessionStorage.removeItem("timer")
				clearInterval(interval)
				minutes = 0;
				seconds = 0;
				display.textContent = "20min0s"
				this.timerEnabler.classList.remove("enable");
				this.timerEnabler.classList.add("disable");
				this.formEnabler.classList.remove("disable");
				this.formEnabler.classList.add("enable");
			})
		}, 1000);
		sessionStorage.setItem("stationName", this.stationName.textContent);
		sessionStorage.setItem("stationAdresse", this.stationAdresse.textContent);
		sessionStorage.setItem("stationVelo", this.stationVelo.textContent);

		this.timerNom.textContent = localStorage.getItem("nom");
		this.timerPrenom.textContent = localStorage.getItem("prenom");
		this.timerStation.textContent = sessionStorage.getItem("stationName");
		this.timerAdresse.textContent = sessionStorage.getItem("stationAdresse");
		this.timerVelo.textContent = sessionStorage.getItem("stationVelo") -1;

		this.timerEnabler.classList.remove("disable");
		this.timerEnabler.classList.add("enable");
		this.formEnabler.classList.remove("enable");
		this.formEnabler.classList.add("disable");

	}
}



