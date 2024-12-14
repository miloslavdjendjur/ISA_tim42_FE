export interface Comment{
    id?: number;
    text: string;
    createdTime: string;
    userId: number;
    postId: number;
    username?: string;
}