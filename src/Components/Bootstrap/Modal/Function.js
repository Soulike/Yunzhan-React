import $ from 'jquery';

export function showModal(modalId, callBack = () => null)
{
    const $modal = $(`#${modalId}`);
    $modal.modal('show');
    $modal.on('shown.bs.modal', callBack);
}

export function hideModal(modalId, callBack = () => null)
{
    const $modal = $(`#${modalId}`);
    $modal.modal('hide');
    $modal.on('hidden.bs.modal', callBack);
}