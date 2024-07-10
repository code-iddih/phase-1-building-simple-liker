// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Select all heart icons (both empty and full)
const hearts = document.querySelectorAll('.like-glyph');

// Select error modal elements
const errorModal = document.getElementById('modal');
const errorMessage = document.getElementById('modal-message');

// Function to handle like/unlike action
function handleHeartClick(event) {
  const heart = event.target;

  // Check if the clicked heart is empty
  if (heart.innerText === EMPTY_HEART) {
    // Simulate server call
    mimicServerCall()
      .then(function(response) {
        // Server call successful: change heart to full and style it
        heart.innerText = FULL_HEART;
        heart.classList.add('activated-heart');
      })
      .catch(function(error) {
        // Server call failed: display error by modal
        errorMessage.innerText = error;
        errorModal.classList.remove('hidden');
        
        // Hide modal after 3 seconds
        setTimeout(function() {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  } else if (heart.innerText === FULL_HEART) {
    // Heart is full: toggle back to empty heart
    heart.innerText = EMPTY_HEART;
    heart.classList.remove('activated-heart');
  }
}

// Add click event listeners to each heart icon
hearts.forEach(function(heart) {
  heart.addEventListener('click', handleHeartClick);
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
