export interface DatabaseConfig {
  url: string;
  type: 'mysql' | 'postgresql' | 'sqlite';
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface AppConfig {
  port: number;
  environment: string;
  database: DatabaseConfig;
  jwt: JwtConfig;
}

export const appConfig = (): AppConfig => ({
  port: parseInt(process.env.PORT || '3000', 10),
  environment: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || '',
    type: (process.env.DATABASE_TYPE as any) || 'mysql',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
});
