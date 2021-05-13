const PROXY_CONFIF = [{
    context: [
        "/api"
    ],
    "target": "http://localhost:" + process.env.PORT || 8080,
    "secure": false    
}]

module.exports = PROXY_CONFIF;