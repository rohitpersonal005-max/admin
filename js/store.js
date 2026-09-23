/**
 * Consumable Management System - Data Store & State Engine
 * Handles localStorage persistence, seed data, stock ledger computations,
 * and Maker-Checker approval workflow.
 */

const STORAGE_KEY = 'CMS_DATABASE_V2';
const ROLE_KEY = 'CMS_USER_ROLE_V1';
const USER_KEY = 'CMS_CURRENT_USER_ID_V1';

let ENTERPRISE_USERS = [
  {
    id: 'EMP-2041',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@adminutes.corp',
    role: 'Maker',
    roleTitle: 'Store Staff (Maker)',
    badgeLabel: 'STORE CLERK / MAKER',
    department: 'Central Warehouse & Logistics',
    avatarText: 'RK',
    avatarBg: 'bg-blue-600',
    avatarTextCol: 'text-white',
    pin: null, // No PIN required for staff
    description: 'Operational store staff. Drafts receipts, issues stock, raises indents, and records stock adjustments.'
  },

  getVendorTaxMode(vendor, storeState = 'Delhi') {
    if (!vendor || !vendor.addressState || vendor.addressState !== storeState) return 'IGST';
    return 'CGST_SGST';
  },
  {
    id: 'MGR-8812',
    name: 'Col. Anita Sharma',
    email: 'anita.sharma@adminutes.corp',
    role: 'Checker',
    roleTitle: 'Store In-Charge (Checker)',
    badgeLabel: 'STORE IN-CHARGE / CHECKER',
    department: 'Materials & Directorate of Supplies',
    avatarText: 'AS',
    avatarBg: 'bg-indigo-600',
    avatarTextCol: 'text-white',
    pin: '4321', // Secure Manager Authorization PIN
    description: 'Statutory approving authority. Audits vendor certifications, consumer rate vetting, physical variances, and sanctions transactions.'
  }
];

const INITIAL_SEED = {
  userRole: 'Maker', // Default to Maker (Rajesh Kumar) for realistic enterprise flow
  categories: [
    {
      id: 'CAT-001',
      name: 'Stationery',
      description: 'Office paper, pens, binders, and desk essentials',
      status: 'Approved',
      createdAt: '2026-08-01T10:00:00Z',
      approvedAt: '2026-08-01T11:00:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'CAT-002',
      name: 'Housekeeping',
      description: 'Cleaning liquids, sanitizers, wipes, and hygiene products',
      status: 'Approved',
      createdAt: '2026-08-01T10:15:00Z',
      approvedAt: '2026-08-01T11:05:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'CAT-003',
      name: 'Packing Material',
      description: 'Corrugated boxes, bubble wrap, sealing tapes, and stretch film',
      status: 'Approved',
      createdAt: '2026-08-01T10:30:00Z',
      approvedAt: '2026-08-01T11:10:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'CAT-004',
      name: 'Safety & PPE',
      description: 'Nitrile gloves, safety goggles, face shields, and respirators',
      status: 'Approved',
      createdAt: '2026-08-05T09:00:00Z',
      approvedAt: '2026-08-05T10:00:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    },
    {
      id: 'CAT-005',
      name: 'IT & Computer Hardware',
      description: 'Desktop workstations, enterprise printers, laptops, networking routers, and servers',
      inventoryType: 'Fixed',
      status: 'Approved',
      createdAt: '2026-08-05T10:30:00Z',
      approvedAt: '2026-08-05T11:00:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    },
    {
      id: 'CAT-006',
      name: 'Electrical & HVAC Assets',
      description: 'Air conditioners, voltage stabilizers, industrial fans, water chillers, and UPS units',
      inventoryType: 'Fixed',
      status: 'Approved',
      createdAt: '2026-08-06T09:00:00Z',
      approvedAt: '2026-08-06T09:30:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    },
    {
      id: 'CAT-007',
      name: 'Storage & Office Furniture',
      description: 'Heavy duty steel almirahs, filing cabinets, ergonomic chairs, conference tables, and racks',
      inventoryType: 'Fixed',
      status: 'Approved',
      createdAt: '2026-08-06T10:00:00Z',
      approvedAt: '2026-08-06T10:30:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    }
  ],
  gstSlabs: [
    {
      id: 'GST-001',
      name: 'GST 0% (Exempted)',
      sgst: 0,
      cgst: 0,
      igst: 0,
      remarks: 'Essential exempt consumables',
      status: 'Approved',
      createdAt: '2026-08-01T09:00:00Z',
      approvedAt: '2026-08-01T09:30:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'GST-002',
      name: 'GST 5%',
      sgst: 2.5,
      cgst: 2.5,
      igst: 5,
      remarks: 'Basic industrial supplies',
      status: 'Approved',
      createdAt: '2026-08-01T09:00:00Z',
      approvedAt: '2026-08-01T09:30:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'GST-003',
      name: 'GST 12%',
      sgst: 6,
      cgst: 6,
      igst: 12,
      remarks: 'Paper and stationery goods',
      status: 'Approved',
      createdAt: '2026-08-01T09:00:00Z',
      approvedAt: '2026-08-01T09:30:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'GST-004',
      name: 'GST 18%',
      sgst: 9,
      cgst: 9,
      igst: 18,
      remarks: 'Standard cleaning & packaging consumables',
      status: 'Approved',
      createdAt: '2026-08-01T09:00:00Z',
      approvedAt: '2026-08-01T09:30:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'GST-005',
      name: 'GST 28%',
      sgst: 14,
      cgst: 14,
      igst: 28,
      remarks: 'High-tier chemical consumables',
      status: 'Approved',
      createdAt: '2026-08-01T09:00:00Z',
      approvedAt: '2026-08-01T09:30:00Z',
      approvedBy: 'Admin (Checker)'
    }
  ],
  vendors: [
    {
      id: 'VEN-001',
      name: 'Apex Office Supplies Pvt Ltd',
      address: 'Plot 42, Okhla Industrial Area Phase III, New Delhi 110020',
      gstNo: '07AABCA1234F1Z5',
      panNo: 'AABCA1234F',
      certificates: [
        { name: 'ISO 9001:2015', hasValidity: true, validTill: '2027-12-31' },
        { name: 'MSME / Udyam Registration', hasValidity: false, validTill: '' },
        { name: 'GST Tax Compliance', hasValidity: false, validTill: '' }
      ],
      certificateFile: 'Apex_ISO_MSME_Certificates.pdf',
      contactNo: '+91 98110 45678',
      email: 'sales@apexofficesupplies.com',
      status: 'Approved',
      createdAt: '2026-08-01T10:00:00Z',
      approvedAt: '2026-08-01T11:30:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'VEN-002',
      name: 'GreenClean Sanitation Corp',
      address: 'Shed 18, MIDC Bhosari, Pune, Maharashtra 411026',
      gstNo: '27AABCG9876E1ZT',
      panNo: 'AABCG9876E',
      certificates: [
        { name: 'GMP Quality Certified', hasValidity: true, validTill: '2027-06-30' },
        { name: 'Pollution Clearance Certificate', hasValidity: true, validTill: '2026-12-31' },
        { name: 'MSME Registered Enterprise', hasValidity: false, validTill: '' }
      ],
      certificateFile: 'GreenClean_Pollution_GMP.pdf',
      contactNo: '+91 98220 76543',
      email: 'orders@greencleansanitation.com',
      status: 'Approved',
      createdAt: '2026-08-02T10:00:00Z',
      approvedAt: '2026-08-02T11:45:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'VEN-003',
      name: 'Shree Balaji Packaging Solutions',
      address: 'B-12, Sector 8, Noida, Uttar Pradesh 201301',
      gstNo: '09AAACS4512D1Z2',
      panNo: 'AAACS4512D',
      certificates: [
        { name: 'ISO 9001:2015', hasValidity: true, validTill: '2026-11-15' },
        { name: 'Factory License', hasValidity: true, validTill: '2028-03-31' },
        { name: 'GST Certificate', hasValidity: false, validTill: '' }
      ],
      certificateFile: 'Balaji_Packaging_Compliance.pdf',
      contactNo: '+91 98991 23456',
      email: 'contact@balajipackaging.in',
      status: 'Approved',
      createdAt: '2026-08-03T10:00:00Z',
      approvedAt: '2026-08-03T12:15:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'VEN-004',
      name: 'SafeTech Protective Gears LLP',
      address: '54/A, Peenya 2nd Stage, Bengaluru, Karnataka 560058',
      gstNo: '29AABCS8821B1Z9',
      panNo: 'AABCS8821B',
      certificates: [
        { name: 'CE Safety Certified', hasValidity: true, validTill: '2028-03-31' },
        { name: 'ISO 14001 Environmental Standard', hasValidity: true, validTill: '2027-09-30' },
        { name: 'MSME Certificate', hasValidity: false, validTill: '' }
      ],
      certificateFile: 'SafeTech_CE_Audit.pdf',
      contactNo: '+91 94480 33211',
      email: 'supply@safetechgears.com',
      status: 'Approved',
      createdAt: '2026-08-04T10:00:00Z',
      approvedAt: '2026-08-04T13:00:00Z',
      approvedBy: 'Admin (Checker)'
    }
  ],
  consumables: [
    {
      id: 'MAT-001',
      inventoryType: 'Consumer',
      quotationNo: 'QT-2026-881',
      quotationDate: '2026-07-01',
      quotationRate: 260.00,
      mrpBooked: 320.00,
      hasWarranty: false,
      hasPm: false,
      categoryId: 'CAT-001',
      categoryName: 'Stationery',
      materialName: 'A4 Copier Paper 75 GSM (500 Sheets)',
      unit: 'Rim',
      brand: 'JK Copier',
      supplierProductCode: 'JK-A4-75G',
      hsnCode: '4802',
      sgst: 6,
      cgst: 6,
      igst: 12,
      vendor1Id: 'VEN-001',
      vendor1Name: 'Apex Office Supplies Pvt Ltd',
      vendor1Rate: 260.00,
      vendor1RateEffectiveFrom: '2026-07-01',
      vendor2Id: 'VEN-003',
      vendor2Name: 'Shree Balaji Packaging Solutions',
      vendor2Rate: 275.00,
      vendor2RateEffectiveFrom: '2026-07-15',
      consumerConfirmed: true,
      confirmedBy: 'Dr. A. Verma (Head of Administration)',
      confirmationDate: '2026-07-20',
      confirmationRemarks: 'Rates verified against annual rate contract tender specifications',
      avgMonthlyConsumption: 120, // includes buffer
      initialStock: 80,
      status: 'Approved',
      createdAt: '2026-08-01T14:00:00Z',
      approvedAt: '2026-08-01T16:00:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'MAT-002',
      inventoryType: 'Consumer',
      quotationNo: 'QT-2026-842',
      quotationDate: '2026-08-01',
      quotationRate: 620.00,
      mrpBooked: 750.00,
      hasWarranty: false,
      hasPm: false,
      categoryId: 'CAT-002',
      categoryName: 'Housekeeping',
      materialName: 'Disinfectant Surface Cleaner (5 Litre Can)',
      unit: 'Can',
      brand: 'Lizol Pro',
      supplierProductCode: 'LZ-5L-DIS',
      hsnCode: '3402',
      sgst: 9,
      cgst: 9,
      igst: 18,
      vendor1Id: 'VEN-002',
      vendor1Name: 'GreenClean Sanitation Corp',
      vendor1Rate: 620.00,
      vendor1RateEffectiveFrom: '2026-08-01',
      vendor2Id: 'VEN-001',
      vendor2Name: 'Apex Office Supplies Pvt Ltd',
      vendor2Rate: 650.00,
      vendor2RateEffectiveFrom: '2026-08-05',
      consumerConfirmed: true,
      confirmedBy: 'R. K. Nair (Facility Manager)',
      confirmationDate: '2026-08-06',
      confirmationRemarks: 'Hospital-grade standard verified and approved',
      avgMonthlyConsumption: 40,
      initialStock: 25,
      status: 'Approved',
      createdAt: '2026-08-02T12:00:00Z',
      approvedAt: '2026-08-02T15:00:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'MAT-003',
      inventoryType: 'Consumer',
      quotationNo: 'QT-2026-511',
      quotationDate: '2026-07-01',
      quotationRate: 48.00,
      mrpBooked: 65.00,
      hasWarranty: false,
      hasPm: false,
      categoryId: 'CAT-003',
      categoryName: 'Packing Material',
      materialName: 'Brown Bopp Sealing Tape 2 Inch x 65M',
      unit: 'Roll',
      brand: 'Balaji Grip',
      supplierProductCode: 'BOPP-2IN-65',
      hsnCode: '3919',
      sgst: 9,
      cgst: 9,
      igst: 18,
      vendor1Id: 'VEN-003',
      vendor1Name: 'Shree Balaji Packaging Solutions',
      vendor1Rate: 48.00,
      vendor1RateEffectiveFrom: '2026-07-01',
      vendor2Id: 'VEN-001',
      vendor2Name: 'Apex Office Supplies Pvt Ltd',
      vendor2Rate: 52.00,
      vendor2RateEffectiveFrom: '2026-07-10',
      consumerConfirmed: true,
      confirmedBy: 'M. S. Deshmukh (Logistics Head)',
      confirmationDate: '2026-07-12',
      confirmationRemarks: 'Adhesion strength and thickness verified by packaging unit',
      avgMonthlyConsumption: 300,
      initialStock: 180,
      status: 'Approved',
      createdAt: '2026-08-03T11:00:00Z',
      approvedAt: '2026-08-03T14:30:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'MAT-004',
      inventoryType: 'Consumer',
      categoryId: 'CAT-004',
      categoryName: 'Safety & PPE',
      materialName: 'Nitrile Examination Gloves Powder-Free (Box of 100)',
      unit: 'Box',
      brand: 'SafeGuard Pro',
      supplierProductCode: 'SG-NIT-100',
      hsnCode: '4015',
      sgst: 2.5,
      cgst: 2.5,
      igst: 5,
      quotationNo: 'QT-2026-309',
      quotationDate: '2026-08-01',
      quotationRate: 340.00,
      mrpBooked: 450.00,
      hasWarranty: false,
      warrantyPeriod: '',
      warrantyValidTill: '',
      hasPm: false,
      pmFrequency: '',
      vendor1Id: 'VEN-004',
      vendor1Name: 'SafeTech Protective Gears LLP',
      vendor1Rate: 340.00,
      vendor1RateEffectiveFrom: '2026-08-01',
      vendor2Id: 'VEN-002',
      vendor2Name: 'GreenClean Sanitation Corp',
      vendor2Rate: 360.00,
      vendor2RateEffectiveFrom: '2026-08-10',
      consumerConfirmed: true,
      confirmedBy: 'Dr. Neha Gupta (Safety Officer)',
      confirmationDate: '2026-08-15',
      confirmationRemarks: 'Medical & laboratory tensile testing approved',
      avgMonthlyConsumption: 75,
      initialStock: 50,
      status: 'Approved',
      createdAt: '2026-08-04T11:00:00Z',
      approvedAt: '2026-08-04T15:00:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    },
    {
      id: 'MAT-005',
      inventoryType: 'Consumer',
      categoryId: 'CAT-002',
      categoryName: 'Housekeeping',
      materialName: 'Commercial RO Water Purifier & Cooler Machine (50 LPH)',
      unit: 'Set',
      brand: 'Kent Elite Commercial',
      supplierProductCode: 'KT-RO-50LPH',
      hsnCode: '8421',
      sgst: 9,
      cgst: 9,
      igst: 18,
      quotationNo: 'QT-2026-RO-88',
      quotationDate: '2026-08-01',
      quotationRate: 15200.00,
      mrpBooked: 18500.00,
      hasWarranty: true,
      warrantyPeriod: '1 Year Comprehensive',
      warrantyValidTill: '2027-08-15',
      warrantyVendor: 'GreenClean Sanitation Corp',
      hasPm: true,
      pmFrequency: 'Quarterly',
      repairmanName: 'Sanjay Rawat',
      repairmanContact: '+91 98114 99012',
      repairmanAgency: 'Kent Commercial Service Care',
      pmVendor: 'GreenClean Sanitation Corp',
      lastPmDate: '2026-08-15',
      nextPmDate: '2026-11-15',
      vendor1Id: 'VEN-002',
      vendor1Name: 'GreenClean Sanitation Corp',
      vendor1Rate: 15200.00,
      vendor1RateEffectiveFrom: '2026-08-01',
      vendor2Id: 'VEN-001',
      vendor2Name: 'Apex Office Supplies Pvt Ltd',
      vendor2Rate: 16000.00,
      vendor2RateEffectiveFrom: '2026-08-05',
      consumerConfirmed: true,
      confirmedBy: 'R. K. Nair (Facility Manager)',
      confirmationDate: '2026-08-06',
      confirmationRemarks: 'Drinking water laboratory microbial purity cert attached',
      avgMonthlyConsumption: 2,
      initialStock: 3,
      status: 'Approved',
      createdAt: '2026-08-05T12:00:00Z',
      approvedAt: '2026-08-05T14:00:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    },
    {
      id: 'MAT-FIX-001',
      inventoryType: 'Fixed',
      categoryId: 'CAT-005',
      categoryName: 'IT & Computer Hardware',
      materialName: 'HP LaserJet Enterprise M507dn Heavy Workgroup Printer',
      unit: 'Nos',
      brand: 'HP Enterprise',
      supplierProductCode: '1PV87A',
      assetTag: 'AST-PRN-001',
      serialNo: 'VNC3K92104',
      custodianDept: 'Accounts & Finance',
      hsnCode: '8443',
      sgst: 9,
      cgst: 9,
      igst: 18,
      quotationNo: 'QT-2026-HP-01',
      quotationDate: '2026-07-25',
      quotationRate: 42500.00,
      mrpBooked: 48000.00,
      hasWarranty: true,
      warrantyPeriod: '3 Years Onsite Next Business Day',
      warrantyValidTill: '2029-08-15',
      warrantyVendor: 'Apex Office Supplies Pvt Ltd',
      hasPm: true,
      pmFrequency: 'Quarterly',
      repairmanName: 'Vikram Singh',
      repairmanContact: '+91 98101 22334',
      repairmanAgency: 'HP Certified Enterprise Support',
      pmVendor: 'Apex Office Supplies Pvt Ltd',
      lastPmDate: '2026-08-15',
      nextPmDate: '2026-11-15',
      vendor1Id: 'VEN-001',
      vendor1Name: 'Apex Office Supplies Pvt Ltd',
      vendor1Rate: 42500.00,
      vendor1RateEffectiveFrom: '2026-08-01',
      vendor2Id: 'VEN-003',
      vendor2Name: 'Shree Balaji Packaging Solutions',
      vendor2Rate: 44000.00,
      vendor2RateEffectiveFrom: '2026-08-05',
      consumerConfirmed: true,
      confirmedBy: 'Sunil Mathur (IT Systems In-Charge)',
      confirmationDate: '2026-08-07',
      confirmationRemarks: 'Enterprise network MIB & security firmware validated',
      avgMonthlyConsumption: 1,
      initialStock: 4,
      status: 'Approved',
      createdAt: '2026-08-06T10:00:00Z',
      approvedAt: '2026-08-06T12:00:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    },
    {
      id: 'MAT-FIX-002',
      inventoryType: 'Fixed',
      categoryId: 'CAT-005',
      categoryName: 'IT & Computer Hardware',
      materialName: 'Dell OptiPlex 7090 Tower i7 Workstation (32GB RAM, 1TB NVMe)',
      unit: 'Set',
      brand: 'Dell Technologies',
      supplierProductCode: 'OPT-7090-I7',
      assetTag: 'AST-DSK-002',
      serialNo: '8HJ4KD3',
      custodianDept: 'IT & Systems',
      hsnCode: '8471',
      sgst: 9,
      cgst: 9,
      igst: 18,
      quotationNo: 'QT-2026-DEL-10',
      quotationDate: '2026-07-20',
      quotationRate: 69500.00,
      mrpBooked: 78000.00,
      hasWarranty: true,
      warrantyPeriod: '3 Years ProSupport with Accidental Damage',
      warrantyValidTill: '2029-07-20',
      warrantyVendor: 'Apex Office Supplies Pvt Ltd',
      hasPm: true,
      pmFrequency: 'Half-Yearly',
      repairmanName: 'Ramesh Nair',
      repairmanContact: '+91 98220 55441',
      repairmanAgency: 'Dell ProSupport Platinum',
      pmVendor: 'Apex Office Supplies Pvt Ltd',
      lastPmDate: '2026-07-20',
      nextPmDate: '2027-01-20',
      vendor1Id: 'VEN-001',
      vendor1Name: 'Apex Office Supplies Pvt Ltd',
      vendor1Rate: 69500.00,
      vendor1RateEffectiveFrom: '2026-07-22',
      vendor2Id: 'VEN-003',
      vendor2Name: 'Shree Balaji Packaging Solutions',
      vendor2Rate: 72000.00,
      vendor2RateEffectiveFrom: '2026-07-25',
      consumerConfirmed: true,
      confirmedBy: 'Sunil Mathur (IT Systems In-Charge)',
      confirmationDate: '2026-07-23',
      confirmationRemarks: 'Hardware stress test passed, TPM 2.0 active',
      avgMonthlyConsumption: 1,
      initialStock: 8,
      status: 'Approved',
      createdAt: '2026-08-06T11:00:00Z',
      approvedAt: '2026-08-06T13:00:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    },
    {
      id: 'MAT-FIX-003',
      inventoryType: 'Fixed',
      categoryId: 'CAT-006',
      categoryName: 'Electrical & HVAC Assets',
      materialName: 'Daikin 1.5 Ton Dual-Inverter Split Air Conditioner (5 Star)',
      unit: 'Set',
      brand: 'Daikin Airconditioning',
      supplierProductCode: 'FTKM50U',
      assetTag: 'AST-AC-003',
      serialNo: 'DK-2026-9901',
      custodianDept: 'Operations & Warehouse',
      hsnCode: '8415',
      sgst: 14,
      cgst: 14,
      igst: 28,
      quotationNo: 'QT-2026-DAI-44',
      quotationDate: '2026-07-28',
      quotationRate: 39800.00,
      mrpBooked: 46500.00,
      hasWarranty: true,
      warrantyPeriod: '1 Year Comprehensive + 5 Yrs PCB / 10 Yrs Compressor',
      warrantyValidTill: '2027-08-01',
      warrantyVendor: 'GreenClean Sanitation Corp',
      hasPm: true,
      pmFrequency: 'Bi-Monthly',
      repairmanName: 'Anil Verma',
      repairmanContact: '+91 98711 00293',
      repairmanAgency: 'Daikin Care & HVAC Maintenance',
      pmVendor: 'GreenClean Sanitation Corp',
      lastPmDate: '2026-08-01',
      nextPmDate: '2026-10-01',
      vendor1Id: 'VEN-002',
      vendor1Name: 'GreenClean Sanitation Corp',
      vendor1Rate: 39800.00,
      vendor1RateEffectiveFrom: '2026-08-01',
      vendor2Id: 'VEN-001',
      vendor2Name: 'Apex Office Supplies Pvt Ltd',
      vendor2Rate: 41000.00,
      vendor2RateEffectiveFrom: '2026-08-05',
      consumerConfirmed: true,
      confirmedBy: 'R. K. Nair (Facility Manager)',
      confirmationDate: '2026-08-02',
      confirmationRemarks: 'BEE 5-star energy rating and copper condenser coil verified',
      avgMonthlyConsumption: 1,
      initialStock: 4,
      status: 'Approved',
      createdAt: '2026-08-07T09:30:00Z',
      approvedAt: '2026-08-07T11:00:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    },
    {
      id: 'MAT-FIX-004',
      inventoryType: 'Fixed',
      categoryId: 'CAT-007',
      categoryName: 'Storage & Office Furniture',
      materialName: 'Godrej Interio Heavy Duty 4-Door Steel Storage Almirah',
      unit: 'Nos',
      brand: 'Godrej Interio',
      supplierProductCode: 'GDJ-STOR-04',
      assetTag: 'AST-FUR-004',
      serialNo: 'GDJ-ALM-4412',
      custodianDept: 'Central Warehouse & Logistics',
      hsnCode: '9403',
      sgst: 9,
      cgst: 9,
      igst: 18,
      quotationNo: 'QT-2026-GDJ-09',
      quotationDate: '2026-07-20',
      quotationRate: 21500.00,
      mrpBooked: 26000.00,
      hasWarranty: true,
      warrantyPeriod: '2 Years Manufacturer Warranty',
      warrantyValidTill: '2028-06-30',
      warrantyVendor: 'Shree Balaji Packaging Solutions',
      hasPm: true,
      pmFrequency: 'Annually',
      repairmanName: 'Satish Kumar',
      repairmanContact: '+91 98118 77654',
      repairmanAgency: 'Godrej Institutional Services',
      pmVendor: 'Shree Balaji Packaging Solutions',
      lastPmDate: '2026-07-01',
      nextPmDate: '2027-07-01',
      vendor1Id: 'VEN-003',
      vendor1Name: 'Shree Balaji Packaging Solutions',
      vendor1Rate: 21500.00,
      vendor1RateEffectiveFrom: '2026-07-22',
      vendor2Id: 'VEN-001',
      vendor2Name: 'Apex Office Supplies Pvt Ltd',
      vendor2Rate: 22800.00,
      vendor2RateEffectiveFrom: '2026-07-25',
      consumerConfirmed: true,
      confirmedBy: 'M. S. Deshmukh (Logistics Head)',
      confirmationDate: '2026-07-24',
      confirmationRemarks: 'Heavy-gauge steel sheet thickness (0.8mm CRCA) verified',
      avgMonthlyConsumption: 1,
      initialStock: 12,
      status: 'Approved',
      createdAt: '2026-08-07T11:00:00Z',
      approvedAt: '2026-08-07T12:30:00Z',
      approvedBy: 'Col. Anita Sharma (MGR-8812)'
    }
  ],
  receipts: [
    {
      id: 'REC-001',
      receiptNo: 'REC-2026-001',
      type: 'Challan',
      vendorId: 'VEN-001',
      vendorName: 'Apex Office Supplies Pvt Ltd',
      docNo: 'DC/2026/891',
      docDate: '2026-08-10',
      materialId: 'MAT-001',
      materialName: 'A4 Copier Paper 75 GSM (500 Sheets)',
      brand: 'JK Copier',
      unit: 'Rim',
      qty: 60,
      rate: 260.00,
      sgst: 6,
      cgst: 6,
      igst: 0,
      totalAmount: 17472.00,
      remarks: 'Delivered as per Urgent Office Requisition #33',
      isConvertedToInvoice: false,
      linkedInvoiceNo: '',
      linkedInvoiceDate: '',
      status: 'Approved',
      createdAt: '2026-08-10T11:00:00Z',
      approvedAt: '2026-08-10T12:00:00Z',
      approvedBy: 'Admin (Checker)'
    },
    {
      id: 'REC-002',
      receiptNo: 'REC-2026-002',
      type: 'Invoice',
      vendorId: 'VEN-002',
      vendorName: 'GreenClean Sanitation Corp',
      docNo: 'INV/MH/2026/4102',
      docDate: '2026-08-12',
      materialId: 'MAT-002',
      materialName: 'Disinfectant Surface Cleaner (5 Litre Can)',
      brand: 'Lizol Pro',
      unit: 'Can',
      qty: 20,
      rate: 620.00,
      sgst: 0,
      cgst: 0,
      igst: 18,
      totalAmount: 14632.00,
      remarks: 'Monthly sanitation stock delivery',
      isConvertedToInvoice: false,
      linkedInvoiceNo: '',
      linkedInvoiceDate: '',
      status: 'Approved',
      createdAt: '2026-08-12T14:00:00Z',
      approvedAt: '2026-08-12T15:30:00Z',
      approvedBy: 'Admin (Checker)'
    }
  ],
  requests: [
    {
      id: 'REQ-001',
      transferMode: 'PULL',
      sourceDept: 'Central Warehouse & Logistics',
      destDept: 'Accounts & Finance',
      requestNo: 'REQ-2026-101',
      materialId: 'MAT-001',
      materialName: 'A4 Copier Paper 75 GSM (500 Sheets)',
      brand: 'JK Copier',
      unit: 'Rim',
      qty: 25,
      requestedBy: 'Amitabh Sen',
      department: 'Accounts & Finance',
      requiredDate: '2026-08-20',
      priority: 'Routine',
      remarks: 'Required for Q2 audit reports and tax filing printouts',
      status: 'Approved for Issue',
      issuedQty: 25,
      createdAt: '2026-08-15T10:00:00Z'
    },
    {
      id: 'REQ-002',
      transferMode: 'PUSH',
      sourceDept: 'Central Warehouse & Logistics',
      destDept: 'Dispatch & Logistics',
      requestNo: 'REQ-2026-102',
      materialId: 'MAT-003',
      materialName: 'Brown Bopp Sealing Tape 2 Inch x 65M',
      brand: 'Balaji Grip',
      unit: 'Roll',
      qty: 30,
      requestedBy: 'Pooja Rawat',
      department: 'Dispatch & Logistics',
      requiredDate: '2026-08-22',
      priority: 'Urgent',
      remarks: 'Heavy shipment dispatch schedule scheduled for weekend',
      status: 'Pending',
      issuedQty: 0,
      createdAt: '2026-08-18T14:00:00Z'
    }
  ],
  issuances: [
    {
      id: 'ISS-001',
      issueNo: 'ISS-2026-001',
      requestId: 'REQ-001',
      requestNo: 'REQ-2026-101',
      materialId: 'MAT-001',
      materialName: 'A4 Copier Paper 75 GSM (500 Sheets)',
      brand: 'JK Copier',
      unit: 'Rim',
      requestedQty: 25,
      issuedQty: 25,
      availableStockAtIssue: 140,
      issuedTo: 'Amitabh Sen',
      department: 'Accounts & Finance',
      remarks: 'Issued in full against approved requisition',
      issuedBy: 'Storekeeper (Maker)',
      issuedAt: '2026-08-16T11:30:00Z',
      status: 'Issued'
    }
  ],
  returns: [
    {
      id: 'RET-001',
      returnNo: 'RET-2026-001',
      materialId: 'MAT-001',
      materialName: 'A4 Copier Paper 75 GSM (500 Sheets)',
      brand: 'JK Copier',
      unit: 'Rim',
      qty: 2,
      returnedBy: 'Amitabh Sen',
      department: 'Accounts & Finance',
      condition: 'Unopened Good Condition',
      remarks: 'Excess rims returned after audit completion',
      status: 'Approved',
      createdAt: '2026-08-18T16:00:00Z',
      approvedAt: '2026-08-18T16:30:00Z',
      approvedBy: 'Admin (Checker)'
    }
  ],
  stockAdjustments: [
    {
      id: 'ADJ-001',
      adjustmentNo: 'ADJ-2026-001',
      materialId: 'MAT-002',
      materialName: 'Disinfectant Surface Cleaner (5 Litre Can)',
      brand: 'Lizol Pro',
      unit: 'Can',
      type: 'DEDUCT',
      qty: 1,
      systemStockBefore: 45,
      reason: 'Damaged Goods',
      remarks: 'One can punctured during transit in warehouse aisle 3; fluid drained and cleaned',
      status: 'Approved',
      createdAt: '2026-08-15T09:30:00Z',
      approvedAt: '2026-08-15T11:00:00Z',
      approvedBy: 'Admin (Checker)'
    }
  ],
  purchaseOrders: [
    {
      id: 'PO-2026-001',
      poNo: 'PO/2026/08/001',
      categoryId: 'CAT-001',
      categoryName: 'Stationery',
      materialId: 'MAT-001',
      materialName: 'A4 Copier Paper 75 GSM (500 Sheets)',
      brand: 'JK Copier',
      unit: 'Rim',
      period: '1 month',
      monthlyConsumptionWithBuffer: 120,
      currentStock: 117,
      calculatedSuggestedQty: 120,
      orderQty: 120,
      vendorId: 'VEN-001',
      vendorName: 'Apex Office Supplies Pvt Ltd',
      rate: 260.00,
      rateEffectiveFrom: '2026-07-01',
      gstPercent: 12,
      subtotal: 31200.00,
      taxAmount: 3744.00,
      totalAmount: 34944.00,
      deliveryDate: '2026-09-01',
      terms: 'Payment 30 days after physical receipt and inspection',
      remarks: 'Monthly planned replenishment for Q3 operations',
      status: 'Approved',
      createdAt: '2026-08-20T10:00:00Z',
      approvedAt: '2026-08-20T14:00:00Z',
      approvedBy: 'Admin (Checker)'
    }
  ],
  reconciliations: [
    {
      id: 'REC-AUD-001',
      reconciliationNo: 'REC-AUD-2026-001',
      reconciliationDate: '2026-08-25',
      categoryId: 'CAT-002',
      categoryName: 'Housekeeping',
      items: [
        {
          materialId: 'MAT-002',
          materialName: 'Disinfectant Surface Cleaner (5 Litre Can)',
          brand: 'Lizol Pro',
          unit: 'Can',
          systemQty: 44,
          physicalQty: 44,
          variance: 0,
          varianceValue: 0.00,
          remarks: 'Physical count exactly matches system records'
        }
      ],
      totalDiscrepancyItems: 0,
      remarks: 'Routine monthly sanitation inventory audit completed',
      status: 'Approved',
      createdAt: '2026-08-25T17:00:00Z',
      approvedAt: '2026-08-25T18:00:00Z',
      approvedBy: 'Admin (Checker)'
    }
  ]
};

const EMPTY_DATABASE = {
  userRole: 'Maker',
  categories: [],
  gstSlabs: [],
  vendors: [],
  consumables: [],
  receipts: [],
  requests: [],
  issuances: [],
  returns: [],
  stockAdjustments: [],
  purchaseOrders: [],
  reconciliations: []
};

localStorage.removeItem('CMS_DATABASE_V1');

function normalizeVendor(vendor) {
  const legacyFile = vendor.certificateFile || '';
  const addressText = String(vendor.address || '').toLowerCase();
  const inferredState = vendor.addressState || (
    addressText.includes('new delhi') ? 'Delhi' :
    addressText.includes('pune') ? 'Maharashtra' :
    addressText.includes('noida') ? 'Uttar Pradesh' :
    addressText.includes('bengaluru') ? 'Karnataka' : ''
  );
  const inferredDistrict = vendor.addressDistrict || (
    addressText.includes('okhla') ? 'New Delhi' :
    addressText.includes('bhosari') ? 'Pune' :
    addressText.includes('sector 8') ? 'Gautam Buddha Nagar' :
    addressText.includes('peenya') ? 'Bengaluru Urban' : ''
  );
  const inferredPinCode = vendor.addressPinCode || (String(vendor.address || '').match(/\b\d{6}\b/) || [''])[0];
  return {
    ...vendor,
    addressTaluka: vendor.addressTaluka || '',
    addressDistrict: inferredDistrict,
    addressState: inferredState,
    addressCountry: vendor.addressCountry || 'India',
    addressPinCode: inferredPinCode,
    gstNotApplicable: Boolean(vendor.gstNotApplicable),
    panNotApplicable: Boolean(vendor.panNotApplicable),
    gstCertificateFile: vendor.gstCertificateFile || legacyFile,
    panCardFile: vendor.panCardFile || legacyFile,
    approvedForLimitedPeriod: Boolean(vendor.approvedForLimitedPeriod),
    approvalValidTill: vendor.approvalValidTill || '',
    certificates: (vendor.certificates || []).map((certificate, index) => {
      if (typeof certificate === 'string') {
        return { name: certificate, formNo: '', certificateNo: `LEGACY-${index + 1}`, hasValidity: false, validTill: '', fileName: legacyFile };
      }
      return {
        ...certificate,
        formNo: certificate.formNo || '',
        certificateNo: certificate.certificateNo || `LEGACY-${index + 1}`,
        fileName: certificate.fileName || legacyFile
      };
    })
  };
}

class Store {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedUserId = localStorage.getItem(USER_KEY) || 'EMP-2041';
      const user = ENTERPRISE_USERS.find(u => u.id === savedUserId) || ENTERPRISE_USERS[0];

      if (saved) {
        const parsed = JSON.parse(saved);
        const hasRecords = ['categories', 'gstSlabs', 'vendors', 'consumables'].some(key => (parsed[key] || []).length > 0);
        if (!hasRecords) {
          const initial = JSON.parse(JSON.stringify(INITIAL_SEED));
          initial.vendors = initial.vendors.map(normalizeVendor);
          initial.userRole = user.role;
          return initial;
        }
        return {
          ...EMPTY_DATABASE,
          ...parsed,
          vendors: (parsed.vendors || []).map(normalizeVendor),
          userRole: user.role
        };
      }
    } catch (e) {
      console.error('Failed to load from localStorage, using empty database', e);
    }
    const initial = JSON.parse(JSON.stringify(INITIAL_SEED));
    initial.vendors = initial.vendors.map(normalizeVendor);
    return initial;
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      const currentUser = this.getCurrentUser();
      localStorage.setItem(ROLE_KEY, currentUser.role);
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
        window.dispatchEvent(new CustomEvent('cms-store-updated', { detail: this.data }));
      }
    } catch (e) {
      console.error('Error saving store', e);
    }
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(EMPTY_DATABASE));
    this.data.vendors = this.data.vendors.map(normalizeVendor);
    this.save();
  }

  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.categories || !parsed.consumables || !parsed.vendors) {
        throw new Error('Invalid backup file format.');
      }
      this.data = { ...parsed, vendors: parsed.vendors.map(normalizeVendor) };
      this.save();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  getUsers() {
    return ENTERPRISE_USERS;
  }

  setUsers(users) {
    if (!Array.isArray(users) || users.length === 0) return;
    ENTERPRISE_USERS = users.map(user => {
      const existing = ENTERPRISE_USERS.find(candidate => candidate.id === user.id);
      return {
        ...user,
        roleTitle: user.role === 'Checker' ? 'Store In-Charge (Checker)' : 'Store Staff (Maker)',
        badgeLabel: user.role === 'Checker' ? 'STORE IN-CHARGE / CHECKER' : 'STORE CLERK / MAKER',
        avatarText: (user.name || 'User').split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase(),
        avatarBg: user.role === 'Checker' ? 'bg-indigo-600' : 'bg-blue-600',
        avatarTextCol: 'text-white',
        pin: existing ? existing.pin : null,
        description: user.role === 'Checker' ? 'Store approval authority.' : 'Operational store maker.'
      };
    });
  }

  getCurrentUser() {
    const savedUserId = localStorage.getItem(USER_KEY) || 'EMP-2041';
    const user = ENTERPRISE_USERS.find(u => u.id === savedUserId);
    return user || ENTERPRISE_USERS[0];
  }

  setCurrentUser(userId) {
    const user = ENTERPRISE_USERS.find(u => u.id === userId);
    if (!user) return false;
    localStorage.setItem(USER_KEY, user.id);
    localStorage.setItem(ROLE_KEY, user.role);
    this.data.userRole = user.role;
    this.save();
    return true;
  }

  verifyManagerPin(pin) {
    const mgr = ENTERPRISE_USERS.find(u => u.role === 'Checker');
    return mgr && String(pin).trim() === String(mgr.pin);
  }

  switchUser(userId, providedPin = null) {
    const targetUser = ENTERPRISE_USERS.find(u => u.id === userId);
    if (!targetUser) {
      return { success: false, error: 'User profile not found.' };
    }

    if (targetUser.role === 'Checker') {
      if (!this.verifyManagerPin(providedPin)) {
        return { success: false, error: 'Invalid Manager Authorization PIN. Access Denied (Default PIN: 4321).' };
      }
    }

    this.setCurrentUser(targetUser.id);
    return { success: true, user: targetUser };
  }

  getRole() {
    return this.getCurrentUser().role;
  }

  isApprover() {
    return this.getCurrentUser().role === 'Checker';
  }

  setRole(role) {
    const user = ENTERPRISE_USERS.find(u => u.role === role);
    if (user) {
      this.setCurrentUser(user.id);
    }
  }

  // --- Auto Master Filing: Automatically registers a new item directly into Master from Goods Receipt ---
  autoCreateMasterItemFromReceipt(data) {
    const isFixed = data.inventoryType === 'Fixed';
    const count = this.data.consumables.length + 1;
    const newId = isFixed ? `MAT-FIX-${String(count).padStart(3, '0')}` : `MAT-CON-${String(count).padStart(3, '0')}`;

    const currentUser = this.getCurrentUser();
    const newMaterial = {
      id: newId,
      inventoryType: isFixed ? 'Fixed' : 'Consumer',
      categoryId: data.categoryId || 'CAT-001',
      categoryName: data.categoryName || 'General',
      materialName: data.materialName,
      unit: data.unit || 'Nos',
      brand: data.brand || 'Standard',
      supplierProductCode: data.sku || `SKU-${newId}`,
      assetTag: isFixed ? (data.assetTag || `AST-${String(count).padStart(3, '0')}`) : '',
      serialNo: isFixed ? (data.serialNo || '') : '',
      custodianDept: isFixed ? (data.custodianDept || 'Central Warehouse & Logistics') : '',
      hsnCode: data.hsnCode || '8471',
      sgst: Number(data.sgst || 0),
      cgst: Number(data.cgst || 0),
      igst: Number(data.igst || 0),
      
      // Vendor Quotation & MRP
      quotationNo: data.quotationNo || '',
      quotationDate: data.quotationDate || new Date().toISOString().split('T')[0],
      quotationRate: Number(data.quotationRate || data.vendor1Rate || 0),
      mrpBooked: Number(data.mrpBooked || 0),
      
      // Dual Vendor Pricing
      vendor1Id: data.vendor1Id || 'VEN-001',
      vendor1Name: data.vendor1Name || 'Approved Vendor',
      vendor1Rate: Number(data.quotationRate || data.vendor1Rate || 0),
      vendor1RateEffectiveFrom: data.rateEffectiveFrom || new Date().toISOString().split('T')[0],
      vendor2Id: data.vendor2Id || '',
      vendor2Name: data.vendor2Name || '',
      vendor2Rate: Number(data.vendor2Rate || 0),
      vendor2RateEffectiveFrom: '',
      consumerConfirmed: true,
      confirmedBy: `Auto-Cataloged by ${currentUser.name}`,
      confirmationDate: new Date().toISOString().split('T')[0],
      confirmationRemarks: 'Auto Master Filing triggered via Goods Inward Receipt',

      // Warranty Details
      hasWarranty: Boolean(data.hasWarranty),
      warrantyPeriod: data.warrantyPeriod || '',
      warrantyValidTill: data.warrantyValidTill || '',
      warrantyVendor: data.warrantyVendor || data.vendor1Name || '',

      // Preventive Maintenance Details
      hasPm: Boolean(data.hasPm),
      pmFrequency: data.pmFrequency || '',
      repairmanName: data.repairmanName || '',
      repairmanContact: data.repairmanContact || '',
      repairmanAgency: data.repairmanAgency || '',
      pmVendor: data.pmVendor || data.vendor1Name || '',
      lastPmDate: data.lastPmDate || new Date().toISOString().split('T')[0],
      nextPmDate: data.nextPmDate || '',
      pmHistory: [],

      avgMonthlyConsumption: Number(data.avgMonthlyConsumption || 10),
      initialStock: 0,
      status: 'Approved',
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      approvedBy: currentUser.id,
      approvedByName: currentUser.name
    };

    this.data.consumables.push(newMaterial);
    this.save();
    return newMaterial;
  }

  // --- Preventive Maintenance Logging ---
  logPmService(materialId, serviceRecord) {
    const mat = this.data.consumables.find(m => m.id === materialId);
    if (!mat) return { success: false, error: 'Material not found.' };

    mat.pmHistory = mat.pmHistory || [];
    const serviceDate = serviceRecord.serviceDate || serviceRecord.date || new Date().toISOString().split('T')[0];
    const entry = {
      id: 'PM-LOG-' + Date.now(),
      date: serviceDate,
      serviceDate: serviceDate,
      jobCardNo: serviceRecord.jobCardNo || ('JC-' + Date.now()),
      servicedBy: serviceRecord.technician || serviceRecord.repairmanName || mat.repairmanName || 'Field Technician',
      contact: serviceRecord.contact || serviceRecord.repairmanContact || mat.repairmanContact || '',
      agency: serviceRecord.agency || serviceRecord.repairmanAgency || mat.repairmanAgency || '',
      notes: serviceRecord.notes || 'Routine scheduled preventive maintenance completed.',
      cost: Number(serviceRecord.cost || 0),
      recordedBy: this.getCurrentUser().name,
      createdAt: new Date().toISOString()
    };

    mat.pmHistory.unshift(entry);
    mat.lastPmDate = entry.date;

    // Use custom nextScheduledDate if explicitly provided, else auto-calculate based on frequency
    if (serviceRecord.nextScheduledDate) {
      mat.nextPmDate = serviceRecord.nextScheduledDate;
      entry.nextScheduledDate = serviceRecord.nextScheduledDate;
    } else {
      const d = new Date(entry.date);
      if (mat.pmFrequency === 'Monthly') d.setMonth(d.getMonth() + 1);
      else if (mat.pmFrequency === 'Bi-Monthly') d.setMonth(d.getMonth() + 2);
      else if (mat.pmFrequency === 'Quarterly') d.setMonth(d.getMonth() + 3);
      else if (mat.pmFrequency === 'Half-Yearly') d.setMonth(d.getMonth() + 6);
      else if (mat.pmFrequency === 'Annually') d.setFullYear(d.getFullYear() + 1);
      else d.setMonth(d.getMonth() + 3);

      mat.nextPmDate = d.toISOString().split('T')[0];
      entry.nextScheduledDate = mat.nextPmDate;
    }
    this.save();
    return { success: true, material: mat, entry };
  }

  canApprove(record) {
    const currentUser = this.getCurrentUser();
    if (currentUser.role !== 'Checker') {
      return {
        allowed: false,
        reason: 'Approval authority restricted. Only Store In-Charge (Col. Anita Sharma) can sanction pending entries.'
      };
    }

    // Segregation of Duties (SoD) Anti-Self-Approval rule
    if (record && record.createdBy && record.createdBy === currentUser.id) {
      return {
        allowed: false,
        reason: 'Segregation of Duties Policy Violation: You cannot approve a record you personally drafted.'
      };
    }

    return { allowed: true };
  }

  // --- Dynamic Live Stock Calculation ---
  getStock(materialId) {
    const mat = this.data.consumables.find(m => m.id === materialId);
    if (!mat) return 0;

    let stock = Number(mat.initialStock || 0);

    // Add Approved Receipts (Challan + Invoice)
    // Note: Converted Challans represent the same goods as the Invoice, so they aren't double-counted
    const approvedReceipts = this.data.receipts.filter(r => r.materialId === materialId && r.status === 'Approved');
    for (const rec of approvedReceipts) {
      stock += Number(rec.qty || 0);
    }

    // Add Approved Returns to Store
    const approvedReturns = this.data.returns.filter(r => r.materialId === materialId && r.status === 'Approved');
    for (const ret of approvedReturns) {
      stock += Number(ret.qty || 0);
    }

    // Add/Minus Approved Stock Adjustments
    const approvedAdjustments = this.data.stockAdjustments.filter(a => a.materialId === materialId && a.status === 'Approved');
    for (const adj of approvedAdjustments) {
      if (adj.type === 'ADD') {
        stock += Number(adj.qty || 0);
      } else if (adj.type === 'DEDUCT') {
        stock -= Number(adj.qty || 0);
      }
    }

    // Deduct Approved Issuances
    const issuances = this.data.issuances.filter(i => i.materialId === materialId && (i.status === 'Issued' || i.status === 'Approved'));
    for (const iss of issuances) {
      stock -= Number(iss.issuedQty || 0);
    }

    // Adjust for Approved Reconciliations
    const approvedRecons = this.data.reconciliations.filter(rec => rec.status === 'Approved');
    for (const rec of approvedRecons) {
      const item = rec.items ? rec.items.find(i => i.materialId === materialId) : null;
      if (item && typeof item.variance === 'number') {
        stock += Number(item.variance);
      }
    }

    return Math.max(0, stock);
  }

  getTaxMode(record) {
    if (record && record.taxMode === 'IGST') return 'IGST';
    if (record && record.taxMode === 'CGST_SGST') return 'CGST_SGST';
    return Number(record?.igst || 0) > 0 && Number(record?.sgst || 0) === 0 && Number(record?.cgst || 0) === 0
      ? 'IGST'
      : 'CGST_SGST';
  }

  getTaxDetails(record) {
    const mode = this.getTaxMode(record);
    if (mode === 'IGST') {
      return { mode, sgst: 0, cgst: 0, igst: Number(record?.igst || 0), total: Number(record?.igst || 0) };
    }
    const sgst = Number(record?.sgst || 0);
    const cgst = Number(record?.cgst || 0);
    return { mode, sgst, cgst, igst: 0, total: sgst + cgst };
  }

  getTaxLabel(record) {
    const tax = this.getTaxDetails(record);
    if (tax.mode === 'IGST') return `IGST: ${tax.igst}%`;
    return `SGST: ${tax.sgst}% + CGST: ${tax.cgst}% = ${tax.total}%`;
  }

  // Pending items count across the whole system
  getPendingApprovalsCount() {
    let count = 0;
    count += this.data.vendors.filter(v => v.status === 'Pending Approval').length;
    count += this.data.categories.filter(c => c.status === 'Pending Approval').length;
    count += this.data.consumables.filter(m => m.status === 'Pending Approval').length;
    count += this.data.gstSlabs.filter(g => g.status === 'Pending Approval').length;
    count += this.data.receipts.filter(r => r.status === 'Pending Approval').length;
    count += this.data.returns.filter(r => r.status === 'Pending Approval').length;
    count += this.data.stockAdjustments.filter(a => a.status === 'Pending Approval').length;
    count += this.data.purchaseOrders.filter(p => p.status === 'Pending Approval').length;
    count += this.data.reconciliations.filter(rc => rc.status === 'Pending Approval').length;
    return count;
  }
}

window.CMS_STORE = new Store();
