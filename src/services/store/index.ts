import db from '../../db/all-models';
import Store from '../../db/models/store.model';
import { IBaseStore, IStoreCreationAttrs } from '../../interfaces/store.interfaces';
import ApiError from '../../errors/api-error';


export default {
    async create(
        attrs: IStoreCreationAttrs
    ): Promise<Store> {
        const storeCandidate = await db.Store.findOne({ where: { userId: attrs.userId }});
        if (storeCandidate) throw ApiError.badRequest('User already has a store.');

        const store = await db.Store.create({ ...attrs });

        return store;
    }
}