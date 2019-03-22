function createRange(node, chars, range?) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                    break;
                }
            }
        }
    }

    return range;
}

export function setCurrentCursorPosition(chars, element) {
    if (chars >= 0) {
        var selection = window.getSelection();

        var range = createRange(element.parentNode, { count: chars });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}

function isChildOf(node, parentId) {
    while (node !== null) {
        if (node === parentId) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
}

export function getCurrentCursorPosition(parentId) {
    var selection = window.getSelection(),
        charCount = -1,
        node;

    if (selection.focusNode) {
        if (isChildOf(selection.focusNode, parentId)) {
            node = selection.focusNode;
            charCount = selection.focusOffset;

            while (node) {
                if (node === parentId) {
                    break;
                }

                if (node.previousSibling) {
                    node = node.previousSibling;
                    charCount += node.textContent.length;
                } else {
                    node = node.parentNode;
                    if (node === null) {
                        break
                    }
                }
            }
        }
    }

    return charCount;
}


export function getCursorPosition(parent: HTMLElement) {
    var selection = window.getSelection(),
        charCount = -1,
        node;
    if (selection.focusNode == parent) {
        return selection.focusOffset;
    }
    node = selection.focusNode;
    charCount = selection.focusOffset;
    while (node.previousSibling) {
        node = node.previousSibling;
        charCount += node.textContent.length;
    }
    return charCount;
}

export function setCaretPosition(editableDiv, position) {
    const selection = window.getSelection();
    selection.collapse(editableDiv.childNodes[editableDiv.childNodes.length - 1], position);
}

export function getCaretPosition(editableDiv) {
    debugger;
    let noSplCharText = replaceNbsps(editableDiv.innerHTML);
    let text = noSplCharText.replace(/.*?(<br>)/g, '');
    console.log(editableDiv.innerHTML, text)
    return text.length;
}

function replaceNbsps(str) {
    var re = new RegExp(String.fromCharCode(160), "g");
    return str.replace('&nbsp;', " ");
}
