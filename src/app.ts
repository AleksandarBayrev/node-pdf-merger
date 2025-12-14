import PDFMerger from 'pdf-merger-js';
import path from 'node:path';
import fs from 'node:fs/promises';
import process from 'node:process';
import { buildFileName } from './buildFileName';

var merger = new PDFMerger();

const hasDirectory = async (dirPath: string) => {
    try {
        const stats = await fs.stat(dirPath);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
}

(async () => {
    try {
        const directoryPath = process.argv[2];
        if (!directoryPath) {
            throw new Error("Please provide a directory path as an argument.");
        }

        const parsedPath = path.resolve(directoryPath);

        if (!await hasDirectory(parsedPath)) {
            throw new Error(`The provided path is not a valid directory: ${parsedPath}`);
        }     

        console.log(`Merging PDFs from directory: ${parsedPath}`);

        const files = (await fs.readdir(parsedPath)).filter(file => file.endsWith('.pdf'));
        console.log(files);

        for (const file of files) {
            const filePath = path.join(parsedPath, file);
            console.log(`Adding file: ${filePath}`);
            await merger.add(filePath);
        }

        const mergedPdfBuffer = await merger.saveAsBuffer();
        const fileName = buildFileName();
        await fs.writeFile(fileName, mergedPdfBuffer);
        console.log(`Merged PDF saved as '${fileName}'`);
    }
    catch (error: any) {
        if (error instanceof Error) {
            console.log("An error occurred:", error.message);
        }

        if (typeof error === 'string') {
            console.log("An error occurred:", error);
        }

        process.exit(1);
    }
})();