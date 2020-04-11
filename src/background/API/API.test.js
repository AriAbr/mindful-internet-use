import chrome from 'sinon-chrome/extensions'
import { syncTempAccess } from "./API"
import dayjs from 'dayjs';

let fiveMinAgo, tempAccess

beforeAll(function () {
    global.chrome = chrome
    fiveMinAgo = dayjs().subtract(5, "minute")
    tempAccess = [{
        blockPattern: "svt", firstAccess: fiveMinAgo, time: 10
    }, {
        blockPattern: "svt", firstAccess: fiveMinAgo, time: 1,
    }, {
        blockPattern: "svt", firstAccess: fiveMinAgo, time: 15
    }, {
        blockPattern: "svt", firstAccess: fiveMinAgo, time: 4
    }]
});

afterAll(function () {
    chrome.flush();
    delete global.chrome;
})

describe('syncTempAccess', function () {
    beforeEach(function () {
        chrome.flush();
    });


    it('should return all items where "time" minutes has not passed since first access', () => {
        const updatedTempAccess = syncTempAccess(tempAccess);
        expect(updatedTempAccess).toEqual([tempAccess[0], tempAccess[2]])

    });

    it('should call chrome.storage.sync.set with all items where "time" minutes has not passed since first access', () => {
        const updatedTempAccess = syncTempAccess(tempAccess);
        expect(chrome.storage.sync.set.withArgs({ tempAccess: updatedTempAccess }).calledOnce).toBe(true)

    });




});