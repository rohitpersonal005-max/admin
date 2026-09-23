# Adminutes User Guide

Adminutes is a consumable materials, stock, procurement, and approval management system.

## 1. Start the Website

Start the local server from the project folder:

```powershell
node server.js
```

Open:

- `http://localhost:8080`
- Alternative: `http://localhost:3000`

## 2. Sign In

| Role | Username | Password | Main Responsibility |
|---|---|---|---|
| Store Staff / Maker | `rajesh` | `adminutes123` | Create records and submit them for approval |
| Store In-Charge / Checker | `anita` | `checker4321` | Review and approve submitted records |

The Maker creates transactions. The Checker approves them. A Maker cannot approve their own submissions.

## 3. Dashboard

The Executive Dashboard is the starting screen. It shows:

- Emergency alerts
- Urgent departmental requests
- Out-of-stock materials
- Pending approvals for authorized Checkers

Use the action button on an alert to open the related work area. Alerts remain visible until the related action is completed.

## 4. Navigation Areas

### Draft Workspace

Use this area to review quotation and invoice drafts before submitting them for approval.

### Stock & Asset Care

#### Consumer Materials

View high-use materials such as stationery, cleaning supplies, packing items, and PPE. Review stock, buffers, valuation, quotations, and reorder needs.

#### Fixed Assets & PM

Track equipment and fixed assets using asset tags, serial numbers, warranty dates, maintenance schedules, and repairman details.

#### Stock Status & Buffers

Review current stock, monthly buffer levels, valuation, and health status such as healthy, low buffer, or out of stock.

#### Stock Ledger Trail

Review chronological stock movement, including receipts, issues, returns, adjustments, and reconciliation changes.

### Setup

#### Vendor

Create and maintain vendor details, GST/PAN information, contact details, compliance certificates, and validity dates.

#### Consumable Category

Create categories used to organize materials. New categories may require Checker approval before use.

#### Material

Register materials with category, unit, brand, SKU, HSN, tax rates, buffer quantity, vendor rates, effective dates, and optional fixed-asset details.

#### GST / IGST Slabs

Maintain applicable CGST, SGST, IGST, and statutory tax configurations.

### Store Operations

#### Goods Inward

Record material received by Delivery Challan or Invoice. Use Auto Material Filing when a received item is not yet registered. Approval adds approved quantities to stock.

#### Department Push / Pull Requests

Create departmental material requests. Select the material, quantity, required date, priority, department, and purpose. Mark urgent requests when immediate action is needed.

#### Store Issuance Slip

Fulfill approved requests. Check available stock, issue the required or adjusted quantity, and print the official issue slip.

#### Return to Store

Record unused or excess material returned by a department. Select the returned quantity and condition. Approval puts the accepted quantity back into stock.

#### Stock Adjustment (+/-)

Use plus adjustments for verified stock found or count corrections. Use minus adjustments for damage, expiry, rejection, or disposal. Enter a reason and submit for approval.

#### Challan to Invoice

Convert an approved Delivery Challan into an Invoice when vendor billing arrives. Link the invoice details without counting the same stock twice.

#### Purchase Order (PO)

Generate replenishment orders using a selected period such as 15 days, one month, three months, or a custom period. Compare approved vendor rates before submitting the PO.

#### Stock Reconciliation

Choose an audit date and category, generate the reconciliation sheet, enter physical counts, review variances, add remarks, and submit for approval. Approved reconciliation calibrates system stock to the physical count.

### Governance & Audit

#### Approval Hub

Available to the Store In-Charge. Review pending vendor, category, material, tax, receipt, return, adjustment, purchase order, and reconciliation submissions. Approve only after checking the supporting details.

## 5. Recommended Daily Workflow

1. Review the Executive Dashboard alerts.
2. Check urgent requests and pending approvals.
3. Record new inward receipts.
4. Process approved department requests and issue materials.
5. Record returns and stock adjustments with clear reasons.
6. Review Stock Status & Buffers for reorder needs.
7. Generate Purchase Orders when stock is below requirement.
8. Review the Stock Ledger Trail for movement verification.

## 6. Approval Workflow

1. The Maker creates or edits a record.
2. The Maker submits the record for approval.
3. The Checker opens Approval Hub.
4. The Checker verifies quantities, rates, documents, and remarks.
5. The Checker approves or rejects the record.
6. Approved transactions update the relevant stock or master data.

## 7. Backup and Restore

Use the application backup and restore controls to export or restore the local database JSON. Keep backups in a secure location and restore only a trusted file.

## 8. Users and Roles

### Current User Setup

The current local version has two server-authenticated users:

- `rajesh`: **Maker**. Creates and submits records, receipts, requests, issues, returns, purchase orders, and adjustments.
- `anita`: **Checker**. Reviews and approves submitted records and can access the Approval Hub.

The user records are stored in `users.json`. You can replace the original Maker and Checker credentials at server startup with environment variables:

```powershell
$env:CMS_MAKER_USERNAME = 'new-maker'
$env:CMS_MAKER_PASSWORD = 'strong-maker-password'
$env:CMS_CHECKER_USERNAME = 'new-checker'
$env:CMS_CHECKER_PASSWORD = 'strong-checker-password'
node server.js
```

These variables replace the credentials for the original two accounts; they do not create additional users.

### Add a New Maker from the Website

1. Sign in as the Checker.
2. Open the profile menu in the top-right corner.
3. Select **Add Maker**.
4. Enter the Maker's name, username, temporary password, department, and optional email.
5. Select **Create Maker**.

The new Maker is saved in `users.json` and can sign in immediately. The Maker sees the shared application data and approved quotations, but cannot approve records or view other Maker profiles. A Maker does not receive the **Add Maker** control, and the server rejects Maker attempts to call the user-creation endpoint.

### How Roles Are Decided

- Assign **Maker** to staff who prepare operational records and submit them for review.
- Assign **Checker** to an independent store in-charge or manager who verifies and approves records.
- Do not assign Checker approval authority to the person who created the same record.
- Keep approval responsibility separate from record preparation for four-eyes control.

### Adding More Users

Adding more than two users requires a user-management backend or identity provider. The production design should store users securely with fields such as employee ID, name, username, password hash, department, active status, and role. Roles and permissions should be enforced on the server, not only in the browser.

Recommended future roles include:

- **Maker**: create and submit operational records.
- **Checker**: approve or reject submissions.
- **Store Viewer**: read-only access to stock and reports.
- **Administrator**: manage users, roles, configuration, and system settings.

## 9. Practical Tips

- Use clear remarks for every adjustment, return, and reconciliation variance.
- Check available stock before issuing materials.
- Use the correct unit of measurement consistently.
- Keep vendor certificates and validity dates current.
- Review urgent alerts before routine work.
- Use the print actions for official issue slips, purchase orders, and reconciliation sheets.
