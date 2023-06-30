// TODO: login token check
// TODO: admin functionality 
// show function
async function showListFn(){
    await getMovies();
  }
  async function getMovies(){
    const showBox = document.getElementById('show-box');
    const listTbody = document.getElementById('movie-tbody');
      const fetched = await db.collection('movies').get()
      .then(movieList=>{
        console.log('inside movieList---',movieList);
        let eachRow;
        if(movieList.docs == null || movieList.docs == ''){
          document.getElementById('movielist-h1').innerHTML = "No movies found";
          return false;
        }
        movieList.docs.map(doc=>{
          // console.log('log 1---', doc.id);
          let eachTitle, eachGenre, eachDate, eachCountry, eachRating, eachRuntime, eachDelBtn, eachEditBtn;
          eachRow = document.createElement('tr');
            eachRow.className = "row-div each-div";
  
          eachTitle = document.createElement('td');
            eachTitle.className = 'title-td each-title';
            eachTitle.appendChild(document.createTextNode(doc.data().title));
  
          eachGenre = document.createElement('td');
            eachGenre.className = 'genre-td each-genre';
            eachGenre.appendChild(document.createTextNode(doc.data().genre));
  
          eachDate = document.createElement('td');
            eachDate.className = 'date-td each-date';
            eachDate.appendChild(document.createTextNode(doc.data().releaseDate));
  
          eachCountry = document.createElement('td');
            eachCountry.className = 'country-td each-country';
            eachCountry.appendChild(document.createTextNode(doc.data().country));  
  
          eachRating = document.createElement('td');
            eachRating.className = 'rating-td each-rating';
            eachRating.appendChild(document.createTextNode(doc.data().rating));
  
          eachRuntime = document.createElement('td');
            eachRuntime.className = 'runtime-td each-runtime';
            eachRuntime.appendChild(document.createTextNode(doc.data().runtime));
  
            eachEditBtn = document.createElement('button');  
            eachEditBtn.className = 'each-edit-btn';
            eachEditBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            eachEditBtn.onclick = function(){
              location.href = 'movieDetails.html'+'?id='+doc.id;
              // editMovieClicked(doc.id,doc.data().title);
            }
  
          eachDelBtn = document.createElement('button');
            eachDelBtn.className = 'each-del-btn';
            eachDelBtn.innerHTML = `<i class=" fa-solid fa-trash"></i>`;
            eachDelBtn.onclick = function(){
              delMovie(this,doc.id);
            }
          eachRow.appendChild(eachTitle);
          eachRow.appendChild(eachGenre);
          eachRow.appendChild(eachDate);
          eachRow.appendChild(eachCountry);
          eachRow.appendChild(eachRating);
          eachRow.appendChild(eachRuntime);
          eachRow.appendChild(eachEditBtn);
          eachRow.appendChild(eachDelBtn);
          listTbody.appendChild(eachRow);
  
        })
      })
  }
  
  function delMovie(e,id){
    e.parentNode.style.display ='none';
    db.collection('movies').doc(id).delete()
    .then(function(){
      console.log('Record deleted');
    })
    .catch(function(error){
      console.log('Error in deleting---',error);
    });
  }
  
  // when add movie clicked
  let addNewMovie = document.getElementById('add-movie-btn');
  addNewMovie.addEventListener('click', function(){
    location.href = 'movieDetails.html';
  })