import { z } from 'zod';

// Unified lead schema shared by server and type generator
export const leadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(40).optional().or(z.literal('')),
  role: z.string().max(120).optional().or(z.literal('')),
  interest: z.string().max(200).optional().or(z.literal('')),
  budget: z.string().max(120).optional().or(z.literal('')),
  timeline: z.string().max(120).optional().or(z.literal('')),
  subject: z.string().max(200).optional().or(z.literal('')),
  message: z.string().min(1).max(5000),
  consent: z.boolean().optional(),
  utm_source: z.string().max(120).optional(),
  utm_medium: z.string().max(120).optional(),
  utm_campaign: z.string().max(120).optional(),
  utm_content: z.string().max(120).optional(),
  utm_term: z.string().max(120).optional(),
  referrer: z.string().max(500).optional(),
  website: z.string().optional() // honeypot
});
