import { Product } from './Product';
import { User } from'./User';

export type Review = {
  id: string;
  commentary: string;
  author?: User | undefined;
  product?: Product | undefined;
}
