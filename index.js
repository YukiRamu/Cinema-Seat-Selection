// Pick a movie => Array
// Select a available seat - done
// See the total selected seat number
// See the total ticket price
// The data is stored on the localstorage

/* Variables */
//const movieChoice = document.getElementById("movieChoice"); //dropdown
//const viewSeatsBtn = document.getElementById("viewSeats"); //view seat btn
//const seatRow = document.querySelectorAll(".seatRow"); // seat rows (4)
//const seat = document.querySelectorAll(".seat"); //all seats div 

//Seat Panel
const regularSeats = document.querySelectorAll(".flaticon-armchair"); // all regular seats 
const vipSeats = document.querySelectorAll(".flaticon-couch"); // all vip seats 

//Price Calc
const regularTicketNum = document.querySelector(".regNum");
const vipTicketNum = document.querySelector(".vipNum");
const totalTicketNum = document.querySelector(".totalNum");
const regularSubtotal = document.querySelector(".regSub");
const vipSubtotal = document.querySelector(".vipSub");
const totalPrice = document.querySelector(".sum");

/* Class */
class Movie {
  constructor() {

  }
}

class Seat {
  constructor(selected, location) {
    this._selected = selected;
    this._location = location;
  }
}

class Price {
  constructor() {
    this._regular = 10;
    this._vip = 20;
  }
}

class UI {
  constructor() {

  }
  //method
  //#1 Mark the seat as selected
  static toggleSelected = (target) => {
    console.log("target seat is ", target);
    target.classList.toggle("selected");
    console.log(target);
  }

  //#2 Add seats to Your Seats 
  static addSeats = () => {

  }

}


//When view seats button is clicked
//display seat map

/* When the seat is selected */
//add selected class to the target

for (let i = 0; i < regularSeats.length; i++) {
  regularSeats[i].addEventListener("click", (event) => {
    UI.toggleSelected(event.target);
  });
};

for (let i = 0; i < vipSeats.length; i++) {
  vipSeats[i].addEventListener("click", (event) => {
    UI.toggleSelected(event.target);
  });
};


// set selected = true

// #1 change the availability to selected 
// #2 add to the regularSeatArray and vipSeatArray
// #3 local storage

//price calculation