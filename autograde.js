try {
    var txtVal = 'ENTYD';
    var formParts = document.getElementsByClassName("rc-FormPart");
    for (var i = 0; i < formParts.length; i++) {
        var optionInputs = formParts[i].getElementsByClassName("option-input");
        if (optionInputs.length > 0) {
            console.log(optionInputs[optionInputs.length - 1]);
            optionInputs[optionInputs.length - 1].click();
        }
        var textareas = formParts[i].getElementsByClassName("c-peer-review-submit-textarea-field");
        for (var j = 0; j < textareas.length; j++) {
            var textarea = textareas[j];
            textarea.click();
            textarea.focus();
            document.execCommand("insertText", false, txtVal);
        }
    }

    chrome.runtime.sendMessage({ type: 'autoGradeScriptSuccess' });
} catch {
    chrome.runtime.sendMessage({ type: 'autoGradeScriptError' });
}
