// TODO: login token check 
var isEdit=false;
let gen = document.getElementById('movie-genre'); 

const movieSubmit = document.getElementById('movie-submit');
movieSubmit.addEventListener('click',function(e){
  e.preventDefault();
  let title = document.getElementById('movie-title').value;
  let genre = gen.options[gen.selectedIndex].text;
  let releaseDate = document.getElementById('release-date').value;
  let country = document.getElementById('country').value;
  let rating = document.getElementById('rating').value;
  let runtime = document.getElementById('runtime').value;
if(validateFn() == false) return false;
  if(isEdit) return false;
      db.collection('movies').add({
          title: title,
          genre: genre,
          releaseDate: releaseDate,
          country: country,
          rating: rating,
          runtime: runtime
      })
      .then((docRef)=>{
        alert('Successfully added');
        document.getElementById('movie-form').reset();
      })
      .catch((error)=>{
        alert('Error in adding:',error);
      })
});

function validateFn(){
  let title = document.getElementById('movie-title').value;
  let genre = gen.options[gen.selectedIndex].text;
  let releaseDate = document.getElementById('release-date').value;
  let country = document.getElementById('country').value;
  let rating = document.getElementById('rating').value;
  let runtime = document.getElementById('runtime').value;

  if(title == null || title == ""){
    alert("Please enter title")
      return false;
  }
  if(releaseDate == null || releaseDate == ""){
    alert("Please enter release date")
      return false;
  }
  if(country == null || country == ""){
    alert("Please enter country")
      return false;
  }
  if(runtime == null || runtime == ""){
    alert("Please enter runtime");
      return false;
  }
  return true;
}

// go back function
const goBackBtn = document.getElementById('go-back-btn');
goBackBtn.addEventListener('click',function(){
  isEdit = false;
  location.href = 'index.html';
});