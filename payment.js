document.addEventListener('DOMContentLoaded', function() {
    // Get affiliate info from URL parameters 
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateParam = urlParams.get('ref');
    
    if (affiliateParam) {
        // Decode and split the affiliate parameter
        const decodedParam = decodeURIComponent(affiliateParam);
        const affiliateName = decodedParam.split('_').join(' ');
        
        // Show affiliate section and update name
        const affiliateSection = document.querySelector('.affiliate-section');
        const affiliateNameSpan = document.getElementById('affiliateName');
        
        if (affiliateSection && affiliateNameSpan) {
            affiliateSection.style.display = 'block';
            affiliateNameSpan.textContent = affiliateName;
        }
    }

    // Add to existing form data when storing/submitting
    const storeFormData = (formData) => {
        formData.affiliate = affiliateParam || '';
        return formData;
    };

    // Valid Nigerian states
    const validStates = [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
        "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", 
        "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", 
        "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", 
        "Yobe", "Zamfara"
    ];

    // LGA data - Example for a few states (can be expanded)
    const lgaData = {
        "Kaduna": ["Chikun", "Igabi", "Kaduna North", "Kaduna South", "Kajuru", "Kachia", "Zaria", "Sabon Gari", "Giwa"],
        "Lagos": ["Alimosho", "Ajeromi-Ifelodun", "Kosofe", "Mushin", "Oshodi-Isolo", "Ojo", "Ikorodu", "Surulere", "Agege", "Ifako-Ijaiye"],
        "FCT": ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"]
        // Add more states and their LGAs as needed
    };

    // Get package details from URL parameters
    const packageParam = urlParams.get('package');
    const amount = urlParams.get('amount');

    // Update package details in the UI
    document.getElementById('packageName').textContent = packageParam || 'Foundation Package';
    document.getElementById('packagePrice').textContent = amount ? `₦${Number(amount).toLocaleString()}` : '₦5,000';

    const paymentForm = document.getElementById('paymentForm');
    const paymentButton = document.getElementById('paymentButton');
    const tokenButton = document.getElementById('tokenButton');
    const stateInput = document.getElementById('state');
    const lgaInput = document.getElementById('lga');
    
    // State input validation and autocomplete
    stateInput.addEventListener('input', function(e) {
        const value = e.target.value;
        const matchingState = validStates.find(state => 
            state.toLowerCase() === value.toLowerCase()
        );
        
        if (matchingState) {
            e.target.value = matchingState; // Normalize state name
            e.target.classList.remove('invalid');
            // Enable LGA input when valid state is entered
            lgaInput.disabled = false;
        } else {
            e.target.classList.add('invalid');
            lgaInput.disabled = true;
        }
        
        validateForm();
    });

    // LGA input validation
    lgaInput.addEventListener('input', function(e) {
        const state = stateInput.value;
        const lga = e.target.value;
        
        if (lgaData[state] && lgaData[state].some(validLga => 
            validLga.toLowerCase() === lga.toLowerCase()
        )) {
            e.target.classList.remove('invalid');
        } else {
            e.target.classList.add('invalid');
        }
        
        validateForm();
    });

    // Function to validate form
    function validateForm() {
        const fullName = document.getElementById('fullName').value.trim();
        const state = document.getElementById('state').value.trim();
        const lga = document.getElementById('lga').value.trim();
        const phone = document.getElementById('phone').value.trim();

        // Validate name (minimum 3 characters)
        const isValidName = fullName.length >= 3;

        // Validate state (must be in valid states list)
        const isValidState = validStates.includes(state);

        // Validate LGA (must be at least 3 characters)
        const isValidLGA = lga.length >= 3;

        // Validate phone (must be valid phone format)
        const isValidPhone = /^\+?[\d\s-]{10,}$/.test(phone);

        const isValid = isValidName && isValidState && isValidLGA && isValidPhone;

        // Update button states with animation
        const paymentButton = document.getElementById('paymentButton');
        const tokenButton = document.getElementById('tokenButton');

        if (isValid) {
            paymentButton.classList.add('active');
            tokenButton.classList.add('active');
            
            // Add highlighting animation
            paymentButton.style.animation = 'highlight-buttons 1s ease infinite alternate';
            tokenButton.style.animation = 'highlight-buttons 1s ease infinite alternate';
        } else {
            paymentButton.classList.remove('active');
            tokenButton.classList.remove('active');
            
            // Remove highlighting animation
            paymentButton.style.animation = '';
            tokenButton.style.animation = '';
        }

        return isValid;
    }

    // Add event listeners to all form fields
    const formFields = ['fullName', 'state', 'lga', 'phone'];
    formFields.forEach(fieldId => {
        document.getElementById(fieldId).addEventListener('input', validateForm);
    });

    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            alert('Please fill in all required fields correctly');
            return;
        }

        // Store form data before submission
        const formData = {
            package: packageParam,
            fullName: document.getElementById('fullName').value,
            state: document.getElementById('state').value,
            lga: document.getElementById('lga').value,
            phone: document.getElementById('phone').value,
            amount: amount
        };
        const storedFormData = storeFormData(formData);
        sessionStorage.setItem('paymentFormData', JSON.stringify(storedFormData));

        // Continue with payment processing...
        const handler = PaystackPop.setup({
            key: 'your_paystack_public_key', // Replace with actual public key
            email: `${document.getElementById('phone').value}@noemail.com`,
            amount: amount * 100, // Convert to kobo
            currency: 'NGN',
            ref: 'ENS'+Math.floor((Math.random() * 1000000000) + 1),
            metadata: {
                custom_fields: [
                    {
                        display_name: "Full Name",
                        variable_name: "full_name",
                        value: document.getElementById('fullName').value
                    },
                    {
                        display_name: "State",
                        variable_name: "state",
                        value: document.getElementById('state').value
                    },
                    {
                        display_name: "LGA",
                        variable_name: "lga",
                        value: document.getElementById('lga').value
                    },
                    {
                        display_name: "Phone",
                        variable_name: "phone",
                        value: document.getElementById('phone').value
                    },
                    {
                        display_name: "Package",
                        variable_name: "package",
                        value: packageParam
                    }
                ]
            },
            callback: function(response) {
                window.location.href = `success.html?reference=${response.reference}`;
            },
            onClose: function() {
                alert('Payment window closed. Please try again if you wish to complete your payment.');
            }
        });
        
        handler.openIframe();
    });

    // Add token button handler
    tokenButton.addEventListener('click', function() {
        showTokenModal();
    });

    function validateChannelLinks(channel1Link, channel2Link) {
        // Clean and normalize the links to handle variations
        function normalizeUrl(url) {
            return url.trim()
                .toLowerCase()
                .replace('https://', '')
                .replace('www.', '')
                .replace(/\/$/, '')
                .replace('youtube.com/', '')
                .replace('@', '');
        }

        const ensaasmoExpected = "ensaasmo";
        const yigiExpected = "yigi_impact";

        const channel1Normalized = normalizeUrl(channel1Link);
        const channel2Normalized = normalizeUrl(channel2Link);

        const isEnsaasmoValid = channel1Normalized.includes(ensaasmoExpected);
        const isYigiValid = channel2Normalized.includes(yigiExpected);

        return isEnsaasmoValid && isYigiValid;
    }

    function showTokenModal() {
        const tokenForm = document.createElement('div');
        tokenForm.className = 'token-form';
        tokenForm.innerHTML = `
            <div class="token-overlay"></div>
            <div class="token-modal">
                <button class="close-modal">×</button>
                <div class="token-wrapper">
                    <div class="token-header">
                        <i class="fas fa-id-card"></i>
                        <h3>Access with PVC</h3>
                        <p>Follow these steps to verify your voter eligibility</p>
                    </div>
                    <div class="youtube-steps">
                        <p class="step-label">1. Subscribe to these YouTube channels:</p>
                        <div class="channel-links">
                            <a href="https://youtube.com/@ensaasmo?si=hbQtrErjC_o-5Sq4" target="_blank" class="channel-link" id="ensaasmoButton">
                                <i class="fab fa-youtube"></i>
                                ENSAASMO
                            </a>
                            <a href="https://youtube.com/@yigi_impact?si=24Z2MPK3kJy0rzux" target="_blank" class="channel-link" id="yigiButton">
                                <i class="fab fa-youtube"></i>
                                YIGI
                            </a>
                        </div>
                        <p class="step-label">2. Copy and paste the links below to verify:</p>
                        <div class="channel-inputs">
                            <div class="input-group">
                                <label>ENSAASMO Channel Link:</label>
                                <input type="text" class="channel-input" id="channel1Input" placeholder="Paste ENSAASMO channel link here">
                            </div>
                            <div class="input-group" style="margin-top: 1.5rem;">
                                <label>YIGI Channel Link:</label>
                                <input type="text" class="channel-input" id="channel2Input" placeholder="Paste YIGI channel link here">
                            </div>
                        </div>
                        <button type="button" class="verify-channels-btn">
                            <i class="fas fa-check"></i> Verify Subscriptions
                        </button>
                    </div>
                    <div class="token-input-group" style="opacity: 0.5; pointer-events: none;">
                        <label for="pvcInput">PVC ID Number</label>
                        <input type="text" id="pvcInput" placeholder="Enter your PVC ID number" class="token-input" maxlength="19">
                        <div class="input-hint">Format: 1234-5678-9012-3456</div>
                    </div>
                    <div class="token-notice">
                        <i class="fas fa-shield-alt"></i>
                        <p>Please ensure you enter a valid PVC ID number and subscribe to both channels. This helps us verify your eligibility.</p>
                    </div>
                    <button type="button" class="verify-token-btn" style="opacity: 0.5; pointer-events: none;">
                        <i class="fas fa-check-circle"></i> Access Assessment
                    </button>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .token-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(8px);
                z-index: 1000;
            }
            
            .token-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 1.5rem;
                box-shadow: 0 25px 50px rgba(0, 32, 96, 0.25);
                z-index: 1001;
                width: 95%;
                max-width: 800px;
                max-height: 95vh;
                overflow: hidden;
            }
            
            .token-wrapper {
                padding: 3rem;
                max-height: 95vh;
                overflow-y: auto;
                padding-bottom: 9rem;
                scrollbar-width: thin;
                scrollbar-color: var(--accent) #f1f5f9;
            }
            
            .token-wrapper::-webkit-scrollbar {
                width: 8px;
            }
            
            .token-wrapper::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 4px;
            }
            
            .token-wrapper::-webkit-scrollbar-thumb {
                background: var(--accent);
                border-radius: 4px;
            }
            
            .token-wrapper::-webkit-scrollbar-thumb:hover {
                background: var(--neon);
            }

            .close-modal {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                background: #f1f5f9;
                border: none;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                font-size: 1.5rem;
                color: #64748b;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1002;
            }
            
            .close-modal:hover {
                background: #e2e8f0;
                color: #0f172a;
                transform: rotate(90deg);
            }
            
            .token-header {
                text-align: center;
                margin-bottom: 3rem;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(14, 165, 233, 0.1);
                background: linear-gradient(to bottom, rgba(14, 165, 233, 0.05), transparent);
            }
            
            .token-header i {
                font-size: 3.5rem;
                color: var(--accent);
                margin-bottom: 1.5rem;
                display: block;
                animation: cardFlip 1.5s ease infinite alternate;
            }
            
            .token-header h3 {
                font-size: 2.5rem;
                margin: 1rem 0;
                background: linear-gradient(135deg, var(--accent), var(--neon));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .token-header p {
                color: #64748b;
                font-size: 1.1rem;
            }
            
            .youtube-steps {
                background: rgba(14, 165, 233, 0.03);
                border-radius: 1.5rem;
                padding: 2.5rem;
                margin-bottom: 3rem;
                border: 1px solid rgba(14, 165, 233, 0.1);
            }

            .step-label {
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 1.5rem;
                font-size: 1.1rem;
            }

            .channel-links {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
                margin-bottom: 3rem;
            }

            .channel-link {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.25rem 1.5rem;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 1rem;
                color: #ff0000;
                text-decoration: none;
                font-weight: 500;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }

            .channel-link:hover {
                background: #fff5f5;
                border-color: #ff0000;
                transform: translateY(-3px);
                box-shadow: 0 8px 15px rgba(255, 0, 0, 0.1);
            }

            .channel-link i {
                font-size: 1.5rem;
            }

            .channel-inputs {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
                margin: 1.5rem 0;
            }

            .input-group {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .input-group label {
                font-weight: 500;
                color: #1e293b;
                font-size: 0.95rem;
            }

            .channel-input {
                width: 100%;
                padding: 1rem 1.25rem;
                border: 1px solid #e2e8f0;
                border-radius: 0.75rem;
                font-size: 0.95rem;
                transition: all 0.3s ease;
                background: white;
            }

            .channel-input:focus {
                border-color: var(--accent);
                outline: none;
                box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
            }
            
            .token-input-group {
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 1.5rem;
                padding: 2.5rem;
                margin: 2.5rem 0;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }

            .token-input-group label {
                display: block;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }

            .token-input {
                width: 100%;
                padding: 1.25rem;
                border: 2px solid #e2e8f0;
                border-radius: 1rem;
                font-size: 1.2rem;
                font-family: monospace;
                letter-spacing: 2px;
                margin-bottom: 0.75rem;
                transition: all 0.3s ease;
                background: #f8fafc;
            }

            .token-input:focus {
                border-color: var(--accent);
                outline: none;
                box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
                background: white;
            }

            .input-hint {
                font-size: 0.9rem;
                color: #64748b;
                text-align: right;
            }
            
            .token-notice {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                padding: 1.5rem;
                background: rgba(14, 165, 233, 0.05);
                border: 1px solid rgba(14, 165, 233, 0.1);
                border-radius: 1rem;
                margin: 2rem 0;
            }

            .token-notice i {
                color: var(--accent);
                font-size: 1.2rem;
                margin-top: 0.2rem;
            }

            .token-notice p {
                font-size: 0.95rem;
                line-height: 1.5;
                color: #475569;
                margin: 0;
            }
            
            .verify-token-btn {
                width: 100%;
                max-width: 400px;
                margin: 3rem auto 4rem;
                display: block;
                padding: 1.25rem;
                background: linear-gradient(135deg, var(--accent), var(--neon));
                color: white;
                border: none;
                border-radius: 1rem;
                font-weight: 600;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.75rem;
                box-shadow: 0 4px 6px rgba(14, 165, 233, 0.2);
                position: relative;
                bottom: 0;
            }

            .verify-token-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 30px rgba(14, 165, 233, 0.3);
            }

            .verify-token-btn i {
                font-size: 1.3rem;
            }

            @keyframes cardFlip {
                from { transform: rotateY(0deg); }
                to { transform: rotateY(180deg); }
            }

            @media (max-width: 640px) {
                .token-modal {
                    width: 95%;
                }

                .token-wrapper {
                    padding: 2rem 1.5rem;
                }

                .token-header h3 {
                    font-size: 1.8rem;
                }

                .channel-links,
                .channel-inputs {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                .token-input-group {
                    padding: 1.5rem;
                }
            }
        `;

        document.head.appendChild(style);
        
        document.body.appendChild(tokenForm);
        
        const pvcInput = document.getElementById('pvcInput');
        pvcInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join('-');
            }
            e.target.value = value;

            // Enable and highlight access button when PVC is fully entered
            const accessBtn = tokenForm.querySelector('.verify-token-btn');
            if (value.length === 19) { // Full PVC number entered
                accessBtn.style.opacity = '1';
                accessBtn.style.pointerEvents = 'auto';
                accessBtn.style.animation = 'highlight-button 1s ease';
                accessBtn.style.transform = 'scale(1.05)';
                accessBtn.style.boxShadow = '0 0 20px rgba(14, 165, 233, 0.3)';
            } else {
                accessBtn.style.opacity = '0.5';
                accessBtn.style.pointerEvents = 'none';
                accessBtn.style.animation = 'none';
                accessBtn.style.transform = 'none';
                accessBtn.style.boxShadow = 'none';
            }
        });

        let ensaasmoClicked = false;
        let yigiClicked = false;

        const ensaasmoButton = tokenForm.querySelector('#ensaasmoButton');
        const yigiButton = tokenForm.querySelector('#yigiButton');

        ensaasmoButton.addEventListener('click', () => {
            ensaasmoClicked = true;
            ensaasmoButton.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            ensaasmoButton.style.borderColor = '#ff0000';
        });

        yigiButton.addEventListener('click', () => {
            yigiClicked = true;
            yigiButton.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            yigiButton.style.borderColor = '#ff0000';
        });

        tokenForm.querySelector('.verify-channels-btn').addEventListener('click', function() {
            const channel1Link = document.getElementById('channel1Input').value.trim();
            const channel2Link = document.getElementById('channel2Input').value.trim();

            if (!channel1Link || !channel2Link) {
                alert('Please paste both YouTube channel subscription links');
                return;
            }

            if (!ensaasmoClicked || !yigiClicked) {
                alert('Please visit both YouTube channels by clicking the buttons above');
                return;
            }

            // Verify the links are correct
            if (!validateChannelLinks(channel1Link, channel2Link)) {
                alert('Please make sure you have copied the correct YouTube channel links');
                return;
            }

            // Verification success - update UI
            this.innerHTML = '<i class="fas fa-check"></i> Verified!';
            this.style.backgroundColor = '#10b981';
            this.disabled = true;

            // Enable PVC input section
            const pvcSection = tokenForm.querySelector('.token-input-group');
            pvcSection.style.opacity = '1';
            pvcSection.style.pointerEvents = 'auto';
            pvcSection.style.animation = 'highlight-section 1s ease';
            pvcSection.style.border = '2px solid var(--accent)';
            pvcSection.style.boxShadow = '0 0 15px rgba(14, 165, 233, 0.2)';
        });

        const newStyles = `
            @keyframes highlight-section {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }

            @keyframes highlight-button {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1.05); }
            }

            .verify-channels-btn {
                width: 100%;
                padding: 1rem;
                margin: 1.5rem 0;
                background: var(--accent);
                color: white;
                border: none;
                border-radius: 0.75rem;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.75rem;
            }

            .verify-channels-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(14, 165, 233, 0.2);
            }

            .channel-inputs {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
                margin: 1.5rem 0;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = newStyles;
        document.head.appendChild(styleSheet);

        const verifyBtn = tokenForm.querySelector('.verify-token-btn');
        verifyBtn.addEventListener('click', function() {
            const channel1Link = document.getElementById('channel1Input').value.trim();
            const channel2Link = document.getElementById('channel2Input').value.trim();
            const pvcNumber = document.getElementById('pvcInput').value.trim();

            if (!channel1Link || !channel2Link) {
                alert('Please paste both YouTube channel subscription links');
                return;
            }

            if (!pvcNumber || pvcNumber.length < 19) {
                alert('Please enter a valid PVC ID number');
                return;
            }

            window.location.href = `success.html?reference=PVC-${pvcNumber}`;
        });

        const closeBtn = tokenForm.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            tokenForm.remove();
        });

        const overlay = tokenForm.querySelector('.token-overlay');
        overlay.addEventListener('click', function() {
            tokenForm.remove();
        });
    }
});