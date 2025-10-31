import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate URL format - must start with http:// or https://
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

// Validate and create Supabase client
let supabase: SupabaseClient

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables!\n\n' +
    'Please update .env.local file with:\n' +
    'NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co\n' +
    'NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\n\n' +
    'Get these from: Supabase Dashboard > Project Settings > API'
  )
}

if (!isValidUrl(supabaseUrl)) {
  throw new Error(
    'Invalid NEXT_PUBLIC_SUPABASE_URL!\n\n' +
    `Current value: ${supabaseUrl}\n\n` +
    '❌ The URL must start with https:// (e.g., https://xxxxx.supabase.co)\n' +
    '⚠️  You may have mistakenly put the API key in the URL field.\n\n' +
    'Correct format:\n' +
    'NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co\n' +
    'NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi... (JWT token)\n\n' +
    'Get the correct URL from: Supabase Dashboard > Project Settings > API > Project URL'
  )
}

supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }

export type Recipe = {
  id: string
  title: string
  ingredients: string
  tags: string[] | null
  image_url: string | null
  created_at: string
  updated_at: string
}

