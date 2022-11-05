// Initializes the `v1/mailer` service on path `/v1/mailer`
import { Service, ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Mailer } from "./mailer.class";
import hooks from "./mailer.hooks";
import { SendMailOptions } from "nodemailer";

export default function (app: Application): void {
  app.use("mailer", new Mailer(app));

  const service: Service<SendMailOptions> = app.service("mailer");

  service.hooks(hooks);
}
