import * as request from "../lib/request"

const baseUrl = 'http://localhost:3030/data/videoGames'

export const getAll = async () => {
    const result = await request.get(baseUrl);

    return result;
};

export const getOne = async (gameId) => {
    const result = await request.get(`${baseUrl}/${gameId}`, );

    return result;
}

export const getGames = async () => {
    const query = new URLSearchParams({
        //sortBy: `_createdOn desc`,
        offset: 0,
        pageSize: 3
    });

    const result = await request.get(`${baseUrl}?${query}`);

    return result;
}

export const create = async (gameData) => {
    const result = await request.post(baseUrl, gameData);

    return result;
};

