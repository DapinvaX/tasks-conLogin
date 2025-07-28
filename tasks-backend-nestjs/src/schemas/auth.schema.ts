import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class RegisterSchema {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  @MaxLength(20, { message: 'El nombre de usuario no puede tener más de 20 caracteres' })
  username: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString({ message: 'La pregunta de seguridad debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La pregunta de seguridad es requerida' })
  preguntaSeguridad: string;

  @IsString({ message: 'La respuesta de seguridad debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La respuesta de seguridad es requerida' })
  respuestaSeguridad: string;
}
