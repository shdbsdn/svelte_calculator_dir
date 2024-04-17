const site_root = "http://10.125.208.187:12345/api/";

export async function fetchData(uri, method = 'GET', data = {}) {
    let url = new URL(site_root + uri);
    const headers = { 'Content-Type': 'application/json' };
    let options = {};

    if (method === 'GET' && Object.keys(data).length > 0) {
        url.search = new URLSearchParams(data).toString();
    }

    switch (method) {
        case 'GET':
            options = { method };
            break;
        case 'POST':
        case 'PUT':
            options = {
                method,
                headers,
                body: JSON.stringify(data)
            };
            break;
        case 'DELETE':
            options = { method };
            break;
        default:
            throw new Error('Unsupported HTTP method');
    }
    const response = await fetch(url, options);
    return await response.json();
}
