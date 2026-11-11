// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// REPLACE THESE WITH YOUR ACTUAL KEYS FROM SUPABASE
const supabaseUrl = 'https://hyorqhxykduacanwaffr.supabase.co';
const supabaseKey = 'sb_publishable_XT-yz1LoQQdTfZTeKx6Ovw_juW2KbAq';

export const supabase = createClient(supabaseUrl, supabaseKey);