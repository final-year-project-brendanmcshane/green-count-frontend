# Green Count – Frontend

Green Count is a web app that helps users track their carbon emissions across different activities. The frontend is built using Angular 18 and connects to a Flask backend and Supabase database. Users can log daily activities, view charts showing emission levels, track food-related emissions, and get AI-powered tips to reduce their impact.

## 🌱 Features

- 🔐 **User Login** – Secure login and signup using Supabase
- ➕ **Add Emissions** – Log activities like travel, electricity, etc.
- 📊 **Charts** – Weekly and overall emissions visualized using Highcharts
- 📅 **Daily Emissions** – See logged entries broken down by date
- 🍽️ **Food Emissions** – Separate section for food-related carbon data
- 💡 **Tip of the Day** – Quick advice shown on the home screen
- 🧠 **AI Suggestions** – OpenAI-powered tips to help reduce your footprint
- ℹ️ **Information Page** – Useful tips, helpful links, and guidance
- 🧭 **Navigation** – Clean UI with a top navbar for easy access

## 🛠️ Technologies Used

- **Angular 18** – Built with standalone components (no modules)
- **Highcharts** – Emission data visualization
- **Supabase** – Auth and backend data storage
- **Flask** – REST API backend
- **OpenAI API** – AI suggestions and tip generation
- **Bootstrap** – Styling and layout
- **GitHub Actions** – Continuous integration with test runs
- **Karma + Jasmine** – Unit testing framework

## 🚀 Getting Started

To run locally:

1. Clone the repo
2. Run `npm install`
3. Run `ng serve`
4. Visit `http://localhost:4200/` in your browser

## 🧪 Testing

Run tests and generate a coverage report:

```bash
ng test --code-coverage
```
Output summary:
 ✅ All 104 tests pass
 📈 Coverage:
 - Statements: 82.82%
 - Branches: 59.67%
 - Functions: 81.14%
 - Lines: 81.23%


### Screencast :
For a quick walkthrough of how the Green Count app works, check out this screencast where I demonstrate using the website:

[Watch the Green Count Screencast](https://www.youtube.com/watch?v=UW_Tw9hZBjc)