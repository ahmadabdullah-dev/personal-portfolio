export interface AddBlogDto {
  image?: File | null;
  slug: string;
  title: string;
  content: string;
  tags?: string[] | null;
}
