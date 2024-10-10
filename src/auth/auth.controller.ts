import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Req , UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import {Session} from '@nestjs/common';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    console.log("Me llega una solicitud Post");
    console.log(createAuthDto);
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto,@Req() req:Request) {
    
    return this.authService.login(loginDto);
    
    
  }

  @UseGuards(AuthGuard)
  @Get('registrado')
  getProfile(@Request() req:any) {
    return "Has accedido a la ubicación por lo tanto estas loggeado";
  }

  @Get()
  async getAuthSession(@Session()session: Record<string,any>){
    console.log(session);
    console.log(session.id);

  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
