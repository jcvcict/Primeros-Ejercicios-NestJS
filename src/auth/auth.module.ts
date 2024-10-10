import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema} from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


/*Hay muchas estrategias en Passport */
@Module({
  controllers: [AuthController],
  providers: [AuthService,ConfigService],
  exports:[PassportModule],

  imports:[MongooseModule.forFeature([{name:Auth.name,schema:AuthSchema}]), PassportModule.register({defaultStrategy: 'jwt'}) ,JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: process.env.JWT_SECRET, // puede que de error;
      signOptions:{
        expiresIn:7200
      }

    }),
    inject: [ConfigService],
  })],
   
})
export class AuthModule {}
