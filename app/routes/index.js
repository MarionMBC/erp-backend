import express from 'express';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { authMiddleware } from '../middlewares/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH_ROUTER = __dirname;

const cleanFileName = (fileName) => {
    return fileName.toLowerCase().split('.').shift();
};

const router = express.Router();

const readDirectory = async (path) => {
    try {
        const files = await fs.readdir(path);
        return files.filter((fileName) => {
            const prefixRoute = cleanFileName(fileName);
            return prefixRoute !== 'index';
        });
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
};

const importRoutes = async () => {
    const files = await readDirectory(PATH_ROUTER);
    for (const fileName of files) {
        const prefixRoute = cleanFileName(fileName);
        const routeModule = await import(`./${fileName}`);
        router.use(`/${prefixRoute}`, routeModule.router);
    }
};

importRoutes().catch((error) => {
    console.error('Error importing routes:', error);
});

export default router;
