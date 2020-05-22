import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SignupInput } from './input/signupInput';
import { Entity, Staff} from './entity';
import { UserService } from './user.service';
import { UseGuards, createParamDecorator } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from './auth.guard';
import { Student } from './studentdet';


export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);
@Resolver(Entity)
export class UserResolver {
    constructor(private readonly userService: UserService) {}
   
    @Query(() => [Student])
   @UseGuards(JwtAuthGuard)
  async findAll() {
   // return 'helo';
    return this.userService.findAll();
  }
    @Mutation(() => [Entity])
    async signup(@Args('signupInput') signupInput:SignupInput){
      return this.userService.signup(signupInput);     
        }

    @Mutation(() => [Entity])
    // @UseGuards(AuthGuard)
  async login(@Args('email') email:string,@Args('password') password:string):Promise<any>{
          return this.userService.login(email,password);     
            }

   @Mutation(() => [Staff])
            // @UseGuards(AuthGuard)
async addstaff(@Args('staffid') staffid:string,
@Args('name') name:string,@Args('email') email:string,
@Args('designation') designation:string,
@Args('salary') salary:number):Promise<any>{
  
      return this.userService.addstaff(staffid,name,email,designation,salary);     
   }
   //add staff to school
   @Mutation(() => [Staff])
   async staffrel(@Args('staffid') staffid:string,
   @Args('name') name:string):Promise<any>{
     return this.userService.staffrel(staffid,name);
   }
   //add student to school
   @Mutation(() => [Student])
   async studrel(@Args('studentid') studentid:string,
   @Args('name') name:string):Promise<any>{
     return this.userService.studrel(studentid,name);
   }
    //@Query(() => [Entity], { name: 'get' })
    // @UseGuards(AuthGuard) 
    // whoAmI(@CurrentUser() user:SignupInput) {
    //   console.log(user);
    //   return this.userService.findOne(user.id);
    // }
}
