/*
* Vieb - Vim Inspired Electron Browser
* Copyright (C) 2019-2020 Jelmer van Arnhem
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
/* global ACTIONS COMMAND POINTER FOLLOW HISTORY MODES PAGELAYOUT SETTINGS
 SUGGEST UTIL */
"use strict"

const {ipcRenderer} = require("electron")

const defaultBindings = {
    "n": {
        "<CR>": {"mapping": "<ACTIONS.clickOnSearch>"},
        "<F1>": {"mapping": "<:help>"},
        "<C-a>": {"mapping": "<ACTIONS.increasePageNumber>"},
        "b": {"mapping": "<ACTIONS.previousTab>"},
        "<C-b>": {"mapping": "<ACTIONS.scrollPageUp>"},
        "c": {"mapping": "<POINTER.start>"},
        "<C-c>": {"mapping": "<ACTIONS.stopLoadingPage>"},
        "d": {"mapping": "<ACTIONS.closeTab>"},
        "<C-d>": {"mapping": "<ACTIONS.scrollPageDownHalf>"},
        "e": {"mapping": "<ACTIONS.toExploreMode>"},
        "f": {"mapping": "<ACTIONS.startFollowCurrentTab>"},
        "F": {"mapping": "<ACTIONS.startFollowNewTab>"},
        "<C-f>": {"mapping": "<ACTIONS.scrollPageDown>"},
        "gg": {"mapping": "<ACTIONS.scrollTop>"},
        "gi": {"mapping": "<ACTIONS.insertAtFirstInput>"},
        "G": {"mapping": "<ACTIONS.scrollBottom>"},
        "h": {"mapping": "<ACTIONS.scrollLeft>"},
        "H": {"mapping": "<ACTIONS.backInHistory>"},
        "i": {"mapping": "<ACTIONS.toInsertMode>"},
        "<C-i>": {"mapping": "<ACTIONS.forwardInHistory>"},
        "j": {"mapping": "<ACTIONS.scrollDown>"},
        "J": {"mapping": "<ACTIONS.nextTab>"},
        "<C-j>": {"mapping": "<ACTIONS.moveTabForward>"},
        "k": {"mapping": "<ACTIONS.scrollUp>"},
        "K": {"mapping": "<ACTIONS.previousTab>"},
        "<C-k>": {"mapping": "<ACTIONS.moveTabBackward>"},
        "l": {"mapping": "<ACTIONS.scrollRight>"},
        "L": {"mapping": "<ACTIONS.forwardInHistory>"},
        "n": {"mapping": "<ACTIONS.nextSearchMatch>"},
        "N": {"mapping": "<ACTIONS.previousSearchMatch>"},
        "<C-o>": {"mapping": "<ACTIONS.backInHistory>"},
        "r": {"mapping": "<ACTIONS.reload>"},
        "R": {"mapping": "<ACTIONS.reloadWithoutCache>"},
        "s": {"mapping": "<POINTER.start>"},
        "t": {"mapping": "<ACTIONS.openNewTab>"},
        "T": {"mapping": "<ACTIONS.openNewTabWithCurrentUrl>"},
        "<C-t>": {"mapping": "<ACTIONS.openNewTabAtAlternativePosition>"},
        "u": {"mapping": "<ACTIONS.reopenTab>"},
        "<C-u>": {"mapping": "<ACTIONS.scrollPageUpHalf>"},
        "v": {"mapping": "<POINTER.start>"},
        "w": {"mapping": "<ACTIONS.nextTab>"},
        "<C-x>": {"mapping": "<ACTIONS.decreasePageNumber>"},
        "<C-w>r": {"mapping": "<ACTIONS.rotateSplitWindow>"},
        "<C-w><C-r>": {"mapping": "<ACTIONS.rotateSplitWindow>"},
        "<C-w>H": {"mapping": "<ACTIONS.leftHalfSplitWindow>"},
        "<C-w><C-H>": {"mapping": "<ACTIONS.leftHalfSplitWindow>"},
        "<C-w>J": {"mapping": "<ACTIONS.bottomHalfSplitWindow>"},
        "<C-w><C-J>": {"mapping": "<ACTIONS.bottomHalfSplitWindow>"},
        "<C-w>K": {"mapping": "<ACTIONS.topHalfSplitWindow>"},
        "<C-w><C-K>": {"mapping": "<ACTIONS.topHalfSplitWindow>"},
        "<C-w>L": {"mapping": "<ACTIONS.rightHalfSplitWindow>"},
        "<C-w><C-L>": {"mapping": "<ACTIONS.rightHalfSplitWindow>"},
        "<C-w>h": {"mapping": "<ACTIONS.toLeftSplitWindow>"},
        "<C-w><C-h>": {"mapping": "<ACTIONS.toLeftSplitWindow>"},
        "<C-w>j": {"mapping": "<ACTIONS.toBottomSplitWindow>"},
        "<C-w><C-j>": {"mapping": "<ACTIONS.toBottomSplitWindow>"},
        "<C-w>k": {"mapping": "<ACTIONS.toTopSplitWindow>"},
        "<C-w><C-k>": {"mapping": "<ACTIONS.toTopSplitWindow>"},
        "<C-w>l": {"mapping": "<ACTIONS.toRightSplitWindow>"},
        "<C-w><C-l>": {"mapping": "<ACTIONS.toRightSplitWindow>"},
        "<C-w>-": {"mapping": "<ACTIONS.decreaseHeightSplitWindow>"},
        "<C-w>+": {"mapping": "<ACTIONS.increaseHeightSplitWindow>"},
        "<C-w>=": {"mapping": "<ACTIONS.distrubuteSpaceSplitWindow>"},
        "<C-w><C-=>": {"mapping": "<ACTIONS.distrubuteSpaceSplitWindow>"},
        "<C-w><lt>": {"mapping": "<ACTIONS.decreaseWidthSplitWindow>"},
        "<C-w>>": {"mapping": "<ACTIONS.increaseWidthSplitWindow>"},
        "<C-w><C-lt>": {"mapping": "<ACTIONS.decreaseWidthSplitWindow>"},
        "<C-w><C->>": {"mapping": "<ACTIONS.increaseWidthSplitWindow>"},
        "/": {"mapping": "<ACTIONS.toSearchMode>"},
        "$": {"mapping": "<ACTIONS.scrollPageRight>"},
        "^": {"mapping": "<ACTIONS.scrollPageLeft>"},
        ":": {"mapping": "<ACTIONS.toCommandMode>"},
        "-": {"mapping": "<ACTIONS.zoomOut>"},
        "_": {"mapping": "<ACTIONS.zoomOut>"},
        "=": {"mapping": "<ACTIONS.zoomIn>"},
        "+": {"mapping": "<ACTIONS.zoomIn>"},
        "<C-0>": {"mapping": "<ACTIONS.zoomReset>"}
    },
    "i": {
        "<F1>": {"mapping": "<:help>", "noremap": true},
        "<Esc>": {"mapping": "<ACTIONS.toNormalMode>", "noremap": true},
        "<C-i>": {"mapping": "<ACTIONS.editWithVim>", "noremap": true},
        "<C-[>": {"mapping": "<ACTIONS.toNormalMode>", "noremap": true}
    },
    "c": {
        "<CR>": {"mapping": "<ACTIONS.useEnteredData>"},
        "<F1>": {"mapping": "<:help>"},
        "<Esc>": {"mapping": "<ACTIONS.toNormalMode>"},
        "<Tab>": {"mapping": "<ACTIONS.nextSuggestion>"},
        "<S-Tab>": {"mapping": "<ACTIONS.prevSuggestion>"},
        "<C-n>": {"mapping": "<ACTIONS.commandHistoryNext>"},
        "<C-p>": {"mapping": "<ACTIONS.commandHistoryPrevious>"},
        "<C-[>": {"mapping": "<ACTIONS.toNormalMode>"}
    },
    "s": {
        "<CR>": {"mapping": "<ACTIONS.useEnteredData>"},
        "<F1>": {"mapping": "<:help>"},
        "<Esc>": {"mapping": "<ACTIONS.toNormalMode>"},
        "<C-[>": {"mapping": "<ACTIONS.toNormalMode>"}
    },
    "e": {
        "<CR>": {"mapping": "<ACTIONS.useEnteredData>"},
        "<F1>": {"mapping": "<:help>"},
        "<Esc>": {"mapping": "<ACTIONS.toNormalMode>"},
        "<Tab>": {"mapping": "<ACTIONS.nextSuggestion>"},
        "<S-Tab>": {"mapping": "<ACTIONS.prevSuggestion>"},
        "<C-[>": {"mapping": "<ACTIONS.toNormalMode>"}
    },
    "f": {
        "<F1>": {"mapping": "<:help>"},
        "<Esc>": {"mapping": "<ACTIONS.stopFollowMode>"},
        "<C-[>": {"mapping": "<ACTIONS.stopFollowMode>"}
    },
    "p": {
        "<F1>": {"mapping": "<:help>"},
        "<CR>": {"mapping": "<POINTER.leftClick>"},
        "<Esc>": {"mapping": "<ACTIONS.toNormalMode>"},
        "[": {"mapping": "<POINTER.scrollUp>"},
        "]": {"mapping": "<POINTER.scrollDown>"},
        "b": {"mapping": "<POINTER.moveFastLeft>"},
        "d": {"mapping": "<POINTER.downloadImage>"},
        "<C-d>": {"mapping": "<POINTER.moveFastDown>"},
        "e": {"mapping": "<POINTER.inspectElement>"},
        "f": {"mapping": "<ACTIONS.startFollowCurrentTab>"},
        "gg": {"mapping": "<POINTER.startOfPage>"},
        "G": {"mapping": "<POINTER.endOfPage>"},
        "h": {"mapping": "<POINTER.moveLeft>"},
        "H": {"mapping": "<POINTER.startOfView>"},
        "<C-h>": {"mapping": "<POINTER.moveSlowLeft>"},
        "i": {"mapping": "<POINTER.insertAtPosition>"},
        "j": {"mapping": "<POINTER.moveDown>"},
        "J": {"mapping": "<POINTER.scrollDown>"},
        "<C-j>": {"mapping": "<POINTER.moveSlowDown>"},
        "k": {"mapping": "<POINTER.moveUp>"},
        "K": {"mapping": "<POINTER.scrollUp>"},
        "<C-k>": {"mapping": "<POINTER.moveSlowUp>"},
        "l": {"mapping": "<POINTER.moveRight>"},
        "L": {"mapping": "<POINTER.endOfView>"},
        "<C-l>": {"mapping": "<POINTER.moveSlowRight>"},
        "M": {"mapping": "<POINTER.centerOfView>"},
        "r": {"mapping": "<POINTER.rightClick>"},
        "<C-u>": {"mapping": "<POINTER.moveFastUp>"},
        "v": {"mapping": "<POINTER.startVisualSelect>"},
        "w": {"mapping": "<POINTER.moveFastRight>"},
        "y": {"mapping": "<POINTER.copyAndStop>"},
        "<lt>": {"mapping": "<POINTER.scrollLeft>"},
        ">": {"mapping": "<POINTER.scrollRight>"},
        "$": {"mapping": "<POINTER.moveRightMax>"},
        "^": {"mapping": "<POINTER.moveLeftMax>"},
        "<C-[>": {"mapping": "<ACTIONS.toNormalMode>"}
    },
    "v": {
        "<F1>": {"mapping": "<:help>"},
        "<Esc>": {"mapping": "<ACTIONS.toNormalMode>"},
        "[": {"mapping": "<POINTER.scrollUp>"},
        "]": {"mapping": "<POINTER.scrollDown>"},
        "b": {"mapping": "<POINTER.moveFastLeft>"},
        "c": {"mapping": "<POINTER.copyAndStop>"},
        "<C-d>": {"mapping": "<POINTER.moveFastDown>"},
        "f": {"mapping": "<ACTIONS.startFollowCurrentTab>"},
        "gg": {"mapping": "<POINTER.startOfPage>"},
        "G": {"mapping": "<POINTER.endOfPage>"},
        "h": {"mapping": "<POINTER.moveLeft>"},
        "H": {"mapping": "<POINTER.startOfView>"},
        "<C-h>": {"mapping": "<POINTER.moveSlowLeft>"},
        "j": {"mapping": "<POINTER.moveDown>"},
        "J": {"mapping": "<POINTER.scrollDown>"},
        "<C-j>": {"mapping": "<POINTER.moveSlowDown>"},
        "k": {"mapping": "<POINTER.moveUp>"},
        "K": {"mapping": "<POINTER.scrollUp>"},
        "<C-k>": {"mapping": "<POINTER.moveSlowUp>"},
        "l": {"mapping": "<POINTER.moveRight>"},
        "L": {"mapping": "<POINTER.endOfView>"},
        "<C-l>": {"mapping": "<POINTER.moveSlowRight>"},
        "M": {"mapping": "<POINTER.centerOfView>"},
        "<C-u>": {"mapping": "<POINTER.moveFastUp>"},
        "w": {"mapping": "<POINTER.moveFastRight>"},
        "y": {"mapping": "<POINTER.copyAndStop>"},
        "<lt>": {"mapping": "<POINTER.scrollLeft>"},
        ">": {"mapping": "<POINTER.scrollRight>"},
        "$": {"mapping": "<POINTER.moveRightMax>"},
        "^": {"mapping": "<POINTER.moveLeftMax>"},
        "<C-[>": {"mapping": "<ACTIONS.toNormalMode>"}
    }
}
let repeatCounter = 0
let recursiveCounter = 0
let pressedKeys = ""
let bindings = {}
let supportedActions = []
let timeoutTimer = null

const init = () => {
    window.addEventListener("keydown", handleKeyboard)
    window.addEventListener("keypress", handleUserInput)
    window.addEventListener("keyup", handleUserInput)
    window.addEventListener("auxclick", e => {
        e.preventDefault()
        ACTIONS.setFocusCorrectly()
    })
    window.addEventListener("click", e => {
        if (e.target.classList.contains("no-focus-reset")) {
            e.preventDefault()
            return
        }
        e.preventDefault()
        ACTIONS.setFocusCorrectly()
    })
    window.addEventListener("mouseup", e => {
        if (SETTINGS.get("mouse")) {
            if (e.target === document.getElementById("url")) {
                if (!["explore", "command"].includes(MODES.currentMode())) {
                    ACTIONS.toExploreMode()
                }
            } else if (["explore", "command"].includes(MODES.currentMode())) {
                ACTIONS.toNormalMode()
            }
        }
        e.preventDefault()
        ACTIONS.setFocusCorrectly()
    })
    window.addEventListener("contextmenu", e => {
        e.preventDefault()
        ACTIONS.setFocusCorrectly()
    })
    window.addEventListener("resize", () => {
        PAGELAYOUT.applyLayout()
        if (["pointer", "visual"].includes(MODES.currentMode())) {
            POINTER.updateElement()
        }
    })
    document.getElementById("url").addEventListener("input", () => {
        if (MODES.currentMode() === "explore") {
            HISTORY.suggestHist(document.getElementById("url").value)
        } else if (MODES.currentMode() === "command") {
            SUGGEST.suggestCommand(document.getElementById("url").value)
        }
    })
    ipcRenderer.on("window-close", () => {
        if (process.platform === "darwin") {
            executeMapString("<M-q>", true, true)
        } else {
            executeMapString("<A-F4>", true, true)
        }
    })
    setInterval(() => {
        ACTIONS.setFocusCorrectly()
    }, 500)
    ACTIONS.setFocusCorrectly()
    const unSupportedActions = [
        "ACTIONS.setFocusCorrectly",
        "POINTER.move",
        "POINTER.handleScrollDiffEvent",
        "POINTER.updateElement",
        "POINTER.releaseKeys"
    ]
    // TODO document these changes to Vim in terms of supported mappings:
    // - spaces not supplied as <Space>
    // - only support <> notation and single digit characters
    //   - e.g. letters, !@#$%^&*()_+ and number
    // - no recursive mappings for insert mode, all of them are noremap
    // - map! also lists built-in mappings, instead of applying a mapping
    supportedActions = [
        ...Object.keys(ACTIONS).map(a => `ACTIONS.${a}`),
        ...Object.keys(POINTER).map(c => `POINTER.${c}`)
    ].filter(m => !unSupportedActions.includes(m))
    bindings = JSON.parse(JSON.stringify(defaultBindings))
}

const keyNames = [
    {"js": ["Backspace"], "vim": ["BS"]},
    {"js": ["Enter"], "vim": ["CR", "NL", "Return", "Enter"]},
    {"js": ["<"], "vim": ["lt"]},
    {"js": ["|"], "vim": ["Bar"]},
    {"js": ["\\"], "vim": ["Bslash"]},
    {"js": ["ArrowLeft"], "vim": ["Left"]},
    {"js": ["ArrowRight"], "vim": ["Right"]},
    {"js": ["ArrowUp"], "vim": ["Up"]},
    {"js": ["ArrowDown"], "vim": ["Down"]},
    {"js": ["Escape"], "vim": ["Esc"]},
    {"js": ["Delete"], "vim": ["Del"]},
    {"js": [" "], "vim": ["Space"]}
]

const toIdentifier = e => {
    let keyCode = e.key
    keyNames.forEach(key => {
        if (key.js.includes(keyCode)) {
            keyCode = key.vim[0]
        }
    })
    if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
        if (e.shiftKey && e.key.length > 1) {
            keyCode = `S-${keyCode}`
        }
        if (e.altKey) {
            keyCode = `A-${keyCode}`
        }
        if (e.metaKey) {
            keyCode = `M-${keyCode}`
        }
        if (e.ctrlKey) {
            keyCode = `C-${keyCode}`
        }
    }
    if (keyCode.length > 1) {
        keyCode = `<${keyCode}>`
    }
    return keyCode
}

// This is a list of actions that can be counted in advance by a count argument
// Functions not listed will be executed for x times using a while loop
const countableActions = [
    // Actually countable with notable speed increase
    "ACTIONS.increasePageNumber",
    "ACTIONS.decreasePageNumber",
    "ACTIONS.previousTab",
    "ACTIONS.nextTab",
    "ACTIONS.zoomOut",
    "ACTIONS.zoomIn",
    // Single use actions that ignore the count and only execute once
    "ACTIONS.emptySearch",
    "ACTIONS.toExploreMode",
    "ACTIONS.startFollowCurrentTab",
    "ACTIONS.scrollTop",
    "ACTIONS.insertAtFirstInput",
    "ACTIONS.toInsertMode",
    "ACTIONS.reload",
    "ACTIONS.toSearchMode",
    "ACTIONS.startFollowNewTab",
    "ACTIONS.scrollBottom",
    "ACTIONS.openNewTabWithCurrentUrl",
    "ACTIONS.toCommandMode",
    "ACTIONS.stopLoadingPage",
    "ACTIONS.zoomReset",
    "ACTIONS.toNormalMode",
    "ACTIONS.stopFollowMode",
    "ACTIONS.editWithVim",
    "ACTIONS.leftHalfSplitWindow",
    "ACTIONS.bottomHalfSplitWindow",
    "ACTIONS.topHalfSplitWindow",
    "ACTIONS.rightHalfSplitWindow",
    "ACTIONS.distrubuteSpaceSplitWindow",
    "ACTIONS.useEnteredData",
    "POINTER.start",
    "POINTER.inspectElement",
    "POINTER.copyAndStop",
    "POINTER.startOfPage",
    "POINTER.insertAtPosition",
    "POINTER.centerOfView",
    "POINTER.startOfView",
    "POINTER.endOfView",
    "POINTER.endOfPage",
    "POINTER.moveRightMax",
    "POINTER.moveLeftMax"
]

const hasFutureActionsBasedOnKeys = keys => {
    return !!Object.keys(bindings[MODES.currentMode()[0]]).find(
        map => map.startsWith(keys) && map !== keys)
}

const executeMapString = (mapStr, recursive, initial) => {
    if (initial) {
        recursiveCounter = 0
        if (!hasFutureActionsBasedOnKeys(pressedKeys)) {
            pressedKeys = ""
        }
    }
    recursiveCounter += 1
    let repeater = Number(repeatCounter) || 1
    repeatCounter = 0
    updateKeysOnScreen()
    for (let i = 0;i < repeater;i++) {
        mapStr.split(/(<.*?[^-]>|<.*?->>|.)/g).filter(m => m).forEach(key => {
            const options = {"bubbles": recursive}
            if (key.length === 1) {
                const isLetter = key.toLowerCase() !== key.toUpperCase()
                const isUpper = key.toUpperCase() === key
                if (isLetter && isUpper) {
                    options.shiftKey = true
                }
                options.key = key
            } else if (supportedActions.includes(key.replace(/(^<|>$)/g, ""))) {
                let count = null
                if (countableActions.includes(key.replace(/(^<|>$)/g, ""))) {
                    count = Number(repeater)
                    repeater = 0
                }
                doAction(key.replace(/(^<|>$)/g, ""), count)
                return
            } else if (key.startsWith("<:")) {
                COMMAND.execute(key.replace(/^<:|>$/g, ""))
                return
            } else if (key.match(/^<(C-)?(M-)?(A-)?(S-)?.+>$/g)) {
                key = key.slice(1, -1)
                if (key.startsWith("C-")) {
                    options.ctrlKey = true
                    key = key.replace("C-", "")
                }
                if (key.startsWith("M-")) {
                    options.metaKey = true
                    key = key.replace("M-", "")
                }
                if (key.startsWith("A-")) {
                    options.altKey = true
                    key = key.replace("A-", "")
                }
                if (key.startsWith("S-")) {
                    options.shiftKey = true
                    key = key.replace("S-", "")
                }
                keyNames.forEach(k => {
                    if (k.vim.includes(key)) {
                        options.key = k.js[0]
                    }
                })
                if (!options.key) {
                    options.key = key
                }
            } else {
                UTIL.notify(`Unsupported key in mapping: ${key}`, "warn")
                return
            }
            window.dispatchEvent(new KeyboardEvent("keydown", options))
        })
    }
    if (initial) {
        recursiveCounter = 0
        if (!hasFutureActionsBasedOnKeys(pressedKeys)) {
            repeatCounter = 0
            pressedKeys = ""
            updateKeysOnScreen()
        }
    }
}

const doAction = (name, count) => {
    if (name.startsWith("POINTER")) {
        POINTER[name.replace(/^.*\./g, "")](count || 1)
    } else {
        ACTIONS[name.replace(/^.*\./g, "")](count || 1)
    }
    repeatCounter = 0
    updateKeysOnScreen()
}

const handleKeyboard = e => {
    if (document.body.classList.contains("fullscreen")) {
        MODES.setMode("insert")
        return
    }
    const ignoredKeys = [
        "Control",
        "Meta",
        "Alt",
        "Shift",
        "NumLock",
        "CapsLock",
        "ScrollLock",
        "<C-CapsLock>",
        ""
    ]
    if (recursiveCounter > SETTINGS.get("maxmapdepth")) {
        recursiveCounter = 0
        e.preventDefault()
        return
    }
    if (ignoredKeys.includes(e.key)) {
        // Keys such as control should not be registered on their own
        e.preventDefault()
        return
    }
    const id = toIdentifier(e)
    updateKeysOnScreen()
    clearInterval(timeoutTimer)
    if (SETTINGS.get("timeout")) {
        timeoutTimer = setTimeout(() => {
            repeatCounter = 0
            pressedKeys = ""
            updateKeysOnScreen()
        }, SETTINGS.get("timeoutlen"))
    }
    if (["normal", "pointer", "visual"].includes(MODES.currentMode())) {
        const keyNumber = Number(id)
        const noFutureActions = !hasFutureActionsBasedOnKeys(pressedKeys + id)
        if (!isNaN(keyNumber) && noFutureActions) {
            repeatCounter = Number(String(repeatCounter) + keyNumber)
            if (repeatCounter > SETTINGS.get("countlimit")) {
                repeatCounter = SETTINGS.get("countlimit")
            }
            updateKeysOnScreen()
            e.preventDefault()
            return
        }
        if (id === "<Esc>" || id === "<C-[>") {
            if (repeatCounter !== 0) {
                repeatCounter = 0
                updateKeysOnScreen()
                e.preventDefault()
                return
            }
        }
    } else {
        repeatCounter = 0
    }
    if (!hasFutureActionsBasedOnKeys(pressedKeys)) {
        pressedKeys = ""
    }
    pressedKeys += id
    const action = bindings[MODES.currentMode()[0]][pressedKeys]
    if (action && (e.isTrusted || e.bubbles)) {
        if (e.isTrusted) {
            executeMapString(action.mapping, !action.noremap, true)
        } else {
            executeMapString(action.mapping, e.bubbles)
        }
        e.preventDefault()
        return
    }
    if (!hasFutureActionsBasedOnKeys(pressedKeys)) {
        repeatCounter = 0
        pressedKeys = ""
    }
    if (!e.isTrusted) {
        typeCharacterIntoNavbar(id)
    }
    updateKeysOnScreen()
    handleUserInput(e)
}

const typeCharacterIntoNavbar = id => {
    if (!"ces".includes(MODES.currentMode()[0])) {
        return
    }
    if (id.length === 1) {
        document.getElementById("url").value += id
    }
    if (id === "<lt>") {
        document.getElementById("url").value += "<"
    }
    if (id === "<Bar>") {
        document.getElementById("url").value += "|"
    }
    if (id === "<Bslash>") {
        document.getElementById("url").value += "\\"
    }
    if (id === "<Space>") {
        document.getElementById("url").value += " "
    }
}

const updateKeysOnScreen = () => {
    document.getElementById("repeat-counter").textContent = repeatCounter
    document.getElementById("pressed-keys").textContent = pressedKeys
    if (repeatCounter && SETTINGS.get("showcmd")) {
        document.getElementById("repeat-counter").style.display = "flex"
    } else {
        document.getElementById("repeat-counter").style.display = "none"
    }
    if (pressedKeys && SETTINGS.get("showcmd")) {
        document.getElementById("pressed-keys").style.display = "flex"
    } else {
        document.getElementById("pressed-keys").style.display = "none"
    }
}

const handleUserInput = e => {
    const id = toIdentifier(e)
    if (MODES.currentMode() === "follow") {
        if (e.type === "keydown") {
            FOLLOW.enterKey(id)
        }
        e.preventDefault()
        return
    }
    let allowedUserInput = [
        "<C-a>",
        "<C-c>",
        "<C-x>",
        "<C-v>",
        "<C-y>",
        "<C-z>",
        "<C-BS>",
        "<C-Left>",
        "<C-Right>",
        "<C-S-Left>",
        "<C-S-Right>"
    ]
    if (process.platform === "darwin") {
        allowedUserInput = [
            "<M-a>",
            "<M-c>",
            "<M-x>",
            "<M-v>",
            "<M-z>",
            "<M-BS>",
            "<M-Left>",
            "<M-Right>",
            "<M-S-Left>",
            "<M-S-Right>",
            "<M-Z>",
            "<A-BS>",
            "<A-Left>",
            "<A-Right>",
            "<A-S-Left>",
            "<A-S-Right>"
        ]
    }
    const shiftOnly = id.startsWith("<S-")
    const allowedInput = allowedUserInput.includes(id)
    const hasModifier = id.match(/^<.*-.*>$/)
    const blockedKey = ["Tab", "F11"].find(key => id.includes(key))
    if (!shiftOnly && !allowedInput && hasModifier || blockedKey) {
        e.preventDefault()
    }
    ACTIONS.setFocusCorrectly()
}

const listSupportedActions = () => {
    return supportedActions
}

const mappingModified = (mode, mapping) => {
    const current = bindings[mode][mapping]
    const original = defaultBindings[mode][mapping]
    if (!current && !original) {
        return false
    }
    if (current && original) {
        if (current.mapping === original.mapping) {
            if (current.noremap === original.noremap) {
                return false
            }
        }
    }
    return true
}

const listMappingsAsCommandList = (mode = false, includeDefault = false) => {
    const mappings = []
    let modes = Object.keys(defaultBindings)
    if (mode) {
        modes = [mode]
    }
    modes.forEach(bindMode => {
        const keys = [...new Set(Object.keys(defaultBindings[bindMode])
            .concat(Object.keys(bindings[bindMode])))]
        for (const key of keys) {
            mappings.push(listMapping(bindMode, key, includeDefault))
        }
    })
    return mappings.join("\n").replace(/[\r\n]+/g, "\n").trim()
}

const listMapping = (mode, key, includeDefault) => {
    if (!mappingModified(mode, key) && !includeDefault) {
        return ""
    }
    const mapping = bindings[mode][key]
    if (mapping) {
        if (mapping.noremap) {
            return `${mode}noremap ${key} ${mapping.mapping}`
        }
        return `${mode}map ${key} ${mapping.mapping}`
    }
    if (defaultBindings[mode][key]) {
        return `${mode}unmap ${key}`
    }
    return ""
}

const mapOrList = (mode, args, noremap, includeDefault) => {
    if (includeDefault && args.length > 1) {
        UTIL.notify("Mappings are always overwritten, no need for !", "warn")
        return
    }
    if (args.length === 0) {
        const mappings = listMappingsAsCommandList(mode, includeDefault)
        if (mappings) {
            UTIL.notify(mappings)
        } else if (includeDefault) {
            UTIL.notify("No mappings found")
        } else {
            UTIL.notify("No custom mappings found")
        }
        return
    }
    if (args.length === 1) {
        if (mode) {
            const mapping = listMapping(mode, args[0], includeDefault).trim()
            if (mapping) {
                UTIL.notify(mapping)
            } else if (includeDefault) {
                UTIL.notify("No mapping found for this sequence")
            } else {
                UTIL.notify("No custom mapping found for this sequence")
            }
        } else {
            let mappings = ""
            Object.keys(bindings).forEach(bindMode => {
                mappings += `${listMapping(
                    bindMode, args[0], includeDefault)}\n`
            })
            mappings = mappings.replace(/[\r\n]+/g, "\n").trim()
            if (mappings) {
                UTIL.notify(mappings)
            } else if (includeDefault) {
                UTIL.notify("No mapping found for this sequence")
            } else {
                UTIL.notify("No custom mapping found for this sequence")
            }
        }
        return
    }
    mapSingle(mode, args, noremap)
}

const sanitiseMapString = mapString => {
    return mapString.split(/(<.*?[^-]>|<.*?->>|.)/g).filter(m => m).map(m => {
        if (m === ">") {
            return ">"
        }
        let key = m
        let modifiers = []
        if (m.length > 1) {
            const splitKeys = m.replace(/(^<|>$)/g, "")
                .split("-").filter(s => s)
            modifiers = splitKeys.slice(0, -1)
            key = splitKeys.slice(-1)[0]
        }
        keyNames.forEach(name => {
            if (name.vim.includes(key)) {
                key = name.vim[0]
            }
        })
        if (!key) {
            return ""
        }
        let modString = ""
        if (key.length === 1) {
            if (modifiers.includes("S") && key.toLowerCase() === key) {
                modifiers = modifiers.filter(mod => mod !== "S")
                key = key.toUpperCase()
            }
            if (modifiers.includes("S") && key.toLowerCase() !== key) {
                modifiers = modifiers.filter(mod => mod !== "S")
            }
        }
        for (const mod of ["C", "M", "A", "S"]) {
            if (modifiers.includes(mod)) {
                modString += `${mod}-`
            }
        }
        if (modString || key.length > 1) {
            return `<${modString}${key}>`
        }
        return key
    }).join("")
}

const mapSingle = (mode, args, noremap) => {
    const mapping = sanitiseMapString(args.shift())
    const actions = sanitiseMapString(args.join(" "))
    if (mode) {
        bindings[mode][mapping] = {
            "mapping": actions, "noremap": noremap || mode === "i"
        }
        return
    }
    Object.keys(bindings).forEach(bindMode => {
        bindings[bindMode][mapping] = {
            "mapping": actions, "noremap": noremap || bindMode === "i"
        }
    })
}

const unmap = (mode, args) => {
    if (args.length !== 1) {
        UTIL.notify(
            `The ${mode}unmap command requires exactly one mapping`, "warn")
        return
    }
    if (mode) {
        delete bindings[mode][args[0]]
    } else {
        Object.keys(bindings).forEach(bindMode => {
            delete bindings[bindMode][args[0]]
        })
    }
}

const clearmap = (mode, removeDefaults) => {
    if (mode) {
        if (removeDefaults) {
            bindings[mode] = {}
        } else {
            bindings[mode] = JSON.parse(JSON.stringify(defaultBindings[mode]))
        }
    } else if (removeDefaults) {
        Object.keys(bindings).forEach(bindMode => {
            bindings[bindMode] = {}
        })
    } else {
        bindings = JSON.parse(JSON.stringify(defaultBindings))
    }
}

module.exports = {
    init,
    executeMapString,
    doAction,
    handleKeyboard,
    listSupportedActions,
    listMappingsAsCommandList,
    mapOrList,
    unmap,
    clearmap
}
