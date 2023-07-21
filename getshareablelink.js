let submissionID = "";

function displayLink(id) {
    const shareLink = document.querySelector("#shareLink");

    if (id == null || id[0] == null) {
        shareLink.value = 'No content';
    } else {
        submissionID = id[0].substring(0, id[0].indexOf("~"));
        chrome.tabs.query({ active: true, currentWindow: true }, async function (
            tabs
        ) {
            const tab = tabs[0];
            let fromIndex = 0;
            let countSlash = 0;
            while (tab.url.indexOf("/", fromIndex) != -1) {
                fromIndex = tab.url.indexOf("/", fromIndex + 1);
                countSlash++;
                if (countSlash >= 8) break;
            }
            shareLink.value = tab.url.substring(0, fromIndex) + "/review/" + submissionID;
        });
    }
}

chrome.tabs.query({ active: true }, async function (tabs) {
    const tab = tabs[0];
    if (tab.url.includes('coursera.org')) {
        const id = await new Promise((resolve) => {
            chrome.tabs.executeScript(
                tab.id,
                {
                    code: 'document.getElementsByClassName("_10nd10j")[0].id',
                },
                resolve
            );
        });

        displayLink(id);
    }
});

window.onload = function () {
    "use strict";

    const shareLink = document.getElementById("shareLink");
    const copyButton = document.getElementById("copyButton");

    function copyToClipboard(elem) {
        const target = elem;
        target.select();
        let succeed = false;
        try {
            succeed = document.execCommand("copy");
        } catch (e) {
            console.warn(e);
        }
        return succeed;
    }

    function copyShareLinkToClipboard() {
        copyToClipboard(shareLink);
    }

    copyButton.addEventListener("click", copyShareLinkToClipboard);
};
