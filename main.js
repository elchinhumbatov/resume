const animItems = document.querySelectorAll('._anim-items');
const myBody = document.querySelector('#my-body');
const theme = document.querySelector('#theme');
const darkMain = document.querySelectorAll('.darkMain');
const darkScnd = document.querySelectorAll('.darkScnd');
let title = document.querySelector('#title');
let nav = document.querySelector('nav');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav ul a');
let progressbar = document.querySelector('#progressbar');
let toTop = document.querySelector('#toTop');
var form = document.querySelector("#c-form form");
let themeBool = 0;

function lightTheme() {
  let shadow = document.querySelector('#shadow');
  darkMain.forEach(item => item.classList.add('lightMain'));
  darkScnd.forEach(item => item.classList.add('lightScnd'));
  shadow.style.background = "linear-gradient(to top, var(--lightScnd), transparent)";
  themeBool = 1;
  darkTheme();
}
function darkTheme() {
  myBody.style.display = "block";
  setTimeout(() => myBody.classList.add('show'), 100);
  theme.style.display = "none";
  setTimeout(animOnScroll, 700);
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
    nav.style.boxShadow = "0 5px 10px rgba(0,0,0,.5)";
    toTop.style.opacity = "1";
    if (!themeBool) {
      nav.style.background = "var(--darkMain)";
      navLinks.forEach(link => link.style.color = 'var(--lightMain)');
    } else {
      nav.style.background = "var(--lightMain)";
      navLinks.forEach(link => link.style.color = 'var(--darkMain)');
    }
  } else {
    title.style.opacity = "1";
    nav.style.background = "transparent";
    nav.style.boxShadow = "none";
    toTop.style.opacity = "0";
  }
}
function myanim() {
  for (let i = 0; i < sections.length; i++) {
    if (window.scrollY + nav.offsetHeight + 10 >= sections[i].offsetTop && 
        window.scrollY <= sections[i].offsetTop + sections[i].offsetHeight) {
      let offsetData = sections[i].dataset.scroll;
      // navLinks.forEach(item => {
      //   if (offsetData == item.dataset.link) {
      //     item.classList.add('active');
      //   } else { item.classList.remove('active'); }
      // });
      for (let i = 0; i < navLinks.length; i++) {
        let tabLinks = document.querySelectorAll('#tabbar a');
        let item = (window.innerWidth >= 600) ? navLinks[i] : tabLinks[i];
        if (offsetData == item.dataset.link) {
          item.classList.add('active');
        } else { item.classList.remove('active'); }
      }
      if (offsetData == 'skills') {
        let rings = document.querySelectorAll('.progressRing circle:nth-child(2)');
        let skillBars = document.querySelectorAll('.progress span');
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

function goTop() { window.scrollTo(0, 0) }

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

    
async function handleSubmit(event) {
  event.preventDefault();
  let loader = document.querySelector('#form-loader');
  loader.style.display = 'flex';
  let status = document.getElementById("form-status");
  let data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    loader.style.display = 'none';
    status.classList.add('succes');
    status.innerHTML = "Thanks for your message!";
    reset('succes');
    form.reset('succes');
  }).catch(error => {
    loader.style.display = 'none';
    status.classList.add('error');
    status.innerHTML = "Oops! Something went wrong...";
    reset('error');
  });
  function reset(_status) {
    setTimeout(() => {
      status.classList.remove(_status);
      status.innerHTML = "";
    }, 3000);
  }
}
form.addEventListener("submit", handleSubmit)