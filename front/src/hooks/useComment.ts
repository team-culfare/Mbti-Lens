// 댓글 데이터 종합 및 생성 custom hook

import { addComment } from "@/apis/rating";
import { SearchResponse } from "@/types/response";
import { useState } from "react";
import { mbtiArray } from "@/constants/mbti";

type MbtiType<T> = Map<string, T> | undefined;

const useComment = (
    res: SearchResponse,
    userId: number,
    public_key: string,
) => {
    const { ei, ns, tf, pj } = res.data;
    const [current, setCurrent] = useState<string>("mbti_e_i");
    const [likes, setLikes] = useState<MbtiType<boolean>>(undefined);
    const [comments, setComments] = useState<MbtiType<string>>(undefined);
    const [response, setResponse] = useState<[]>([]);
    const mbtiData: { [key: string]: string } = {
        mbti_e_i: ei,
        mbti_n_s: ns,
        mbti_t_f: tf,
        mbti_p_j: pj,
    };

    const currentHandler = (mbtiKey: string) => {
        setCurrent(mbtiKey);
    };

    const likeHandler = (key: string, value: boolean) => {
        setLikes((prev) => new Map(prev).set(key, value));
    };

    const commentHandler = (key: string, content: string) => {
        setComments((prev) => new Map(prev).set(key, content));
    };

    const fetch = () => {
        mbtiArray.map(async (value) => {
            const request = await addComment({
                userId,
                mbti: mbtiData[value],
                public_key,
                like: likes?.get(value) || false,
                comment: comments?.get(value) || "",
            })
                .then()
                .catch();
        });
        return response;
    };

    return {
        current,
        likes,
        setCurrent,
        comments,
        mbtiData,
        currentHandler,
        likeHandler,
        commentHandler,
        addComment,
        fetch,
    };
};

export default useComment;