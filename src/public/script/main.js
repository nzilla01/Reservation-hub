const apiKey = "84abe2a1c418a448c612f22a42350bb9";

document.querySelector('.date').textContent = new Date().getFullYear();

const navBar = document.querySelector('.bar');
const nav = document.querySelector('.nav');

if (navBar && nav) {
  navBar.addEventListener('click', () => {
    nav.classList.toggle('show');
    navBar.classList.toggle('active');
  });
}

// function to safely parse JSON
function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('JSON parse error:', e);
    return null;
  }
}

// Fetch hotel data
const hotelContainer = document.getElementById('hotel');
const restContainer = document.getElementById('rest');

if (hotelContainer) {
  fetch('../hotel.json')
    .then(res => res.json())
    .then(hotels => {
      hotels.forEach(hotel => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(hotel.location)}&appid=${apiKey}&units=metric`;

        fetch(weatherUrl)
          .then(res => {
            if (!res.ok) throw new Error('Weather API failed');
            return res.json();
          })
          .then(weatherData => {
            const temperature = weatherData?.main?.temp ?? 'N/A';
            const weatherDescription = weatherData?.weather?.[0]?.description ?? 'Weather data unavailable';
            hotel.weather = `${temperature}°C, ${weatherDescription}`;

            const hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';
            hotelCard.innerHTML = `
              <img src="${hotel.image}" id="hotel-img" alt="${hotel.name}" loading="lazy" />
              <h2>${hotel.name}</h2>
              <p>${hotel.description}</p>
              <p>${hotel.location}</p>
              <p>Price: $${hotel.pricePerNight ?? 'N/A'}</p>
              <p class="rate">Rating: ${hotel.rating ?? 'N/A'}
                <div class="stars">
                 <i class="fas fa-star"></i>
                 <i class="fas fa-star"></i>
                 <i class="fas fa-star"></i>
                 <i class="fas fa-star"></i>
                 <i class="fas fa-star-half-alt"></i>
                </div>
               </p>
              <p class="weather">Weather: ${hotel.weather}</p>
              <button class="book-btn" data-hotel='${JSON.stringify(hotel)}'>Book Now</button>
            `;
            hotelContainer.appendChild(hotelCard);
          })
          .catch(err => {
            console.error('Weather Fetch error:', err);
            hotel.weather = 'Weather data unavailable';
            // Render card without weather data
            hotelContainer.innerHTML += createHotelCard(hotel);
          });
      });
    })
    .catch(err => console.error('Hotel Fetch error:', err));
}

if (restContainer) {
  fetch('../returant.json')
    .then(res => res.json())
    .then(restaurants => {
      restaurants.forEach(restaurant => {
        const restCard = document.createElement('div');
        restCard.className = 'hotel-card';
        restCard.innerHTML = `
          <img src="${restaurant.image}" id="restaurant-img" alt="${restaurant.name}" loading="lazy" />
          <h2>${restaurant.name}</h2>
          <p>${restaurant.description}</p>
          <p>${restaurant.location}</p>
          <p>Cuisine: ${restaurant.cuisine ?? 'N/A'}</p>
          <p class="rate">Rating: ${restaurant.rating ?? 'N/A'}
            <div class="stars">
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star-half-alt"></i>
            </div>
           </p>
          <button class="book-btn" data-hotel='${JSON.stringify(restaurant)}'>Book Now</button>
        `;
        restContainer.appendChild(restCard);
      });
    })
    .catch(err => console.error('Restaurant Fetch error:', err));
}

// Event delegation for book buttons
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('book-btn')) {
    const hotelData = event.target.getAttribute('data-hotel');
    const parsedData = safeParse(hotelData);
    if (parsedData) {
      localStorage.setItem('currentBooking', hotelData);
      console.log('Booking saved:', parsedData);
      alert('Booking saved!');
    } else {
      console.error('Invalid booking data');
    }
  }
});

// Booking display logic
const bookingDetails = document.getElementById('booking-details');
const clearBookingBtn = document.getElementById('clear-booking');

if (bookingDetails) {
  const booking = localStorage.getItem('currentBooking');
  const parsedBooking = booking ? safeParse(booking) : null;

  if (parsedBooking) {
    bookingDetails.innerHTML = `
      <h2>${parsedBooking.name ?? 'N/A'}</h2>
      <img src="${parsedBooking.image}" alt="${parsedBooking.name}" width="200" />
      <p><strong>Location:</strong> ${parsedBooking.location ?? 'N/A'}</p>
      <p><strong>Description:</strong> ${parsedBooking.description ?? 'N/A'}</p>
      ${parsedBooking.pricePerNight ? `<p><strong>Price per Night:</strong> $${parsedBooking.pricePerNight}</p>` : ''}
      <p><strong>Rating:</strong> ${parsedBooking.rating ?? 'N/A'}</p>
      ${parsedBooking.weather ? `<p><strong>Weather:</strong> ${parsedBooking.weather}</p>` : ''}
    `;
  } else {
    bookingDetails.innerHTML = '<p>No booking found. Please make a booking first!</p>';
  }
}

if (clearBookingBtn) {
  clearBookingBtn.addEventListener('click', function() {
    localStorage.removeItem('currentBooking');
    alert('Booking cleared!');
    location.reload();
  });
}

// Ads section
const ads = document.getElementById('ads');
if (ads) {
  ads.innerHTML = `
    <p class='meg'>Get up to 5% discount on your first booking every Friday at Reservation Hub</p>
    <button class='cancel-btn'> X </button>
  `;

  const cancel = ads.querySelector('.cancel-btn');
  cancel.addEventListener('click', () => {
    ads.style.display = "none";
  });
}