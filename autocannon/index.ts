import autocannon from 'autocannon'

autocannon({
  url: 'http://localhost:3000',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10 // default
}, (err, result) => {
  console.log(result)
})

autocannon({
  url: 'http://localhost:3000/health',
  connections: 1, //default
  pipelining: 1, // default
  duration: 15 // default
}, console.log)

autocannon({
  url: 'http://localhost:3000/hello-world',
  connections: 100, //default
  pipelining: 1, // default
  duration: 30 // default
}, console.log)

