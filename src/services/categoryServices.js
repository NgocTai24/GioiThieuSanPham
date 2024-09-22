import { get } from "../utils/requets";

export const getListCatrgory = async () => {
    const result = await get("category");
    return result;
}