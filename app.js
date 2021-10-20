//Add checkboxes, refactor
let movies =
[
    {
        odgledan : false,
        naziv : "Parasite",
        godina : 2019,
        drzava : "South Korea",
        napomena : "",
        glumci : ["Kang-ho Song","Sun-kyun Lee","Ho-mwok Izi"]
    },
    {
        odgledan : false,
        naziv : "Citezen Kane",
        godina : 1941,
        drzava : "Amerika",
        napomena : "Napomena",
        glumci : ["Joseph Cotten","Dorothy Comingore"]
    },
    {
        odgledan : true,
        naziv : "Scarface",
        godina : 1983,
        drzava : "Amerika",
        napomena : "Say hello to my little friend",
        glumci : ["Al Pacino"]
    }
]
let movieModal = document.getElementById('add_movie_modal');
let movieNameInput = document.getElementById('movieNameInput');
let movieYearInput = document.getElementById('movieYearInput');
let movieCountryInput = document.getElementById('movieCountryInput');
let movieNoteInput = document.getElementById('movieNoteInput');
let movieActorsInput = document.getElementById('movieActorsInput');
let addMovieButton = document.getElementById('addMovieFinal');
let modalMessageDiv = document.getElementById('modalMessage');
let checkBoxes;


function renderMoviesTable()
{
    let tableBody = document.getElementById("movies_table_body");
    let tableBodyHtml = "";
    let tableRows = movies.map((movie,index) => getTableRow(movie,index));
    tableBody.innerHTML = tableRows.join('');
    initCheckBoxes();
}

function tryAddingAMovie()
{

    if(areInputsValid())
    {
        addMovie();
        clearInputs();
        showSuccesfullyAddedMessage();
    }
    else 
    {
        highlightInvalidInputs();
        showInvalidInputsMessage();
    }
}

function areInputsValid()
{
    return isNameInputValid() && isYearInputValid() && isActorsInputValid();
}

function addMovie()
{
 let movieName = movieNameInput.value;
 let movieYear = +movieYearInput.value;
 let movieCountry = movieCountryInput.value;
 let movieNote = movieNoteInput.value;
 let movieActors = movieActorsInput.value.split(',');

 let newMovie = 
 {
    odgledan : false,
    naziv : movieName,
    godina : movieYear,
    drzava : movieCountry,
    napomena : movieNote,
    glumci : movieActors
};
 movies.push(newMovie);
 renderMoviesTable();

}

function showSuccesfullyAddedMessage()
{
    clearModalMessage();
    modalMessageDiv.innerHTML = "Film uspjesno dodat";
    modalMessageDiv.classList.add('alert-success');
}

function highlightInvalidInputs()
{
    if(!isNameInputValid())
        hightlightOneInvalidInput(movieNameInput);
    if(!isYearInputValid())
        hightlightOneInvalidInput(movieYearInput);
    if(!isActorsInputValid())
        hightlightOneInvalidInput(movieActorsInput);
}

function showInvalidInputsMessage()
{
    let msg = "";
    clearModalMessage();

    if(!isNameInputValid())
        msg += '<div>Morate unijeti naziv filma</div>';
    if(!isYearInputValid())
        msg += '<div>Godina premijere filma mora bit broj izmedju 1929 i 2022</div>';
    if(!isActorsInputValid())
        msg += '<div>Morate unijeti ime bar jednog glumca</div>';
    
    modalMessageDiv.innerHTML = msg;
    modalMessageDiv.classList.add('alert-danger');
}

function resetModal()
{
    clearInputs();
    clearModalMessage();
}

function clearInputs()
{
    movieActorsInput.value = "";
    movieCountryInput.value = "";
    movieNameInput.value = "";
    movieNoteInput.value = "";
    movieYearInput.value = "";

    movieYearInput.classList.remove("is-invalid");
    movieNameInput.classList.remove("is-invalid");
    movieActorsInput.classList.remove("is-invalid");

}

function clearModalMessage()
{
    modalMessageDiv.innerHTML = "";
    modalMessageDiv.classList.remove('alert-success','alert-danger');
}

function hightlightOneInvalidInput(inputElement)
{
    if(!inputElement.classList.contains("is-invalid"))
        inputElement.classList.add("is-invalid");
}

function getTableRow(movie,index)
{
    let color;
    let actorList = getActorHTMLList(movie.glumci);
    movie.odgledan ? color = 'green' : color = 'red';

    return `<tr id='${index}' class='${color}'>
                <td>${getCheckBoxForMovie(movie, index)}</td><td>${movie.naziv}</td><td>${movie.godina}</td><td>${movie.drzava}</td><td>${movie.napomena}</td><td>${actorList}</td>
            </tr>`;
}

function getCheckBoxForMovie(movie, index)
{
    let checked;
    movie.odgledan ? checked = 'checked' : checked = '';

    return `
    <label class='checkboxLabel' for='watched${index}}'>Odgledan</label>
    <input class='form-check-input' name='watched${index}' type='checkbox' value='${index}' ${checked}>`
}

function initCheckBoxes()
{
    checkBoxes = document.querySelectorAll('input[type=checkbox]')
    checkBoxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
          let index = +checkbox.value;
          invertMovieWatched(movies[index]);
          renderMoviesTable();
        })
      });
}

function invertMovieWatched(movie)
{
    movie.odgledan = !movie.odgledan;
}

function getActorHTMLList(actors)
{
    let actorList = '<ul>';
        for(let actor of actors){
            actorList += `<li>${actor}</li>`;
        }
        actorList += '</ul>';
        return actorList;
}

function isNameInputValid()
{
    return movieNameInput.value.length > 0;
}

function isYearInputValid()
{
    let year = +movieYearInput.value;
    return year >= 1930 && year <= 2021;
}

function isActorsInputValid()
{
    return movieActorsInput.value.length > 0;
}


renderMoviesTable();
movieModal.addEventListener('show.bs.modal',resetModal);
addMovieButton.addEventListener('click',tryAddingAMovie);