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


export interface IConfig {
    app: IApp;
    database: IDataBase;
}