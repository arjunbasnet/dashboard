# React Bootstrap Dashboard

## Get started
*Development*
```
git clone https://github.com/arjunbasnet/dashboard.git
npm install
npm run dev
```

*Build*
```
npm run build
```

## File structure
```
│   .babelrc
│   .env
│   .eslintrc.json
│   .gitignore
│   .zshrc
│   AUTHORS
│   LICENSE
│   nodemon.json
│   package-lock.json
│   package.json
│   README.md
│   webpack.config.js
│
├───config
│   │   env.js
│   │   paths.js
│   │
│   └───jest
│           cssTransform.js
│           fileTransform.js
│
├───database
│       dashboardconfigs.json
│       users.json
│       widgets.json
│
├───public
│       favicon.ico
│       index.html
│       manifest.json
│
└───src
    ├───client
    │   │   index.js
    │   │   registerServiceWorker.js
    │   │
    │   ├───assets
    │   │   ├───images
    │   │   │   │   checkbox-1.svg
    │   │   │   │   checkbox-2.svg
    │   │   │   │   checkbox-check.svg
    │   │   │   │   checkbox-uncheck.svg
    │   │   │   │   favicon.ico
    │   │   │   │   loading-bubbles.svg
    │   │   │   │   mask.png
    │   │   │   │   radio-1.svg
    │   │   │   │   radio-2.svg
    │   │   │   │   sidebar-1.jpg
    │   │   │   │
    │   │   │   └───faces
    │   │   │           face-3.jpg
    │   │   │
    │   │   └───styles
    │   │       │   base.scss
    │   │       │   icons.scss
    │   │       │
    │   │       ├───base
    │   │       │   │   _buttons.scss
    │   │       │   │   _card.scss
    │   │       │   │   _chartist.scss
    │   │       │   │   _checkbox-radio-switch.scss
    │   │       │   │   _footer.scss
    │   │       │   │   _icons.scss
    │   │       │   │   _mixins.scss
    │   │       │   │   _navbar.scss
    │   │       │   │   _pagination.scss
    │   │       │   │   _panels.scss
    │   │       │   │   _sidebar.scss
    │   │       │   │   _tags.scss
    │   │       │   │   _todos.scss
    │   │       │   │   _typography.scss
    │   │       │   │   _variables.scss
    │   │       │   │
    │   │       │   └───mixins
    │   │       │           _buttons.scss
    │   │       │           _cards.scss
    │   │       │           _chartist.scss
    │   │       │           _icons.scss
    │   │       │           _inputs.scss
    │   │       │           _labels.scss
    │   │       │           _morphing-buttons.scss
    │   │       │           _navbars.scss
    │   │       │           _social-buttons.scss
    │   │       │           _tabs.scss
    │   │       │           _transparency.scss
    │   │       │           _vendor-prefixes.scss
    │   │       │
    │   │       └───react-dates
    │   │               CalendarDay.scss
    │   │               CalendarMonth.scss
    │   │               CalendarMonthGrid.scss
    │   │               DateInput.scss
    │   │               DateRangePicker.scss
    │   │               DateRangePickerInput.scss
    │   │               DayPicker.scss
    │   │               DayPickerKeyboardShortcuts.scss
    │   │               DayPickerNavigation.scss
    │   │               SingleDatePicker.scss
    │   │               SingleDatePickerInput.scss
    │   │               styles.scss
    │   │               variables.scss
    │   │
    │   ├───components
    │   │   │   MobileMenu.js
    │   │   │   Switch.js
    │   │   │   Tags.js
    │   │   │   ThemeOptions.js
    │   │   │
    │   │   └───SideBar
    │   │           index.js
    │   │           Nav.js
    │   │           UserInfo.js
    │   │
    │   ├───config
    │   │       configureStore.js
    │   │
    │   ├───HelperAPI
    │   │       dashboardHelper.js
    │   │       proxyHelper.js
    │   │       taskHelper.js
    │   │       userHelper.js
    │   │       widgetConfigHelper.js
    │   │       widgetHelper.js
    │   │
    │   ├───pages
    │   │   ├───AboutUs
    │   │   │       index.js
    │   │   │
    │   │   ├───Dashboard
    │   │   │       index.js
    │   │   │
    │   │   └───Main
    │   │           Footer.js
    │   │           Header.js
    │   │           index.js
    │   │           UserInfo.js
    │   │
    │   ├───reducers
    │   │       Auth.js
    │   │       index.js
    │   │       Layout.js
    │   │       ThemeOptions.js
    │   │
    │   └───widgets
    │       ├───LunchFeed
    │       │       index.js
    │       │       LunchFeed.js
    │       │       LunchFeed.scss
    │       │
    │       ├───NewsFeed
    │       │       index.js
    │       │       NewsFeed.js
    │       │       NewsFeed.scss
    │       │
    │       ├───SalesChart
    │       │       SalesChart.js
    │       │
    │       ├───StockChart
    │       │       index.js
    │       │       StockChart.js
    │       │       StockChart.scss
    │       │
    │       ├───Task
    │       │       index.js
    │       │       TaskForm.js
    │       │       Tasks.js
    │       │
    │       └───Weather
    │               index.js
    │               Weather.js
    │               Weather.scss
    │               WeatherDisplay.js
    │
    └───server
        │   database.js
        │   index.js
        │
        ├───models
        │       DashboardConfig.js
        │       Task.js
        │       User.js
        │       Widget.js
        │       WidgetConfig.js
        │
        ├───routes
        │       dashboard.js
        │       lunch.js
        │       tasks.js
        │       users.js
        │       widgetconfig.js
        │       widgets.js
        │
        └───service
                ResturantMenu.js

```
## Author
Arjun, Mihai, Ohto

## License
Licensed under MIT, project forked from https://github.com/jslancerteam/crystal-dashboard
