import { Comment } from "./comment.model";

export interface Post {
    id: number;
    description: string;
    imagePath: string;
    user_id: number;
    likes: number;
    comments?: Comment[];
}