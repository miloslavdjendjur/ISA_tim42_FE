import { Comment } from "@angular/compiler";

export interface Post {
    id: number;
    description: string;
    imagePath: string;
    user_id: number;
    likes: number;
    coments: Comment[];
}