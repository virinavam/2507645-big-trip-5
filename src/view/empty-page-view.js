import {createElement} from '../../render.js';

 function createEmptyPageTemplate() {
   return '<p class="trip-events__msg"></p>';
 }

 export default class EmptyPageView {
   getElement() {
     return createElement(createEmptyPageTemplate());
   }
 }
