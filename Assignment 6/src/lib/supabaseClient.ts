import { createClient } from "@supabase/supabase-js";
import { string } from "yup";
const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""

const supabseanonkey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY  || ""

export const supabase = createClient(supabaseurl, supabseanonkey)