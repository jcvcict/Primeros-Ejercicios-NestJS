import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(Auth.name) private userModel: Model<Auth>){}

  create(createAuthDto: CreateAuthDto) {

    const {password,...userdata} = createAuthDto;
    console.log(createAuthDto.name);
    
    const newUser = new this.userModel({password: bcryptjs.hashSync(password,10),...userdata});

    
    
    return newUser.save();
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
