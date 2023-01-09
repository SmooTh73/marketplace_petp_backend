import { WebSocket } from 'ws';

export interface ISocket {
    socket: WebSocket;
}

export interface IConnectRoom extends ISocket {
    name: string;
    roomId: string;
}

export interface ICreaterRoom extends ISocket {
    name: string;
}

export interface ISendMessage extends ISocket {
    text: string;
}

export interface IAuthModerator extends ISocket {
    accessToken: string;
}