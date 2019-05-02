import { SET_IMAGES, REMOVE_IMAGE } from 'reduxConf/actions/types';
import http from 'services/http';

export const fetchAllImages = () => dispatch => {
    return new Promise((resolve, reject) => {
        http.get('/Image')
            .then(({ images }) => {
                dispatch({
                    type: SET_IMAGES,
                    payload: images
                });
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export const removeImage = id => dispatch => {
    dispatch({
        type: REMOVE_IMAGE,
        payload: id
    });
}