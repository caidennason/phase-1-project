// Thinking out loud // 
// How do I get what is being searched for at the end of the link? String interpolation?
// ex: `http://openlibrary.org/search.json?${searchTerm}`
// want to get whatever is searched to then go to the table above it
// What do I want to have on the page? Book cover on top, author name below or to the right, and book title beneath author
// Button to save to your list of books
// .map that adds a button to each book that shows up, include event listener that submits that object to your list



// Globals //

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
    <h1>Books I've Read this Year</h1>
    `
}

const wantedBooksPageTemplate = () => {
    return `
    <h1>Books I Want to Read</h1>
              
              <h1 style='font-size:25px'>Search for the books you want to read here</h1>
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
    p.classList = 'center-align'
    const p2 = document.createElement('p')
    p2.innerText = 'Here\'s a way to track the books you\'ve read this year'
    p2.classList = 'center-align'
    mainDiv().appendChild(p)
    mainDiv().appendChild(p2)
}

const renderOwnedBooksPage = () => {
    mainDiv().innerHTML = ownedBooksPageTemplate()
    const searchP = document.createElement('p')
    const pTag = document.createElement('p')
    const form = document.createElement('form')
    form.innerHTML = `<form><div class="input-field">
    <input id="title" type="text">
    <label for="title">Title</label>

  <div class="input-field">
    <input id="author" type="text" >
    <label for="author">Author</label>
    <button type="submit">Submit</button>
  </form>
  `
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let test = e.target[0].value
        let testTwo = test.split(" ")
        let titleBarInput = testTwo.join("+")
        let first = e.target[1].value
        let firstTwo = first.split(" ")
        let authorBarInput = firstTwo.join("+")
        fetch(`http://openlibrary.org/search.json?author=${authorBarInput}&title=${titleBarInput}`)
        .then(resp => resp.json())
        .then(resp => {
            resp.docs.map(doc => {
                const h2 = document.createElement('h2')
                h2.textContent = doc.title 
                const li = document.createElement('li')
                li.textContent = doc.author_name[0]
                const a = document.createElement('a')
                a.href = ('https://openlibrary.org' + doc.key + '/' + doc.title)
                a.textContent = `Link to ${doc.title}`

                //TESTING 
                const removeBook = document.createElement('btn')
                removeBook.innerHTML = '<i class="large material-icons" style="font-size:small">delete</i>'
                removeBook.addEventListener('click', (e) => {
                  console.log(removeBook.parentNode)
                  h2.remove()
                  li.remove()
                  a.remove()
                  btn.remove()
                  removeBook.remove()
                })
                //TESTING

                const btn = document.createElement('btn')
                btn.innerHTML = '<button type="submit" style="background-color:cyan;color=black;float="right">Submit</button>'
                btn.addEventListener('click', (e) => {
                    e.preventDefault()
                    const heartButton = document.createElement('btn')
                    heartButton.innerHTML = '<i class="large material-icons" style="font-size:small">favorite_border</i>'
                    heartButton.addEventListener('click', (e) => {
                      e.preventDefault()
                      if (heartButton.innerHTML == '<i class="large material-icons" style="font-size:small">favorite_border</i>'){
                        heartButton.innerHTML = '<i class="large material-icons" style="font-size:small;color:orange">favorite</i>'
                      } else {
                        heartButton.innerHTML = '<i class="large material-icons" style="font-size:small">favorite_border</i>'
                      }
                    })
                    const removeButton = document.createElement('btn')
                    removeButton.innerHTML = '<i class="large material-icons" style="font-size:small">delete</i>'
                    removeButton.addEventListener('click', (e) => {
                      e.preventDefault()
                      e.target.parentElement.parentElement.remove()
                    })
                    const commentBar = document.createElement('form')
                    commentBar.innerHTML = `
                      <div class="input-field">
                      <input id="author" type="text" >
                      <label for="author">Comment</label>
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                    `
                    const bookComment = document.createElement('p')

                    commentBar.addEventListener('submit', (e) => {
                      bookComment.textContent = (e.target[0].value)
                      commentBar.remove()
                    })
                    const pTest = document.createElement('li')
                    pTest.innerText = (`${doc.title} by ${doc.author_name}`)
                    pTag.append(pTest)
                    pTest.append(heartButton, removeButton)
                    pTest.append(bookComment)
                    pTest.append(commentBar)
                })
                console.log(doc)
                mainDiv().appendChild(h2)
                mainDiv().appendChild(li)
                mainDiv().appendChild(a)
                mainDiv().appendChild(btn)
                mainDiv().appendChild(removeBook)
            })
        })
    })
    mainDiv().appendChild(pTag)
    mainDiv().appendChild(form)
}

const renderWantedBooksPage = () => {
    mainDiv().innerHTML = wantedBooksPageTemplate()
    const pTag = document.createElement('p')
    const form = document.createElement('form')
    form.innerHTML = `<form><div class="input-field">
    <input id="title" type="text">
    <label for="title">Title</label>

  <div class="input-field">
    <input id="author" type="text" >
    <label for="author">Author</label>
    <button type="submit">Submit</button>
  </form>
  `
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let first = e.target[1].value
        let firstTwo = first.split(" ")
        let authorBarInput = firstTwo.join("+")
        let test = e.target[0].value
        let testOne = test.split(" ")
        let titleBarInput = testOne.join("+")
        fetch(`http://openlibrary.org/search.json?author=${authorBarInput}&title=${titleBarInput}`)
        .then(resp => resp.json())
        .then(resp => {
            resp.docs.map(doc => {
                const h2 = document.createElement('h2')
                h2.textContent = doc.title 
                const li = document.createElement('li')
                li.textContent = doc.author_name[0]
                const a = document.createElement('a')
                a.href = ('https://openlibrary.org' + doc.key + '/' + doc.title)
                a.textContent = `Link to ${doc.title}`
                const removeBook = document.createElement('btn')
                removeBook.innerHTML = '<i class="large material-icons" style="font-size:small">delete</i>'
                removeBook.addEventListener('click', (e) => {
                  console.log(removeBook.parentNode)
                  h2.remove()
                  li.remove()
                  a.remove()
                  btn.remove()
                  removeBook.remove()
                })
                const btn = document.createElement('btn')
                btn.innerHTML = '<button type="submit" style="background-color:cyan;color=black;float="right">Submit</button>'
                btn.addEventListener('click', (e) => {
                    e.preventDefault()
                    const heartButton = document.createElement('btn')
                    heartButton.innerHTML = '<i class="large material-icons" style="font-size:small">favorite_border</i>'
                    heartButton.addEventListener('click', (e) => {
                      e.preventDefault()
                      if (heartButton.innerHTML == '<i class="large material-icons" style="font-size:small">favorite_border</i>'){
                        heartButton.innerHTML = '<i class="large material-icons" style="font-size:small;color:orange">favorite</i>'
                      } else {
                        heartButton.innerHTML = '<i class="large material-icons" style="font-size:small">favorite_border</i>'
                      }
                    })
                    const removeButton = document.createElement('btn')
                    removeButton.innerHTML = '<i class="large material-icons" style="font-size:small">delete</i>'
                    removeButton.addEventListener('click', (e) => {
                      e.preventDefault()
                      console.log(e.target.parentElement.parentElement)
                      e.target.parentElement.parentElement.remove()
                    })
                    const commentBar = document.createElement('form')
                    commentBar.innerHTML = `
                      <div class="input-field">
                      <input id="author" type="text" >
                      <label for="author">Comment</label>
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                    `
                    const bookComment = document.createElement('p')

                    commentBar.addEventListener('submit', (e) => {
                      bookComment.textContent = (e.target[0].value)
                      commentBar.remove()
                    })
                    const bookInformationLine = document.createElement('li')
                    bookInformationLine.innerText = `${doc.title} by ${doc.author_name}`
                    pTag.append(bookInformationLine)
                    bookInformationLine.append(heartButton, removeButton)
                    bookInformationLine.append(bookComment)
                    bookInformationLine.append(commentBar)
                })
                mainDiv().appendChild(h2)
                mainDiv().appendChild(li)
                mainDiv().appendChild(a)
                mainDiv().appendChild(btn)
                mainDiv().appendChild(removeBook)
            })
        })
    })
    mainDiv().append(pTag)
    mainDiv().appendChild(form)
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
  //likedBooksLinkEvent()
  })

