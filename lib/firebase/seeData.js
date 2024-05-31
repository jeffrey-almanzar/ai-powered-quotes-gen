export const products = [
    {
        "type": "Steel",
        "forms": [
            {
                "name": "Hot Rolled Steel Plate",
                "grade": "ASTM A36",
                "specifications": {
                    "thickness": "0.25 to 1 inch",
                    "width": "48 to 96 inches",
                    "length": "96 to 240 inches"
                },
                "quantity": 500,
                "price": 150.00
            },
            {
                "name": "Cold Rolled Steel Sheet",
                "grade": "ASTM A1008",
                "specifications": {
                    "thickness": "0.012 to 0.5 inch",
                    "width": "12 to 60 inches",
                    "length": "96 to 144 inches"
                },
                "quantity": 1000,
                "price": 75.00
            },
            {
                "name": "Galvanized Steel Coil",
                "grade": "ASTM A653",
                "specifications": {
                    "thickness": "0.014 to 0.135 inch",
                    "width": "36 to 72 inches"
                },
                "quantity": 300,
                "price": 2000.00
            }
        ]
    },
    {
        "type": "Aluminum",
        "forms": [
            {
                "name": "Aluminum Sheet",
                "grade": "5052-H32",
                "specifications": {
                    "thickness": "0.02 to 0.25 inch",
                    "width": "48 to 60 inches",
                    "length": "96 to 144 inches"
                },
                "quantity": 750,
                "price": 100.00
            },
            {
                "name": "Aluminum Plate",
                "grade": "6061-T651",
                "specifications": {
                    "thickness": "0.25 to 4 inches",
                    "width": "48 to 96 inches",
                    "length": "96 to 240 inches"
                },
                "quantity": 200,
                "price": 300.00
            },
            {
                "name": "Aluminum Extrusions",
                "grade": "6063-T5",
                "specifications": {
                    "shapes": ["Angles", "Channels", "Round Tubes", "Square Tubes"],
                    "dimensions": "Custom sizes available"
                },
                "quantity": 150,
                "price": 50.00
            }
        ]
    },
    {
        "type": "Stainless Steel",
        "forms": [
            {
                "name": "Stainless Steel Sheet",
                "grade": "304",
                "specifications": {
                    "thickness": "0.018 to 0.1874 inch",
                    "width": "36 to 72 inches",
                    "length": "96 to 144 inches"
                },
                "quantity": 600,
                "price": 200.00
            },
            {
                "name": "Stainless Steel Plate",
                "grade": "316L",
                "specifications": {
                    "thickness": "0.25 to 4 inches",
                    "width": "48 to 96 inches",
                    "length": "96 to 240 inches"
                },
                "quantity": 250,
                "price": 500.00
            },
            {
                "name": "Stainless Steel Tubing",
                "grade": "304",
                "specifications": {
                    "outerDiameter": "0.5 to 8 inches",
                    "wallThickness": "0.035 to 0.5 inch",
                    "length": "Up to 24 feet"
                },
                "quantity": 400,
                "price": 30.00
            }
        ]
    },
    {
        "type": "Brass",
        "forms": [
            {
                "name": "Brass Sheet",
                "grade": "C260",
                "specifications": {
                    "thickness": "0.02 to 0.125 inch",
                    "width": "36 to 48 inches",
                    "length": "96 to 144 inches"
                },
                "quantity": 350,
                "price": 120.00
            },
            {
                "name": "Brass Rod",
                "grade": "C360",
                "specifications": {
                    "diameter": "0.125 to 4 inches",
                    "length": "Up to 12 feet"
                },
                "quantity": 500,
                "price": 15.00
            }
        ]
    }
];

export const quotes = [
    {
        "aiGeneratedEmail": "Dear John Smith,\n\nThank you for your RFQ. Below is the quote based on the requested materials and our current inventory:\n\nMaterials:\n- Galvanized Steel Sheets\n  Type: Steel\n  Grade: ASTM A653\n  Specifications:\n    - Thickness: 0.075 inches (14 gauge)\n    - Width: 48 inches\n    - Length: 96 inches\n  Quantity: 300 (Available: 300)\n  Unit Price: $200.00\n  Total Price: $60,000.00\n\n- Aluminum Extrusions\n  Type: Aluminum\n  Grade: 6063-T5\n  Specifications:\n    - Profile: Square tube, 2 inches x 2 inches\n    - Wall Thickness: 0.125 inches\n    - Length: 12 feet\n  Quantity: 100 (Available: 150)\n  Unit Price: $60.00\n  Total Price: $6,000.00\n\n- Brass Rods\n  Type: Brass\n  Grade: C36000\n  Specifications:\n    - Diameter: 1 inch\n    - Length: 6 feet\n  Quantity: 50 (Available: 500)\n  Unit Price: $18.00\n  Total Price: $900.00\n\nProcessing Services:\n- Cutting: Laser cutting of galvanized steel sheets to specified shapes as per attached DXF files.\n  Price: $500.00\n\n- Machining: CNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings.\n  Price: $400.00\n\n- Finishing: Polishing of brass rods to a smooth finish\n  Price: $150.00\n\nDelivery:\nLocation: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDate: August 1, 2024\nMethod: FOB Destination\nPrice: $200.00\n\nTotal Quote Price: $67,650.00\n\nIf you have any questions or need further assistance, please do not hesitate to contact us.\n\nBest regards,\n[Your Name]\n[Your Company Name]\n[Your Contact Information]",
        "company": "ABC Manufacturing Inc.",
        "contactPersonEmail": "john.smith@abcmfg.com",
        "contactPersonName": "John Smith",
        "date": "2024-05-31T10:29:25.810Z",
        "emailSubject": "Quotation for RFQ - ABC Manufacturing Inc.",
        "id": "-NzDBbmWjn_KaCXxVNbS",
        "name": "Quote for ABC Manufacturing Inc.",
        "originalEmail": "Request for Quotation (RFQ)\n\nDate: May 24, 2024\n\nCompany Name: ABC Manufacturing Inc.\n\nContact Person: John Smith\n\nContact Email: john.smith@abcmfg.com\n\nContact Phone: (555) 654-3210\n\nRFQ Number: RFQ-2024-003\n\nSubmission Deadline: June 1, 2024\n\nItem Description:\nMaterial: Galvanized Steel Sheets\n\nGrade: ASTM A653\nThickness: 0.075 inches (14 gauge)\nWidth: 48 inches\nLength: 96 inches\nQuantity: 300 sheets\nMaterial: Aluminum Extrusions\n\nGrade: 6063-T5\nProfile: Square tube, 2 inches x 2 inches\nWall Thickness: 0.125 inches\nLength: 12 feet\nQuantity: 100 extrusions\nMaterial: Brass Rods\n\nGrade: C36000\nDiameter: 1 inch\nLength: 6 feet\nQuantity: 50 rods\nProcessing Services:\nCutting:\n\nLaser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1).\nMachining:\n\nCNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2).\nFinishing:\n\nPolishing of brass rods to a smooth finish.\nDelivery Requirements:\nDelivery Location: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDelivery Date: August 1, 2024\nShipping Method: FOB Destination\nQuality Requirements:\nCertification: Mill test reports (MTR) required for all materials.\nInspection: Visual and dimensional inspection reports required.\nAdditional Information:\nPayment Terms: Net 30 days\nContract Duration: One-time purchase with potential for recurring orders based on performance and pricing.\nInstructions to Suppliers:\nQuotation Submission:\n\nPlease submit your detailed quotation including itemized costs for materials and processing services.\nInclude lead times for each item and service.\nSpecify any minimum order quantities or other restrictions.\nEvaluation Criteria:\n\nPricing\nDelivery time\nQuality assurance capabilities\nPrevious experience with similar projects\nReferences from other customers\nContact for Clarifications:\n\nFor any questions regarding this RFQ, contact Alice Johnson at the above email or phone number.\nSubmission:\n\nEmail your quotation to alice.johnson@deffabrication.com with the subject line \"RFQ-2024-003 Quotation Submission\".\n",
        "status": "Draft"
    },
    {
        "aiGeneratedEmail": "Dear Sarah Johnson,\n\nThank you for your RFQ. Below is the quote based on the requested materials and our current inventory:\n\nMaterials:\n- Galvanized Steel Sheets\n  Type: Steel\n  Grade: ASTM A653\n  Specifications:\n    - Thickness: 0.075 inches (14 gauge)\n    - Width: 48 inches\n    - Length: 96 inches\n  Quantity: 300 (Available: 300)\n  Unit Price: $200.00\n  Total Price: $60,000.00\n\n- Aluminum Extrusions\n  Type: Aluminum\n  Grade: 6063-T5\n  Specifications:\n    - Profile: Square tube, 2 inches x 2 inches\n    - Wall Thickness: 0.125 inches\n    - Length: 12 feet\n  Quantity: 100 (Available: 150)\n  Unit Price: $60.00\n  Total Price: $6,000.00 (Available Quantity)\n\n- Brass Rods\n  Type: Brass\n  Grade: C36000\n  Specifications:\n    - Diameter: 1 inch\n    - Length: 6 feet\n  Quantity: 50 (Available: 500)\n  Unit Price: $18.00\n  Total Price: $900.00\n\nProcessing Services:\n- Cutting: Laser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1)\n  Price: $500.00\n\n- Machining: CNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2)\n  Price: $400.00\n\n- Finishing: Polishing of brass rods to a smooth finish\n  Price: $50.00\n\nDelivery:\nLocation: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDate: August 1, 2024\nMethod: FOB Destination\nPrice: $200.00\n\nTotal Quote Price: $67,550.00\n\nIf you have any questions or need further assistance, please do not hesitate to contact us.\n\nBest regards,\n[Your Name]\n[Your Company Name]\n[Your Contact Information]",
        "company": "XYZ Industries LLC",
        "contactPersonEmail": "sarah.johnson@xyzindustries.com",
        "contactPersonName": "Sarah Johnson",
        "date": "2024-05-31T10:30:46.402Z",
        "emailSubject": "Quotation for RFQ - XYZ Industries LLC",
        "id": "-NzDBvLws1MnNSUwqgM2",
        "name": "Quote for XYZ Industries LLC",
        "originalEmail": "Request for Quotation (RFQ)\n\nDate: May 24, 2024\n\nCompany Name: XYZ Industries LLC\n\nContact Person: Sarah Johnson\n\nContact Email: sarah.johnson@xyzindustries.com\n\nContact Phone: (555) 654-3210\n\nRFQ Number: RFQ-2024-003\n\nSubmission Deadline: June 1, 2024\n\nItem Description:\nMaterial: Galvanized Steel Sheets\n\nGrade: ASTM A653\nThickness: 0.075 inches (14 gauge)\nWidth: 48 inches\nLength: 96 inches\nQuantity: 300 sheets\nMaterial: Aluminum Extrusions\n\nGrade: 6063-T5\nProfile: Square tube, 2 inches x 2 inches\nWall Thickness: 0.125 inches\nLength: 12 feet\nQuantity: 100 extrusions\nMaterial: Brass Rods\n\nGrade: C36000\nDiameter: 1 inch\nLength: 6 feet\nQuantity: 50 rods\nProcessing Services:\nCutting:\n\nLaser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1).\nMachining:\n\nCNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2).\nFinishing:\n\nPolishing of brass rods to a smooth finish.\nDelivery Requirements:\nDelivery Location: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDelivery Date: August 1, 2024\nShipping Method: FOB Destination\nQuality Requirements:\nCertification: Mill test reports (MTR) required for all materials.\nInspection: Visual and dimensional inspection reports required.\nAdditional Information:\nPayment Terms: Net 30 days\nContract Duration: One-time purchase with potential for recurring orders based on performance and pricing.\nInstructions to Suppliers:\nQuotation Submission:\n\nPlease submit your detailed quotation including itemized costs for materials and processing services.\nInclude lead times for each item and service.\nSpecify any minimum order quantities or other restrictions.\nEvaluation Criteria:\n\nPricing\nDelivery time\nQuality assurance capabilities\nPrevious experience with similar projects\nReferences from other customers\nContact for Clarifications:\n\nFor any questions regarding this RFQ, contact Alice Johnson at the above email or phone number.\nSubmission:\n\nEmail your quotation to alice.johnson@deffabrication.com with the subject line \"RFQ-2024-003 Quotation Submission\".\n",
        "status": "Draft"
    },
    {
        "aiGeneratedEmail": "Dear Michael Brown,\n\nThank you for your RFQ. Below is the quote based on the requested materials and our current inventory:\n\nMaterials:\n- Galvanized Steel Sheets\n  Type: Steel\n  Grade: ASTM A653\n  Specifications:\n    - Thickness: 0.075 inches (14 gauge)\n    - Width: 48 inches\n    - Length: 96 inches\n  Quantity: 300 (Available: 300)\n  Unit Price: $200.00\n  Total Price: $60,000.00\n\n- Aluminum Extrusions\n  Type: Aluminum\n  Grade: 6063-T5\n  Specifications:\n    - Profile: Square tube, 2 inches x 2 inches\n    - Wall Thickness: 0.125 inches\n    - Length: 12 feet\n  Quantity: 100 (Available: 150)\n  Unit Price: $50.00\n  Total Price: $5,000.00\n\n- Brass Rods\n  Type: Brass\n  Grade: C36000\n  Specifications:\n    - Diameter: 1 inch\n    - Length: 6 feet\n  Quantity: 50 (Available: 500)\n  Unit Price: $15.00\n  Total Price: $750.00\n\nProcessing Services:\n- Cutting: Laser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1).\n  Price: $500.00\n\n- Machining: CNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2).\n  Price: $400.00\n\n- Finishing: Polishing of brass rods to a smooth finish.\n  Price: $100.00\n\nDelivery:\nLocation: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDate: August 1, 2024\nMethod: FOB Destination\nPrice: $200.00\n\nTotal Quote Price: $66,950.00\n\nIf you have any questions or need further assistance, please do not hesitate to contact us.\n\nBest regards,\n[Your Name]\n[Your Company Name]\n[Your Contact Information]",
        "company": "Pinnacle Engineering",
        "contactPersonEmail": "michael.brown@pinnacleeng.com",
        "contactPersonName": "Michael Brown",
        "date": "2024-05-31T10:32:49.696Z",
        "emailSubject": "Quotation for RFQ - Pinnacle Engineering",
        "id": "-NzDCOTCjMsI0EPiz1W2",
        "name": "Quote for Pinnacle Engineering",
        "originalEmail": "Request for Quotation (RFQ)\n\nDate: May 24, 2024\n\nCompany Name: Pinnacle Engineering\n\nContact Person: Michael Brown\n\nContact Email: michael.brown@pinnacleeng.com\n\nContact Phone: (555) 654-3210\n\nRFQ Number: RFQ-2024-003\n\nSubmission Deadline: June 1, 2024\n\nItem Description:\nMaterial: Galvanized Steel Sheets\n\nGrade: ASTM A653\nThickness: 0.075 inches (14 gauge)\nWidth: 48 inches\nLength: 96 inches\nQuantity: 300 sheets\nMaterial: Aluminum Extrusions\n\nGrade: 6063-T5\nProfile: Square tube, 2 inches x 2 inches\nWall Thickness: 0.125 inches\nLength: 12 feet\nQuantity: 100 extrusions\nMaterial: Brass Rods\n\nGrade: C36000\nDiameter: 1 inch\nLength: 6 feet\nQuantity: 50 rods\nProcessing Services:\nCutting:\n\nLaser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1).\nMachining:\n\nCNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2).\nFinishing:\n\nPolishing of brass rods to a smooth finish.\nDelivery Requirements:\nDelivery Location: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDelivery Date: August 1, 2024\nShipping Method: FOB Destination\nQuality Requirements:\nCertification: Mill test reports (MTR) required for all materials.\nInspection: Visual and dimensional inspection reports required.\nAdditional Information:\nPayment Terms: Net 30 days\nContract Duration: One-time purchase with potential for recurring orders based on performance and pricing.\nInstructions to Suppliers:\nQuotation Submission:\n\nPlease submit your detailed quotation including itemized costs for materials and processing services.\nInclude lead times for each item and service.\nSpecify any minimum order quantities or other restrictions.\nEvaluation Criteria:\n\nPricing\nDelivery time\nQuality assurance capabilities\nPrevious experience with similar projects\nReferences from other customers\nContact for Clarifications:\n\nFor any questions regarding this RFQ, contact Alice Johnson at the above email or phone number.\nSubmission:\n\nEmail your quotation to alice.johnson@deffabrication.com with the subject line \"RFQ-2024-003 Quotation Submission\".\n",
        "status": "Draft"
    },
    {
        "aiGeneratedEmail": "Dear Emily Davis,\n\nThank you for your RFQ. Below is the quote based on the requested materials and our current inventory:\n\nMaterials:\n- Galvanized Steel Sheets\n  Type: Galvanized Steel\n  Grade: ASTM A653\n  Specifications:\n    - Thickness: 0.075 inches (14 gauge)\n    - Width: 48 inches\n    - Length: 96 inches\n  Quantity: 300 (Available: 300)\n  Unit Price: $200.00\n  Total Price: $60,000.00\n\n- Aluminum Extrusions\n  Type: Aluminum\n  Grade: 6063-T5\n  Specifications:\n    - Profile: Square tube, 2 inches x 2 inches\n    - Wall Thickness: 0.125 inches\n    - Length: 12 feet\n  Quantity: 100 (Available: 150)\n  Unit Price: $60.00\n  Total Price: $6,000.00\n\n- Brass Rods\n  Type: Brass\n  Grade: C36000\n  Specifications:\n    - Diameter: 1 inch\n    - Length: 6 feet\n  Quantity: 50 (Available: 500)\n  Unit Price: $18.00\n  Total Price: $900.00\n\nProcessing Services:\n- Cutting: Laser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1).\n  Price: $500.00\n\n- Machining: CNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2).\n  Price: $400.00\n\n- Finishing: Polishing of brass rods to a smooth finish.\n  Price: $50.00\n\nDelivery:\nLocation: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDate: August 1, 2024\nMethod: FOB Destination\nPrice: $200.00\n\nTotal Quote Price: $67,550.00\n\nIf you have any questions or need further assistance, please do not hesitate to contact us.\n\nBest regards,\n[Your Name]\n[Your Company Name]\n[Your Contact Information]",
        "company": "Summit Fabrication Corp.",
        "contactPersonEmail": "emily.davis@summitfab.com",
        "contactPersonName": "Emily Davis",
        "date": "2024-05-31T10:34:21.959Z",
        "emailSubject": "Quotation for RFQ - Summit Fabrication Corp.",
        "id": "-NzDCjzRK23dLhC6OGtU",
        "name": "Quote for Summit Fabrication Corp.",
        "originalEmail": "Request for Quotation (RFQ)\n\nDate: May 24, 2024\n\nCompany Name: Summit Fabrication Corp.\n\nContact Person: Emily Davis\n\nContact Email: emily.davis@summitfab.com\n\nContact Phone: (555) 654-3210\n\nRFQ Number: RFQ-2024-003\n\nSubmission Deadline: June 1, 2024\n\nItem Description:\nMaterial: Galvanized Steel Sheets\n\nGrade: ASTM A653\nThickness: 0.075 inches (14 gauge)\nWidth: 48 inches\nLength: 96 inches\nQuantity: 300 sheets\nMaterial: Aluminum Extrusions\n\nGrade: 6063-T5\nProfile: Square tube, 2 inches x 2 inches\nWall Thickness: 0.125 inches\nLength: 12 feet\nQuantity: 100 extrusions\nMaterial: Brass Rods\n\nGrade: C36000\nDiameter: 1 inch\nLength: 6 feet\nQuantity: 50 rods\nProcessing Services:\nCutting:\n\nLaser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1).\nMachining:\n\nCNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2).\nFinishing:\n\nPolishing of brass rods to a smooth finish.\nDelivery Requirements:\nDelivery Location: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDelivery Date: August 1, 2024\nShipping Method: FOB Destination\nQuality Requirements:\nCertification: Mill test reports (MTR) required for all materials.\nInspection: Visual and dimensional inspection reports required.\nAdditional Information:\nPayment Terms: Net 30 days\nContract Duration: One-time purchase with potential for recurring orders based on performance and pricing.\nInstructions to Suppliers:\nQuotation Submission:\n\nPlease submit your detailed quotation including itemized costs for materials and processing services.\nInclude lead times for each item and service.\nSpecify any minimum order quantities or other restrictions.\nEvaluation Criteria:\n\nPricing\nDelivery time\nQuality assurance capabilities\nPrevious experience with similar projects\nReferences from other customers\nContact for Clarifications:\n\nFor any questions regarding this RFQ, contact Alice Johnson at the above email or phone number.\nSubmission:\n\nEmail your quotation to alice.johnson@deffabrication.com with the subject line \"RFQ-2024-003 Quotation Submission\".\n",
        "status": "Sent"
    },
    {
        "aiGeneratedEmail": "Dear David Wilson,\n\nThank you for your RFQ. Below is the quote based on the requested materials and our current inventory:\n\nMaterials:\n- Galvanized Steel Sheets\n  Type: N/A\n  Grade: ASTM A653\n  Specifications:\n    - Thickness: 0.075 inches (14 gauge)\n    - Width: 48 inches\n    - Length: 96 inches\n  Quantity: 300 (Available: 300)\n  Unit Price: $200.00\n  Total Price: $60,000.00\n\n- Aluminum Extrusions\n  Type: N/A\n  Grade: 6063-T5\n  Specifications:\n    - Profile: Square tube, 2 inches x 2 inches\n    - Wall Thickness: 0.125 inches\n    - Length: 12 feet\n  Quantity: 100 (Available: 100)\n  Unit Price: $60.00\n  Total Price: $6,000.00\n\n- Brass Rods\n  Type: N/A\n  Grade: C36000\n  Specifications:\n    - Diameter: 1 inch\n    - Length: 6 feet\n  Quantity: 50 (Available: Not Available)\n  Unit Price: $18.00\n  Total Price: $900.00\n\nProcessing Services:\n- Cutting: Laser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1)\n  Price: $500.00\n\n- Machining: CNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2)\n  Price: $200.00\n\n- Finishing: Polishing of brass rods to a smooth finish\n  Price: $100.00\n\nDelivery:\nLocation: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDate: August 1, 2024\nMethod: FOB Destination\nPrice: $300.00\n\nTotal Quote Price: $67,100.00\n\nIf you have any questions or need further assistance, please do not hesitate to contact us.\n\nBest regards,\n[Your Name]\n[Your Company Name]\n[Your Contact Information]",
        "company": "Precision Metalworks Ltd.",
        "contactPersonEmail": "david.wilson@precisionmetalworks.com",
        "contactPersonName": "David Wilson",
        "date": "2024-05-31T10:36:57.072Z",
        "emailSubject": "Quotation for RFQ - Precision Metalworks Ltd.",
        "id": "-NzDDKyobLW26FI_X5-6",
        "name": "Quote for Precision Metalworks Ltd.",
        "originalEmail": "Request for Quotation (RFQ)\n\nDate: May 24, 2024\n\nCompany Name: Precision Metalworks Ltd.\n\nContact Person: David Wilson\n\nContact Email: david.wilson@precisionmetalworks.com\n\nContact Phone: (555) 654-3210\n\nRFQ Number: RFQ-2024-003\n\nSubmission Deadline: June 1, 2024\n\nItem Description:\nMaterial: Galvanized Steel Sheets\n\nGrade: ASTM A653\nThickness: 0.075 inches (14 gauge)\nWidth: 48 inches\nLength: 96 inches\nQuantity: 300 sheets\nMaterial: Aluminum Extrusions\n\nGrade: 6063-T5\nProfile: Square tube, 2 inches x 2 inches\nWall Thickness: 0.125 inches\nLength: 12 feet\nQuantity: 100 extrusions\nMaterial: Brass Rods\n\nGrade: C36000\nDiameter: 1 inch\nLength: 6 feet\nQuantity: 50 rods\nProcessing Services:\nCutting:\n\nLaser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1).\nMachining:\n\nCNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2).\nFinishing:\n\nPolishing of brass rods to a smooth finish.\nDelivery Requirements:\nDelivery Location: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDelivery Date: August 1, 2024\nShipping Method: FOB Destination\nQuality Requirements:\nCertification: Mill test reports (MTR) required for all materials.\nInspection: Visual and dimensional inspection reports required.\nAdditional Information:\nPayment Terms: Net 30 days\nContract Duration: One-time purchase with potential for recurring orders based on performance and pricing.\nInstructions to Suppliers:\nQuotation Submission:\n\nPlease submit your detailed quotation including itemized costs for materials and processing services.\nInclude lead times for each item and service.\nSpecify any minimum order quantities or other restrictions.\nEvaluation Criteria:\n\nPricing\nDelivery time\nQuality assurance capabilities\nPrevious experience with similar projects\nReferences from other customers\nContact for Clarifications:\n\nFor any questions regarding this RFQ, contact Alice Johnson at the above email or phone number.\nSubmission:\n\nEmail your quotation to alice.johnson@deffabrication.com with the subject line \"RFQ-2024-003 Quotation Submission\".\n",
        "status": "Draft"
    },
    {
        "aiGeneratedEmail": "Dear Lisa Martinez,\n\nThank you for your RFQ. Below is the quote based on the requested materials and our current inventory:\n\nMaterials:\n- Galvanized Steel Sheets\n  Type: Steel\n  Grade: ASTM A653\n  Specifications:\n    - Thickness: 0.075 inches (14 gauge)\n    - Width: 48 inches\n    - Length: 96 inches\n  Quantity: 300 (Available: 300)\n  Unit Price: $200.00\n  Total Price: $60,000.00\n\n- Aluminum Extrusions\n  Type: Aluminum\n  Grade: 6063-T5\n  Specifications:\n    - Profile: Square tube, 2 inches x 2 inches\n    - Wall Thickness: 0.125 inches\n    - Length: 12 feet\n  Quantity: 100 (Available: 150)\n  Unit Price: $50.00\n  Total Price: $6,000.00\n\n- Brass Rods\n  Type: Brass\n  Grade: C36000\n  Specifications:\n    - Diameter: 1 inch\n    - Length: 6 feet\n  Quantity: 50 (Available: 500)\n  Unit Price: $15.00\n  Total Price: $750.00\n\nProcessing Services:\n- Cutting: Laser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1).\n  Price: $500.00\n\n- Machining: CNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2).\n  Price: $400.00\n\n- Finishing: Polishing of brass rods to a smooth finish.\n  Price: $100.00\n\nDelivery:\nLocation: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDate: August 1, 2024\nMethod: FOB Destination\nPrice: $200.00\n\nTotal Quote Price: $67,850.00\n\nIf you have any questions or need further assistance, please do not hesitate to contact us.\n\nBest regards,\n[Your Name]\n[Your Company Name]\n[Your Contact Information]",
        "company": "Evergreen Construction Materials",
        "contactPersonEmail": "lisa.martinez@evergreenmaterials.com",
        "contactPersonName": "Lisa Martinez",
        "date": "2024-05-31T10:39:03.258Z",
        "emailSubject": "Quotation for RFQ - Evergreen Construction Materials",
        "id": "-NzDDoemX4cdLj7ujQ49",
        "name": "Quote for Evergreen Construction Materials",
        "originalEmail": "Request for Quotation (RFQ)\n\nDate: May 24, 2024\n\nCompany Name: Evergreen Construction Materials\n\nContact Person: Lisa Martinez\n\nContact Email: lisa.martinez@evergreenmaterials.com\n\nContact Phone: (555) 654-3210\n\nRFQ Number: RFQ-2024-003\n\nSubmission Deadline: June 1, 2024\n\nItem Description:\nMaterial: Galvanized Steel Sheets\n\nGrade: ASTM A653\nThickness: 0.075 inches (14 gauge)\nWidth: 48 inches\nLength: 96 inches\nQuantity: 300 sheets\nMaterial: Aluminum Extrusions\n\nGrade: 6063-T5\nProfile: Square tube, 2 inches x 2 inches\nWall Thickness: 0.125 inches\nLength: 12 feet\nQuantity: 100 extrusions\nMaterial: Brass Rods\n\nGrade: C36000\nDiameter: 1 inch\nLength: 6 feet\nQuantity: 50 rods\nProcessing Services:\nCutting:\n\nLaser cutting of galvanized steel sheets to specified shapes as per attached DXF files (see Attachment 1).\nMachining:\n\nCNC machining of aluminum extrusions to create specified holes and slots as per attached technical drawings (see Attachment 2).\nFinishing:\n\nPolishing of brass rods to a smooth finish.\nDelivery Requirements:\nDelivery Location: DEF Fabrication Inc., 456 Industrial Road, Techville, USA\nDelivery Date: August 1, 2024\nShipping Method: FOB Destination\nQuality Requirements:\nCertification: Mill test reports (MTR) required for all materials.\nInspection: Visual and dimensional inspection reports required.\nAdditional Information:\nPayment Terms: Net 30 days\nContract Duration: One-time purchase with potential for recurring orders based on performance and pricing.\nInstructions to Suppliers:\nQuotation Submission:\n\nPlease submit your detailed quotation including itemized costs for materials and processing services.\nInclude lead times for each item and service.\nSpecify any minimum order quantities or other restrictions.\nEvaluation Criteria:\n\nPricing\nDelivery time\nQuality assurance capabilities\nPrevious experience with similar projects\nReferences from other customers\nContact for Clarifications:\n\nFor any questions regarding this RFQ, contact Alice Johnson at the above email or phone number.\nSubmission:\n\nEmail your quotation to alice.johnson@deffabrication.com with the subject line \"RFQ-2024-003 Quotation Submission\".\n",
        "status": "Sent"
    }
]