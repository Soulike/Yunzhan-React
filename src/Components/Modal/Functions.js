import $ from 'jquery';

export function showModal(modalId)
{
    $(`#${modalId}`).modal('show');
}

export function hideModal(modalId)
{
    $(`#${modalId}`).modal('hide');
}