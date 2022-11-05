import { Application } from '../declarations';
import users from './users/users.service';
import products from './products/products.service';
import cart from './cart/cart.service';
import category from './category/category.service';
import mailer from './mailer/mailer.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(products);
  app.configure(cart);
  app.configure(category);
  app.configure(mailer);
}
