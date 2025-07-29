# Debt Consolidation Savings Calculator

This tool helps you evaluate the potential benefits of consolidating your debts. It allows you to input details about your current debts (balances, interest rates, minimum payments) and then compare them against a potential consolidation loan.


## What it Does

*   **Analyzes Current Debts:** Input details like balances, interest rates, and monthly payments for your various debts (e.g., credit cards, personal loans).
*   **Estimates Potential Savings:** Compares your current debt scenario with a consolidated loan to show potential interest savings over time.
*   **Calculates New Monthly Payments:** Provides an estimate of your single, lower monthly payment after consolidation.
*   **Compares Scenarios:** Helps you experiment with different repayment terms to find a consolidation plan that fits your budget and financial goals.
*   **Simplifies Debt Management:** Visualizes the benefits of consolidating multiple debts into a single, easier-to-manage loan.

By using this calculator, you can gain clarity on your financial situation and make informed decisions about whether debt consolidation is the right path for you.



## Available Scripts

To install all the dependencies, you can run:

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Financial Library Document
You can learn more about the [financialjs library](https://financialjs.netlify.app/)

## Future improvements
There are some edge cases where NaN might get displayed for wrongful entry. A better check for user input can be done here, ensuring the right monthly payment is entered for a certain amount of debt with the corresponding APR.

## TASK
Assignment: Build a browser based Debt Consolidation Savings Calculator

Background: Consumers may have many high interest debts, like auto loans, credit cards, or other installment loans. They can save money by combining all of their high interest debts into a single loan with a lower interest rate.

We want to help consumers determine exactly how much money they can save by consolidating their loans.

Description: Use the prototype to create a browser based debt consolidation savings calculator.

Users can enter the details of their multiple high interest debts, and the calculator will show them how much they can save with a single consolidated loan. The amount of the new loan will be the sum of the outstanding balances of the existing loans. The user can change the potential term and APR of their consolidated loan to see how those affect the monthly payments and overall repayment.

The solution would preferably be written in React, but any modern Javascript framework will be acceptable (not JQuery). The submission should run in any modern browser (IE compatibility not required) A financial calculations library has been included to simplify the loan calculations. Check the link for documentation. Some people seem to have issues figuring out how to use the recommended library, so feel free to use other libraries.

### Links
Prototype: https://www.figma.com/proto/LVGPlj3qxywOt4zPagrFTX/Debt-Consolidation-Savings-Calculator?node-id=1%3A2&scaling=min-zoom&page-id=0%3A1

Finance.js Loan Library: https://trentrichardson.com/examples/FinanceJs/index.html

