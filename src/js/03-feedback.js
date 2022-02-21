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

// добавляем throttle

refs.form.addEventListener('input', throttle(onFormInput, 500));

//  * - Останавливаем поведение по умолчанию
//  * - Убираем данные из хранилища
//  * - Очищаем форму

function onFormSubmit(evt) {
   evt.preventDefault();

   console.log(formData);

   formData = {};

   evt.currentTarget.reset();
   
   localStorage.removeItem(STORAGE_KEY);
}

//  * - Получаем значение поля
//  * - Сохраняем его в хранилище
//  * - Можно добавить throttle

function onFormInput(evt) {

   formData[evt.target.name] = evt.target.value;

   console.log('formData :>>>', formData);

   const saveData = JSON.stringify(formData)

   localStorage.setItem(STORAGE_KEY, saveData);
}

//  * - Получаем значение из хранилища
//  * - Если там что-то было, обновляем DOM

function populateFeedbackFrom() {

   const saveMessage = localStorage.getItem(STORAGE_KEY);

   console.log(saveMessage);

   if (saveMessage) {

      const parseSave = JSON.parse(saveMessage);
      const keys = Object.keys(parseSave);

      for (const key of keys) {
         refs.form.elements[key].value = parseSave[key];
         formData[key] = parseSave[key];
      }
   }
};

