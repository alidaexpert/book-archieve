const searchBook=async()=>{
const searchInput=document.getElementById('search-input')
const searchText=searchInput.value

// fetch
const url=`http://openlibrary.org/search.json?q=${searchText}`
const res= await fetch(url)
const data=await res.json()
console.log(data)
}
searchBook()