const container = document.querySelector('.container');
const slots = document.querySelectorAll('.row .slot:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const parkSelect = document.getElementById('park');

populateUI();
  
let ticketPrice = +parkSelect.value;

// Save selected park index and price
function setParkData(parkIndex, parkPrice) {
  localStorage.setItem('selectedParkIndex', parkIndex);
  localStorage.setItem('selectedParkPrice', parkPrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSlots = document.querySelectorAll('.row .slot.selected');

  const slotsIndex = [...selectedSlots].map(slot => [...slots].indexOf(slot));

  localStorage.setItem('selectedSlots', JSON.stringify(slotsIndex));

  const selectedSlotsCount = selectedSlots.length;

  count.innerText = selectedSlotsCount;
  total.innerText = selectedSlotsCount * ticketPrice;
  
  setParkData(parkSelect.selectedIndex, parkSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSlots = JSON.parse(localStorage.getItem('selectedSlots'));
  
  if (selectedSlots !== null && selectedSlots.length > 0) {
    slots.forEach((slot, index) => {
      if (selectedSlots.indexOf(index) > -1) {
        slot.classList.add('selected');
      }
    });
  }

  const selectedParkIndex = localStorage.getItem('selectedParkIndex');

  if (selectedParkIndex !== null) {
    parkSelect.selectedIndex = selectedParkIndex;
  }
}

// park select event
parkSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setParkData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Slot click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('slot') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});
00000000
updateSelectedCount();