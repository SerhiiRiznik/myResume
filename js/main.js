
const navbarHeader = document.querySelector(".navbar")
const mainNavLinks = document.querySelectorAll(".nav-link")
mainNavLinks.forEach(link => {
   link.addEventListener('click', function (e) {
      e.preventDefault()
      let href = this.getAttribute('href').substring(1)
      const scrollTarget = document.getElementById(href)
      const topOffset = navbarHeader.offsetHeight
      const elementPosition = scrollTarget.getBoundingClientRect().top
      const offsetPosition = elementPosition - topOffset

      window.scrollBy({
         top: offsetPosition,
         behavior: 'smooth'
      })
   })
})

let btnForScroll = document.querySelector('.arrow-link')
btnForScroll.addEventListener('click', function (event) {
   event.preventDefault()

   window.scrollTo({
      top: navbarHeader.offsetTop,
      behavior: 'smooth'
   })
})



// --------------------------ANIMATED NAV BTN----------

const navButton = document.querySelector('.nav-button')

navButton.addEventListener('click', ()=> {
   const animatedIcon = document.querySelector('.animated-icon')

   animatedIcon.classList.toggle('open')
})

// ----------------------------SCROLLING ANIMATION----------

window.addEventListener("scroll", event => {
   let scrollFromTop = window.scrollY - window.innerHeight
   mainNavLinks.forEach(link => {
      const section = document.querySelector(link.hash)
      if (
         section.offsetTop <= scrollFromTop &&
         section.offsetTop + section.offsetHeight > scrollFromTop
      ) {
         link.parentNode.classList.add("active")
      } else {
         link.parentNode.classList.remove("active")
      }
   })
})

window.addEventListener('load', animationScroll, false)
window.addEventListener('scroll', animationScroll, false)

function animationScroll() {

   const tittleAnimated = document.querySelectorAll('.blocks-wrapper__tittle')
   const headerContentTittle = document.querySelector('.header_content__tittle')
   const headerContentSubTittle = document.querySelector('.header_content__subtittle')

   const scrollFromTop = window.pageYOffset // прокрутка с начала до початку екрана
   const scrollHeight = document.documentElement.clientHeight // висота екрана
   const centerWindow = scrollHeight / 1.3 // центр екрана

   setTimeout(() => {
      if (centerWindow >= headerContentTittle.offsetTop) {
         headerContentTittle.classList.add('animation')
      }
   }, 100)
   setTimeout(() => {
      if (centerWindow >= headerContentSubTittle.offsetTop) {
         headerContentSubTittle.classList.add('animation')
      }
   }, 1000)

   
   tittleAnimated.forEach((e) => {



      let positionTopElement = e.getBoundingClientRect()
      if (centerWindow >= positionTopElement.top) {
         e.classList.add('animation')
      }

   })
}


//--------------------------------FORM SEND--------------


document.addEventListener('DOMContentLoaded', () => {
   let form = document.getElementById('form')
   let recaptcha = document.querySelector('.g-recaptcha')
   recaptcha.dataset.sitekey = '6LfCP2QcAAAAAH9sPIQokawxLwWozeTjnicfjwGs'
   

   form.addEventListener('submit', formSend)

   async function formSend(e) {

      e.preventDefault()
      let item = document.querySelector('.alert')
      if (item) {
         item.parentNode.removeChild(item)
      }
      
      let formData = new FormData(form)

      let error = formValidate(form)
      if (error === 0) {
         form.classList.add('_sending')

         let response = await fetch('./contact/submit.php', {
            method: 'POST',
            body: formData,
         })
         if (response) {
            
            form.classList.remove('_sending')

            if (response.ok) {
               let newdiv = alert('success', 'Your message was sent successfully!')
               form.prepend(newdiv)
               form.reset()
            } else {
               let newdiv = alert('danger', 'Your message was not sent!')
               form.prepend(newdiv)
               form.classList.remove('_sending')
            }
         }
         
      } else {
         let newdiv = alert('danger', 'Fill in all the fields')
         form.prepend(newdiv)
      }
     grecaptcha.reset()
   }
   //---------------ALERT FOR FORM----------------
   
   function alert(type,message){
         let div = document.createElement('div')
            div.className = `alert alert-${type}`
            div.innerHTML = `${message}`
         return div

   }
  
         
   //--------------VALIDATE FORM-----------------

   function formValidate(form) {
      let error = 0
      let formReq = document.querySelectorAll('._req')
      var response = grecaptcha.getResponse()
         if(response.length == 0){
            error++
            return false
         }
      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index]
            input.addEventListener('focus',function(e){
               e.preventDefault()
               formRemoveError(input)
            })
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
      input.classList.add('_error')
   }
   function formRemoveError(input) {
      input.classList.remove('_error')
   }

   function emailTest(input) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])+$/.test(input.value)
   }
})
