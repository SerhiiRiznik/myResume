
document.addEventListener('scroll', headerSticky)
const navbarHeader = document.querySelector(".navbar_wrap");
const navbarSticky = navbarHeader.offsetTop;  // точка верхного екрана
// console.log(navbarHeader.scrollHeight)  // висота навбара

function headerSticky() {

   if (window.pageYOffset - navbarHeader.scrollHeight > navbarSticky) {
      navbarHeader.classList.add("navbar-sticky");
   } else if (window.pageYOffset < navbarSticky) {
      navbarHeader.classList.remove("navbar-sticky");
   }
}

let btnForScroll = document.querySelector('.arr-target');
btnForScroll.addEventListener('click', function (event) {
   event.preventDefault()

   const windowInnerHeight = document.documentElement.clientHeight + navbarHeader.scrollHeight + 1;
   window.scrollBy({
      top: windowInnerHeight,
      behavior: 'smooth'
   });
});



let mainNavLinks = document.querySelectorAll(".nav-link");

mainNavLinks.forEach(link => {
   link.addEventListener('click', function (e) {
      e.preventDefault();

      let href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const topOffset = navbarHeader.offsetHeight;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
         top: offsetPosition,
         behavior: 'smooth'
      });
   });
})



window.addEventListener("scroll", event => {
   let fromTop = window.scrollY + 100;
   mainNavLinks.forEach(link => {
      let section = document.querySelector(link.hash);
      if (
         section.offsetTop <= fromTop &&
         section.offsetTop + section.offsetHeight > fromTop
      ) {
         link.parentNode.classList.add("active");
      } else {
         link.parentNode.classList.remove("active");
      }
   });
});



window.addEventListener('load', animationScroll)
window.addEventListener('scroll', animationScroll)

function animationScroll() {

   const tittleAnimated = document.querySelectorAll('.blocks-wrapper__tittle')
   const headerContentTittle = document.querySelector('.header_content__tittle')
   const headerContentSubTittle = document.querySelector('.header_content__subtittle')
   const headerContentSubTittle2 = document.querySelector('.header_content__subtittle2')

   const scrollFromTop = window.pageYOffset // прокрутка с начала до початку екрана
   const scrollHeight = document.documentElement.clientHeight // висота екрана
   const sentrWindow = scrollFromTop + scrollHeight / 1.4 // центр екрана


   setTimeout(() => {
      if (sentrWindow >= headerContentTittle.offsetTop) {
         headerContentTittle.classList.add('animation')
      }
   }, 100)
   setTimeout(() => {
      if (sentrWindow >= headerContentSubTittle.offsetTop) {
         headerContentSubTittle.classList.add('animation')
      }
   }, 1000)
   setTimeout(() => {
      if (sentrWindow >= headerContentSubTittle2.offsetTop) {
         headerContentSubTittle2.classList.add('animation')
      }
   }, 1500)


   tittleAnimated.forEach((e) => {
      let positionTopElement = e.offsetTop

      if (sentrWindow >= positionTopElement) {
         e.classList.add('animation')
      }

   })
}


//--------------------------------FORM SEND_____


document.addEventListener('DOMContentLoaded', () => {
   const form = document.getElementById('form')
   let recaptcha = document.querySelector('.g-recaptcha')
   recaptcha.dataset.sitekey = '6LcpxWgaAAAAAACX2TBUahxPuf3tqUyUw0nOqQWB'
   let allInput = document.querySelectorAll('input')
   console.log(allInput);

   form.addEventListener('focusin', () => {

      recaptcha.parentNode.style.transition = '.6s'
      recaptcha.parentNode.style.opacity = '1'
      recaptcha.parentNode.style.transform = 'scale(1)'
   })

   form.addEventListener('submit', formSend)

   async function formSend(e) {
      e.preventDefault()



      let formData = new FormData(form)

      let error = formValidate(form)
      if (error === 0) {
         form.classList.add('_sending')

         let response = await fetch('./contact/submit.php', {
            method: 'POST',
            body: formData,
         })

         console.log(response)
         if (response.ok) {

            form.reset()
            form.classList.remove('_sending')
            console.log('ответ с сервера', response.ok,)
            recaptcha.parentNode.style.opacity = '0'
            recaptcha.parentNode.style.transform = 'scale(0)'
         } else {
            console.log('ответ с сервера', response.ok,)
            form.classList.remove('_sending')
            recaptcha.parentNode.style.opacity = '0'
            recaptcha.parentNode.style.transform = 'scale(0)'
         }
      } else {
         // alert('Заполните все поля')
         console.log('Заполните все поля')
      }
   }

   function formValidate(form) {
      let error = 0
      let formReq = document.querySelectorAll('._req')

      if (grecaptcha.getResponse() == "") {
         error++
      }

      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input)
         if (input.classList.contains('email')) {
            if (emailTest(input)) {
               formAddError(input)
               error++
            }
         }
         if (input.value === '') {
            formAddError(input)
            error++
         }
      }
      return error
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error')
      input.classList.add('_error')
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error')
      input.classList.remove('_error')
   }

   function emailTest(input) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])+$/.test(input.value)
   }
})


