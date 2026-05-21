import { z } from 'zod';

export const feedbackSchema = z.object({
  enjoyment: z.coerce.number().min(1).max(5),
  pace: z.enum(['too-slow', 'just-right', 'too-fast']),
  wouldRecommend: z.enum(['yes', 'maybe', 'no']),
  comment: z.string().max(500).optional(),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
