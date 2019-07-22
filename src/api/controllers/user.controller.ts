import { Controller } from './controller.model';
import { Request, Response } from 'express';
import { UserModel } from '../db/user/user.model';
import { FETCH_QUERY_LIMIT } from '../../../common/config/db';
import { User } from '../../../common/models/user';

export class UserController extends Controller {
  protected initialize(): void {
    this.router.get('/:id?', this.getUser);
    this.router.post('/', this.postUser);
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    let users: User[] = [];
    if (req.params.id) {
      const user = await UserModel.findById(req.params.id);
      if (user) {
        users = [user];
      }
    } else {
      users = await UserModel.find()
        .limit(FETCH_QUERY_LIMIT);
    }
    res.status(200).json({
      users,
      message: 'Here are your users :)',
    });
  }

  public async postUser(req: Request, res: Response): Promise<void> {
    // @todo: validate req.body?
    const user = await new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    })
      .save();
    res.status(200).json({
      user,
      message: 'User successfully saved!:)',
    });
  }
}
