
import fs from 'fs';
import path from 'path';

const accessKey : string = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string;

export const cookieHeaderImage : string = "image-url-random-key"

export const defaultBackgroundFile : string = 'bg-01.jpeg'

export interface ImageRandomRespose {
    urls: ImageUrlRespose
}

export interface ImageUrlRespose {
    full: string
}


export async function randomImageUnsplash() {

    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&query=desktop,background,nature,city,dark,night,HD`, {
        method: 'GET'
    });

    const res = await response.json();

    return res;
}

export async function randomImageAppFolder() {

    const imageRandomFolder = randomImageFromFolder('bg');

    const res : ImageRandomRespose = {
        urls: {
            full: imageRandomFolder
        }
    }

    return res;
}

function randomImageFromFolder(folder : string) {

    const folderPath = path.join(process.cwd(), 'public', folder); // Adjust the folder path as needed
    try {
      const files = fs.readdirSync(folderPath);

      const randomFile = files[Math.floor(Math.random() * files.length)];

      const fileUrl = `/${folder}/${randomFile}`; // Create a relative URL

      return fileUrl;
    } catch (error) {
      console.error('Error reading folder:', error);

      return `/${folder}/${defaultBackgroundFile}`
    }
  }
