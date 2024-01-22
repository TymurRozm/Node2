function GET(req, res, url, payload) {
    throw "unhandled error";
    res.json({name: 'test handlerGet'})
}

function PURGE(req, res, url, payload) {
    res.json({name: 'root handlerOptions'})
}

export {GET, PURGE}