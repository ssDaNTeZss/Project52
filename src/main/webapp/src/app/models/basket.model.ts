import {Items} from "./items.model";

// export class Basket {
//   public id: number;
//   public totalPrice: number;
//   public userId: number;
//   public items: [Items];
// }


export interface Basket {
  id: number;
  totalPrice: number;
  userId: number;
  items: [Items];
}
