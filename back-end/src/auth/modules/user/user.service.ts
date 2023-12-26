import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.model';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async getUser(query: object): Promise<UserDocument> {
    return this.userModel.findOne(query);
  }

  async getUsers(query: object): Promise<UserDocument[]> {
    return this.userModel.find(query).limit(5);
  }
}
