import fs from 'node:fs/promises';

const hasDirectory = async (dirPath: string) => {
    try {
        const stats = await fs.stat(dirPath);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
}