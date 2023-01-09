export function findRoom(rooms, socketId) {
    for (let r = 0; r < rooms.length; r++) {
        if (rooms[r].moderator.id === socketId) {
            return { roomIndex: r, role: 'customer' }
        }
        if (rooms[r].customer.id === socketId) {
            return { roomIndex: r, role: 'moderator' }
        }
    }
    return { roomIndex: null, role: null };
}