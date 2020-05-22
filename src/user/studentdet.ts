import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Student {
  @Field({nullable:true})
  studentid: string;
  @Field({nullable:true})
  name: string;

  @Field({nullable:true})
  email: string;
  
  @Field({nullable:true})
  password: string;

  @Field({nullable:true})
  schoolname: string;

}