
const accessKey : string = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string;

export const cookieHeaderImage : string = "image-url-random-key"


export async function randomImage() {

    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&query=desktop,background,nature,city,dark,night,HD`, {
        method: 'GET'
    });

    const res = await response.json();

    return res;
}
