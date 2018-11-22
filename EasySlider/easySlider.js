function EasySlider(target, options) {

    let slider = target;
    let wrapper = target.querySelector(".slider-wrapper");
    let slides = wrapper.querySelectorAll(".slider-slides");

    let curX = 0;


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

        let pageX = (e.pageX) ? e.pageX : e.touches[0].pageX;
        
        startX = pageX - curX;
        dragging = true;
    }

    function move(e) {
        if(!dragging) return;
        e.stopPropagation();
        e.preventDefault();

        let pageX = (e.pageX) ? e.pageX : e.touches[0].pageX;

        translate(pageX - startX);
    }

    function end(e) {
        e.stopPropagation();
        e.preventDefault();
        dragging = false;
    }


    // AUX FUNCTIONS

    function translate(x) {
        curX = x;
        wrapper.style.transform = "translate3d("+curX+"px,0,0)";
    }
}
