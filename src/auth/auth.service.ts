import { Injectable, UnauthorizedException} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(Auth.name) private userModel: Model<Auth>,private jwtService: JwtService){}

  create(createAuthDto: CreateAuthDto) {

    const {password,...userdata} = createAuthDto;
    
    
    const newUser = new this.userModel({password: bcryptjs.hashSync(password,10),...userdata});

    newUser.save();
    console.log("Auth Service - Create - Usuario creado");
    return true;
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    
    
    const user =  await this.userModel.findOne({'username': loginDto.usernameocorreo}).exec();

    if(user!=null && bcryptjs.compareSync(loginDto.password,user.password)) {
      console.log("Auth Service - Login - Usuario encontrado");
      const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    
  }throw new UnauthorizedException();
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
