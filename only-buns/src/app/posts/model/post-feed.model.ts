import { Comment } from "./comment.model";
import { user } from "./user";

export interface Post {
    id: number;
    description: string;
    imagePath: string;
    userId: number; 
    username: string;
    likes: number;
    likedByUser?: boolean;
    comments?: Comment[];
    createdDate?: Date;
}