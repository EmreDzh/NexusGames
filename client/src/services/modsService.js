import * as request from "../lib/request"

const baseUrl = 'http://localhost:3030/data/gameMods'

export const getAllMods = async () => {
    const result = await request.get(baseUrl);

    return result;
};

export const create = async (gameId, gameModsData) => {
    const newMod = await request.post(baseUrl, {
        gameId,
        gameModsData,
    });

    return newMod;
};

export const edit = async (modId, modData) => {
    const result = await request.put(`${baseUrl}/${modId}`, modData);

    return result;
};