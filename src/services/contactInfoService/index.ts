import ContactInfo from '../../db/models/contact-info.model';
import db from '../../db/all-models';
import { ICreateContactInfo } from './interfaces';


export default {
    async create(
        attrs: ICreateContactInfo
    ): Promise<ContactInfo>{
        return await db.ContactInfo.create(attrs);
    },

    async getOne(
        userId: string,
        exclude?: string[]
    ): Promise<ContactInfo> {
        return await db.ContactInfo.findOne({ where: { userId }, attributes: { exclude }});
    },

    async unlink(
        userId: string,
    ): Promise<void> {
        await db.ContactInfo.update({ userId: null }, { where: { userId }});
    }
}