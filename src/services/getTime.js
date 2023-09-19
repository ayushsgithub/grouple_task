import React from 'react'

const getTime = (time) => {

// Unix timestamp
const timestamp = time;

// Create a Date object by multiplying the timestamp by 1000 to convert it to milliseconds
const date = new Date(timestamp * 1000);

// Extract hours, minutes, and seconds from the Date object
const hours = date.getHours();
const minutes = date.getMinutes();

// Determine if it's AM or PM
const amOrPm = hours >= 12 ? 'PM' : 'AM';

// Convert hours to 12-hour format
const formattedHours = hours % 12 || 12; // Handle midnight (0) as 12

// Format the time as HH:MM AM/PM
const formattedTime = `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${amOrPm}`;

// console.log(formattedTime); // This will output the formatted time with AM/PM (e.g., "03:33 PM")


  return (formattedTime)
}

export default getTime
