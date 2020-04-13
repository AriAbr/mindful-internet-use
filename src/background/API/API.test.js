import chrome from 'sinon-chrome/extensions'
import { syncTempAccess, reloadIfStopPage } from "./API"
import dayjs from 'dayjs';



beforeAll(function () {
    global.chrome = chrome
});

afterEach(function () {
    chrome.flush();
});

afterAll(function () {
    delete global.chrome;
})

describe('syncTempAccess', function () {
    let fiveMinAgo, tempAccess
    beforeEach(function () {
        fiveMinAgo = dayjs().subtract(5, "minute")
        tempAccess = [{
            firstAccess: fiveMinAgo, time: 10
        }, {
            firstAccess: fiveMinAgo, time: 1,
        }, {
            firstAccess: fiveMinAgo, time: 15
        }, {
            firstAccess: fiveMinAgo, time: 4
        }]

    });


    it('should return all items where "time" minutes has not passed since first access', () => {
        const updatedTempAccess = syncTempAccess(tempAccess);
        expect(updatedTempAccess).toEqual([tempAccess[0], tempAccess[2]])

    });

    it('should call chrome.storage.sync.set with all items where "time" minutes has not passed since first access', () => {
        const updatedTempAccess = syncTempAccess(tempAccess);
        expect(chrome.storage.sync.set.withArgs({ tempAccess: updatedTempAccess }).calledOnce).toBe(true)
    });


    it('should call not chrome.storage.sync.set if input and output is the same', () => {
        fiveMinAgo = dayjs().subtract(5, "minute")
        tempAccess = [{ firstAccess: fiveMinAgo, time: 20 }]

        const updatedTempAccess = syncTempAccess(tempAccess);

        expect(updatedTempAccess).toEqual(tempAccess)
        expect(chrome.storage.sync.set.notCalled).toBe(true)

    });
});


describe('reloadIfStopPage', function () {


    it("should not call chrome.tabs.update if current tab's url is not stopPage", () => {
        let currentUrl = "www.facebook.com"
        chrome.extension.getURL.returns("/stop.html")
        chrome.tabs.query.yields([{ id: 0, url: currentUrl }]);

        reloadIfStopPage()

        expect(chrome.tabs.update.notCalled).toBe(true)
    })

    it("should call chrome.tabs.update with current tab and stopPage if current tab's url is stopPage", () => {
        const stopUrl = "/stop.html"
        const currentUrl = stopUrl
        chrome.extension.getURL.returns(stopUrl)
        const tabs = [{ id: 0, url: currentUrl }]
        chrome.tabs.query.yields(tabs);

        reloadIfStopPage()

        expect(chrome.tabs.update.withArgs(tabs[0].id, { url: stopUrl }).calledOnce).toBe(true)
    })


});