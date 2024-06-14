import { readFileSync } from 'fs';
import path from 'path';

interface GetInputProps {
    fileName: string;
}

export const getInput = ({ fileName }: GetInputProps): string => {
    try {
        const content = readFileSync(path.join(__dirname, fileName), 'utf8');
        return content;
    } catch (error) {
        console.error(`Error reading file: ${fileName}`, error);
        return '';
    }
}