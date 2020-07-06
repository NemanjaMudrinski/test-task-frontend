import { User } from './user';

export class Account implements Entity<Account> {
    id:number;
    type: string;
    user: User;
}