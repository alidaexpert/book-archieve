const searchFoundNum = document.getElementById('search-found')
const searchArea = document.getElementById('search-result')
const errorDiv = document.getElementById('error')

// button click handler 
const searchBook = async() => {
        const searchInput = document.getElementById('search-input')
        const searchText = searchInput.value
            // clear text
        searchInput.value = ''
        searchFoundNum.innerHTML = ''
        searchArea.innerHTML = ''
        errorDiv.innerHTML = ''
            // error handle 
        if (searchText === '') {
            errorHandle("Type a valid keyword")
        } else {
            try {
                errorDiv.style.display = 'none'
                const url = `http://openlibrary.org/search.json?q=${searchText}`
                const res = await fetch(url)
                const data = await res.json()
                displayBookDetails(data.docs)
                console.log(data.docs)
            } catch (err) {
                console.log("Your search result doesn't find anyway ")
            }
        }
    }
    // error handle 
const errorHandle = (error = "Your search result doesn't find anyway") => {
    const p = document.createElement('p')
    p.className = 'text-center mt-4'
    p.innerText = `${error}`
    errorDiv.appendChild(p)
}
const displayBookDetails = data => {
    // book found number 
    const p = document.createElement('p')
    p.className = 'text-center mt-4'
    p.innerText = ` ${data.length} book found by search result`
    searchFoundNum.appendChild(p)
        // book details cards
    data.forEach(docs => {
        console.log(docs)
        const div = document.createElement('div')
        div.className = 'col shadow'
        div.innerHTML = `  
        <div class="card h-100 bg-black border-blue rounded">
            <img src="https://covers.openlibrary.org/b/id/${docs.cover_i}-M.jpg" class="card-img-top" alt="Book Image" height="280rem">
        <div class="card-body bg-secondary">
            <h5 class="card-title text-warning"> ${docs.title}</h5>
            <hr>
            <h5 class="card-text fs-6"><span class="text-warning">Author Name: </span>${docs.author_name[0]}</h5>
            <p class="card-text fs text-brown"><span class="text-warning">Publisher: </span>${docs.publisher_facet[0]}</p>
            <p class="card-text fs text-brown "><span class="text-warning">First Publish Date: </span>${docs.first_publish_year}</p>
        </div>
        </div>
        `
        searchArea.appendChild(div)
    });
}