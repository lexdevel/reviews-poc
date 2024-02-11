import { Review } from './Review';

export type User = {
  id: string;
  username: string;
  fullname: string;
  reviews?: Review[] | undefined;
}
