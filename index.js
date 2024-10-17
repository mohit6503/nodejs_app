import http from 'http';
import url from 'url';

function log(req, res, startTime) {
    const requestTime = new Date().toISOString();
    const method = req.method;
    const path = req.url;
    const headers = req.headers;
    const queryParams = url.parse(req.url, true).query;
    const ip = req.socket.remoteAddress;
    const responseTime = Date.now() - startTime;

    const logData = {
        requestTime,
        method,
        path,
        queryParams,
        ip,
        responseTime: `${responseTime}ms`,
        headers: {
            authorization: headers['authorization'],
            userAgent: headers['user-agent'],
            contentType: headers['content-type'],
        },
        statusCode: res.statusCode,
    };

    return logData;  
}

function request(req, res) {
    const startTime = Date.now(); 
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    let responseData = '';  

    if (path === '/') {
        responseData = 'Welcome';
    } else if (path === '/about') {
        responseData = 'I am Mohit from NIT KKR';
    } else if (path === '/contact') {
        responseData = 'Contact us at gmail.com';
    } else {
        responseData = 'Not Found';
    }

    const logData = log(req, res, startTime);
    res.end(`
        <p>${responseData}</p>
        <script>
        
            console.log('Request Info:', ${JSON.stringify(logData, null, 2)});
        </script>
    `);
}



const server = http.createServer(request);
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
