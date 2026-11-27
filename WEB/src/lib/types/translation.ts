export interface AddTranslationDto {
  image?: File | null;
  language: string;
  languageCode?: string | null;
  sourceLanguage: string;
  slug?: string | null;
  tagline?: string | null;
  description?: string | null;
  pricePerWord?: number | null;
  currency?: string | null;
  priceNote?: string | null;
  isPublished?: boolean; 
  isFeatured?: boolean; 
  displayOrder?: number;
}

export interface TranslationDto {
  id?: string | null;
  language?: string | null;
  languageCode?: string | null;
  sourceLanguage: string;
  slug?: string | null;
  tagline?: string | null;
  description?: string | null;
  pricePerWord?: number | null;
  currency?: string | null;
  priceNote?: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  displayOrder: number;
  imageUrl?: string | null;
}

export interface UpdateTranslationDto {
  id: string;
  image?: File | null;
  language?: string | null;
  languageCode?: string | null;
  sourceLanguage?: string | null;
  slug?: string | null;
  tagline?: string | null;
  description?: string | null;
  pricePerWord?: number | null;
  currency?: string | null;
  priceNote?: string | null;
  isPublished: boolean;
  isFeatured?: boolean | null;
  displayOrder?: number | null;
}
