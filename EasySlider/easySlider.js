function EasySlider(target, options) {

    let slider = target;
    let wrapper = target.querySelector(".slider-wrapper");
    let slides = wrapper.querySelectorAll(".slider-slide");

    let curX = 0;
    let width = slides[0].clientWidth;
    let nrSlides = slides.length;

    // DRAGGING EVENTS

    let startX = 0;
    let dragging = false;

    if(document.documentMode || /Edge/.test(navigator.userAgent) || /MSIE/.test(navigator.userAgent)) {
		slider.addEventListener("pointerdown", start);
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", end);
	} else {
		slider.addEventListener("mousedown", start);
		window.addEventListener("mousemove", move);
		window.addEventListener("mouseup", end);
		
		slider.addEventListener("touchstart", start);
		window.addEventListener("touchmove", move);
		window.addEventListener("touchend", end);
	}

    function start(e) {
        e.stopPropagation();
        e.preventDefault();

        let pageX = e.pageX || e.touches[0].pageX;
        
        startX = pageX - curX;
        dragging = true;
    }

    function move(e) {
        if(!dragging) return;
        e.stopPropagation();
        e.preventDefault();

        let pageX = e.pageX || e.touches[0].pageX;

        translate(pageX - startX);
    }

    function end(e) {
        e.stopPropagation();
        e.preventDefault();

        let nextSlide = Math.round(curX / width);
        if(nextSlide > 0) { 
            nextSlide = 0;
        } else if(nextSlide < -(nrSlides - 1)) {
            nextSlide = -(nrSlides - 1);
        }

        animate(nextSlide * width);
        dragging = false;
    }


    // AUX FUNCTIONS

    function translate(x) {
        curX = x;
        wrapper.style.transform = "translate3d("+curX+"px,0,0)";
    }

    function animate(x) {
        wrapper.style.transition = "transform 500ms ease-out";
        wrapper.style.transform = "translate3d("+x+"px,0,0)";
        setTimeout(function() {
            wrapper.style.transition = "";
            curX = x;
        }, 500);
    }
}
