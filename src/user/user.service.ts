import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  async createUser(body: CreateUserDto) {
    try {
      const isExits = await this.userModel.findOne({
        $or: [{ email: body.email }, { phone: body.phone }],
      });
      console.log(isExits);

      if (isExits) {
        return false;
      }

      const user = new User();
      user.first_name = body.first_name;
      user.last_name = body.last_name;
      user.email = body.email;
      user.phone = body.phone;

      const data = await this.userModel.create(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        data,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const data = await this.userModel.find();
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'User data fetched successfully',
        data,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(_id: string) {
    try {
      const data = await this.userModel.findById(_id).catch((err) => {
        return [];
      });

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'User data fetched successfully',
        data,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(_id: string) {
    try {
      const data = await this.userModel.findByIdAndDelete(_id).catch((err) => {
        return false;
      });

      if (data) {
        return {
          statusCode: HttpStatus.ACCEPTED,
          message: 'User deleted successfully',
        };
      }
      return data;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
