
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

        var button = document.createElement('button');
        button.id = 'copyButton';
        button.type = 'button';
        button.style.height = '30px';
        button.style.background = '#0056d2';
        button.style.color = 'white';
        button.style.borderRadius = '10px';
        button.style.textTransform = 'none';
        button.style.fontWeight = 'bold';
        button.style.border = '1px solid #0056d2';
        button.style.fontSize = '8px';
        button.innerText = 'COPY';

        var buttonAll = document.createElement('button');
        buttonAll.id = 'copyButton';
        buttonAll.type = 'button';
        buttonAll.style.height = '30px';
        buttonAll.style.background = '#0056d2';
        buttonAll.style.color = 'white';
        buttonAll.style.borderRadius = '10px';
        buttonAll.style.textTransform = 'none';
        buttonAll.style.fontWeight = 'bold';
        buttonAll.style.border = '1px solid #0056d2';
        buttonAll.style.fontSize = '8px';
        buttonAll.style.marginRight = '10px';
        buttonAll.innerText = 'COPY ALL';

        var copyZone = quiz[0].querySelector('.rc-FormPartsQuestion__pointsCell');
        copyZone.innerHTML = '';
        copyZone.append(button);
        copyZone.append(buttonAll);

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

        // Handle the COPY button click event
        button.addEventListener('click', function () {
            var copyText = questionData.question + '\n';
            copyText += 'Answers:\n';

            questionData.answers.forEach(function (answer) {
                copyText += '- ' + answer + '\n';
            });

            //Copy text to clipboard
            navigator.clipboard.writeText(copyText)
                .then(function () {
                    alert('Question copied!');
                })
                .catch(function (error) {
                    console.error('Copy failed:', error);
                });
        });


        buttonAll.addEventListener('click', function () {
            var copyText = '';

            data.questions.forEach(function (questionData, index) {
                copyText += (index + 1) + '. ' + questionData.question + '\n';
                copyText += 'Answers:\n';

                questionData.answers.forEach(function (answer) {
                    copyText += '- ' + answer + '\n';
                });

                copyText += '\n';
            });

            //Copy text to clipboard
            navigator.clipboard.writeText(copyText)
                .then(function () {
                    alert('Quiz copied!');
                })
                .catch(function (error) {
                    console.error('Copy failed:', error);
                });
        });
    });
    chrome.runtime.sendMessage({ type: 'scanScriptSuccess', numQuestions: data.questions.length });
} catch {
    chrome.runtime.sendMessage({ type: 'scanScriptError' });
}
