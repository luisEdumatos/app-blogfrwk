import { Post } from "../../post/models/post";

export class CommentCreate {
  post: Post;
  comment: string;
}
