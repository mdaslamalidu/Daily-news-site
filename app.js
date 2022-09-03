const loadNews = () => {
        fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
        .catch((err) => {
            console.log(err)
        })
        
}


const displayNewsCategory = (categories) => {
    const categoryList =  document.getElementById("category-list");
    categoryList.classList.add("d-flex", "row")
    categories.forEach(category => {
        const ul = document.createElement("ul");
        ul.classList.add("list-item", "list-Color","col-lg", "col-sm-6")
        ul.innerHTML = `
             <li onclick="categoryId('${category.category_id}')" class="me-3">${category.category_name}</li>
        `

        categoryList.appendChild(ul)
    });
}


const categoryId = (id) => {
    showSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayNewsList(data.data))
        .catch((err)=> {
            console.log(err)
        })
}


const displayNewsList = (allNews) => {

    const inputField = document.getElementById("input-field");
    inputField.value = `${allNews.length} items found`

    const showNews = document.getElementById("show-news")
    if(allNews.length === 0){
        showNews.classList.remove("d-none")
        showSpinner(false)
    }else{
        showNews.classList.add("d-none")
    }

    const newsList = document.getElementById("news-list")
    newsList.innerText = "";
    
    allNews.sort((a,b) => b.total_view - a.total_view)

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
                        <div class="d-flex align-items-center justify-content-between row ms-1">
                            <div class="d-flex align-items-center col-lg-6 col-sm-12">
                              <div>
                                <img style="width:100%; height: 70px;" class="rounded-circle img-fluid" src="${news.author.img}"></div>
                                <div class="mt-3 ms-2">
                                    <h5>${news.author.name ? news.author.name : "No Author"}</h5>
                                    <p>${news.author.published_date ? news.author.published_date : "No Published"}</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-12">
                                <p>Views: ${news.total_view ? news.total_view : "No Views"}</p>
                            </div>
                            <div class="col-lg-3 col-sm-12">
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
        fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]))
        .catch((err) => {
            console.log(err)
        })
}



const displayModal = (newsId) => {
    const modal = document.getElementById("phone-details");
    console.log(newsId)
    modal.innerHTML = `
        <h2>${newsId.author.name ? newsId.author.name : "No Name"}</h2>
        <img class="w-100 h-25" src="${newsId.author.img}"/>
        <h5>Author: ${newsId.author.name ? newsId.author.name : "NO AUTHOR"}</h5>
        <p>Published Date: ${newsId.author.published_date ? newsId.author.published_date : "NO Published"}</p>
        <p>Views: ${newsId.total_view ? newsId.total_view : "NO Views"}</p>


    `
}


loadNews()