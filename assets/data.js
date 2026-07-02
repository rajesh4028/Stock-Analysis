// Compliance checklist data for an Indian Private Limited Company (Karnataka)
// Review dates periodically against official CBIC/MCA/Karnataka Commercial Taxes notifications,
// as due dates can change via government circulars.

const COMPLIANCE_DATA = [
  {
    id: "gst",
    category: "GST Compliance",
    icon: "🧾",
    items: [
      {
        id: "gst-gstr1",
        title: "GSTR-1 — Outward Supplies",
        frequency: "Monthly",
        dueDate: "11th of following month",
        description: "Statement of outward supplies of goods/services made during the month.",
        penalty: "Late fee ₹50/day (₹20/day for nil return), subject to turnover-based caps."
      },
      {
        id: "gst-gstr3b",
        title: "GSTR-3B — Summary Return & Tax Payment",
        frequency: "Monthly",
        dueDate: "20th of following month",
        description: "Self-assessed summary return; pay net GST liability after ITC set-off.",
        penalty: "Late fee ₹50/day (₹20/day for nil) + 18% p.a. interest on unpaid tax."
      },
      {
        id: "gst-2b-recon",
        title: "GSTR-2B Reconciliation & ITC Matching",
        frequency: "Monthly",
        dueDate: "Before filing GSTR-3B",
        description: "Match purchase register with auto-drafted ITC statement before claiming input tax credit."
      },
      {
        id: "gst-eway",
        title: "E-Way Bill Compliance",
        frequency: "Monthly",
        dueDate: "Transaction-based, ongoing",
        description: "Generate e-way bills for movement of goods valued above ₹50,000 where applicable."
      },
      {
        id: "gst-gstr9",
        title: "GSTR-9 — Annual Return",
        frequency: "Annually",
        dueDate: "31st December",
        description: "Consolidated annual GST return (mandatory above ₹2 crore turnover, optional below)."
      },
      {
        id: "gst-gstr9c",
        title: "GSTR-9C — Reconciliation Statement",
        frequency: "Annually",
        dueDate: "31st December",
        description: "Self-certified reconciliation statement required if turnover exceeds ₹5 crore."
      }
    ]
  },
  {
    id: "pt",
    category: "Karnataka Professional Tax",
    icon: "🏛️",
    items: [
      {
        id: "pt-form5-return",
        title: "Form 5 — Monthly PT Return & Payment (Employees)",
        frequency: "Monthly",
        dueDate: "20th of following month",
        description: "File monthly e-return and deposit professional tax deducted from employee salaries under the Karnataka Tax on Professions, Trades, Callings and Employments Act, 1976.",
        penalty: "Interest 1.25% per month on delayed payment; penalty up to 50% of tax amount for non/short payment."
      },
      {
        id: "pt-employee-deduction",
        title: "Employee PT Deduction from Salary",
        frequency: "Monthly",
        dueDate: "At each payroll run",
        description: "Deduct professional tax from every employee per Karnataka slab rates (currently up to ₹200/month, ₹300 in February) before salary disbursal."
      },
      {
        id: "pt-ec-payment",
        title: "Form 5A / PT-EC — Employer's Own Professional Tax",
        frequency: "Annually",
        dueDate: "30th April",
        description: "The company itself (holder of Professional Tax Enrolment Certificate) pays its own annual professional tax, currently ₹2,500."
      },
      {
        id: "pt-registration-review",
        title: "PT Registration Certificates Review (PT-RC & PT-EC)",
        frequency: "Annually",
        dueDate: "Start of financial year",
        description: "Confirm employer PT-RC and enrolment PT-EC certificates are active and reflect current business/employee details."
      }
    ]
  },
  {
    id: "mca",
    category: "MCA / ROC Compliance",
    icon: "🏢",
    items: [
      {
        id: "mca-registers",
        title: "Update Statutory Registers",
        frequency: "Monthly",
        dueDate: "Ongoing",
        description: "Maintain registers of members, directors & KMP, charges, related-party transactions, etc. under the Companies Act, 2013."
      },
      {
        id: "mca-minutes",
        title: "Record Board Resolutions / Minutes",
        frequency: "Monthly",
        dueDate: "Within 30 days of meeting/resolution",
        description: "Circulate draft minutes and finalize signed minutes for board meetings and resolutions by circulation."
      },
      {
        id: "mca-board-meeting",
        title: "Board Meeting",
        frequency: "Quarterly",
        dueDate: "At least once every quarter (gap ≤ 120 days)",
        description: "Hold a minimum of 4 board meetings each calendar year as required under Section 173."
      },
      {
        id: "mca-din-check",
        title: "Director Details Check (ahead of DIR-3 KYC)",
        frequency: "Quarterly",
        dueDate: "Reviewed each quarter",
        description: "Verify DIN, address and contact details for each director stay current before the annual KYC deadline."
      },
      {
        id: "mca-msme1",
        title: "Form MSME-1",
        frequency: "Half-Yearly",
        dueDate: "30th April & 31st October",
        description: "Half-yearly return disclosing outstanding payments to micro/small enterprise suppliers pending beyond 45 days."
      },
      {
        id: "mca-deposit-review",
        title: "Loans/Advances Review (pre-DPT-3)",
        frequency: "Half-Yearly",
        dueDate: "Ongoing review",
        description: "Track loans, advances and amounts that may qualify as 'deposits' under the Companies (Acceptance of Deposits) Rules ahead of the annual DPT-3 filing."
      },
      {
        id: "mca-agm",
        title: "Annual General Meeting (AGM)",
        frequency: "Annually",
        dueDate: "Within 6 months of FY end (by 30th Sept)",
        description: "Hold AGM to adopt financial statements and transact ordinary/special business. First AGM: within 9 months of FY end."
      },
      {
        id: "mca-adt1",
        title: "Form ADT-1 — Auditor Appointment",
        frequency: "Annually",
        dueDate: "Within 15 days of AGM",
        description: "Notify the Registrar of Companies of appointment/re-appointment of the statutory auditor."
      },
      {
        id: "mca-aoc4",
        title: "Form AOC-4 — Financial Statements",
        frequency: "Annually",
        dueDate: "Within 30 days of AGM",
        description: "File financial statements, Board's report and auditor's report with the ROC."
      },
      {
        id: "mca-mgt7",
        title: "Form MGT-7 / MGT-7A — Annual Return",
        frequency: "Annually",
        dueDate: "Within 60 days of AGM",
        description: "File the company's annual return; MGT-7A applies to small companies/OPCs."
      },
      {
        id: "mca-dir3kyc",
        title: "DIR-3 KYC (every director)",
        frequency: "Annually",
        dueDate: "30th September",
        description: "Each director holding a DIN must complete annual KYC, failing which the DIN is deactivated."
      },
      {
        id: "mca-dpt3",
        title: "Form DPT-3 — Return of Deposits",
        frequency: "Annually",
        dueDate: "30th June",
        description: "Annual return of deposits and outstanding loans/receipts not considered deposits."
      },
      {
        id: "mca-mbp1",
        title: "Form MBP-1 — Director's Disclosure of Interest",
        frequency: "Annually",
        dueDate: "First Board Meeting of the financial year",
        description: "Every director discloses interest/concern in other entities at the start of each financial year."
      },
      {
        id: "mca-dir8",
        title: "Form DIR-8 — Non-Disqualification Declaration",
        frequency: "Annually",
        dueDate: "First Board Meeting of the financial year",
        description: "Directors declare they are not disqualified from appointment under Section 164(2)."
      },
      {
        id: "mca-statutory-audit",
        title: "Statutory Audit Completion",
        frequency: "Annually",
        dueDate: "Before the AGM",
        description: "Complete the statutory audit and finalize financial statements ahead of the AGM."
      }
    ]
  },
  {
    id: "tax",
    category: "Income Tax & TDS (Related Compliance)",
    icon: "💰",
    items: [
      {
        id: "tds-payment",
        title: "TDS Payment",
        frequency: "Monthly",
        dueDate: "7th of following month (30th April for March)",
        description: "Deposit tax deducted at source on salaries, contractor payments, rent, professional fees, etc."
      },
      {
        id: "tds-return",
        title: "TDS Returns (Form 24Q / 26Q)",
        frequency: "Quarterly",
        dueDate: "31 Jul, 31 Oct, 31 Jan, 31 May",
        description: "File quarterly TDS returns — 24Q for salaries, 26Q for other payments."
      },
      {
        id: "advance-tax",
        title: "Advance Tax Instalments",
        frequency: "Quarterly",
        dueDate: "15 Jun (15%), 15 Sep (45%), 15 Dec (75%), 15 Mar (100%)",
        description: "Pay advance income tax based on estimated annual profit for the financial year."
      },
      {
        id: "itr-filing",
        title: "Income Tax Return (ITR-6) Filing",
        frequency: "Annually",
        dueDate: "31st October (where tax audit applies)",
        description: "File the company's income tax return for the financial year."
      },
      {
        id: "tax-audit",
        title: "Tax Audit Report (Form 3CA-3CD)",
        frequency: "Annually",
        dueDate: "30th September",
        description: "Get accounts tax-audited under Section 44AB where turnover/other conditions apply."
      },
      {
        id: "form16-16a",
        title: "Issue Form 16 / Form 16A",
        frequency: "Annually",
        dueDate: "15 June (Form 16); within 15 days of TDS return (16A)",
        description: "Issue TDS certificates to employees and vendors/contractors."
      }
    ]
  }
];

const FREQUENCIES = ["Monthly", "Quarterly", "Half-Yearly", "Annually"];
