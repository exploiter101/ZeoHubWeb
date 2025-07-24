// User data for fake executions
const users = [
    "ShadowNinja", "EpicGamer", "ScriptMaster", "CodeWizard", "PixelKing", 
    "ByteLord", "RobloxPro", "LuaExpert", "GameHacker", "VirtualHero",
    "DarkKnight", "TechSavvy", "ScriptSlinger", "DigitalDragon", "CyberSamurai",
    "GrowMaster", "PlantWizard", "GardenExpert", "AutoFarmer", "BotKing"
];

const games = [
    { id: "gag-egg", name: "Egg Predictor", icon: "fa-seedling", color: "gag" },
    { id: "gag-auto", name: "Auto Farm", icon: "fa-robot", color: "gag" }
];

const tabsContainer = document.getElementById('game-tabs-container');

// Execution counter
let executionCount = 0;
const executionList = document.getElementById('executions-list');
const executionCounter = document.getElementById('execution-count');

// Online counter
let onlineCount = 1238;
let onlineIndicator = document.getElementById('online-indicator');
let onlineCountElement = document.getElementById('online-count');
let userChangeElement = document.getElementById('user-change');

// Initialize the online indicator
function updateOnlineIndicator() {
    onlineIndicator.style.animation = 'online-pulse 1.5s infinite';
    onlineIndicator.style.backgroundColor = '#28a745';
    onlineCountElement.textContent = onlineCount.toLocaleString();
}

// Function to update online count
function updateOnlineUsers() {
    // Randomly decide if users are joining or leaving (70% chance to add)
    const isAdding = Math.random() > 0.3;
    const changeAmount = Math.floor(Math.random() * 8) + 1; // 1-8 users
    
    // Calculate new count (don't go below 1200)
    let newCount = onlineCount + (isAdding ? changeAmount : -changeAmount);
    if (newCount < 2100) newCount = 2100 + Math.floor(Math.random() * 50);
    
    // Update user change indicator
    userChangeElement.textContent = (isAdding ? '+' : '-') + changeAmount;
    userChangeElement.className = `user-change ${isAdding ? 'user-join' : 'user-leave'}`;
    userChangeElement.classList.add('active');
    
    // Apply animation to the count
    onlineCountElement.classList.add('online-count-change');
    
    // Update online count
    onlineCount = newCount;
    onlineCountElement.textContent = onlineCount.toLocaleString();
    
    // Remove animation classes after animation completes
    setTimeout(() => {
        onlineCountElement.classList.remove('online-count-change');
        userChangeElement.classList.remove('active');
    }, 1000);
}

// Initialize online indicator
updateOnlineIndicator();

// Update online users every 15 seconds
setInterval(updateOnlineUsers, 3000);

// Function to create a fake execution with real time
function createFakeExecution() {
    // Select random user and game
    const user = users[Math.floor(Math.random() * users.length)];
    const game = games[Math.floor(Math.random() * games.length)];
    
    // Create a timestamp from 1 to 10 minutes ago
    const minutesAgo = Math.floor(Math.random() * 10) + 1;
    const timestamp = new Date(Date.now() - minutesAgo * 60000);
    
    // Format time
    const timeStr = formatTimeAgo(minutesAgo);
    
    // Create execution item
    const executionItem = document.createElement('div');
    executionItem.className = 'execution-item';
    
    // Create user avatar
    const userAvatar = document.createElement('div');
    userAvatar.className = 'user-avatar';
    userAvatar.innerHTML = `<i class="fas fa-user"></i>`;
    
    // Create execution details
    const executionDetails = document.createElement('div');
    executionDetails.className = 'execution-details';
    
    const userName = document.createElement('div');
    userName.className = 'user-name';
    userName.textContent = user;
    
    const executionInfo = document.createElement('div');
    executionInfo.className = 'execution-info';
    
    const gameTag = document.createElement('span');
    gameTag.className = `game-tag ${game.color}-tag`;
    gameTag.innerHTML = `<i class="fas ${game.icon}"></i> ${game.name}`;
    
    const executionText = document.createElement('span');
    executionText.textContent = 'executed script';
    
    const executionTime = document.createElement('div');
    executionTime.className = 'execution-time';
    executionTime.textContent = timeStr;
    
    // Build the structure
    executionInfo.appendChild(gameTag);
    executionInfo.appendChild(executionText);
    executionInfo.appendChild(executionTime);
    
    executionDetails.appendChild(userName);
    executionDetails.appendChild(executionInfo);
    
    executionItem.appendChild(userAvatar);
    executionItem.appendChild(executionDetails);
    
    // Add to the top of the list
    if (executionList.firstChild) {
        executionList.insertBefore(executionItem, executionList.firstChild);
    } else {
        executionList.appendChild(executionItem);
    }
    
    // Update counter
    executionCount++;
    executionCounter.textContent = executionCount;
    
    // Limit to 8 items
    if (executionList.children.length > 8) {
        executionList.removeChild(executionList.lastChild);
    }
}

// Format time ago
function formatTimeAgo(minutes) {
    if (minutes === 1) return '1 min ago';
    return `${minutes} min ago`;
}

// Create initial executions
for (let i = 0; i < 4; i++) {
    setTimeout(() => {
        createFakeExecution();
    }, i * 400);
}

// Add new executions every 8 seconds
setInterval(createFakeExecution, 8000);

// Tab functionality
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        const contentElement = document.getElementById(`${tabId}-content`);
        contentElement.classList.add('active');
        
        // Gentle scroll to the loadstring container
        const loadstringContainer = document.getElementById('loadstring-container');
        const y = window.scrollY + loadstringContainer.getBoundingClientRect().top - 30;
        window.scrollTo({top: y, behavior: 'smooth'});
        
        // Add glow effect to the code container
        const codeContainer = document.getElementById(`${tabId}-code-container`);
        codeContainer.classList.add('glow-effect');
        
        // Remove glow effect after animation completes
        setTimeout(() => {
            codeContainer.classList.remove('glow-effect');
        }, 1500);
    });
});

// Copy button functionality
const copyButtons = document.querySelectorAll('.copy-btn, .hub-card .btn');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        let codeElement;
        
        if (button.classList.contains('copy-btn')) {
            // For home page buttons
            const content = button.closest('.content');
            codeElement = content.querySelector('.code');
        } else {
            // For hub card buttons
            const hubCard = button.closest('.hub-card');
            codeElement = hubCard.querySelector('.code');
        }
        
        const code = codeElement.textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(code).then(() => {
            // Show feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        });
    });
});

// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items and pages
        navItems.forEach(i => i.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Show corresponding page
        const pageId = item.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
        
        // Toggle tabs container visibility
        if (pageId === 'home-page') {
            tabsContainer.classList.remove('hidden');
        } else {
            tabsContainer.classList.add('hidden');
        }
    });
});

// Logo navigation functionality
const navLogo = document.querySelector('.nav-logo');
const headerLogo = document.querySelector('.logo');

navLogo.addEventListener('click', () => {
    // Simulate clicking on the home nav item
    document.querySelector('.nav-item[data-page="home-page"]').click();
    
    // Animation
    navLogo.style.transform = 'translateX(-50%) scale(1.1)';
    setTimeout(() => {
        navLogo.style.transform = 'translateX(-50%) scale(1)';
    }, 300);
});

headerLogo.addEventListener('click', () => {
    // Simulate clicking on the home nav item
    document.querySelector('.nav-item[data-page="home-page"]').click();
    
    // Animation
    headerLogo.style.transform = 'scale(1.05)';
    setTimeout(() => {
        headerLogo.style.transform = 'scale(1)';
    }, 300);
});

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});
