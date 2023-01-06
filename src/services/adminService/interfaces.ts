import Admin from 'src/db/models/admin.model'


export interface ICreateAdminAttrs extends Omit<Admin, 'id'> {

}