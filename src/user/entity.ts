import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Entity {
  @Field({nullable:true})
  id: string;
  @Field({nullable:true})
  name: string;

  @Field({nullable:true})
  email: string;
  
  @Field({nullable:true})
  password: string;
}
@ObjectType()
export class Staff {
  @Field({nullable:true})
  staffid: string;
  @Field({nullable:true})
  name: string;

  @Field({nullable:true})
  email: string;
  
  @Field({nullable:true})
  designation: string;

  @Field({nullable:true})
  salary: number;
}

