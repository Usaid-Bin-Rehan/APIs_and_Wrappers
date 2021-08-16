// Basic HTTP Library (Client): Request (Provide method with a URL and a callback for processing the response, whether that is an error or quote in JSON format)
/*
const request = require('request')
request('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json', function (error, response, body) {
if (!error && response.statusCode == 200) {console.log(JSON.parse(body))}})
*/

// times_api.js (takes an API key and then runs custom methods which attach that key to each request)

const request = require('request')

const baseUri = "http://api.nytimes.com/svc/mostpopular/v2"

class TheTimes {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  mostEmailed(callback) {
    this._sendRequest("mostemailed", callback)
  }

  mostViewed(callback) {
    this._sendRequest("mostviewed", callback)
  }

  mostShared(callback) {
    this._sendRequest("mostshared", callback)
  }

  _sendRequest(type, callback) {
    const url = `${baseUri}/${type}/all-sections/7?api-key=${this.apiKey}`

    request(url, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).results)
      }
    })
  }
}


// Usage:

const times = new TheTimes("YOUR_API_KEY")
times.mostEmailed(function(data) {console.log(data[0])})

// Example Script:
/*
const times = new TheTimes("YOUR_API_KEY")

times.mostEmailed(function(articles) {
  console.log("Most Emailed")
  console.log("=====")
  articles.forEach(article => { console.log(article.title) })
})

times.mostViewed(function(articles) {
  console.log(" ")
  console.log("Most Viewed")
  console.log("=====")
  articles.forEach(article => { console.log(article.title) })
})

times.mostShared(function(articles) {
  console.log(" ")
  console.log("Most Shared")
  console.log("=====")
  articles.forEach(article => { console.log(article.title) })
})
*/

// Sample Output:
/*
Most Emailed
=====
A Quiet Giant of Investing Weighs In on Trump
Trump and Staff Rethink Tactics After Stumbles
My Paris: Seduced by the Past
...

Most Shared
=====
Trump and Staff Rethink Tactics After Stumbles
Why Nobody Cares the President Is Lying
A Quiet Giant of Investing Weighs In on Trump
...

Most Viewed
=====
Trump and Staff Rethink Tactics After Stumbles
Listen to Your Daily Audio Report
Betsy DeVos Confirmed as Education Secretary; Pence Breaks Tie
...
*/