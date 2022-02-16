import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
   form: document.querySelector('.feedback-form'),
   input: document.querySelector('.feedback-form input'),
   textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

let formData = {
   email: '',
   message: '',
};

populateFeedbackFrom();

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
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//  * - Получаем значение из хранилища
//  * - Если там что-то было, обновляем DOM

function populateFeedbackFrom() {

   const savedMessage = localStorage.getItem(STORAGE_KEY);

   if (savedMessage) {

      formData = JSON.parse(savedMessage);
      refs.input.value = formData.email;
      refs.textarea.value = formData.message;
   }
};

