const API = {
    getArticles() {
        return fetch("http://localhost:8088/articles")
            .then(res => res.json())
    },
    newsArticles(articles) {
        return fetch("http://localhost:8088/articles", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(articles)
        })
            .then(res => res.json())
    },
    fetchEvents() {
        return fetch("http://localhost:8088/events")
            .then(data => data.json())
    },
    getData(target) {
        return fetch(`http://localhost:8088/${target}`)
        .then(response => response.json())
    },
    getcontentData(target, content) {
        return fetch(`http://localhost:8088/${target}/${content}`)
        .then(response => response.json())
    },
    postNewData(target,content) {
        return fetch(`http://localhost:8088/${target}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(content)
        })
      }
}
export default API
