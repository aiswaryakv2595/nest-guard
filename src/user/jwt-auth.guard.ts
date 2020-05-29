import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(
      private readonly user: UserService,
    ) { }
  
    canActivate(context: ExecutionContext) {
      // Get the header
      
      const request = context.switchToHttp().getRequest();
      const authHeader=request.headers.authorization;

  console.log(authHeader);
      if (!authHeader) {
        throw new BadRequestException('Authorization header not found.');
      }
      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer') {
        throw new BadRequestException(`Authentication type \'Bearer\' required. Found \'${type}\'`);
      }
      const validationResult = this.user.ValidateToken(token);
      console.log(validationResult);
      if (validationResult === true) {
        return true;
      }
      throw new UnauthorizedException(validationResult);
    }
    }