import {  IsNotEmpty } from "class-validator"; 
export class LoginDto {
   
    @IsNotEmpty({message: 'Debe introducir le usuario o el correo electronico, el campo no puede estar vacío'})
    usernameocorreo:string;
    @IsNotEmpty({message: 'Debe introducir la contraseña, el campo no puede estar vacío'})
    password:string; 
   

}