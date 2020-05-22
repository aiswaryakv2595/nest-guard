import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(
      private readonly user: UserService,
    ) { }
  
    canActivate(context: ExecutionContext) {
      // Get the header
      const authHeader = context.getArgs()[2].req.headers.authorization as string;
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
  // export class JwtAuthGuard extends AuthGuard('jwt') {
  //   getRequest(context: ExecutionContext) {
  //     const ctx = GqlExecutionContext.create(context);
  //     const request=ctx.getContext().req;
  //     console.log(request);
  //     return ctx.getContext().req;
  //   }
  // }
  
    // handleRequest(err, user, info) {

 // }