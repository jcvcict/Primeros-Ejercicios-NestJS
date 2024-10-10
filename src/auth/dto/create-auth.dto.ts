/*Los parametros que puedan o no venir ?: */

import { IsEmail, IsNotEmpty, minLength } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({message: 'Debe introducir el correo electronico, el campo no puede estar vacío'})
    @IsEmail()
    email: string;
    @IsNotEmpty({message: 'Debe introducir el nombre, el campo no puede estar vacío'})
    name:string;

    @IsNotEmpty({message: 'Debe introducir la contraseña,  el campo no puede estar vacío'})
    password:string; 
    @IsNotEmpty({message: 'Debe introducir el nombre de usuario, el campo no puede estar vacío'})
    username:string;

}
