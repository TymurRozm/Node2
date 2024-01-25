import http from 'http';
import url from 'url';
import { parse } from 'querystring';
import { handleShutdown } from './utils.js';
import router from './router.js';

const PORT = 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

function handleRequest(req, res) {
    const { pathname } = url.parse(req.url, true);
    const route = router[pathname];

    if (route && route[req.method]) {
        let payload = '';

        req.on('data', (chunk) => {
            payload += chunk;
        });

        req.on('end', () => {
            if (req.headers['content-type']) {
                const contentType = req.headers['content-type'].split(';')[0];
                if (contentType === 'application/json') {
                    payload = JSON.parse(payload);
                } else if (contentType === 'application/x-www-form-urlencoded') {
                    payload = parse(payload);
                }
            }

            route[req.method](req, res, payload || {});
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}
