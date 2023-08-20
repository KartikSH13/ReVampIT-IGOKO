const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

// document.addEventListener('scroll', () => {
// 	var scroll_position = window.scrollY;
// 	if (scroll_position > 250) {
// 		header.style.backgroundColor = '#29323c';
// 	} else {
// 		header.style.backgroundColor = 'transparent';
// 	}
// });

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

/* Statistic item effect */
const staticObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			staticRunner();
			observer.unobserve(entry.target);
		}
	});
});
staticObserver.observe(document.getElementById('about'));
function staticRunner() {
	let statisticElements = document.querySelectorAll('.statistic-count');
	let interval = 5000;
	statisticElements.forEach((valueDisplay) => {
		let start = 0;
		let end = parseInt(valueDisplay.getAttribute('data-val'));
		let duration = Math.floor(interval / end)
		let counter = setInterval(function () {
			start += 1;
			if (end == 95) {
				valueDisplay.textContent = start + "k";
			}
			else if (end == 24) {
				valueDisplay.textContent = start + "/7";
			} else {
				valueDisplay.textContent = start;

			}
			if (start == end) {
				clearInterval(counter);
			}
		}, duration)
	})
}
/* Statistic item effect */

var form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
	event.preventDefault();
	var button = document.getElementById("submit-button");
	button.style.background = "none";
	button.innerHTML = `<i class='fa fa-spinner fa-spin' style='color:blue;'></i>`

	var firstname = document.getElementById("first-name").value;
	var lastname = document.getElementById("last-name").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;
	var country = document.getElementById("country").value;
	var comments = document.getElementById("comments").value;

	var data = {
		username: firstname + " " + lastname,
		email: email,
		phone: phone,
		country: country,
		comments: comments
	}

	var jsonData = JSON.stringify(data);
	fetch(Api.contactRequest, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: jsonData
	})
		.then(response => response.json())
		.then(data => {
			if (data.status == false) {
				throw data.message;
			}
			button.innerHTML = "<i class='fa fa-check-circle' style='color:green;'></i>"
			button.disabled = true;
		})
		.catch(error => {
			button.innerHTML = "<i class='fa fa-xmark-circle' style='color:red;'></i>"
			setTimeout(() => {
				button.innerHTML = "Submit"
				button.style.background = 'rgb(0, 110, 255)'
			}, 3000)
			document.getElementById(error[0].path).focus();
			alert(error[0].msg + " " + error[0].path);
		});
	setTimeout(() => {
	}, 5000);

});

const scroller = scrollama();
const images = document.querySelectorAll(".special-image-mask");
const dots = document.querySelectorAll(".dot");
// setup the instance, pass callback functions
scroller
	.setup({
		step: ".step",
	})
	.onStepEnter((response) => {
		dots[response.index].classList.add("active");
		switch (response.direction) {
			case "down":
				images[
					response.index
				].style.transform = `translate3d(0px, -${response.index}00vh, 0px)`;
				break;
		}
	})
	.onStepExit((response) => {
		dots[response.index].classList.remove("active");
		switch (response.direction) {
			case "up":
				images[
					response.index
				].style.transform = `translate3d(0px,0vh, 0px)`;
				break;
		}
	});

gsap.registerPlugin(Draggable, InertiaPlugin);

var slideDelay = 3.5;
var slideDuration = 1.2;
var wrap = true;

var slides = document.querySelectorAll(".slide");
var progressWrap = gsap.utils.wrap(0, 1);

var numSlides = slides.length;

gsap.set(slides, {
	xPercent: (i) => i * 100,
});

var wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
var timer = gsap.delayedCall(slideDelay, autoPlay);

var animation = gsap.to(slides, {
	xPercent: "+=" + numSlides * 100,
	duration: 1,
	ease: "none",
	paused: true,
	repeat: -1,
	modifiers: {
		xPercent: wrapX,
	},
});

var proxy = document.createElement("div");
var slideAnimation = gsap.to({}, {});
var slideWidth = 0;
var wrapWidth = 0;

var draggable = new Draggable(proxy, {
	trigger: ".slides-container",
	inertia: true,
	onPress: updateDraggable,
	onDrag: updateProgress,
	onThrowUpdate: updateProgress,
	snap: {
		x: snapX,
	},
});
resize();
window.addEventListener("resize", resize);
function updateDraggable() {
	timer.restart(true);
	slideAnimation.kill();
	this.update();
}

function animateSlides(direction) {
	timer.restart(true);
	slideAnimation.kill();
	var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);

	slideAnimation = gsap.to(proxy, {
		x: x,
		duration: slideDuration,
		onUpdate: updateProgress,
	});
}

function autoPlay() {
	if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
		timer.restart(true);
	} else {
		animateSlides(-1);
	}
}

function updateProgress() {
	animation.progress(
		progressWrap(gsap.getProperty(proxy, "x") / wrapWidth)
	);
}

function snapX(value) {
	let snapped = gsap.utils.snap(slideWidth, value);
	return wrap
		? snapped
		: gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
}

function resize() {
	var norm = gsap.getProperty(proxy, "x") / wrapWidth || 0;

	slideWidth = slides[0].offsetWidth;
	wrapWidth = slideWidth * numSlides;

	wrap ||
		draggable.applyBounds({ minX: -slideWidth * (numSlides - 1), maxX: 0 });

	gsap.set(proxy, {
		x: norm * wrapWidth,
	});

	animateSlides(0);
	slideAnimation.progress(1);
}
/*Atroposes */
const myAtropos1 = Atropos({
	el: ".atropos-1",
	activeOffset: 40,
	shadowScale: 1.05,
});
const myAtropos2 = Atropos({
	el: ".atropos-2",
	activeOffset: 40,
	shadowScale: 1.05,
});
const myAtropos3 = Atropos({
	el: ".atropos-3",
	activeOffset: 40,
	shadowScale: 1.05,
});
const myAtropos4 = Atropos({
	el: ".atropos-4",
	activeOffset: 40,
	shadowScale: 1.05,
});
const myAtropos5 = Atropos({
	el: ".atropos-5",
	activeOffset: 40,
	shadowScale: 1.05,
});
const myAtropos6 = Atropos({
	el: ".atropos-6",
	activeOffset: 40,
	shadowScale: 1.05,
});
const myAtropos7 = Atropos({
	el: ".atropos-7",
	activeOffset: 40,
	shadowScale: 1.05,
});
const myAtropos8 = Atropos({
	el: ".atropos-8",
	activeOffset: 40,
	shadowScale: 1.05,
});
const myAtropos9 = Atropos({
	el: ".atropos-9",
	activeOffset: 40,
	shadowScale: 1.05,
});
const myAtropos10 = Atropos({
	el: ".atropos-10",
	activeOffset: 40,
	shadowScale: 1.05,
});
/*Atroposes */

/* late appearing effect */

const target = document.querySelectorAll(".target");
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
			observer.unobserve(entry.target);
		}
	});
});

target.forEach((entry) => {
	observer.observe(entry);
});

/* late appearing effect */