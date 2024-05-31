# Quotes Generation Service

- Requirements: https://cloudforge.notion.site/Take-Home-Screen-52af58a7b82e46fa92fe8975101fa539
- Demo: https://drive.google.com/file/d/15_GDeLqlxRnVLSZxKgqi5QvYgDT6jM8N/view?usp=sharing

## Approach

### 1. Understating the problem 
When the test was sent to me a week ago from today (05/31/2024), it didn't have an "Example Data" section. Therefore, I used ChatGPT:
- To remind myself what Metal Service Centers are
- What's a RFQ and generated examples
- What ERP means
- To generate quotes and products examples 

### 2. Assumptions 

- We should have persistent data. In other words, generated and sent quotes should be stored in a database
- The inventory or products details should be fetched from another system/API. For simplicity, I stored them in my database
- RFQ emails should have a consistent format, generally speaking. The app expects something similar to: https://github.com/Jeffrey-A/quotes-gen/blob/main/lib/openai/request-for-quote-example.txt

### 3. Design the system

Made a simple system design to get an idea about how the complete system is going to work. I designed it based on the problem statement. 


- The quote generation engine will poll the email inbox using the email provider's API to get new emails
- Then it will use the Ai service to detect RFQ emails and extract the details, communicate with the ERP API to confirm that the requested products are in stock, and generate the quote (possibly using the Ai service again)- Use the database to store the generated quotes

### 4. Technology Stack

- Framework: Next.js
- Database: Firebase
- Ai Service: OpenAI
- Email Sender: SendGrid

## Running it locally 
TODO
