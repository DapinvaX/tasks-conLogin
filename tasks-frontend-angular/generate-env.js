const { writeFileSync } = require('fs');
const { config } = require('dotenv');

// Cargar variables de entorno
config();

// Crear el archivo de configuración con las variables del .env
const envConfig = `
export const environment = {
  production: false,
  apiUrl: '${process.env.API_URL_LOCAL || 'http://localhost:4000/tareas'}',
  apiUrlProduction: '${process.env.API_URL || 'https://tasks-backend-nestjs-dapinvax.fly.dev/tareas'}',
  currentEnvironment: '${process.env.APP_ENVIRONMENT || 'development'}'
};
`;

// Escribir el archivo
writeFileSync('./src/environments/environment.ts', envConfig);

console.log('Environment file generated successfully from .env');
