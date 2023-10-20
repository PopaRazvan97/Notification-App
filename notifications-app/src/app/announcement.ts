import { Category } from './category';
export interface Announcement {
  id: string;
  title: string;
  message: string;
  author: string;
  categoryId: string;
  imageUrl: string;
}
