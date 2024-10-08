import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema} from './entities/auth.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],

  imports:[MongooseModule.forFeature([{name:Auth.name,schema:AuthSchema}])] 
})
export class AuthModule {}
