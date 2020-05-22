import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtPayload } from './input/JwtPayload';
//import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secrete key',
    });
  }

  // async validate(email:string,password:string, done: Function) {
  //   const user = await this.userService.login(email,password);
  //   if (!user) {
  //     return done(new UnauthorizedException(), false);
  //   }
  //   done(null, user);
  // }
  async validate(payload: JwtPayload) {
    console.log(payload)
   
  }
}