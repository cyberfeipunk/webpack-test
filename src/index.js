import _ from "lodash"
import '@/css/style.css'

function component(){
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello','webpack','this is index'],' ');
  element.classList.add('hello');
  return element;
}

document.body.appendChild(component());
