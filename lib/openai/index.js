import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true
});

export const IS_RFQ_PROMPT = `
You are an AI assistant that helps determine if a given text is a Request for Quotation (RFQ) specifically for a Metal Service Center. 
An RFQ for a Metal Service Center typically includes details such as material specifications, quantities, processing services, delivery requirements, and contact information. 
Please analyze the following text and respond with either "Yes" or "No", do not provide additional information.`

export const GET_RFQ_DETAILS_PROMPT = `
You are an AI assistant that helps extract information from a given text that is a Request for Quotation (RFQ) specifically for a Metal Service Center. The extracted information should be structured in stringified JSON format.

An RFQ typically includes details such as:
- Material specifications (type, grade, dimensions, quantity)
- Processing services (type of service, details)
- Delivery requirements (location, date, method)
- Contact information (name, company, email, phone)

This is an example how the extracted information should be formatted:

{
  "RFQ Number": "RFQ-2024-003",
  "RFQ Date": "May 24, 2024",
  "Submission Deadline": "June 1, 2024",
  "Company Name": "DEF Fabrication Inc.",
  "Contact Person": {
      "Name": "Alice Johnson",
      "Email": "alice.johnson@deffabrication.com",
      "Phone": "(555) 654-3210"
  },
  "Materials": [
      {
          "Material": "Galvanized Steel Sheets",
          "Grade": "ASTM A653",
          "Thickness": "0.075 inches (14 gauge)",
          "Width": "48 inches",
          "Length": "96 inches",
          "Quantity": 300
      },
      {
          "Material": "Aluminum Extrusions",
          "Grade": "6063-T5",
          "Profile": "Square tube, 2 inches x 2 inches",
          "Wall Thickness": "0.125 inches",
          "Length": "12 feet",
          "Quantity": 100
      },
      {
          "Material": "Brass Rods",
          "Grade": "C36000",
          "Diameter": "1 inch",
          "Length": "6 feet",
          "Quantity": 50
      }
  ],
  "Processing Services": [
      {
          "Service": "Cutting",
          "Details": "Laser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1)"
      },
      {
          "Service": "Machining",
          "Details": "CNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2)"
      },
      {
          "Service": "Finishing",
          "Details": "Polishing of brass rods to a smooth finish"
      }
  ],
  "Delivery Requirements": {
      "Location": "DEF Fabrication Inc., 456 Industrial Road, Techville, USA",
      "Date": "August 1, 2024",
      "Shipping Method": "FOB Destination"
  },
  "Quality Requirements": {
      "Certification": "Mill test reports (MTR) required for all materials",
      "Inspection": "Visual and dimensional inspection reports required"
  },
  "Additional Information": {
      "Payment Terms": "Net 30 days",
      "Contract Duration": "One-time purchase with potential for recurring orders based on performance and pricing"
  },
  "Instructions to Suppliers": {
      "Quotation Submission": "Submit detailed quotation including itemized costs for materials and processing services. Include lead times and any restrictions.",
      "Evaluation Criteria": [
          "Pricing",
          "Delivery time",
          "Quality assurance capabilities",
          "Previous experience with similar projects",
          "References from other customers"
      ],
      "Contact for Clarifications": "Alice Johnson at alice.johnson@deffabrication.com or (555) 654-3210",
      "Submission": "Email quotation to alice.johnson@deffabrication.com with subject line 'RFQ-2024-003 Quotation Submission'"
  }
}

Please analyze the following text and extract the relevant details in the specified JSON format.
`;


export const QUOTE_GEN_PROMPT = `
You are an AI assistant tasked with generating a quote for a customer based on their Request for Quotation (RFQ) and current inventory stock. 
You need to analyze the RFQ details, check if the items requested are available in the inventory, and determine the total price for the quote.
If the order can be fulfilled, provide a quote. If the order can only be partially fulfilled, indicate the available quantity and provide a quote for that.
Use a reasonable markup of 20% for the sales price based on the inventory price. The quote should be formatted as a plain text email.

Generate the quote as a plain text email with the following format:

Subject: Quotation for RFQ - [Customer Company Name]

Dear [Customer Contact Name],

Thank you for your RFQ. Below is the quote based on the requested materials and our current inventory:

Materials:
- [Material 1]
  Type: [Material Type]
  Grade: [Material Grade]
  Specifications:
    - Thickness: [Thickness]
    - Width: [Width]
    - Length: [Length]
  Quantity: [Requested Quantity] (Available: [Available Quantity])
  Unit Price: $[Unit Price]
  Total Price: $[Total Price]

- [Material 2]
  Type: [Material Type]
  Grade: [Material Grade]
  Specifications:
    - Thickness: [Thickness]
    - Width: [Width]
    - Length: [Length]
  Quantity: [Requested Quantity] (Available: [Available Quantity])
  Unit Price: $[Unit Price]
  Total Price: $[Total Price]

Processing Services:
- [Service Type]: [Service Details]
  Price: $[Service Price]

Delivery:
Location: [Delivery Location]
Date: [Delivery Date]
Method: [Delivery Method]
Price: $[Delivery Price]

Total Quote Price: $[Total Quote Price]

If you have any questions or need further assistance, please do not hesitate to contact us.

Best regards,
[Your Name]
[Your Company Name]
[Your Contact Information]

---
`



export default async function getAIAnswer(prompt, text) {
    const completion = await openai.chat.completions.create({
        messages: [{ "role": "system", "content": prompt },
        { "role": "user", "content": `Text: ${text}` },],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content.trim();
}

export async function getAIGeneratedQuote(prompt = QUOTE_GEN_PROMPT, rfqDetails, inventory) {
    const completion = await openai.chat.completions.create({
        messages: [{ "role": "system", "content": prompt },
        {
            "role": "user", "content": `
    RFQ Details:
      ${rfqDetails}

    Inventory Stock:
    ${inventory}
    ` },],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content.trim();
}
