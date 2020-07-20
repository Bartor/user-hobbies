import { createServer, Response } from "miragejs";
import User from "../../core/types/User.interface";
import Hobby from "../../core/types/Hobby.interface";
import { PassionLevel } from "../../core/types/PassionLevel.enum";

/**
 * This is a mocked HTTP server using Mirage.js; it intercepts
 * http request in the app and matches them with endpoints defined
 * in this file. Has a simple in-memory storage.
 */

// sample data
const users: (User & { hobbies: Hobby[] })[] = [
    {
        id: '0', name: 'John Smith', hobbies: [
            { id: '0', since: new Date().toISOString(), name: 'Hiking', level: PassionLevel.HIGH },
            { id: '1', since: new Date().toISOString(), name: 'Collecting stamps', level: PassionLevel.LOW }
        ]
    },
    {
        id: '1', name: 'Anna Walzberg', hobbies: [
            { id: '2', since: new Date().toISOString(), name: 'Trains, locomotives', level: PassionLevel.VERY_HIGH },
            { id: '3', since: new Date().toISOString(), name: 'Gardening', level: PassionLevel.LOW },
            { id: '4', since: new Date().toISOString(), name: 'Programming', level: PassionLevel.VERY_HIGH }
        ]
    },
    {
        id: '2', name: 'Wolfgang Amadeus', hobbies: [
            { id: '5', since: new Date().toISOString(), name: 'Classical music', level: PassionLevel.MEDIUM }
        ]
    }
];

let userId = users.length;
let hobbyId = users.reduce((acc, u) => acc + u.hobbies.length, 0);
export default function() {
    createServer({
        routes() {
            this.namespace = 'api';
            this.get('/users', () => users.map(user => ({ id: user.id, name: user.name })));
            this.get('/users/:id', (schema, request) =>
                users.find(user => user.id === request.params.id) ||
                new Response(404, {}, { error: `User ${request.params.id} doesn't exist` }));
            this.post('/users', (schema, request) => {
                const username = request.requestBody;
                if (users.find(user => user.name === username)) {
                    return new Response(409, {}, { error: `User ${username} already exists` });
                } else {
                    users.push({
                        name: username,
                        id: (userId++).toString(),
                        hobbies: []
                    });
                    return new Response(200);
                }
            });
            this.post('/users/:id', (schema, request) => {
                const user = users.find(user => user.id === request.params.id);
                if (user) {
                    const hobby = JSON.parse(request.requestBody);
                    user.hobbies.push({ ...hobby, id: (hobbyId++).toString() });
                    return new Response(200);
                } else {
                    return new Response(404, {}, { error: `User ${request.params.id} doesn't exist` });
                }
            });
            this.delete('/users/:id/:hobbyId', (schema, request) => {
                const user = users.find(user => user.id === request.params.id);
                if (user) {
                    const hobbyIdx = user.hobbies.findIndex(hobby => hobby.id === request.params.hobbyId);
                    if (hobbyIdx !== -1) {
                        user.hobbies.splice(hobbyIdx, 1);
                        return new Response(200);
                    } else {
                        return new Response(404, {}, { error: `User ${user.id} has no hobby ${request.params.hobbyId}` });
                    }
                } else {
                    return new Response(404, {}, { error: `User ${request.params.id} doesn't exist` });
                }
            });
        }
    });
}