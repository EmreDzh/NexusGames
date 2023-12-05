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

export const getLatestGames = async () => {
    
    const result = await request.get(`${baseUrl}?sortBy=_createdАt`);

    return result;
}

export const getUserGames = async (userId) => {
    try {
        const result = await request.get(`http://localhost:3030/users/${userId}/videoGames`);
        return result.games; 
    } catch (error) {
        throw new Error('Error fetching user games');
    }
};

export const create = async (gameData) => {
    const result = await request.post(baseUrl, gameData);

    return result;
};

export const edit = async (gameId, gameData) => {
    const result = await request.put(`${baseUrl}/${gameId}`, gameData);

    return result;
};

export const remove = async (gameId) => request.remove(`${baseUrl}/${gameId}`);

