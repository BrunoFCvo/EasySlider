function EasySlider(target, args) {

    let options = {
        threshold : 100
    }

    let slider = target;
    let wrapper = target.querySelector(".slider-wrapper");
    let slides = wrapper.querySelectorAll(".slider-slide");

    let curX = 0;
    let width = slides[0].clientWidth;

    // DRAGGING EVENTS

    let startX = 0;
    let initialX = 0;
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

        clearAnimation();

        let pageX = e.pageX || e.touches[0].pageX;
        
        startX = pageX + curX;
        initialX = curX;
        dragging = true;
    }

    function move(e) {
        if(!dragging) return;
        e.stopPropagation();
        e.preventDefault();

        let pageX = e.pageX || e.touches[0].pageX;

        translate(startX - pageX);
    }

    function end(e) {
        e.stopPropagation();
        e.preventDefault();

        let moved = curX - initialX;
        
        if(moved > options.threshold) {
            let slide   = Math.floor((curX + options.threshold) / width);
            let next    = (slide + 1) < slides.length ? slide + 1 : slide;
            let x       = next * width;
            animate(x);
        } else if (-moved > options.threshold) {
            let slide   = Math.floor((curX - options.threshold) / width);
            let next    = slide > 0 ? slide : 0;
            let x       = next * width;
            animate(x);
        } else {
            let slide   = Math.floor(curX / width);
            let x       = slide * width;
            animate(x);
        }

        dragging = false;
    }


    // AUX FUNCTIONS

    let timeout = null;

    function translate(x) {
        curX = x;
        wrapper.style.transform = "translate3d("+(-curX)+"px,0,0)";
    }

    function animate(x) {
        wrapper.style.transition    = "transform 500ms ease-out";
        wrapper.style.transform     = "translate3d("+(-x)+"px,0,0)";
        timeout = setTimeout(function() {
            wrapper.style.transition = "";
            curX = x;
        }, 500);
    }

    function clearAnimation() {
        if(!timeout) return;
        clearTimeout(timeout);
        timeout = null;
        
        let computedStyle 	= window.getComputedStyle(wrapper).transform;
        let regExp 			= new RegExp("matrix\\(1, 0, 0, 1, (.*), 0\\)");
        let x			    = -parseInt(regExp.exec(computedStyle)[1]);
        translate(x);
        
        wrapper.style.transition = "";
    }
}
