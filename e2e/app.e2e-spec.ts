import { ConectcarPage } from './app.po';

describe('conectcar App', () => {
  let page: ConectcarPage;

  beforeEach(() => {
    page = new ConectcarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
