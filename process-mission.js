// process-mission.js

(function() {
    'use strict';

    // Function to process mission
    function processMission(mission) {
        // Open mission URL in a new tab
        const missionTab = window.open(mission.url, '_blank');

        // Delayed actions on the mission tab
        missionTab.onload = function() {
            // Click the subscribe button after a delay
            setTimeout(() => {
                const subscribeButton = missionTab.document.querySelector('button.subscribe-button');
                if (subscribeButton) {
                    subscribeButton.click();
                }
            }, 3000); // Adjust delay as needed

            // Inject mission number into the page
            setTimeout(() => {
                const missionNumberElement = missionTab.document.createElement('div');
                missionNumberElement.id = 'missionElement';
                missionNumberElement.textContent = `M-${mission.mission}`;
                missionNumberElement.style.backgroundColor = 'white';
                missionNumberElement.style.color = 'black';
                missionNumberElement.style.padding = '10px';
                missionNumberElement.style.position = 'absolute';
                missionNumberElement.style.top = '50px';
                missionNumberElement.style.left = '50px';
                missionTab.document.body.appendChild(missionNumberElement);
            }, 5000); // Adjust delay as needed
        };
    }

    // Make an XMLHttpRequest to fetch missions
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/missions', true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const mission = JSON.parse(xhr.responseText);
            processMission(mission);
        } else {
            console.error('Failed to fetch mission:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Network error occurred');
    };
    xhr.send();
})();
