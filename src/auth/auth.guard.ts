import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';

  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      console.log("Ejecución del Guard de Auth");
      if (!token) {
        console.log("Ejecución del Guard de Auth - No hay Token");
        throw new UnauthorizedException();
      }
      try {
        console.log("Ejecución del Guard de Auth - Verificamos el token");
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret:process.env.JWT_SECRET
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        console.log("Ejecución del Guard de Auth - No autorizado");
        throw new UnauthorizedException();
      }
      console.log("Ejecución del Guard de Auth - Autorizado");
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }