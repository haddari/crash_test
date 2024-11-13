import { IsEmail, IsString } from 'class-validator';


export class CreateUserDto {
    @IsEmail()
    email: string
    name:string
    password: string
}
