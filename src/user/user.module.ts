import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';
import * as neo4j from 'neo4j-driver';
import { JwtAuthGuard } from './jwt-auth.guard';

export const UserProvider = {
  provide: 'Neo4j',
  useFactory: () => neo4j.driver('bolt://localhost',neo4j.auth.basic('neo4j','123456'))
 };
@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secrete key',
      signOptions: { expiresIn: '1d' },
    })],
  exports: ['Neo4j'],
  providers: [UserService, UserResolver,UserProvider,JwtAuthGuard]
})
export class UserModule {}
