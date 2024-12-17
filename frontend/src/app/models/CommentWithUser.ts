import { CommentDTO } from './CommentDTO';
import { userDTO } from './userDTO';

export class CommentWithUser { 
  constructor(
    public comment: CommentDTO,
    public user: userDTO []
  ) {
    this.comment = comment;
    this.user = user;
  }
}
