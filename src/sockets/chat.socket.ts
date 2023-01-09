import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { v4 } from 'uuid';
import { IAuthModerator, IConnectRoom, ICreaterRoom, ISendMessage, ISocket } from './interfaces';
import { findRoom } from './utils';
import verifyToken from '../helpers/tokenHelpers/verify-token';
import ApiError from '../errors/api-error';


export default (server: Server) => {
    const rooms = [];
    const activeModerators = [];

    const events = {
        authModerator: function (data: IAuthModerator) {
            try {
                const verifiedData = verifyToken(data.accessToken, 'admin_access_secret');
                if (!verifiedData) throw ApiError.unauthorized();
                const candidateIndex = activeModerators.findIndex((moderator) => {
                    return moderator.id === verifiedData.id
                });
                if (candidateIndex === -1) {
                    activeModerators.push({ socket: data.socket, ...verifiedData });
                } else {
                    activeModerators[candidateIndex] = { socket: data.socket, ...verifiedData };
                }
            } catch (err) {
                data.socket.close(3000, err.message);
            }
        },
        connectRoom: function (data: IConnectRoom) {
            try {
                if (activeModerators.findIndex((moderator) => moderator.socket.id === data.socket.id) === -1) {
                    throw ApiError.unauthorized();
                }
    
                const roomIndex = rooms.findIndex((element) => element.id === data.roomId);
                rooms[roomIndex].moderator.id = data.socket.id;
                rooms[roomIndex].moderator.name = data.name;
                wss.clients.forEach((client) => {
                    if (client.id === rooms[roomIndex].customer.id) {
                        client.send(JSON.stringify({
                            event: 'chatMessage',
                            message: `${rooms[roomIndex].moderator.name} joined the chat`
                        }));
                    }
                });
            } catch (err) {
                data.socket.close(3000);
            }
        },
        createRoom: function (data: ICreaterRoom) {
            rooms.push({ 
                id: v4(),
                customer: { id: data.socket.id, name: data.name },
                moderator: { id: null, name: null }
            });

            for (let m = 0; m < activeModerators.length; m++) {
                activeModerators[m].socket.send(
                    JSON.stringify({event: 'updateRooms', message: rooms })
                );
                if (activeModerators[m].socket._closeFrameReceived) activeModerators.splice(m, 1);
            }
        },
        sendMessage: function (data: ISendMessage) {
            const { roomIndex, role } = findRoom(rooms, data.socket.id);

            wss.clients.forEach((client) => {
                if (client.id === rooms[roomIndex][role].id) {
                    client.send(
                        JSON.stringify({
                            event: 'chatMessage',
                            message: data.text
                        })
                        );
                }
            });
        },
        endRoom: function (data: ISocket) {
            const { roomIndex } = findRoom(rooms, data.socket.id);
            wss.clients.forEach((client) => {
                if (client.id === rooms[roomIndex]['customer'].id 
                    || client.id === rooms[roomIndex]['moderator'].id) {
                        client.send(JSON.stringify({
                            event: 'chatMessage',
                            message: `Chat ended`
                        }));
                    }
            });
            rooms.splice(roomIndex, 1);
        }
    }

    const wss = new WebSocketServer({ server });

    wss.on('connection', (socket) => {
        socket.id = v4();

        socket.on('message', (rawMessage) => {
            const data = JSON.parse(rawMessage.toString());
            events[data.event]({ socket, ...data });
        });

        socket.on('close', () => {
            console.log('closed')
        });
    })
}