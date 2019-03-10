import Style from './Style.module.scss';
import ReactDOM from 'react-dom';
import GrowingSpinner from './View';
import React from 'react';

const node = document.createElement('div');
node.className = Style.spinnerWrapper;

export function addSpinner()
{
    const root = document.getElementById('root');
    const wrapper = root.appendChild(node);
    ReactDOM.render(<GrowingSpinner />, wrapper);
}

export function showSpinner()
{
    node.setAttribute('style', `display: block`);
}

export function hideSpinner()
{
    node.removeAttribute('style');
}