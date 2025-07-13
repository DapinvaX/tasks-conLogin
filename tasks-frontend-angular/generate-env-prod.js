const { writeFileSync } = require('fs');
const { config } = require('dotenv');

// Cargar variables de entorno
config();

// Crear el archivo de configuración para producción
const envConfigProd = `
export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL || 'https://tasks-backend-nestjs-dapinvax.fly.dev/tareas'}',
  apiUrlProduction: '${process.env.API_URL || 'https://tasks-backend-nestjs-dapinvax.fly.dev/tareas'}',
  currentEnvironment: 'production'
};
`;

// Escribir el archivo
writeFileSync('./src/environments/environment.prod.ts', envConfigProd);

console.log('Production environment file generated successfully from .env');
