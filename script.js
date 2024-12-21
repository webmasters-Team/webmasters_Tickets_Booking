//Create you project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];


//Getting today's date
const todayDate = new Date();
const todayLocalDate = todayDate.toLocaleDateString();
document.querySelector(".date").textContent = todayLocalDate;


// Use moviesList array for displaing the Name in the dropdown menu
const selectMovie = document.getElementById("selectMovie");
moviesList.forEach(movie => {
    const movieOption = document.createElement("option");
    movieOption.setAttribute("value", movie.movieName);
    movieOption.textContent = movie.movieName;
    selectMovie.appendChild(movieOption);
})

selectMovie.firstElementChild.selected = true; //default dropdown value upon loading
updateNameAndPrice(); //manual update on loading
selectMovie.addEventListener("change", updateNameAndPrice)

function updateNameAndPrice(event) {
    const selectedOption = selectMovie.value; 
    document.getElementById("movieName").textContent = selectedOption;
    
    const selectedMovieObject = moviesList.find(movie => movie.movieName === selectedOption);
    document.getElementById("moviePrice").textContent = `$ ${selectedMovieObject.price}`;
	
	totalSeatsAndPrice();
}


//Add eventLister to each unoccupied seat
const seats = document.querySelectorAll(".seat");

seats.forEach((seat, seatNumber) => {
    if (!seat.classList.contains("occupied")) {
        seat.dataset.seatNumber = seatNumber; // Storing seat number for function
        seat.addEventListener("click", seatClickHandle);
    }
});

function seatClickHandle(event) {
    const seat = event.currentTarget; // Accessing the clicked seat
		if (seat.classList.contains("occupied")) return;
    seat.classList.toggle("selected");
    
    // Selected Seats
    if (seat.classList.contains("selected")) {
        const selectedSeat = document.createElement("div");
        selectedSeat.classList.add("selectedSeat");
        selectedSeat.textContent = seat.dataset.seatNumber; // Accessing seat number from data attribute
        selectedSeat.setAttribute("id", seat.dataset.seatNumber); // to remove seat upon deselection
        document.getElementById("selectedSeatsHolder").append(selectedSeat);
        document.querySelector(".noSelected").style.display = "none";
    } else { // deselection part
        const seatToRemove = document.getElementById(seat.dataset.seatNumber);
        if (seatToRemove) { //removes seats from selectedSeatsCont when deselected
            seatToRemove.remove();
        }
    }
    
		totalSeatsAndPrice();
}

 // Total Seats and Price
function totalSeatsAndPrice() {
	const selectedSeatsNumber = document.querySelectorAll(".selected").length - 1; //1 is subtracted for the legend
    document.getElementById("numberOfSeat").textContent = selectedSeatsNumber;
    const moviePrice = parseFloat(document.getElementById("moviePrice").textContent.replace("$", ""));
    document.getElementById("totalPrice").textContent = `$ ${selectedSeatsNumber * moviePrice}`;
	
   // noSelected
    if (selectedSeatsNumber < 1) {
        document.querySelector(".noSelected").style.display = "initial";
    } 
}


//Add eventLsiter to continue Button
const continueButton = document.getElementById("proceedBtn");
continueButton.addEventListener("click", () => {
  const selectedSeatsNumber = document.querySelectorAll(".selected").length - 1;
  if (selectedSeatsNumber < 1) {
    alert("Oops no seat Selected");
  } else {
    alert("Yayy! Your seats have been booked");
  }

  seats.forEach((seat) => {
    if (
      seat.classList.contains("selected") &&
      !seat.classList.contains("legend")
    ) {
      seat.classList.replace("selected", "occupied");
			// Removing data-seat-number attribute assigned to all available seats at the beginning
      seat.removeAttribute("data-seat-number");
    }
  });

  resetAll();
});

function resetAll() {
  const selectedSeats = document.querySelectorAll(".selectedSeat");
  selectedSeats.forEach((selectedSeat) => selectedSeat.remove());

  document.querySelector(".noSelected").style.display = "initial";
  document.getElementById("numberOfSeat").textContent = 0;
  document.getElementById("totalPrice").textContent = `$ 0`;
}

//Add eventListerner to Cancel Button
const cancelButton = document.getElementById("cancelBtn");
cancelButton.addEventListener("click", () => {
  seats.forEach((seat) => {
    if (
      seat.classList.contains("selected") &&
      !seat.classList.contains("legend")
    ) {
      seat.classList.remove("selected");
    }
  });

  resetAll();
});