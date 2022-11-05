import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { createTransport, Transporter, SendMailOptions } from "nodemailer";

export class Mailer implements Partial<ServiceMethods<SendMailOptions>> {
  private transporter: Transporter;

  constructor(app: Application) {
    this.transporter = createTransport(app.get("mailer"));
  }

  async create(data: Partial<SendMailOptions>): Promise<any> {
    return await this.transporter.sendMail(data);
  }
}
