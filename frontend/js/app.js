// 📍 Get Current Location
document.getElementById("getLocation")
.addEventListener("click", () => {

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        document.getElementById("lat").value =
          position.coords.latitude;

        document.getElementById("lng").value =
          position.coords.longitude;

      },
      () => {
        alert("Location access denied");
      }
    );

  } else {
    alert("Geolocation not supported");
  }
});


// 🚖 Book Ride
document.getElementById("bookingForm")
.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value;
  const lat = parseFloat(document.getElementById("lat").value);
  const lng = parseFloat(document.getElementById("lng").value);
  const luggage = document.getElementById("luggage").value;
  const seats = document.getElementById("seats").value;

  const resultDiv = document.getElementById("result");

  if (isNaN(lat) || isNaN(lng)) {
  alert("Please enter latitude and longitude or use auto location");
  return;
    }

  resultDiv.innerHTML = "Booking in progress...";

  try {

    const response = await fetch(
      "http://localhost:5000/api/passengers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          pickupLocation: { lat, lng },
          luggage,
          seatsRequired: seats
        })
      }
    );

    const data = await response.json();

    // ✅ SUCCESS
    if (data.booking && data.booking._id) {

      resultDiv.className = "success";
      resultDiv.innerHTML = `
        <h3>✅ Booking Confirmed</h3>
        <p><b>Driver:</b> ${data.booking.cab.driverName}</p>
        <p><b>Cab ID:</b> ${data.booking.cab._id}</p>
        <p><b>Fare:</b> ₹${data.fare}</p>
      `;

    }
    // 🌟 OUTSIDE RADIUS WARNING
    else if (data.message && data.message.includes("radius")) {

      resultDiv.className = "error";
      resultDiv.innerHTML = `
        ❌ ${data.message}
        <br>
        <small>Try booking from a nearby area.</small>
      `;

    }
    // ❌ GENERAL FAILURE
    else {

      resultDiv.className = "error";
      resultDiv.innerHTML = "❌ No cab available right now";

    }

  } catch (err) {

    resultDiv.className = "error";
    resultDiv.innerHTML = "Server error";

  }

});
