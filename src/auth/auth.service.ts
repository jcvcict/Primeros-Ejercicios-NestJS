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

    
    
    return true;
  }

  async login(createAuthDto: CreateAuthDto){

    const {username,password} = createAuthDto;
    
    const user =  await this.userModel.find({username: username}).exec();
    if(user.length>0 && bcryptjs.compareSync(password,user[0].password))
    return true;
    else
    return 'No existe';
   
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
