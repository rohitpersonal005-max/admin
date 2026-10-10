/**
 * Adminutes - Masters Module Engine
 * Handles Vendor Master, Consumable Category Master, Consumable (Material) Master
 * with Rate Effective From & Authorized Consumer Confirmation, and GST/IGST Slabs.
 * Includes Live Search, Category Filters, and Material 360° Inspection Drawers.
 */

window.CMS_MASTERS = {
  vendorSearchQuery: '',
  vendorStatusFilter: 'ALL',
  vendorStateFilter: 'ALL',
  consumableSearchQuery: '',
  countries: [
      { name: 'Afghanistan', flag: '🇦🇫', code: '+93' },
      { name: 'Albania', flag: '🇦🇱', code: '+355' },
      { name: 'Algeria', flag: '🇩🇿', code: '+213' },
      { name: 'Andorra', flag: '🇦🇩', code: '+376' },
      { name: 'Angola', flag: '🇦🇴', code: '+244' },
      { name: 'Antigua and Barbuda', flag: '🇦🇬', code: '+1' },
      { name: 'Argentina', flag: '🇦🇷', code: '+54' },
      { name: 'Armenia', flag: '🇦🇲', code: '+374' },
      { name: 'Australia', flag: '🇦🇺', code: '+61' },
      { name: 'Austria', flag: '🇦🇹', code: '+43' },
      { name: 'Azerbaijan', flag: '🇦🇿', code: '+994' },
      { name: 'Bahamas', flag: '🇧🇸', code: '+1' },
      { name: 'Bahrain', flag: '🇧🇭', code: '+973' },
      { name: 'Bangladesh', flag: '🇧🇩', code: '+880' },
      { name: 'Barbados', flag: '🇧🇧', code: '+1' },
      { name: 'Belarus', flag: '🇧🇾', code: '+375' },
      { name: 'Belgium', flag: '🇧🇪', code: '+32' },
      { name: 'Belize', flag: '🇧🇿', code: '+501' },
      { name: 'Benin', flag: '🇧🇯', code: '+229' },
      { name: 'Bhutan', flag: '🇧🇹', code: '+975' },
      { name: 'Bolivia', flag: '🇧🇴', code: '+591' },
      { name: 'Bosnia and Herzegovina', flag: '🇧🇦', code: '+387' },
      { name: 'Botswana', flag: '🇧🇼', code: '+267' },
      { name: 'Brazil', flag: '🇧🇷', code: '+55' },
      { name: 'Brunei', flag: '🇧🇳', code: '+673' },
      { name: 'Bulgaria', flag: '🇧🇬', code: '+359' },
      { name: 'Burkina Faso', flag: '🇧🇫', code: '+226' },
      { name: 'Burundi', flag: '🇧🇮', code: '+257' },
      { name: 'Cabo Verde', flag: '🇨🇻', code: '+238' },
      { name: 'Cambodia', flag: '🇰🇭', code: '+855' },
      { name: 'Cameroon', flag: '🇨🇲', code: '+237' },
      { name: 'Canada', flag: '🇨🇦', code: '+1' },
      { name: 'Central African Republic', flag: '🇨🇫', code: '+236' },
      { name: 'Chad', flag: '🇹🇩', code: '+235' },
      { name: 'Chile', flag: '🇨🇱', code: '+56' },
      { name: 'China', flag: '🇨🇳', code: '+86' },
      { name: 'Colombia', flag: '🇨🇴', code: '+57' },
      { name: 'Comoros', flag: '🇰🇲', code: '+269' },
      { name: 'Congo', flag: '🇨🇬', code: '+242' },
      { name: 'Costa Rica', flag: '🇨🇷', code: '+506' },
      { name: 'Croatia', flag: '🇭🇷', code: '+385' },
      { name: 'Cuba', flag: '🇨🇺', code: '+53' },
      { name: 'Cyprus', flag: '🇨🇾', code: '+357' },
      { name: 'Czechia', flag: '🇨🇿', code: '+420' },
      { name: 'Denmark', flag: '🇩🇰', code: '+45' },
      { name: 'Djibouti', flag: '🇩🇯', code: '+253' },
      { name: 'Dominica', flag: '🇩🇲', code: '+1' },
      { name: 'Dominican Republic', flag: '🇩🇴', code: '+1' },
      { name: 'Ecuador', flag: '🇪🇨', code: '+593' },
      { name: 'Egypt', flag: '🇪🇬', code: '+20' },
      { name: 'El Salvador', flag: '🇸🇻', code: '+503' },
      { name: 'Equatorial Guinea', flag: '🇬🇶', code: '+240' },
      { name: 'Eritrea', flag: '🇪🇷', code: '+291' },
      { name: 'Estonia', flag: '🇪🇪', code: '+372' },
      { name: 'Eswatini', flag: '🇸🇿', code: '+268' },
      { name: 'Ethiopia', flag: '🇪🇹', code: '+251' },
      { name: 'Fiji', flag: '🇫🇯', code: '+679' },
      { name: 'Finland', flag: '🇫🇮', code: '+358' },
      { name: 'France', flag: '🇫🇷', code: '+33' },
      { name: 'Gabon', flag: '🇬🇦', code: '+241' },
      { name: 'Gambia', flag: '🇬🇲', code: '+220' },
      { name: 'Georgia', flag: '🇬🇪', code: '+995' },
      { name: 'Germany', flag: '🇩🇪', code: '+49' },
      { name: 'Ghana', flag: '🇬🇭', code: '+233' },
      { name: 'Greece', flag: '🇬🇷', code: '+30' },
      { name: 'Grenada', flag: '🇬🇩', code: '+1' },
      { name: 'Guatemala', flag: '🇬🇹', code: '+502' },
      { name: 'Guinea', flag: '🇬🇳', code: '+224' },
      { name: 'Guinea-Bissau', flag: '🇬🇼', code: '+245' },
      { name: 'Guyana', flag: '🇬🇾', code: '+592' },
      { name: 'Haiti', flag: '🇭🇹', code: '+509' },
      { name: 'Honduras', flag: '🇭🇳', code: '+504' },
      { name: 'Hungary', flag: '🇭🇺', code: '+36' },
      { name: 'Iceland', flag: '🇮🇸', code: '+354' },
      { name: 'India', flag: '🇮🇳', code: '+91' },
      { name: 'Indonesia', flag: '🇮🇩', code: '+62' },
      { name: 'Iran', flag: '🇮🇷', code: '+98' },
      { name: 'Iraq', flag: '🇮🇶', code: '+964' },
      { name: 'Ireland', flag: '🇮🇪', code: '+353' },
      { name: 'Israel', flag: '🇮🇱', code: '+972' },
      { name: 'Italy', flag: '🇮🇹', code: '+39' },
      { name: 'Jamaica', flag: '🇯🇲', code: '+1' },
      { name: 'Japan', flag: '🇯🇵', code: '+81' },
      { name: 'Jordan', flag: '🇯🇴', code: '+962' },
      { name: 'Kazakhstan', flag: '🇰🇿', code: '+7' },
      { name: 'Kenya', flag: '🇰🇪', code: '+254' },
      { name: 'Kiribati', flag: '🇰🇮', code: '+686' },
      { name: 'Kuwait', flag: '🇰🇼', code: '+965' },
      { name: 'Kyrgyzstan', flag: '🇰🇬', code: '+996' },
      { name: 'Laos', flag: '🇱🇦', code: '+856' },
      { name: 'Latvia', flag: '🇱🇻', code: '+371' },
      { name: 'Lebanon', flag: '🇱🇧', code: '+961' },
      { name: 'Lesotho', flag: '🇱🇸', code: '+266' },
      { name: 'Liberia', flag: '🇱🇷', code: '+231' },
      { name: 'Libya', flag: '🇱🇾', code: '+218' },
      { name: 'Liechtenstein', flag: '🇱🇮', code: '+423' },
      { name: 'Lithuania', flag: '🇱🇹', code: '+370' },
      { name: 'Luxembourg', flag: '🇱🇺', code: '+352' },
      { name: 'Madagascar', flag: '🇲🇬', code: '+261' },
      { name: 'Malawi', flag: '🇲🇼', code: '+265' },
      { name: 'Malaysia', flag: '🇲🇾', code: '+60' },
      { name: 'Maldives', flag: '🇲🇻', code: '+960' },
      { name: 'Mali', flag: '🇲🇱', code: '+223' },
      { name: 'Malta', flag: '🇲🇹', code: '+356' },
      { name: 'Marshall Islands', flag: '🇲🇭', code: '+692' },
      { name: 'Mauritania', flag: '🇲🇷', code: '+222' },
      { name: 'Mauritius', flag: '🇲🇺', code: '+230' },
      { name: 'Mexico', flag: '🇲🇽', code: '+52' },
      { name: 'Micronesia', flag: '🇫🇲', code: '+691' },
      { name: 'Moldova', flag: '🇲🇩', code: '+373' },
      { name: 'Monaco', flag: '🇲🇨', code: '+377' },
      { name: 'Mongolia', flag: '🇲🇳', code: '+976' },
      { name: 'Montenegro', flag: '🇲🇪', code: '+382' },
      { name: 'Morocco', flag: '🇲🇦', code: '+212' },
      { name: 'Mozambique', flag: '🇲🇿', code: '+258' },
      { name: 'Myanmar', flag: '🇲🇲', code: '+95' },
      { name: 'Namibia', flag: '🇳🇦', code: '+264' },
      { name: 'Nauru', flag: '🇳🇷', code: '+674' },
      { name: 'Nepal', flag: '🇳🇵', code: '+977' },
      { name: 'Netherlands', flag: '🇳🇱', code: '+31' },
      { name: 'New Zealand', flag: '🇳🇿', code: '+64' },
      { name: 'Nicaragua', flag: '🇳🇮', code: '+505' },
      { name: 'Niger', flag: '🇳🇪', code: '+227' },
      { name: 'Nigeria', flag: '🇳🇬', code: '+234' },
      { name: 'North Korea', flag: '🇰🇵', code: '+850' },
      { name: 'North Macedonia', flag: '🇲🇰', code: '+389' },
      { name: 'Norway', flag: '🇳🇴', code: '+47' },
      { name: 'Oman', flag: '🇴🇲', code: '+968' },
      { name: 'Pakistan', flag: '🇵🇰', code: '+92' },
      { name: 'Palau', flag: '🇵🇼', code: '+680' },
      { name: 'Palestine', flag: '🇵🇸', code: '+970' },
      { name: 'Panama', flag: '🇵🇦', code: '+507' },
      { name: 'Papua New Guinea', flag: '🇵🇬', code: '+675' },
      { name: 'Paraguay', flag: '🇵🇾', code: '+595' },
      { name: 'Peru', flag: '🇵🇪', code: '+51' },
      { name: 'Philippines', flag: '🇵🇭', code: '+63' },
      { name: 'Poland', flag: '🇵🇱', code: '+48' },
      { name: 'Portugal', flag: '🇵🇹', code: '+351' },
      { name: 'Qatar', flag: '🇶🇦', code: '+974' },
      { name: 'Romania', flag: '🇷🇴', code: '+40' },
      { name: 'Russia', flag: '🇷🇺', code: '+7' },
      { name: 'Rwanda', flag: '🇷🇼', code: '+250' },
      { name: 'Saint Kitts and Nevis', flag: '🇰🇳', code: '+1' },
      { name: 'Saint Lucia', flag: '🇱🇨', code: '+1' },
      { name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', code: '+1' },
      { name: 'Samoa', flag: '🇼🇸', code: '+685' },
      { name: 'San Marino', flag: '🇸🇲', code: '+378' },
      { name: 'Sao Tome and Principe', flag: '🇸🇹', code: '+239' },
      { name: 'Saudi Arabia', flag: '🇸🇦', code: '+966' },
      { name: 'Senegal', flag: '🇸🇳', code: '+221' },
      { name: 'Serbia', flag: '🇷🇸', code: '+381' },
      { name: 'Seychelles', flag: '🇸🇨', code: '+248' },
      { name: 'Sierra Leone', flag: '🇸🇱', code: '+232' },
      { name: 'Singapore', flag: '🇸🇬', code: '+65' },
      { name: 'Slovakia', flag: '🇸🇰', code: '+421' },
      { name: 'Slovenia', flag: '🇸🇮', code: '+386' },
      { name: 'Solomon Islands', flag: '🇸🇧', code: '+677' },
      { name: 'Somalia', flag: '🇸🇴', code: '+252' },
      { name: 'South Africa', flag: '🇿🇦', code: '+27' },
      { name: 'South Korea', flag: '🇰🇷', code: '+82' },
      { name: 'South Sudan', flag: '🇸🇸', code: '+211' },
      { name: 'Spain', flag: '🇪🇸', code: '+34' },
      { name: 'Sri Lanka', flag: '🇱🇰', code: '+94' },
      { name: 'Sudan', flag: '🇸🇩', code: '+249' },
      { name: 'Suriname', flag: '🇸🇷', code: '+597' },
      { name: 'Sweden', flag: '🇸🇪', code: '+46' },
      { name: 'Switzerland', flag: '🇨🇭', code: '+41' },
      { name: 'Syria', flag: '🇸🇾', code: '+963' },
      { name: 'Taiwan', flag: '🇹🇼', code: '+886' },
      { name: 'Tajikistan', flag: '🇹🇯', code: '+992' },
      { name: 'Tanzania', flag: '🇹🇿', code: '+255' },
      { name: 'Thailand', flag: '🇹🇭', code: '+66' },
      { name: 'Timor-Leste', flag: '🇹🇱', code: '+670' },
      { name: 'Togo', flag: '🇹🇬', code: '+228' },
      { name: 'Tonga', flag: '🇹🇴', code: '+676' },
      { name: 'Trinidad and Tobago', flag: '🇹🇹', code: '+1' },
      { name: 'Tunisia', flag: '🇹🇳', code: '+216' },
      { name: 'Turkey', flag: '🇹🇷', code: '+90' },
      { name: 'Turkmenistan', flag: '🇹🇲', code: '+993' },
      { name: 'Tuvalu', flag: '🇹🇻', code: '+688' },
      { name: 'Uganda', flag: '🇺🇬', code: '+256' },
      { name: 'Ukraine', flag: '🇺🇦', code: '+380' },
      { name: 'United Arab Emirates', flag: '🇦🇪', code: '+971' },
      { name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
      { name: 'United States', flag: '🇺🇸', code: '+1' },
      { name: 'Uruguay', flag: '🇺🇾', code: '+598' },
      { name: 'Uzbekistan', flag: '🇺🇿', code: '+998' },
      { name: 'Vanuatu', flag: '🇻🇺', code: '+678' },
      { name: 'Vatican City', flag: '🇻🇦', code: '+379' },
      { name: 'Venezuela', flag: '🇻🇪', code: '+58' },
      { name: 'Vietnam', flag: '🇻🇳', code: '+84' },
      { name: 'Yemen', flag: '🇾🇪', code: '+967' },
      { name: 'Zambia', flag: '🇿🇲', code: '+260' },
      { name: 'Zimbabwe', flag: '🇿🇼', code: '+263' }
    ],
    consumableCategoryFilter: '',
  consumableTypeFilter: '',
  consumableStatusFilter: 'ALL',

  // Official Indian States & UTs with official GST 2-digit State Codes
  indianStates: [
    { code: '01', name: 'Jammu and Kashmir' },
    { code: '02', name: 'Himachal Pradesh' },
    { code: '03', name: 'Punjab' },
    { code: '04', name: 'Chandigarh' },
    { code: '05', name: 'Uttarakhand' },
    { code: '06', name: 'Haryana' },
    { code: '07', name: 'Delhi' },
    { code: '08', name: 'Rajasthan' },
    { code: '09', name: 'Uttar Pradesh' },
    { code: '10', name: 'Bihar' },
    { code: '11', name: 'Sikkim' },
    { code: '12', name: 'Arunachal Pradesh' },
    { code: '13', name: 'Nagaland' },
    { code: '14', name: 'Manipur' },
    { code: '15', name: 'Mizoram' },
    { code: '16', name: 'Tripura' },
    { code: '17', name: 'Meghalaya' },
    { code: '18', name: 'Assam' },
    { code: '19', name: 'West Bengal' },
    { code: '20', name: 'Jharkhand' },
    { code: '21', name: 'Odisha' },
    { code: '22', name: 'Chhattisgarh' },
    { code: '23', name: 'Madhya Pradesh' },
    { code: '24', name: 'Gujarat' },
    { code: '26', name: 'Dadra and Nagar Haveli and Daman and Diu' },
    { code: '27', name: 'Maharashtra' },
    { code: '29', name: 'Karnataka' },
    { code: '30', name: 'Goa' },
    { code: '31', name: 'Lakshadweep' },
    { code: '32', name: 'Kerala' },
    { code: '33', name: 'Tamil Nadu' },
    { code: '34', name: 'Puducherry' },
    { code: '35', name: 'Andaman and Nicobar Islands' },
    { code: '36', name: 'Telangana' },
    { code: '37', name: 'Andhra Pradesh' },
    { code: '38', name: 'Ladakh' }
  ],

  getStateInfo(stateName) {
    const companyInfo = JSON.parse(localStorage.getItem('CMS_COMPANY_INFO') || '{}');
    const compState = (companyInfo.state || 'Delhi').toLowerCase();
    
    const s = this.indianStates.find(item => item.name.toLowerCase() === String(stateName || '').toLowerCase());
    if (!s) return { code: '', name: stateName || '', taxMode: 'IGST' };
    
    const isSameState = s.name.toLowerCase() === compState || (companyInfo.stateCode && s.code === companyInfo.stateCode);
    const taxMode = isSameState ? 'CGST_SGST' : 'IGST';
    return { ...s, taxMode };
  },

  // ==========================================
  // VENDOR MASTER
  // ==========================================
  renderVendorRows(list, role) {
    if (list.length === 0) {
      return `
        <tr>
          <td colspan="7" class="p-12 text-center text-slate-400">
            <i data-lucide="folder-search" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
            <div class="font-bold text-slate-600">No matching vendors found</div>
            <p class="text-slate-400 text-xs mt-1">Try clearing your search query or adjusting your filters.</p>
          </td>
        </tr>
      `;
    }

    // Drag pending approvals on top, then Revision Required, then Approved, then Blocked
    const statusPriority = {
      'Pending Approval': 0,
      'Revision Required': 1,
      'Approved': 2,
      'Draft': 3
    };

    const sortedList = [...list].sort((a, b) => {
      const pa = a.isBlocked ? 4 : (statusPriority[a.status] ?? 2);
      const pb = b.isBlocked ? 4 : (statusPriority[b.status] ?? 2);
      if (pa !== pb) return pa - pb;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return sortedList.map(v => {
      const isBlocked = Boolean(v.isBlocked);
      const isPending = v.status === 'Pending Approval';
      const isRevision = v.status === 'Revision Required';
      const isApproved = v.status === 'Approved';
      const stateInfo = this.getStateInfo(v.addressState);

      return `
        <tr class="hover:bg-slate-50/80 transition ${isBlocked ? 'bg-rose-50/40' : isRevision ? 'bg-amber-50/40' : isPending ? 'bg-slate-50/30' : ''}">
          <td class="p-4">
            <div class="flex items-center gap-2">
              <span class="font-bold text-blue-600 text-sm hover:text-blue-600 cursor-pointer" onclick="CMS_MASTERS.viewVendorProfile('${v.id}')">${v.name}</span>
              ${isBlocked ? '<span class="px-1.5 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 font-bold text-[9px] uppercase tracking-wide">BLOCKED</span>' : ''}
              ${isRevision ? '<span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 font-bold text-[9px] uppercase tracking-wide">REVISION REQUIRED</span>' : ''}
            </div>
            <div class="text-[11px] text-slate-400 font-mono mt-0.5">${v.id} • ${stateInfo.code ? `State Code: ${stateInfo.code}` : ''}</div>
            <div class="text-slate-500 line-clamp-1 mt-0.5 text-[11px]" title="${[v.address, v.addressDistrict, v.addressState].filter(Boolean).join(', ')}">
              ${[v.address, v.addressDistrict, v.addressState].filter(Boolean).join(', ')}
            </div>
            ${v.checkerMistakeRemark ? `
              <div class="text-[10px] text-rose-700 bg-rose-50 border border-rose-200 p-1 rounded mt-1 font-medium truncate" title="Reported Mistake: ${v.checkerMistakeRemark}">
                <i data-lucide="alert-circle" class="w-3 h-3 inline mr-0.5 text-rose-600"></i> Mistake: ${v.checkerMistakeRemark}
              </div>
            ` : ''}
          </td>
          <td class="p-4 font-mono font-bold text-slate-800">
            ${v.gstNotApplicable ? '<span class="text-slate-400 font-normal">Exempt (N/A)</span>' : (v.gstNo || '<span class="text-slate-400">Unregistered</span>')}
            ${v.gstCertificateFile ? `
              <div class="text-[10px] text-emerald-700 font-sans font-medium flex items-center gap-1 mt-1 cursor-pointer hover:underline" onclick="CMS_APP.viewDocument('${v.gstCertificateFile}', 'GST Certificate', { partyName: '${v.name.replace(/'/g, "\\'")}', id: '${v.id}' })">
                <i data-lucide="file-check" class="w-3 h-3"></i> GST Cert
              </div>
            ` : ''}
          </td>
          <td class="p-4 font-mono font-bold text-slate-800">
            ${v.panNotApplicable ? '<span class="text-slate-400 font-normal">Exempt (N/A)</span>' : (v.panNo || (v.gstNo && v.gstNo.length >= 12 ? v.gstNo.substring(2, 12).toUpperCase() : '<span class="text-slate-400 font-normal font-sans">Pending</span>'))}
            ${v.panCardFile ? `
              <div class="text-[10px] text-emerald-700 font-sans font-medium flex items-center gap-1 mt-1 cursor-pointer hover:underline" onclick="CMS_APP.viewDocument('${v.panCardFile}', 'PAN Card', { partyName: '${v.name.replace(/'/g, "\\'")}', id: '${v.id}' })">
                <i data-lucide="file-check" class="w-3 h-3"></i> PAN Copy
              </div>
            ` : ''}
          </td>
          <td class="p-4">
            <div class="flex flex-wrap gap-1.5 max-w-sm">
              ${(!v.certificates || v.certificates.length === 0) ? '<span class="text-slate-400 italic text-[11px]">No certificates</span>' : (v.certificates || []).map(c => {
                const cName = typeof c === 'string' ? c : (c.regulator || c.name || 'Certificate');
                const formNo = typeof c === 'object' && c.formNo ? ` (${c.formNo})` : '';
                const hasVal = typeof c === 'object' ? c.hasValidity : false;
                const valDate = typeof c === 'object' ? (c.validTill || '') : '';
                const formattedDate = valDate ? window.CMS_STORE.formatDate(valDate) : '';
                const isExpiring = valDate && new Date(valDate) < new Date(Date.now() + 30 * 86400000);
                const isExpired = valDate && new Date(valDate) < new Date();
                return `
                  <div class="inline-flex items-center gap-1.5 text-[10px] bg-slate-50 text-blue-600 border border-slate-200 px-2 py-0.5 rounded font-medium shadow-sm">
                    <span>${cName}${formNo}</span>
                    ${hasVal && valDate ? `
                      <span class="px-1 py-0.2 rounded font-mono font-bold text-[9px] ${isExpired ? 'bg-red-100 text-red-800 border border-red-300' : isExpiring ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-blue-600'}" title="Valid Till: ${formattedDate}">
                        Exp: ${formattedDate}
                      </span>
                    ` : ''}
                  </div>
                `;
              }).join('')}
              ${v.quotationNo ? `
                <div class="w-full text-[10px] text-blue-600 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded font-medium mt-0.5 flex items-center justify-between">
                  <span>Quote: ${v.quotationNo}</span>
                  ${v.quotationValidTill ? `<span class="font-mono text-slate-500">Exp: ${window.CMS_STORE.formatDate(v.quotationValidTill)}</span>` : ''}
                </div>
              ` : ''}
            </div>
          </td>
          <td class="p-4 text-xs space-y-0.5">
            <div class="text-slate-800 font-medium">Tel: ${(v.countryCode ? v.countryCode + ' ' : '') + (v.contactNo || '-')}</div>
            <div class="text-slate-500">Email: ${v.email || '-'}</div>
            ${v.bankName ? `<div class="text-[10px] text-slate-400 font-mono">Bank: ${v.bankName}</div>` : ''}
          </td>
          <td class="p-4">
            <span class="badge ${isApproved ? 'badge-approved' : isRevision ? 'badge-draft' : isPending ? 'badge-pending' : 'badge-draft'}">
              ${v.status}
            </span>
            ${v.approvedForLimitedPeriod && v.approvalValidTill ? `
              <div class="text-[10px] text-amber-700 font-mono mt-1 font-semibold">Valid Till: ${window.CMS_STORE.formatDate(v.approvalValidTill)}</div>
            ` : ''}
          </td>
          <td class="p-4 text-right space-x-1 whitespace-nowrap">
            <!-- Eye View Button (Available to both User and Admin) -->
            <button onclick="CMS_MASTERS.viewVendorProfile('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-sm transition" title="Inspect Profile & Documents">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>

            <!-- Maker Edit Button (Only User can edit) -->
            ${role === 'User' ? `
              <button onclick="CMS_MASTERS.openVendorModal('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-sm transition" title="Modify Vendor">
                <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
              </button>
            ` : ''}

            <!-- Checker Governance Actions: Sanction or Reject with Mistake Remark -->
            ${(isPending || isRevision) && role === 'Admin' ? `
              <button onclick="CMS_MASTERS.openVendorSanctionModal('${v.id}')" class="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-sm transition shadow-sm" title="Sanction Vendor">
                Approve
              </button>
              <button onclick="CMS_MASTERS.openVendorRejectModal('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded-sm transition" title="Reject / Return for Revision">
                Reject
              </button>
            ` : ''}

            <!-- Ban / Blacklist with confirmation prompt (Checker only) -->
            ${role === 'Admin' ? `
              <button onclick="CMS_MASTERS.promptBlockVendor('${v.id}', ${!isBlocked})" class="px-2 py-1 text-xs font-semibold ${isBlocked ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200' : 'text-amber-700 bg-amber-100 hover:bg-amber-200'} rounded-sm transition" title="${isBlocked ? 'Unblock Vendor' : 'Blacklist / Block Vendor'}">
                <i data-lucide="${isBlocked ? 'check-circle' : 'ban'}" class="w-3.5 h-3.5"></i>
              </button>
            ` : ''}
          </td>
        </tr>
      `;
    }).join('');
  },

  renderVendors() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    let list = this.getFilteredVendors();

    return `
      <div class="space-y-6">
        <!-- Header & Action Bar -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-slate-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="building-2" class="w-4 h-4"></i>
              </div>
              <span>Vendor Master</span>
            </h2>
            
          </div>
          <div class="flex flex-wrap items-center gap-2.5">
            ${role !== 'Admin' ? `
              <button onclick="CMS_MASTERS.openVendorModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition text-xs">
                <i data-lucide="plus-circle" class="w-4 h-4"></i>
                <span>Register New Vendor</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Table Toolbar: Search & Filter -->
        <div class="bg-white p-4 rounded-sm border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-3">
          <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div class="relative w-full sm:w-72">
              <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="text" id="v-search-input" value="${this.vendorSearchQuery}" oninput="CMS_MASTERS.onVendorSearch(this.value)" placeholder="Search vendor name, GSTIN, PAN, state, code..." class="table-search-input w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs focus:bg-white focus:outline-none" />
              <button id="v-search-clear" type="button" onclick="CMS_MASTERS.clearVendorSearch()" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded ${this.vendorSearchQuery ? '' : 'hidden'}" title="Clear Search">
                <i data-lucide="x" class="w-3.5 h-3.5"></i>
              </button>
            </div>

            <!-- Status Filter -->
            <select id="v-status-filter" onchange="CMS_MASTERS.onVendorStatusFilter(this.value)" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none">
              <option value="ALL" ${this.vendorStatusFilter === 'ALL' ? 'selected' : ''}>-- All Statuses --</option>
              <option value="Pending Approval" ${this.vendorStatusFilter === 'Pending Approval' ? 'selected' : ''}>Pending Approval</option>
              <option value="Revision Required" ${this.vendorStatusFilter === 'Revision Required' ? 'selected' : ''}>Revision Required</option>
              <option value="Approved" ${this.vendorStatusFilter === 'Approved' ? 'selected' : ''}>Approved Vendors</option>
              <option value="Blocked" ${this.vendorStatusFilter === 'Blocked' ? 'selected' : ''}>Blocked / Blacklisted</option>
            </select>

            <!-- State Filter -->
            <select id="v-state-filter" onchange="CMS_MASTERS.onVendorStateFilter(this.value)" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none max-w-[180px]">
              <option value="ALL" ${this.vendorStateFilter === 'ALL' ? 'selected' : ''}>-- All States / UTs --</option>
              ${this.indianStates.map(s => `<option value="${s.name}" ${this.vendorStateFilter === s.name ? 'selected' : ''}>${s.code} - ${s.name}</option>`).join('')}
            </select>
          </div>

          <div id="vendor-count-display" class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${list.length}</strong> of ${store.vendors.length} vendors
          </div>
        </div>

        <!-- Vendor Table -->
        <div class="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-4">Vendor Details</th>
                  <th class="p-4">GST Number</th>
                  <th class="p-4">PAN Card</th>
                  <th class="p-4">Compliance Certificates</th>
                  <th class="p-4">Contact Info</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody id="vendor-table-body" class="divide-y divide-slate-100">
                ${this.renderVendorRows(list, role)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  getFilteredVendors() {
    const store = window.CMS_STORE.data;
    let list = store.vendors || [];

    if (this.vendorSearchQuery) {
      const q = this.vendorSearchQuery.toLowerCase();
      list = list.filter(v =>
        (v.name || '').toLowerCase().includes(q) ||
        (v.gstNo || '').toLowerCase().includes(q) ||
        (v.panNo || '').toLowerCase().includes(q) ||
        (v.id || '').toLowerCase().includes(q) ||
        (v.email || '').toLowerCase().includes(q) ||
        (v.addressState || '').toLowerCase().includes(q) ||
        (v.addressDistrict || '').toLowerCase().includes(q)
      );
    }

    if (this.vendorStatusFilter && this.vendorStatusFilter !== 'ALL') {
      if (this.vendorStatusFilter === 'Blocked') {
        list = list.filter(v => Boolean(v.isBlocked));
      } else {
        list = list.filter(v => v.status === this.vendorStatusFilter && !v.isBlocked);
      }
    }

    if (this.vendorStateFilter && this.vendorStateFilter !== 'ALL') {
      list = list.filter(v => (v.addressState || '').toLowerCase() === this.vendorStateFilter.toLowerCase());
    }

    return list;
  },

  onVendorSearch(val) {
    this.vendorSearchQuery = (val || '').trim();
    this.refreshVendorsView();
  },

  clearVendorSearch() {
    this.vendorSearchQuery = '';
    const input = document.getElementById('v-search-input');
    if (input) {
      input.value = '';
      input.focus();
    }
    this.refreshVendorsView();
  },

  onVendorStatusFilter(val) {
    this.vendorStatusFilter = val;
    this.refreshVendorsView();
  },

  onVendorStateFilter(val) {
    this.vendorStateFilter = val;
    this.refreshVendorsView();
  },

  refreshVendorsView() {
    const tbody = document.getElementById('vendor-table-body');
    const countEl = document.getElementById('vendor-count-display');
    const clearBtn = document.getElementById('v-search-clear');
    if (clearBtn) clearBtn.classList.toggle('hidden', !this.vendorSearchQuery);

    if (tbody) {
      const list = this.getFilteredVendors();
      const role = window.CMS_STORE.getRole();
      if (countEl) countEl.innerHTML = `Showing <strong class="text-slate-800">${list.length}</strong> of ${window.CMS_STORE.data.vendors.length} vendors`;
      tbody.innerHTML = this.renderVendorRows(list, role);
      if (window.lucide) window.lucide.createIcons();
    } else {
      const main = document.getElementById('view-container');
      if (main) {
        main.innerHTML = this.renderVendors();
        if (window.lucide) window.lucide.createIcons();
      }
    }
  },

  viewVendorProfile(vendorId) {
    const v = window.CMS_STORE.data.vendors.find(i => i.id === vendorId);
    if (!v) return;

    const role = window.CMS_STORE.getRole();
    const stateInfo = this.getStateInfo(v.addressState);

    // Helper to render inline document preview
    const renderDocPreview = (filename, title) => {
      if (!filename) return `<div class="text-[10px] text-slate-400 italic mb-4">No ${title} attached</div>`;
      // We assume images or pdfs. Base64 encoded.
      // Usually, CMS_FILE_ + filename contains the base64 Data URL.
      return `
        <div class="mt-2 mb-4 border border-slate-200 p-2 bg-slate-50">
          <div class="text-[10px] font-bold text-slate-600 mb-2">${title}: ${filename}</div>
          <div class="doc-preview-container" data-filename="${filename}">
            <div class="text-xs text-slate-400 italic">Loading preview...</div>
          </div>
        </div>
      `;
    };

    const content = `
      <div id="vendor-paper-form" class="space-y-4 text-xs bg-white p-6 border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0">
        
        <!-- Header -->
        <div class="text-center mb-6 border-b border-slate-800 pb-4">
          <h2 class="text-2xl font-bold uppercase tracking-widest text-slate-900">Vendor Registration Form</h2>
          <div class="text-sm font-mono text-slate-600 mt-1">ID: ${v.id} | Status: ${v.status}</div>
        </div>

        <div class="grid grid-cols-2 gap-x-8 gap-y-4">
          <div class="col-span-2">
            <h3 class="text-sm font-bold uppercase border-b border-slate-300 mb-2 text-slate-800">1. Organization Details</h3>
            <div class="grid grid-cols-2 gap-4">
              <div><span class="text-slate-500 block text-[10px] uppercase">Name</span> <strong class="text-base">${v.name}</strong></div>
              <div><span class="text-slate-500 block text-[10px] uppercase">Constitution</span> <strong>${v.constitution || 'Not Specified'}</strong></div>
              <div class="col-span-2"><span class="text-slate-500 block text-[10px] uppercase">Registered Address</span> <strong>${[v.address, v.addressTaluka, v.addressDistrict, v.addressState, v.addressCountry, v.addressPinCode].filter(Boolean).join(', ')}</strong></div>
              <div><span class="text-slate-500 block text-[10px] uppercase">Contact Phone</span> <strong>${(v.countryCode ? v.countryCode + ' ' : '') + (v.contactNo || '-')}</strong></div>
              <div><span class="text-slate-500 block text-[10px] uppercase">Email</span> <strong>${v.email || '-'}</strong></div>
            </div>
          </div>

          <div class="col-span-2 mt-4">
            <h3 class="text-sm font-bold uppercase border-b border-slate-300 mb-2 text-slate-800">2. Statutory Identifications</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="text-slate-500 block text-[10px] uppercase">GSTIN</span> 
                <strong class="font-mono text-sm">${v.gstNotApplicable ? 'Exempt' : (v.gstNo || 'Not Registered')}</strong>
                ${renderDocPreview(v.gstCertificateFile, v.gstDocTitle || 'GST Certificate')}
              </div>
              <div>
                <span class="text-slate-500 block text-[10px] uppercase">PAN</span> 
                <strong class="font-mono text-sm">${v.panNotApplicable ? 'Not Applicable' : (v.panNo || 'Not Recorded')}</strong>
                ${renderDocPreview(v.panCardFile, v.panDocTitle || 'PAN Card')}
              </div>
            </div>
          </div>

          <div class="col-span-2 mt-4">
            <h3 class="text-sm font-bold uppercase border-b border-slate-300 mb-2 text-slate-800">3. Bank Details</h3>
            <div class="grid grid-cols-2 gap-4">
              <div><span class="text-slate-500 block text-[10px] uppercase">Bank Name</span> <strong>${v.bankName || '-'}</strong></div>
              <div><span class="text-slate-500 block text-[10px] uppercase">Account Name</span> <strong>${v.accountName || '-'}</strong></div>
              <div><span class="text-slate-500 block text-[10px] uppercase">Account No</span> <strong class="font-mono">${v.accountNo || '-'}</strong></div>
              <div><span class="text-slate-500 block text-[10px] uppercase">IFSC Code</span> <strong class="font-mono">${v.ifscCode || '-'}</strong></div>
            </div>
            <div class="mt-2">
              ${renderDocPreview(v.bankDoc, v.bankDocTitle || 'Bank Document')}
            </div>
          </div>
          
          <div class="col-span-2 mt-4">
            <h3 class="text-sm font-bold uppercase border-b border-slate-300 mb-2 text-slate-800">4. Quotations</h3>
            ${(v.quotedItems && v.quotedItems.length > 0) ? v.quotedItems.map(q => `
              <div class="mb-4">
                <div><span class="text-slate-500 block text-[10px] uppercase">Quote Ref</span> <strong>${q.quotationNo || 'Direct'}</strong></div>
                <div><span class="text-slate-500 block text-[10px] uppercase">Material</span> <strong>${q.materialName || q.materialId || '-'}</strong></div>
                ${renderDocPreview(q.doc, q.docTitle || 'Quotation Document')}
              </div>
            `).join('') : (v.quotationDoc ? renderDocPreview(v.quotationDoc, v.quotationDocTitle || 'Quotation Document') : '<div class="text-slate-400 italic">No Quotations</div>')}
          </div>

          <div class="col-span-2 mt-4">
            <h3 class="text-sm font-bold uppercase border-b border-slate-300 mb-2 text-slate-800">5. Certificates</h3>
            ${(!v.certificates || v.certificates.length === 0) ? '<span class="text-slate-400 italic">No certificates recorded</span>' : v.certificates.map(c => `
              <div class="mb-4">
                <div><span class="text-slate-500 block text-[10px] uppercase">Certificate</span> <strong>${c.regulator || c.name || 'Certificate'} (${c.formNo || ''})</strong></div>
                ${renderDocPreview(c.fileName, c.docTitle || 'Certificate Document')}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pt-6 border-t border-slate-800 mt-8 text-center text-[10px] text-slate-500 print:block">
          Auto-generated by Consumable Management System on ${new Date().toLocaleString()}
        </div>
      </div>

      <div class="pt-3 border-t border-slate-200 flex flex-wrap justify-end gap-2 print:hidden mt-4">
        <button onclick="CMS_MASTERS.downloadVendorForm()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm shadow transition inline-flex items-center gap-1.5 text-xs">
          <i data-lucide="printer" class="w-4 h-4 text-white"></i>
          <span>Download Form (Print)</span>
        </button>
        ${(v.status === 'Pending Approval' || v.status === 'Revision Required') && role === 'Admin' ? `
          <button onclick="CMS_APP.closeModal(); CMS_MASTERS.openVendorRejectModal('${v.id}');" class="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold rounded-sm transition inline-flex items-center gap-1.5 text-xs">
            <i data-lucide="x-circle" class="w-4 h-4 text-rose-600"></i>
            <span>Reject / Return</span>
          </button>
          <button onclick="CMS_APP.closeModal(); CMS_MASTERS.openVendorSanctionModal('${v.id}');" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm shadow transition inline-flex items-center gap-1.5 text-xs">
            <i data-lucide="check-circle" class="w-4 h-4 text-white"></i>
            <span>Sanction / Approve</span>
          </button>
        ` : ''}
        <button onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-sm transition text-xs">
          Close
        </button>
      </div>
    `;

    window.CMS_APP.openModal('Vendor Profile & Statutory Inspection', content, 'max-w-4xl');
    
    // Process document previews
    setTimeout(() => {
      document.querySelectorAll('.doc-preview-container').forEach(container => {
        const filename = container.getAttribute('data-filename');
        if (!filename) return;
        const dataUrl = localStorage.getItem('CMS_FILE_' + filename);
        if (dataUrl) {
          if (dataUrl.startsWith('data:image') || dataUrl.match(/\.(png|jpg|jpeg|gif)$/i)) {
            container.innerHTML = `<img src="${dataUrl}" class="w-full max-w-lg mb-4 border border-slate-200 shadow-sm" alt="${filename}" />`;
          } else if (dataUrl.startsWith('data:application/pdf') || dataUrl.match(/\.pdf$/i) || dataUrl.includes('supabase')) {
            container.innerHTML = `<iframe src="${dataUrl}" class="w-full h-96 border border-slate-200 shadow-sm"></iframe>`;
          } else {
            container.innerHTML = `<div class="text-xs text-amber-600 italic">Unsupported document format. Cannot preview inline.</div>`;
          }
        } else {
          container.innerHTML = `<div class="text-xs text-slate-400 italic">Document data not found in local storage.</div>`;
        }
      });
    }, 100);

    if (window.lucide) window.lucide.createIcons();
  },

  toggleMrp(checkbox) {
    const row = checkbox.closest('.quote-row');
    if (!row) return;
    const mrpInput = row.querySelector('.q-mrp');
    if (checkbox.checked) {
      mrpInput.value = '';
      mrpInput.disabled = true;
      mrpInput.classList.add('bg-slate-100', 'cursor-not-allowed', 'opacity-50');
    } else {
      mrpInput.disabled = false;
      mrpInput.classList.remove('bg-slate-100', 'cursor-not-allowed', 'opacity-50');
    }
  },

  validateQuotationDates(element) {
    const row = element.closest('.quote-row');
    if (!row) return;
    const qDateInput = row.querySelector('.q-date');
    const qEffInput = row.querySelector('.q-eff');
    const qValidInput = row.querySelector('.q-valid');

    const qDate = qDateInput.value;
    const qEff = qEffInput.value;
    const qValid = qValidInput.value;
    const today = new Date().toISOString().split('T')[0];

    // Check 1: Quotation Date cannot be future
    if (qDate && qDate > today) {
      window.CMS_APP.toast('System does not allow future quotation dates.', 'error');
      qDateInput.value = '';
      return;
    }

    // Check 2: Effective date cannot be older than Quotation Date
    if (qEff && qDate && qEff < qDate) {
      window.CMS_APP.toast('Effective date cannot be older than the quotation date.', 'error');
      qEffInput.value = '';
      return;
    }

    // Check 3: Valid till cannot be older than effective date
    if (qValid && qEff && qValid < qEff) {
      window.CMS_APP.toast('Valid till/expiry date cannot be older than the effective date.', 'error');
      qValidInput.value = '';
      return;
    }
  },

  checkRateVsMrp(element) {
    const row = element.closest('.quote-row');
    if (!row) return;
    const rateInput = row.querySelector('.q-rate');
    const mrpInput = row.querySelector('.q-mrp');
    const mrpNa = row.querySelector('.q-mrp-na')?.checked;

    if (mrpNa) return; // Ignore validation if MRP is Not Applicable

    const rate = parseFloat(rateInput.value);
    const mrp = parseFloat(mrpInput.value);

    if (!isNaN(rate) && !isNaN(mrp) && rate > mrp) {
      window.CMS_APP.toast('Error: Approved Rate cannot be higher than MRP.', 'error');
      rateInput.value = '';
      rateInput.focus();
    }
  },

  downloadVendorForm() {
    // Hide standard elements and trigger print
    const originalTitle = document.title;
    document.title = 'Vendor_Registration_Form';
    window.print();
    document.title = originalTitle;
  },

  onGstInput(val) {
    const panInput = document.getElementById('v-pan');
    const gstNaCheckbox = document.getElementById('v-gst-na');
    const cleanGst = (val || '').trim().toUpperCase();

    // Blue Box lock: if GSTN is provided, do NOT check blue box
    if (gstNaCheckbox) {
      if (cleanGst.length > 0) {
        gstNaCheckbox.checked = false;
        gstNaCheckbox.disabled = true;
        this.toggleGstApplicable(false);
      } else {
        gstNaCheckbox.disabled = false;
      }
    }

    // Always update PAN dynamically from characters 3-12 of 15-digit GSTIN
    if (panInput && !panInput.disabled) {
      if (cleanGst.length >= 12) {
        panInput.value = cleanGst.substring(2, 12);
        panInput.dataset.autoFilled = 'true';
      } else if (panInput.dataset.autoFilled === 'true') {
        panInput.value = '';
      }
    }

    // Auto-detect Indian State from first 2 digits of GSTIN
    if (cleanGst.length >= 2) {
      const prefix = cleanGst.substring(0, 2);
      const matched = this.indianStates.find(s => s.code === prefix);
      if (matched) {
        const stateSelect = document.getElementById('v-state');
        if (stateSelect && (!stateSelect.value || stateSelect.dataset.autoDetected === 'true')) {
          stateSelect.value = matched.name;
          stateSelect.dataset.autoDetected = 'true';
          this.onStateChange(matched.name);
        }
      }
    }
  },

  onStateChange(stateName) {
    // Badges removed by request. Tax logic is still processed in background.
  },

  onCountryChange(countryName) {
      const ccInput = document.getElementById('v-country-code');
      const stateContainer = document.getElementById('v-state-container');
      const pinInput = document.getElementById('v-pin');
      const gstNa = document.getElementById('v-gst-na');
      const panNa = document.getElementById('v-pan-na');
      
      const c = this.countries.find(x => countryName.includes(x.name));
      if (ccInput && c) ccInput.value = c.code;

      const isIndia = countryName.includes('India');

      const talukaInput = document.getElementById('v-taluka');
      const districtInput = document.getElementById('v-district');
      
      if (talukaInput) {
        talukaInput.parentElement.style.display = isIndia ? 'block' : 'none';
        if (!isIndia) talukaInput.value = ''; // clear when hidden
      }
      
      if (districtInput) {
        const distLabel = districtInput.parentElement.querySelector('label');
        if (distLabel) {
           distLabel.innerHTML = isIndia ? 'District <span class="text-rose-600 font-bold">*</span>' : 'City / County <span class="text-rose-600 font-bold">*</span>';
        }
        districtInput.placeholder = isIndia ? 'District name' : 'City name';
      }

      if (stateContainer) {
        if (!isIndia) {
          stateContainer.innerHTML = `<input id="v-state" required placeholder="State / Province" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs" />`;
        } else {
          stateContainer.innerHTML = `<select id="v-state" required onchange="CMS_MASTERS.onStateChange(this.value)" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-xs">
              <option value="">-- Choose State / UT --</option>
              ${this.indianStates.map(s => `<option value="${s.name}">${s.code} - ${s.name}</option>`).join('')}
            </select>`;
        }
      }

      if (pinInput) {
        if (!isIndia) {
          pinInput.removeAttribute('pattern');
          pinInput.removeAttribute('maxlength');
          pinInput.placeholder = "ZIP / Postal Code";
        } else {
          pinInput.setAttribute('pattern', '[0-9]{6}');
          pinInput.setAttribute('maxlength', '6');
          pinInput.placeholder = "110020";
        }
      }

      if (!isIndia) {
        if (gstNa) { gstNa.checked = true; window.CMS_MASTERS.toggleGstApplicable(true); }
        if (panNa) { panNa.checked = true; window.CMS_MASTERS.togglePanApplicable(true); }
      }
    },

  // Sequence strictly arranged:
  // 1. Regulatory Agency -> 2. Form/Standard No. -> 3. License/Certificate No. -> 4. Validity/Expiry -> 5. Upload Copy
  
  addVendorQuotationRow(qData = null) {
    const container = document.getElementById('v-quotations-container');
    if (!container) return;
    const rowId = 'quote_row_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    
    const no = qData ? (qData.quotationNo || '') : '';
    const dt = qData ? (qData.quotationDate || '') : '';
    const exp = qData ? (qData.quotationValidTill || '') : '';
    const eff = qData ? (qData.effectiveFrom || '') : '';
    const matId = qData ? (qData.materialId || '') : '';
    const matName = qData ? (qData.materialName || '') : '';
    const rate = qData ? (qData.rate || '') : '';
    const mrp = qData ? (qData.mrp || '') : '';
    const unit = qData ? (qData.unit || 'Nos') : 'Nos';
    const hsn = qData ? (qData.hsn || '8472') : '8472';
    const doc = qData ? (qData.doc || '') : '';
      const today = new Date().toISOString().split('T')[0];
    
    const row = document.createElement('div');
    row.className = 'quote-row p-4 bg-white border border-slate-200 rounded-sm rounded-sm space-y-2.5 relative shadow-sm';
    row.innerHTML = `
      <button type="button" onclick="this.parentElement.remove()" class="absolute top-2 right-2 text-slate-400 hover:text-red-600 transition" title="Remove row"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 pr-6">
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Quotation Ref No</label>
          <input type="text" class="q-no w-full font-mono uppercase font-bold text-blue-600 px-2.5 py-1.5 border border-blue-300 rounded text-xs bg-white" value="${no}" placeholder="e.g. QT-101" />
        </div>
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Quotation Date</label>
          <input type="date" class="q-date w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${dt}" / max="\${today}">
        </div>
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Effective From</label>
          <input type="date" class="q-eff w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${qData ? (qData.effectiveFrom || '') : ''}" />
        </div>
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Valid Till / Expiry</label>
          <input type="date" class="q-exp w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${exp}" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
        <div class="sm:col-span-6">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">Select Existing Material</label>
          <select class="q-mat-id w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white" onchange="const o=this.options[this.selectedIndex]; if(!o.value)return; const r=this.closest('.quote-row'); r.querySelector('.q-mat-name').value=o.dataset.name; r.querySelector('.q-rate').value=o.dataset.rate; r.querySelector('.q-mrp').value=o.dataset.mrp; r.querySelector('.q-unit').value=o.dataset.unit; r.querySelector('.q-hsn').value=o.dataset.hsn;">
            <option value="">-- Choose Existing Material --</option>
            ${(window.CMS_STORE.data.consumables || []).map(m => `<option value="${m.id}" data-name="${m.materialName}" data-rate="${m.quotationRate || m.vendor1Rate || 0}" data-mrp="${m.mrpBooked || ''}" data-unit="${m.unit || 'Nos'}" data-hsn="${m.hsnCode || ''}" ${matId === m.id ? 'selected' : ''}>[${m.inventoryType || 'Consumer'}] ${m.materialName} - Code: ${m.id}</option>`).join('')}
          </select>
        </div>
        <div class="sm:col-span-6 flex flex-col justify-end">
          <input type="hidden" class="q-mat-name" value="${matName}" />
          <button type="button" onclick="CMS_MASTERS.openConsumableModal(null)" class="w-full px-2.5 py-1.5 bg-slate-50 border border-blue-300 rounded text-xs text-blue-600 font-bold hover:bg-slate-100 transition flex items-center justify-center gap-1.5">
            <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Add New Material
          </button>
        </div>
        <div class="sm:col-span-3">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">Approved Rate</label>
          <input type="number" step="0.01" class="q-rate w-full font-mono font-bold text-blue-600 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${rate}" placeholder="0.00" />
        </div>
        <div class="sm:col-span-3">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">MRP</label>
          <input type="number" step="0.01" class="q-mrp w-full font-mono font-bold text-emerald-900 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${mrp}" placeholder="0.00" />
        </div>
        <div class="sm:col-span-3">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">UOM</label>
          <input type="text" class="q-unit w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${unit}" placeholder="Nos, Rim, Box" />
        </div>
        <div class="sm:col-span-3">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">HSN / SAC</label>
          <input type="text" class="q-hsn w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${hsn}" placeholder="e.g. 4802" />
        </div>
      </div>
      <div>
        <label class="block font-bold text-slate-700 mb-1 text-[10px]">Upload Quotation Copy (PDF / Image)</label>
        <input type="file" class="q-file text-xs" accept=".pdf,image/*" />
        ${doc ? `<span class="block text-[10px] text-emerald-700 font-mono mt-0.5">Attached on record: ${doc}</span>` : ''}
      </div>
    `;
    container.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
  },
  addCertificateRow(certData = null) {
    const container = document.getElementById('v-cert-container');
    if (!container) return;
    const rowId = 'cert_row_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const regulator = certData ? (typeof certData === 'object' ? (certData.regulator || certData.name || '') : certData) : '';
    const hasValidity = certData ? (typeof certData === 'object' ? Boolean(certData.hasValidity) : false) : false;
    const validTill = certData && typeof certData === 'object' ? (certData.validTill || '') : '';
    const formNo = certData && typeof certData === 'object' ? (certData.formNo || '') : '';
    const certificateNo = certData && typeof certData === 'object' ? (certData.certificateNo || '') : '';
    const fileName = certData && typeof certData === 'object' ? (certData.fileName || '') : '';
    const today = new Date().toISOString().split('T')[0];

    // FORCE HTML5 FORM VALIDATION ACROSS ALL HIDDEN TABS
    const form = document.getElementById('vendor-form');
    if (form && !form.checkValidity()) {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) {
        const stepDiv = firstInvalid.closest('div[id^="v-step-"]');
        if (stepDiv) {
          const stepNum = parseInt(stepDiv.id.replace('v-step-', ''));
          if (!isNaN(stepNum)) {
            this.changeVendorStep(stepNum);
          }
        }
        setTimeout(() => firstInvalid.reportValidity(), 50);
      }
      return;
    }

    const regulators = ['BIS', 'CDSCO', 'FDA', 'FSSAI', 'GMP Certificate', 'ISO', 'NABL', 'State FDA', 'Other'];

    const row = document.createElement('div');
    row.className = 'cert-row p-3.5 bg-slate-50 border border-slate-200 rounded-sm space-y-3 transition';
    row.id = rowId;
    row.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
          <!-- 1. Agency -->
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">
              1. Regulator / Agency
            </label>
            ${(() => {
                const isCustom = regulator && !regulators.includes(regulator);
                return `
                  <select class="cert-regulator-select w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs font-medium" onchange="CMS_MASTERS.onRegulatorChange('${rowId}', this.value)">
                    <option value="">-- Choose Agency --</option>
                    ${regulators.map(r => `<option value="${r}" ${regulator === r || (isCustom && r === 'Other') ? 'selected' : ''}>${r}</option>`).join('')}
                  </select>
                  <input type="text" class="cert-regulator-other-input ${isCustom ? '' : 'hidden'} mt-2 w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs" value="${isCustom ? regulator : ''}" placeholder="Specify Agency Name" />
                `;
              })()}
          </div>
          <!-- 2. Form No -->
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">2. Form / Standard No.</label>
            <input type="text" autocomplete="off" class="cert-form-input w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs font-mono" value="${formNo}" placeholder="e.g. 9001:2015" />
          </div>
          <!-- 3. License No -->
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">
              3. License / Certificate No.
            </label>
            <input type="text" autocomplete="off" class="cert-number-input w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs font-mono" value="${certificateNo}" placeholder="e.g. LIC-2026-981" />
          </div>
        </div>
        <button type="button" onclick="CMS_MASTERS.removeCertificateRow('${rowId}')" class="mt-5 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition" title="Remove Certificate">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>

      <!-- 4. Validity & 5. Upload Copy -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80 text-xs items-center">
        <!-- 4. Validity/Expiry -->
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="font-bold text-slate-700 text-[11px]">4. Valid Till / Expiry Date (Yes/No)?</span>
            <div class="inline-flex items-center gap-2 bg-white px-2 py-0.5 rounded border border-slate-200">
              <label class="inline-flex items-center gap-1 cursor-pointer font-medium text-slate-700">
                <input type="radio" name="valid_opt_${rowId}" value="yes" ${hasValidity ? 'checked' : ''} onchange="CMS_MASTERS.onCertValidityChange('${rowId}', true)" class="text-blue-600" />
                <span>Yes</span>
              </label>
              <label class="inline-flex items-center gap-1 cursor-pointer font-medium text-slate-700">
                <input type="radio" name="valid_opt_${rowId}" value="no" ${!hasValidity ? 'checked' : ''} onchange="CMS_MASTERS.onCertValidityChange('${rowId}', false)" class="text-blue-600" />
                <span>No</span>
              </label>
            </div>
          </div>
          <div id="expiry_box_${rowId}" class="cert-expiry-box ${hasValidity ? '' : 'hidden'}">
            <div class="flex items-center gap-2 bg-slate-50/70 border border-slate-200 p-1.5 rounded-sm">
              <label class="text-[11px] font-bold text-blue-600 shrink-0">Expiry Date *:</label>
              <input type="date" min="${today}" class="cert-expiry-input w-full px-2 py-1 border border-blue-300 rounded bg-white text-xs font-mono" value="${validTill}" />
            </div>
          </div>
        </div>

        <!-- 5. Upload File Copy -->
        <div>
          <label class="block text-[11px] font-bold text-slate-700 mb-1">
            5. Upload Certificate Copy (PDF/Image) <span class="text-rose-600 font-bold">*</span>
          </label>
          <div class="flex items-center gap-2">
            <input type="file" accept=".pdf,image/*" class="cert-file-input text-[11px]" data-current="${fileName}" />
            ${fileName ? `<span class="text-[10px] text-emerald-700 font-mono truncate max-w-[120px]" title="${fileName}">${fileName}</span>` : ''}
          </div>
        </div>
      </div>
    `;
    container.appendChild(row);
    if (window.lucide) window.lucide.createIcons();
  },

  onRegulatorChange(rowId, val) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const otherInput = row.querySelector('.cert-regulator-other-input');
    if (otherInput) {
      if (val === 'Other') {
        otherInput.classList.remove('hidden');
        otherInput.focus();
      } else {
        otherInput.classList.add('hidden');
      }
    }
    const formInput = row.querySelector('.cert-form-input');
    if (formInput && val === 'ISO' && !formInput.value) {
      formInput.value = '9001:2015';
    }
  },

  onCertValidityChange(rowId, isYes) {
    const box = document.getElementById('expiry_box_' + rowId);
    if (!box) return;
    if (isYes) {
      box.classList.remove('hidden');
      const input = box.querySelector('.cert-expiry-input');
      if (input) input.focus();
    } else {
      box.classList.add('hidden');
      const input = box.querySelector('.cert-expiry-input');
      if (input) input.value = '';
    }
  },

  removeCertificateRow(rowId) {
    const row = document.getElementById(rowId);
    if (row) row.remove();
  },

  onVendorQuotedMaterialChange(matId) {
    if (!matId) return;
    const mat = window.CMS_STORE.data.consumables.find(m => m.id === matId);
    if (!mat) return;
    const nameEl = document.getElementById('v-quote-mat-name');
    if (nameEl) nameEl.value = mat.materialName;
    const rateEl = document.getElementById('v-quote-rate');
    if (rateEl) rateEl.value = mat.quotationRate || mat.vendor1Rate || '';
    const unitEl = document.getElementById('v-quote-unit');
    if (unitEl) unitEl.value = mat.unit || 'Nos';
    const hsnEl = document.getElementById('v-quote-hsn');
    if (hsnEl) hsnEl.value = mat.hsnCode || '';
    const quoteNoEl = document.getElementById('v-quote-no');
    if (quoteNoEl && (!quoteNoEl.value || quoteNoEl.value === '')) {
      quoteNoEl.value = mat.quotationNo || '';
    }
    const quoteDateEl = document.getElementById('v-quote-date');
    if (quoteDateEl && (!quoteDateEl.value || quoteDateEl.value === '')) {
      quoteDateEl.value = mat.quotationDate || '';
    }
  },

  onVendorQuoteNoInput(val) {
    if (!val || val.length < 3) return;
    const clean = val.trim().toUpperCase();
    const mat = window.CMS_STORE.data.consumables.find(m => m.quotationNo && m.quotationNo.toUpperCase() === clean);
    if (mat) {
      const select = document.getElementById('v-quote-mat-select');
      if (select) select.value = mat.id;
      this.onVendorQuotedMaterialChange(mat.id);
    }
  },

  onMaterialQuoteNoInput(val) {
    if (!val || val.length < 3) return;
    const clean = val.trim().toUpperCase();
    const vendor = window.CMS_STORE.data.vendors.find(v => v.quotationNo && v.quotationNo.toUpperCase() === clean);
    if (vendor) {
      const vSelect = document.getElementById('m-v1');
      if (vSelect) vSelect.value = vendor.id;
      const qDate = document.getElementById('m-quote-date');
      if (qDate && vendor.quotationDate) qDate.value = vendor.quotationDate;
      const qRate = document.getElementById('m-quote-rate');
      if (qRate && vendor.quotedMaterialRate > 0 && (!qRate.value || parseFloat(qRate.value) === 0)) {
        qRate.value = vendor.quotedMaterialRate;
        const v1Rate = document.getElementById('m-v1-rate');
        if (v1Rate) v1Rate.value = vendor.quotedMaterialRate;
      }
    }
  },

  onMaterialVendorChange(vendorId) {
    if (!vendorId) return;
    const vendor = window.CMS_STORE.data.vendors.find(v => v.id === vendorId);
    if (vendor && vendor.quotationNo) {
      const qNo = document.getElementById('m-quote-no');
      if (qNo && (!qNo.value || qNo.value === '')) qNo.value = vendor.quotationNo;
      const qDate = document.getElementById('m-quote-date');
      if (qDate && (!qDate.value || qDate.value === '')) qDate.value = vendor.quotationDate || '';
      const qRate = document.getElementById('m-quote-rate');
      if (qRate && vendor.quotedMaterialRate > 0 && (!qRate.value || parseFloat(qRate.value) === 0)) {
        qRate.value = vendor.quotedMaterialRate;
        const v1Rate = document.getElementById('m-v1-rate');
        if (v1Rate) v1Rate.value = vendor.quotedMaterialRate;
      }
    }
  },

  addMaterialVendorRow(vData = null, forcePrimary = false) {
    const container = document.getElementById('m-vendor-container');
    if (!container) return;

    const rowId = 'mat_v_row_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const store = window.CMS_STORE.data;
    const vendors = (store.vendors || []).filter(v => v.status === "Approved" && !v.isBlocked);
    const today = new Date().toISOString().split('T')[0];

    const currentRows = container.querySelectorAll('.mat-vendor-row');
    const rowNumber = currentRows.length + 1;
    const isPrimary = forcePrimary || (currentRows.length === 0);

    const vendorId = vData ? (vData.vendorId || '') : '';
    const quotationNo = vData ? (vData.quotationNo || '') : '';
    const quotationDate = vData ? (vData.quotationDate || today) : today;
    const rate = vData ? (vData.rate ?? vData.vendor1Rate ?? '') : '';
    const effectiveFrom = vData ? (vData.effectiveFrom ?? vData.vendor1RateEffectiveFrom ?? today) : today;

    const row = document.createElement('div');
    row.id = rowId;
    row.className = `mat-vendor-row p-3.5 bg-slate-50 border ${isPrimary ? 'border-blue-300 bg-slate-50/30' : 'border-slate-200'} rounded-sm space-y-2.5 transition`;
    row.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-slate-200">
        <div class="flex items-center gap-2">
          <span class="mat-v-num w-5 h-5 rounded-sm ${isPrimary ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-700'} font-bold text-[10px] flex items-center justify-center">
            ${rowNumber}
          </span>
          <span class="mat-v-title font-bold text-slate-800 text-xs">
            ${isPrimary ? `Vendor ${rowNumber} (Primary Approved Vendor)` : `Vendor ${rowNumber} (Alternate Source)`}
          </span>
          <div class="mat-v-badge-container inline-block">
            ${isPrimary ? '<span class="text-[9.5px] font-bold text-blue-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">PRIMARY SOURCE</span>' : ''}
          </div>
        </div>
        <div>
          <button type="button" onclick="CMS_MASTERS.removeMaterialVendorRow('${rowId}')" class="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition" title="Remove this Vendor">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <label class="block font-semibold text-slate-700 mb-1">
            Vendor / Supplier <span class="text-rose-500">*</span>
          </label>
          <select class="mat-v-select w-full px-3 py-2 text-xs border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white focus:ring-2 focus:ring-slate-500 focus:outline-none font-medium" onchange="CMS_MASTERS.onMaterialRowVendorChange('${rowId}', this.value)" required>
            <option value="">-- Choose Vendor --</option>
            ${vendors.map(v => `<option value="${v.id}" ${vendorId === v.id ? 'selected' : ''}>${v.name}</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">
            Quotation Number <span class="text-rose-500">*</span>
          </label>
          <input type="text" class="mat-v-quote-no w-full font-mono uppercase font-bold text-blue-600 px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" value="${quotationNo}" placeholder="e.g. QT-2026-881" oninput="this.value = this.value.toUpperCase(); CMS_MASTERS.onMaterialRowQuoteNoInput('${rowId}', this.value);" required />
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Quotation Date</label>
          <input type="date" class="mat-v-quote-date w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs font-mono" value="${quotationDate}" />
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">
            Quotation Rate (₹) <span class="text-rose-500">*</span>
          </label>
          <input type="number" step="0.01" class="mat-v-rate w-full font-mono font-bold px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-blue-600 text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" value="${rate}" placeholder="0.00" required />
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Rate Effective From Date</label>
          <input type="date" class="mat-v-eff-date w-full px-3 py-2 text-xs border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-mono" value="${effectiveFrom}" />
        </div>

        <div class="flex items-end pb-1">
          <label class="inline-flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700">
            <input type="radio" name="mat-primary-vendor-radio" value="${rowId}" ${isPrimary ? 'checked' : ''} onchange="CMS_MASTERS.setPrimaryMaterialVendor('${rowId}')" class="w-4 h-4 text-blue-600 focus:ring-slate-500" />
            <span>Mark as Preferred Source</span>
          </label>
        </div>
      </div>
    `;

    container.appendChild(row);
    this.renumberMaterialVendorRows();
    if (window.lucide) window.lucide.createIcons();
  },

  removeMaterialVendorRow(rowId) {
    const container = document.getElementById('m-vendor-container');
    if (!container) return;
    const rows = container.querySelectorAll('.mat-vendor-row');
    if (rows.length <= 1) {
      window.CMS_APP.toast('At least one vendor quotation is required for procurement cataloging.', 'warning');
      return;
    }
    const row = document.getElementById(rowId);
    if (!row) return;
    const wasPrimary = Boolean(row.querySelector('input[type="radio"]:checked'));
    row.remove();
    if (wasPrimary) {
      const remaining = container.querySelector('.mat-vendor-row');
      if (remaining) {
        const radio = remaining.querySelector('input[name="mat-primary-vendor-radio"]');
        if (radio) radio.checked = true;
      }
    }
    this.renumberMaterialVendorRows();
  },

  renumberMaterialVendorRows() {
    const container = document.getElementById('m-vendor-container');
    if (!container) return;
    const rows = container.querySelectorAll('.mat-vendor-row');
    let hasPrimaryChecked = false;
    rows.forEach(r => {
      if (r.querySelector('input[name="mat-primary-vendor-radio"]:checked')) {
        hasPrimaryChecked = true;
      }
    });

    // If no radio is checked, set the first row as primary
    if (!hasPrimaryChecked && rows.length > 0) {
      const firstRadio = rows[0].querySelector('input[name="mat-primary-vendor-radio"]');
      if (firstRadio) firstRadio.checked = true;
    }

    rows.forEach((r, idx) => {
      const num = idx + 1;
      const numBadge = r.querySelector('.mat-v-num');
      const title = r.querySelector('.mat-v-title');
      const badgeContainer = r.querySelector('.mat-v-badge-container');
      const isPrimary = Boolean(r.querySelector('input[name="mat-primary-vendor-radio"]:checked'));

      if (numBadge) {
        numBadge.innerText = String(num);
        numBadge.className = `mat-v-num w-5 h-5 rounded-sm ${isPrimary ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-700'} font-bold text-[10px] flex items-center justify-center`;
      }
      if (title) {
        title.innerText = isPrimary ? `Vendor ${num} (Primary Approved Vendor)` : `Vendor ${num} (Alternate Source)`;
      }
      if (badgeContainer) {
        badgeContainer.innerHTML = isPrimary ? '<span class="text-[9.5px] font-bold text-blue-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">PRIMARY SOURCE</span>' : '';
      }
      if (isPrimary) {
        r.classList.add('border-blue-300', 'bg-slate-50/30');
        r.classList.remove('border-slate-200');
      } else {
        r.classList.remove('border-blue-300', 'bg-slate-50/30');
        r.classList.add('border-slate-200');
      }
    });
  },

  setPrimaryMaterialVendor(rowId) {
    const container = document.getElementById('m-vendor-container');
    if (!container) return;
    const rows = container.querySelectorAll('.mat-vendor-row');
    rows.forEach(r => {
      const radio = r.querySelector('input[name="mat-primary-vendor-radio"]');
      if (radio) radio.checked = (r.id === rowId);
    });
    this.renumberMaterialVendorRows();
  },

  onMaterialRowVendorChange(rowId, vendorId) {
    if (!vendorId) return;
    const row = document.getElementById(rowId);
    if (!row) return;
    const vendor = window.CMS_STORE.data.vendors.find(v => v.id === vendorId);
    if (vendor && vendor.quotationNo) {
      const qNoInput = row.querySelector('.mat-v-quote-no');
      if (qNoInput && (!qNoInput.value || qNoInput.value === '')) qNoInput.value = vendor.quotationNo;
      const qDateInput = row.querySelector('.mat-v-quote-date');
      if (qDateInput && (!qDateInput.value || qDateInput.value === '')) qDateInput.value = vendor.quotationDate || '';
      const qRateInput = row.querySelector('.mat-v-rate');
      if (qRateInput && vendor.quotedMaterialRate > 0 && (!qRateInput.value || parseFloat(qRateInput.value) === 0)) {
        qRateInput.value = vendor.quotedMaterialRate;
      }
    }
  },

  onMaterialRowQuoteNoInput(rowId, val) {
    if (!val || val.length < 3) return;
    const clean = val.trim().toUpperCase();
    const row = document.getElementById(rowId);
    if (!row) return;
    const vendor = window.CMS_STORE.data.vendors.find(v => v.quotationNo && v.quotationNo.toUpperCase() === clean);
    if (vendor) {
      const vSelect = row.querySelector('.mat-v-select');
      if (vSelect) vSelect.value = vendor.id;
      const qDate = row.querySelector('.mat-v-quote-date');
      if (qDate && vendor.quotationDate) qDate.value = vendor.quotationDate;
      const qRate = row.querySelector('.mat-v-rate');
      if (qRate && vendor.quotedMaterialRate > 0 && (!qRate.value || parseFloat(qRate.value) === 0)) {
        qRate.value = vendor.quotedMaterialRate;
      }
    }
  },

  openVendorModal(vendorId = null) {
    const role = window.CMS_STORE.getRole();
    if (role === 'Admin') {
      return window.CMS_APP.toast('Col. Anita Sharma (Admin) is authorized for review and approval only. Vendor registration must be initiated by User.', 'warning');
    }
    const isEdit = Boolean(vendorId);
    const vendor = isEdit ? window.CMS_STORE.data.vendors.find(v => v.id === vendorId) : {
      name: '', address: '', addressTaluka: '', addressDistrict: '', addressState: 'Delhi', addressCountry: 'India', addressPinCode: '',
      gstNo: '', panNo: '', gstNotApplicable: false, panNotApplicable: false, certificates: [], contactNo: '', email: '',
      certificateFile: '', gstCertificateFile: '', panCardFile: '', approvedForLimitedPeriod: false, approvalValidTill: '',
      bankName: '', accountNo: '', accountName: '', ifscCode: '', branchName: '', isBlocked: false, blockReason: '',
      quotationNo: '', quotationDate: '', quotationValidTill: '', quotationDoc: '',
      quotedMaterialId: '', quotedMaterialName: '', quotedMaterialRate: '', quotedMaterialUnit: 'Nos', quotedMaterialHsn: '8472'
    };

    const initialPan = vendor.panNo || (vendor.gstNo && vendor.gstNo.length >= 12 ? vendor.gstNo.substring(2, 12).toUpperCase() : '');
    const today = new Date().toISOString().split('T')[0];
    const initialInfo = this.getStateInfo(vendor.addressState || 'Delhi');
      
      setTimeout(() => {
        if (document.getElementById('v-country')) {
          CMS_MASTERS.onCountryChange(document.getElementById('v-country').value);
        }
      }, 50);

    // Global step state for this modal
    window.CMS_MASTERS.currentVendorStep = 1;

    // Attach step functions
    window.CMS_MASTERS.switchVendorTab = function(step) {
      for (let i = 1; i <= 4; i++) {
        const tab = document.getElementById('v-step-' + i);
        const btn = document.getElementById('v-tab-btn-' + i);
        if (tab) tab.classList.toggle('hidden', i !== step);
        if (btn) {
          if (i === step) {
            btn.classList.add('text-blue-600', 'border-blue-600', 'bg-blue-50');
            btn.classList.remove('text-slate-500', 'border-transparent', 'bg-slate-50');
          } else {
            btn.classList.remove('text-blue-600', 'border-blue-600', 'bg-blue-50');
            btn.classList.add('text-slate-500', 'border-transparent', 'bg-slate-50');
          }
        }
      }
      
      const prevBtn = document.getElementById('v-prev-btn');
      const nextBtn = document.getElementById('v-next-btn');
      const submitBtn = document.getElementById('v-submit-btn');
      
      if (prevBtn) prevBtn.classList.toggle('hidden', step === 1);
      if (nextBtn) nextBtn.classList.toggle('hidden', step === 4);
      if (submitBtn) submitBtn.classList.toggle('hidden', step !== 4);
      
      window.CMS_MASTERS.currentVendorStep = step;
    };

    window.CMS_MASTERS.nextVendorTab = function() {
      // Only validate the CURRENT visible step to avoid hidden required fields blocking the Next button
      const currentStepDiv = document.getElementById('v-step-' + window.CMS_MASTERS.currentVendorStep);
      if (currentStepDiv) {
        const inputs = currentStepDiv.querySelectorAll('input, select, textarea');
        for (const input of inputs) {
          if (!input.checkValidity()) {
            input.reportValidity();
            return; // Stop and let browser show the tooltip on this specific invalid field
          }
        }
      }

      if (window.CMS_MASTERS.currentVendorStep < 4) {
        window.CMS_MASTERS.switchVendorTab(window.CMS_MASTERS.currentVendorStep + 1);
      }
    };

    window.CMS_MASTERS.prevVendorTab = function() {
      if (window.CMS_MASTERS.currentVendorStep > 1) {
        window.CMS_MASTERS.switchVendorTab(window.CMS_MASTERS.currentVendorStep - 1);
      }
    };

    const content = `
      <div class="flex border-b border-slate-200 mb-4 overflow-x-auto whitespace-nowrap">
        <button id="v-tab-btn-1" type="button" class="flex-1 px-4 py-2 text-xs font-bold text-blue-600 border-b-2 border-blue-600 bg-blue-50 hover:bg-blue-100 transition" onclick="CMS_MASTERS.switchVendorTab(1)">1. Organization</button>
        <button id="v-tab-btn-2" type="button" class="flex-1 px-4 py-2 text-xs font-bold text-slate-500 border-b-2 border-transparent bg-slate-50 hover:bg-slate-100 transition" onclick="CMS_MASTERS.switchVendorTab(2)">2. Statutory & Certs</button>
        <button id="v-tab-btn-3" type="button" class="flex-1 px-4 py-2 text-xs font-bold text-slate-500 border-b-2 border-transparent bg-slate-50 hover:bg-slate-100 transition" onclick="CMS_MASTERS.switchVendorTab(3)">3. Commercials</button>
        <button id="v-tab-btn-4" type="button" class="flex-1 px-4 py-2 text-xs font-bold text-slate-500 border-b-2 border-transparent bg-slate-50 hover:bg-slate-100 transition" onclick="CMS_MASTERS.switchVendorTab(4)">4. Bank Details</button>
      </div>

      <form id="vendor-form" autocomplete="new-password" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_MASTERS.saveVendor('${vendorId || ''}');">
        
        <!-- STEP 1: Organization & Address -->
        <div id="v-step-1" class="space-y-4">
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
            <div class="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="building" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>1. Organization & Business Address</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="md:col-span-1">
                  <label class="block font-bold text-slate-700 mb-1">Constitution Type <span class="text-rose-600 font-bold">*</span></label>
                  <select id="v-constitution" required class="w-full px-3.5 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-sm">
                    <option value="">-- Select Constitution --</option>
                    ${['Proprietorship', 'Partnership', 'Limited Liability Partnership (LLP)', 'Private Limited Company', 'Public Limited Company', 'HUF', 'Trust / Society / NGO', 'Government Entity', 'Others'].map(c => `<option value="${c}" ${vendor.constitution === c ? 'selected' : ''}>${c}</option>`).join('')}
                  </select>
                </div>
                <div class="md:col-span-1">
                  <label class="block font-bold text-slate-700 mb-1">Vendor / Supplier Company Name <span class="text-rose-600 font-bold">*</span></label>
                  <input type="text" id="v-name" required value="${vendor.name || ''}" class="w-full px-3.5 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" placeholder="e.g. Apex Office Supplies Pvt Ltd" />
                </div>
                <div class="md:col-span-2">
                  <label class="block font-bold text-slate-700 mb-1">Nationality / Country of Vendor <span class="text-rose-600 font-bold">*</span></label>
                  <select id="v-country" required onchange="CMS_MASTERS.onCountryChange(this.value)" class="w-full px-3.5 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm bg-white">
                    ${this.countries.map(c => `<option value="${c.name}" ${(vendor.addressCountry || 'India').includes(c.name) ? 'selected' : ''}>${c.flag} ${c.name}</option>`).join('')}
                  </select>
                </div>
              <div class="md:col-span-2">
                <label class="block font-bold text-slate-700 mb-1">Street / Building Address <span class="text-rose-600 font-bold">*</span></label>
                <input id="v-address" required value="${vendor.address || ''}" class="w-full px-3.5 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Plot / Flat / Street / Area" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Taluka / Tehsil</label>
                <input id="v-taluka" value="${vendor.addressTaluka || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Taluka name" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">District <span class="text-rose-600 font-bold">*</span></label>
                <input id="v-district" required value="${vendor.addressDistrict || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="District name" />
              </div>
              <div>
                  <label class="block font-bold text-slate-700 mb-1">State / Province <span class="text-rose-600 font-bold">*</span></label>
                  <div id="v-state-container">
                    ${!(vendor.addressCountry || 'India').includes('India') ? 
                      `<input id="v-state" required value="${vendor.addressState || ''}" placeholder="State / Province" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />` 
                    : 
                      `<select id="v-state" required onchange="CMS_MASTERS.onStateChange(this.value)" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium">
                        <option value="">-- Choose State / UT --</option>
                        ${this.indianStates.map(s => '<option value="' + s.name + '" ' + ((vendor.addressState || 'Delhi') === s.name ? 'selected' : '') + '>' + s.code + ' - ' + s.name + '</option>').join('')}
                      </select>`
                    }
                  </div>
                </div>
                            <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-10 gap-3">
                  <div class="md:col-span-2">
                    <label class="block font-bold text-slate-700 mb-1">PIN Code (6 Digits) <span class="text-rose-600 font-bold">*</span></label>
                    <input id="v-pin" required maxlength="6" pattern="[0-9]{6}" value="${vendor.addressPinCode || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="110020" />
                  </div>
                  <div class="md:col-span-4">
                    <label class="block font-bold text-slate-700 mb-1">Phone Number <span class="text-rose-600 font-bold">*</span></label>
                    <div class="flex items-stretch border border-slate-300 rounded-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 shadow-sm w-full bg-white">
                      <input type="text" id="v-country-code" list="country-codes-list" value="${vendor.countryCode || '+91'}" class="w-[80px] px-2 py-2 bg-slate-50 border-r border-slate-300 text-slate-700 font-mono text-xs focus:outline-none" placeholder="+91" />
                        <datalist id="country-codes-list">
                          ${this.countries.map(c => `<option value="${c.code}">${c.name}</option>`).join('')}
                        </datalist>
                      <input type="tel" id="v-contact" required maxlength="10" pattern="[0-9]{10}" value="${vendor.contactNo || ''}" class="flex-1 min-w-0 px-3 py-2 font-mono text-sm border-none focus:ring-0 focus:outline-none bg-transparent" placeholder="10-digit number" />
                    </div>
                  </div>
                  <div class="md:col-span-4">
                    <label class="block font-bold text-slate-700 mb-1">Email Address <span class="text-rose-600 font-bold">*</span></label>
                    <input type="email" id="v-email" required value="${vendor.email || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="vendor@..." />
                  </div>
                </div>
            </div>
          </div>
        </div>

        <!-- STEP 2: Statutory & Certs -->
        <div id="v-step-2" class="space-y-4 hidden">
          <!-- 2. GST & PAN Statutory Section -->
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
            <div class="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Statutory GSTIN & PAN Identification</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">
                  GSTIN Number (15 Characters) <span class="text-rose-600 font-bold">*</span>
                </label>
                <input type="text" id="v-gst" ${vendor.gstNotApplicable ? 'disabled' : ''} maxlength="15" value="${vendor.gstNo || ''}" oninput="this.value = this.value.toUpperCase(); CMS_MASTERS.onGstInput(this.value);" class="w-full font-mono uppercase px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-bold text-blue-600" placeholder="15-digit GSTIN (e.g. 07AABCA1234F1Z5)" />
                
                <label class="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-slate-700 cursor-pointer">
                  <input type="checkbox" id="v-gst-na" ${vendor.gstNotApplicable ? 'checked' : ''} onchange="CMS_MASTERS.toggleGstApplicable(this.checked)" class="text-blue-600 rounded border-blue-400" />
                  <span class="font-semibold text-blue-600">GST registration is not applicable for this vendor (Exempt)</span>
                </label>

                <div id="v-gst-file-box" class="${vendor.gstNotApplicable ? 'hidden' : ''} mt-2">
                  <label class="block font-bold text-slate-700 mb-1 text-[11px]">
                    Upload GST Certificate (PDF/Image) <span class="text-rose-600 font-bold">*</span>
                  </label>
                  <input type="file" id="v-gst-file" accept=".pdf,image/*" class="text-xs" />
                  <input type="text" id="v-gst-title" placeholder="Document Title (e.g. GST Registration 2024)" class="w-full mt-1.5 px-2 py-1 text-xs border border-slate-300 rounded" value="${vendor.gstDocTitle || ''}" />
                  ${vendor.gstCertificateFile ? `<span class="block text-[10px] text-emerald-700 font-mono mt-0.5">On Record: ${vendor.gstCertificateFile}</span>` : ''}
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">
                  PAN Card Number (10 Characters) <span class="text-rose-600 font-bold">*</span>
                </label>
                <input type="text" id="v-pan" ${vendor.panNotApplicable ? 'disabled' : ''} maxlength="10" value="${initialPan}" oninput="this.value = this.value.toUpperCase(); this.dataset.autoFilled = 'false';" class="w-full font-mono uppercase px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-bold text-indigo-900" placeholder="10-character PAN (e.g. AABCA1234F)" />
                
                <label class="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-slate-700 cursor-pointer">
                  <input type="checkbox" id="v-pan-na" ${vendor.panNotApplicable ? 'checked' : ''} onchange="CMS_MASTERS.togglePanApplicable(this.checked)" class="text-blue-600 rounded border-blue-400" />
                  <span class="font-semibold text-blue-600">PAN card is not applicable for this vendor</span>
                </label>

                <div id="v-pan-file-box" class="${vendor.panNotApplicable ? 'hidden' : ''} mt-2">
                  <label class="block font-bold text-slate-700 mb-1 text-[11px]">
                    Upload PAN Card Copy (PDF/Image) <span class="text-rose-600 font-bold">*</span>
                  </label>
                  <input type="file" id="v-pan-file" accept=".pdf,image/*" class="text-xs" />
                  <input type="text" id="v-pan-title" placeholder="Document Title" class="w-full mt-1.5 px-2 py-1 text-xs border border-slate-300 rounded" value="${vendor.panDocTitle || ''}" />
                  ${vendor.panCardFile ? `<span class="block text-[10px] text-emerald-700 font-mono mt-0.5">On Record: ${vendor.panCardFile}</span>` : ''}
                </div>
              </div>
            </div>
          </div>

          <!-- Dynamic Regulatory Certificates Builder -->
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <i data-lucide="award" class="w-3.5 h-3.5 text-blue-600"></i>
                  <span>Regulatory Licenses/Certification</span>
                </div>
              </div>
              <button type="button" onclick="CMS_MASTERS.addCertificateRow()" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-blue-600 border border-blue-300 rounded-sm font-bold text-xs transition">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>+ Add Certificate</span>
              </button>
            </div>



            <div id="v-cert-container" class="space-y-2.5">
              <!-- Dynamic rows -->
            </div>
          </div>
        </div>

        <!-- STEP 3: Commercials & Approval -->
        <div id="v-step-3" class="space-y-4 hidden">
          <!-- Commercial Quotations & Approved Materials -->
          <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-sm space-y-3.5 shadow-sm">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200">
              <div class="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="file-spreadsheet" class="w-4 h-4 text-blue-600"></i>
                <span>Commercial Quotations & Approved Materials</span>
              </div>
              <button type="button" onclick="CMS_MASTERS.addVendorQuotationRow()" class="px-2.5 py-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-900 text-white rounded shadow transition flex items-center gap-1">
                <i data-lucide="plus" class="w-3 h-3"></i> Add Quotation
              </button>
            </div>
            <div id="v-quotations-container" class="space-y-3">
              <!-- Rendered via JS -->
            </div>
          </div>

          <!-- Limited Period Approval & Blacklist Section -->
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="inline-flex items-center gap-2 font-bold cursor-pointer text-slate-800">
                  <input type="checkbox" id="v-limited" ${vendor.approvedForLimitedPeriod ? 'checked' : ''} onchange="document.getElementById('v-limited-date-box').classList.toggle('hidden', !this.checked)" class="text-blue-600 rounded" />
                  <span>Vendor is approved for limited period.</span>
                </label>
                <div id="v-limited-date-box" class="${vendor.approvedForLimitedPeriod ? '' : 'hidden'} mt-2">
                  <label class="block text-[11px] font-bold text-slate-700 mb-1">Approval Valid Till / Expiry Date * (No past dates)</label>
                  <input type="date" id="v-approval-valid-till" min="${today}" value="${vendor.approvalValidTill || ''}" class="w-full px-3 py-1.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-mono" />
                </div>
              </div>

                ${(vendor.id && (vendor.status === 'Approved' || vendor.status === 'Blocked')) ? `
                <div>
                  <label class="inline-flex items-center gap-2 font-bold cursor-pointer text-rose-800">
                    <input type="checkbox" id="v-blocked" ${vendor.isBlocked ? 'checked' : ''} onchange="document.getElementById('v-block-reason-box').classList.toggle('hidden', !this.checked)" class="text-rose-600 rounded" />
                    <span>Blacklist / Block this Vendor</span>
                  </label>
                  <div id="v-block-reason-box" class="${vendor.isBlocked ? '' : 'hidden'} mt-2">
                    <label class="block text-[11px] font-bold text-rose-900 mb-1">Block / Blacklist Reason *</label>
                    <input type="text" id="v-block-reason" value="${vendor.blockReason || ''}" class="w-full px-3 py-1.5 border border-rose-300 rounded-sm text-xs" placeholder="e.g. Non-compliant delivery / Audit violation" />
                  </div>
                </div>` : '<div></div>'}
            </div>
          </div>
        </div>

        <!-- STEP 4: Bank Details -->
        <div id="v-step-4" class="space-y-4 hidden">
          <!-- All 5 Bank Details -->
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
            <div class="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="landmark" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Vendor Banking & Remittance Details</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Bank Name <span class="text-rose-600 font-bold">*</span></label>
                <input type="text" id="v-bank-name" autocomplete="new-password" required value="${vendor.bankName || ''}" class="w-full px-3 py-1.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. HDFC Bank, SBI" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Account Name <span class="text-rose-600 font-bold">*</span></label>
                <input type="text" id="v-account-name" autocomplete="new-password" required oninput="this.value = this.value.replace(/[^a-zA-Z\\s.\\-&]/g, '')" value="${vendor.accountName || vendor.name || ''}" class="w-full px-3 py-1.5 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Beneficiary Name" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Account No. <span class="text-rose-600 font-bold">*</span></label>
                <input type="text" id="v-account-no" autocomplete="new-password" required minlength="5" maxlength="22" value="${vendor.accountNo || ''}" class="w-full font-mono px-3 py-1.5 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Account Number" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">IFSC Code (11 Chars) <span class="text-rose-600 font-bold">*</span></label>
                <input type="text" id="v-ifsc" autocomplete="new-password" required maxlength="11" value="${vendor.ifscCode || ''}" oninput="this.value = this.value.toUpperCase();" class="w-full font-mono uppercase px-3 py-1.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. HDFC0001234" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Branch Name</label>
                <input type="text" id="v-branch-name" autocomplete="new-password" value="${vendor.branchName || ''}" class="w-full px-3 py-1.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Branch Name" />
              </div>
            </div>
            <div class="mt-2 pt-2 border-t border-slate-200">
              <label class="block font-bold text-slate-700 mb-1 text-[11px]">Upload Supporting Document <span class="text-rose-600 font-bold">*</span></label>
                <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                  <input type="file" id="v-bank-file" accept=".pdf,image/*" class="text-xs shrink-0" ${!vendor.bankDoc ? 'required' : ''} />
                  <select id="v-bank-title" class="w-full sm:w-64 mt-1.5 sm:mt-0 px-2 py-1 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                    <option value="" ${!vendor.bankDocTitle ? 'selected' : ''}>-- Select Document Type --</option>
                    <option value="Cancelled Cheque" ${vendor.bankDocTitle === 'Cancelled Cheque' ? 'selected' : ''}>Cancelled Cheque</option>
                    <option value="Passbook" ${vendor.bankDocTitle === 'Passbook' ? 'selected' : ''}>Passbook</option>
                    <option value="Bank Statement" ${vendor.bankDocTitle === 'Bank Statement' ? 'selected' : ''}>Bank Statement</option>
                    <option value="Other Bank Document" ${vendor.bankDocTitle === 'Other Bank Document' ? 'selected' : ''}>Other Bank Document</option>
                  </select>
                </div>
              ${vendor.bankDoc ? `<span class="block text-[10px] text-emerald-700 font-mono mt-0.5">Attached on record: ${vendor.bankDoc}</span>` : ''}
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-between gap-2.5">
          <div>
            <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-sm transition">Cancel</button>
          </div>
          <div class="flex gap-2.5">
            <button id="v-prev-btn" type="button" onclick="CMS_MASTERS.prevVendorTab()" class="hidden px-4 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold rounded-sm transition">Previous Step</button>
            <button id="v-next-btn" type="button" onclick="CMS_MASTERS.nextVendorTab()" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm shadow transition">Next Step <i data-lucide="arrow-right" class="w-3.5 h-3.5 inline"></i></button>
            <button id="v-submit-btn" type="button" onclick="CMS_MASTERS.saveVendor('${vendorId || ''}')" class="hidden px-5 py-2.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition flex items-center gap-1.5">
              <i data-lucide="send" class="w-4 h-4"></i>
              <span>Submit for Admin Approval</span>
            </button>
          </div>
        </div>
      </form>
    `;

    window.CMS_APP.openModal(isEdit ? 'Modify Vendor Record' : 'Register New Vendor', content, 'max-w-4xl');

    // Populate dynamic certificates if present
    
      const certList = vendor.certificates || [];
      if (certList.length > 0) {
        certList.forEach(c => this.addCertificateRow(c));
      }

      setTimeout(() => {
        const qList = vendor.quotedItems || [];
        if (qList.length === 0 && (vendor.quotedMaterialId || vendor.quotedMaterialName || vendor.quotationNo)) {
          CMS_MASTERS.addVendorQuotationRow({
            quotationNo: vendor.
          gstDocTitle, panDocTitle, bankDocTitle, limAlertDays, limAlertFreq,
          quotationNo,

            quotationDate: vendor.quotationDate,
            quotationValidTill: vendor.quotationValidTill,
            materialId: vendor.quotedMaterialId,
            materialName: vendor.quotedMaterialName,
            rate: vendor.quotedMaterialRate,
            mrp: vendor.quotedMaterialMrp,
            unit: vendor.quotedMaterialUnit,
            hsn: vendor.quotedMaterialHsn,
            doc: vendor.quotationDoc
          });
        } else if (qList.length > 0) {
          qList.forEach(q => CMS_MASTERS.addVendorQuotationRow(q));
        } else {
          CMS_MASTERS.addVendorQuotationRow();
        }
      }, 0);

  },

  toggleGstApplicable(isNotApplicable) {
    const panNa = document.getElementById('v-pan-na');
    if (!isNotApplicable && panNa && panNa.checked) {
      window.CMS_APP.toast('Cannot enable GSTIN because PAN card is marked as Not Applicable.', 'error');
      const gstNa = document.getElementById('v-gst-na');
      if (gstNa) gstNa.checked = true;
      return;
    }
    const input = document.getElementById('v-gst');
    const box = document.getElementById('v-gst-file-box');
    if (input) {
      input.disabled = isNotApplicable;
      if (isNotApplicable) {
        input.value = '';
        input.classList.add('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      } else {
        input.classList.remove('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      }
    }
    if (box) box.classList.toggle('hidden', isNotApplicable);
  },

  togglePanApplicable(isNotApplicable) {
    const input = document.getElementById('v-pan');
    const box = document.getElementById('v-pan-file-box');
    if (input) {
      input.disabled = isNotApplicable;
      if (isNotApplicable) {
        input.value = '';
        input.classList.add('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      } else {
        input.classList.remove('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      }
    }
    if (box) box.classList.toggle('hidden', isNotApplicable);

    // Indian Statutory rule: If PAN is NA, GST must also be NA.
    const gstNa = document.getElementById('v-gst-na');
    if (isNotApplicable && gstNa && !gstNa.checked) {
      gstNa.checked = true;
      this.toggleGstApplicable(true);
      window.CMS_APP.toast('GST Registration is legally invalid without a PAN card.', 'warning');
    }
  },

  saveAndSubmitVendor(vendorId) {
    this.saveVendor(vendorId, true);
  },

  saveVendor(vendorId = null, directSubmit = true) {
    const store = window.CMS_STORE;
    const currentUser = store.getCurrentUser();
    if (currentUser && currentUser.role === 'Admin') {
      return window.CMS_APP.toast('Col. Anita Sharma (Admin) cannot create or modify vendors. You are authorized to approve and view vendor records only.', 'error');
    }
    const isEdit = Boolean(vendorId);
    const existingVendor = isEdit ? store.data.vendors.find(v => v.id === vendorId) : null;
    const today = new Date().toISOString().split('T')[0];

    const name = document.getElementById('v-name')?.value.trim() || '';
    const address = document.getElementById('v-address')?.value.trim() || '';
    const constitution = document.getElementById('v-constitution')?.value || '';
      const addressTaluka = document.getElementById('v-taluka')?.value.trim() || '';
    const addressDistrict = document.getElementById('v-district')?.value.trim() || '';
    const addressState = document.getElementById('v-state')?.value || '';
    const addressCountry = document.getElementById('v-country')?.value.trim() || 'India';
    const addressPinCode = document.getElementById('v-pin')?.value.trim() || '';
    const contactNo = document.getElementById('v-contact')?.value.trim() || '';
      const countryCode = document.getElementById('v-country-code')?.value.trim() || '+91';
    const email = document.getElementById('v-email')?.value.trim() || '';
    const gstDocTitle = document.getElementById('v-gst-title')?.value.trim() || '';
    const panDocTitle = document.getElementById('v-pan-title')?.value.trim() || '';
    const bankDocTitle = document.getElementById('v-bank-title')?.value.trim() || '';
    const limAlertDays = document.getElementById('v-lim-alert-days')?.value.trim() || '';
      const limAlertFreq = document.getElementById('v-lim-alert-freq')?.value || 'Daily';


    // GST & PAN Statutory Check
    const gstNotApplicable = document.getElementById('v-gst-na')?.checked || false;
    const panNotApplicable = document.getElementById('v-pan-na')?.checked || false;
    const gstNo = gstNotApplicable ? '' : (document.getElementById('v-gst')?.value.trim().toUpperCase() || '');
    const panNo = panNotApplicable ? '' : (document.getElementById('v-pan')?.value.trim().toUpperCase() || '');

    const gstFileInput = document.getElementById('v-gst-file');
    const panFileInput = document.getElementById('v-pan-file');
    let gstCertificateFile = (gstFileInput && gstFileInput.files[0]) ? gstFileInput.files[0].name : (existingVendor?.gstCertificateFile || '');
    let panCardFile = (panFileInput && panFileInput.files[0]) ? panFileInput.files[0].name : (existingVendor?.panCardFile || '');

    // Fallback document filenames for records if user did not pick a local disk file
    if (!gstNotApplicable && gstNo && !gstCertificateFile) {
      gstCertificateFile = `${gstNo}_GST_Certificate.pdf`;
    }
    if (!panNotApplicable && panNo && !panCardFile) {
      panCardFile = `${panNo}_PAN_Card.pdf`;
    }

    // Bank Details
    const bankName = document.getElementById('v-bank-name')?.value.trim() || '';
    const accountName = document.getElementById('v-account-name')?.value.trim() || name;
    const accountNo = document.getElementById('v-account-no')?.value.trim() || '';
    const ifscCode = document.getElementById('v-ifsc')?.value.trim().toUpperCase() || '';
    const branchName = document.getElementById('v-branch-name')?.value.trim() || '';
    
    const bankFileInput = document.getElementById('v-bank-file');
      let bankDoc = (bankFileInput && bankFileInput.files[0]) ? bankFileInput.files[0].name : (existingVendor?.bankDoc || '');
      
      if (!bankDoc || !bankDocTitle) {
          window.CMS_APP.toast('Supporting Bank Document and its Document Type are mandatory.', 'error');
          this.switchVendorTab(4);
          return;
        }

    const quoteRows = document.querySelectorAll('#v-quotations-container .quote-row');
    const quotedItems = [];
    for (const row of quoteRows) {
      const qno = row.querySelector('.q-no')?.value.trim() || '';
      const matName = row.querySelector('.q-mat-name')?.value.trim() || '';
      if (!qno && !matName) continue;
      
      const fileInput = row.querySelector('.q-file');
      let docName = (fileInput && fileInput.files[0]) ? fileInput.files[0].name : '';
      if (!docName) {
          const span = row.querySelector('span.text-emerald-700');
          if (span && span.innerText.includes('Attached on record: ')) {
              docName = span.innerText.split('Attached on record: ')[1].trim();
          }
      }
      
      
      const qDate = row.querySelector('.q-date')?.value || '';
      const qEff = row.querySelector('.q-eff')?.value || '';
      const qValid = row.querySelector('.q-valid')?.value || '';
      
      const today = new Date().toISOString().split('T')[0];
      if (qDate && qDate > today) {
        return window.CMS_APP.toast('System does not allow future quotation dates.', 'error');
      }
      if (qEff && qDate && qEff < qDate) {
        return window.CMS_APP.toast('Effective date cannot be older than the quotation date.', 'error');
      }
      if (qValid && qEff && qValid < qEff) {
          return window.CMS_APP.toast('Valid till/expiry date cannot be older than the effective date.', 'error');
        }
        
        const rateVal = parseFloat(row.querySelector('.q-rate')?.value || 0);
        const mrpVal = parseFloat(row.querySelector('.q-mrp')?.value || 0);
        const mrpNa = row.querySelector('.q-mrp-na')?.checked;
        if (!mrpNa && rateVal > mrpVal) {
          window.CMS_APP.toast('Error: Approved Rate cannot be higher than MRP for material ' + matName, 'error');
          this.switchVendorTab(3);
          return;
        }

      quotedItems.push({
        quotationNo: qno,
        quotationDate: qDate,
        effectiveFrom: qEff,
        validTill: qValid,
        alertDays: row.querySelector('.q-alert') ? row.querySelector('.q-alert').value : '',
          alertFreq: row.querySelector('.q-freq') ? row.querySelector('.q-freq').value : 'Daily',
        materialId: row.querySelector('.q-mat-id')?.value || '',
        materialName: matName,
        rate: row.querySelector('.q-rate')?.value || 0,
        mrp: row.querySelector('.q-mrp')?.value || 0,
        unit: row.querySelector('.q-unit')?.value || 'Nos',
        hsn: row.querySelector('.q-hsn')?.value || '',
        doc: docName,
        docTitle: row.querySelector('.q-title') ? row.querySelector('.q-title').value : ''
      });

    }
    
    const quotationNo = quotedItems.length > 0 ? quotedItems[0].quotationNo : '';
    const quotationDate = quotedItems.length > 0 ? quotedItems[0].quotationDate : '';
    const quotationValidTill = quotedItems.length > 0 ? quotedItems[0].quotationValidTill : '';
    const quotationDoc = quotedItems.length > 0 ? quotedItems[0].doc : '';
    const quotedMaterialId = quotedItems.length > 0 ? quotedItems[0].materialId : '';
    const quotedMaterialName = quotedItems.length > 0 ? quotedItems[0].materialName : '';
    const quotedMaterialRate = quotedItems.length > 0 ? quotedItems[0].rate : 0;
    const quotedMaterialMrp = quotedItems.length > 0 ? quotedItems[0].mrp : 0;
    const quotedMaterialUnit = quotedItems.length > 0 ? quotedItems[0].unit : 'Nos';
    const quotedMaterialHsn = quotedItems.length > 0 ? quotedItems[0].hsn : '8472';


    // Limited period & Blocked
    const approvedForLimitedPeriod = document.getElementById('v-limited')?.checked || false;
    const approvalValidTill = approvedForLimitedPeriod ? (document.getElementById('v-approval-valid-till')?.value || '') : '';
    const isBlocked = document.getElementById('v-blocked')?.checked || false;
    const blockReason = isBlocked ? (document.getElementById('v-block-reason')?.value.trim() || 'Blocked by administrator') : '';

    // ==========================================
    // RIGOROUS MARGIN & LIMIT STATUTORY VALIDATION
    // ==========================================
    
      const todayDateStr = new Date().toISOString().split('T')[0];
      for (const q of quotedItems) {
        if (q.quotationDate && q.quotationDate > todayDateStr) {
          return window.CMS_APP.toast('Quotation Date cannot be a future date.', 'error');
        }
        if (q.effectiveFrom && q.quotationDate && q.effectiveFrom < q.quotationDate) {
          return window.CMS_APP.toast('Effective Date cannot be older than Quotation Date.', 'error');
        }
        const compareBase = q.effectiveFrom || q.quotationDate;
        if (q.quotationValidTill && compareBase && q.quotationValidTill < compareBase) {
          return window.CMS_APP.toast('Valid Till / Expiry Date cannot be older than the ' + (q.effectiveFrom ? 'Effective' : 'Quotation') + ' Date.', 'error');
        }
      }
if (!name) return window.CMS_APP.toast('Vendor / Supplier Company Name is required.', 'error');
    if (!address) return window.CMS_APP.toast('Street / Building address is mandatory.', 'error');
    if (!addressDistrict) return window.CMS_APP.toast('District is required.', 'error');
    if (!addressState) return window.CMS_APP.toast('Please select an Indian State or Union Territory.', 'error');

    // PIN Code: exactly 6 digits
    if (!addressPinCode || !/^[0-9]{6}$/.test(addressPinCode)) {
      return window.CMS_APP.toast(`PIN Code must be exactly 6 numeric digits (currently "${addressPinCode}"). Example: 110020.`, 'error');
    }

    // Phone: minimum 10 digits
    const cleanPhone = contactNo.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return window.CMS_APP.toast(`Phone number must contain at least 10 digits (currently ${cleanPhone.length} digits).`, 'error');
    }

    // GSTIN Validation (unless exempt)
    if (!gstNotApplicable) {
      if (!gstNo) {
        return window.CMS_APP.toast('GSTIN Number is mandatory. If vendor is unregistered, you must confirm the blue box (GST registration is not applicable).', 'error');
      }
      if (gstNo.length !== 15) {
        return window.CMS_APP.toast(`GSTIN must be exactly 15 characters (currently ${gstNo.length} characters). Example: 07AABCA1234F1Z5.`, 'error');
      }
      if (!/^[0-9A-Z]{15}$/.test(gstNo)) {
        return window.CMS_APP.toast('GSTIN must be 15 alphanumeric characters without spaces or symbols.', 'error');
      }
      // Check duplicate GSTIN across other vendors
      const duplicateGst = store.data.vendors.find(v => v.id !== vendorId && v.gstNo && v.gstNo.toUpperCase() === gstNo);
      if (duplicateGst) {
        return window.CMS_APP.toast(`Duplicate GSTIN! "${duplicateGst.name}" (${duplicateGst.id}) is already registered with GSTIN ${gstNo}.`, 'error');
      }
    }

    // PAN Validation (unless exempt)
    if (!panNotApplicable) {
      if (!panNo) {
        return window.CMS_APP.toast('PAN Card Number is mandatory. If vendor has no PAN, confirm the PAN exemption blue box.', 'error');
      }
      if (panNo.length !== 10) {
        return window.CMS_APP.toast(`PAN Number must be exactly 10 characters (currently ${panNo.length} characters). Example: AABCA1234F.`, 'error');
      }
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNo)) {
        return window.CMS_APP.toast('PAN format must be 5 letters, 4 digits, and 1 letter (e.g. AABCA1234F).', 'error');
      }
    }

    // Bank Validation
    if (!bankName) return window.CMS_APP.toast('Bank Name is mandatory.', 'error');
    if (/[^a-zA-Z\s.\-&]/.test(accountName)) {
        return window.CMS_APP.toast('Bank Account Name cannot contain numbers or special symbols.', 'error');
      }
      if (!accountNo || accountNo.length < 5 || accountNo.length > 22) {
      return window.CMS_APP.toast(`Bank Account Number must be between 5 and 22 digits (currently ${accountNo.length} digits).`, 'error');
    }
    if (!ifscCode || ifscCode.length < 8 || ifscCode.length > 11) {
      return window.CMS_APP.toast(`Bank IFSC Code must be valid (e.g. HDFC0001234). Currently: "${ifscCode}".`, 'error');
    }

    // Limited period approval validation
    if (approvedForLimitedPeriod) {
      if (!approvalValidTill) {
        return window.CMS_APP.toast('Approval Expiry Date is mandatory when limited period approval is selected.', 'error');
      }
      if (approvalValidTill < today) {
        return window.CMS_APP.toast('Approval Expiry Date cannot be a past date.', 'error');
      }
    }

    // Quotation validation
    if (quotationValidTill && quotationValidTill < today) {
      return window.CMS_APP.toast('Quotation Validity Date cannot be a past date.', 'error');
    }

    // Extract dynamic certificates (optional)
    const certRows = document.querySelectorAll('#v-cert-container .cert-row');
    const certificates = [];
    for (const row of certRows) {
      let reg = row.querySelector('.cert-regulator-select')?.value || '';
      if (reg === 'Other') {
        const otherVal = row.querySelector('.cert-regulator-other-input')?.value.trim();
        if (otherVal) reg = otherVal;
        else return window.CMS_APP.toast('Please specify the agency name for "Other".', 'error');
      }
      const formNo = row.querySelector('.cert-form-input')?.value.trim() || '';
      const certNo = row.querySelector('.cert-number-input')?.value.trim() || '';
      const hasVal = row.querySelector('input[type="radio"]:checked')?.value === 'yes';
      const expiry = hasVal ? (row.querySelector('.cert-expiry-input')?.value || '') : '';
      const fileInput = row.querySelector('.cert-file-input');
      let fileName = (fileInput && fileInput.files[0]) ? fileInput.files[0].name : (fileInput?.dataset.current || '');

      // Skip blank rows if user didn't enter agency or number
      if (!reg && !certNo) continue;

      if (!reg) return window.CMS_APP.toast('Please select a Regulatory / Certification Agency for the added certificate row.', 'error');
      if (!certNo) return window.CMS_APP.toast(`License / Certificate Number is mandatory for ${reg}.`, 'error');
      if (hasVal && !expiry) return window.CMS_APP.toast(`Expiry date is mandatory for ${reg} (${certNo}).`, 'error');
      if (hasVal && expiry < today) return window.CMS_APP.toast(`Expiry date for ${reg} cannot be in the past.`, 'error');
      
      if (!fileName) return window.CMS_APP.toast(`Please upload the document file for ${reg} (${certNo}).`, 'error');

      if (!fileName) {
        fileName = `${reg.replace(/\s+/g, '_')}_${certNo || 'Certificate'}.pdf`;
      }

      certificates.push({
        regulator: reg,
        name: reg,
        formNo,
        certificateNo: certNo,
        hasValidity: hasVal,
        validTill: expiry,
        fileName
      });
    }

    const stateInfo = this.getStateInfo(addressState);

    if (isEdit) {
      const idx = store.data.vendors.findIndex(v => v.id === vendorId);
      if (idx !== -1) {
        store.data.vendors[idx] = {
          ...store.data.vendors[idx],
          name, constitution, address, addressTaluka, addressDistrict, addressState, addressCountry, addressPinCode,
          stateCode: stateInfo.code,
          applicableTaxType: stateInfo.taxMode,
          countryCode, contactNo, email,
          gstNotApplicable, panNotApplicable,
          gstNo, panNo,
          gstCertificateFile, panCardFile,
          bankName, accountName, accountNo, ifscCode, branchName, bankDoc,
          
          gstDocTitle, panDocTitle, bankDocTitle, limAlertDays,
          quotationNo,
 quotationDate, quotationValidTill, quotationDoc, 
          quotedMaterialId, quotedMaterialName, quotedMaterialRate, quotedMaterialUnit, quotedMaterialHsn,
          approvedForLimitedPeriod, approvalValidTill,
          isBlocked, blockReason, quotedItems,
          certificates,
          status: directSubmit ? 'Pending Approval' : store.data.vendors[idx].status,
          updatedAt: new Date().toISOString(),
          // Clear previous rejection remarks upon resubmission
          checkerMistakeRemark: directSubmit ? '' : store.data.vendors[idx].checkerMistakeRemark
        };
      }
    } else {
      // Sequence-based unique Vendor ID
      const existingIds = new Set(store.data.vendors.map(v => v.id));
      let nextNum = Math.floor(Date.now() / 1000);
      let newId = 'VEN-' + String(nextNum).padStart(3, '0');
      while (existingIds.has(newId)) {
        nextNum++;
        newId = 'VEN-' + String(nextNum).padStart(3, '0');
      }

      store.data.vendors.push({
        id: newId,
        name, constitution, address, addressTaluka, addressDistrict, addressState, addressCountry, addressPinCode,
        stateCode: stateInfo.code,
        applicableTaxType: stateInfo.taxMode,
        countryCode, contactNo, email,
        gstNotApplicable, panNotApplicable,
        gstNo, panNo,
        gstCertificateFile, panCardFile,
        bankName, accountName, accountNo, ifscCode, branchName, bankDoc,
        
          gstDocTitle, panDocTitle, bankDocTitle, limAlertDays,
          quotationNo,
 quotationDate, quotationValidTill, quotationDoc,
        quotedMaterialId, quotedMaterialName, quotedMaterialRate, quotedMaterialUnit, quotedMaterialHsn,
        approvedForLimitedPeriod, approvalValidTill,
        isBlocked, blockReason, quotedItems,
        certificates,
        status: directSubmit ? 'Pending Approval' : 'Draft',
        createdAt: new Date().toISOString(),
        createdBy: currentUser.id,
        createdByName: currentUser.name
      });
    }

    // Automatically synchronize quotation and quoted material with catalog
    
      const targetVendorId = isEdit ? vendorId : store.data.vendors[store.data.vendors.length - 1].id;
      
      for (const q of quotedItems) {
        if (!q.quotationNo && !q.materialName) continue;
        
        if (q.materialId) {
          const mat = store.data.consumables.find(m => m.id === q.materialId);
          if (mat) {
            if (q.quotationNo) mat.quotationNo = q.quotationNo;
            if (q.quotationDate) mat.quotationDate = q.quotationDate;
            if (q.rate > 0) {
              mat.quotationRate = q.rate;
              mat.vendor1Rate = q.rate;
            }
            if (q.mrp > 0) mat.mrpBooked = q.mrp;
            mat.vendor1Id = targetVendorId;
            mat.vendor1Name = name;
            if (q.hsn) mat.hsnCode = q.hsn;
            if (q.unit) mat.unit = q.unit;
          }
        } else if (q.materialName && q.rate > 0) {
          const existingMat = store.data.consumables.find(m => m.materialName.toLowerCase() === q.materialName.toLowerCase());
          if (existingMat) {
            if (q.quotationNo) existingMat.quotationNo = q.quotationNo;
            if (q.quotationDate) existingMat.quotationDate = q.quotationDate;
            existingMat.quotationRate = q.rate;
            existingMat.vendor1Id = targetVendorId;
            existingMat.vendor1Name = name;
            existingMat.vendor1Rate = q.rate;
            if (q.hsn) existingMat.hsnCode = q.hsn;
            if (q.unit) existingMat.unit = q.unit;
          } else {
            const newCount = Math.floor(Date.now() / 1000);
            const newMatId = `MAT-CON-${String(newCount).padStart(3, '0')}`;
            store.data.consumables.push({
              id: newMatId,
              inventoryType: 'Consumer',
              categoryId: 'CAT-001',
              categoryName: 'General',
              materialName: q.materialName,
              unit: q.unit || 'Nos',
              brand: name,
              supplierProductCode: `SKU-${newMatId}`,
              hsnCode: q.hsn || '8472',
              sgst: stateInfo.taxMode === 'IGST' ? 0 : 9,
              cgst: stateInfo.taxMode === 'IGST' ? 0 : 9,
              igst: stateInfo.taxMode === 'IGST' ? 18 : 0,
              quotationNo: q.
          gstDocTitle, panDocTitle, bankDocTitle, limAlertDays,
          quotationNo,

              quotationDate: q.quotationDate || today,
              quotationRate: q.rate,
              mrpBooked: q.mrp > 0 ? q.mrp : Number((q.rate * 1.25).toFixed(2)),
              hasWarranty: false,
              warrantyPeriod: '',
              warrantyValidTill: '',
              hasPm: false,
              pmFrequency: '',
              vendor1Id: targetVendorId,
              vendor1Name: name,
              vendor1Rate: q.rate,
              vendor1RateEffectiveFrom: q.effectiveFrom || q.quotationDate || today,
              consumerConfirmed: true,
              confirmedBy: currentUser.name,
              confirmationDate: today,
              confirmationRemarks: `Auto-Cataloged via Vendor Quotation [${q.quotationNo}]`,
              avgMonthlyConsumption: 10,
              initialStock: 0,
              status: 'Approved',
              createdAt: new Date().toISOString()
            });
          }
        }
      }

      store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(directSubmit ? 'Vendor credentials and statutory certificates submitted for Admin approval!' : 'Vendor saved successfully!', 'success');
    window.CMS_APP.refreshView();
  },

  openVendorSanctionModal(vendorId) {
    const v = window.CMS_STORE.data.vendors.find(i => i.id === vendorId);
    if (!v) return;

    const docs = [];
    if (v.gstCertificateFile) docs.push({ label: 'GST Registration Certificate', fileName: v.gstCertificateFile, partyName: v.name });
    if (v.panCardFile) docs.push({ label: 'Permanent Account Number (PAN) Card', fileName: v.panCardFile, partyName: v.name });
    if (v.bankDoc) docs.push({ label: 'Bank Supporting Document', fileName: v.bankDoc, partyName: v.name });
    if (v.quotationDoc) docs.push({ label: 'Approved Commercial Quotation', fileName: v.quotationDoc, partyName: v.name, validTill: v.quotationValidTill });
    (v.certificates || []).forEach(c => {
      const reg = typeof c === 'string' ? c : (c.regulator || c.name || 'Certificate');
      const fName = typeof c === 'object' ? c.fileName : '';
      if (fName) {
        docs.push({ label: `${reg} Regulatory Certificate`, fileName: fName, partyName: v.name, validTill: c.validTill });
      }
    });

    const summaryHtml = `
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-bold text-blue-600 text-sm">${v.name}</span>
          <span class="font-mono text-slate-500 font-bold">${v.id}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
          <div>GSTIN: <strong class="font-mono text-slate-800">${v.gstNotApplicable ? 'Exempt' : (v.gstNo || 'N/A')}</strong></div>
          <div>PAN: <strong class="font-mono text-slate-800">${v.panNotApplicable ? 'Exempt' : (v.panNo || 'N/A')}</strong></div>
          <div>Bank: <strong class="text-slate-800">${v.bankName || '-'} (${v.accountNo || '-'})</strong></div>
          <div>State: <strong class="text-slate-800">${v.addressState || '-'} (Code: ${v.stateCode || '-'})</strong></div>
        </div>
        ${v.quotationNo ? `<div class="text-[11px] text-blue-600 bg-slate-50/80 p-1.5 rounded border border-slate-200">Quote Ref: <strong>${v.quotationNo}</strong> | Valid Till: <strong>${window.CMS_STORE.formatDate(v.quotationValidTill)}</strong></div>` : ''}
      </div>
    `;

    window.CMS_APP.promptSanctionApproval({
      title: v.name,
      id: v.id,
      entityType: 'vendor',
      summaryHtml,
      documents: docs,
      onConfirm: `() => CMS_MASTERS.approveVendor('${vendorId}')`
    });
  },

  openVendorRejectModal(vendorId) {
    const v = window.CMS_STORE.data.vendors.find(i => i.id === vendorId);
    if (!v) return;
    window.CMS_APP.promptRejection({
      title: v.name,
      id: v.id,
      entityType: 'vendor',
      onReject: `(remark) => CMS_MASTERS.rejectVendorWithRemark('${vendorId}', remark)`
    });
  },

  approveVendor(vendorId) {
    const store = window.CMS_STORE;
    const v = store.data.vendors.find(i => i.id === vendorId);
    if (!v) return;
    const check = store.canApprove(v);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    v.status = 'Approved';
    v.approvedAt = new Date().toISOString();
    v.approvedBy = currentUser.id;
    v.approvedByName = currentUser.name;
    v.checkerMistakeRemark = '';
    store.save();
    window.CMS_APP.toast(`Vendor "${v.name}" sanctioned and approved by ${currentUser.name}!`, 'success');
    window.CMS_APP.refreshView();
  },

  rejectVendorWithRemark(vendorId, mistakeRemark) {
    const res = window.CMS_STORE.rejectRecord('vendor', vendorId, mistakeRemark);
    if (res.success) {
      window.CMS_APP.toast(`Vendor returned to Operation Manager (Rajesh Kumar). Mistake reported: "${mistakeRemark}"`, 'error');
      window.CMS_APP.refreshView();
    }
  },

  promptBlockVendor(vendorId, willBlock) {
    const v = window.CMS_STORE.data.vendors.find(i => i.id === vendorId);
    if (!v) return;
    if (willBlock) {
      const content = `
        <form class="space-y-4 text-xs" onsubmit="event.preventDefault(); const reason = document.getElementById('ban-reason-input').value.trim(); if (!reason) { CMS_APP.toast('Please provide a reason for blocking.', 'error'); return; } CMS_APP.closeModal(); CMS_MASTERS.confirmBlockVendor('${vendorId}', true, reason);">
          
          <div>
            <label class="block font-bold text-slate-800 mb-1">Reason / Statutory Remarks for Banning *</label>
            <textarea id="ban-reason-input" required rows="3" class="w-full px-3 py-2 border border-rose-300 rounded-sm text-xs focus:ring-2 focus:ring-rose-500" placeholder="e.g. Failure to comply with ISO standard specifications / Non-delivery / Quality defect"></textarea>
          </div>
          <div class="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-sm">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-rose-600 text-white font-bold rounded-sm shadow hover:bg-rose-700">Confirm Blacklist / Ban</button>
          </div>
        </form>
      `;
      window.CMS_APP.openModal(`Ban Vendor: ${v.name}`, content, 'max-w-md');
    } else {
      if (confirm(`Are you sure you want to unblock "${v.name}"? They will once again be eligible for Goods Inward and PO generation.`)) {
        this.confirmBlockVendor(vendorId, false, '');
      }
    }
  },

  confirmBlockVendor(vendorId, willBlock, reason) {
    const success = window.CMS_STORE.toggleBlockVendor(vendorId, willBlock, reason);
    if (success) {
      window.CMS_APP.toast(willBlock ? 'Vendor has been blocked / banned from new transactions.' : 'Vendor unblocked successfully.', willBlock ? 'error' : 'success');
      window.CMS_APP.refreshView();
    }
  },

  // // CONSUMABLE CATEGORY MASTER
  // ==========================================
  renderCategories() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const list = store.categories || [];

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-slate-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="tag" class="w-4 h-4"></i>
              </div>
              <span>Consumable Category</span>
            </h2>
            
          </div>
          ${role === 'User' ? `
            <button onclick="CMS_MASTERS.openCategoryModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition text-xs">
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>Add Category</span>
            </button>
          ` : ''}
        </div>

        <div class="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-4">Category Code</th>
                <th class="p-4">Category Type / Name</th>
                <th class="p-4">Scope & Description</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="5" class="p-12 text-center text-slate-400">No categories found. Click "Add Category" to create one.</td></tr>
              ` : list.map(c => `
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-4 font-mono text-xs font-semibold text-slate-500">${c.id}</td>
                  <td class="p-4 font-bold text-blue-600 text-sm">${c.name}</td>
                  <td class="p-4 text-slate-600 max-w-md">${c.description || '-'}</td>
                  <td class="p-4">
                    <span class="badge ${c.status === 'Approved' ? 'badge-approved' : c.status === 'Pending Approval' ? 'badge-pending' : 'badge-draft'}">
                      ${c.status}
                    </span>
                  </td>
                  <td class="p-4 text-right space-x-1">
                    ${role === 'User' ? `
                      <button onclick="CMS_MASTERS.openCategoryModal('${c.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-sm transition" title="Modify Category">
                        <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                      </button>
                    ` : ''}
                    ${c.status === 'Pending Approval' && role === 'Admin' ? `
                      <button onclick="CMS_MASTERS.approveCategory('${c.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-sm transition">
                        Approve
                      </button>
                    ` : ''}
                    ${role === 'Admin' ? `<button onclick="CMS_MASTERS.deleteCategory('${c.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-sm transition" title="Delete Category"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  openCategoryModal(catId = null) {
    const role = window.CMS_STORE.getRole();
    if (role === 'Admin') {
      return window.CMS_APP.toast('Col. Anita Sharma (Admin) is authorized for review and approval only. Adding or modifying categories must be initiated by User.', 'warning');
    }
    const isEdit = Boolean(catId);
    const cat = isEdit ? window.CMS_STORE.data.categories.find(c => c.id === catId) : { name: '', description: '' };

    const content = `
      <form id="cat-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_MASTERS.saveCategory('${catId || ''}', true);">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Category Type / Name *</label>
          <input type="text" id="cat-name" required value="${cat.name || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="e.g. Stationery, Housekeeping, Packing Material" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Description / Notes</label>
          <textarea id="cat-desc" rows="3" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="Scope of items falling under this category">${cat.description || ''}</textarea>
        </div>
        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-sm transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition">Submit for Approval</button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal(isEdit ? 'Modify Category' : 'Add Consumable Category', content);
  },

  saveCategory(catId, directSubmit = false) {
    const role = window.CMS_STORE.getRole();
    if (role === 'Admin') {
      return window.CMS_APP.toast('Col. Anita Sharma (Admin) is authorized for review and approval only. Adding or modifying categories must be initiated by User.', 'warning');
    }
    const name = document.getElementById('cat-name').value.trim();
    const description = document.getElementById('cat-desc').value.trim();
    const store = window.CMS_STORE;

    if (catId) {
      const idx = store.data.categories.findIndex(c => c.id === catId);
      if (idx !== -1) {
        store.data.categories[idx] = {
          ...store.data.categories[idx],
          name, description,
          status: directSubmit ? 'Pending Approval' : store.data.categories[idx].status
        };
      }
    } else {
      const newId = 'CAT-' + String(Date.now()).slice(-6);
      store.data.categories.push({
        id: newId,
        name, description,
        status: directSubmit ? 'Pending Approval' : 'Draft',
        createdAt: new Date().toISOString()
      });
    }

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(directSubmit ? 'Category submitted for approval!' : 'Category saved!');
    window.CMS_APP.refreshView();
  },

  approveCategory(catId) {
    const store = window.CMS_STORE;
    const c = store.data.categories.find(i => i.id === catId);
    if (!c) return;
    const check = store.canApprove(c);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    c.status = 'Approved';
    c.approvedAt = new Date().toISOString();
    c.approvedBy = currentUser.id;
    c.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`Category "${c.name}" sanctioned by ${currentUser.name}!`, 'success');
    window.CMS_APP.refreshView();
  },

  deleteCategory(catId) {
    if (confirm('Delete this category?')) {
      const store = window.CMS_STORE;
      store.data.categories = store.data.categories.filter(c => c.id !== catId);
      store.save();
      window.CMS_APP.toast('Category deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  },

  // ==========================================
  // CONSUMABLE (MATERIAL) MASTER
  // ==========================================
  renderConsumables() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const categories = (store.categories || []).filter(c => c.status === "Approved");
    let list = store.consumables || [];
    // Drag pending approvals on top
    const matPriority = { 'Pending Approval': 0, 'Revision Required': 1, 'Approved': 2, 'Draft': 3 };
    list = [...list].sort((a, b) => {
      const pa = matPriority[a.status] ?? 2;
      const pb = matPriority[b.status] ?? 2;
      if (pa !== pb) return pa - pb;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    // Filter by search query
    if (this.consumableSearchQuery) {
      const q = this.consumableSearchQuery.toLowerCase();
      list = list.filter(m =>
        (m.materialName || '').toLowerCase().includes(q) ||
        (m.brand || '').toLowerCase().includes(q) ||
        (m.hsnCode || '').toLowerCase().includes(q) ||
        (m.id || '').toLowerCase().includes(q) ||
        (m.supplierProductCode || '').toLowerCase().includes(q) ||
        (m.assetTag || '').toLowerCase().includes(q) ||
        (m.quotationNo || '').toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (this.consumableCategoryFilter) {
      list = list.filter(m => m.categoryId === this.consumableCategoryFilter);
    }

    // Filter by Inventory Type (Consumer vs Fixed)
    if (this.consumableTypeFilter) {
      list = list.filter(m => (m.inventoryType || 'Consumer') === this.consumableTypeFilter);
    }

    return `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-slate-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="package" class="w-4 h-4"></i>
              </div>
              <span>Material Catalog (Consumable Materials & Fixed Assets)</span>
            </h2>
            
          </div>
          ${role === 'User' ? `
      <button onclick="CMS_MASTERS.openConsumableModal(null, CMS_MASTERS.consumableTypeFilter || 'Consumer')" class="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition text-xs">
        <i data-lucide="plus-circle" class="w-4 h-4"></i>
        <span>Add Material</span>
      </button>
            ` : ''}
        </div>

        <!-- Table Toolbar: Live Search, Category & Type Filter -->
        <div class="bg-white p-4 rounded-sm border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div class="relative w-full sm:w-64">
              <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="text" value="${this.consumableSearchQuery}" oninput="CMS_MASTERS.onConsumableSearch(this.value)" placeholder="Search item, quote #, SKU, tag..." class="table-search-input w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs focus:bg-white focus:outline-none" />
            </div>
            <select onchange="CMS_MASTERS.onConsumableTypeFilter(this.value)" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none">
              <option value="">-- All Inventory Types --</option>
              <option value="Consumer" ${this.consumableTypeFilter === 'Consumer' ? 'selected' : ''}>Consumable Materials</option>
              <option value="Fixed" ${this.consumableTypeFilter === 'Fixed' ? 'selected' : ''}>Fixed Capital Assets</option>
            </select>
            <select onchange="CMS_MASTERS.onConsumableCategoryFilter(this.value)" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none">
              <option value="">-- All Categories (${store.consumables.length}) --</option>
              ${categories.map(c => `<option value="${c.id}" ${this.consumableCategoryFilter === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">${list.length}</strong> of ${store.consumables.length} items
          </div>
        </div>

        <!-- Material Items Table -->
        <div class="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-4">Item & Code</th>
                  <th class="p-4">Type</th>
                  <th class="p-4">Vendor Quotation & MRP</th>
                  <th class="p-4">Category & Unit</th>
                  <th class="p-4">Approved Vendor Rate</th>
                  <th class="p-4">Warranty & PM Coverage</th>
                  <th class="p-4 text-right">Stock / Buffer</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="9" class="p-12 text-center text-slate-400">
                      <i data-lucide="package-open" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
                      <div class="font-bold text-slate-600">No matching catalog items found</div>
                      <p class="text-slate-400 text-xs mt-1">Try adjusting your filters or register a new material.</p>
                    </td>
                  </tr>
                ` : list.map(m => {
                  const liveStock = window.CMS_STORE.getStock(m.id);
                  const isFixed = m.inventoryType === 'Fixed';
                  return `
                    <tr class="hover:bg-slate-50/80 transition">
                      <td class="p-4">
                        <div class="font-bold text-blue-600 text-sm hover:text-blue-600 cursor-pointer" onclick="CMS_MASTERS.viewMaterial360('${m.id}')">${m.materialName}</div>
                        <div class="text-[11px] text-slate-500 font-mono mt-0.5">Code: ${m.id} | Brand: <span class="font-bold text-slate-700">${m.brand || '-'}</span></div>
                        ${isFixed && m.assetTag ? `<div class="text-[10px] text-blue-600 font-mono mt-0.5 font-bold">Tag: ${m.assetTag} | S/N: ${m.serialNo || '-'}</div>` : ''}
                      </td>
                      <td class="p-4">
                        <span class="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded border ${isFixed ? 'bg-slate-50 text-blue-600 border-slate-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}">
                          ${isFixed ? 'Fixed' : 'Consumer'}
                        </span>
                      </td>
                      <td class="p-4">
                        <div class="text-blue-600 font-medium">Quote: <span class="font-mono font-bold text-blue-600">₹${Number(m.quotationRate || m.vendor1Rate || 0).toFixed(2)}</span></div>
                        <div class="text-[10px] text-slate-500 font-mono">Ref: ${m.quotationNo || 'Direct'} (${m.quotationDate || '-'})</div>
                        <div class="text-[11px] text-slate-800 font-semibold mt-0.5">MRP: <span class="font-mono text-blue-600">₹${Number(m.mrpBooked || 0).toFixed(2)}</span></div>
                      </td>
                      <td class="p-4">
                        <span class="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[11px] rounded-sm">${m.categoryName || 'General'}</span>
                        <div class="text-slate-500 mt-1">Unit: <span class="font-bold text-slate-800 font-mono">${m.unit}</span></div>
                      </td>
                      <td class="p-4">
                        <div class="font-mono text-xs"><strong class="text-blue-600">₹${Number(m.vendor1Rate || 0).toFixed(2)}</strong></div>
                        <div class="text-[10px] text-slate-500 line-clamp-1">${m.vendor1Name || 'Approved Vendor'}</div>
                      </td>
                      <td class="p-4">
                        <div class="space-y-1">
                          ${m.hasWarranty ? `
                            <span class="inline-flex items-center gap-1 text-[10px] bg-slate-50 text-blue-600 border border-slate-200 px-1.5 py-0.5 rounded font-semibold" title="Valid till: ${m.warrantyValidTill || 'N/A'}">
                               ${m.warrantyPeriod || 'Warranted'}
                            </span>
                          ` : `
                            <span class="text-[10px] text-slate-400">No warranty</span>
                          `}
                          ${isFixed ? `
                            <br />
                            ${m.hasPm ? `
                              <span class="inline-flex items-center gap-1 text-[10px] bg-purple-100 text-purple-800 border border-purple-200 px-1.5 py-0.5 rounded font-semibold" title="Tech: ${m.repairmanName || 'Assigned'} (${m.repairmanContact || '-'})">
                                PM: ${m.pmFrequency}
                              </span>
                            ` : `
                              <span class="text-[10px] text-slate-400">No PM</span>
                            `}
                          ` : ''}
                        </div>
                      </td>
                      <td class="p-4 text-right font-mono">
                        <div class="font-bold text-emerald-700 text-sm">${liveStock} <span class="text-slate-500 font-normal text-xs">${m.unit}</span></div>
                        <div class="text-[10px] text-slate-400">Buf: ${m.avgMonthlyConsumption || 0}</div>
                      </td>
                      <td class="p-4">
                        <span class="badge ${m.status === 'Approved' ? 'badge-approved' : m.status === 'Pending Approval' ? 'badge-pending' : 'badge-draft'}">
                          ${m.status}
                        </span>
                      </td>
                      <td class="p-4 text-right space-x-1">
                        <button onclick="CMS_MASTERS.viewMaterial360('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-sm transition" title="Inspect 360° Material Details">
                          <i data-lucide="scan" class="w-3.5 h-3.5"></i>
                        </button>
                        ${role === 'User' ? `
      <button onclick="CMS_MASTERS.openConsumableModal('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-sm transition" title="Modify Item Master">
        <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
      </button>
    ` : ''}
                        ${(m.status === 'Pending Approval' || m.status === 'Revision Required') && role === 'Admin' ? `
      <button onclick="CMS_MASTERS.openConsumableSanctionModal('${m.id}')" class="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-sm transition shadow-sm" title="Sanction Material">
        Approve
      </button>
      <button onclick="CMS_MASTERS.openConsumableRejectModal('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded-sm transition" title="Reject / Request Revision">
        Reject
      </button>
    ` : ''}
                        
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  onConsumableSearch(val) {
    this.consumableSearchQuery = val;
    this.refreshConsumablesTable();
  },

  onConsumableCategoryFilter(val) {
    this.consumableCategoryFilter = val;
    this.refreshConsumablesTable();
  },

  onConsumableTypeFilter(val) {
    this.consumableTypeFilter = val;
    this.refreshConsumablesTable();
  },

  refreshConsumablesTable() {
    const main = document.getElementById('view-container');
    if (main) {
      main.innerHTML = this.renderConsumables();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  toggleFixedAssetFields(type) {
    const el = document.getElementById('m-fixed-fields');
    if (el) {
      if (type === 'Fixed') el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  },

  toggleWarrantyFields(checked) {
    const el = document.getElementById('m-warranty-fields');
    if (el) {
      if (checked) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  },

  togglePmFields(checked) {
    const el = document.getElementById('m-pm-fields');
    if (el) {
      if (checked) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  },

  viewMaterial360(matId) {
    const m = window.CMS_STORE.data.consumables.find(i => i.id === matId);
    if (!m) return;

    const liveStock = window.CMS_STORE.getStock(m.id);
    const buffer = Number(m.avgMonthlyConsumption || 0);
    const pct = Math.min(100, Math.round((liveStock / (buffer || 1)) * 100));
    const isFixed = m.inventoryType === 'Fixed';

    const content = `
      <div class="space-y-5 text-xs">
        
        <!-- Header Banner -->
        <div class="p-5 bg-slate-900 border border-slate-800 text-white rounded-sm flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 bg-slate-500/30 border border-blue-400/40 text-slate-200 rounded text-[10px] font-bold uppercase tracking-wider">${m.categoryName}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isFixed ? 'bg-slate-500/40 text-slate-200 border border-indigo-400/40' : 'bg-emerald-500/40 text-emerald-200 border border-emerald-400/40'}">
                ${isFixed ? 'Fixed Capital Asset' : 'Consumable Material'}
              </span>
            </div>
            <h3 class="text-lg font-bold text-white mt-1">${m.materialName}</h3>
            <p class="text-slate-200 text-xs font-mono">Code: ${m.id} | Brand: <strong>${m.brand || '-'}</strong> | SKU: ${m.supplierProductCode || '-'}</p>
            ${isFixed && m.assetTag ? `<p class="text-indigo-300 text-xs font-mono font-bold mt-1">Asset Tag: ${m.assetTag} | S/N: ${m.serialNo || '-'} | Dept: ${m.custodianDept || 'General'}</p>` : ''}
          </div>
          <span class="badge ${m.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${m.status}</span>
        </div>

        <!-- Live Stock & Monthly Buffer Meter -->
        <div class="p-4 bg-white border border-slate-200 rounded-sm rounded-sm">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <i data-lucide="gauge" class="w-4 h-4 text-blue-600"></i>
              <span>Live Warehouse Stock Balance vs. Target Buffer</span>
            </span>
            <span class="font-mono text-xs font-bold ${liveStock < buffer * 0.5 ? 'text-amber-600' : 'text-emerald-700'}">
              ${liveStock} / ${buffer} ${m.unit} (${pct}%)
            </span>
          </div>
          <div class="w-full stock-progress-track">
            <div class="stock-progress-fill ${liveStock < buffer * 0.5 ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${pct}%"></div>
          </div>
        </div>

        <!-- Vendor Quotation & Booked MRP Details -->
        <div class="p-4 bg-white border border-slate-200 rounded-sm rounded-sm space-y-3">
          <h4 class="font-bold text-blue-600 text-xs uppercase flex items-center gap-1.5 text-blue-600">
            <i data-lucide="file-spreadsheet" class="w-4 h-4 text-blue-600"></i>
            <span>Vendor Quotation & MRP Pricing Record</span>
          </h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 border border-slate-200 rounded">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Quotation No:</span>
              <strong class="font-mono text-blue-600 text-xs">${m.quotationNo || 'Direct Tender'}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Quotation Date:</span>
              <strong class="font-mono text-slate-700">${m.quotationDate || '-'}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Quotation Rate:</span>
              <strong class="font-mono text-emerald-700 text-sm">₹${Number(m.quotationRate || m.vendor1Rate || 0).toFixed(2)}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Booked MRP:</span>
              <strong class="font-mono text-blue-600 text-sm">₹${Number(m.mrpBooked || 0).toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <!-- Approved Vendor Pricing (Multiple Vendors) -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-blue-600 text-xs uppercase flex items-center gap-1.5 text-blue-600">
              <i data-lucide="store" class="w-4 h-4 text-blue-600"></i>
              <span>Approved Supplier Quotations & Rates (${(m.vendors && m.vendors.length > 0) ? m.vendors.length : (m.vendor1Id ? (m.vendor2Id ? 2 : 1) : 0)})</span>
            </h4>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${((m.vendors && m.vendors.length > 0) ? m.vendors : [
              ...(m.vendor1Id ? [{ vendorId: m.vendor1Id, vendorName: m.vendor1Name, rate: m.vendor1Rate, quotationNo: m.
          gstDocTitle, panDocTitle, bankDocTitle, limAlertDays,
          quotationNo,
 effectiveFrom: m.vendor1RateEffectiveFrom, isPrimary: true }] : []),
              ...(m.vendor2Id ? [{ vendorId: m.vendor2Id, vendorName: m.vendor2Name, rate: m.vendor2Rate, quotationNo: '', effectiveFrom: m.vendor2RateEffectiveFrom, isPrimary: false }] : [])
            ]).map((v, i) => `
              <div class="p-3.5 border-2 ${v.isPrimary ? 'border-blue-300 bg-slate-50/50' : 'border-slate-200 bg-slate-50'} rounded-sm space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs uppercase flex items-center gap-1 ${v.isPrimary ? 'text-blue-600' : 'text-slate-700'}">
                    <i data-lucide="${v.isPrimary ? 'award' : 'building'}" class="w-3.5 h-3.5 ${v.isPrimary ? 'text-blue-600' : 'text-slate-500'}"></i>
                    ${v.isPrimary ? 'Vendor-1 (Primary Source)' : `Vendor-${i + 1} (Alternate Source)`}
                  </span>
                  <span class="font-mono font-bold text-blue-600 text-sm">₹${Number(v.rate || 0).toFixed(2)}</span>
                </div>
                <p class="font-bold text-blue-600 text-xs truncate">${v.vendorName || v.vendorId || 'Approved Vendor'}</p>
                <div class="text-[11px] text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span>Quote: <strong class="font-mono text-blue-600">${v.quotationNo || 'N/A'}</strong></span>
                  <span>Effective: <strong class="font-mono">${v.effectiveFrom || 'Current'}</strong></span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Warranty Coverage & PM (PM displayed only for Fixed Assets) -->
        ${isFixed ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Warranty Card -->
            <div class="p-4 border border-slate-200 bg-slate-50/40 rounded-sm space-y-2">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-blue-950 text-xs uppercase flex items-center gap-1.5">
                  <i data-lucide="shield" class="w-4 h-4 text-blue-600"></i>
                  <span>Warranty Coverage</span>
                </h4>
                <span class="text-xs font-bold ${m.hasWarranty ? 'text-blue-600' : 'text-slate-400'}">
                  ${m.hasWarranty ? 'Active Policy' : 'No Coverage'}
                </span>
              </div>
              ${m.hasWarranty ? `
                <div class="space-y-1 pt-1 text-slate-700">
                  <div><strong>Period:</strong> <span class="font-medium">${m.warrantyPeriod || '1 Year'}</span></div>
                  <div><strong>Valid Till:</strong> <span class="font-mono font-bold text-blue-600">${m.warrantyValidTill || 'N/A'}</span></div>
                  <div><strong>Authorized Vendor:</strong> <span>${m.warrantyVendor || m.vendor1Name || 'Supplier'}</span></div>
                </div>
              ` : `
                <p class="text-slate-500 text-xs italic">Equipment without active warranty coverage.</p>
              `}
            </div>

            <!-- Preventive Maintenance (PM) Card -->
            <div class="p-4 border border-purple-200 bg-purple-50/40 rounded-sm space-y-2">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-purple-950 text-xs uppercase flex items-center gap-1.5">
                  <i data-lucide="wrench" class="w-4 h-4 text-purple-700"></i>
                  <span>Preventive Maintenance (PM)</span>
                </h4>
                <span class="text-xs font-bold ${m.hasPm ? 'text-purple-800' : 'text-slate-400'}">
                  ${m.hasPm ? ` ${m.pmFrequency}` : 'Not Scheduled'}
                </span>
              </div>
              ${m.hasPm ? `
                <div class="space-y-1 pt-1 text-slate-700">
                  <div><strong>Technician:</strong> <span class="font-bold text-blue-600">${m.repairmanName || 'General Tech'}</span></div>
                  <div><strong>Contact Phone:</strong> <span class="font-mono text-purple-900 font-semibold">${m.repairmanContact || '-'}</span></div>
                  <div><strong>Agency:</strong> <span>${m.repairmanAgency || m.pmVendor || 'Authorized Care'}</span></div>
                  <div><strong>Next PM Scheduled:</strong> <span class="font-mono font-bold text-purple-900">${m.nextPmDate || 'Upcoming'}</span></div>
                </div>
              ` : `
                <p class="text-slate-500 text-xs italic">No routine preventive maintenance frequency assigned.</p>
              `}
            </div>
          </div>
        ` : `
          <!-- Warranty Card for Consumable Material (No PM) -->
          <div class="p-4 border border-slate-200 bg-slate-50/40 rounded-sm space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-blue-950 text-xs uppercase flex items-center gap-1.5">
                <i data-lucide="shield" class="w-4 h-4 text-blue-600"></i>
                <span>Warranty Coverage</span>
              </h4>
              <span class="text-xs font-bold ${m.hasWarranty ? 'text-blue-600' : 'text-slate-400'}">
                ${m.hasWarranty ? 'Active Policy' : 'No Coverage'}
              </span>
            </div>
            ${m.hasWarranty ? `
              <div class="space-y-1 pt-1 text-slate-700">
                <div><strong>Period:</strong> <span class="font-medium">${m.warrantyPeriod || '1 Year'}</span></div>
                <div><strong>Valid Till:</strong> <span class="font-mono font-bold text-blue-600">${m.warrantyValidTill || 'N/A'}</span></div>
                <div><strong>Authorized Vendor:</strong> <span>${m.warrantyVendor || m.vendor1Name || 'Supplier'}</span></div>
              </div>
            ` : `
              <p class="text-slate-500 text-xs italic">Standard consumable without manufacturer warranty coverage.</p>
            `}
          </div>
        `}

        <!-- Authorized Consumer Confirmation Box -->
        <div class="p-4 border border-emerald-200 bg-emerald-50/60 rounded-sm space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-emerald-950 text-xs uppercase flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-700"></i>
              <span>Consumable Rate Authorization Details</span>
            </h4>
            <span class="text-xs font-bold ${m.consumerConfirmed ? 'text-emerald-700' : 'text-amber-700'}">
              ${m.consumerConfirmed ? 'Authenticated & Confirmed' : 'Pending Confirmation'}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-slate-700 pt-1">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Authorized Signatory / Dept Head:</span>
              <span class="font-bold text-blue-600">${m.confirmedBy || '-'}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Confirmation Date:</span>
              <span class="font-mono text-blue-600 font-semibold">${m.confirmationDate || '-'}</span>
            </div>
          </div>
          <div class="text-[11px] text-slate-600 bg-white p-2.5 rounded-sm border border-emerald-100">
            <strong>Tender / Contract Reference:</strong> ${m.confirmationRemarks || 'Standard rates verified under rate contract.'}
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="pt-3 border-t border-slate-200 flex justify-between items-center">
          <div class="flex gap-2">
            <button onclick="CMS_PO.openPOModal(); CMS_APP.closeModal();" class="px-3.5 py-2 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm text-xs flex items-center gap-1.5 shadow">
              <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
              <span>Generate PO</span>
            </button>
            ${isFixed && m.hasPm ? `
              <button onclick="CMS_APP.closeModal(); CMS_REPORTS.openLogPmModal('${m.id}');" class="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-sm text-xs flex items-center gap-1.5 shadow">
                <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
                <span>Log PM Service</span>
              </button>
            ` : ''}
            ${isFixed && (m.pmHistory && m.pmHistory.length > 0) ? `
              <button onclick="CMS_PRINT.printPmCertificate({ materialId: '${m.id}', ...(m.pmHistory[0] || {}) });" class="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-300 font-bold rounded-sm text-xs flex items-center gap-1.5 shadow-sm">
                <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                <span>Print Latest PM Cert</span>
              </button>
            ` : ''}
          </div>
          <button onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-sm transition">
            Close
          </button>
        </div>

      </div>
    `;

    window.CMS_APP.openModal('Material 360° Inspection Drawer', content, 'max-w-2xl');
    if (window.lucide) window.lucide.createIcons();
  },


  onMaterialGstSelect(slabId) {
    const store = window.CMS_STORE.data;
    const slab = (store.gstSlabs || []).find(g => g.id === slabId);
    if (!slab) return;
    const summaryEl = document.getElementById('m-tax-summary');
    if (summaryEl) {
      summaryEl.innerText = window.CMS_STORE.getTaxLabel(slab);
    }
  },

  openFixedAssetModal(matId = null) {
    this.openConsumableModal(matId, 'Fixed');
  },

  openConsumableModal(matId = null, forcedType = null) {
    const role = window.CMS_STORE.getRole();
    if (role === 'Admin') {
      return window.CMS_APP.toast('Col. Anita Sharma (Admin) is authorized for review and approval only. Adding or modifying materials must be initiated by User.', 'warning');
    }
    const store = window.CMS_STORE.data;
    const isEdit = Boolean(matId);
    const existing = isEdit ? store.consumables.find(i => i.id === matId) : null;

    let resolvedType = 'Consumer';
    if (existing) {
      resolvedType = existing.inventoryType === 'Fixed' ? 'Fixed' : 'Consumer';
    } else if (forcedType) {
      resolvedType = forcedType === 'Fixed' ? 'Fixed' : 'Consumer';
    } else if (window.location.hash === '#fixed-inventory' || this.consumableTypeFilter === 'Fixed') {
      resolvedType = 'Fixed';
    } else {
      resolvedType = 'Consumer';
    }

    const isFixed = resolvedType === 'Fixed';

    const m = existing ? existing : {
      inventoryType: resolvedType,
      categoryId: '', materialName: '', unit: 'Nos', brand: '', supplierProductCode: '', hsnCode: '',
      taxMode: 'CGST_SGST',
      sgst: 9, cgst: 9, igst: 18,
      quotationNo: '', quotationDate: new Date().toISOString().split('T')[0], quotationRate: '',
      mrpBooked: '',
      assetTag: '', serialNo: '', custodianDept: 'Central Stores',
      hasWarranty: isFixed, warrantyPeriod: isFixed ? '1 Year' : '1 Year', warrantyValidTill: '', warrantyVendor: '',
      hasPm: isFixed, pmFrequency: 'Quarterly', repairmanName: '', repairmanContact: '', repairmanAgency: '', pmVendor: '', nextPmDate: '',
      vendor1Id: '', vendor1Rate: '', vendor1RateEffectiveFrom: '',
      consumerConfirmed: true,
      confirmedBy: 'Dr. A. Verma (Authorized Department Head)',
      confirmationDate: new Date().toISOString().split('T')[0],
      confirmationRemarks: 'Rates approved based on market rate comparison and contract terms',
      avgMonthlyConsumption: 50, initialStock: 0
    };

    const categories = store.categories || [];
    const vendors = (store.vendors || []).filter(v => v.status === "Approved" && !v.isBlocked);

    const content = `
      <form id="mat-form" class="space-y-5 text-xs p-1" onsubmit="event.preventDefault(); CMS_MASTERS.saveConsumable('${matId || ''}', true);">
        <input type="hidden" id="m-inv-type" value="${isFixed ? 'Fixed' : 'Consumer'}" />

        <!-- Header / Scope Bar (Single Unified Form) -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 class="font-bold text-blue-600 text-sm flex items-center gap-2">
              <i data-lucide="${isFixed ? 'cpu' : 'package'}" class="w-4 h-4 ${isFixed ? 'text-blue-600' : 'text-blue-600'}"></i>
              <span>${isEdit ? (isFixed ? 'Edit Fixed Capital Asset' : 'Edit Consumable Material') : (isFixed ? 'New Fixed Capital Asset' : 'New Consumable Material')}</span>
            </h3>
            
          </div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold ${isFixed ? 'bg-slate-50 text-blue-600 border border-slate-200' : 'bg-slate-50 text-blue-600 border border-slate-200'}">
            ${isFixed ? 'Fixed Capital Asset' : 'Consumable Material'}
          </span>
        </div>

        <!-- 1. Item Details -->
        <div class="space-y-3">
          <div class="font-bold text-slate-800 text-xs">
            Item Information & Classification
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Product Category <span class="text-rose-500">*</span></label>
              <select id="m-cat" required class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none">
                <option value="">-- Select Category --</option>
                ${categories.map(c => `<option value="${c.id}" ${m.categoryId === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block font-semibold text-slate-700 mb-1">${isFixed ? 'Fixed Capital Asset Name' : 'Consumable Material Name'} <span class="text-rose-500">*</span></label>
              <input type="text" id="m-name" required value="${m.materialName || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="${isFixed ? 'e.g. HP LaserJet Enterprise Multi-Function Printer' : 'e.g. A4 Copier Paper (75 GSM) / Disinfectant Liquid'}" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Unit of Measurement <span class="text-rose-500">*</span></label>
              <input type="text" id="m-unit" required value="${m.unit || 'Nos'}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="Nos, Box, Rim, Kg, Litre, Roll, Set" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Brand Name <span class="text-rose-500">*</span></label>
              <input type="text" id="m-brand" required value="${m.brand || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="e.g. JK Copier, 3M, Lizol, HP, Daikin" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Supplier Part / SKU Code</label>
              <input type="text" id="m-sku" value="${m.supplierProductCode || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="SKU-8910" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">HSN / SAC Code <span class="text-rose-500">*</span></label>
              <input type="text" id="m-hsn" required value="${m.hsnCode || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="e.g. 4802 or 8443" />
            </div>
            <div class="md:col-span-2">
              <label class="block font-semibold text-slate-700 mb-1">Statutory GST / IGST Slab <span class="text-rose-500">*</span></label>
              <select id="m-gst-slab" onchange="CMS_MASTERS.onMaterialGstSelect(this.value)" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none">
                <option value="">-- Select Configured GST Slab --</option>
                ${(store.gstSlabs || []).filter(g => g.status === 'Approved').map(g => `
                  <option value="${g.id}" ${(m.gstSlabId === g.id || m.taxMode === g.taxMode) ? 'selected' : ''}>
                    ${g.name} — ${window.CMS_STORE.getTaxLabel(g)} (${g.taxMode === 'IGST' ? 'Inter-state IGST' : 'Intra-state CGST+SGST'})
                  </option>
                `).join('')}
              </select>
              <div id="m-tax-summary" class="text-[11px] font-semibold text-blue-600 mt-1">
                ${m.taxMode ? window.CMS_STORE.getTaxLabel(m) : 'Selected tax rate will automatically apply to purchase orders and goods inward.'}
              </div>
            </div>
          </div>

          <!-- Fixed Asset Specific Inputs (Visible ONLY for Fixed Assets) -->
          ${isFixed ? `
            <div id="m-fixed-fields" class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Asset Tag Number <span class="text-rose-500">*</span></label>
                <input type="text" id="m-asset-tag" required value="${m.assetTag || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs font-bold text-blue-600 focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="e.g. AST-PRN-001" />
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Serial Number (S/N)</label>
                <input type="text" id="m-serial-no" value="${m.serialNo || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="e.g. VNC3K92104" />
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Custodian Department</label>
                <input type="text" id="m-custodian-dept" value="${m.custodianDept || 'Central Stores'}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="e.g. Accounts, Facility" />
              </div>
            </div>
          ` : `
            <div id="m-fixed-fields" class="hidden">
              <input type="hidden" id="m-asset-tag" value="" />
              <input type="hidden" id="m-serial-no" value="" />
              <input type="hidden" id="m-custodian-dept" value="" />
            </div>
          `}
        </div>

        <!-- 2. Pricing & Multiple Approved Vendors -->
        <div class="pt-3 border-t border-slate-200 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <i data-lucide="store" class="w-4 h-4 text-blue-600"></i>
                <span>Vendor Quotations & Pricing (Multiple Vendors)</span>
              </div>
              <p class="text-[11px] text-slate-500 mt-0.5">Attach multiple approved vendors, quotation references, and contractual rates.</p>
            </div>
            <button type="button" onclick="CMS_MASTERS.addMaterialVendorRow()" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm transition text-xs shadow">
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>+ Add Vendor</span>
            </button>
          </div>

          <!-- Product Level MRP -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white border border-slate-200 rounded-sm rounded-sm items-center">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Booked MRP (₹) <span class="text-rose-500">*</span></label>
              <input type="number" step="0.01" id="m-mrp" required value="${m.mrpBooked || ''}" class="w-full font-mono font-bold px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-blue-600 text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="0.00" />
            </div>
            <div class="sm:col-span-2 text-[11px] text-slate-500">
              Maximum Retail Price benchmark for statutory audit and procurement saving computation.
            </div>
          </div>

          <!-- Dynamic Multiple Vendor Rows Container -->
          <div id="m-vendor-container" class="space-y-3">
            <!-- Dynamically populated by CMS_MASTERS.addMaterialVendorRow -->
          </div>

          <div class="flex justify-start pt-1">
            <button type="button" onclick="CMS_MASTERS.addMaterialVendorRow()" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-blue-600 border border-blue-300 font-bold rounded-sm transition text-xs shadow-sm">
              <i data-lucide="plus" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Add Another Vendor</span>
            </button>
          </div>
        </div>

        <!-- 3. Stock Target & Buffers -->
        <div class="pt-3 border-t border-slate-200 space-y-3">
          <div class="font-bold text-slate-800 text-xs">
            Stock Buffer & Opening Balance
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Average Monthly Consumption (Buffer Target) <span class="text-rose-500">*</span></label>
              <input type="number" id="m-monthly" required value="${m.avgMonthlyConsumption || 0}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="100" />
              <p class="text-[10px] text-slate-500 mt-0.5">Used by Purchase Order assistant to calculate reorder quotas.</p>
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Initial Opening Stock Balance</label>
              <input type="number" id="m-init-stock" value="${m.initialStock || 0}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none" ${isEdit ? 'disabled title="Stock is adjusted via Inward Receipts and Stock Adjustments."' : ''} />
            </div>
          </div>
        </div>

        <!-- 4. Warranty & Maintenance (PM only visible for Fixed Assets) -->
        <div class="pt-3 border-t border-slate-200 space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-800 text-xs">${isFixed ? 'Warranty & Maintenance' : 'Warranty Coverage'}</span>
            <div class="flex items-center gap-4">
              <label class="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700">
                <input type="checkbox" id="m-has-warranty" ${m.hasWarranty ? 'checked' : ''} onchange="CMS_MASTERS.toggleWarrantyFields(this.checked)" class="w-4 h-4 text-blue-600 rounded focus:ring-slate-500" />
                <span>Warranty Applicable</span>
              </label>
              ${isFixed ? `
                <label class="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700">
                  <input type="checkbox" id="m-has-pm" ${m.hasPm ? 'checked' : ''} onchange="CMS_MASTERS.togglePmFields(this.checked)" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                  <span>PM Required</span>
                </label>
              ` : ''}
            </div>
          </div>

          <div id="m-warranty-fields" class="${m.hasWarranty ? '' : 'hidden'} grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white border border-slate-200 rounded-sm rounded-sm">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Warranty Period</label>
              <input type="text" id="m-warranty-period" value="${m.warrantyPeriod || '1 Year Comprehensive'}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs" placeholder="e.g. 1 Year, 3 Years" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Warranty Valid Till</label>
              <input type="date" id="m-warranty-till" value="${m.warrantyValidTill || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs font-mono" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Warranty Partner / Vendor</label>
              <input type="text" id="m-warranty-vendor" value="${m.warrantyVendor || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs" placeholder="e.g. HP Authorised Care" />
            </div>
          </div>

          ${isFixed ? `
            <div id="m-pm-fields" class="${m.hasPm ? '' : 'hidden'} space-y-2.5 p-4 bg-white border border-slate-200 rounded-sm rounded-sm">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">PM Frequency</label>
                  <select id="m-pm-freq" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs">
                    <option value="Monthly" ${m.pmFrequency === 'Monthly' ? 'selected' : ''}>Monthly (Every 30 Days)</option>
                    <option value="Bi-Monthly" ${m.pmFrequency === 'Bi-Monthly' ? 'selected' : ''}>Bi-Monthly (Every 60 Days)</option>
                    <option value="Quarterly" ${m.pmFrequency === 'Quarterly' ? 'selected' : ''}>Quarterly (Every 90 Days)</option>
                    <option value="Half-Yearly" ${m.pmFrequency === 'Half-Yearly' ? 'selected' : ''}>Half-Yearly (Every 180 Days)</option>
                    <option value="Annual" ${m.pmFrequency === 'Annual' ? 'selected' : ''}>Annual (Every 365 Days)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Designated Technician</label>
                  <input type="text" id="m-pm-repairman-name" value="${m.repairmanName || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs" placeholder="e.g. Sanjay Rawat" />
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Technician Contact Phone</label>
                  <input type="text" id="m-pm-repairman-contact" value="${m.repairmanContact || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs font-mono" placeholder="+91 98114 99012" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Technician Agency</label>
                  <input type="text" id="m-pm-repairman-agency" value="${m.repairmanAgency || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs" placeholder="e.g. Kent Service Care" />
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">PM Authorized Vendor</label>
                  <input type="text" id="m-pm-vendor" value="${m.pmVendor || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs" placeholder="e.g. GreenClean Corp" />
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Next Scheduled PM Date</label>
                  <input type="date" id="m-pm-next-date" value="${m.nextPmDate || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs font-mono" />
                </div>
              </div>
            </div>
          ` : `
            <div id="m-pm-fields" class="hidden">
              <input type="checkbox" id="m-has-pm" class="hidden" />
              <input type="hidden" id="m-pm-freq" value="Quarterly" />
              <input type="hidden" id="m-pm-repairman-name" value="" />
              <input type="hidden" id="m-pm-repairman-contact" value="" />
              <input type="hidden" id="m-pm-repairman-agency" value="" />
              <input type="hidden" id="m-pm-vendor" value="" />
              <input type="hidden" id="m-pm-next-date" value="" />
            </div>
          `}
        </div>

        <!-- 5. Rate Confirmation & Audit -->
        <div class="pt-3 border-t border-slate-200 space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-800 text-xs">Rate Confirmation & Audit</span>
            <label class="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700">
              <input type="checkbox" id="m-conf" ${m.consumerConfirmed ? 'checked' : ''} class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
              <span>Confirmed by Admin</span>
            </label>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Admin Name / Post</label>
              <input type="text" id="m-conf-by" value="${m.confirmedBy || ''}" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white focus:outline-none" placeholder="e.g. Col. Anita Sharma (Store Admin)" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Confirmation Date</label>
              <input type="date" id="m-conf-date" value="${m.confirmationDate || ''}" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Tender / Rate Contract Ref</label>
              <input type="text" id="m-conf-remarks" value="${m.confirmationRemarks || ''}" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white" placeholder="e.g. Annual Rate Contract Q3 Ref #77" />
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-sm transition text-xs">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition flex items-center gap-1.5 text-xs">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Save to Master & Submit</span>
          </button>
        </div>
      </form>
    `;

    const modalTitle = isEdit 
      ? (isFixed ? 'Modify Fixed Capital Asset' : 'Modify Consumable Material')
      : (isFixed ? 'Add Fixed Capital Asset' : 'Add Consumable Material');
    window.CMS_APP.openModal(modalTitle, content, 'max-w-4xl');

    // Populate multiple vendor quotation rows
    let vList = [];
    if (Array.isArray(m.vendors) && m.vendors.length > 0) {
      vList = m.vendors;
    } else {
      if (m.vendor1Id || m.quotationNo || m.quotationRate) {
        vList.push({
          vendorId: m.vendor1Id || '',
          vendorName: m.vendor1Name || '',
          quotationNo: m.quotationNo || '',
          quotationDate: m.quotationDate || new Date().toISOString().split('T')[0],
          rate: m.quotationRate || m.vendor1Rate || '',
          effectiveFrom: m.vendor1RateEffectiveFrom || new Date().toISOString().split('T')[0],
          isPrimary: true
        });
      }
      if (m.vendor2Id) {
        vList.push({
          vendorId: m.vendor2Id || '',
          vendorName: m.vendor2Name || '',
          quotationNo: '',
          quotationDate: '',
          rate: m.vendor2Rate || '',
          effectiveFrom: m.vendor2RateEffectiveFrom || new Date().toISOString().split('T')[0],
          isPrimary: false
        });
      }
    }

    if (vList.length === 0) {
      vList.push({
        vendorId: '',
        vendorName: '',
        quotationNo: '',
        quotationDate: new Date().toISOString().split('T')[0],
        rate: '',
        effectiveFrom: new Date().toISOString().split('T')[0],
        isPrimary: true
      });
    }

    vList.forEach((vData, idx) => {
      this.addMaterialVendorRow(vData, vData.isPrimary ?? (idx === 0));
    });

    if (window.lucide) window.lucide.createIcons();
  },

  saveConsumable(matId, directSubmit = false) {
    const role = window.CMS_STORE.getRole();
    if (role === 'Admin') {
      return window.CMS_APP.toast('Col. Anita Sharma (Admin) is authorized for review and approval only. Adding or modifying materials must be initiated by User.', 'warning');
    }
    const store = window.CMS_STORE;
    const inventoryType = document.getElementById('m-inv-type').value;
    const catId = document.getElementById('m-cat').value;
    const category = store.data.categories.find(c => c.id === catId);
    const materialName = document.getElementById('m-name').value.trim();
    const unit = document.getElementById('m-unit').value.trim();
    const brand = document.getElementById('m-brand').value.trim();
    const supplierProductCode = document.getElementById('m-sku').value.trim();
    const hsnCode = document.getElementById('m-hsn').value.trim();
    const gstSlabId = document.getElementById('m-gst-slab')?.value || '';
    const selectedSlab = store.data.gstSlabs ? store.data.gstSlabs.find(g => g.id === gstSlabId) : null;
    let taxMode = 'CGST_SGST';
    let sgst = 9, cgst = 9, igst = 18;
    if (selectedSlab) {
      taxMode = selectedSlab.taxMode || (selectedSlab.igst > 0 && selectedSlab.cgst === 0 ? 'IGST' : 'CGST_SGST');
      sgst = Number(selectedSlab.sgst) || 0;
      cgst = Number(selectedSlab.cgst) || 0;
      igst = Number(selectedSlab.igst) || (sgst + cgst);
    } else {
      const modeRadio = document.querySelector('input[name="m-tax-mode"]:checked')?.value;
      if (modeRadio) taxMode = modeRadio;
      sgst = parseFloat(document.getElementById('m-sgst')?.value) || 9;
      cgst = parseFloat(document.getElementById('m-cgst')?.value) || 9;
      igst = parseFloat(document.getElementById('m-igst')?.value) || 18;
    }

    const mrpBooked = parseFloat(document.getElementById('m-mrp')?.value) || 0;

    // Extract multiple vendor rows
    const vendorRows = document.querySelectorAll('#m-vendor-container .mat-vendor-row');
    const vendorsList = [];
    for (const r of vendorRows) {
      const vId = r.querySelector('.mat-v-select')?.value || '';
      const vObj = store.data.vendors.find(v => v.id === vId);
      const qNo = r.querySelector('.mat-v-quote-no')?.value.trim() || '';
      const qDate = r.querySelector('.mat-v-quote-date')?.value || '';
      const qRate = parseFloat(r.querySelector('.mat-v-rate')?.value) || 0;
      const effFrom = r.querySelector('.mat-v-eff-date')?.value || '';
      const isPrim = r.querySelector('input[type="radio"]')?.checked || (vendorsList.length === 0);

      if (vId || qNo || qRate > 0) {
        vendorsList.push({
          vendorId: vId,
          vendorName: vObj ? vObj.name : '',
          quotationNo: qNo,
          quotationDate: qDate,
          rate: qRate,
          effectiveFrom: effFrom,
          isPrimary: isPrim
        });
      }
    }

    // Determine primary and secondary vendor for backwards compatibility
    const primaryVendor = vendorsList.find(v => v.isPrimary) || vendorsList[0] || {};
    const secondaryVendor = vendorsList.find(v => v !== primaryVendor) || {};

    const quotationNo = primaryVendor.quotationNo || '';
    const quotationDate = primaryVendor.quotationDate || '';
    const quotationRate = primaryVendor.rate || 0;
    const v1Id = primaryVendor.vendorId || '';
    const v1 = store.data.vendors.find(v => v.id === v1Id);
    const v1Rate = quotationRate;
    const v1RateEffectiveFrom = primaryVendor.effectiveFrom || '';

    const v2Id = secondaryVendor.vendorId || '';
    const v2 = store.data.vendors.find(v => v.id === v2Id);
    const v2Rate = secondaryVendor.rate || 0;
    const v2RateEffectiveFrom = secondaryVendor.effectiveFrom || '';

    const assetTag = document.getElementById('m-asset-tag')?.value.trim() || '';
    const serialNo = document.getElementById('m-serial-no')?.value.trim() || '';
    const custodianDept = document.getElementById('m-custodian-dept')?.value.trim() || 'Central Stores';

    const hasWarranty = document.getElementById('m-has-warranty').checked;
    const warrantyPeriod = document.getElementById('m-warranty-period')?.value.trim() || '';
    const warrantyValidTill = document.getElementById('m-warranty-till')?.value || '';
    const warrantyVendor = document.getElementById('m-warranty-vendor')?.value.trim() || '';

    const hasPm = inventoryType === 'Fixed' ? (document.getElementById('m-has-pm')?.checked || false) : false;
    const pmFrequency = inventoryType === 'Fixed' ? (document.getElementById('m-pm-freq')?.value || 'Quarterly') : '';
    const repairmanName = document.getElementById('m-pm-repairman-name')?.value.trim() || '';
    const repairmanContact = document.getElementById('m-pm-repairman-contact')?.value.trim() || '';
    const repairmanAgency = document.getElementById('m-pm-repairman-agency')?.value.trim() || '';
    const pmVendor = document.getElementById('m-pm-vendor')?.value.trim() || '';
    const nextPmDate = document.getElementById('m-pm-next-date')?.value || '';

    const consumerConfirmed = document.getElementById('m-conf').checked;
    const confirmedBy = document.getElementById('m-conf-by').value.trim();
    const confirmationDate = document.getElementById('m-conf-date').value;
    const confirmationRemarks = document.getElementById('m-conf-remarks').value.trim();

    const avgMonthlyConsumption = parseFloat(document.getElementById('m-monthly').value) || 0;
    const initStockEl = document.getElementById('m-init-stock');
    const initialStock = initStockEl ? (parseFloat(initStockEl.value) || 0) : 0;

    if (!materialName || !unit) {
      alert('Please fill all required fields');
      return;
    }

    if (matId) {
      const idx = store.data.consumables.findIndex(m => m.id === matId);
      if (idx !== -1) {
        store.data.consumables[idx] = {
          ...store.data.consumables[idx],
          inventoryType,
          categoryId: catId,
          categoryName: category ? category.name : store.data.consumables[idx].categoryName,
          materialName, unit, brand, supplierProductCode, hsnCode,
          gstSlabId, taxMode, sgst, cgst, igst,
          
          gstDocTitle, panDocTitle, bankDocTitle, limAlertDays,
          quotationNo,
 quotationDate, quotationRate, mrpBooked,
          assetTag, serialNo, custodianDept,
          hasWarranty, warrantyPeriod, warrantyValidTill, warrantyVendor,
          hasPm, pmFrequency, repairmanName, repairmanContact, repairmanAgency, pmVendor, nextPmDate,
          vendors: vendorsList,
          vendor1Id: v1Id, vendor1Name: v1 ? v1.name : (primaryVendor.vendorName || ''), vendor1Rate: v1Rate, vendor1RateEffectiveFrom: v1RateEffectiveFrom,
          vendor2Id: v2Id, vendor2Name: v2 ? v2.name : (secondaryVendor.vendorName || ''), vendor2Rate: v2Rate, vendor2RateEffectiveFrom: v2RateEffectiveFrom,
          consumerConfirmed, confirmedBy, confirmationDate, confirmationRemarks,
          avgMonthlyConsumption,
          status: directSubmit ? 'Pending Approval' : store.data.consumables[idx].status,
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      const prefix = inventoryType === 'Fixed' ? 'MAT-FIX-' : 'MAT-';
      const newId = prefix + String(Date.now()).slice(-6);
      store.data.consumables.push({
        id: newId,
        inventoryType,
        categoryId: catId,
        categoryName: category ? category.name : 'General',
        materialName, unit, brand, supplierProductCode, hsnCode,
        gstSlabId, taxMode, sgst, cgst, igst,
        
          gstDocTitle, panDocTitle, bankDocTitle, limAlertDays,
          quotationNo,
 quotationDate, quotationRate, mrpBooked,
        assetTag: assetTag || (inventoryType === 'Fixed' ? `AST-${newId}` : ''),
        serialNo, custodianDept,
        hasWarranty, warrantyPeriod, warrantyValidTill, warrantyVendor,
        hasPm, pmFrequency, repairmanName, repairmanContact, repairmanAgency, pmVendor, nextPmDate,
        vendors: vendorsList,
        vendor1Id: v1Id, vendor1Name: v1 ? v1.name : (primaryVendor.vendorName || ''), vendor1Rate: v1Rate, vendor1RateEffectiveFrom: v1RateEffectiveFrom,
        vendor2Id: v2Id, vendor2Name: v2 ? v2.name : (secondaryVendor.vendorName || ''), vendor2Rate: v2Rate, vendor2RateEffectiveFrom: v2RateEffectiveFrom,
        consumerConfirmed, confirmedBy, confirmationDate, confirmationRemarks,
        avgMonthlyConsumption, initialStock,
        status: directSubmit ? 'Pending Approval' : 'Draft',
        createdAt: new Date().toISOString()
      });
    }

    // Automatically synchronize quotation details to the primary vendor
    if (quotationNo && v1Id) {
      const v = store.data.vendors.find(ven => ven.id === v1Id);
      if (v) {
        if (!v.quotationNo || v.quotationNo === quotationNo) {
          v.quotationNo = quotationNo;
          if (quotationDate) v.quotationDate = quotationDate;
          v.quotedMaterialId = matId || store.data.consumables[store.data.consumables.length - 1].id;
          v.quotedMaterialName = materialName;
          v.quotedMaterialRate = quotationRate || v1Rate;
          v.quotedMaterialUnit = unit;
          v.quotedMaterialHsn = hsnCode;
        }
      }
    }

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(directSubmit ? 'Material saved and submitted for approval!' : 'Material saved successfully!');
    
    const dropdowns = document.querySelectorAll('.q-mat-id');
    if (dropdowns.length > 0) {
      const mats = store.data.consumables;
      const latest = mats[mats.length - 1];
      dropdowns.forEach(dd => {
         const opt = document.createElement('option');
         opt.value = latest.id;
         opt.dataset.name = latest.materialName;
         opt.dataset.rate = latest.quotationRate || latest.vendor1Rate || 0;
         opt.dataset.mrp = latest.mrpBooked || '';
         opt.dataset.unit = latest.unit || 'Nos';
         opt.dataset.hsn = latest.hsnCode || '';
         opt.text = `[${latest.inventoryType || 'Consumer'}] ${latest.materialName} - Code: ${latest.id}`;
         dd.appendChild(opt);
         dd.value = latest.id;
         dd.dispatchEvent(new Event('change'));
      });
    }

    window.CMS_APP.refreshView();
  },

  
  openConsumableSanctionModal(matId) {
    const m = window.CMS_STORE.data.consumables.find(i => i.id === matId);
    if (!m) return;
    const docs = [];
    if (m.quotationDoc) docs.push({ label: 'Approved Rate Quotation', fileName: m.quotationDoc, partyName: m.materialName });
    if (m.warrantyCardDoc) docs.push({ label: 'Warranty Policy Card', fileName: m.warrantyCardDoc, partyName: m.materialName });

    const summaryHtml = `
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-bold text-blue-600 text-sm">${m.materialName}</span>
          <span class="font-mono text-slate-500 font-bold">${m.id}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
          <div>Category: <strong class="text-slate-800">${m.categoryName}</strong></div>
          <div>Unit / HSN: <strong class="text-slate-800">${m.unit} | ${m.hsnCode}</strong></div>
          <div>Primary Vendor: <strong class="text-slate-800">${m.vendor1Name}</strong></div>
          <div>Approved Rate: <strong class="font-mono text-emerald-700 font-bold">₹${Number(m.vendor1Rate || 0).toFixed(2)}</strong></div>
        </div>
      </div>
    `;

    window.CMS_APP.promptSanctionApproval({
      title: m.materialName,
      id: m.id,
      entityType: 'consumable',
      summaryHtml,
      documents: docs,
      onConfirm: `() => CMS_MASTERS.approveConsumable('${matId}')`
    });
  },

  openConsumableRejectModal(matId) {
    const m = window.CMS_STORE.data.consumables.find(i => i.id === matId);
    if (!m) return;
    window.CMS_APP.promptRejection({
      title: m.materialName,
      id: m.id,
      entityType: 'consumable',
      onReject: `(remark) => CMS_MASTERS.rejectConsumableWithRemark('${matId}', remark)`
    });
  },

  rejectConsumableWithRemark(matId, mistakeRemark) {
    const res = window.CMS_STORE.rejectRecord('consumable', matId, mistakeRemark);
    if (res.success) {
      window.CMS_APP.toast(`Material returned to Operation Manager (Rajesh Kumar). Mistake reported: "${mistakeRemark}"`, 'error');
      window.CMS_APP.refreshView();
    }
  },

  approveConsumable(matId) {
    const store = window.CMS_STORE;
    const m = store.data.consumables.find(i => i.id === matId);
    if (!m) return;
    const check = store.canApprove(m);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    m.status = 'Approved';
    m.approvedAt = new Date().toISOString();
    m.approvedBy = currentUser.id;
    m.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`Consumable "${m.materialName}" sanctioned by ${currentUser.name}!`, 'success');
    window.CMS_APP.refreshView();
  },

  deleteConsumable(matId) { window.CMS_APP.toast("Master deletion is disabled for statutory audit integrity.", "error"); },

  // ==========================================
  // GST / IGST SLAB MASTER
  // ==========================================
  renderGstSlabs() {
    const store = window.CMS_STORE.data;
    const role = window.CMS_STORE.getRole();
    const list = store.gstSlabs || [];

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-slate-50 text-blue-600 flex items-center justify-center">
                <i data-lucide="percent" class="w-4 h-4"></i>
              </div>
              <span>GST / IGST Slab Master</span>
            </h2>
            
          </div>
          <button onclick="CMS_MASTERS.openGstModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition text-xs">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Add GST Slab</span>
          </button>
        </div>

        <div class="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-4">Slab Code</th>
                <th class="p-4">Slab Name</th>
                <th class="p-4">Active Tax Mode</th>
                <th class="p-4">Active Rate(s)</th>
                <th class="p-4">Custom Notes / Statutory Scope</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${list.length === 0 ? `
                <tr><td colspan="7" class="p-12 text-center text-slate-400">No GST slabs defined.</td></tr>
              ` : list.map(g => `
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-4 font-mono font-semibold text-slate-500">${g.id}</td>
                  <td class="p-4 font-bold text-blue-600 text-sm">${g.name}</td>
                  <td class="p-4 font-semibold">${window.CMS_STORE.getTaxMode(g) === 'IGST' ? 'IGST (Inter-state)' : 'CGST + SGST (Intra-state)'}</td>
                  <td class="p-4 font-mono font-bold text-blue-600">${window.CMS_STORE.getTaxLabel(g)}</td>
                  <td class="p-4 text-slate-600">${g.remarks || '-'}</td>
                  <td class="p-4">
                    <span class="badge ${g.status === 'Approved' ? 'badge-approved' : g.status === 'Pending Approval' ? 'badge-pending' : 'badge-draft'}">
                      ${g.status}
                    </span>
                  </td>
                  <td class="p-4 text-right space-x-1">
                    <button onclick="CMS_MASTERS.openGstModal('${g.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-sm transition">
                      <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                    </button>
                    ${g.status === 'Pending Approval' && role === 'Admin' ? `
                      <button onclick="CMS_MASTERS.approveGst('${g.id}')" class="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-sm transition">
                        Approve
                      </button>
                    ` : ''}
                    <button onclick="CMS_MASTERS.deleteGst('${g.id}')" class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-sm transition">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },


  syncGstRate(source) {
    const sgstEl = document.getElementById('g-sgst');
    const cgstEl = document.getElementById('g-cgst');
    const igstEl = document.getElementById('g-igst');
    if (!sgstEl || !cgstEl || !igstEl) return;

    if (source === 'sgst') {
      const val = parseFloat(sgstEl.value) || 0;
      cgstEl.value = val;
      igstEl.value = (val * 2).toFixed(2);
    } else if (source === 'cgst') {
      const val = parseFloat(cgstEl.value) || 0;
      sgstEl.value = val;
      igstEl.value = (val * 2).toFixed(2);
    } else if (source === 'igst') {
      // Automatically divide by 2 and fill answers in CGST + SGST
      const val = parseFloat(igstEl.value) || 0;
      const half = (val / 2).toFixed(2);
      sgstEl.value = half;
      cgstEl.value = half;
    }
    this.updateTaxSummary('g');
  },

  openGstModal(gstId = null) {
    const isEdit = Boolean(gstId);
    const slab = isEdit ? window.CMS_STORE.data.gstSlabs.find(g => g.id === gstId) : {
      name: '', taxMode: 'CGST_SGST', sgst: 9, cgst: 9, igst: 18, remarks: ''
    };

    const content = `
      <form id="gst-form" class="space-y-4 text-xs" onsubmit="event.preventDefault(); CMS_MASTERS.saveGst('${gstId || ''}', true);">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Slab Name *</label>
          <input type="text" id="g-name" required value="${slab.name || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:outline-none" placeholder="e.g. GST 18%, GST 5%, Exempted" />
        </div>
        <div class="p-3 border border-slate-200 rounded-sm bg-white">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <label class="block font-bold text-slate-700">Tax Type *</label>
            <div class="flex items-center gap-3 text-[11px] font-semibold">
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="g-tax-mode" value="CGST_SGST" ${window.CMS_STORE.getTaxMode(slab) === 'CGST_SGST' ? 'checked' : ''} onchange="CMS_MASTERS.toggleTaxMode('g', this.value)" />
                CGST + SGST (Intra-state)
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="g-tax-mode" value="IGST" ${window.CMS_STORE.getTaxMode(slab) === 'IGST' ? 'checked' : ''} onchange="CMS_MASTERS.toggleTaxMode('g', this.value)" />
                IGST (Inter-state)
              </label>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div id="g-cgst-sgst-fields" class="sm:col-span-2 grid grid-cols-2 gap-1.5 ${window.CMS_STORE.getTaxMode(slab) === 'IGST' ? 'tax-fields-disabled' : ''}">
              <input type="number" step="0.01" id="g-sgst" value="${slab.sgst ?? 9}" ${window.CMS_STORE.getTaxMode(slab) === 'IGST' ? 'disabled' : ''} oninput="CMS_MASTERS.syncGstRate('sgst')" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="SGST %" />
              <input type="number" step="0.01" id="g-cgst" value="${slab.cgst ?? 9}" ${window.CMS_STORE.getTaxMode(slab) === 'IGST' ? 'disabled' : ''} oninput="CMS_MASTERS.syncGstRate('cgst')" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="CGST %" />
            </div>
            <div id="g-igst-field" class="${window.CMS_STORE.getTaxMode(slab) === 'CGST_SGST' ? 'tax-fields-disabled' : ''}">
              <input type="number" step="0.01" id="g-igst" value="${slab.igst ?? 18}" ${window.CMS_STORE.getTaxMode(slab) === 'CGST_SGST' ? 'disabled' : ''} oninput="CMS_MASTERS.syncGstRate('igst')" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="IGST %" />
            </div>
          </div>
          <div id="g-tax-summary" class="mt-2 text-[11px] font-bold text-blue-600">${window.CMS_STORE.getTaxLabel(slab)}</div>
          <p class="text-[10px] text-slate-500 mt-2">Only the selected tax type is active for this slab.</p>
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Custom Notes / Statutory Scope</label>
          <input type="text" id="g-remarks" value="${slab.remarks || ''}" class="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Applicable commodity scope or special statutory rules" />
        </div>
        <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
          <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-sm transition">Cancel</button>
          <button type="submit" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition">Submit for Approval</button>
        </div>
      </form>
    `;

    window.CMS_APP.openModal(isEdit ? 'Modify GST Slab' : 'Add GST / IGST Slab', content);
  },

  saveGst(gstId, directSubmit = false) {
    const name = document.getElementById('g-name').value.trim();
    const taxMode = document.querySelector('input[name="g-tax-mode"]:checked')?.value || 'CGST_SGST';
    const sgst = taxMode === 'CGST_SGST' ? (parseFloat(document.getElementById('g-sgst').value) || 0) : 0;
    const cgst = taxMode === 'CGST_SGST' ? (parseFloat(document.getElementById('g-cgst').value) || 0) : 0;
    const igst = taxMode === 'IGST' ? (parseFloat(document.getElementById('g-igst').value) || 0) : 0;
    const remarks = document.getElementById('g-remarks').value.trim();
    const store = window.CMS_STORE;

    if (gstId) {
      const idx = store.data.gstSlabs.findIndex(g => g.id === gstId);
      if (idx !== -1) {
        store.data.gstSlabs[idx] = {
          ...store.data.gstSlabs[idx],
          name, taxMode, sgst, cgst, igst, remarks,
          status: directSubmit ? 'Pending Approval' : store.data.gstSlabs[idx].status
        };
      }
    } else {
      const newId = 'GST-' + String(Date.now()).slice(-6);
      store.data.gstSlabs.push({
        id: newId,
        name, taxMode, sgst, cgst, igst, remarks,
        status: directSubmit ? 'Pending Approval' : 'Draft',
        createdAt: new Date().toISOString()
      });
    }

    store.save();
    window.CMS_APP.closeModal();
    window.CMS_APP.toast(directSubmit ? 'GST slab submitted for approval!' : 'GST slab saved!');
    window.CMS_APP.refreshView();
  },

  approveGst(gstId) {
    const store = window.CMS_STORE;
    const g = store.data.gstSlabs.find(i => i.id === gstId);
    if (!g) return;
    const check = store.canApprove(g);
    if (!check.allowed) {
      window.CMS_APP.toast(check.reason, 'error');
      return;
    }
    const currentUser = store.getCurrentUser();
    g.status = 'Approved';
    g.approvedAt = new Date().toISOString();
    g.approvedBy = currentUser.id;
    g.approvedByName = currentUser.name;
    store.save();
    window.CMS_APP.toast(`GST Slab "${g.name}" sanctioned by ${currentUser.name}!`, 'success');
    window.CMS_APP.refreshView();
  },

  deleteGst(gstId) {
    if (confirm('Delete this GST slab?')) {
      const store = window.CMS_STORE;
      store.data.gstSlabs = store.data.gstSlabs.filter(g => g.id !== gstId);
      store.save();
      window.CMS_APP.toast('GST slab deleted!', 'info');
      window.CMS_APP.refreshView();
    }
  }
};




























