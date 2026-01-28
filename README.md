# Date Deck 💕

[My Notes](notes.md)

Date Deck will be an application for couples looking to streamline their date nights. Users will be able to add a date idea as a card to their deck, and when the night comes, they can look through their ideas or randomly draw a card. Additionally, users will be able to post their dates to their friends and get ideas by scrolling through their friends' posts.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

If you're a romantic like me, I'm sure you've found yourself constantly mentioning things you want to do with your significant other. But after only a couple of weeks of dating, you've already forgotten half the things you wanted to do and aren’t sure what to pick for your next date activity. May I present to you, DateDeck: an app that will ensure that your date ideas are never lost in the wind. DateDeck will keep track of any date idea you have and organize it into a deck, which you can look through and pull randomly out of when the date night arrives.

### Design

![The home page for Date Deck](homeDatedeck.png)
![The create your profile page for Date Deck](LoginDateDeck.png)


After creating an account, the user will open the application to the hompage consisting of the main feature, adding a date card to your deck. There will be two other pages the user can navigate to at the bottom of the screen. The first is to see their deck and have the option to randomly draw a card from it. The second is the social feed from other users’ dates.

### Key features

- Add a date idea
- Ask for a random idea with optional specifications from your deck, or a general deck
- View your deck of date ideas
- Post about your date to your frineds
- View your frineds posts about their dates

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Authentication - allow users to log in to their account.
           - Redering - to render the user's date cards and other users' posts. 
- **CSS** - To make the application cute and appealing to couples.
- **React** - To build all dynamic UI, such as their decks or posting options.
- **Service** - To enable an AI date idea generator. The app will make a call to the AI agent.
- **DB/Login** - To save the user's profile, posts, dates, and so on.
- **WebSocket** - To see other users' posts and to send posts to the page.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I added an Index(login), card, deck, and social page.
- [x] **Proper HTML element usage** - I looked at varius examples and ended up useing a lot of div to organize the date cards. I also inlcuded button, span, header, footer, main, nav, img, and more.
- [x] **Links** - The navigation uses links to jump between pages.
- [x] **Text** - Simple prompts are used to guide users, and each card and social post have their dectiptions.
- [x] **3rd party API placeholder** - The card and social pages have buttons that will use 3rd party calls to submit pictures.
- [x] **Images** - Images are used on the deck and social pages as part of the date cards.
- [x] **Login placeholder** - The Index page is the login page and the social page has the username display.
- [x] **DB data placeholder** - The cards displayed on the deck page will be pulled form a data base.
- [x] **WebSocket placeholder** - The social page will use websocket to create a socail feed similar to instagram.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
