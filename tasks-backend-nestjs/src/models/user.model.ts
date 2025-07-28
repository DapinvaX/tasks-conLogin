import { Task } from './task.model';

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  preguntaSeguridad: string;
  respuestaSeguridad: string;
  createdAt: Date;
  updatedAt: Date;
  tareas?: Task[];
}

export interface UserWithoutPassword extends Omit<User, 'password' | 'respuestaSeguridad'> {}
