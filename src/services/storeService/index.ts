import db from '../../db/all-models';
import Store from '../../db/models/store.model';
import { IStoreCreationAttrs } from '../../interfaces/store.interfaces';
import ApiError from '../../errors/api-error';
import { IEditStore } from './interfaces';


export default {
    async create(
        attrs: IStoreCreationAttrs
    ): Promise<Store> {
        const storeCandidate = await db.Store.findOne({ where: { userId: attrs.userId }});
        if (storeCandidate) throw ApiError.badRequest('User already has a store.');

        const store = await db.Store.create({ ...attrs });

        return store;
    },

    async edit(
        id: string,
        attrs: IEditStore
    ): Promise<Store> {
        const [, store] = await db.Store.update(
            {...attrs},
            { where: { userId: id }, returning: true }
        );
        return store[0];
    },

    async get(
        id: string
    ): Promise<Store> {
        return await db.Store.findByPk(id);
    }
}