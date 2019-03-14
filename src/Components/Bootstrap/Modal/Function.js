import $ from 'jquery';

export function showModal(modalId)
{
    const $modal = $(`#${modalId}`);
    $modal.modal('show');
}

export function showModalAsync(modalId)
{
    return new Promise(resolve =>
    {
        const $modal = $(`#${modalId}`);
        $modal.modal('show');
        $modal.on('shown.bs.modal', () =>
        {
            resolve();
        });
    });
}

export function hideModal(modalId)
{
    const $modal = $(`#${modalId}`);
    $modal.modal('hide');
}

export function hideModalAsync(modalId)
{
    return new Promise(resolve =>
    {
        const $modal = $(`#${modalId}`);
        $modal.modal('hide');
        $modal.on('hidden.bs.modal', () =>
        {
            resolve();
        });
    });
}