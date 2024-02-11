import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mlfkhfnwhhuyxbmtxcsy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZmtoZm53aGh1eXhibXR4Y3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2NzYzNjEsImV4cCI6MjAyMzI1MjM2MX0.j4TCOaC3Koxs-zab0vrg1s8suHRGAF1bxoO1S_7DefI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
