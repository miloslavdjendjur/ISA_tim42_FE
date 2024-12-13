import { Comment } from "./comment.model";
import { user } from "./user";

export interface Post {
    id: number;
    description: string;
    imagePath: string;
    user: user;
    likes: number;
    comments?: Comment[];
    createdDate?: Date;
}