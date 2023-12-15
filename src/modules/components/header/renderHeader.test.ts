import { renderHeader } from "./renderHeader";

// describe('render header', () => {
//   beforeEach(() => {
//     const root = document.createElement('header');
//   });
//   afterEach(() => {
//     root?.remove();
//   });

//   it('Title is renders', () => {

//     renderHeader(root);
//     const titleElement = root.querySelector('.h1') as HTMLElement;
//     expect(titleElement).toBe('Task Tracker app');
//   })
//   it('Navigation in header is renders', () => {
//     const root = document.createElement('header');

//     renderHeader(root);
//     const navElement = root.querySelector('.nav') as HTMLElement;
//     const navLinks = navElement.querySelectorAll('.nav__link') as NodeListOf<HTMLAnchorElement>;
//     expect(navLinks.length).toBe(3);

//   })

// })
// // <h1>Task Tracker app</h1>

describe("renderHeader", () => {
  it("renders header with specific content", () => {
    const headerRoot = document.createElement("div");
    renderHeader(headerRoot);

    expect(headerRoot.innerHTML).toContain("Task Tracker app");
    expect(headerRoot.innerHTML).toContain("Calendar");
    expect(headerRoot.innerHTML).toContain("Task list");
    expect(headerRoot.innerHTML).toContain("About");
  });

  it("renders header with specific links", () => {
    const headerRoot = document.createElement("div");

    renderHeader(headerRoot);

    const links = headerRoot.querySelectorAll(".nav__link");
    expect(links.length).toBe(3);
    expect((links[0] as HTMLAnchorElement).href).toContain("/calendar");
    expect((links[1] as HTMLAnchorElement).href).toContain("/list");
    expect((links[2] as HTMLAnchorElement).href).toContain("/about");
  });

  it("renders header with specific IDs for links", () => {
    const headerRoot = document.createElement("div");

    renderHeader(headerRoot);

    const calendarLink = headerRoot.querySelector("#calendar-link");
    const listLink = headerRoot.querySelector("#list-link");
    const aboutLink = headerRoot.querySelector("#about-link");
    expect(calendarLink).toBeTruthy();
    expect(listLink).toBeTruthy();
    expect(aboutLink).toBeTruthy();
  });

  it("renders header using specific HTML structure", () => {
    const headerRoot = document.createElement("div");

    renderHeader(headerRoot);

    expect(headerRoot.innerHTML).toMatchSnapshot();
  });
});
