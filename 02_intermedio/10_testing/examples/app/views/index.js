import path from 'path';
import { fileURLToPath } from 'url';

export const viewsDirname = path.dirname(fileURLToPath(import.meta.url));
