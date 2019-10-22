import reddit from './reddit_api'

//Word array sample
var txt_arr = ["word1", "word2", "word3", "word4"]

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
searchForm.addEventListener('submit', e => {
  const searchTerm = searchInput.value;

  const sortBy = document.querySelector('input[name="sortby"]:checked').value

  //Check input
  if (searchTerm == '') {
    showMessage('Please add a search term', 'alert-danger')
  }
  //const searchLimit = document.getElementById('limit').value;
  const searchLimit = 10
  console.log(searchLimit)
txt_arr = []
  reddit.search(searchTerm, searchLimit, sortBy)
  .then(results => {
    //console.log(results)
    let output = '<div class="card-columns">'
    results.forEach(post => {
//console.log(post)
//txt_arr.push(post.selftext)
txt_arr.push("This is a text message that is very long aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk")

console.log(txt_arr )

      //let image = post.preview ? post.preview.images[0].source.url : img_txt

let img_txt = 'https://www.redditstatic.com/icon.png'
      //let image = post.preview ? post.preview.images[0].source.url : img_txt
      let image = "NULL"
      if (post.preview){
        image = post.preview.images[0].source.url
      }
      else {
        console.log("ELSE")
        image = img_txt
      }
      //image = img_txt
      /*
      output += `<div class="card">
  <img class="card-img-top" src="${image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext,100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Go to URL</a>
  </div>
</div>
      */

    })
    output += '</div>'
    document.getElementById('results').innerHTML = output;

  });
  e.preventDefault();

})

//Hide the search button
hide_search_gui();
//Set speed read word
set_word("a");
function set_words()
{

}
function set_word(argument)
{
  document.getElementById("SpeedRead").innerHTML = "<h1 style='font-size:100px;'>" + argument + " </h1>"

}


function hide_search_gui()
{
  document.getElementById("search-form").style.display = "none";
  document.getElementById("search").style.display = "none";
}

function showMessage(message, className) {
  //Create div
  const div = document.createElement('div');
  div.className = `alert $ { className }`
  div.appendChild(document.createTextNode(message));
  const searchContainer = document.getElementById('search-container');
  const search = document.getElementById('search')

  searchContainer.insertBefore(div,search);
  setTimeout(() => document.querySelector('.alert').remove(),3000);
}

function truncateText(text,limit)
{
  const shortened = text.indexOf('', limit)
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
