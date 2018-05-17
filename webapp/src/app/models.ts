export interface User {
    id: number;
    name: string;
    email: string;
    posts: Post[];
}

export interface Post {
    id: number;
    title: string;
    body: string;
    comments?: Comment[];
}

export interface Comment {
    id: number;
    email: string;
    name: string;
    body: string;
}