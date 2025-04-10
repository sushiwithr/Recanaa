
// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Audio elements
  const backgroundMusic = new Audio('bgm.m4a');
  backgroundMusic.loop = true;
  const clickSound = new Audio('click.m4a');
  
  // Music player controls
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  const musicStatus = document.getElementById('music-status');
  let isPlaying = false;
  
  // Profile image animation (on home page only)
  const profileImage = document.getElementById('profile-image');
  
  // Navigation click sounds
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Contact form (on contact page only)
  const contactForm = document.getElementById('contactForm');
  
  // Initialize Music Player
  musicToggle.addEventListener('click', function() {
    toggleMusic();
    playClickSound();
  
  // Function to toggle music
  function toggleMusic() {
    if (isPlaying) {
      backgroundMusic.pause();
      musicIcon.textContent = '🔇';
      musicStatus.textContent = 'Music Off';
    } else {
      backgroundMusic.play().catch(error => console.log("Error playing audio:", error));
      musicIcon.textContent = '🔊';
      musicStatus.textContent = 'Music On';
    }
    isPlaying = !isPlaying;
  }
   // Add event listener to the music toggle button
   musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      musicIcon.textContent = '🔊';
      musicStatus.textContent = 'Music On';
    } else {
      backgroundMusic.pause();
      musicIcon.textContent = '🔇';
      musicStatus.textContent = 'Music Off';
    }
    localStorage.setItem('musicPlaying', !backgroundMusic.paused);
  });

  // Save music state periodically
  setInterval(() => {
    localStorage.setItem('musicTime', backgroundMusic.currentTime);
    localStorage.setItem('musicPlaying', !backgroundMusic.paused);
  }, 1000);
});
  
  // Function to play click sound
  function playClickSound() {
    // Create a new audio instance each time to allow overlapping sounds
    const sound = new Audio('click.m4a');
    sound.play().catch(error => console.log("Error playing click sound:", error));
  }
  
  // Add click sound to all navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', playClickSound);
  });
  
  // Profile image interaction (only if it exists)
  if (profileImage) {
    // Click animation
    profileImage.addEventListener('click', function() {
      playClickSound();
      profileImage.classList.add('floating');
      setTimeout(() => {
        profileImage.classList.remove('floating');
      }, 2000);
    });
    
    // Hover sound
    profileImage.addEventListener('mouseenter', playClickSound);
  }
  
  // Handle contact form submission (only if it exists)
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      playClickSound();
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        alert('This is a demo form. In a real website, this would send your message.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        contactForm.reset();
      }, 1500);
    });
  }
  
  // Add dynamic functionality for document background video
  const video = document.getElementById('background-video');
  if (video) {
    // Make sure video plays
    video.play().catch(error => console.log("Error playing background video:", error));
    
    // Handle video loading issues
    video.addEventListener('error', function() {
      document.body.style.backgroundColor = '#222';
      console.error('Error loading video. Fallback background applied.');
    });
  }
});