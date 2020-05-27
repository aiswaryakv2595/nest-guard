import { Injectable, Inject } from '@nestjs/common';
import { SignupInput } from './input/signupInput';
import * as v1 from 'neo4j-driver';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './input/JwtPayload';
import { Entity } from './entity';

@Injectable()
export class UserService {
    constructor(@Inject('Neo4j') private readonly neo4j: v1.Driver,
    private readonly jwtService: JwtService
    ) {}
    
      //--------------------------------------
      async findOne(id:string){
        let data=[];
         return this.neo4j.session().run(`MATCH(n:student) WHERE id(n)=${id} RETURN n`)
        .then(result => {
       
          result.records.map(value => {
            const node = value.get(0);
            data.push({
              name:node.properties.name,
              email:node.properties.email,
              password:node.properties.password
            });
          });
            console.log(data);
            return data;
          })
        
          }
      
      //--------------------------------------  
    async login(email:string,password:string):Promise<any>{
        let data=[];
        let flag=0;
        
        const session = this.neo4j.session();
       return session.run(`MATCH (n:school) WHERE n.email={email} AND n.password={password}
        RETURN n`,{email:email,password:password})
       .then(result => {
        session.close();
        result.records.map(value => {
          const node = value.get(0);
          data.push({
            email:node.properties.email,
            password:node.properties.password
        
          });
          
          if(email==node.properties.email&&password==node.properties.password)
          flag=1;
        });
        
        // //driver.close();
        if(flag==1){
          
          const _user: JwtPayload = { username:"email",password: "password" };
          this.GenerateToken(_user);
          
         }

        return data;
          })
    }
    async signup(signupInput:SignupInput):Promise<any>{
      
        let data=[];
        let flag=1;
        const session = this.neo4j.session();
        
return session.run(`MERGE(p:school {name:{nameParam},email:{emailParam},password:{passParam}})
RETURN p`,{nameParam:signupInput.name,emailParam:signupInput.email, passParam:signupInput.password})
.then(result => {
  console.log(signupInput.email);
	session.close();
	result.records.map(value => {
    const node = value.get(0);
  
    if(signupInput.email==node.properties.email){
      flag=0;
          }
	  data.push({
		name:node.properties.name,
		email:node.properties.email,
		password:node.properties.password
	
    }); 
  });
  if(flag==0){
    console.log('invalid');
    return data;
  }
else{
  console.log(data);
        return data;
}
  //driver.close();

	  })
	  .catch(function(err){
        console.log(err);
    });
       }
       //update school
async updateschool(id:string,name:string,email:string,password:string){
  let data=[];
  if(name){
    const session=this.neo4j.session();
  session.run(`MATCH(p:school) WHERE id(p)=${id} 
  SET p.name={nameParam}  RETURN p`,{nameParam:name})
  
  .then(result => {
    session.close();
    result.records.map(value => {
      const node = value.get(0);
    
      data.push({
      name:node.properties.name
      });
          });
    console.log(data);
return data;
  })
}
if(email){
  const session=this.neo4j.session();
 session.run(`MATCH(p:school) WHERE id(p)=${id} 
SET p.email={emailParam}  RETURN p`,{emailParam:email})

 .then(result => {
   session.close();
   result.records.map(value => {
    const node = value.get(0);
  
    data.push({
    email:node.properties.email
    }); 
  });
  console.log(data);
 return data;
 })
 
}
//-----
if(password){
  const session=this.neo4j.session();
session.run(`MATCH(p:school) WHERE id(p)=${id} 
SET p.password={passParam} RETURN p`,{passParam:password})

.then(result => {
  session.close();
  result.records.map(value => {
    const node = value.get(0);
  
    data.push({
    password:node.properties.password
    }); 
    
  });
  console.log(data);
  return data;
})
}

}
//delete school
async deleteschool(id:string){
  const session=this.neo4j.session();
  return session.run(`MATCH(p:school) WHERE id(p)=${id} DELETE p`);
  
}

//--add staff
async addstaff(staffid:string,name:string,email:string,designation:string,salary:number){
  let data=[];
  const session = this.neo4j.session();

  return session.run(`MERGE(p:staff {staffid:{sid},name:{nameParam},email:{emailParam},designation:{desParam},salary:{salary},status:"0"})
RETURN p`,{sid:staffid,nameParam:name,emailParam:email, desParam:designation,salary:salary})
.then(result => {
 
	session.close();
	result.records.map(value => {
    const node = value.get(0);
    data.push({
      staffid:node.properties.staffid,
      name:node.properties.name,
      email:node.properties.email,
      designation:node.properties.designation,
      salary:node.properties.salary
    
      }); 
    });
    console.log(data);
    return data;
  })
  .catch(function(err){
      console.log(err);
  });
}       

//add relationship
async staffrel(staffid:string,name:string){
  let data=[];
  const session = this.neo4j.session();
  return session.run(`MATCH(n:school),(s:staff{name:{nameParam}}) WHERE s.staffid={sid}
  MERGE (s)-[r:WORKING]-(n) ON MATCH SET s.status="1" RETURN s`,{nameParam:name,sid:staffid})
  .then(result => {
 
    session.close();
    result.records.map(value => {
      const node = value.get(0);
      data.push({
        staffid:node.properties.staffid,
        name:node.properties.name
        }); 
      });
      console.log(data);
      return data;
    })
    .catch(function(err){
        console.log(err);
    });
  }       

   //add students relationship
   async studrel(studentid:string,name:string){
     let data=[];
     const session = this.neo4j.session();
    return session.run(`MATCH(n:school),(s:student{name:{nameParam}})
     WHERE s.studentid={sid} MERGE (s)-[r:STUDYING]-(n) 
     ON MATCH SET s.status=1 RETURN s`,{nameParam:name,sid:studentid})

  .then(result => {
 
    session.close();
    result.records.map(value => {
      const node = value.get(0);
      data.push({
        studentid:node.properties.studentid,
        name:node.properties.name
        
        }); 
      });
      console.log(data);
      return data;
    })
    .catch(function(err){
        console.log(err);
    });
   }

//view student details  
async findAll(){
  let data=[];
   return this.neo4j.session().run(`MATCH(n:student) WHERE n.status=1 RETURN n`)
  .then(result => {
 
    //session.close();
    result.records.map(value => {
      const node = value.get(0);
      data.push({

      name:node.properties.name,
        email:node.properties.email,
        password:node.properties.password,
        schoolname:node.properties.schoolname
        
      });
    });
      console.log(data);
      return data;
    })
  
    }

   
//--------------------------------------
GenerateToken(payload: any) {
 console.log(this.jwtService.sign(payload));
  return this.jwtService.sign(payload);
}

ValidateToken(token: string) {
  
  try {
    this.jwtService.verify(token);
    console.log(this.jwtService.verify(token));
    return true;
  } catch (error) {
    return error.name;
  }
}
 
}
