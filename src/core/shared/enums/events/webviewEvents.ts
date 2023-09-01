export const enum WebViewEvents {
    displayPage = 'WebView:Display:Page',
    hidePage = 'Webview:Hide:Page',
}

export const enum LoginEvents {
    loginBegin = 'Webview:Login:Begin',
    loginDone = 'Webview:Login:Done',
}

export const enum CSelectionEvents {
    fetch = 'Webview:Character:Selection:Fetch',
    view = 'Webview:Character:Selection:View',
    create = 'Webview:Character:Selection:Create',
    play = 'Webview:Character:Selection:Play',
}

export const enum CCreatorEvents {
    allowRotation = 'Webview:Character:Creator:Allow:Rotation',
    changeCam = 'Webview:Character:Creator:Change:Cam',
    updateColors = 'Webview:Character:Creator:Update:Colors',
    updateData = 'Webview:Character:Creator:Update:Data',
    exit = 'Webview:Character:Creator:Exit',
    new = 'Webview:Character:Creator:New',
}

export const enum ChatEvents {
    toggle = 'Webview:Chat:Toggle',
    input = 'Webview:Chat:Input',
    pushLine = 'Webview:Chat:Push:Line',
    fetchCommands = 'Webview:Chat:Fecth:Commands',
    setSize = 'Webview:Chat:Set:Size',
    updateSize = 'Webview:Chat:Update:Size',
}

export const enum NotificationEvents {
    show = 'Webview:Notification:Show',
    cancel = 'Webview:Notification:Cancel',
}

export const enum InventoryEvents {
    ready = 'Webview:Inventory:Ready',
    fetchAll = 'Webview:Inventory:Fetch:All',
    fetchPrimary = 'Webview:Inventory:Fetch:Primary',
    fetchSecondary = 'Webview:Inventory:Fetch:Secondary',
    fetchConfig = 'Webview:Inventory:Fetch:Config',
    updateItems = 'Webview:Inventory:Update:Items',
    removeItem = 'Webview:Inventory:Remove:Item',
    removeEquipment = 'Webview:Inventory:Remove:Equipment',
    dropItem = 'Webview:Inventory:Drop:Item',
    useItem = 'Webview:Inventory:Use:Item',
    show = 'Webview:Inventory:Show',
    hide = 'Webview:Inventory:Hide',
    showShortcuts = 'Webview:Inventory:Show:Shortcuts',
    hideShortcuts = 'Webview:Inventory:Hide:Shortcurs',
    usedItem = 'Webview:Inventory:Used:Item',
    close = 'Webview:Inventory:Close',

    stackPrimary = 'Webview:Inventory:Stack:Primary',
    stackSecondary = 'Webview:Inventory:Stack:Secondary',
    splitPrimary = 'Webview:Inventory:Split:Primary',
    splitSecondary = 'Webview:Inventory:Split:Secondary',
    dropPrimary = 'Webview:Inventory:Drop:Primary',
    dropSecondary = 'Webview:Inventory:Drop:Secondary',
    movePrimary = 'Webview:Inventory:Move:Primary',
    moveSecondary = 'Webview:Inventory:Move:Secondary',
}

export const enum SpeedometerEvents {
    show = 'Webview:Speedometer:Show',
    hide = 'Webview:Speedometer:Hide',
    update = 'Webview:Speedometer:Update',
}
