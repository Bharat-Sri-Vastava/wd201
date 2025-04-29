const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

let homeContent = "";
let projectContent = "";
let registrationContent = "";

// Load files
fs.readFile("home.html", (err, home) => {
    if (!err) homeContent = home;
});

fs.readFile("project.html", (err, project) => {
    if (!err) projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
    if (!err) registrationContent = registration;
});

// Create server
http.createServer((request, response) => {
    let url = request.url;
    response.writeHead(200, { "Content-Type": "text/html" });

    switch (url) {
        case "/project":
            response.end(projectContent);
            break;
        case "/registration":
            response.end(registrationContent);
            break;
        default:
            response.end(homeContent);
            break;
    }
}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});