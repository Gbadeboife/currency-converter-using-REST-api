var fromCurrency=document.querySelector('#first-input');
var toCurrency=document.querySelector('#second-input');
var fromCurText=document.querySelector('.first-currency');
var toCurText=document.querySelector('.second-currency');
var button=document.querySelector('.btn');
var message=document.querySelector('.msg');
var input=document.getElementById('amount');
var currencyNameOne;
var currencyNameTwo;
const actualPage=document.querySelector('.actual-page');

//screen load animations
$(document).ready(function(){
    $('.actual-page').fadeIn(2000);    
    $('.btn').animate({top:'-=100px'},1200);
    $('h1').animate({top:'20px'},800);
    $('figure').animate({top:'-=100px'},1500);
    $('label').animate({bottom:'-=30px'},1000);
}
);

//end screen load animations

//Function to update label text for input tags
function updateCurrencyName(e){
    const currencyNameOne=fromCurrency.options[fromCurrency.selectedIndex].getAttribute('data-name');
    const currencyNameTwo=toCurrency.options[toCurrency.selectedIndex].getAttribute('data-name');
    fromCurText.textContent=currencyNameOne;
    toCurText.textContent=currencyNameTwo;
};


//Function to format result of converted value
function formatToCurrency(number,currencyCode){
    var options={
        style:'currency',
        currency:currencyCode,
        maximumFractionDigits:2,
        currencyDisplay:'symbol',
    };
    const currencyFormatText=new Intl.NumberFormat('en-US',options).format(number);
    return currencyFormatText;
};   

//Function to interact with the API and convert values
async function getExRate(){
    const amount=input.value;   
    const fromText=fromCurrency.value;
    const toText=toCurrency.value;
    const apiKey=process.env.API_KEY;
    const url ="http://api.exchangeratesapi.io/v1/latest?access_key=" + apiKey;
    const api=await fetch(url);
    const data=await api.json();
    const rates=data.rates;
    const exchangeRate=rates[toText]/rates[fromText];
    const result= exchangeRate*amount;
    const fromNumber=formatToCurrency(amount,fromText);
    const toNumber=formatToCurrency(result,toText);
    const outputText=`${fromNumber} is equal to ${toNumber}`;
    message.textContent=outputText; 

};

console.log(process.env.API_KEY)

updateCurrencyName()

//Adding event to the convert button once clicked
button.addEventListener('click',getExRate);



