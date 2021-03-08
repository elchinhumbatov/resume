const animItems = document.querySelectorAll('._anim-items');
const paralaxElem = document.querySelector("#shadow");
const myBody = document.querySelector('#my-body');
const theme = document.querySelector('#theme');
const darkMain = document.querySelectorAll('.darkMain');
let header = document.querySelector('header');
let title = document.querySelector('#title');
let nav = document.querySelector('nav');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav ul a');
let progressbar = document.querySelector('#progressbar');
let toTop = document.querySelector('#toTop');
let rings = document.querySelectorAll('.progressRing circle:nth-child(2)');
let skillBars = document.querySelectorAll('.progress span');
function lightTheme() {
  darkMain.forEach(item => item.classList.add('lightMain'));
  myBody.style.display = "block";
  theme.style.display = "none";
}
function darkTheme() {
  myBody.style.display = "block";
  theme.style.display = "none";
}
document.addEventListener('scroll', () => {
  myanim();
  animOnScroll();
  navOnScrol();
  progressBar();
});
function progressBar() {
  let w =  document.body.scrollTop || document.documentElement.scrollTop;
  let h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressbar.style.width = ((w / h ) * 100) + '%';
}
function navOnScrol() {
  if (window.scrollY > 150) {
    title.style.opacity = "0";
    nav.style.background = "var(--darkMain)";
    nav.style.boxShadow = "0 10px 15px rgba(0,0,0,.5)";
    toTop.style.opacity = "1";
  } else {
    title.style.opacity = "1";
    nav.style.background = "transparent";
    nav.style.boxShadow = "none";
    toTop.style.opacity = "0";
  }
}
function myanim() {
  for (let i = 0; i < sections.length; i++) {
    if (window.scrollY + nav.offsetHeight + 100 >= sections[i].offsetTop && 
        window.scrollY <= sections[i].offsetTop + sections[i].offsetHeight) {
      let offsetData = sections[i].dataset.scroll;
      navLinks.forEach(item => {
        if (offsetData == item.dataset.link) {
          item.classList.add('active');
        } else { item.classList.remove('active'); }
      });
      if (offsetData == 'skills') {
        for (let i = 1; i <= rings.length; i++) {
          rings[i-1].classList.add("ring" + i);
        }
        for (let i = 0; i < skillBars.length; i++) {
          skillBars[i].classList.add('bar' + (i+1));
        }
      }
    }
  }
}
function animOnScroll() {
  for (i = 0; i < animItems.length; i++) {
    const animItem = animItems[i];
    const animItemHeight = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;
    const animStart = 0.9;

    let animItemPoint = window.innerHeight - animItemHeight;

    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if (pageYOffset > (animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
      animItem.classList.add('_active');
    } else {
      if (!animItem.classList.contains('_anim-norepeat')) {
        animItem.classList.remove('_active');
      }
    }
  }
}
function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
setTimeout(animOnScroll, 500);
toTop.onclick = () => window.scrollTo(0, 0);

header.addEventListener("mousemove", parallax);
function parallax(e) {
    let _w = window.innerWidth;
    let _h = window.innerHeight;
    let _mouseX = e.clientX/2;
    let _mouseY = e.clientY/2;
    let _depth1 = `${25 - (_mouseX - _w) * 0.006}% ${60 - (_mouseY - _h) * 0.006}%`;
    let _depth2 = `${55 - (_mouseX - _w) * 0.006}% ${70 - (_mouseY - _h) * 0.006}%`;
    let _depth3 = `${70 - (_mouseX - _w) * 0.006}% ${30 - (_mouseY - _h) * 0.006}%`;
    let _depth4 = `${20 - (_mouseX - _w) * 0.006}% ${30 - (_mouseY - _h) * 0.006}%`;
    let x = `${_depth4}, ${_depth3}, ${_depth2}, ${_depth1}`;
    paralaxElem.style.backgroundPosition = x;
}
$('#scndSkills-items').slick({
  slidesToShow: 7,
  slidesToScroll: 5,
  waitForAnimate: false,
  swipeToSlide: true,
  variableWidth: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 6 }
    },
    {
      breakpoint: 800,
      settings: { slidesToShow: 4 }
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 400,
      settings: { slidesToShow: 2 }
    }
  ]
});