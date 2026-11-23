
(() => {

    // --------------------------------------------------
    // PASSAGES
    // --------------------------------------------------

    const passages = {

        stories: {
            easy: [
                "The little dog ran across the green field. It was happy to see its owner waiting near the old tree.",
                "Emma opened the window and felt the warm morning air. Birds were singing outside, and the sun was shining.",
                "Tom found a small box under his bed. Inside it was a picture of a place he had never seen before.",
                "Every evening, Mia reads a book before going to sleep. Reading helps her relax and imagine new worlds."
            ],
            medium: [
                "The old bookstore stood at the end of a narrow street. Nobody knew exactly when it had opened, but its shelves were full of stories from different generations.",
                "When Daniel arrived at the station, the train had already left. Instead of getting upset, he decided to explore the small town nearby.",
                "A strange noise came from the garden every night. One evening, Lily finally discovered that a family of hedgehogs had made their home beneath the wooden shed.",
                "The museum was almost empty that afternoon. Sarah walked slowly through the rooms, looking at paintings that seemed to tell stories of another time."
            ],
            hard: [
                "Although the village appeared ordinary during the day, its narrow streets transformed after sunset. Lanterns illuminated forgotten doorways, while distant music echoed between the ancient buildings.",
                "For years, nobody had questioned the mysterious lighthouse keeper. Yet, when the storms became unusually frequent, the villagers began to wonder whether he was protecting something rather than guiding ships.",
                "The letter contained no explanation, only a date, a location, and a sentence written in unfamiliar handwriting. Despite her doubts, Amelia knew that ignoring the invitation would leave her wondering forever.",
                "Sometimes the most important discoveries happen accidentally. A researcher searching for an unrelated chemical reaction may uncover a process that changes an entire field of science."
            ]
        },

        quotes: {
            easy: [
                "Small steps can lead to big changes.",
                "Believe in yourself and keep moving forward.",
                "Every day is a new chance to begin again.",
                "Kind words can make a difficult day better."
            ],
            medium: [
                "Success is not always about being the fastest. Sometimes it is about having the patience to continue when everything feels difficult.",
                "You do not have to see the entire staircase. You only need enough courage to take the first step.",
                "The best time to start something meaningful is often before you feel completely ready.",
                "Progress may be invisible at first, but every small effort contributes to something greater."
            ],
            hard: [
                "Discipline is choosing what matters most over what feels comfortable in the moment; consistency is what transforms that decision into a habit.",
                "Do not measure your potential by the distance you have already travelled, but by the possibilities you are still willing to explore.",
                "A meaningful life is rarely built through extraordinary moments alone; it emerges from ordinary decisions repeated with intention.",
                "Confidence does not mean knowing that everything will work perfectly. It means trusting yourself to respond when things do not."
            ]
        },

        travel: {
            easy: [
                "We visited a beautiful city near the sea. The streets were full of cafes, shops, and friendly people.",
                "The mountains were covered in snow. We took many pictures and enjoyed the fresh air.",
                "I love travelling because I can discover new places and meet interesting people.",
                "Our hotel had a small balcony with a wonderful view of the beach."
            ],
            medium: [
                "After a long journey through the mountains, we finally reached a quiet village surrounded by forests and clear rivers.",
                "The local market was full of colourful vegetables, handmade decorations, and traditional food prepared by families from the area.",
                "Although the weather forecast predicted rain, we decided to continue our journey and discovered one of the most beautiful landscapes of the trip.",
                "Every destination has something unique to offer, whether it is its architecture, history, food, or the everyday lives of its residents."
            ],
            hard: [
                "Travelling provides more than temporary entertainment; it challenges familiar assumptions, encourages curiosity, and creates opportunities to understand different cultures.",
                "The narrow coastal road followed the edge of the cliffs, revealing spectacular views of the Mediterranean Sea and small villages hidden between the hills.",
                "Before visiting an unfamiliar country, it is worth learning about local customs, public transportation, regional cuisine, and the historical events that shaped its identity.",
                "Despite the exhausting schedule, the travellers agreed that wandering through unfamiliar streets without a strict plan had produced their most memorable experiences."
            ]
        },

        science: {
            easy: [
                "The Earth moves around the Sun. It takes one year to complete a full journey.",
                "Water is important for every living thing. Plants, animals, and people all need it.",
                "The Moon looks bright at night because it reflects light from the Sun.",
                "Plants use sunlight, water, and carbon dioxide to produce their food."
            ],
            medium: [
                "The human brain contains billions of neurons that communicate through electrical and chemical signals.",
                "Scientists study distant galaxies to understand how the universe formed and how it continues to change over time.",
                "Photosynthesis allows plants to convert light energy into chemical energy, supporting nearly every food chain on Earth.",
                "Renewable energy sources such as wind, solar, and hydropower can help reduce dependence on fossil fuels."
            ],
            hard: [
                "Scientific progress depends on observation, experimentation, reproducibility, and the willingness to revise established explanations when new evidence becomes available.",
                "Quantum mechanics describes physical phenomena at microscopic scales, where particles can exhibit behaviours that differ significantly from everyday experience.",
                "Climate systems involve complex interactions between the atmosphere, oceans, land surfaces, and living organisms, making long-term predictions challenging.",
                "The development of advanced materials requires researchers to understand how microscopic structures influence mechanical, electrical, and thermal properties."
            ]
        },

        tech: {
            easy: [
                "Computers help people work, learn, communicate, and create new things.",
                "A strong password should be difficult for other people to guess.",
                "The internet connects millions of devices around the world.",
                "Programming teaches us how to solve problems step by step."
            ],
            medium: [
                "Software developers use programming languages to build applications that solve problems and improve everyday tasks.",
                "Cloud computing allows users to store information and access services without relying entirely on their own computers.",
                "Artificial intelligence can analyse large amounts of data, recognize patterns, and generate useful predictions.",
                "Cybersecurity protects computer systems, networks, and personal information from unauthorized access."
            ],
            hard: [
                "Modern software architecture emphasizes scalability, maintainability, security, and separation of responsibilities across different application components.",
                "Machine learning algorithms identify patterns in training data, but their reliability depends on data quality, model design, and appropriate evaluation.",
                "A well-designed database uses relationships, constraints, and indexes to maintain data integrity while supporting efficient queries.",
                "As technology evolves, developers must consider not only performance and functionality, but also accessibility, privacy, and the ethical consequences of their decisions."
            ]
        },

        poetry: {
            easy: [
                "The stars are shining in the night, the moon is glowing soft and bright.",
                "A little breeze, a summer day, the clouds are slowly drifting away.",
                "The morning sun begins to rise, painting golden light across the skies.",
                "A quiet dream, a gentle sound, and peaceful moments all around."
            ],
            medium: [
                "Between the silence and the rain, a thousand thoughts begin again. The world moves on, the skies turn blue, and every dawn feels fresh and new.",
                "The river carries stories old, through fields of green and mountains cold. It never asks where it will go, but finds its path through ice and snow.",
                "A distant light beyond the hill reminds us that the world is still full of wonders waiting to be discovered.",
                "When autumn leaves begin to fall, the trees let go of one and all. Yet underneath the frozen ground, new life is waiting to be found."
            ],
            hard: [
                "Beneath the endless evening sky, where fading colours slowly lie, the quiet world begins to breathe, while dreams awaken underneath.",
                "The passage of time leaves invisible marks upon everything it touches; yet, within each forgotten moment, a fragment of beauty continues to exist.",
                "Across the horizon, where twilight dissolves into darkness, the last reflections of daylight remind us that even the longest night eventually gives way to morning.",
                "Perhaps the art of living is not discovering a perfect destination, but learning to appreciate the uncertain roads, unexpected turns, and fleeting moments along the way."
            ]
        }
    };


    // --------------------------------------------------
    // TYPING REMINDERS
    // --------------------------------------------------

    const tips = [

        // ACCURACY
        {
            title: "Accuracy before speed",
            text: "Try to type every character correctly before increasing your speed. Accuracy creates a strong foundation."
        },
        {
            title: "Every character matters",
            text: "Pay attention to punctuation, spaces, and capital letters. Small details make a big difference."
        },
        {
            title: "Slow down when needed",
            text: "If you notice several mistakes, reduce your speed for a moment and focus on clean typing."
        },
        {
            title: "Build precision first",
            text: "Fast typing is useful, but accurate typing is what makes your speed reliable."
        },
        {
            title: "Do not chase perfection",
            text: "Mistakes are a normal part of learning. Notice them, correct your habits, and continue."
        },

        // FINGER TECHNIQUE
        {
            title: "Use all your fingers",
            text: "Practise using the correct fingers for each key. This will help you develop better typing habits."
        },
        {
            title: "Trust your muscle memory",
            text: "Your fingers can learn key positions through repetition. Give them time to remember."
        },
        {
            title: "Keep your wrists relaxed",
            text: "Avoid bending your wrists too much. A relaxed position makes longer practice sessions more comfortable."
        },
        {
            title: "Return to the home row",
            text: "Use the home row as your starting position. It helps your fingers find nearby keys more easily."
        },
        {
            title: "Avoid unnecessary movement",
            text: "Try to keep your hands close to the keyboard and use the fingers responsible for each key."
        },

        // BLIND TYPING
        {
            title: "Look at the screen",
            text: "Avoid looking at your keyboard while typing. Let your fingers learn where each key is located."
        },
        {
            title: "Give your keyboard a break",
            text: "Try not to look down after every mistake. Trust your fingers and keep your eyes on the text."
        },
        {
            title: "Train your sense of position",
            text: "Notice where your fingers are without checking the keyboard. This is an important part of blind typing."
        },
        {
            title: "Eyes on the text",
            text: "Reading ahead while typing can help you prepare for the next few words."
        },

        // RHYTHM AND SPEED
        {
            title: "Find your rhythm",
            text: "Try to maintain a steady typing rhythm instead of rushing through every sentence."
        },
        {
            title: "Speed comes with practice",
            text: "Do not worry too much about your WPM at the beginning. Consistent practice will help you become faster."
        },
        {
            title: "Keep a steady pace",
            text: "A comfortable and consistent pace is often better than typing very quickly and making frequent mistakes."
        },
        {
            title: "Let the rhythm flow",
            text: "Try to make your typing movements smooth and natural instead of pressing each key with unnecessary force."
        },
        {
            title: "Small improvements count",
            text: "Even a small improvement in speed or accuracy is progress worth noticing."
        },

        // PRACTICE AND MOTIVATION
        {
            title: "Stay consistent",
            text: "A few minutes of daily practice can be more effective than one long typing session every week."
        },
        {
            title: "Progress takes repetition",
            text: "Your fingers become more familiar with the keyboard every time you practise."
        },
        {
            title: "One session at a time",
            text: "You do not need to improve everything today. Focus on making this session a little better."
        },
        {
            title: "Mistakes are information",
            text: "Pay attention to the keys you often mistype. Practising those letters will gradually improve your accuracy."
        },
        {
            title: "Challenge yourself gently",
            text: "Choose a difficulty that makes you think without making the exercise frustrating."
        },
        {
            title: "Take a short break",
            text: "If your hands feel tired, pause for a moment. Comfortable practice is better than forcing yourself to continue."
        },
        {
            title: "Celebrate your progress",
            text: "Notice improvements in your accuracy, rhythm, and confidence. Every successful session matters."
        },
        {
            title: "Consistency beats intensity",
            text: "Regular, focused practice builds stronger habits than occasional sessions where you rush."
        },

        // FOCUS
        {
            title: "Stay in the moment",
            text: "Focus on the current sentence instead of worrying about your final WPM score."
        },
        {
            title: "Breathe and relax",
            text: "Take a calm breath before starting. Relaxed hands and a clear mind can improve your typing."
        },
        {
            title: "Read before you type",
            text: "Look slightly ahead in the passage so your brain has time to prepare the next words."
        },
        {
            title: "Keep your attention steady",
            text: "Try to avoid distractions during your session. A short period of focused practice can be very effective."
        },
        {
            title: "Enjoy the process",
            text: "Typing is a skill you develop over time. Focus on learning rather than judging every result."
        },

        // RESULTS AND IMPROVEMENT
        {
            title: "Learn from your heatmap",
            text: "After finishing a session, check which keys caused the most errors. Use that information in your next practice."
        },
        {
            title: "Work on weak keys",
            text: "A few difficult letters may affect your overall accuracy. Give those keys extra attention."
        },
        {
            title: "Compare your progress",
            text: "Look at your previous results to understand how your typing skills are changing over time."
        },
        {
            title: "Accuracy is your foundation",
            text: "Improving accuracy first makes it easier to increase your typing speed later."
        },
        {
            title: "Every round is practice",
            text: "Even a session with many mistakes gives you useful information about what to practise next."
        }
    ];


    // --------------------------------------------------
    // CATEGORY DISPLAY NAMES
    // --------------------------------------------------

    const categoryNames = {
        mix: "DAILY MIX",
        stories: "SHORT STORIES",
        quotes: "WORDS TO KEEP",
        travel: "POSTCARDS",
        science: "CURIOUS MINDS",
        tech: "THE DIGITAL WORLD",
        poetry: "LITTLE POETRY"
    };


    // --------------------------------------------------
    // EXPORT CONTENT
    // --------------------------------------------------

    window.TypeFlowContent = {
        passages,
        tips,
        categoryNames
    };

})();
