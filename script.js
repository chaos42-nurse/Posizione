const saveTag = document.querySelector("nfc-save");
const resetTag = document.querySelector("nfc-reset");

const STORAGE_KEY = "savedLocation";
const qrContainer = document.getElementById("qrcode");

// Ottieni posizione GPS
function getLocationAndSave() {
  if (!navigator.geolocation) {
    alert("Geolocalizzazione non supportata");
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const locationData = { lat, lng };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locationData));

    openInMaps(lat, lng);
    generateQR(lat, lng);
  });
}

// Apri Google Maps
function openInMaps(lat, lng) {
  const mapsURL = `https://www.google.com/maps?q=${lat},${lng}`;
  window.open(mapsURL, "_blank");
}

// Genera QR code
function generateQR(lat, lng) {
  qrContainer.innerHTML = "";
  const mapsURL = `https://www.google.com/maps?q=${lat},${lng}`;

  new QRCode(qrContainer, {
    text: mapsURL,
    width: 200,
    height: 200
  });
}

// Se esiste posizione salvata
function openSavedLocation() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const locationData = JSON.parse(saved);
    openInMaps(locationData.lat, locationData.lng);
    generateQR(locationData.lat, locationData.lng);
  } else {
    getLocationAndSave();
  }
}

// Reset
function resetLocation() {
  localStorage.removeItem(STORAGE_KEY);
  qrContainer.innerHTML = "";
  alert("Posizione resettata");
}

saveTag.addEventListener("click", openSavedLocation);
resetTag.addEventListener("click", resetLocation);
