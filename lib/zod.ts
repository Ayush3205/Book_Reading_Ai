import { z } from 'zod';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_IMAGE_SIZE } from '@/lib/constants';

export const UploadSchema = z.object({
    pdfFile: z
        .instanceof(File, { message: 'Please upload a PDF file.' })
        .refine((f) => ACCEPTED_PDF_TYPES.includes(f.type), 'File must be a PDF.')
        .refine((f) => f.size <= MAX_FILE_SIZE, 'PDF must be under 50MB.'),
    coverImage: z
        .instanceof(File)
        .refine((f) => ACCEPTED_IMAGE_TYPES.includes(f.type), 'Must be a JPEG, PNG, or WebP image.')
        .refine((f) => f.size <= MAX_IMAGE_SIZE, 'Image must be under 10MB.')
        .optional(),
    title: z.string().min(1, 'Title is required.'),
    author: z.string().min(1, 'Author name is required.'),
    persona: z.string().min(1, 'Please select a voice.'),
});
