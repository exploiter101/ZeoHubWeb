document.addEventListener('DOMContentLoaded', function() {
    // Executors data with fixed pricing
    const executors = [
        // Only a few shown for brevity; use the full array from your original JS!
        {
            id: "cryptic",
            name: "Cryptic",
            desc: "An exploit for most platforms.",
            lvl: 8,
            price: "$4.99",
            period: "monthly",
            plat: ["ios", "android"],
            pros: ["Almost on all platforms", "Has a decompiler", "100% sUNC", "Level 8"],
            neutral: ["Has a keysystem"],
            cons: [],
            verified: true,
            editor: "voxlis.NET",
            txtColor: "text-purple-500",
            accentColor: "from-purple-600 to-purple-700",
            premium: false,
            pricegray: true,
            href: "https://getcryptic.net/",
            priceHref: "https://bloxproducts.com/?affiliate_key=1270744029168009258#Cryptic",
            info: "",
            hasKeySystem: true,
            free: false,
            status: "online"
        },
        // ... Add all other executor objects here ...
    ];

    // Function to render executors
    function renderExecutors(filteredExecutors = executors) {
        const grid = document.getElementById('executorGrid');
        grid.innerHTML = '';
        
        filteredExecutors.forEach(executor => {
            // Determine price display with improved formatting
            let priceDisplay;
            if (executor.free) {
                priceDisplay = 'FREE';
            } else if (executor.period === 'lifetime') {
                priceDisplay = `${executor.price} Lifetime`;
            } else if (executor.period) {
                priceDisplay = `${executor.price}/${executor.period}`;
            } else {
                priceDisplay = executor.price;
            }
            
            // Generate platform tags
            let platformTags = '';
            executor.plat.forEach(platform => {
                let icon = '';
                switch(platform) {
                    case 'windows': icon = '<i class="fab fa-windows"></i>'; break;
                    case 'macos': icon = '<i class="fab fa-apple"></i>'; break;
                    case 'ios': icon = '<i class="fas fa-mobile-alt"></i>'; break;
                    case 'android': icon = '<i class="fab fa-android"></i>'; break;
                    default: icon = '<i class="fas fa-question-circle"></i>';
                }
                platformTags += `<div class="platform-tag">${icon} ${platform.charAt(0).toUpperCase() + platform.slice(1)}</div>`;
            });
            
            // Generate feature tags
            let featureTags = '';
            executor.pros.forEach(pro => {
                featureTags += `<div class="feat-tag pro"><i class="fas fa-check-circle"></i> ${pro}</div>`;
            });
            executor.neutral.forEach(neutral => {
                featureTags += `<div class="feat-tag neutral"><i class="fas fa-minus-circle"></i> ${neutral}</div>`;
            });
            executor.cons.forEach(con => {
                featureTags += `<div class="feat-tag con"><i class="fas fa-times-circle"></i> ${con}</div>`;
            });
            
            const card = document.createElement('div');
            card.className = 'exp-crd glass';
            card.dataset.status = executor.status;
            card.dataset.free = executor.free;
            card.dataset.platforms = executor.plat.join(',');
            card.innerHTML = `
                <div class="price-tag">${priceDisplay}</div>
                <div class="status ${executor.status}">
                    <span class="status-dot"></span>
                    ${executor.status.toUpperCase()}
                </div>
                <div class="crd-header">
                    <div class="crd-ttl">
                        <i class="fas fa-bolt"></i> ${executor.name}
                    </div>
                </div>
                <p class="crd-desc">${executor.desc}</p>
                <div class="crd-cntnt">
                    <div class="info-grid">
                        <div class="info-itm">
                            <div class="info-lbl">Level</div>
                            <div class="info-val">${executor.lvl}</div>
                        </div>
                        <div class="info-itm">
                            <div class="info-lbl">Key System</div>
                            <div class="info-val">${executor.hasKeySystem ? 'Yes' : 'No'}</div>
                        </div>
                        <div class="info-itm">
                            <div class="info-lbl">Verified</div>
                            <div class="info-val">${executor.verified ? 'Yes' : 'No'}</div>
                        </div>
                        <div class="info-itm">
                            <div class="info-lbl">Platforms</div>
                            <div class="info-val">${executor.plat.length}</div>
                        </div>
                    </div>
                    <div class="platforms">
                        ${platformTags}
                    </div>
                    <div class="lst-itm-feats">
                        <div class="feat-ttl">
                            <i class="fas fa-star"></i> Features
                        </div>
                        <div class="feat-lst">
                            ${featureTags}
                        </div>
                    </div>
                </div>
                <div class="lst-itm-acts">
                    <div class="info-val">${executor.editor}</div>
                    <button class="visit-btn" onclick="window.open('${executor.href}', '_blank')">
                        <i class="fas fa-external-link-alt"></i> Visit
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Function to filter executors
    function filterExecutors(filter) {
        let filtered = [...executors];
        if (filter === 'online') {
            filtered = filtered.filter(exec => exec.status === 'online');
        } else if (filter === 'offline') {
            filtered = filtered.filter(exec => exec.status === 'offline');
        } else if (filter === 'free') {
            filtered = filtered.filter(exec => exec.free);
        } else if (filter === 'windows') {
            filtered = filtered.filter(exec => exec.plat.includes('windows'));
        }
        renderExecutors(filtered);
    }

    // Function to search executors
    function searchExecutors(query) {
        if (!query) {
            renderExecutors();
            return;
        }
        const filtered = executors.filter(exec => 
            exec.name.toLowerCase().includes(query.toLowerCase()) ||
            exec.desc.toLowerCase().includes(query.toLowerCase())
        );
        renderExecutors(filtered);
    }

    // Function to copy universal loadstring
    function copyUniversalLoadstring() {
        const loadstring = 'loadstring(game:HttpGet("https://universal-loader.example.com/main.lua"))()';
        navigator.clipboard.writeText(loadstring).then(() => {
            showNotification();
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    // Function to show notification
    function showNotification() {
        const notification = document.getElementById('notification');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    menuOverlay.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Initialize the dashboard
    renderExecutors();

    // Add event listeners
    document.getElementById('universalCopyBtn').addEventListener('click', copyUniversalLoadstring);

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Apply filter
            filterExecutors(this.dataset.filter);
        });
    });

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function() {
        searchExecutors(this.value);
    });
});
