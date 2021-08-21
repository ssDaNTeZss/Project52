import {Items} from "./items.model";

export interface Basket {
  id: number;
  totalPrice: number;
  userId: number;
  items: [Items];
}
