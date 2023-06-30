// function editMovieClicked(id,title){
//     console.log('into the editmovie clicked funciton',title)
//     document.getElementById('get-movie-box').style.display = 'block';
//     document.getElementById('show-box').style.display = 'none';
//     document.getElementById('show-list-btn').style.display = 'none';
//      let updateBtn = document.createElement('button');
//         updateBtn.id ='update-btn';
//         document.getElementById('get-movie-box').appendChild(updateBtn);
//     console.log('before href title---',title);
//     console.log('after href title---',title)
//     document.getElementById('movie-title').value = title;
//   }

const urlString = new URLSearchParams(window.location.search);
    const movieId = urlString.get('id');
    console.log('movie id form url----',movieId)
if(movieId != null && movieId != "") isEdit = true;
  console.log(isEdit,'---is edit');
  if(isEdit) checkIdFn();

async function checkIdFn(){
  console.log('url has id -- isEdit--',isEdit);
  document.getElementById('movie-submit').innerHTML = "Update";
  document.getElementById('movie-details-h1').innerHTML = "Update movie";
  let dbMovie = await db.collection("movies").doc(movieId).get();
    document.getElementById('movie-title').value= dbMovie.data().title;
    gen.options[gen.selectedIndex].text = dbMovie.data().genre;
    document.getElementById('release-date').value = dbMovie.data().releaseDate;
    document.getElementById('country').value = dbMovie.data().country;
    document.getElementById('rating').value = dbMovie.data().rating;
    document.getElementById('runtime').value = dbMovie.data().runtime;
    console.log('is edit',isEdit);
}

movieSubmit.addEventListener('click',function(){
  // e.preventDefault();
  if(!isEdit) return false;
  let title = document.getElementById('movie-title').value;
  let genre = gen.options[gen.selectedIndex].text;
  let releaseDate = document.getElementById('release-date').value;
  let country = document.getElementById('country').value;
  let rating = document.getElementById('rating').value;
  let runtime = document.getElementById('runtime').value;
  db.collection("movies").doc(movieId).update({
      title: title,
      genre: genre,
      releaseDate: releaseDate,
      country: country,
      rating: rating,
      runtime: runtime
  })
  .then((docRef)=>{
    alert('Successfully updated');
    isEdit = false;
    location.href = 'index.html'
  })
  .catch((error)=>{
    alert('Error in Updating:',error);
  })
})