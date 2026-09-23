# Adminutes - Consumable & Inventory Management System (ERP)

A comprehensive, responsive web application for managing consumable inventory, vendor master records, procurement replenishment, and physical stock audits based on the 13-page specification PDF.

---

## 🌟 Architecture & Features Mapped to Specification

### 1. Master Module
- **Vendor Master (Page 2)**:
  - Add / Modify / Delete vendors.
  - Multi-certificate selection (`ISO 9001:2015`, `MSME / Udyam`, `Pollution Clearance`, `GST Registration`, `Factory License`, etc.).
  - Certificate validity date tracker with renewal alert.
  - Compliance certificate file upload / attachment support.
  - GSTIN, phone, address, and email tracking with Maker-Checker approval.
- **Consumable Category Master (Page 3)**:
  - Add / Modify / Delete categories (`Stationery`, `Housekeeping`, `Packing Material`, `Safety & PPE`, etc.).
  - Approval workflow before categories become active for item cataloging.
- **Consumable (Material) Master (Page 4 & User Addition)**:
  - Catalog details: Category, Material Name, Unit of Measurement, Brand, SKU / Supplier Product Code, HSN Code, SGST/CGST/IGST rates.
  - **Dual-Vendor Pricing**: Primary Vendor (Vendor-1) and Secondary Vendor (Vendor-2) approved rates.
  - **Rate Effective From Date**: Date selector for when each vendor's approved price takes effect.
  - **Authorized Consumer Confirmation**: Security mechanism ensuring rates and effective dates are authenticated and confirmed by the designated department head / consumer.
  - Average Monthly Consumption (including buffer quantity) threshold.
- **GST / IGST Slab Master (Page 5)**:
  - Add / Modify / Delete tax slabs: Slab 1 (SGST % + CGST %), Slab 2 (IGST %), and Slab 3 (Statutory conditions).

---

### 2. Consumable Transaction Module
- **Goods Inward Receipts (Pages 7 & 8)**:
  - **By Delivery Challan**: Vendor, Challan No., Date, Material, Brand, Qty, Rate, Total, Remarks.
  - **By Invoice**: Vendor, Invoice No., Date, Material, Brand, Qty, Rate, SGST/CGST/IGST, Total, Remarks.
  - Stock Impact: Approving an inward receipt automatically restocks live central store inventory.
- **Consumable Requisitions / Requests (Page 9)**:
  - Raise departmental material requests with requested quantity, needed-by date, priority (Routine/Urgent), and purpose.
- **Store Issuance (Page 10)**:
  - Fulfill pending requisitions.
  - **Live Available Stock Display**: Explicitly displays available warehouse stock against each request.
  - Quantity modification for partial fulfillment or adjusted issue.
  - **One-Click Print Issue Slip**: Generates an official printable voucher with slip number, requisition reference, quantities, and triple-signature sign-off boxes.
- **Return to Store (Page 11)**:
  - Process unused or excess materials returned by departments.
  - Captures returned quantity, condition of goods, and restocks inventory upon approval.
- **Stock Adjustment (+ / -) [Page 6 User Addition]**:
  - Direct manual stock calibration.
  - **Plus (+) Add Stock**: Found unrecorded stock, count corrections, etc.
  - **Minus (-) Deduct Stock**: Damaged goods, expired/spoiled items, scrap discard, quality rejections.
  - Live preview of resulting stock, reason categories, and Maker-Checker approval before ledger adjustment.
- **Delivery Challan to Invoice Conversion (Page 6)**:
  - Formalize Delivery Challan receipts into official Tax Invoices when vendor billing arrives.
  - Links Invoice No. and date while preventing duplicate inventory counting.
- **Purchase Order Generation (Page 12)**:
  - Replenishment assistant for **15 days**, **1 month**, **3 months**, or Custom periods.
  - Smart formula: Auto-calculates suggested reorder quota based on `(Period Requirement) - Current Live Stock`.
  - **Dual-Vendor Rate Comparison**: Side-by-side comparison of Vendor-1 vs Vendor-2 rates and effective dates.
  - Printable professional Purchase Order voucher with commercial terms and signature boxes.
- **Stock Verification / Reconciliation (Page 13)**:
  - Select audit date and category $\rightarrow$ Click **"Generate Reconciliation Form"**.
  - Dynamic audit sheet pulls live system stock.
  - Enter **Physical Count** $\rightarrow$ Auto-calculates **Variance** and highlights discrepancies.
  - Capture discrepancy remarks $\rightarrow$ Submit for approval.
  - Upon approval, system inventory is calibrated to match physical count, and printable audit sheets can be printed.

---

### 3. Governance & Reports (Page 6)
- **Stock Status & Inventory Summary**: Real-time stock balance, buffer limits, valuation, and health indicators (Healthy, Reorder Needed, Out of Stock).
- **Stock Movement Ledger**: Complete chronological ledger of all receipts, issuances, returns, adjustments, and reconciliations.
- **Approval Queue (Maker-Checker Console)**: Unified hub listing every pending submission with quick approval buttons.
- **Data Export**: Export stock status and audit records to CSV.
- **Backup & Restore**: Download full database as JSON or restore anytime.

---

## 🚀 How to Run the Website

### Option 1: Start the Local Server
Authentication requires the Node server. Run `start.bat`, or use the Node instructions below, then open the displayed local URL.

### Option 2: Run with Node.js
Open PowerShell / Terminal in the project directory:
```powershell
agy-node.cmd server.js
```
Then visit: `http://localhost:8080`

### Authentication
The Node server provides cookie-based login sessions. Demo credentials are:

| Role | Username | Password |
|---|---|---|
| Store Staff (Maker) | `rajesh` | `adminutes123` |
| Store In-Charge (Checker) | `anita` | `checker4321` |

Set `CMS_MAKER_USERNAME`, `CMS_MAKER_PASSWORD`, `CMS_CHECKER_USERNAME`, and `CMS_CHECKER_PASSWORD` environment variables before starting the server to replace the demo credentials. Sessions expire after eight hours. For production, use HTTPS and a persistent user database or identity provider.

### Option 3: Run with Windows PowerShell
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```

`server.ps1` is a static-file server only and does not provide authentication APIs. Use `server.js` through Node.js for a complete local application, or use the deployed Vercel URL.

## Deploy to Vercel

This project uses the Node server for authentication, so do not deploy only the HTML file. Upload the complete project folder, including the `api` folder, or connect the project repository to Vercel.

1. Import the project in Vercel and keep the project root as the folder containing `index.html`.
2. Use the default Node.js settings. The included `api/[...path].js` file exposes the authentication endpoints.
3. Deploy, then open the generated Vercel URL.
4. Sign in with the credentials listed above.

The application data is stored in each browser's `localStorage`. User accounts are loaded from `users.json`, but adding a new Maker account is not persistent on Vercel because serverless deployments do not provide a writable application filesystem. Use a database or authentication provider before relying on account creation in production.
