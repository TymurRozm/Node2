export function parseJSON(data) {
    try {
        return JSON.parse(data);
    } catch {
        return {};
    }
}

export function handleShutdown() {
    console.log('Server is shutting down...');
    process.exit(0);
}

