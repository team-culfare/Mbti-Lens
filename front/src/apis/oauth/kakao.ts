import { instance } from "../base";

const getAccessToken = async () => {
    return await instance().get("/auth/oauth/kakao");
};

export default getAccessToken;
