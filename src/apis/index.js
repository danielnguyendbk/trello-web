import axios from 'axios';
import { API_HOST } from '../utils/constant.js';

export const fetchBoardDetails = async (boardId) => {
    const response =  await axios.get(`${API_HOST}/v1/boards/${boardId}`)

    return response.data;
};
