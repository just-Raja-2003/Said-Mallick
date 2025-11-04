// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scroll and Active Link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Close mobile menu
        navMenu.classList.remove('active');
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Smooth scroll
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Update active link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing Animation
const typedText = document.getElementById('typedText');
const phrases = [
    'Student Developer',
    'Tech Enthusiast',
    'VM Expert',
    'Android Developer',
    'System Administrator'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing animation
typeEffect();

// Enhanced Particle Animation with Connections
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 60;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
        particles.push({ element: particle, x, y });
    }
    
    // Create connecting lines between nearby particles
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
            if (distance < 20) {
                const line = document.createElement('div');
                line.className = 'particle-line';
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
                line.style.width = distance + '%';
                line.style.left = p1.x + '%';
                line.style.top = p1.y + '%';
                line.style.transform = `rotate(${angle}deg)`;
                line.style.transformOrigin = '0 0';
                particlesContainer.appendChild(line);
            }
        });
    });
}

createParticles();

// Code Rain Animation
function createCodeRain() {
    const codeRainContainer = document.getElementById('codeRain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columnCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columnCount; i++) {
        const char = document.createElement('div');
        char.className = 'code-char';
        char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
        char.style.left = (i * 20) + 'px';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.animationDelay = Math.random() * 2 + 's';
        codeRainContainer.appendChild(char);
    }
}

createCodeRain();

// Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateCounter, 30);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Skills Animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
            const progressBar = item.querySelector('.skill-progress');
            const targetWidth = progressBar.getAttribute('data-progress');
            progressBar.style.width = targetWidth + '%';
        }, index * 100);
    });
}

// Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 300);
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'about') {
                animateStats();
            }
            if (entry.target.id === 'skills') {
                animateSkills();
            }
            if (entry.target.id === 'education') {
                animateTimeline();
            }
        }
    });
}, observerOptions);

// Observe sections
sections.forEach(section => {
    observer.observe(section);
});

// Project Filter (updated to work with dynamic projects)
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.display = 'block';
                }, 10);
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            formSuccess.classList.remove('show');
        }, 3000);
    }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add stagger animation to project cards on load
window.addEventListener('load', () => {
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        });
    }, 100);
});

// Easter Egg: Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Create anime-style explosion effect
    const colors = ['#00FF41', '#FF006E', '#FF9D00', '#00d4ff'];
    
    for (let i = 0; i < 50; i++) {
        const burst = document.createElement('div');
        burst.style.position = 'fixed';
        burst.style.left = '50%';
        burst.style.top = '50%';
        burst.style.width = '10px';
        burst.style.height = '10px';
        burst.style.borderRadius = '50%';
        burst.style.background = colors[Math.floor(Math.random() * colors.length)];
        burst.style.zIndex = '9999';
        burst.style.pointerEvents = 'none';
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 5 + Math.random() * 5;
        
        document.body.appendChild(burst);
        
        let posX = 0;
        let posY = 0;
        
        const animate = () => {
            posX += Math.cos(angle) * velocity;
            posY += Math.sin(angle) * velocity;
            
            burst.style.transform = `translate(${posX}px, ${posY}px)`;
            burst.style.opacity = parseFloat(burst.style.opacity || 1) - 0.02;
            
            if (parseFloat(burst.style.opacity) > 0) {
                requestAnimationFrame(animate);
            } else {
                burst.remove();
            }
        };
        
        animate();
    }
    
    // Show secret message
    const message = document.createElement('div');
    message.textContent = '🎌 Anime Power Activated! 🎌';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '3rem';
    message.style.color = '#00FF41';
    message.style.textShadow = '0 0 20px rgba(0, 255, 65, 0.8)';
    message.style.zIndex = '10000';
    message.style.fontWeight = 'bold';
    message.style.pointerEvents = 'none';
    message.style.animation = 'fadeInScale 0.5s ease-out';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => message.remove(), 500);
    }, 2000);
}

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
`;
document.head.appendChild(style);

// ===== ADMIN PANEL FUNCTIONALITY =====

// Data Storage (in-memory, persists during session)
let projectsData = [
    {
        id: 1,
        title: "Virtual Machine Optimization Framework",
        description: "Advanced framework for optimizing VM performance and resource allocation across multiple hypervisors",
        tech: ["VMware", "VirtualBox", "Linux", "Python"],
        link: "https://github.com",
        category: "vm"
    },
    {
        id: 2,
        title: "Android Customization Toolkit",
        description: "Comprehensive toolkit for Android system customization and ROM development with easy configuration",
        tech: ["Android", "Java", "System Configuration"],
        link: "https://github.com",
        category: "android"
    },
    {
        id: 3,
        title: "OS Configuration Dashboard",
        description: "Interactive dashboard for managing and monitoring OS configurations across systems",
        tech: ["Web Dev", "Python", "Linux"],
        link: "https://github.com",
        category: "os web"
    },
    {
        id: 4,
        title: "Virtual Lab Environment",
        description: "Educational virtual lab setup for teaching computer science concepts with live testing",
        tech: ["VirtualBox", "Networking", "Linux"],
        link: "https://github.com",
        category: "vm"
    },
    {
        id: 5,
        title: "Web Tech Stack Explorer",
        description: "Interactive web application showcasing modern web development technologies and best practices",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://codepen.io",
        category: "web"
    },
    {
        id: 6,
        title: "System Administration Tools",
        description: "Suite of tools for efficient system administration and automation",
        tech: ["Python", "Bash", "Linux"],
        link: "https://github.com",
        category: "os"
    }
];

let educationData = [
    {
        id: 1,
        year: "2026",
        title: "B.Tech in Computer Science",
        institution: "University",
        description: "Currently pursuing degree with focus on systems, virtualization, and web technologies"
    },
    {
        id: 2,
        year: "2025",
        title: "Advanced Virtualization Course",
        institution: "Online Platform",
        description: "Completed certification in enterprise virtualization technologies and VM optimization"
    },
    {
        id: 3,
        year: "2024",
        title: "Full-Stack Web Development",
        institution: "Online Learning",
        description: "Comprehensive course covering frontend and backend web development with modern frameworks"
    }
];

let nextProjectId = 7;
let nextEducationId = 4;

// Admin Panel Toggle (Ctrl+Shift+A)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toggleAdminPanel();
    }
});

// Admin Panel Elements
const adminPanel = document.getElementById('adminPanel');
const adminClose = document.getElementById('adminClose');
const adminTabs = document.querySelectorAll('.admin-tab');
const addProjectBtn = document.getElementById('addProjectBtn');
const addEducationBtn = document.getElementById('addEducationBtn');
const projectModal = document.getElementById('projectModal');
const educationModal = document.getElementById('educationModal');
const projectForm = document.getElementById('projectForm');
const educationForm = document.getElementById('educationForm');
const cancelProject = document.getElementById('cancelProject');
const cancelEducation = document.getElementById('cancelEducation');
const exportDataBtn = document.getElementById('exportData');
const importDataBtn = document.getElementById('importData');
const resetDataBtn = document.getElementById('resetData');

function toggleAdminPanel() {
    adminPanel.classList.toggle('show');
    if (adminPanel.classList.contains('show')) {
        renderAdminProjects();
        renderAdminEducation();
    }
}

adminClose.addEventListener('click', () => {
    adminPanel.classList.remove('show');
});

// Tab Switching
adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        adminTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.admin-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(targetTab + 'Tab').classList.add('active');
    });
});

// Render Admin Projects List
function renderAdminProjects() {
    const list = document.getElementById('adminProjectsList');
    list.innerHTML = projectsData.map(project => `
        <div class="admin-item">
            <h4>${project.title}</h4>
            <p><strong>Category:</strong> ${project.category}</p>
            <p><strong>Tech:</strong> ${project.tech.join(', ')}</p>
            <p>${project.description}</p>
            <div class="admin-item-actions">
                <button class="admin-btn edit" onclick="editProject(${project.id})">Edit</button>
                <button class="admin-btn delete" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Render Admin Education List
function renderAdminEducation() {
    const list = document.getElementById('adminEducationList');
    list.innerHTML = educationData.map(edu => `
        <div class="admin-item">
            <h4>${edu.title} (${edu.year})</h4>
            <p><strong>Institution:</strong> ${edu.institution}</p>
            <p>${edu.description}</p>
            <div class="admin-item-actions">
                <button class="admin-btn edit" onclick="editEducation(${edu.id})">Edit</button>
                <button class="admin-btn delete" onclick="deleteEducation(${edu.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Add Project
addProjectBtn.addEventListener('click', () => {
    projectForm.reset();
    document.getElementById('projectId').value = '';
    projectModal.classList.add('show');
});

// Cancel Project
cancelProject.addEventListener('click', () => {
    projectModal.classList.remove('show');
});

// Project Form Submit
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('projectId').value;
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDesc').value;
    const tech = document.getElementById('projectTech').value.split(',').map(t => t.trim());
    const link = document.getElementById('projectLink').value;
    const category = document.getElementById('projectCategory').value;
    
    if (id) {
        // Edit existing
        const index = projectsData.findIndex(p => p.id === parseInt(id));
        projectsData[index] = { id: parseInt(id), title, description, tech, link, category };
    } else {
        // Add new
        projectsData.push({ id: nextProjectId++, title, description, tech, link, category });
    }
    
    renderProjects();
    renderAdminProjects();
    projectModal.classList.remove('show');
});

// Edit Project
window.editProject = function(id) {
    const project = projectsData.find(p => p.id === id);
    document.getElementById('projectId').value = project.id;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDesc').value = project.description;
    document.getElementById('projectTech').value = project.tech.join(', ');
    document.getElementById('projectLink').value = project.link;
    document.getElementById('projectCategory').value = project.category;
    projectModal.classList.add('show');
};

// Delete Project
window.deleteProject = function(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projectsData = projectsData.filter(p => p.id !== id);
        renderProjects();
        renderAdminProjects();
    }
};

// Add Education
addEducationBtn.addEventListener('click', () => {
    educationForm.reset();
    document.getElementById('educationId').value = '';
    educationModal.classList.add('show');
});

// Cancel Education
cancelEducation.addEventListener('click', () => {
    educationModal.classList.remove('show');
});

// Education Form Submit
educationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('educationId').value;
    const year = document.getElementById('educationYear').value;
    const title = document.getElementById('educationTitle').value;
    const institution = document.getElementById('educationInstitution').value;
    const description = document.getElementById('educationDesc').value;
    
    if (id) {
        // Edit existing
        const index = educationData.findIndex(e => e.id === parseInt(id));
        educationData[index] = { id: parseInt(id), year, title, institution, description };
    } else {
        // Add new
        educationData.push({ id: nextEducationId++, year, title, institution, description });
    }
    
    renderEducation();
    renderAdminEducation();
    educationModal.classList.remove('show');
});

// Edit Education
window.editEducation = function(id) {
    const edu = educationData.find(e => e.id === id);
    document.getElementById('educationId').value = edu.id;
    document.getElementById('educationYear').value = edu.year;
    document.getElementById('educationTitle').value = edu.title;
    document.getElementById('educationInstitution').value = edu.institution;
    document.getElementById('educationDesc').value = edu.description;
    educationModal.classList.add('show');
};

// Delete Education
window.deleteEducation = function(id) {
    if (confirm('Are you sure you want to delete this education entry?')) {
        educationData = educationData.filter(e => e.id !== id);
        renderEducation();
        renderAdminEducation();
    }
};

// Render Projects on Page
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projectsData.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <img src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3a5dc287-0c52-4b1b-9b9f-96cd6ba8375b.png" alt="Project">
                <div class="project-overlay"></div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank" class="project-link">
                    <span>View Project</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        </div>
    `).join('');
}

// Render Education on Page
function renderEducation() {
    const timeline = document.getElementById('timelineContainer');
    timeline.innerHTML = educationData.map(edu => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-year">${edu.year}</div>
                <h3>${edu.title}</h3>
                <p class="timeline-institution">${edu.institution}</p>
                <p class="timeline-description">${edu.description}</p>
            </div>
        </div>
    `).join('');
    
    // Re-trigger animations
    setTimeout(() => {
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 300);
        });
    }, 100);
}

// Export Data
exportDataBtn.addEventListener('click', () => {
    const data = {
        projects: projectsData,
        education: educationData
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
});

// Import Data
importDataBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                projectsData = data.projects;
                educationData = data.education;
                renderProjects();
                renderEducation();
                renderAdminProjects();
                renderAdminEducation();
                alert('Data imported successfully!');
            } catch (error) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
});

// Reset Data
resetDataBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
        location.reload();
    }
});

// Enhanced Scroll Animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add fade-in-scroll class to all sections
document.querySelectorAll('.project-card, .skill-category, .stat-card').forEach(el => {
    el.classList.add('fade-in-scroll');
    scrollObserver.observe(el);
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+K: Quick Search (scroll to next section)
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });
        const currentIndex = Array.from(sections).indexOf(currentSection);
        const nextSection = sections[currentIndex + 1] || sections[0];
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Space: Scroll to next section
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const currentScroll = window.scrollY;
        const nextSection = Array.from(sections).find(section => {
            return section.offsetTop > currentScroll + 100;
        });
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Close modals on outside click
adminPanel.addEventListener('click', (e) => {
    if (e.target === adminPanel) {
        adminPanel.classList.remove('show');
    }
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('show');
    }
});

educationModal.addEventListener('click', (e) => {
    if (e.target === educationModal) {
        educationModal.classList.remove('show');
    }
});

// Initialize renders
renderProjects();
renderEducation();

// Show admin hint after 3 seconds
setTimeout(() => {
    const hint = document.createElement('div');
    hint.textContent = 'Press Ctrl+Shift+A for Admin Panel';
    hint.style.position = 'fixed';
    hint.style.bottom = '20px';
    hint.style.right = '20px';
    hint.style.background = 'rgba(0, 255, 65, 0.9)';
    hint.style.color = '#0f0f1e';
    hint.style.padding = '10px 20px';
    hint.style.borderRadius = '8px';
    hint.style.fontSize = '0.9rem';
    hint.style.fontWeight = 'bold';
    hint.style.zIndex = '9999';
    hint.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
    hint.style.animation = 'fadeInUp 0.5s ease-out';
    document.body.appendChild(hint);
    
    setTimeout(() => {
        hint.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => hint.remove(), 500);
    }, 5000);
}, 3000);