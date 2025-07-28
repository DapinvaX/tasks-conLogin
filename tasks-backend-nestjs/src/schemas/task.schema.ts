import { IsString, IsNotEmpty, IsBoolean, IsOptional, MaxLength } from 'class-validator';

export class CreateTaskSchema {
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título es requerido' })
  @MaxLength(100, { message: 'El título no puede tener más de 100 caracteres' })
  titulo: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(500, { message: 'La descripción no puede tener más de 500 caracteres' })
  descripcion?: string;

  @IsBoolean({ message: 'El estado de completada debe ser un valor booleano' })
  @IsOptional()
  completada?: boolean;
}

export class UpdateTaskSchema {
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(100, { message: 'El título no puede tener más de 100 caracteres' })
  titulo?: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(500, { message: 'La descripción no puede tener más de 500 caracteres' })
  descripcion?: string;

  @IsBoolean({ message: 'El estado de completada debe ser un valor booleano' })
  @IsOptional()
  completada?: boolean;
}
