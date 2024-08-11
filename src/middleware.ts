import { NextRequest, NextResponse } from "next/server"
import { isValidPassword } from "./lib/isValidPassword"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

   // Verificare pentru ruta "/webhooks/adhd"
   if (req.nextUrl.pathname.startsWith("/webhooks/adhd")) {
    
    const res = NextResponse.next();

      NextResponse.next().headers.set('Access-Control-Allow-Origin', '*');
      NextResponse.next().headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      NextResponse.next().headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    return NextResponse.next();  
  }

  if ((await isAuthenticated(req)) === false) {

    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    })
  }
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization")

  if (authHeader == null) return false

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":")

  
  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.HASHED_ADMIN_PASSWORD as string


    ))
  )
}

// Funcție pentru validarea token-ului (poate fi ajustată în funcție de implementarea ta)
 function isValidToken(token: string): boolean {
  // Adaugă logica ta pentru validarea token-ului aici
  // De exemplu, verifică dacă token-ul este valid și nu a expirat
  return token === process.env.VALID_TOKEN; // Exemplar, ajustează după necesități
}

export const config = {
  matcher: ["/admin/:path*", "/webhooks/adhd", "/logout"],
}