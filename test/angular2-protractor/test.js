browser.ignoreSynchronization = true;

describe('CompileHtml', () => {
    browser.get(`index.html`);

    const clicker = (button, counter) => {
        for(let i =0; i < 9; i++) {
            button.click();
            browser.waitForAngular();
        }
        const count = counter.getText();
        expect(count).toEqual('10');
    }

    it('Service', () => {
        const button = element(by.id('button-container'))
        const counter = element(by.id('counter-container'));
        clicker(button, counter);
    });
    it('Attribute', () => {
        const button = element(by.id('button-attribute'))
        const counter = element(by.id('counter-attribute'));
        clicker(button, counter);
    });
});