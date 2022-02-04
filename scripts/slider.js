class Slider {
	constructor(slider, speed){
		this.speed = speed;
		this.sliderDiv = slider;
		this.slides = this.sliderDiv.querySelector(".slider-items").children;
		this.totalSlides = this.slides.length;
		this.nextButton = this.sliderDiv.querySelector(".button-right");
		this.prevButton = this.sliderDiv.querySelector(".button-left");
		this.pauseButton = this.sliderDiv.querySelector(".button-pause");
		this.pauseButtonChildren = this.sliderDiv.querySelector(".button-pause").children;
		this.pauseButtonChildrenLenght = this.pauseButtonChildren.length;
		this.index = 0;
		this.indexPause = 0;
		this.interval = setInterval(this.nextSlide.bind(this), this.speed);

		this.nextButton.addEventListener("click", _ => {
			this.nextSlide();
		});
		this.nextButton.addEventListener("touch", _ => {
			this.nextSlide();
		});
		this.prevButton.addEventListener("click", _ => {
			this.prevSlide();
		});
		this.prevButton.addEventListener("touch", _ => {
			this.prevSlide();
		});
		this.pauseButton.addEventListener("click", _ => {
			this.pauseSlide();
		});
		this.pauseButton.addEventListener("touch", _ => {
			this.pauseSlide();
		});
		document.addEventListener("keydown", event => {
			this.keyboardEvent();
		});
	}
	nextSlide() {
		this.slides[this.index].className = "slide";
		this.index = (this.index + 1) % this.totalSlides;
		this.slides[this.index].className = "slide slide-active";
	}
	prevSlide() {
		this.slides[this.index].className = "slide";
		this.index = (this.index - 1) % this.totalSlides;
		if (this.index == -1) {
			this.index = this.totalSlides - 1;
		}
		this.slides[this.index].className = "slide slide-active";
	}
	pauseSlide() {
		this.pauseButtonChildren[this.indexPause].className = "div-pause";
		this.indexPause = (this.indexPause + 1) % this.pauseButtonChildrenLenght;
		this.pauseButtonChildren[this.indexPause].className = "div-pause button-pause-active";
		if (this.indexPause == 1) {
			clearInterval(this.interval);
		}
		else {		
			this.interval = setInterval(this.nextSlide.bind(this), this.speed);
		}
	}
	keyboardEvent() { 
		if (event.keyCode === 37) { 
			this.prevSlide();
		}
		else if (event.keyCode === 39) {
			this.nextSlide();
		}
	}
}