document.getElementById("blog-item").addEventListener("click", function(){
    const blog = document.getElementById("blog-item");
    const news = document.getElementById("news-item");
    console.log(news)
    blog.classList.add("active");
    news.classList.add("news");
})


const loadNews = () => {
    try{
        fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(res => res.json())
            .then(data => displayNewsCategory(data.data.news_category))
    }catch(err){
        console.log(err)
    }
}


const displayNewsCategory = (categoryes) => {
    const categoryList =  document.getElementById("category-list");
    categoryList.classList.add("d-flex")
    categoryes.forEach(category => {
        const ul = document.createElement("ul");
        ul.classList.add("list-item", "list-Color")
        ul.innerHTML = `
             <li onclick="categoryId('${category.category_id}')" class="me-3">${category.category_name}</li>
        `

        categoryList.appendChild(ul)
    });
}


const categoryId = (id) => {
    showSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try{
        fetch(url)
        .then(res => res.json())
            .then(data => displayNewsList(data.data))
    }catch(err){
        console.log(err)
    }
}

const displayNewsList = (allNews) => {
    const showNews = document.getElementById("show-news")
    if(allNews.length === 0){
        showNews.classList.remove("d-none")
        showSpinner(false)
    }else{
        showNews.classList.add("d-none")
    }
    const newsList = document.getElementById("news-list")
    newsList.innerText = "";
    allNews.forEach(news => {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card mb-3 p-4" style="max-width: 100%;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${news.image_url}" class="img-fluid rounded-start h-100" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.length > 100 ? news.details.slice(0, 150) + "...." : news.details}</p>
                        </div>
                        <div class="d-flex ms-3 mt-4 align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                              <div>
                                <img style="width:100%; height: 70px;" class="rounded-circle img-fluid" src="${news.author.img}"></div>
                                <div class="mt-3 ms-2">
                                    <h5>${news.author.name ? news.author.name : "No Author"}</h5>
                                    <p>${news.author.published_date ? news.author.published_date : "No Published"}</p>
                                </div>
                            </div>
                            <div class="ms-5 me-5">
                                <p>Views: ${news.total_view ? news.total_view : "No Views"}</p>
                            </div>
                            <div class="text-end">
                                <button onclick="seeMoreBtn('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">See More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        newsList.appendChild(div)
        showSpinner(false)
    })
}


const showSpinner = (spinner) => {
    const showSpinner = document.getElementById("show-spinner")
    if(spinner)(
        showSpinner.classList.remove("d-none")
    )
    else(
        showSpinner.classList.add("d-none")
    )
}


const seeMoreBtn = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`

    try{
        fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]))
    }catch(err){
        console.log(err)
    }
}


const displayModal = (newsId) => {
    const modal = document.getElementById("phone-details");
    console.log(newsId)
    modal.innerHTML = `
        <h2>${newsId.author.name}</h2>
        <img class="w-50 h-50" src="${newsId.author.img}"/>

    `
}


loadNews()