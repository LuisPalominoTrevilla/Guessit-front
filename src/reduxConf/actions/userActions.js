import { SET_USER, REMOVE_USER, ADD_USER_IMAGES, ADD_USER_IMAGE } from './types';
import http from 'services/http';

export const addUser = url => dispatch => {
    dispatch({
        type: SET_USER,
        payload: url
    });
}

export const removeUser = () => dispatch => {
    dispatch({
        type: REMOVE_USER
    });
}

export const fetchImages = () => dispatch => {
    return new Promise((resolve, reject) => {
        http.get('Image/FromUser')
            .then(({images}) => {
                dispatch({
                    type: ADD_USER_IMAGES,
                    payload: images
                });
            })
            .catch(err => {
                reject(err);
            });
    });
}

export const insertImage = (image) => dispatch => {
    dispatch({
        type: ADD_USER_IMAGE,
        payload: image
    });
}