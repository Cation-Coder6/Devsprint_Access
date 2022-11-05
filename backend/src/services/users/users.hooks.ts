import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import FRequired from "../../hooks/FRequired";
import Permit from "../../hooks/Permit";
import SetCreatedByQuery from "../../hooks/SetCreatedByQuery";
import SetDefaultItem from "../../hooks/SetDefaultItem";
import hasAccessToken from "../../utils/hasAccessToken";   
import {iff , isProvider, isNot , disallow} from "feathers-hooks-common"
import {ADMIN, BUYER , SELLER} from "../../constants/Roles"
import GetUserInfo from './hooks/GetUserInfo';  
import CheckRole from "./hooks/CheckRole"
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [
      iff(
        hasAccessToken(),
        authenticate("jwt"),
        iff(isNot(Permit.is(ADMIN)), GetUserInfo())
      ).else(iff(isProvider("external"), disallow())),
    ],
    get: [
      iff(
        hasAccessToken(),
        authenticate("jwt"),
        iff(isNot(Permit.is(ADMIN)), GetUserInfo())
      ),
    ],
    create: [
      iff(
        hasAccessToken(),
        authenticate("jwt"),
        iff(
          Permit.is(ADMIN),
          SetDefaultItem("role", BUYER),
          FRequired(["name" , "email" , "password" , "rollNumber" , "hostel"])
        )
      ).else(CheckRole(), FRequired(["firstname", "email", "password"])),
      hashPassword("password"),
    ],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [protect("password")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
