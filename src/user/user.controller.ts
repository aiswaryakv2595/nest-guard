import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userResolver: UserResolver) {}
    @Get()
    findAll(){
        return this.userResolver.findAll();
    }
    @Post()
    login(@Body('email') email:string,@Body('password') password:string){
        return this.userResolver.login(email,password);
    }
    @Post('addstaff')
    addStaff(@Body('staffid') staffid:string,
    @Body('name') name:string,@Body('email') email:string,
    @Body('designation') designation:string,
    @Body('salary') salary:number){
        return this.userResolver.addstaff(staffid,name,email,designation,salary)
    }
    @Post('staffrel')
    staffrel(@Body('staffid') staffid:string,
    @Body('name') name:string){
        return this.userResolver.staffrel(staffid,name)
    }
    @Post('studentrel')
    studrel(@Body('studentid') studentid:string,
    @Body('name') name:string){
        return this.userResolver.studrel(studentid,name)
    }
}