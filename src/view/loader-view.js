import {createElement} from '../render.js';

 function createLoaderTemplate() {
   return '<p class="trip-events__msg"></p>';
 }

 export default class LoaderView {
   getElement() {
     return createElement(createLoaderTemplate());
   }
 }
