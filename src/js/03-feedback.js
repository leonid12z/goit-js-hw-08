import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
   form: document.querySelector('.feedback-form'),
   input: document.querySelector('.feedback-form input'),
   textarea: document.querySelector('textarea'),
};

let formData = {};
populateFeedbackFrom();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));


//  * - Останавливаем поведение по умолчанию
//  * - Убираем данные из хранилища
//  * - Очищаем форму

function onFormSubmit(evet) {
   evet.preventDefault();
   evet.currentTarget.reset();

   console.log(formData);

   localStorage.removeItem(STORAGE_KEY);
}

//  * - Получаем значение поля
//  * - Сохраняем его в хранилище
//  * - Можно добавить throttle

function onFormInput(evet) {
   formData[evet.target.name] = evet.target.value;

   console.log('formData :>>', formData);

   const savedData = JSON.stringify(formData)

   localStorage.setItem(STORAGE_KEY, savedData);
}

//  * - Получаем значение из хранилища
//  * - Если там что-то было, обновляем DOM

function populateFeedbackFrom() {

   const savedMessage = localStorage.getItem(STORAGE_KEY);
   console.log(savedMessage);

   if (savedMessage) {

      const parseSaven = JSON.parse(savedMessage);
      const keys = Object.keys(parseSaven);

      for (const key of keys) {
         refs.form.elements[key].value = parseSaven[key];
         formData[key] = parseSaven[key];
      }

   }
};

