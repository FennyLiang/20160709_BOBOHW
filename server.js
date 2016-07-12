const http = require('http')
const url = require('url')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {

  var routeRegex = /\/(\w+){1}(\/(\d+))?/
  var routeData = url.parse(req.url).pathname.split(routeRegex)

  var promiseObject = null

  try {
    let controller = require(`./${routeData[1]}`)
    let id = routeData[3]

    switch(req.method) {
      case 'GET':
        if (id === undefined) {
          promiseObject = controller
            .index()
            .then((results) => {
              return new Promise((resolve, reject) => {
                resolve({ statusCode: 200, responseData: results.map((result) => { return result.toJSON() }) })
              })
            })
        } else {
          promiseObject = controller
            .show(id)
            .then((result) => {

              // Have no result
              if (result == null) {
                throw 'Not found'
              } else {
                return new Promise((resolve, reject) => {
                  resolve({ statusCode: 200, responseData: result.toJSON() })
                })
              }
            })
        }
        break;

      case 'DELETE':

        if (id === undefined) {
          throw 'Not found'
        } else {
          promiseObject = controller
            .destroy(id)
            .then((result) => {
              resolve({ statusCode: 200, responseData: { message: `id: ${id} deleted` } })
            })
        }
    }

  } catch (error) {
    promiseObject = new Promise((resolve, reject) => {
      resolve({
        statusCode: 404,
        responseData: {
          message: 'The page you looking for is not exists.'
        }
      })
    });
  }

  promiseObject.then((result) => {

    console.log(`statusCode: ${result.statusCode}, responseData: ${result.responseData}`)

    res.statusCode = result.statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result.responseData))
  })
})
server.listen(port, hostname, () => {
  console.log(`Server start running at port: ${port}`)

})