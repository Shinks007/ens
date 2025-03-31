document.addEventListener('DOMContentLoaded', function() {
    // Questions array with descriptions
    const allQuestions = [
        // Sales and Marketing Skills (1-14)
        {q: "Sales Planning", d: "Developing strategies to reach sales targets", s: "Sales & Marketing Expertise"},
        {q: "Pricing", d: "Understanding how to set prices that maximize profits while remaining competitive", s: "Sales & Marketing Expertise"},
        {q: "Negotiating", d: "Securing favorable terms and conditions in deals", s: "Sales & Marketing Expertise"},
        {q: "Customer Service Follow-Up", d: "Maintaining relationships with customer's post-sale to ensure satisfaction and repeat business", s: "Sales & Marketing Expertise"},
        {q: "Managing Other Sales Reps", d: "Leading and motivating a sales team to achieve targets", s: "Sales & Marketing Expertise"},
        {q: "Tracking Competitors", d: "Staying informed about competitor activities to strategize accordingly", s: "Sales & Marketing Expertise"},
        {q: "Buying", d: "Knowing how to procure goods and services at the best price and quality", s: "Sales & Marketing Expertise"},
        {q: "Marketing Strategies", d: "Developing comprehensive plans to reach potential customers", s: "Sales & Marketing Expertise"},
        {q: "Advertising/Promotion/Public Relations", d: "Creating awareness and interest in the product/service", s: "Sales & Marketing Expertise"},
        {q: "Advertising Copywriting", d: "Crafting compelling messages to attract customers", s: "Sales & Marketing Expertise"},
        {q: "Annual Marketing Plans", d: "Setting long-term marketing goals and strategies", s: "Sales & Marketing Expertise"},
        {q: "Media Planning and Buying", d: "Allocating budget across various media channels effectively", s: "Sales & Marketing Expertise"},
        {q: "Distribution Channel Planning", d: "Determining the best ways to get products to customers", s: "Sales & Marketing Expertise"},
        {q: "Packaging", d: "Designing product packaging that attracts and informs customers", s: "Sales & Marketing Expertise"},
        
        // Financial Skills (15-22)
        {q: "Cash Flow Planning", d: "Managing the inflow and outflow of money to ensure liquidity", s: "Financial Management"},
        {q: "Management of Credit Lines", d: "Efficiently managing credit to support business operations", s: "Financial Management"},
        {q: "Budgeting", d: "Creating and managing financial plans for business operations", s: "Financial Management"},
        {q: "Cost Control", d: "Identifying and managing expenses to optimize profitability", s: "Financial Management"},
        {q: "Financial Reporting", d: "Preparing and analyzing financial statements for informed decision-making", s: "Financial Management"},
        {q: "Tax Planning", d: "Minimizing tax liabilities through strategic planning", s: "Financial Management"},
        {q: "Insurance and Risk Management", d: "Protecting business assets through insurance and risk assessment", s: "Financial Management"},
        {q: "Compliance and Regulatory Affairs", d: "Ensuring adherence to laws, regulations, and industry standards", s: "Financial Management"},
        
        // Intangible Skills (23-30)
        {q: "Human Resources Management", d: "Attracting, retaining, and developing a high-performing team", s: "Intangible Skills"},
        {q: "Performance Management", d: "Setting goals, monitoring progress, and evaluating employee performance", s: "Intangible Skills"},
        {q: "Training and Development", d: "Providing opportunities for employee growth and skill development", s: "Intangible Skills"},
        {q: "Leadership and Team Management", d: "Inspiring and guiding teams to achieve business objectives", s: "Intangible Skills"},
        {q: "Communication and Interpersonal Skills", d: "Effectively interacting with stakeholders, including employees, customers, and partners", s: "Intangible Skills"},
        {q: "Strategic Thinking", d: "Long-term planning and vision", s: "Intangible Skills"},
        {q: "Resilience", d: "Overcoming challenges and bouncing back from difficulties", s: "Intangible Skills"},
        {q: "Risk Management", d: "Identifying, assessing, and mitigating risks", s: "Intangible Skills"},
        
        // Personal Skills (31-36)
        {q: "Personal Skills Development", d: "Continuous self-improvement and skill enhancement", s: "Personal Skills"},
        {q: "Ability to Work Long and Hard", d: "Dedication and perseverance", s: "Personal Skills"},
        {q: "Ability to Manage Risk and Stress", d: "Handling uncertainty and pressure well", s: "Personal Skills"},
        {q: "Ability to Deal with Failure", d: "Resilience in the face of setbacks", s: "Personal Skills"},
        {q: "Ability to Work Alone", d: "Independence and self-motivation", s: "Personal Skills"},
        {q: "Family Support", d: "Having a supportive personal life", s: "Personal Skills"},
        
        // Communication and Collaboration Skills (37-42)
        {q: "Stakeholder Communication", d: "Keeping all parties informed and aligned", s: "Communication & Collaboration"},
        {q: "Oral Presentation Skills", d: "Effectively presenting ideas verbally", s: "Communication & Collaboration"},
        {q: "Written Communication Skills", d: "Clear and concise written communication", s: "Communication & Collaboration"},
        {q: "Ability to Work with and Manage Others", d: "Effective teamwork and leadership", s: "Communication & Collaboration"},
        {q: "Organizational Skills", d: "Keeping tasks and teams organized", s: "Communication & Collaboration"},
        {q: "Computer Skills", d: "Proficiency with digital tools for collaboration", s: "Communication & Collaboration"},
        
        // Design Thinking Skills (43-55)
        {q: "Understanding Customer Needs", d: "Deep understanding of customer pain points and desires", s: "Design Thinking"},
        {q: "User Research", d: "Gathering qualitative and quantitative data about users", s: "Design Thinking"},
        {q: "Interviewing Skills", d: "Conducting effective interviews to gather insights", s: "Design Thinking"},
        {q: "Observation Skills", d: "Analyzing user behavior in their natural environment", s: "Design Thinking"},
        {q: "Creative Problem-Solving", d: "Developing innovative solutions", s: "Design Thinking"},
        {q: "Time Management", d: "Prioritizing tasks and managing time effectively", s: "Design Thinking"},
        {q: "Leadership Skills", d: "Inspiring and guiding teams to achieve goals", s: "Design Thinking"},
        {q: "Communication Skills", d: "Effective interaction across all channels", s: "Design Thinking"},
        {q: "Strategic Thinking", d: "Long-term vision and planning", s: "Design Thinking"},
        {q: "Adaptability", d: "Flexible response to changing circumstances", s: "Design Thinking"},
        {q: "Risk Management", d: "Evaluating and mitigating potential risks", s: "Design Thinking"},
        {q: "Data Analysis", d: "Interpreting data to inform decisions", s: "Design Thinking"},
        {q: "Digital Literacy", d: "Understanding and leveraging technology", s: "Design Thinking"},
        
        // Administrative and Operational Skills (56-62)
        {q: "Networking", d: "Building and maintaining professional relationships", s: "Administrative & Operational"},
        {q: "Public Speaking", d: "Delivering impactful presentations", s: "Administrative & Operational"},
        {q: "Team Management", d: "Leading and coordinating team efforts", s: "Administrative & Operational"},
        {q: "Conflict Resolution", d: "Managing and resolving workplace disputes", s: "Administrative & Operational"},
        {q: "Change Management", d: "Guiding organizational transformation", s: "Administrative & Operational"},
        {q: "Stakeholder Management", d: "Managing relationships with all stakeholders", s: "Administrative & Operational"},
        {q: "Benefits Administration", d: "Overseeing employee benefits programs", s: "Administrative & Operational"}
    ];

    // Function to shuffle array
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    // Shuffle the allQuestions array
    const shuffledQuestions = shuffle([...allQuestions]);

    // Generate questions with descriptions
    const form = document.getElementById('assessmentForm');
    
    shuffledQuestions.forEach((question, index) => {
        const questionBlock = createQuestionBlock(index + 1, question.q, question.d);
        form.appendChild(questionBlock);
    });

    // Add enhanced submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'submit-assessment-btn';
    submitButton.innerHTML = `
        <span class="btn-content">
            <i class="fas fa-chart-bar"></i>
            <span>Get Your Results</span>
        </span>
        <div class="btn-background"></div>
    `;
    
    // Add button styles
    const buttonStyles = document.createElement('style');
    buttonStyles.textContent = `
        .submit-assessment-btn {
            position: relative;
            width: 100%;
            max-width: 400px;
            margin: 3rem auto;
            padding: 1.25rem 2.5rem;
            font-size: 1.2rem;
            font-weight: 600;
            color: white;
            background: linear-gradient(135deg, var(--accent), var(--neon));
            border: none;
            border-radius: 1rem;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3);
            display: block;
        }

        .submit-assessment-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(14, 165, 233, 0.4);
        }

        .submit-assessment-btn:active {
            transform: translateY(1px);
        }

        .btn-content {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }

        .btn-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--neon), var(--accent));
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .submit-assessment-btn:hover .btn-background {
            opacity: 1;
        }

        .submit-assessment-btn i {
            font-size: 1.4rem;
            transition: transform 0.3s ease;
        }

        .submit-assessment-btn:hover i {
            transform: rotate(15deg);
        }
    `;
    document.head.appendChild(buttonStyles);
    form.appendChild(submitButton);

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            alert('Please answer all questions before submitting.');
            return;
        }

        const results = calculateResults();
        sessionStorage.setItem('assessmentResults', JSON.stringify(results));
        window.location.href = 'assessment-results.html';
    });

    function createQuestionBlock(number, text, description) {
        const div = document.createElement('div');
        div.className = 'question-block';
        div.innerHTML = `
            <h4>${number}. ${text}</h4>
            <p>${description}</p>
            <div class="rating-scale">
                ${[1,2,3,4,5].map(value => `
                    <label>
                        <input type="radio" name="q${number}" value="${value}" required>
                        <span>${value}</span>
                    </label>
                `).join('')}
            </div>
        `;
        return div;
    }

    function validateForm() {
        const totalQuestions = 62;
        for (let i = 1; i <= totalQuestions; i++) {
            if (!form.querySelector(`input[name="q${i}"]:checked`)) {
                return false;
            }
        }
        return true;
    }

    function calculateResults() {
        const sectionRanges = [
            { 
                name: "Sales & Marketing Expertise", 
                start: 1, 
                end: 14,
                assessments: {
                    low: { max: 28, text: "Lack of sales and marketing skills" },
                    medium: { max: 49, text: "On the verge of being ready, but needs improvement" },
                    high: { text: "Possesses sales and marketing skills, but needs to stay up-to-date" }
                }
            },
            { 
                name: "Financial Management", 
                start: 15, 
                end: 22,
                assessments: {
                    low: { max: 16, text: "Lack of financial skills" },
                    medium: { max: 28, text: "On the verge of attaining financial skills" },
                    high: { text: "Possesses financial skills, but needs to stay up-to-date" }
                }
            },
            { 
                name: "Intangible Skills", 
                start: 23, 
                end: 30,
                assessments: {
                    low: { max: 16, text: "Lack of intangible skills" },
                    medium: { max: 28, text: "On the verge of attaining intangible skills" },
                    high: { text: "Possesses intangible skills, but needs to stay up-to-date" }
                }
            },
            { 
                name: "Personal Skills", 
                start: 31, 
                end: 36,
                assessments: {
                    low: { max: 12, text: "Lack of personal skills" },
                    medium: { max: 21, text: "On the verge of attaining personal skills" },
                    high: { text: "Possesses personal skills" }
                }
            },
            { 
                name: "Communication & Collaboration", 
                start: 37, 
                end: 42,
                assessments: {
                    low: { max: 12, text: "Lack of communication and collaboration skills" },
                    medium: { max: 21, text: "On the verge of attaining communication and collaboration skills" },
                    high: { text: "Possesses communication and collaboration skills, but needs to stay up-to-date" }
                }
            },
            { 
                name: "Design Thinking", 
                start: 43, 
                end: 55,
                assessments: {
                    low: { max: 26, text: "Lack of design thinking skills" },
                    medium: { max: 45, text: "On the verge of attaining design thinking skills" },
                    high: { text: "Possesses design thinking skills, but needs to stay up-to-date" }
                }
            },
            { 
                name: "Administrative & Operational", 
                start: 56, 
                end: 62,
                assessments: {
                    low: { max: 14, text: "Lack of administrative and operational skills" },
                    medium: { max: 24, text: "On the verge of attaining administrative and operational skills" },
                    high: { text: "Possesses administrative and operational skills, but needs to stay up-to-date" }
                }
            }
        ];

        const results = {
            sections: sectionRanges.map(section => {
                let sectionScore = 0;
                const maxPossible = (section.end - section.start + 1) * 5;
                
                for (let i = section.start; i <= section.end; i++) {
                    const answer = parseInt(form.querySelector(`input[name="q${i}"]:checked`).value);
                    sectionScore += answer;
                }
                
                // Determine assessment level
                let assessment;
                if (sectionScore < section.assessments.low.max) {
                    assessment = section.assessments.low.text;
                } else if (sectionScore < section.assessments.medium.max) {
                    assessment = section.assessments.medium.text;
                } else {
                    assessment = section.assessments.high.text;
                }
                
                return {
                    name: section.name,
                    score: sectionScore,
                    maxScore: maxPossible,
                    percentage: (sectionScore / maxPossible) * 100,
                    assessment: assessment
                };
            }),
            totalScore: 0,
            maxPossibleScore: 62 * 5
        };

        results.sections.forEach(section => {
            results.totalScore += section.score;
        });

        results.percentage = (results.totalScore / results.maxPossibleScore) * 100;

        return results;
    }
});