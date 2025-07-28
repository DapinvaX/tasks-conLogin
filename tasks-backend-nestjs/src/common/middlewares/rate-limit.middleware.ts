import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests = new Map<string, { count: number; resetTime: number }>();
  private readonly limit = 100; // requests per window
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  use(req: Request, res: Response, next: NextFunction) {
    const clientId = req.ip || 'unknown';
    const now = Date.now();
    
    const clientData = this.requests.get(clientId);
    
    if (!clientData || now > clientData.resetTime) {
      this.requests.set(clientId, {
        count: 1,
        resetTime: now + this.windowMs,
      });
    } else {
      clientData.count++;
      
      if (clientData.count > this.limit) {
        throw new HttpException(
          'Too many requests from this IP, please try again later.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }

    res.setHeader('X-RateLimit-Limit', this.limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, this.limit - (this.requests.get(clientId)?.count || 0)));
    res.setHeader('X-RateLimit-Reset', this.requests.get(clientId)?.resetTime || now);

    next();
  }
}
