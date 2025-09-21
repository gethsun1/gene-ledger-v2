import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// JWT payload interface
interface JWTPayload {
  address: string;
  chainId: number;
  iat: number;
  exp: number;
}

// Environment variables
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'gene-ledger-secret-key-change-in-production'
);

const COOKIE_NAME = 'gene-ledger-session';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 1 week
};

// Create a JWT token for authenticated user
export async function createSession(address: string, chainId: number): Promise<string> {
  const payload: JWTPayload = {
    address: address.toLowerCase(),
    chainId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + COOKIE_OPTIONS.maxAge,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  return token;
}

// Verify and decode JWT token
export async function verifySession(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

// Get current session from cookies (server-side only)
export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  return verifySession(token);
}

// Set session cookie (server-side only)
export async function setSessionCookie(address: string, chainId: number): Promise<void> {
  const token = await createSession(address, chainId);
  const cookieStore = cookies();
  
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);
}

// Clear session cookie (server-side only)
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}


