import * as request from "../lib/request"

const baseUrl = 'http://localhost:3030/data/gameTime'

export const getAllGameTimes = async () => {
    const result = await request.get(baseUrl);

    return result;
};


export const create = async (gameId, gameTimeData) => {
    const newGameTime = await request.post(baseUrl, {
        gameId,
        gameTimeData,
    });

    return newGameTime;
};