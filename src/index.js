import _ from 'lodash';
import Icon from './sp.png'
import './style.css'
function component() {
    var element = document.createElement('div');
    var span = document.createElement('span');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');    
    var myIcon = new Image();
    myIcon.src = Icon;
    span.classList.add('iconfont','t-daijiejue');
    element.appendChild(myIcon);
    element.appendChild(span);
    element.classList.add('a');
    return element;
}

document.body.appendChild(component());