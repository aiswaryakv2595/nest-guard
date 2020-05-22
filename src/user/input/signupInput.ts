import { InputType,Field } from 'type-graphql';
import { Entity } from '../entity';
@InputType({ description: "New recipe data" })
export class SignupInput implements Partial<Entity> {
 
  @Field()
  name: string;

  @Field()
  email: string;
  
  @Field()
  password: string;
}