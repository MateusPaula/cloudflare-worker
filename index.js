/*const handleRequest = require('./handler')*/
import { handleRequest } from './handler'


addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
