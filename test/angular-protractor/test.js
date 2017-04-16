browser.ignoreSynchronization = true;

describe('CompileHtml', () => {
    browser.get(`index.html`);


    const clicker = (button, counter) => {
        const total = 5;
        for(let i =0; i < total - 1; i++) {
            button.click();
            browser.waitForAngular();
        }

        const count = counter.getText();
        expect(count).toEqual(total.toString());
    }

    it('Service', (done) => {
        setTimeout(() => {
            const button = element(by.id('button-container'))
            const counter = element(by.id('counter-container'));
            clicker(button, counter);
            done();
        }, 3000)
    });
    it('Attribute', (done) => {
        const button = element(by.id('button-attribute'))
        const counter = element(by.id('counter-attribute'));
        clicker(button, counter);
        done();
    });
});