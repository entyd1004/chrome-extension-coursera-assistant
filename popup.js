document.addEventListener('DOMContentLoaded', function () {
    var scanButton = document.getElementById('scanButton');
    var saveButton = document.getElementById('saveButton');
    var autoButton = document.getElementById('autoButton');

    chrome.runtime.onMessage.addListener(function (message) {
        if (message.type === 'scanScriptError') {
            document.querySelector('.main').innerHTML += `<div class="alert alert-warning" role="alert" id="scanInfo"><i class="fa fa-times mr-2"></i>SCAN QUESTIONS FAILED!</div>`;
        } else if (message.type === 'scanScriptSuccess') {
            document.querySelector('.main').innerHTML += `<div class="alert alert-warning" role="alert" id="scanInfo"><i class="fa fa-check mr-2"></i>SCAN SUCCESSFULL <strong>${message.numQuestions}</strong> QUESTIONS!</div>`;
        } else if (message.type === 'saveScriptError') {
            document.querySelector('.main').innerHTML += `<div class="alert alert-warning" role="alert" id="scanInfo"><i class="fa fa-times mr-2"></i>SAVE QUIZ FAILED!</div>`;
        } else if (message.type === 'saveScriptSuccess') {
            document.querySelector('.main').innerHTML += `<div class="alert alert-warning" role="alert" id="scanInfo"><i class="fa fa-check mr-2"></i>SAVE QUIZ SUCCESSFULL!</div>`;
        } else if (message.type === 'autoGradeScriptError') {
            document.querySelector('.main').innerHTML += `<div class="alert alert-warning" role="alert" id="scanInfo"><i class="fa fa-times mr-2"></i>AUTO GRADE FAILED!</div>`;
        } else if (message.type === 'autoGradeScriptSuccess') {
            document.querySelector('.main').innerHTML += `<div class="alert alert-warning" role="alert" id="scanInfo"><i class="fa fa-check mr-2"></i>AUTO GRADE SUCCESSFULL!</div>`;
        }
    });

    scanButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentTab = tabs[0];
            var currentUrl = currentTab.url;

            if (currentUrl.includes('coursera.org')) {
                chrome.tabs.executeScript(currentTab.id, { file: 'scanquestions.js' });
            } else {
                document.querySelector('.main').innerHTML += `<div class="alert alert-warning" role="alert" id="scanInfo"><i class="fa fa-times mr-2"></i>This is not a Coursera page. Please go to a Coursera course page and try again.</div>`;
            }
        });
    });

    saveButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentTab = tabs[0];
            var currentUrl = currentTab.url;

            if (currentUrl.includes('coursera.org')) {
                chrome.tabs.executeScript(currentTab.id, { file: 'savequestions.js' });
            } else {
                document.querySelector('.main').innerHTML += `<div class="alert alert-warning" role="alert" id="scanInfo"><i class="fa fa-times mr-2"></i>This is not a Coursera page. Please go to a Coursera course page and try again.</div>`;
            }
        });
    });

    autoButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentTab = tabs[0];
            var currentUrl = currentTab.url;

            if (currentUrl.includes('coursera.org')) {
                chrome.tabs.executeScript(currentTab.id, { file: 'autograde.js' });
            } else {
                document.querySelector('.main').innerHTML += `<div class="alert alert-warning" role="alert" id="scanInfo"><i class="fa fa-times mr-2"></i>This is not a Coursera page. Please go to a Coursera course page and try again.</div>`;
            }
        });
    });
});
