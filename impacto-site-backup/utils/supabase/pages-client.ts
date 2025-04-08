import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type GetServerSidePropsContext, type NextApiRequest, type NextApiResponse } from 'next'

// Pages Router version of the Supabase createClient
export function createPagesServerClient(
  context: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse }
) {
  const { req, res } = context

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookies(req)
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            setCookie(res, name, value, options)
          })
        },
      },
    }
  )
}

// Helper to parse cookies from the request
function parseCookies(req: NextApiRequest | GetServerSidePropsContext['req']) {
  // Get the cookies from the request
  const cookies = req.headers.cookie ?? ''
  
  // Parse the cookies into an array of { name, value } objects
  return cookies.split(';').reduce((acc: { name: string; value: string }[], cookie) => {
    const [name, ...rest] = cookie.trim().split('=')
    if (name) acc.push({ name, value: rest.join('=') })
    return acc
  }, [])
}

// Helper to set a cookie in the response
function setCookie(
  res: NextApiResponse | GetServerSidePropsContext['res'],
  name: string,
  value: string,
  options?: CookieOptions
) {
  const cookieStr = serializeCookie(name, value, options)
  
  // Get the current Set-Cookie header
  const currentCookies = res.getHeader('Set-Cookie') || []
  const cookies = Array.isArray(currentCookies) 
    ? [...currentCookies, cookieStr]
    : [currentCookies.toString(), cookieStr]
  
  // Set the updated cookies
  res.setHeader('Set-Cookie', cookies)
}

// Helper to serialize a cookie
function serializeCookie(
  name: string,
  value: string,
  options?: CookieOptions
): string {
  const str = `${name}=${value}`
  
  if (!options) return str
  
  const parts: string[] = [str]
  
  if (options.domain) {
    parts.push(`Domain=${options.domain}`)
  }
  
  if (options.path) {
    parts.push(`Path=${options.path}`)
  }
  
  if (options.maxAge) {
    parts.push(`Max-Age=${options.maxAge}`)
  }
  
  if (options.expires) {
    parts.push(`Expires=${options.expires.toUTCString()}`)
  }
  
  if (options.httpOnly) {
    parts.push('HttpOnly')
  }
  
  if (options.secure) {
    parts.push('Secure')
  }
  
  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`)
  }
  
  return parts.join('; ')
} 