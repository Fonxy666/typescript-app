import { ILikes } from "./ILikes";

export interface IComment {
    id?: number,
    content: string;
    likes?: ILikes[] | null
}