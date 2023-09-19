let previousDayIndex = -1; // Initialize the previousDayIndex variable

const getday = (day) => {
  // Create a Date object from a date string or timestamp
  const date = new Date(day);

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = date.getDay();

  // Define an array of day names for reference
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Check if the current day index is equal to or less than the previous day index
  if (dayOfWeek <= previousDayIndex) {
    // Calculate the index of the next day in the array
    const nextDayIndex = (previousDayIndex + 1) % 7;

    // Update the previousDayIndex variable for the next iteration
    previousDayIndex = nextDayIndex;

    return daysOfWeek[nextDayIndex]; // Return the name of the next day
  }

  // Update the previousDayIndex variable for the next iteration
  previousDayIndex = dayOfWeek;

  return daysOfWeek[dayOfWeek]; // Return the day name based on the day of the week
};

export default getday;


