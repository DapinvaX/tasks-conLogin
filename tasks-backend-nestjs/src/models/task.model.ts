import { User } from './user.model';

export interface Task {
  id: number;
  titulo: string;
  descripcion?: string;
  completada: boolean;
  usuarioId: number;
  createdAt: Date;
  updatedAt: Date;
  usuario?: User;
}
