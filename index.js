import reddit from './reddit_api'
//Word array sample
/*
//sample data
var txt_arr = ["0 0 0 0 0 0 0 0 0 0",
               "1 1 1 1 1 1 1 1 1 1",
               "2 2 2 2 2 2 2 2 2 2"]
*/
var txt_arr = []
var word_str = ""
var line_num = 0
//Start at the current line
var current_line
var word_index = 0
var interval_set = 0
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

//txt_arr = []
  reddit.search(searchTerm, searchLimit, sortBy)
  .then(results => {
    //console.log(results)
    let output = '<div class="card-columns">'
    results.forEach(post => {
//console.log(post)
txt_arr.push(post.selftext)
//txt_arr.push("This is a text message that is very long aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk")
word_str = txt_arr[txt_arr.length-1].split(" ")
console.log(txt_arr[txt_arr.length-1].split(" "))

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
  current_line = 0
  e.preventDefault();
  console.log("TXT ARRAY")
  console.log(word_str)
  console.log(txt_arr.length)
  word_index = 0
  show_speed_component();
  hide_search_gui();
  if (interval_set == 0)
  {
  setInterval(
    function(){ flash_words(); },200
  )
    interval_set = 1
  }
})

function flash_words()
{
  //Move to the next line if the end is reached and set to start at word 0
  //console.log("LIN" + current_line + " " + txt_arr.length)
    if (word_index == word_str.length && current_line != txt_arr.length)
    {
      current_line++
      console.log("RESET")
      //console.log("RAN" + word_str.length + " " + current_line + " " + word_str.length)
      word_index = 0
      word_str = txt_arr[current_line].split(" ")
      console.log("INDX" + word_index + " " + word_str.length)
      set_line(current_line)

    }
    //Show the next word if the end hasn't been reached.


    if (word_index < word_str.length)
    {
      set_line(current_line)
      console.log(txt_arr[current_line])
      set_word(word_str[word_index])
      word_index++
    }
}

//Hide the search button

hide_speed_component()
//Set speed read word
set_word(" ");
set_line("1")
function set_line(argument)
{
    document.getElementById("Post_Number").innerHTML = "<h1 style='font-size:100px;'Search Result:>Result:" + argument + " </h1>"

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
function hide_speed_component()
{
  document.getElementById("Post_Number").style.display = "none";
  document.getElementById("SpeedRead").style.display = "none";
  document.getElementById("GoBack").style.visibility = 'hidden';
}
function show_speed_component()
{
  document.getElementById("Post_Number").style.display = "block";
  document.getElementById("SpeedRead").style.display = "block";
  document.getElementById("GoBack").style.visibility = 'visible';
}
//On goback button click
window.goback = function goback()
{
  console.log("goback event")
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
