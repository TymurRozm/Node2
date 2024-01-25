import { parseJSON } from './utils.js';

const router = {
    '/': {
        GET: handleRootGet,
        POST: handleRootPost,
        OPTIONS: handleOptions,
    },
    '/cats': {
        GET: handleCatsGet,
        OPTIONS: handleOptions,
    },
    '/dogs': {
        GET: handleDogsGet,
        OPTIONS: handleOptions,
    },
    '/cats/bigCats': {
        GET: handleApiUsersGet,
        OPTIONS: handleOptions,
    },
};

export default router;

function handleRootGet(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
}

function handleRootPost(req, res, payload) {
    const data = parseJSON(payload);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Received POST request', data }));
}

function handleCatsGet(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Cats was here');
}

function handleDogsGet(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Dogs was here');
}

function handleApiUsersGet(req, res) {
    const bigCats = [{name: 'Tiger' }, {name: 'Lion' }, {name: 'Panther'}, {name: 'Lix'}];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(bigCats));
}

function handleOptions(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
}
