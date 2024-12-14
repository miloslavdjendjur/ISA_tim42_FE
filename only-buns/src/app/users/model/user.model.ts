export interface User{
    id: number;
    fullName: string;
    email: string;
    postNumber: number;
    numberOfFollowers: number;
    followsPeople: number;
    username: string;
    followerIds: number[];
    profileImagePath: string;
}