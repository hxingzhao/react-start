import _ from 'lodash';
<<<<<<< HEAD
import Icon from './sp.png'
=======
import './style.css'
>>>>>>> css-loader
function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');    
<<<<<<< HEAD
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);
=======
    element.classList.add('a');
>>>>>>> css-loader
    return element;
}

document.body.appendChild(component());