import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SignupInput } from './input/signupInput';
import { Entity, Staff} from './entity';
import { UserService } from './user.service';
import { Student } from './studentdet';



@Resolver(Entity)
export class UserResolver {
    constructor(private readonly userService: UserService) {}
   
    @Query(() => [Student])
  async findAll() {
    return this.userService.findAll();
  }
    @Mutation(() => [Entity])
    async signup(@Args('signupInput') signupInput:SignupInput){
      return this.userService.signup(signupInput);     
        }

    @Mutation(() => [Entity])
    
  async login(@Args('email') email:string,@Args('password') password:string):Promise<any>{
          return this.userService.login(email,password);     
            }
//update school
    @Mutation(() => [Entity])
    async updateschool(@Args('id') id:string,
    @Args('name') name:string,
    @Args('email') email:string,
    @Args('password') password:string){
      return this.userService.updateschool(id,name,email,password);     
        }  
  //delete school
  @Mutation(() => [Entity])   
  async deleteschool(@Args('id') id:string){
    return this.userService.deleteschool(id);
  } 
   //delete student
   @Mutation(() => [Staff])   
   async deletestaff(@Args('id') id:string){
     return this.userService.deletestaff(id);
   }   

   @Mutation(() => [Staff])
  
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
   
}
