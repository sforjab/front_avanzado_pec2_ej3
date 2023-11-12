import { PostDTO } from "../models/post.dto";


export interface PostsState {
    posts: PostDTO[];
    post: PostDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}