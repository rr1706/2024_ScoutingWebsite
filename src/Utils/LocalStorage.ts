export function storeItem(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function retrieveItem(key: string) {
    const item = localStorage.getItem(key);

    if (item) {
        return JSON.parse(item);
    }
    else {
        return "";
    }
}