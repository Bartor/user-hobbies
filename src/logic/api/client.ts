import Hobby from "../../core/types/Hobby.interface";

async function processRequest(fetchPromise: Promise<any>) {
    const response = await fetchPromise;
    const body = await response.json();
    if (response.status !== 200) throw body.error;
    return body;
}

export async function getUser(userId: string) {
    return await processRequest(fetch(`/api/users/${userId}`));

}

export async function getUserList() {
    return await processRequest(fetch('/api/users'));
}

export async function addUser(username: string) {
    return await processRequest(fetch('/api/users', { method: 'POST', body: username }));
}

export async function addHobby(userId: string, hobby: Hobby) {
    return await processRequest(fetch(`/api/users/${userId}`, { method: 'POST', body: JSON.stringify(hobby) }));
}

export async function deleteHobby(userId: string, hobbyId: string) {
    return await processRequest(fetch(`/api/users/${userId}/${hobbyId}`, { method: 'DELETE' }));
}