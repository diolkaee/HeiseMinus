const PROXY_CONFIF = [{
    context: [
        "/api"
    ],
    "target": process.env.PORT || "http://localhost:8080",
    "secure": false    
}]

module.exports = PROXY_CONFIF;