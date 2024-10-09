import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {
    //_id:string;
    @Prop({unique:true,required:true})
    email:string;
    @Prop({unique:true,required:true})
    username:string;
    @Prop({minlength:6})
    password:string;
    @Prop({required:true})
    name:string;
    @Prop({default:true})
    isactive:boolean;
    @Prop({type:[String],default: ['user']}) // user,admin
    roles: string[];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
