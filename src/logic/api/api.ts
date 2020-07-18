export function getUser(userId: string) {
    return fetch(`api/${userId}`);
}

export async function getUserList() {
    const response = await fetch(`api/getUsers`);
    const json = await response.json();
    return json;
}