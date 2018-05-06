import _ from 'lodash';
import Icon from './sp.png'
import './style.css'
function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');    
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);
    element.classList.add('a');
    return element;
}

document.body.appendChild(component());