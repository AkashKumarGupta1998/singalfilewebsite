// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(26, 32, 38, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(30, 39, 46, 0.9)';
        }
    });

    // Populate skills
    const skills = [
        'JavaScript', 'HTML5', 'CSS3', 'React', 'Node.js', 
        'Python', 'Data Analysis', 'Machine Learning', 
        'Project Management', 'Team Leadership', 'Public Speaking'
    ];

    const skillsContainer = document.getElementById('skills-container');
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill';
        skillElement.textContent = skill;
        skillsContainer.appendChild(skillElement);
    });

    // Populate timeline (experience)
    const experiences = [
        {
            date: 'Apr 2024 - Present',
            title: 'Senior Developer at Tech Corp',
            description: 'Leading a team of developers to build innovative web applications using modern technologies.'
        },
        {
            date: 'May 2023 - Dec 2023',
            title: 'Completed DevOps Training at Sterlite Technology Limited, Patna',
            description: 'Developed technical skills like automation, scripting, cloud computing, and DevOps tools, alongside soft skills like communication and collaboration.'
        },
        {
            date: '2020 - 2023',
            title: "Master's in chemistry",
            description: 'Specialization in organic chemistry provides in-depth knowledge of carbon-containing compounds, their structures, reactions, and applications.'
        },
        {
            date: '2016 - 2019 ',
            title: "Bachelor's in chemistry",
            description: 'Specialized in software development and data structures. Graduated with honors.'
        }
    ];

    const timelineContainer = document.getElementById('timeline-container');
    experiences.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${exp.date}</div>
                <h3 class="timeline-title">${exp.title}</h3>
                <p class="timeline-description">${exp.description}</p>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });

    // Populate projects
    const projects = [
        {
            title: 'E-commerce Platform',
            description: 'A full-featured online store with payment integration and inventory management.',
            tags: ['React', 'Node.js', 'MongoDB'],
            demoLink: '#',
            codeLink: '#'
        },
        {
            title: 'Data Visualization Dashboard',
            description: 'Interactive dashboard for analyzing and visualizing complex datasets.',
            tags: ['D3.js', 'Python', 'Flask'],
            demoLink: '#',
            codeLink: '#'
        },
        {
            title: 'Task Management App',
            description: 'Productivity application for teams to collaborate on projects and tasks.',
            tags: ['Vue.js', 'Firebase', 'SCSS'],
            demoLink: '#',
            codeLink: '#'
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image"></div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.codeLink}" class="project-link">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});
