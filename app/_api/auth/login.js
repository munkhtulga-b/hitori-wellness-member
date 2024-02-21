import useFetch from "../config";

export const login = async (body) => {
    const response = await useFetch("/auth/login", "POST", body);
    return response;
}