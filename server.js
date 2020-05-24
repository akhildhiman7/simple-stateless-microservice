require('dotenv').config()

const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const fs = require("fs")
const request = require('request')
const resize = require('./resize.js')

app.use(express.json())

//Public endpoint for login purposes and returns a signed Json Web Token
app.post('/login', (req, res) => {
    const username = req.body.name;
    const password = req.body.password;

    const user = {name: username, password: password}

    //Creating a signed jwt and returning it for future authentication
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
    res.json({token: token})
})

//Checks whether a url is an image url or not
function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

//Downloads the image from the given path to local directory
const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(path)).on('close', callback)
    })
}

//Protected endpoint for Image thumbnail generation
app.get('/uploadFile', authenticateToken, (req, res) => {
    var url = req.body.url
    if (checkURL(url)) {
        const path = './images/image.jpeg'
        download(url, path, () => {
            console.log('Downloaded Successfully')
        })

        //Resulting thumbnail would be of type png and it's dimensions would be changed to 50 X 50
        res.type('image/png')
        resize('./images/image.jpeg', 'png', 50, 50).pipe(res)
    }
    else {
        return res.sendStatus(403)
    }
})

//Middleware checks whether a token is valid or not
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //Checking for unauthorized access
    if (token == null) return res.sendSatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //Checks whether the token is altered or not
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
}


app.listen(3000)