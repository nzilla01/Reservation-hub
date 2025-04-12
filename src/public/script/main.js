const apiKey = "84abe2a1c418a448c612f22a42350bb9";

document.querySelector('.date').textContent = new Date().getFullYear();

const navBar = document.querySelector('.bar');
const nav = document.querySelector('.nav');

navBar.addEventListener('click', () => {
  nav.classList.toggle('show');
  navBar.classList.toggle('active');
});

// Fetch hotel data
fetch('../hotel.json')
  .then(res => res.json())
  .then(element => {
    const container = document.getElementById('hotel'); // Reference the correct container
    element.forEach(hotel => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${hotel.location}&appid=${apiKey}&units=metric`;

      fetch(weatherUrl)
        .then(res => res.json())
        .then(weatherData => {
          const temperature = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;

          // Store the weather in the hotel object for later use
          hotel.weather = `${temperature}°C, ${weatherDescription}`;

          container.innerHTML += `  
            <div class="hotel-card">
              <img src="${hotel.image}" id="hotel-img" alt="${hotel.name}" loading="lazy" />
              <h2>${hotel.name}</h2>
              <p>${hotel.description}</p>
              <p>${hotel.location}</p>
              <p>Price: $${hotel.pricePerNight}</p>
              <p class="rate">Rating: ${hotel.rating} 
                <div class="stars">
                 <i class="fas fa-star"></i>
                 <i class="fas fa-star"></i>
                 <i class="fas fa-star"></i>
                 <i class="fas fa-star"></i>
                 <i class="fas fa-star-half-alt"></i>
                </div>
               </p>
              <p class="weather">Weather: ${hotel.weather}</p>
              <button class="book-btn" data-hotel="${JSON.stringify(hotel)}">Book Now</button>
            </div>
          `;
        })
        .catch(err => console.error('Weather Fetch error:', err));
    });
  })
  .catch(err => console.error('Hotel Fetch error:', err));

// Fetch restaurant data
fetch('../returant.json')
  .then(res => res.json())
  .then(element => {
    const container = document.getElementById('rest'); // Reference the correct container
    element.forEach(restaurant => {
      container.innerHTML += `  
        <div class="hotel-card">
          <img src="${restaurant.image}" id="restaurant-img" alt="${restaurant.name}" loading="lazy" />
          <h2>${restaurant.name}</h2>
          <p>${restaurant.description}</p>
          <p>${restaurant.location}</p>
          <p>Cuisine: ${restaurant.cuisine}</p>
          <p class="rate">Rating: ${restaurant.rating}
            <div class="stars">
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star-half-alt"></i>
            </div>
           </p>
          <button class="book-btn" data-hotel="${JSON.stringify(restaurant)}">Book Now</button>
        </div>
      `;
    });
  })
  .catch(err => console.error('Restaurant Fetch error:', err));

// Handle the "Book Now" button click event for booking data
const bookButtons = document.querySelectorAll('.book-btn');
console.log(bookButtons); // Log the book buttons to check if they are selected correctly
bookButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    const hotelOrRestaurant = JSON.parse(event.target.getAttribute('data-hotel'));
    localStorage.setItem('currentBooking', JSON.stringify(hotelOrRestaurant));
    console.log('Booking saved:', hotelOrRestaurant); // Log the saved booking data
    alert('Booking saved!');
  });
});

// Retrieve and display the booking details on the "My Booking" page
const booking = JSON.parse(localStorage.getItem('currentBooking'));

if (booking) {
  const bookingDetails = document.getElementById('booking-details');
  bookingDetails.innerHTML = `
    <h2>${booking.name}</h2>
    <img src="${booking.image}" alt="${booking.name}" width="200" />
    <p><strong>Location:</strong> ${booking.location}</p>
    <p><strong>Description:</strong> ${booking.description}</p>
    <p><strong>Price per Night:</strong> $${booking.pricePerNight}</p>
    <p><strong>Rating:</strong> ${booking.rating}</p>
    <p><strong>Weather:</strong> ${booking.weather}</p>
  `;
} else {
  document.getElementById('booking-details').innerHTML = '<p>No booking found. Please make a booking first!</p>';
}

// Clear the booking from localStorage
document.getElementById('clear-booking').addEventListener('click', function() {
  localStorage.removeItem('currentBooking');
  alert('Booking cleared!');
  location.reload();  // Reload the page after clearing
});

// Handle the ads section display and hide
const ads = document.getElementById('ads');
ads.innerHTML += `
  <p class='meg'>Get up to 5% discount on your first booking every Friday at Reservation Hub</p>
  <button class='cancel-btn'> X </button>`;

const cancel = document.querySelector('.cancel-btn');

cancel.addEventListener('click', () => {
  const currentDisplay = window.getComputedStyle(ads).display;

  if (currentDisplay === "flex") {
    ads.style.display = "none";
  } else {
    ads.style.display = "flex";
  }
});

// Display the current year in the footer
document.querySelector('.date').textContent = new Date().getFullYear();
