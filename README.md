# **Title Extractor**

## **Overview**

This project demonstrates a comparison of three different asynchronous programming approaches in Node.js: **Callbacks**, **Async Flow**, **Promises**, and **RSVP Promises**. The goal is to fetch website titles based on provided URLs using each of these methods. We will explore the benefits and drawbacks of each approach and conclude which one is the best for different use cases.

## **Approaches**

### **1\. Callbacks**

**Description**: 

The callback-based approach involves passing a function as an argument, which is invoked after the completion of an asynchronous operation.

* **Advantages**:  
  * Simple and easy to understand for small codebases.  
  * Immediate feedback on completion or failure.  
* **Drawbacks**:  
  * Can lead to **callback hell** as more asynchronous calls are nested, making the code harder to read and maintain.  
  * Error handling can become complex when dealing with multiple nested callbacks.

### **2\. Async Flow (using `async.js`)**

**Description**: 

This approach leverages a flow control library, `async.js`, to manage asynchronous operations more efficiently.

* **Advantages**:  
  * Solves the problem of callback hell by organizing the flow of multiple asynchronous operations.  
  * Easier error handling with centralized callback functions.  
  * Allows concurrent and sequential execution of asynchronous tasks.  
* **Drawbacks**:  
  * Adds a dependency on an external library (`async.js`).  
  * Slightly more verbose syntax than promises or async/await.

### **3\. Promises**

**Description**: 

Promises allow chaining of asynchronous operations with a clearer and more manageable syntax.

* **Advantages**:  
  * More readable and maintainable than callbacks.  
  * Can chain multiple asynchronous operations easily with `.then()`.  
  * Built-in error handling with `.catch()` makes the flow easy to understand.  
* **Drawbacks**:  
  * May become verbose with deeply nested chains, but better than callback hell.

### **4\. RSVP (Promise Library)**

**Description**: 

RSVP is a promise library similar to native Promises, but it provides enhanced functionality, including finer control over promise states and more utilities.

* **Advantages**:  
  * Same benefits as Promises, but with additional features for finer control.  
  * Can integrate easily with existing codebases using promises.  
* **Drawbacks**:  
  * Adds an additional dependency (`RSVP.js`), though this may provide more flexibility.

### **Conclusion: Best Approach**

* For small, one-off operations: **Callbacks** are simple and easy.  
* For larger applications: **Promises** or **RSVP** provide better readability, error handling, and scalability.  
* When dealing with complex asynchronous flows or concurrent operations: **Async.js** is powerful and organized but adds extra dependencies.

For general purposes, **Promises** (or RSVP) strike the best balance between simplicity, readability, and functionality, especially for scalable code.

---

## **Test Cases**

Unit tests have been written for the `titleController` and `titleService` modules to ensure the correctness of the three asynchronous approaches. You can find the test cases in the `tests/` directory.

To run the tests, simply execute:
 
`npm test`

### **Code Coverage Report**

This project includes a coverage report to track test coverage across the codebase.

Current Coverage Report:
![Backend Coverage](./tests/coverage_report.png)

To generate the coverage report:

`npm run test:coverage`

The coverage report will be outputted in the `coverage/` folder.

---

## **APIs**

The following APIs allow the client to fetch website titles using different asynchronous approaches.

### **1\. Get Titles using Callbacks**

* **Endpoint**: `/I/want/title/callbacks`  
* **Method**: GET  
* **Query Params**:  
  * `address` (required): URL of the website to fetch the title from.

**Example**:

`/I/want/title/callbacks?address=www.google.com`

### **2\. Get Titles using Async Flow (async.js)**

* **Endpoint**: `/I/want/title/asyncflow`  
* **Method**: GET  
* **Query Params**:  
  * `address` (required): URL of the website to fetch the title from.

**Example**:

`/I/want/title/asyncflow?address=www.yahoo.com`

### **3\. Get Titles using Promises**

* **Endpoint**: `/I/want/title/promises`  
* **Method**: GET  
* **Query Params**:  
  * `address` (required): URL of the website to fetch the title from.

**Example**:

`/I/want/title/promises?address=www.google.com`

### **4\. Get Titles using RSVP**

* **Endpoint**: `/I/want/title/rsvp`  
* **Method**: GET  
* **Query Params**:  
  * `address` (required): URL of the website to fetch the title from.

**Example**:  

`/I/want/title/rsvp?address=www.google.com`  

---

## **Security**

Currently, there is no authentication or token-based security in place for the APIs. However, we can easily add security by implementing token-based authentication using a middleware function. This would require passing a valid token with each API request, ensuring only authorized clients can access the service.

---

## **How to Run**

1. Install dependencies:

    `npm install`


2. Start the server:

    `npm start`


3. Access the APIs at `localhost:{PORT}/I/want/title/*`.

---

## **🙏 Acknowledgements**


Thank you for checking out this project\! I truly appreciate your time and interest. If you have any questions, feedback, or suggestions, feel free to reach out to me.  

---

## **📬 Contact**

You can reach me at:

Email: uzair.raza20@outlook.com  
LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/uzairraza120)  
I would love to hear from you\! 😊  

---

If you find this project helpful, consider giving it a ⭐ on [GitHub](https://github.com/uzair120/web-title-extractor). It helps others find it too\!  
