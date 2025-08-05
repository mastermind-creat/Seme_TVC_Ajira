// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

if (localStorage.getItem('darkMode') === 'true') {
    html.classList.add('dark');
}

darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Chatbot Toggle
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotModal = document.getElementById('chatbotModal');
const closeChatbot = document.getElementById('closeChatbot');

chatbotToggle.addEventListener('click', () => {
    chatbotModal.classList.toggle('hidden');
});

closeChatbot.addEventListener('click', () => {
    chatbotModal.classList.add('hidden');
});

// Chatbot Functionality
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendChatbotMessage = document.getElementById('sendChatbotMessage');

// Fallback responses
const fallbackResponses = {
    "hello": "Hello! How can I assist you with Ajira Digital Club?",
    "hi": "Hi there! How can I help you today?",
    "what is ajira": "Ajira Digital is a Kenyan government initiative to equip youth with digital skills for online work opportunities.",
    "how to join": "You can join by filling out the registration form on our website or contacting us via WhatsApp.",
    "training": "We offer training in web development, digital marketing, graphic design, and more. Check our Services section for details.",
    "events": "Our upcoming events are listed in the Events section. You can register for any that interest you.",
    "contact": "You can reach us via email at ajira@semetvc.ac.ke or call +254 700 123 456. Our contact details are in the Contact section.",
    "thanks": "You're welcome! Let me know if you have any other questions.",
    "thank you": "You're welcome! Let me know if you have any other questions."
};

sendChatbotMessage.addEventListener('click', async () => {
    const message = chatbotInput.value.trim();
    chatbotInput.value = '';
    if (!message) return;

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'mb-4 text-right';
    userMessageDiv.innerHTML = `
        <div class="bg-red-100 dark:bg-green-900 text-gray-900 dark:text-white rounded-lg p-3 inline-block max-w-[80%]">
            <p>${message}</p>
        </div>
    `;
    chatbotMessages.appendChild(userMessageDiv);

    // Add typing indicator
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'mb-4';
    botMessageDiv.innerHTML = `
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 inline-block">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatbotMessages.appendChild(botMessageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Try API first
    try {
        const response = await fetch('https://seme-tvc-ajira.vercel.app/api/deepseek', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) throw new Error(`Server returned ${response.status}`);

        const data = await response.json();
        const reply = data.reply || "Hmm, I couldn't get a clear response right now.";
        botMessageDiv.innerHTML = `
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 inline-block max-w-[80%]">
                <p>${reply}</p>
            </div>
        `;
    } catch (error) {
        console.warn("API failed, using fallback:", error);

        // Fallback logic
        let fallbackReply = "I'm sorry, I can't connect to the AI right now. Here are some things I can help with: what is ajira, how to join, training, events, contact.";
        for (const [key, value] of Object.entries(fallbackResponses)) {
            if (message.toLowerCase().includes(key)) {
                fallbackReply = value;
                break;
            }
        }

        botMessageDiv.innerHTML = `
            <div class="bg-yellow-100 text-yellow-800 rounded-lg p-3 inline-block max-w-[80%]">
                <p>${fallbackReply}</p>
            </div>
        `;
    }

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
});

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatbotMessage.click();
    }
});

// Event Countdown
function updateCountdown() {
    const now = new Date();
    const eventDate = new Date();
    eventDate.setDate(now.getDate() + 7); // 7 days from now
    
    const diff = eventDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Form Submission (simulated)
const registrationForm = document.getElementById('registrationForm');
const contactForm = document.getElementById('contactForm');

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your registration! We will contact you soon.');
    registrationForm.reset();
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');

let currentImageIndex = 0;
const imageSources = Array.from(galleryItems).map(item => item.querySelector('img').src);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        lightboxImage.src = imageSources[currentImageIndex];
        lightbox.classList.remove('hidden');
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

prevImage.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    lightboxImage.src = imageSources[currentImageIndex];
});

nextImage.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    lightboxImage.src = imageSources[currentImageIndex];
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});
