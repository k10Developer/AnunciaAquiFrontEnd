import { UserType } from './../_enum/userType';
import { UserCompany } from './userCompany';

export interface User {
    id: string;
    group: UserType;
    userMasterId?: string;
    name: string;
    document: string;
    email: string;
    password: string;
    picture: string;
    isActive: boolean;
    companies: UserCompany[]

}