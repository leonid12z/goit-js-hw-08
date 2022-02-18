// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from "./gallery-items";
// Change code below this line
console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

const galleryMarkup = galleryItems.map(galleryItem => {
   return `<a class = "gallery__item" href = "${galleryItem.original}">
<img class = "gallery__image" src = "${galleryItem.preview}" alt = "${galleryItem.description}"/>
</a>`
})

galleryList.insertAdjacentHTML("beforeend", galleryMarkup.join(""))

 new SimpleLightbox('.gallery a',
         {
            captionsData: 'alt',
            captionDelay: 250,
         });




     


