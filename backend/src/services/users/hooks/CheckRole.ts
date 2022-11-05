import { HookContext } from '@feathersjs/feathers';
import { User } from '../@types/User';
import { USER , BUYER, SELLER, } from '../../../constants/Roles';
import { BadRequest } from '@feathersjs/errors';

const CheckRole = () => (context: HookContext) => {
    const data = context.data as User;
    const { role } = data;
    if (![USER , BUYER , SELLER].includes(role)) {
        throw new BadRequest('Either you are not authorized or the role is not valid');
    }
};

export default CheckRole;
