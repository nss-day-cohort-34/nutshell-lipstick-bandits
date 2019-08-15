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
        
        fetchEvents () {
            return fetch("http://localhost:8088/events")
            .then (data => data.json())
        }
    
}


export default API
