import _ from 'lodash';
import Icon from './sp.png'
function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');    
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);
    return element;
}

document.body.appendChild(component());