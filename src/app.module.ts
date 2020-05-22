import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
//import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    context: ({ req })=> ({ req })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
