/* =========== Variables =========== */
//button
const movieChoice = document.getElementById("movieChoice"); //dropdown
const viewSeatsBtn = document.getElementById("viewSeats"); //view seat btn

//Title
const titleHeader = document.querySelector(".titleHeader");

//Seat Panel
const seat = document.querySelectorAll(".seat"); //all seats div 
const regularSeats = document.querySelectorAll(".regSeat"); // all regular seats 
const vipSeats = document.querySelectorAll(".vipSeat"); // all vip seats 
//const seatRow = document.querySelectorAll(".seatRow"); // seat rows (4)

//Price Calc
const regularTicketNum = document.querySelector(".regNum");
const vipTicketNum = document.querySelector(".vipNum");
const totalTicketNum = document.querySelector(".totalNum");
const regularSubtotal = document.querySelector(".regSub");
const vipSubtotal = document.querySelector(".vipSub");
const totalPrice = document.querySelector(".sum");

//object
const seatPrice = {
  regular: 10,
  vip: 20
}

/* =========== Class =========== */
class Movie {
  constructor() {

  }
}

class SeatMap {
  constructor(seatType, selected, locationIndex) {
    this._seatType = seatType;
    this._selected = selected;
    this._locationIndex = locationIndex;
  }
}

class UI {
  constructor(seatType, isSelected) {
    this._seatType = seatType; //regular or vip
    this._isSelected = isSelected // is "selected" in classLise? true or false
    this._totalTicketNum = 0;
    this._totalPrice;
  }
  //static property
  static regularSeatCount = 0;
  static vipSeatCount = 0;
  static regSubTtl = 0;
  static vipSubTtl = 0;

  //method
  //#1 add "selected" class to the target or remove it 
  toggleSelected(target) {
    target.classList.toggle("selected");
  }

  //#2 Add seats to Your Seats Panel
  addSeat() {
    //count the number of tickets
    if (this._seatType === "regular") {
      UI.regularSeatCount++;
      regularTicketNum.innerHTML = UI.regularSeatCount; //display reg ticket num
      UI.calcTotalPrice(UI.regularSeatCount, this._seatType);
    } else if (this._seatType === "vip") {
      UI.vipSeatCount++;
      vipTicketNum.innerHTML = UI.vipSeatCount; //display vip ticket num
      UI.calcTotalPrice(UI.vipSeatCount, this._seatType);
    }
    //total ticket cound
    this._totalTicketNum = UI.regularSeatCount + UI.vipSeatCount;
    totalTicketNum.innerHTML = this._totalTicketNum;
  }

  //#3 Calculate the price and show total
  static calcTotalPrice(seatNum, seatType) {
    //sub total
    if (seatType === "regular") {
      UI.regSubTtl = seatPrice["regular"] * seatNum;
      regularSubtotal.innerHTML = `$ ${UI.regSubTtl}`;
    } else if (seatType === "vip") {
      UI.vipSubTtl = seatPrice["vip"] * seatNum;
      vipSubtotal.innerHTML = `$ ${UI.vipSubTtl}`;
    }
    //total ticket price
    this._totalPrice = UI.regSubTtl + UI.vipSubTtl;
    totalPrice.innerHTML = `$ ${this._totalPrice}`;
  }

  //#4 Remove seats from Your Seats panel
  removeSeat() {
    //recount the number of tickets
    if (this._seatType === "regular") {
      UI.regularSeatCount--;
      regularTicketNum.innerHTML = UI.regularSeatCount; //display reg ticket num
      UI.calcTotalPrice(UI.regularSeatCount, this._seatType);
    } else if (this._seatType === "vip") {
      UI.vipSeatCount--;
      vipTicketNum.innerHTML = UI.vipSeatCount; //display vip ticket num
      UI.calcTotalPrice(UI.vipSeatCount, this._seatType);
    }
    //total ticket count
    this._totalTicketNum = UI.regularSeatCount + UI.vipSeatCount;
    totalTicketNum.innerHTML = this._totalTicketNum;
  }

  static clearCalcPanel() {
    regularTicketNum.innerHTML = 0;
    vipTicketNum.innerHTML = 0;
    totalTicketNum.innerHTML = 0;
    regularSubtotal.innerHTML = "$ 0";
    vipSubtotal.innerHTML = "$ 0";
    totalPrice.innerHTML = "$ 0";
  }
}

/* ========== Call methods ==========*/
/* When the movie is picked, display the title */
movieChoice.onchange = () => {
  titleHeader.innerHTML = movieChoice.value;
};

/* When "view Seats" button is clicked */
//get seatMap from local storage
const displaySeatMap = (title) => {
  let seatMap = JSON.parse(localStorage.getItem("seatMap")); //get all from localStorage

  //find the index of NodeList, "seat" where classList selected to be added
  let listOfIndexWithSelected = [];
  let listOfIndexWithoutSelected = [];

  //prepare the seatMap data only for the movie selected
  let filteredSeatMap = seatMap.filter(elem => elem.movieTitle === title);

  if (filteredSeatMap.length === 0) {
    //when no data stored for the selected movie, show all seats as available
    Array.from(regularSeats).forEach(elem => {
      elem.classList.remove("selected");
    });
    Array.from(vipSeats).forEach(elem => {
      elem.classList.remove("selected");
    });
  } else {
    filteredSeatMap.map((elem) => {
      if (elem.seatMap[0].hasOwnProperty("selected")) {
        //find the index where class "selected" to be added
        listOfIndexWithSelected.push(filteredSeatMap.indexOf(elem));
        //add classList where alreay selected
        listOfIndexWithSelected.map(elem => seat[elem].childNodes[0].classList.add("selected"));
      } else {
        //find the index where class "selected" to be removed
        listOfIndexWithoutSelected.push(filteredSeatMap.indexOf(elem));
        //remove classList where alreay selected
        listOfIndexWithoutSelected.map(elem => seat[elem].childNodes[0].classList.remove("selected"));
      }
    });
  }
};

/* When the seat is selected */
//regular
for (let i = 0; i < regularSeats.length; i++) {
  regularSeats[i].addEventListener("click", (event) => {
    if (event.target.classList.contains("selected")) {
      let regular = new UI("regular", true);
      regular.toggleSelected(event.target);
      regular.removeSeat();
    } else {
      let regular = new UI("regular", false);
      regular.toggleSelected(event.target);
      regular.addSeat();
    }
  });
};
//vip
for (let i = 0; i < vipSeats.length; i++) {
  vipSeats[i].addEventListener("click", (event) => {
    if (event.target.classList.contains("selected")) {
      let vip = new UI("vip", true);
      vip.toggleSelected(event.target);
      vip.removeSeat();
    } else {
      let vip = new UI("vip", false);
      vip.toggleSelected(event.target);
      vip.addSeat();
    }
  });
};

/* When "Add to cart" button is clicked */
//Store SeatMap into localStorage
let seatArrayfromNodeList
//let seatMapArray = [];
let index = []; // (same as listOfIndexWithSelected)
let seatType;
let selectedClass;

const checkOut = (title) => {
  //validation check
  if (totalPrice.innerHTML === "$ 0") {
    alert("please select your seat.");
  } else {
    let seatMapArray = JSON.parse(localStorage.getItem("seatMap")); //get all from localStorage
    let filteredSeatMap = seatMapArray.filter(elem => elem.movieTitle === title);

    seatArrayfromNodeList = Array.from(seat);

    if (filteredSeatMap.length === 0) {
      seatArrayfromNodeList.map(elem => {
        return seatMapArray.push(
          {
            movieTitle: movieChoice.value,
            seatMap: [{
              seatType: elem.firstChild.classList[1], //regSeat or vipSeat
              selected: elem.firstChild.classList[2], //selected or undefined
              locationIndex: seatArrayfromNodeList.indexOf(elem)
            }]
          }
        )
      });
    } else {
      seatArrayfromNodeList.map((elem) => {
        if (elem.firstChild.classList.contains("selected")) {
          index.push(seatArrayfromNodeList.indexOf(elem));
        }
      })

      let startIndex = seatMapArray.indexOf(seatMapArray.find(value => value.movieTitle === title));

      //update seatMapArray
      //54 = 0, 55 = 1, 56 = 2......108 = 53
      index.map((elem) => {
        seatMapArray.splice(startIndex + elem, 1, {
          movieTitle: title,
          seatMap: [{
            seatType: seatMapArray[startIndex + 2][seatType], //regSeat or vipSeat
            selected: "selected", //selected
            locationIndex: elem
          }]
        });
      })
    }

    //store new data
    localStorage.setItem("seatMap", JSON.stringify(seatMapArray));
    UI.clearCalcPanel();
  }
};

//============================
//  //find the index of NodeList, "seat" where classList selected to be added
// let listOfIndexWithSelected = [];
// let listOfIndexWithoutSelected = [];

// //prepare the seatMap data only for the movie selected
// let filteredSeatMap = seatMap.filter(elem => elem.movieTitle === title);

// filteredSeatMap.map((elem) => {
//   if (elem.seatMap[0].hasOwnProperty("selected")) {
//     //find the index where class "selected" to be added
//     listOfIndexWithSelected.push(filteredSeatMap.indexOf(elem));
//     //add classList where alreay selected
//     listOfIndexWithSelected.map(elem => seat[elem].childNodes[0].classList.add("selected"));
//   } else {
//     //find the index where class "selected" to be removed
//     listOfIndexWithoutSelected.push(filteredSeatMap.indexOf(elem));
//     //remove classList where alreay selected
//     listOfIndexWithoutSelected.map(elem => seat[elem].childNodes[0].classList.remove("selected"));
//   }
// });
//=================================

/* When the page is loaded */
//For the very first time, localStorage is null
if ((localStorage.length === 0)) {
  //store emply array
  //The JSON.stringify() method converts JavaScript objects into strings.
  //array -> convert to object
  localStorage.setItem("seatMap", JSON.stringify(Object.entries([])));
}