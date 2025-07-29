// Prompt Generator JavaScript

// Prompt templates organized by category
const promptTemplates = {
    writing: [
        {
            title: "Creative Story Writer",
            description: "Generate engaging creative stories with specific themes",
            template: "You are a talented creative writer. Write a {word_count} word story about {topic} in the {genre} genre. The story should have {tone} tone and include the following elements: {elements}. Make it engaging and memorable for the reader."
        },
        {
            title: "Blog Post Creator",
            description: "Create compelling blog posts on any topic",
            template: "Act as an experienced blogger and content creator. Write a comprehensive blog post about {topic} that is approximately {word_count} words long. The target audience is {audience}. Include practical tips, examples, and make it SEO-friendly with a {tone} tone."
        },
        {
            title: "Email Template Writer",
            description: "Craft professional email templates",
            template: "Create a professional email template for {purpose}. The email should be {tone} in tone, approximately {length} long, and targeted at {audience}. Include appropriate subject line suggestions and call-to-action elements."
        }
    ],
    business: [
        {
            title: "Business Plan Assistant",
            description: "Help create comprehensive business plans",
            template: "Act as a business consultant with expertise in {industry}. Help me create a detailed business plan section for {section_type}. Consider a {business_type} targeting {target_market}. Provide actionable insights and realistic projections."
        },
        {
            title: "Marketing Strategy Generator",
            description: "Develop marketing strategies and campaigns",
            template: "You are a marketing expert specializing in {industry}. Create a comprehensive marketing strategy for {product_service} targeting {target_audience}. Include specific tactics for {channels}, budget considerations, and measurable KPIs. The tone should be {tone}."
        },
        {
            title: "Meeting Minutes Template",
            description: "Generate professional meeting minutes",
            template: "Create professional meeting minutes for a {meeting_type} meeting about {topic}. Include agenda items, action items, decisions made, and next steps. Format it for {audience} and maintain a {tone} professional tone."
        }
    ],
    creative: [
        {
            title: "Character Development",
            description: "Create detailed character profiles",
            template: "You are a character development expert. Create a detailed character profile for a {character_type} in a {genre} story. Include background, personality traits, motivations, conflicts, and character arc. The character should be {personality} and have {special_traits}."
        },
        {
            title: "World Building Assistant",
            description: "Develop fictional worlds and settings",
            template: "Act as a world-building expert. Create a detailed description of a {world_type} world for a {genre} story. Include geography, culture, politics, technology level, and unique features. The world should feel {atmosphere} and have {key_elements}."
        },
        {
            title: "Creative Prompt Generator",
            description: "Generate creative writing prompts",
            template: "Generate {number} creative writing prompts for {genre} stories. Each prompt should be {tone} and include interesting characters, conflicts, or situations. Target audience: {audience}. Make them inspiring and specific enough to spark creativity."
        }
    ],
    educational: [
        {
            title: "Lesson Plan Creator",
            description: "Design comprehensive lesson plans",
            template: "Act as an experienced {subject} teacher. Create a detailed lesson plan for {topic} suitable for {grade_level} students. Include learning objectives, activities, assessment methods, and materials needed. The lesson should be {duration} long and accommodate {learning_styles}."
        },
        {
            title: "Study Guide Generator",
            description: "Create effective study guides",
            template: "Create a comprehensive study guide for {subject} focusing on {topic}. Include key concepts, definitions, examples, practice questions, and memory aids. Format it for {grade_level} students and make it {style} in approach."
        },
        {
            title: "Quiz Creator",
            description: "Generate educational quizzes and tests",
            template: "Create a {quiz_type} quiz on {topic} for {grade_level} students. Include {question_count} questions of varying difficulty levels. Mix {question_types} and provide answer explanations. The quiz should assess {learning_objectives}."
        }
    ],
    coding: [
        {
            title: "Code Review Assistant",
            description: "Help with code reviews and improvements",
            template: "Act as a senior {programming_language} developer. Review this code for {code_purpose}. Focus on {review_aspects} and provide specific, actionable feedback. Suggest improvements for readability, performance, and best practices. Format: {output_format}."
        },
        {
            title: "Bug Fix Helper",
            description: "Assist with debugging and problem-solving",
            template: "You are an expert {programming_language} developer. Help me debug this issue: {problem_description}. The expected behavior is {expected_behavior} but the actual behavior is {actual_behavior}. Provide step-by-step debugging approach and potential solutions."
        },
        {
            title: "Code Documentation Writer",
            description: "Generate comprehensive code documentation",
            template: "Act as a technical writer specializing in {programming_language}. Create detailed documentation for {code_type}. Include purpose, parameters, return values, usage examples, and edge cases. Target audience: {audience}. Style: {documentation_style}."
        }
    ],
    analysis: [
        {
            title: "Data Analysis Assistant",
            description: "Help analyze and interpret data",
            template: "Act as a data analyst expert. Analyze the following {data_type} data related to {topic}. Provide insights on {analysis_focus}, identify trends, patterns, and anomalies. Present findings in {format} suitable for {audience} with actionable recommendations."
        },
        {
            title: "Market Research Analyzer",
            description: "Conduct market research and analysis",
            template: "You are a market research expert. Conduct a comprehensive analysis of {market/industry} focusing on {research_focus}. Include market size, trends, competitor analysis, opportunities, and threats. Present findings for {audience} in {format} format."
        },
        {
            title: "SWOT Analysis Generator",
            description: "Create SWOT analyses for businesses or projects",
            template: "Perform a detailed SWOT analysis for {company/project} in the {industry} industry. Analyze strengths, weaknesses, opportunities, and threats. Consider {specific_factors} and provide strategic recommendations based on the analysis."
        }
    ]
};

// Role-based prompt modifications
const rolePrompts = {
    expert: "You are a recognized expert in this field with years of experience and deep knowledge.",
    teacher: "You are an experienced educator skilled at explaining complex concepts clearly.",
    consultant: "You are a professional consultant providing strategic advice and solutions.",
    analyst: "You are a skilled analyst with expertise in data interpretation and insights.",
    writer: "You are a talented writer with a gift for compelling and engaging content.",
    developer: "You are an experienced software developer with strong technical skills.",
    researcher: "You are a thorough researcher skilled at gathering and synthesizing information."
};

// Format-specific instructions
const formatInstructions = {
    list: "Present your response as a clear, organized bulleted list.",
    paragraph: "Write your response in detailed paragraph form with smooth transitions.",
    steps: "Break down your response into numbered, sequential steps.",
    table: "Organize your response in a clear table format when applicable.",
    code: "Include relevant code examples and technical implementation details.",
    summary: "Provide a concise summary highlighting the most important points."
};

// Tone modifiers
const toneModifiers = {
    professional: "Maintain a professional, business-appropriate tone throughout.",
    casual: "Use a casual, conversational tone that's friendly and approachable.",
    academic: "Employ an academic tone with formal language and scholarly approach.",
    creative: "Be creative and imaginative in your language and examples.",
    friendly: "Use a warm, friendly tone that's encouraging and supportive.",
    formal: "Maintain a formal, respectful tone appropriate for official communications."
};

// Application state
let currentCategory = 'writing';
let savedPrompts = JSON.parse(localStorage.getItem('savedPrompts')) || [];

// DOM elements
const categoryButtons = document.querySelectorAll('.category-btn');
const templatesGrid = document.getElementById('templatesGrid');
const generateBtn = document.getElementById('generateBtn');
const promptOutput = document.getElementById('promptOutput');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const savedPromptsContainer = document.getElementById('savedPrompts');

// Form elements
const roleSelect = document.getElementById('roleSelect');
const taskInput = document.getElementById('taskInput');
const contextInput = document.getElementById('contextInput');
const formatSelect = document.getElementById('formatSelect');
const toneSelect = document.getElementById('toneSelect');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTemplates(currentCategory);
    loadSavedPrompts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Category buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            setActiveCategory(category);
            loadTemplates(category);
        });
    });

    // Generate button
    generateBtn.addEventListener('click', generateCustomPrompt);

    // Copy button
    copyBtn.addEventListener('click', copyPromptToClipboard);

    // Save button
    saveBtn.addEventListener('click', saveCurrentPrompt);

    // Enter key support for inputs
    [taskInput, contextInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                generateCustomPrompt();
            }
        });
    });
}

// Set active category
function setActiveCategory(category) {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    currentCategory = category;
}

// Load templates for current category
function loadTemplates(category) {
    const templates = promptTemplates[category] || [];
    templatesGrid.innerHTML = '';

    if (templates.length === 0) {
        templatesGrid.innerHTML = '<p class="no-templates">No templates available for this category yet.</p>';
        return;
    }

    templates.forEach((template, index) => {
        const templateCard = createTemplateCard(template, index);
        templatesGrid.appendChild(templateCard);
    });
}

// Create template card element
function createTemplateCard(template, index) {
    const card = document.createElement('div');
    card.className = 'template-card fade-in';
    card.innerHTML = `
        <h3>${template.title}</h3>
        <p>${template.description}</p>
        <div class="template-preview">
            "${template.template.substring(0, 100)}..."
        </div>
    `;

    card.addEventListener('click', () => {
        useTemplate(template);
        card.classList.add('success-flash');
        setTimeout(() => card.classList.remove('success-flash'), 600);
    });

    return card;
}

// Use a template to populate the custom builder
function useTemplate(template) {
    // Extract placeholder variables from template
    const placeholders = template.template.match(/{[^}]+}/g) || [];
    
    // Clear existing form
    roleSelect.value = '';
    taskInput.value = '';
    contextInput.value = '';
    formatSelect.value = '';
    toneSelect.value = '';

    // Set context with template information
    contextInput.value = `Using template: ${template.title}\n\nTemplate: ${template.template}\n\nPlease customize the following placeholders: ${placeholders.join(', ')}`;
    
    // Focus on task input for user to start customizing
    taskInput.focus();
    taskInput.placeholder = `Customize this template: ${template.title}`;

    // Scroll to builder section
    document.querySelector('.builder-section').scrollIntoView({ behavior: 'smooth' });
}

// Generate custom prompt
function generateCustomPrompt() {
    const role = roleSelect.value;
    const task = taskInput.value.trim();
    const context = contextInput.value.trim();
    const format = formatSelect.value;
    const tone = toneSelect.value;

    if (!task) {
        showNotification('Please enter a task or goal for your prompt.', 'error');
        taskInput.focus();
        return;
    }

    // Show loading state
    generateBtn.classList.add('loading');
    generateBtn.textContent = 'Generating...';

    // Simulate processing time for better UX
    setTimeout(() => {
        const generatedPrompt = buildPrompt(role, task, context, format, tone);
        displayGeneratedPrompt(generatedPrompt);
        
        // Reset button
        generateBtn.classList.remove('loading');
        generateBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Generate Prompt';
        
        // Scroll to output
        document.querySelector('.output-section').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

// Build the final prompt
function buildPrompt(role, task, context, format, tone) {
    let prompt = '';

    // Add role if specified
    if (role && rolePrompts[role]) {
        prompt += rolePrompts[role] + ' ';
    }

    // Add main task
    prompt += task;

    // Add context if provided
    if (context) {
        prompt += `\n\nContext: ${context}`;
    }

    // Add format instructions
    if (format && formatInstructions[format]) {
        prompt += `\n\n${formatInstructions[format]}`;
    }

    // Add tone modifier
    if (tone && toneModifiers[tone]) {
        prompt += ` ${toneModifiers[tone]}`;
    }

    // Add general quality instructions
    prompt += '\n\nPlease provide a thorough, helpful, and accurate response.';

    return prompt;
}

// Display generated prompt
function displayGeneratedPrompt(prompt) {
    promptOutput.innerHTML = `<div class="generated-prompt fade-in">${prompt}</div>`;
    
    // Enable action buttons
    copyBtn.disabled = false;
    saveBtn.disabled = false;
    
    // Store current prompt for copying/saving
    promptOutput.dataset.currentPrompt = prompt;
}

// Copy prompt to clipboard
async function copyPromptToClipboard() {
    const prompt = promptOutput.dataset.currentPrompt;
    
    if (!prompt) {
        showNotification('No prompt to copy!', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(prompt);
        showNotification('Prompt copied to clipboard!', 'success');
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = prompt;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showNotification('Prompt copied to clipboard!', 'success');
    }
}

// Save current prompt
function saveCurrentPrompt() {
    const prompt = promptOutput.dataset.currentPrompt;
    
    if (!prompt) {
        showNotification('No prompt to save!', 'error');
        return;
    }

    const savedPrompt = {
        id: Date.now(),
        text: prompt,
        date: new Date().toLocaleString(),
        category: currentCategory
    };

    savedPrompts.unshift(savedPrompt);
    localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
    
    loadSavedPrompts();
    showNotification('Prompt saved successfully!', 'success');
    
    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    setTimeout(() => {
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save';
    }, 2000);
}

// Load and display saved prompts
function loadSavedPrompts() {
    if (savedPrompts.length === 0) {
        savedPromptsContainer.innerHTML = '<p class="no-saves">No saved prompts yet. Generate and save some prompts to see them here!</p>';
        return;
    }

    savedPromptsContainer.innerHTML = '';
    
    savedPrompts.forEach(savedPrompt => {
        const promptElement = createSavedPromptElement(savedPrompt);
        savedPromptsContainer.appendChild(promptElement);
    });
}

// Create saved prompt element
function createSavedPromptElement(savedPrompt) {
    const div = document.createElement('div');
    div.className = 'saved-prompt fade-in';
    div.innerHTML = `
        <div class="saved-prompt-header">
            <span class="saved-prompt-date">${savedPrompt.date}</span>
            <button class="delete-saved" onclick="deleteSavedPrompt(${savedPrompt.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="saved-prompt-text">${savedPrompt.text}</div>
        <button class="copy-btn" onclick="copySavedPrompt('${savedPrompt.id}')" style="margin-top: 10px;">
            <i class="fas fa-copy"></i> Copy
        </button>
    `;
    return div;
}

// Delete saved prompt
function deleteSavedPrompt(id) {
    savedPrompts = savedPrompts.filter(prompt => prompt.id !== id);
    localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
    loadSavedPrompts();
    showNotification('Prompt deleted successfully!', 'success');
}

// Copy saved prompt
async function copySavedPrompt(id) {
    const savedPrompt = savedPrompts.find(prompt => prompt.id == id);
    
    if (!savedPrompt) {
        showNotification('Prompt not found!', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(savedPrompt.text);
        showNotification('Prompt copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = savedPrompt.text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showNotification('Prompt copied to clipboard!', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations to CSS (injected via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.deleteSavedPrompt = deleteSavedPrompt;
window.copySavedPrompt = copySavedPrompt;