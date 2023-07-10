try {
    // Get the title
    var header = '';
    header = document.querySelector('h1[data-e2e="HeaderLeft__header"]').textContent != null ? document.querySelector('h1[data-e2e="HeaderLeft__header"]').textContent : '';

    // Get subtitles
    var subHeader = '';
    subHeader = document.querySelector('p[data-e2e="HeaderLeft__sub-header"]').textContent != null ? document.querySelector('p[data-e2e="HeaderLeft__sub-header"]').textContent : '';

    // Declare data storage variable
    var data = {
        "header": header,
        "subHeader": subHeader,
        "questions": []
    };

    // Get the list of elements containing the question
    var elements = document.querySelectorAll('div[role="group"].rc-FormPartsQuestion');

    // Loop through each element
    elements.forEach(function (element) {
        // Get question information
        var quiz = element.querySelectorAll('.rc-FormPartsQuestion__row');
        var question = quiz[0].querySelector('.rc-FormPartsQuestion__contentCell').textContent;

        var answers = [];
        quiz[1].querySelectorAll('.rc-FormPartsQuestion__contentCell .css-18k2uoc .rc-Option__input-text').forEach(function (answer) {
            answers.push(answer.textContent);
        });

        // Create a data object for the question
        var questionData = {
            "question": question,
            "answers": answers
        };

        // Add question to data list
        data.questions.push(questionData);
    });

    function getCurrentDateTime() {
        var currentDateTime = new Date().toISOString().replace(/[-:.]/g, "").replace("T", "_").split("_");
        var date = currentDateTime[0];
        var time = currentDateTime[1].slice(0, 6);
        return date + "_" + time;
    }

    var jsonData = JSON.stringify(data);

    var fileData = new Blob([jsonData], { type: 'application/json' });
    var fileName = 'quiz_' + header.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_' + getCurrentDateTime() + '.json';

    var link = document.createElement('a');
    link.href = URL.createObjectURL(fileData);
    link.download = fileName;
    link.click();
    chrome.runtime.sendMessage({ type: 'saveScriptSuccess' });
} catch {
    chrome.runtime.sendMessage({ type: 'saveScriptError' });
}
