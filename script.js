const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"; //api url

const dropdowns = document.querySelectorAll(".dropdown select")  //acessing the two select in the dropdown
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// adding the countries as option
for ( select of dropdowns){
  for ( let currCode in countryList){
    //console.log(currCodes, countryList[currCodes] ) codes = INR , country code = IN
    let newOption = document.createElement("option"); //creates <option> element inside select
    newOption.innerText = currCode;  //the value visible in the froentend
    newOption.value = currCode; // the value is passed when the form is submitted
    select.append(newOption)  
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected"
    } else if(select.name === "To" && currCode === "INR"){
      newOption.selected = "selected"
    }
}
select.addEventListener ("change", (evt) =>{
 updateFlag(evt.target) // target tells where the change or event should display, here it displays on updateFlag
});
}

// code for the updation of flag
const updateFlag = (element) =>{ //element here is the thing in which we want change ,here it is select
  let currCode = element.value; //element.value = selected inr ,usd etc option avilable
  let countryCode = countryList[currCode]; // IN , ET ,EG
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  console.log(newSrc)
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

//code for extract the value or amount
const updateExchangeRate = async () => {   // async in front of function that function return promise
  let amount = document.querySelector(".amount input"); 
  let amtVal = amount.value; 
  console.log(amtVal)
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  
  // Updated URL structure
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  
  let response = await fetch(URL);  //this fetch the whole thing 
  let data = await response.json();  // only fetching the data to be used from response 
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; 
  console.log(fromCurr.value.toLowerCase())
  console.log(data)
  console.log(rate)
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

  

