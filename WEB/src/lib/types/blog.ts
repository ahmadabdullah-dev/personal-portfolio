export interface AddBlogDto {
  image?: File | null;
  slug: string;
  title: string;
  content: string;
  tags?: string[] | null;
}
export interface BlogDto {
  id: string;
  imageUrl?: string | null;
  slug: string;
  title: string;
  content: string;
  tags?: string[] | null;
  createdAt: string;
}
export interface UpdateBlogDto {
  id: string;
  image?: File;
  slug?: string;
  title?: string;
  content?: string;
  tags?: string[];
}