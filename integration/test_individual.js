const webdriverio = require('webdriverio');
// const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
// chai.use(chaiAsPromised);
// chai.should();

const base_site = "http://localhost:8000";

const options = {
    desiredCapabilities: {
        browserName: 'chrome'
    },
    deprecationWarnings: false,
    waitforTimeout: 5000
};
let browser;


describe('Individual Login', function () {
    this.timeout(500000);

    it('should allow logging in', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .click('/html/body/div/div/div[2]/div[2]/div/div[2]/a')
            .waitForVisible('//*[@id="text"]')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"home-content__header\"]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal(base_site + "/individual/home");
                done();
            })
            .end()
            .catch(done);
    });
    //
    // it('should accept writing username and password', function (done) {
    //     browser = webdriverio
    //         .remote(options)
    //         .init()
    //         .url(base_site + '/individual/home')
    //         .setValue("//*[@id=\"login-form\"]/input[1]", "alex@gmail.com")
    //         .getValue("//*[@id=\"login-form\"]/input[1]")
    //         .then(function (value) {
    //             console.log(value);
    //             expect(value).to.equal("alex@gmail.com")
    //         })
    //         .setValue("//*[@id=\"login-form\"]/input[2]", "password")
    //         .getValue("//*[@id=\"login-form\"]/input[2]")
    //         .then(function (value) {
    //             console.log(value);
    //             expect(value).to.equal("password");
    //             done();
    //         })
    //         .end()
    //         .catch(done);
    // });
    //
    // it('should specify which login page it is', function (done) {
    //     browser = webdriverio
    //         .remote(options)
    //         .init()
    //         .url(base_site + '/individual/home')
    //         .getText("//*[@id=\"text\"]/p")
    //         .then(function (title) {
    //             console.log(title);
    //             expect(title).to.equal('Individual Account');
    //             done();
    //         })
    //         .end()
    //         .catch(done);
    // });
    //
    // it('should allow people to log in', function (done) {
    //     browser = webdriverio
    //         .remote(options)
    //         .init()
    //         .url(base_site + '/individual/home')
    //         .setValue("input[type=\"email\"]", "alex@gmail.com")
    //         .setValue("input[type=\"password\"]", "password")
    //         .submitForm("#login-form")
    //         .waitForVisible("//*[@id=\"home-content__header\"]/h2")
    //         .getUrl()
    //         .then(function (value) {
    //             expect(value).to.equal("http://localhost:37832/individual/home");
    //             done();
    //         })
    //         .end()
    //         .catch(done);
    // });
});
