function createParticles() {
    const container = document.body;
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      
      // Random color - science theme colors
      const colors = ['#3a86ff', '#ff006e', '#8338ec', '#ffbe0b', '#fb5607'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Animation
      particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(particle);
    }
  }
  
  // Initialize the quiz and create particles
  createParticles();