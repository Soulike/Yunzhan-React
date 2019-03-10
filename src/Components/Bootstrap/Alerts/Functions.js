import Style from './Style.module.scss';
import ReactDOM from 'react-dom';

export function popAlert(alertNode, durationMilliseconds = 1500)
{
    const root = document.getElementById('root');
    const node = document.createElement('div');
    node.className = Style.alertWrapper;
    node.setAttribute('style', `animation-duration: ${durationMilliseconds / 2}ms`);
    const wrapper = root.appendChild(node);
    ReactDOM.render(alertNode, wrapper);

    setTimeout(() =>
    {
        ReactDOM.unmountComponentAtNode(wrapper);
        root.removeChild(node);
    }, durationMilliseconds);
}