const time = document.getElementById('time');
const timeformat = document.getElementById('timeformat');
const dateDisplay = document.getElementById('date');

const showTime = () => {
    let date = new Date();
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day = date.getDay();
    let dayOfMonth = date.getDate();
    let month = date.getMonth();
    let amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    time.innerHTML = `${hours}:${minutes}:${seconds}<span id="timeformat"> ${amPm}</span>`;
    dateDisplay.innerHTML = `${weekdays[day]}, ${months[month]} ${dayOfMonth}`;
};

document.addEventListener('DOMContentLoaded', () => {
    setInterval(showTime, 100);
});