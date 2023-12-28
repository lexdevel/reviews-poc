import { User } from "oidc-client-ts";
import { Product } from "./Product";

export type Review = {
  id: string;
  commentary: string;
  author?: User | undefined;
  product?: Product | undefined;
}
