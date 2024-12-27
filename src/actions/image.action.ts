
import { cookies } from "next/headers";

const accessKey : string = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string;

export const cookieHeaderImage : string = "image-url-random-key"


export async function randomImage() {

    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&query=nature,city,dark  `, {
        method: 'GET'
    });

    const res = await response.json();

    return res;
}

export async function getOrRandomImage() {

    const cookieStore = await cookies();

    // Checks if has image from cookie, then return that image
    if(cookieStore.has(cookieHeaderImage)){
        const imageUrl = cookieStore.get(cookieHeaderImage);

        return imageUrl?.value;
    }

    // Otherwise, random image from unsplash and set to cookie
    const imageFecthUnsplash = await randomImage();

    cookieStore.set({
            name: cookieHeaderImage,
            value: imageFecthUnsplash.urls.full,
            path: '/',
            secure: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 // 24 hours
    });

    return imageFecthUnsplash.urls.full;
    
}