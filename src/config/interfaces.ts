interface IApp {
    PORT: number | string;
}

interface IDataBase {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
}

interface IJwt {
    user_access_secret: string;
    user_refresh_secret: string;
    user_access_expiresIn: string;
    user_refresh_exriresIn: string;
    admin_access_secret: string;
    admin_refresh_secret: string;
    admin_access_expiresIn: string;
    admin_refresh_exriresIn: string;
}


export interface IConfig {
    mode: string;
    app: IApp;
    database: IDataBase;
    jwt: IJwt;
}