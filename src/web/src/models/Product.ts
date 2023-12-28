import { Category } from "./Category";
import { Review } from "./Review";
import { Tag } from "./Tag";

export type Product = {
  id: string;
  title: string;
  price: string;
  category?: Category | undefined;
  tags?: Tag[] | undefined;
  reviews?: Review[] | undefined;
}
