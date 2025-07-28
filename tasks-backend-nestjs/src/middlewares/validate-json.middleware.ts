import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateJsonMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      if (req.headers['content-type']?.includes('application/json')) {
        try {
          if (req.body && typeof req.body === 'string') {
            req.body = JSON.parse(req.body);
          }
        } catch (error) {
          throw new BadRequestException('JSON inválido en el cuerpo de la petición');
        }
      }
    }
    next();
  }
}
