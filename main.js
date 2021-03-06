const animItems = document.querySelectorAll('._anim-items');
const darkMain = document.querySelectorAll('.darkMain');
const darkScnd = document.querySelectorAll('.darkScnd');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav ul a');
let progressbar = document.querySelector('#progressbar');
var form = document.querySelector("#c-form form");
let shadow = document.querySelector('#shadow');
let items = $('.s-item');
let themeCounter = 0;
let count = 0;
let skillsX1;


function themeToggle() {
  themeCounter++;
  if (themeCounter%2) {
    darkMain.forEach(item => item.classList.add('lightMain'));
    darkScnd.forEach(item => item.classList.add('lightScnd'));
    shadow.style.background = "linear-gradient(to top, var(--lightScnd), transparent)";
    navLinks.forEach(link => link.style.color = 'var(--darkMain)');
  } else {
    darkMain.forEach(item => item.classList.remove('lightMain'));
    darkScnd.forEach(item => item.classList.remove('lightScnd'));
    shadow.style.background = "linear-gradient(to top, var(--darkMain), transparent)";
    navLinks.forEach(link => link.style.color = 'var(--lightMain)');
  }
}
setTimeout(animOnScroll, 700);
document.addEventListener('scroll', () => {
  myanim();
  animOnScroll();
  progressBar();
});
function progressBar() {
  let w =  document.body.scrollTop || document.documentElement.scrollTop;
  let h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressbar.style.width = ((w / h ) * 100) + '%';
}
function myanim() {
  for (let i = 0; i < sections.length; i++) {
    if (window.scrollY + 10 >= sections[i].offsetTop && 
        window.scrollY <= sections[i].offsetTop + sections[i].offsetHeight) {
      let offsetData = sections[i].dataset.scroll;
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
form.addEventListener("submit", handleSubmit);

function skillsRight(prop) {
  let itemCount = Math.trunc($('#scndSkills-items').width() / 150);
  count++;
  if (prop) {
    console.log('some');
  }
  if (items.length - count * itemCount <= itemCount) {
    for (let i = 0; i < items.length; i++) {
      items[i].style.transform='translate('+(items.length - itemCount) * -150 +'px, 0)';
    }
    count--;
  }
  else {
    for (let i = 0; i < items.length; i++) {
      items[i].style.transform='translate('+(itemCount * count * -150)+'px, 0)';
    }
  }
}
function skillsLeft() {
  let itemCount = Math.trunc($('#scndSkills-items').width() / 150);
  count--;
  if (count < 0) count = 0;
  for (let i = 0; i < items.length; i++) {
    items[i].style.transform='translate('+(itemCount*count*-150)+'px, 0)';
  }
}
function mDown(e) {
  skillsX1 = e.clientX;
  $('#scndSkills-items').css('cursor', 'grabbing');
}
function mUp(e) {
  if (skillsX1 - 50 >= e.clientX ) skillsRight();
  else if (skillsX1 + 50 <= e.clientX ) skillsLeft();
  $('#scndSkills-items').css('cursor', 'grab');
}
function tchStart(e) {
  skillsX1 = e.touches[0].clientX;
}
function tchEnd(e) {
  let x2 = e.changedTouches[0].clientX;
  if (skillsX1 - 30 >= x2) skillsRight();
  else if (skillsX1 + 30 <= x2) skillsLeft();
}