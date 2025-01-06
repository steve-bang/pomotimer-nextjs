import { cookieHeaderImage, randomImageAppFolder } from "@/actions/image.action";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  // Check if the image cookie exists
  const imageUrl = cookieStore.get(cookieHeaderImage)?.value;

  if (imageUrl) {
    // Return the image URL from the cookie
    return NextResponse.json({ imageUrl });
  }

  // Otherwise, random image from unsplash and set to cookie
  const imageFecthUnsplash = await randomImageAppFolder();

  cookieStore.set(cookieHeaderImage, imageFecthUnsplash.urls.full, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return NextResponse.json(
    { imageUrl: imageFecthUnsplash.urls.full },
    {
      status: 200,
      headers: {
        "Set-Cookie": `${cookieHeaderImage}=${imageFecthUnsplash.urls.full};Path=/; HttpOnly;MaxAge=60`,
      },
    }
  );
}
