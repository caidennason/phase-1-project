// Thinking out loud // 
// How do I get what is being searched for at the end of the link? String interpolation?
// ex: `http://openlibrary.org/search.json?${searchTerm}`
// want to get whatever is searched to then go to the table above it


// Globals //

// Fetch //

const fetchBookData = () => {
    fetch('http://openlibrary.org/search.json?author=mark+lewisohn')
    .then(resp => resp.json())
    .then(books => {
        console.log(books.docs)
    })
}

// Node Getters //

const mainDiv = () => document.getElementById("main-div-link")
const homePageLink = () => document.getElementById("home-page-link")
const ownedBooksPageLink = () => document.getElementById('owned-books-link')
const wantedBooksPageLink = () => document.getElementById('wanted-books-link')
const likedBooksPageLink = () => document.getElementById('liked-books-link')

// Templates // 

const homePageTemplate = () => {
    return `
    <h1 class='center-align'>Track what You've Read in 2022</h1>
    `
}

const ownedBooksPageTemplate = () => {
    return `
    <h1>Books I've Read</h1>
              <table class="highlight">
                <thead>
                  <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Month Finished</th>
                      <th>Like or Dislike</th>
                  </tr>
                </thead>
        
                <tbody>
                  <tr>
                    <td>Tune In</td>
                    <td>Liverpool Guy</td>
                    <td>n/a</td>
                    <td>Like</td>
                  </tr>
                  <tr>
                    <td>The Mist</td>
                    <td>Stephen King</td>
                    <td>July</td>
                    <td>Like</td>
                  </tr>
                  <tr>
                    <td>Dopesick</td>
                    <td>?</td>
                    <td>January</td>
                    <td>Like</td>
                  </tr>
                </tbody>
              </table>
              <h1 style='font-size:25px'>Search for the books you have read so far here</h1>
              <form>
                <div class="input-field">
                    <input id="title" type="text" class="validate">
                    <label for="title">Title</label>
                  </div>
                  <div class="input-field">
                    <input id="author" type="text" class="validate">
                    <label for="author">Author</label>
                  </div>
              </form>
              <button id="owned-books-submit-button" class="btn waves-effect waves-light" type="submit" name="action">Submit
            </button>
    `
}

const wantedBooksPageTemplate = () => {
    return `
    <h1>Books I've Read</h1>
              <table class="highlight">
                <thead>
                  <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Month Finished</th>
                      <th>Like or Dislike</th>
                  </tr>
                </thead>
        
                <tbody>
                  <tr>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                  </tr>
                  <tr>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                  </tr>
                </tbody>
              </table>
              <h1 style='font-size:25px'>Search for the books you want to read here</h1>
              <form>
                <div class="input-field">
                    <input id="title" type="text" class="validate">
                    <label for="title">Title</label>
                  </div>
                  <div class="input-field">
                    <input id="author" type="text" class="validate">
                    <label for="author">Author</label>
                  </div>
              </form>
              <button id="wanted-books-submit-button" class="btn waves-effect waves-light" type="submit" name="action">Submit
              </button>
    `
}

const likedBooksTemplate = () => {
    return `<h1>Get the books you liked to go here</h1>`
}
// Renderers // 

const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate()
    const p = document.createElement('p')
    p.innerText = 'Track all the books you have read and want to read in 2022.'
    p.classList = 'left-align'
    const li = document.createElement('li')
    li.innerText = 'Darwin and Winoa are so dang cute'
    li.classList = 'center-align'
    mainDiv().appendChild(p)
    mainDiv().appendChild(li)
}

const renderOwnedBooksPage = () => {
    mainDiv().innerHTML = ownedBooksPageTemplate()
}

const renderWantedBooksPage = () => {
    mainDiv().innerHTML = wantedBooksPageTemplate()
}

const renderLikedBooksPage = () => {
    mainDiv().innerHTML = likedBooksTemplate()
}
// Events //

const homePageLinkEvent = () => {
    homePageLink().addEventListener('click', (e) => {
        e.preventDefault()
        renderHomePage()
    })
}

const ownedBooksLinkEvent = () => {
    ownedBooksPageLink().addEventListener('click', (e) => {
        e.preventDefault()
        renderOwnedBooksPage()
    })
}

const wantedBooksLinkEvent = () => {
    wantedBooksPageLink().addEventListener('click', (e) => {
        e.preventDefault()
        renderWantedBooksPage()
    })
}

const likedBooksLinkEvent = () => {
    likedBooksPageLink().addEventListener('click', (e) => {
        e.preventDefault()
        renderLikedBooksPage()
    }) 
}

// When the DOM loads // 

document.addEventListener("DOMContentLoaded", (e) => {
  renderHomePage()
  homePageLinkEvent()
  ownedBooksLinkEvent()
  wantedBooksLinkEvent()
//   fetchBookData()
  likedBooksLinkEvent()
  })

