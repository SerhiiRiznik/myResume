const enterContainer = document.querySelector('.enter_container') // Весь входной контеинер
const enterContent = document.querySelector('.enter_content') // контейнер для вивода заголовка и ввода имя
const enterWelcomeText = document.querySelector('#welcome-enter') // Текст которий появляеться 
const enterInputName = document.querySelector('#enterName') // Инпут для ввода имя



enterInputName.addEventListener('input', function () {
   if (enterInputName.value.length > 0) {
      enterInputName.classList.add('focus')
   } else {
      enterInputName.classList.remove('focus')
   }
}); // Фокус при вводе текста в инпуте




function innerNewName() {
   let MainPage = document.getElementById('main-page')



   setTimeout(function () {
      let autputName = document.getElementById('newName')
      newName.innerHTML = `Hi, ${enterName.value}`;  // не працює перевірка на пусте поле
      autputName.classList.add('newName');
   }, 1000)




   setTimeout(function () {
      let butRemove = document.getElementById('forRemov');

      enterWelcomeText.classList.add('removed-item');
      enterWelcomeText.style.display = 'none';
      butRemove.classList.add('removed-item');
      enterInputName.classList.add('removed-item');
      setTimeout(function () {
         enterContainer.style.display = 'none';
      }, 4000)

   }, 500)


   setTimeout(function () {
      MainPage.style.zIndex = 10;
      MainPage.classList.add('show')
      MainPage.style.filter = "blur(0px)"
   }, 3000)


}



// // Время ---------------Годинник---------------
setInterval(() => {
   const mainTime = document.querySelector('.time')

   let time = new Date;
   let hh = time.getHours();
   let mm = time.getMinutes();
   let ss = time.getSeconds();

   if (ss < 10) ss = '0' + ss
   if (mm < 10) mm = '0' + mm
   if (hh < 10) hh = '0' + hh

   mainTime.innerText = `${hh}:${mm}:${ss}`;
}, 1000);
// // Время ---------------Годинник---------------































