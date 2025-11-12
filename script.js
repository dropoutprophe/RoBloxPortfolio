document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels
    const carouselContainers = document.querySelectorAll('.carousel-container');
    
    carouselContainers.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const items = container.querySelectorAll('.carousel-item');
        const prevBtn = container.querySelector('.carousel-btn.prev');
        const nextBtn = container.querySelector('.carousel-btn.next');
        
        let currentIndex = 0;
        const totalItems = items.length;
        
        // Function to update carousel position
        function updateCarousel() {
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
        }
        
        // Next button functionality
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });
        
        // Previous button functionality
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });
        
        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }
        });
        
        // Initialize carousel position
        updateCarousel();
    });
    
    // Pause videos when they're not visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is visible, allow play
                video.play().catch(() => {
                    // Autoplay was prevented, user can manually play
                });
            } else {
                // Video is not visible, pause it
                video.pause();
            }
        });
    }, observerOptions);
    
    // Observe all videos
    document.querySelectorAll('video').forEach(video => {
        videoObserver.observe(video);
    });
});

