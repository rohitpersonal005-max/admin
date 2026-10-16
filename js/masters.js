/**
 * Adminutes - Masters Module Engine
 * Handles Vendor Master, Consumable Category Master, Consumable (Material) Master
 * with Rate Effective From & Authorized Consumer Confirmation, and GST/IGST Slabs.
 * Includes Live Search, Category Filters, and Material 360� Inspection Drawers.
 */

window.CMS_MASTERS = {
  vendorSearchQuery: '',
  vendorStatusFilter: 'ALL',
  vendorStateFilter: 'ALL',
  consumableSearchQuery: '',
  countries: [
      { name: 'Afghanistan', code: '+93' },
      { name: 'Albania', code: '+355' },
      { name: 'Algeria', code: '+213' },
      { name: 'Andorra', code: '+376' },
      { name: 'Angola', code: '+244' },
      { name: 'Antigua and Barbuda', code: '+1' },
      { name: 'Argentina', code: '+54' },
      { name: 'Armenia', code: '+374' },
      { name: 'Australia', code: '+61' },
      { name: 'Austria', code: '+43' },
      { name: 'Azerbaijan', code: '+994' },
      { name: 'Bahamas', code: '+1' },
      { name: 'Bahrain', code: '+973' },
      { name: 'Bangladesh', code: '+880' },
      { name: 'Barbados', code: '+1' },
      { name: 'Belarus', code: '+375' },
      { name: 'Belgium', code: '+32' },
      { name: 'Belize', code: '+501' },
      { name: 'Benin', code: '+229' },
      { name: 'Bhutan', code: '+975' },
      { name: 'Bolivia', code: '+591' },
      { name: 'Bosnia and Herzegovina', code: '+387' },
      { name: 'Botswana', code: '+267' },
      { name: 'Brazil', code: '+55' },
      { name: 'Brunei', code: '+673' },
      { name: 'Bulgaria', code: '+359' },
      { name: 'Burkina Faso', code: '+226' },
      { name: 'Burundi', code: '+257' },
      { name: 'Cabo Verde', code: '+238' },
      { name: 'Cambodia', code: '+855' },
      { name: 'Cameroon', code: '+237' },
      { name: 'Canada', code: '+1' },
      { name: 'Central African Republic', code: '+236' },
      { name: 'Chad', code: '+235' },
      { name: 'Chile', code: '+56' },
      { name: 'China', code: '+86' },
      { name: 'Colombia', code: '+57' },
      { name: 'Comoros', code: '+269' },
      { name: 'Congo', code: '+242' },
      { name: 'Costa Rica', code: '+506' },
      { name: 'Croatia', code: '+385' },
      { name: 'Cuba', code: '+53' },
      { name: 'Cyprus', code: '+357' },
      { name: 'Czechia', code: '+420' },
      { name: 'Denmark', code: '+45' },
      { name: 'Djibouti', code: '+253' },
      { name: 'Dominica', code: '+1' },
      { name: 'Dominican Republic', code: '+1' },
      { name: 'Ecuador', code: '+593' },
      { name: 'Egypt', code: '+20' },
      { name: 'El Salvador', code: '+503' },
      { name: 'Equatorial Guinea', code: '+240' },
      { name: 'Eritrea', code: '+291' },
      { name: 'Estonia', code: '+372' },
      { name: 'Eswatini', code: '+268' },
      { name: 'Ethiopia', code: '+251' },
      { name: 'Fiji', code: '+679' },
      { name: 'Finland', code: '+358' },
      { name: 'France', code: '+33' },
      { name: 'Gabon', code: '+241' },
      { name: 'Gambia', code: '+220' },
      { name: 'Georgia', code: '+995' },
      { name: 'Germany', code: '+49' },
      { name: 'Ghana', code: '+233' },
      { name: 'Greece', code: '+30' },
      { name: 'Grenada', code: '+1' },
      { name: 'Guatemala', code: '+502' },
      { name: 'Guinea', code: '+224' },
      { name: 'Guinea-Bissau', code: '+245' },
      { name: 'Guyana', code: '+592' },
      { name: 'Haiti', code: '+509' },
      { name: 'Honduras', code: '+504' },
      { name: 'Hungary', code: '+36' },
      { name: 'Iceland', code: '+354' },
      { name: 'India', code: '+91' },
      { name: 'Indonesia', code: '+62' },
      { name: 'Iran', code: '+98' },
      { name: 'Iraq', code: '+964' },
      { name: 'Ireland', code: '+353' },
      { name: 'Israel', code: '+972' },
      { name: 'Italy', code: '+39' },
      { name: 'Jamaica', code: '+1' },
      { name: 'Japan', code: '+81' },
      { name: 'Jordan', code: '+962' },
      { name: 'Kazakhstan', code: '+7' },
      { name: 'Kenya', code: '+254' },
      { name: 'Kiribati', code: '+686' },
      { name: 'Kuwait', code: '+965' },
      { name: 'Kyrgyzstan', code: '+996' },
      { name: 'Laos', code: '+856' },
      { name: 'Latvia', code: '+371' },
      { name: 'Lebanon', code: '+961' },
      { name: 'Lesotho', code: '+266' },
      { name: 'Liberia', code: '+231' },
      { name: 'Libya', code: '+218' },
      { name: 'Liechtenstein', code: '+423' },
      { name: 'Lithuania', code: '+370' },
      { name: 'Luxembourg', code: '+352' },
      { name: 'Madagascar', code: '+261' },
      { name: 'Malawi', code: '+265' },
      { name: 'Malaysia', code: '+60' },
      { name: 'Maldives', code: '+960' },
      { name: 'Mali', code: '+223' },
      { name: 'Malta', code: '+356' },
      { name: 'Marshall Islands', code: '+692' },
      { name: 'Mauritania', code: '+222' },
      { name: 'Mauritius', code: '+230' },
      { name: 'Mexico', code: '+52' },
      { name: 'Micronesia', code: '+691' },
      { name: 'Moldova', code: '+373' },
      { name: 'Monaco', code: '+377' },
      { name: 'Mongolia', code: '+976' },
      { name: 'Montenegro', code: '+382' },
      { name: 'Morocco', code: '+212' },
      { name: 'Mozambique', code: '+258' },
      { name: 'Myanmar', code: '+95' },
      { name: 'Namibia', code: '+264' },
      { name: 'Nauru', code: '+674' },
      { name: 'Nepal', code: '+977' },
      { name: 'Netherlands', code: '+31' },
      { name: 'New Zealand', code: '+64' },
      { name: 'Nicaragua', code: '+505' },
      { name: 'Niger', code: '+227' },
      { name: 'Nigeria', code: '+234' },
      { name: 'North Korea', code: '+850' },
      { name: 'North Macedonia', code: '+389' },
      { name: 'Norway', code: '+47' },
      { name: 'Oman', code: '+968' },
      { name: 'Pakistan', code: '+92' },
      { name: 'Palau', code: '+680' },
      { name: 'Palestine', code: '+970' },
      { name: 'Panama', code: '+507' },
      { name: 'Papua New Guinea', code: '+675' },
      { name: 'Paraguay', code: '+595' },
      { name: 'Peru', code: '+51' },
      { name: 'Philippines', code: '+63' },
      { name: 'Poland', code: '+48' },
      { name: 'Portugal', code: '+351' },
      { name: 'Qatar', code: '+974' },
      { name: 'Romania', code: '+40' },
      { name: 'Russia', code: '+7' },
      { name: 'Rwanda', code: '+250' },
      { name: 'Saint Kitts and Nevis', code: '+1' },
      { name: 'Saint Lucia', code: '+1' },
      { name: 'Saint Vincent and the Grenadines', code: '+1' },
      { name: 'Samoa', code: '+685' },
      { name: 'San Marino', code: '+378' },
      { name: 'Sao Tome and Principe', code: '+239' },
      { name: 'Saudi Arabia', code: '+966' },
      { name: 'Senegal', code: '+221' },
      { name: 'Serbia', code: '+381' },
      { name: 'Seychelles', code: '+248' },
      { name: 'Sierra Leone', code: '+232' },
      { name: 'Singapore', code: '+65' },
      { name: 'Slovakia', code: '+421' },
      { name: 'Slovenia', code: '+386' },
      { name: 'Solomon Islands', code: '+677' },
      { name: 'Somalia', code: '+252' },
      { name: 'South Africa', code: '+27' },
      { name: 'South Korea', code: '+82' },
      { name: 'South Sudan', code: '+211' },
      { name: 'Spain', code: '+34' },
      { name: 'Sri Lanka', code: '+94' },
      { name: 'Sudan', code: '+249' },
      { name: 'Suriname', code: '+597' },
      { name: 'Sweden', code: '+46' },
      { name: 'Switzerland', code: '+41' },
      { name: 'Syria', code: '+963' },
      { name: 'Taiwan', code: '+886' },
      { name: 'Tajikistan', code: '+992' },
      { name: 'Tanzania', code: '+255' },
      { name: 'Thailand', code: '+66' },
      { name: 'Timor-Leste', code: '+670' },
      { name: 'Togo', code: '+228' },
      { name: 'Tonga', code: '+676' },
      { name: 'Trinidad and Tobago', code: '+1' },
      { name: 'Tunisia', code: '+216' },
      { name: 'Turkey', code: '+90' },
      { name: 'Turkmenistan', code: '+993' },
      { name: 'Tuvalu', code: '+688' },
      { name: 'Uganda', code: '+256' },
      { name: 'Ukraine', code: '+380' },
      { name: 'United Arab Emirates', code: '+971' },
      { name: 'United Kingdom', code: '+44' },
      { name: 'United States', code: '+1' },
      { name: 'Uruguay', code: '+598' },
      { name: 'Uzbekistan', code: '+998' },
      { name: 'Vanuatu', code: '+678' },
      { name: 'Vatican City', code: '+379' },
      { name: 'Venezuela', code: '+58' },
      { name: 'Vietnam', code: '+84' },
      { name: 'Yemen', code: '+967' },
      { name: 'Zambia', code: '+260' },
      { name: 'Zimbabwe', code: '+263' }
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

  indianDistricts: {
    "Andaman and Nicobar Islands": [
        "Nicobar",
        "North and Middle Andaman",
        "South Andaman"
    ],
    "Andhra Pradesh": [
        "Alluri Sitharama Raju",
        "Anakapalli",
        "Ananthapuramu",
        "Annamayya",
        "Bapatla",
        "Chittoor",
        "Dr. B.R. Ambedkar Konaseema",
        "East Godavari",
        "Eluru",
        "Guntur",
        "Kakinada",
        "Krishna",
        "Kurnool",
        "Nandyal",
        "NTR (Vijayawada)",
        "Palnadu",
        "Parvathipuram Manyam",
        "Prakasam",
        "Sri Potti Sriramulu Nellore",
        "Sri Sathya Sai",
        "Srikakulam",
        "Tirupati",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
        "YSR Kadapa"
    ],
    "Arunachal Pradesh": [
        "Anjaw",
        "Changlang",
        "Dibang Valley",
        "East Kameng",
        "East Siang",
        "Itanagar Capital Complex",
        "Kamle",
        "Kra Daadi",
        "Kurung Kumey",
        "Lepa Rada",
        "Lohit",
        "Longding",
        "Lower Dibang Valley",
        "Lower Siang",
        "Lower Subansiri",
        "Namsai",
        "Pakke Kessang",
        "Papum Pare",
        "Shi Yomi",
        "Siang",
        "Tawang",
        "Tirap",
        "Upper Siang",
        "Upper Subansiri",
        "West Kameng",
        "West Siang"
    ],
    "Assam": [
        "Baksa",
        "Barpeta",
        "Biswanath",
        "Bongaigaon",
        "Cachar",
        "Charaideo",
        "Chirang",
        "Darrang",
        "Dhemaji",
        "Dhubri",
        "Dibrugarh",
        "Dima Hasao",
        "Goalpara",
        "Golaghat",
        "Hailakandi",
        "Hojai",
        "Jorhat",
        "Kamrup",
        "Kamrup Metropolitan (Guwahati)",
        "Karbi Anglong",
        "Karimganj",
        "Kokrajhar",
        "Lakhimpur",
        "Majuli",
        "Morigaon",
        "Nagaon",
        "Nalbari",
        "Sivasagar",
        "Sonitpur",
        "South Salmara-Mankachar",
        "Tamulpur",
        "Tinsukia",
        "Udalguri",
        "West Karbi Anglong"
    ],
    "Bihar": [
        "Araria",
        "Arwal",
        "Aurangabad",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur (Ara)",
        "Buxar",
        "Darbhanga",
        "East Champaran (Motihari)",
        "Gaya",
        "Gopalganj",
        "Jamui",
        "Jehanabad",
        "Kaimur (Bhabua)",
        "Katihar",
        "Khagaria",
        "Kishanganj",
        "Lakhisarai",
        "Madhepura",
        "Madhubani",
        "Munger",
        "Muzaffarpur",
        "Nalanda (Bihar Sharif)",
        "Nawada",
        "Patna",
        "Purnia",
        "Rohtas (Sasaram)",
        "Saharsa",
        "Samastipur",
        "Saran (Chhapra)",
        "Sheikhpura",
        "Sheohar",
        "Sitamarhi",
        "Siwan",
        "Supaul",
        "Vaishali (Hajipur)",
        "West Champaran (Bettiah)"
    ],
    "Chandigarh": [
        "Chandigarh"
    ],
    "Chhattisgarh": [
        "Balod",
        "Baloda Bazar",
        "Balrampur",
        "Bastar (Jagdalpur)",
        "Bemetara",
        "Bijapur",
        "Bilaspur",
        "Dantewada (South Bastar)",
        "Dhamtari",
        "Durg",
        "Gariaband",
        "Gaurela-Pendra-Marwahi",
        "Janjgir-Champa",
        "Jashpur",
        "Kabirdham (Kawardha)",
        "Kanker (North Bastar)",
        "Khairagarh-Chhuikhadan-Gandai",
        "Kondagaon",
        "Korba",
        "Koriya",
        "Mahasamund",
        "Manendragarh-Chirmiri-Bharatpur",
        "Mohla-Manpur-Ambagarh Chowki",
        "Mungeli",
        "Narayanpur",
        "Raigarh",
        "Raipur",
        "Rajnandgaon",
        "Sakti",
        "Sarangarh-Bilaigarh",
        "Sukma",
        "Surajpur",
        "Surguja (Ambikapur)"
    ],
    "Dadra and Nagar Haveli and Daman and Diu": [
        "Dadra and Nagar Haveli (Silvassa)",
        "Daman",
        "Diu"
    ],
    "Delhi": [
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "Shahdara",
        "South Delhi",
        "South East Delhi",
        "South West Delhi",
        "West Delhi"
    ],
    "Goa": [
        "North Goa (Panaji)",
        "South Goa (Margao)"
    ],
    "Gujarat": [
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Aravalli",
        "Banaskantha (Palanpur)",
        "Bharuch",
        "Bhavnagar",
        "Botad",
        "Chhota Udaipur",
        "Dahod",
        "Dang (Ahwa)",
        "Devbhoomi Dwarka",
        "Gandhinagar",
        "Gir Somnath (Veraval)",
        "Jamnagar",
        "Junagadh",
        "Kheda (Nadiad)",
        "Kutch (Bhuj)",
        "Mahisagar (Lunawada)",
        "Mehsana",
        "Morbi",
        "Narmada (Rajpipla)",
        "Navsari",
        "Panchmahal (Godhra)",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabarkantha (Himmatnagar)",
        "Surat",
        "Surendranagar",
        "Tapi (Vyara)",
        "Vadodara",
        "Valsad"
    ],
    "Haryana": [
        "Ambala",
        "Bhiwani",
        "Charkhi Dadri",
        "Faridabad",
        "Fatehabad",
        "Gurugram (Gurgaon)",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Mahendragarh (Narnaul)",
        "Nuh (Mewat)",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Yamunanagar"
    ],
    "Himachal Pradesh": [
        "Bilaspur",
        "Chamba",
        "Hamirpur",
        "Kangra (Dharamshala)",
        "Kinnaur",
        "Kullu",
        "Lahaul and Spiti",
        "Mandi",
        "Shimla",
        "Sirmaur (Nahan)",
        "Solan",
        "Una"
    ],
    "Jammu and Kashmir": [
        "Anantnag",
        "Bandipora",
        "Baramulla",
        "Budgam",
        "Doda",
        "Ganderbal",
        "Jammu",
        "Kathua",
        "Kishtwar",
        "Kulgam",
        "Kupwara",
        "Poonch",
        "Pulwama",
        "Rajouri",
        "Ramban",
        "Reasi",
        "Samba",
        "Shopian",
        "Srinagar",
        "Udhampur"
    ],
    "Jharkhand": [
        "Bokaro",
        "Chatra",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "East Singhbhum (Jamshedpur)",
        "Garhwa",
        "Giridih",
        "Godda",
        "Gumla",
        "Hazaribagh",
        "Jamtara",
        "Khunti",
        "Koderma",
        "Latehar",
        "Lohardaga",
        "Pakur",
        "Palamu (Daltonganj)",
        "Ramgarh",
        "Ranchi",
        "Sahibganj",
        "Saraikela Kharsawan",
        "Simdega",
        "West Singhbhum (Chaibasa)"
    ],
    "Karnataka": [
        "Bagalkot",
        "Ballari (Bellary)",
        "Belagavi (Belgaum)",
        "Bengaluru Rural",
        "Bengaluru Urban",
        "Bidar",
        "Chamarajanagar",
        "Chikkaballapur",
        "Chikkamagaluru",
        "Chitradurga",
        "Dakshina Kannada (Mangaluru)",
        "Davanagere",
        "Dharwad (Hubballi)",
        "Gadag",
        "Hassan",
        "Haveri",
        "Kalaburagi (Gulbarga)",
        "Kodagu (Madikeri)",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysuru (Mysore)",
        "Raichur",
        "Ramanagara",
        "Shivamogga (Shimoga)",
        "Tumakuru (Tumkur)",
        "Udupi",
        "Uttara Kannada (Karwar)",
        "Vijayanagara",
        "Vijayapura (Bijapur)",
        "Yadgir"
    ],
    "Kerala": [
        "Alappuzha",
        "Ernakulam (Kochi)",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode (Calicut)",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad"
    ],
    "Ladakh": [
        "Kargil",
        "Leh"
    ],
    "Lakshadweep": [
        "Lakshadweep (Kavaratti)"
    ],
    "Madhya Pradesh": [
        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "Guna",
        "Gwalior",
        "Harda",
        "Hoshangabad (Narmadapuram)",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa (East Nimar)",
        "Khargone (West Nimar)",
        "Mandla",
        "Mandsaur",
        "Mauganj",
        "Morena",
        "Narsinghpur",
        "Neemuch",
        "Niwari",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha"
    ],
    "Maharashtra": [
        "Ahmednagar (Ahilyanagar)",
        "Akola",
        "Amravati",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Chhatrapati Sambhajinagar (Aurangabad)",
        "Dharashiv (Osmanabad)",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai City",
        "Mumbai Suburban",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Palghar",
        "Parbhani",
        "Pune",
        "Raigad (Alibag)",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg (Oros)",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim",
        "Yavatmal"
    ],
    "Manipur": [
        "Bishnupur",
        "Chandel",
        "Churachandpur",
        "Imphal East",
        "Imphal West",
        "Jiribam",
        "Kakching",
        "Kamjong",
        "Kangpokpi",
        "Noney",
        "Pherzawl",
        "Senapati",
        "Tamenglong",
        "Tengnoupal",
        "Thoubal",
        "Ukhrul"
    ],
    "Meghalaya": [
        "East Garo Hills (Williamnagar)",
        "East Jaintia Hills (Khliehriat)",
        "East Khasi Hills (Shillong)",
        "Eastern West Khasi Hills (Mairang)",
        "North Garo Hills (Resubelpara)",
        "Ri Bhoi (Nongpoh)",
        "South Garo Hills (Baghmara)",
        "South West Garo Hills (Ampati)",
        "South West Khasi Hills (Mawkyrwat)",
        "West Garo Hills (Tura)",
        "West Jaintia Hills (Jowai)",
        "West Khasi Hills (Nongstoin)"
    ],
    "Mizoram": [
        "Aizawl",
        "Champhai",
        "Hnahthial",
        "Khawzawl",
        "Kolasib",
        "Lawngtlai",
        "Lunglei",
        "Mamit",
        "Saitual",
        "Serchhip",
        "Siaha"
    ],
    "Nagaland": [
        "Chümoukedima",
        "Dimapur",
        "Kiphire",
        "Kohima",
        "Longleng",
        "Mokokchung",
        "Mon",
        "Niuland",
        "Noklak",
        "Peren",
        "Phek",
        "Shamator",
        "Tseminyü",
        "Tuensang",
        "Wokha",
        "Zünheboto"
    ],
    "Odisha": [
        "Angul",
        "Balangir",
        "Balasore (Baleswar)",
        "Bargarh",
        "Bhadrak",
        "Boudh",
        "Cuttack",
        "Deogarh",
        "Dhenkanal",
        "Gajapati (Paralakhemundi)",
        "Ganjam (Chhatrapur)",
        "Jagatsinghpur",
        "Jajpur",
        "Jharsuguda",
        "Kalahandi (Bhawanipatna)",
        "Kandhamal (Phulbani)",
        "Kendrapara",
        "Kendujhar (Keonjhar)",
        "Khordha (Bhubaneswar)",
        "Koraput",
        "Malkangiri",
        "Mayurbhanj (Baripada)",
        "Nabarangpur",
        "Nayagarh",
        "Nuapada",
        "Puri",
        "Rayagada",
        "Sambalpur",
        "Subarnapur (Sonepur)",
        "Sundargarh"
    ],
    "Puducherry": [
        "Karaikal",
        "Mahe",
        "Puducherry",
        "Yanam"
    ],
    "Punjab": [
        "Amritsar",
        "Barnala",
        "Bathinda",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Ferozepur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Malerkotla",
        "Mansa",
        "Moga",
        "Muktsar (Sri Muktsar Sahib)",
        "Pathankot",
        "Patiala",
        "Rupnagar (Ropar)",
        "Sahibzada Ajit Singh Nagar (Mohali)",
        "Sangrur",
        "Shahid Bhagat Singh Nagar (Nawanshahr)",
        "Tarn Taran"
    ],
    "Rajasthan": [
        "Ajmer",
        "Alwar",
        "Anupgarh",
        "Balotra",
        "Banswara",
        "Baran",
        "Barmer",
        "Beawar",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Deeg",
        "Dholpur",
        "Didwana-Kuchaman",
        "Dudu",
        "Dungarpur",
        "Gangapur City",
        "Hanumangarh",
        "Jaipur",
        "Jaipur Rural",
        "Jaisalmer",
        "Jalore",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Jodhpur Rural",
        "Karauli",
        "Kekri",
        "Khairthal-Tijara",
        "Kota",
        "Kotputli-Behror",
        "Nagaur",
        "Neem Ka Thana",
        "Pali",
        "Phalodi",
        "Pratapgarh",
        "Rajsamand",
        "Salumbar",
        "Sanchore",
        "Sawai Madhopur",
        "Shahpura",
        "Sikar",
        "Sirohi",
        "Sri Ganganagar",
        "Tonk",
        "Udaipur"
    ],
    "Sikkim": [
        "Gangtok",
        "Gyalshing (West Sikkim)",
        "Mangan (North Sikkim)",
        "Namchi (South Sikkim)",
        "Pakyong",
        "Soreng"
    ],
    "Tamil Nadu": [
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kancheepuram",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Mayiladuthurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris (Udhagamandalam)",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivaganga",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi (Tuticorin)",
        "Tiruchirappalli (Trichy)",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar"
    ],
    "Telangana": [
        "Adilabad",
        "Bhadradri Kothagudem",
        "Hanumakonda",
        "Hyderabad",
        "Jagtial",
        "Jangaon",
        "Jayashankar Bhupalpally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Kumuram Bheem Asifabad",
        "Mahabubabad",
        "Mahbubnagar",
        "Mancherial",
        "Medak",
        "Medchal-Malkajgiri",
        "Mulugu",
        "Nagarkurnool",
        "Nalgonda",
        "Narayanpet",
        "Nirmal",
        "Nizamabad",
        "Peddapalli",
        "Rajanna Sircilla",
        "Ranga Reddy",
        "Sangareddy",
        "Siddipet",
        "Suryapet",
        "Vikarabad",
        "Wanaparthy",
        "Warangal",
        "Yadadri Bhuvanagiri"
    ],
    "Tripura": [
        "Dhalai (Ambassa)",
        "Gomati (Udaipur)",
        "Khowai",
        "North Tripura (Dharmanagar)",
        "Sepahijala (Bishramganj)",
        "South Tripura (Belonia)",
        "Unakoti (Kailashahar)",
        "West Tripura (Agartala)"
    ],
    "Uttar Pradesh": [
        "Agra",
        "Aligarh",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Ayodhya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar (Noida)",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hamirpur",
        "Hapur",
        "Hardoi",
        "Hathras",
        "Jalaun (Orai)",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kasganj",
        "Kaushambi",
        "Kushinagar",
        "Lakhimpur Kheri",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pilibhit",
        "Pratapgarh",
        "Prayagraj (Allahabad)",
        "Raebareli",
        "Rampur",
        "Saharanpur",
        "Sambhal",
        "Sant Kabir Nagar (Khalilabad)",
        "Shahjahanpur",
        "Shamli",
        "Shravasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra (Robertsganj)",
        "Sultanpur",
        "Unnao",
        "Varanasi"
    ],
    "Uttarakhand": [
        "Almora",
        "Bageshwar",
        "Chamoli (Gopeshwar)",
        "Champawat",
        "Dehradun",
        "Haridwar",
        "Nainital",
        "Pauri Garhwal",
        "Pithoragarh",
        "Rudraprayag",
        "Tehri Garhwal",
        "Udham Singh Nagar (Rudrapur)",
        "Uttarkashi"
    ],
    "West Bengal": [
        "Alipurduar",
        "Bankura",
        "Birbhum (Suri)",
        "Cooch Behar",
        "Dakshin Dinajpur (Balurghat)",
        "Darjeeling",
        "Hooghly (Chinsurah)",
        "Howrah",
        "Jalpaiguri",
        "Jhargram",
        "Kalimpong",
        "Kolkata",
        "Malda (English Bazar)",
        "Murshidabad (Baharampur)",
        "Nadia (Krishnanagar)",
        "North 24 Parganas (Barasat)",
        "Paschim Bardhaman (Asansol)",
        "Paschim Medinipur (Midnapore)",
        "Purba Bardhaman (Bardhaman)",
        "Purba Medinipur (Tamluk)",
        "Purulia",
        "South 24 Parganas (Alipore)",
        "Uttar Dinajpur (Raiganj)"
    ]
},

  getDistrictsForState(stateName) {
    if (!stateName) return [];
    const clean = String(stateName).trim().toLowerCase();
    for (const [sName, dists] of Object.entries(this.indianDistricts || {})) {
      if (sName.toLowerCase() === clean) return dists;
    }
    return [];
  },

  populateDistrictDropdown(selectedState, selectedDistrict = '') {
    const container = document.getElementById('v-district-container');
    if (!container) return;

    const countrySelect = document.getElementById('v-country');
    const isIndia = !countrySelect || (countrySelect.value || 'India').includes('India');

    if (!isIndia) {
      container.innerHTML = `
        <label class="block font-bold text-slate-700 mb-1">City / County <span class="text-rose-600 font-bold">*</span></label>
        <input id="v-district" required value="${selectedDistrict || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-xs" placeholder="City name" />
      `;
      return;
    }

    const districts = this.getDistrictsForState(selectedState);
    const hasDistricts = districts && districts.length > 0;

    let optionsHtml = '';
    if (!selectedState) {
      optionsHtml = '<option value="">-- First Choose State --</option>';
    } else if (!hasDistricts) {
      optionsHtml = '<option value="">-- No districts mapped --</option>';
    } else {
      optionsHtml = `<option value="">-- Choose District in ${selectedState} --</option>` +
        districts.map(d => `<option value="${d}" ${d.toLowerCase() === String(selectedDistrict || '').toLowerCase() ? 'selected' : ''}>${d}</option>`).join('');
    }

    const isCustom = selectedDistrict && !districts.some(d => d.toLowerCase() === String(selectedDistrict || '').toLowerCase());
    if (isCustom && selectedDistrict !== 'Other') {
      optionsHtml += `<option value="${selectedDistrict}" selected>${selectedDistrict}</option>`;
    }
    optionsHtml += `<option value="Other" ${selectedDistrict === 'Other' ? 'selected' : ''}>Other / Not Listed</option>`;

    container.innerHTML = `
      <label class="block font-bold text-slate-700 mb-1">District <span class="text-rose-600 font-bold">*</span></label>
      <select id="v-district" required onchange="CMS_MASTERS.onDistrictChange(this.value)" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-xs">
        ${optionsHtml}
      </select>
      <input type="text" id="v-district-other" class="${selectedDistrict === 'Other' ? '' : 'hidden'} mt-2 w-full px-3 py-1.5 border border-slate-300 rounded-sm text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Specify District Name" />
    `;
  },

  onDistrictChange(val) {
    const otherInput = document.getElementById('v-district-other');
    if (otherInput) {
      if (val === 'Other') {
        otherInput.classList.remove('hidden');
        otherInput.focus();
      } else {
        otherInput.classList.add('hidden');
      }
    }
  },

  getStateInfo(stateName) {
    let companyInfo = {};
    try {
      if (window.CMS_HOME && window.CMS_HOME.companyInfo && window.CMS_HOME.companyInfo.name) {
        companyInfo = window.CMS_HOME.companyInfo;
      } else if (typeof localStorage !== 'undefined') {
        companyInfo = JSON.parse(localStorage.getItem('CMS_COMPANY_INFO') || '{}') || {};
      }
    } catch (e) {
      companyInfo = {};
    }
    const compState = (companyInfo.state || 'Delhi').toLowerCase();
    
    const s = this.indianStates.find(item => item.name.toLowerCase() === String(stateName || '').toLowerCase());
    if (!s) return { code: '', name: stateName || '', taxMode: 'IGST' };
    
    const isSameState = s.name.toLowerCase() === compState || (companyInfo.stateCode && s.code === companyInfo.stateCode);
    const taxMode = isSameState ? 'CGST_SGST' : 'IGST';
    return { ...s, taxMode };
  },

  formatVendorPhone(v) {
    if (!v) return '-';
    let contact = (v.contactNo || '').trim();
    if (!contact || contact === '-') return '-';
    if (/^India\b/i.test(contact)) {
      contact = contact.replace(/^India\s*/i, '').trim();
    }
    if (contact.startsWith('+')) return contact;

    let code = (v.countryCode || '').trim();
    if (!code || code.toLowerCase() === 'india' || code.toLowerCase() === 'in' || code.toLowerCase() === 'ind') {
      code = '+91';
    } else if (!code.startsWith('+')) {
      const matched = (this.countries || []).find(c => c.name.toLowerCase() === code.toLowerCase());
      code = matched ? matched.code : (/^\d+$/.test(code) ? '+' + code : '+91');
    }
    return `${code} ${contact}`;
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
      const isRevision = v.status === 'Revision Required' || v.status === 'Rejected';
      const isApproved = v.status === 'Approved' || Boolean(v.isApproved);
      const stateInfo = this.getStateInfo(v.addressState);

      return `
        <tr class="hover:bg-slate-50/80 transition ${isBlocked ? 'bg-rose-50/40' : isRevision ? 'bg-amber-50/40' : isPending ? 'bg-slate-50/30' : ''}">
          <td class="p-4">
            <div class="flex items-center gap-2">
              <span class="font-bold text-blue-600 text-sm hover:text-blue-600 cursor-pointer" onclick="CMS_MASTERS.viewVendorProfile('${v.id}')">${v.name}</span>
              ${isBlocked ? '<span class="px-1.5 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 font-bold text-[9px] uppercase tracking-wide">BLOCKED</span>' : ''}
              ${isRevision ? '<span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 font-bold text-[9px] uppercase tracking-wide">REVISION REQUIRED</span>' : ''}
            </div>
            <div class="text-[11px] text-slate-400 font-mono mt-0.5">${v.id} � ${stateInfo.code ? `State Code: ${stateInfo.code}` : ''}</div>
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
            ${v.panNotApplicable ? '<span class="text-slate-400 font-normal">Exempt (N/A)</span>' : (v.panNo ? v.panNo : '<span class="text-slate-400 font-normal font-sans">-</span>')}
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
            <div class="text-slate-800 font-medium">Tel: ${this.formatVendorPhone(v)}</div>
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

            <!-- Print / Download Registration Form Button -->
            <button onclick="CMS_MASTERS.downloadVendorForm('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-sm transition" title="Download / Print Registration Form">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
            </button>

            <!-- Maker Edit Button (Only User can edit) -->
            <!-- Maker Edit Button & Prominent Revise Button (Only shown to Maker/User when not approved) -->
            ${(role !== 'Admin' && !isApproved && (isPending || isRevision || v.status === 'Draft')) ? `
              <button onclick="CMS_MASTERS.openVendorModal('${v.id}')" class="px-2.5 py-1 text-xs font-bold ${isRevision ? 'text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300' : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300'} rounded-sm transition inline-flex items-center gap-1 cursor-pointer" title="${isRevision ? 'Edit & Correct Reverted Vendor Form' : 'Modify Vendor'}">
                <i data-lucide="${isRevision ? 'edit-3' : 'pencil'}" class="w-3.5 h-3.5 ${isRevision ? 'text-amber-700' : 'text-slate-600'}"></i>
                ${isRevision ? '<span>Edit & Fix</span>' : ''}
              </button>
            ` : ''}

            <!-- Checker Governance Actions: Sanction or Reject with Mistake Remark -->
            ${isPending && role === 'Admin' ? `
              <button onclick="CMS_MASTERS.openVendorSanctionModal('${v.id}')" class="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-sm transition shadow-sm" title="Sanction Vendor">
                Approve
              </button>
              <button onclick="CMS_MASTERS.openVendorRejectModal('${v.id}')" class="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded-sm transition" title="Reject / Return for Revision">
                Reject
              </button>
            ` : isRevision && role === 'Admin' ? `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-sm" title="${v.checkerMistakeRemark ? `Reported Mistake: ${v.checkerMistakeRemark}` : 'Admin Rejected'}">
                <i data-lucide="x-circle" class="w-3.5 h-3.5 text-rose-600"></i>
                <span>Admin Rejected</span>
              </span>
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

          ${role !== 'Admin' ? `
            <div class="flex flex-wrap items-center gap-2.5">
              <button onclick="CMS_MASTERS.openVendorModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-sm shadow transition text-xs cursor-pointer">
                <i data-lucide="plus-circle" class="w-4 h-4 text-white"></i>
                <span>Register New Vendor</span>
              </button>
            </div>
          ` : ''}
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

    toggleDocView(docId, mode) {
    const vectorEl = document.getElementById(docId + '-vector');
    const rawEl = document.getElementById(docId + '-raw');
    const btnVector = document.getElementById(docId + '-btn-vector');
    const btnRaw = document.getElementById(docId + '-btn-raw');
    if (mode === 'raw') {
      if (vectorEl) vectorEl.classList.add('hidden');
      if (rawEl) rawEl.classList.remove('hidden');
      if (btnVector) {
        btnVector.classList.remove('bg-slate-900', 'text-white');
        btnVector.classList.add('bg-white', 'text-slate-700');
      }
      if (btnRaw) {
        btnRaw.classList.remove('bg-white', 'text-slate-700');
        btnRaw.classList.add('bg-slate-900', 'text-white');
      }
    } else {
      if (vectorEl) vectorEl.classList.remove('hidden');
      if (rawEl) rawEl.classList.add('hidden');
      if (btnVector) {
        btnVector.classList.add('bg-slate-900', 'text-white');
        btnVector.classList.remove('bg-white', 'text-slate-700');
      }
      if (btnRaw) {
        btnRaw.classList.add('bg-white', 'text-slate-700');
        btnRaw.classList.remove('bg-slate-900', 'text-white');
      }
    }
  },

  renderPanCardDoc(v, att, formatDate) {
    const panNum = (v.panNo || 'AGVPA8973H').toUpperCase().trim();
    const vendorName = (v.name || 'Vendor Entity').toUpperCase().trim();
    const isCompany = v.constitution && (v.constitution.includes('Company') || v.constitution.includes('LLP') || v.constitution.includes('Corporation'));
    const fatherName = isCompany ? 'REPRESENTATIVE / AUTHORIZED OFFICER' : (v.createdByName ? v.createdByName.toUpperCase() : 'RAMESHWAR SHARMA');
    const dob = v.createdAt ? formatDate(v.createdAt) : '18/06/2015';

    return `
      <div class="max-w-xl mx-auto my-3 bg-gradient-to-br from-[#ebf5fb] via-[#f4f9fd] to-[#eaf2f8] border-2 border-slate-400 rounded-xl p-5 shadow-sm text-slate-900 select-none relative overflow-hidden font-sans">
        <!-- Subtle Guilloche Background Pattern -->
        <div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg width="380" height="380" viewBox="0 0 100 100" class="text-slate-800 fill-current">
            <circle cx="50" cy="50" r="46" stroke="currentColor" stroke-width="0.5" fill="none" />
            <circle cx="50" cy="50" r="36" stroke="currentColor" stroke-width="0.5" fill="none" stroke-dasharray="2,2" />
            <circle cx="50" cy="50" r="26" stroke="currentColor" stroke-width="0.5" fill="none" />
            <circle cx="50" cy="50" r="16" stroke="currentColor" stroke-width="0.5" fill="none" />
          </svg>
        </div>

        <!-- Official Header -->
        <div class="flex items-center justify-between border-b border-slate-300 pb-2.5 mb-3 relative z-10">
          <div class="text-left">
            <div class="text-xs font-bold text-slate-800 leading-tight">आयकर विभाग</div>
            <div class="text-[10px] font-bold text-slate-700 uppercase tracking-tight">INCOME TAX DEPARTMENT</div>
          </div>
          <!-- Lion Capital of Ashoka Emblem -->
          <div class="text-center px-2">
            <svg class="w-8 h-8 mx-auto text-slate-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C10.9 2 10 2.9 10 4V4.18C8.84 4.6 8 5.7 8 7C8 7.35 8.07 7.69 8.19 8H7C5.9 8 5 8.9 5 10V11C5 11.74 5.4 12.38 6 12.72V15C6 16.1 6.9 17 8 17H8.18C8.6 18.16 9.7 19 11 19V20H9C8.45 20 8 20.45 8 21C8 21.55 8.45 22 9 22H15C15.55 22 16 21.55 16 21C16 20.45 15.55 20 15 20H13V19C14.3 19 15.4 18.16 15.82 17H16C17.1 17 18 16.1 18 15V12.72C18.6 12.38 19 11.74 19 11V10C19 8.9 18.1 8 17 8H15.81C15.93 7.69 16 7.35 16 7C16 5.7 15.16 4.6 14 4.18V4C14 2.9 13.1 2 12 2Z"/>
            </svg>
            <div class="text-[8px] font-bold tracking-widest uppercase text-slate-600 mt-0.5">सत्यमेव जयते</div>
          </div>
          <div class="text-right">
            <div class="text-xs font-bold text-slate-800 leading-tight">भारत सरकार</div>
            <div class="text-[10px] font-bold text-slate-700 uppercase tracking-tight">GOVT. OF INDIA</div>
          </div>
        </div>

        <!-- Particulars Grid -->
        <div class="grid grid-cols-12 gap-3 items-center relative z-10">
          <!-- Photo / Entity Seal Box -->
          <div class="col-span-3">
            <div class="w-24 h-28 bg-white border border-slate-300 rounded shadow-2xs flex flex-col items-center justify-center p-1 text-center">
              <div class="w-14 h-14 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-500 mb-1">
                <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <span class="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">PHOTO / SEAL</span>
            </div>
          </div>

          <!-- Tax Details -->
          <div class="col-span-6 space-y-1.5">
            <div>
              <div class="text-[9px] font-bold uppercase tracking-wider text-slate-600">स्थायी लेखा संख्या / PAN</div>
              <div class="text-xl font-black font-mono tracking-widest text-slate-950">${panNum}</div>
            </div>
            <div>
              <div class="text-[9px] font-semibold uppercase text-slate-500">नाम / Name</div>
              <div class="text-xs font-black uppercase text-slate-900 tracking-wide">${vendorName}</div>
            </div>
            <div>
              <div class="text-[9px] font-semibold uppercase text-slate-500">पिता का नाम / Father's Name</div>
              <div class="text-[11px] font-bold uppercase text-slate-800">${fatherName}</div>
            </div>
            <div>
              <div class="text-[9px] font-semibold uppercase text-slate-500">जन्म / निगमन तिथि / Date of Incorp/Birth</div>
              <div class="text-[11px] font-mono font-bold text-slate-800">${dob}</div>
            </div>
          </div>

          <!-- QR Code & Hologram -->
          <div class="col-span-3 flex flex-col items-center justify-between h-full space-y-2">
            <div class="p-1 bg-white border border-slate-300 rounded shadow-2xs">
              <svg class="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M3 3h6v6H3V3zm12 0h6v6h-6V3zm0 12h6v6h-6v-6zm-12 0h6v6H3v-6zm3-3v3m3-3h3m3 3v3m-3 0h3"/>
              </svg>
            </div>
            <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-300 border border-slate-400 flex items-center justify-center shadow-inner text-center">
              <span class="text-[7px] font-black tracking-tighter text-slate-700 uppercase">ITD<br/>SEAL</span>
            </div>
          </div>
        </div>

        <!-- Signature Bar -->
        <div class="mt-3 pt-2 border-t border-slate-300 flex items-center justify-between text-[9px] text-slate-600 relative z-10">
          <div class="italic">Digitally verified Permanent Account Number card under Income Tax Act, 1961</div>
          <div class="text-right">
            <div class="font-serif italic text-sm font-bold text-slate-900 tracking-wider">${vendorName.slice(0, 14)}...</div>
            <div class="text-[8px] uppercase tracking-wider text-slate-500">हस्ताक्षर / Authorized Signature</div>
          </div>
        </div>
      </div>
    `;
  },

  renderGstCertificateDoc(v, att, formatDate) {
    const gstNo = (v.gstNo || '08AGVPA9973H345').toUpperCase().trim();
    const vendorName = (v.name || 'Vendor Entity').toUpperCase().trim();
    const constitution = v.constitution || 'Private Limited Company';
    const regDate = formatDate(v.createdAt || new Date());
    const fullAddress = [v.address, v.addressTaluka, v.addressDistrict, v.addressState ? (v.addressState + (v.addressPinCode ? ' - ' + v.addressPinCode : '')) : v.addressPinCode].filter(Boolean).join(', ');

    return `
      <div class="max-w-3xl mx-auto my-3 bg-white border-2 border-slate-800 p-6 shadow-xs font-sans text-slate-900">
        <!-- Header -->
        <div class="text-center pb-3 border-b-2 border-slate-800">
          <svg class="w-9 h-9 mx-auto text-slate-900 mb-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C10.9 2 10 2.9 10 4V4.18C8.84 4.6 8 5.7 8 7C8 7.35 8.07 7.69 8.19 8H7C5.9 8 5 8.9 5 10V11C5 11.74 5.4 12.38 6 12.72V15C6 16.1 6.9 17 8 17H8.18C8.6 18.16 9.7 19 11 19V20H9C8.45 20 8 20.45 8 21C8 21.55 8.45 22 9 22H15C15.55 22 16 21.55 16 21C16 20.45 15.55 20 15 20H13V19C14.3 19 15.4 18.16 15.82 17H16C17.1 17 18 16.1 18 15V12.72C18.6 12.38 19 11.74 19 11V10C19 8.9 18.1 8 17 8H15.81C15.93 7.69 16 7.35 16 7C16 5.7 15.16 4.6 14 4.18V4C14 2.9 13.1 2 12 2Z"/>
          </svg>
          <div class="text-sm font-black uppercase tracking-wider text-slate-900">Government of India</div>
          <div class="text-xs font-bold uppercase tracking-tight text-slate-700 mt-0.5">Form GST REG-06</div>
          <div class="text-[10px] text-slate-500 font-serif italic">[See Rule 10(1)]</div>
          <div class="text-base font-black uppercase tracking-wide text-slate-900 mt-1 border-t border-b border-slate-300 py-0.5 inline-block px-4">
            Registration Certificate
          </div>
        </div>

        <!-- 9-Point Statutory Table -->
        <table class="w-full text-xs border-collapse mt-4 border border-slate-400">
          <tbody>
            <tr class="border-b border-slate-300">
              <td class="w-10 p-2 border-r border-slate-300 text-center font-bold text-slate-600">1.</td>
              <td class="w-1/3 p-2 border-r border-slate-300 font-semibold text-slate-700 bg-slate-50">Registration Number (GSTIN)</td>
              <td class="p-2 font-mono font-black text-sm text-slate-900 tracking-wider">${gstNo}</td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="p-2 border-r border-slate-300 text-center font-bold text-slate-600">2.</td>
              <td class="p-2 border-r border-slate-300 font-semibold text-slate-700 bg-slate-50">Legal Name</td>
              <td class="p-2 font-bold uppercase text-slate-900">${vendorName}</td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="p-2 border-r border-slate-300 text-center font-bold text-slate-600">3.</td>
              <td class="p-2 border-r border-slate-300 font-semibold text-slate-700 bg-slate-50">Trade Name, if any</td>
              <td class="p-2 font-semibold uppercase text-slate-800">${vendorName}</td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="p-2 border-r border-slate-300 text-center font-bold text-slate-600">4.</td>
              <td class="p-2 border-r border-slate-300 font-semibold text-slate-700 bg-slate-50">Constitution of Business</td>
              <td class="p-2 font-medium text-slate-800">${constitution}</td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="p-2 border-r border-slate-300 text-center font-bold text-slate-600">5.</td>
              <td class="p-2 border-r border-slate-300 font-semibold text-slate-700 bg-slate-50">Address of Principal Place of Business</td>
              <td class="p-2 font-medium text-slate-800 leading-normal">${fullAddress || 'Registered Business Address'}</td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="p-2 border-r border-slate-300 text-center font-bold text-slate-600">6.</td>
              <td class="p-2 border-r border-slate-300 font-semibold text-slate-700 bg-slate-50">Date of Liability</td>
              <td class="p-2 font-mono font-bold text-slate-800">${regDate}</td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="p-2 border-r border-slate-300 text-center font-bold text-slate-600">7.</td>
              <td class="p-2 border-r border-slate-300 font-semibold text-slate-700 bg-slate-50">Period of Validity</td>
              <td class="p-2 font-medium text-slate-800"><span class="font-mono">From ${regDate}</span> to <strong class="text-slate-900 font-bold">Perpetual</strong></td>
            </tr>
            <tr class="border-b border-slate-300">
              <td class="p-2 border-r border-slate-300 text-center font-bold text-slate-600">8.</td>
              <td class="p-2 border-r border-slate-300 font-semibold text-slate-700 bg-slate-50">Type of Registration</td>
              <td class="p-2 font-bold text-slate-900">Regular</td>
            </tr>
            <tr>
              <td class="p-2 border-r border-slate-300 text-center font-bold text-slate-600">9.</td>
              <td class="p-2 border-r border-slate-300 font-semibold text-slate-700 bg-slate-50">Jurisdictional Authority</td>
              <td class="p-2 font-medium text-slate-800">State Tax Range-IV, Circle-B, ${v.addressState || 'Rajasthan'}</td>
            </tr>
          </tbody>
        </table>

        <!-- Signatures & Electronic Stamp -->
        <div class="mt-5 pt-3 border-t-2 border-slate-300 flex flex-wrap items-end justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="p-1 border border-slate-300 rounded">
              <svg class="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M3 3h6v6H3V3zm12 0h6v6h-6V3zm0 12h6v6h-6v-6zm-12 0h6v6H3v-6zm3-3v3m3-3h3m3 3v3m-3 0h3"/>
              </svg>
            </div>
            <div class="text-[10px] text-slate-500">
              <div>Certified True Electronic Copy</div>
              <div>GST Common Portal Government of India</div>
            </div>
          </div>

          <div class="border border-slate-400 bg-slate-50 p-2.5 rounded text-[10px] w-64">
            <div class="font-bold text-slate-900 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span>Signature Valid</span>
            </div>
            <div class="text-slate-700 mt-0.5">Digitally signed by DS GOODS AND SERVICES TAX NETWORK 07</div>
            <div class="text-slate-500 font-mono mt-0.5">Date: ${regDate}</div>
            <div class="text-slate-500">Designation: Superintendent</div>
          </div>
        </div>
      </div>
    `;
  },

  renderBankChequeDoc(v, att, formatDate) {
    const bankName = (v.bankName || 'HDFC BANK LIMITED').toUpperCase().trim();
    const branchName = (v.branchName || 'Central Commercial Branch, Industrial Area').trim();
    const ifsc = (v.ifscCode || 'HDFC0001234').toUpperCase().trim();
    const accountNo = (v.accountNo || '34535345').trim();
    const accountName = (v.accountName || v.name || 'Vendor Entity').toUpperCase().trim();
    const micrCode = accountNo ? String(accountNo).padStart(6, '0').slice(-6) : '000123';

    return `
      <div class="max-w-3xl mx-auto my-3 space-y-4 font-sans text-slate-900">
        <!-- CTS-2010 Cheque Instrument -->
        <div class="bg-[#f0f6fa] border-2 border-slate-400 rounded-xl p-5 shadow-sm relative overflow-hidden font-mono select-none">
          <!-- Diagonal Cancelled Watermark Stamp -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none -rotate-12 z-20">
            <div class="border-4 border-slate-400/80 text-slate-400/80 font-black text-4xl sm:text-5xl px-8 py-2 tracking-widest uppercase rounded">
              CANCELLED
            </div>
          </div>

          <!-- Bank Header -->
          <div class="flex justify-between items-start pb-2 border-b border-slate-300 relative z-10 font-sans">
            <div>
              <div class="text-base font-black uppercase text-slate-900 tracking-wider">${bankName}</div>
              <div class="text-[10px] text-slate-600">${branchName}</div>
              <div class="text-[11px] font-mono font-bold text-slate-800 mt-0.5">IFSC: ${ifsc}</div>
            </div>
            <div class="text-right">
              <div class="text-[9px] text-slate-500 font-semibold uppercase mb-1">DATE / दिनांक</div>
              <div class="inline-flex gap-1">
                ${['D','D','M','M','Y','Y','Y','Y'].map(c => `
                  <span class="w-5 h-6 border border-slate-400 bg-white flex items-center justify-center text-[10px] font-bold text-slate-400">${c}</span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Cheque Body -->
          <div class="py-3 space-y-2 relative z-10 text-xs">
            <div class="flex items-center gap-2">
              <span class="font-sans font-bold text-slate-600 text-[11px] shrink-0">PAY / अदा करें:</span>
              <span class="font-bold text-slate-800 border-b border-dotted border-slate-400 flex-1 pb-0.5 uppercase">CANCELLED FOR CMS VENDOR REGISTRATION ONLY</span>
              <span class="font-sans font-bold text-slate-500 text-[11px] shrink-0">OR BEARER / या धारक को</span>
            </div>

            <div class="flex items-center gap-2">
              <span class="font-sans font-bold text-slate-600 text-[11px] shrink-0">RUPEES / रुपये:</span>
              <span class="font-bold text-slate-800 border-b border-dotted border-slate-400 flex-1 pb-0.5">NOT EXCEEDING ZERO - ACCOUNT VERIFICATION MANDATE LEAF</span>
              <span class="border-2 border-slate-700 bg-white px-3 py-1 font-mono font-black text-sm text-slate-900 shrink-0">₹ 0.00</span>
            </div>

            <div class="flex justify-between items-end pt-3">
              <div>
                <div class="text-[9px] font-sans font-bold text-slate-600 uppercase mb-0.5">A/C NO. / खाता सं.</div>
                <div class="border-2 border-slate-800 bg-white px-3 py-1.5 font-mono font-black text-base tracking-widest text-slate-950 inline-block shadow-2xs">
                  ${accountNo}
                </div>
                <div class="text-[10px] font-bold uppercase text-slate-800 mt-1 font-sans">${accountName}</div>
              </div>
              <div class="text-right font-sans">
                <div class="text-[10px] font-bold uppercase text-slate-600">For ${v.name}</div>
                <div class="text-[10px] italic text-slate-400 mt-3 border-t border-slate-400 pt-1">Authorized Signatory / अधिकृत हस्ताक्षरकर्ता</div>
              </div>
            </div>
          </div>

          <!-- Bottom MICR Band -->
          <div class="mt-3 pt-2 border-t border-slate-300 bg-white/80 -mx-5 -mb-5 px-5 py-2 font-mono text-center text-xs tracking-widest text-slate-700 select-all border-b-2 border-slate-400">
            ⑆000123⑆ &nbsp; 110024001⑈ &nbsp; ${micrCode}⑈ &nbsp; 10
          </div>
        </div>

        <!-- Electronic Remittance Mandate Table -->
        <div class="border border-slate-300 rounded bg-white p-3.5 text-xs">
          <div class="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
            <span>Official Electronic Fund Remittance (PFMS/NEFT/RTGS) Mandate</span>
            <span class="text-emerald-700 font-bold text-[10px]">Verified Core Banking Record</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700">
            <div class="p-2 bg-slate-50 rounded border border-slate-200">
              <div class="text-[9px] text-slate-500 font-bold uppercase">Account Name</div>
              <div class="font-bold text-slate-900 truncate">${accountName}</div>
            </div>
            <div class="p-2 bg-slate-50 rounded border border-slate-200">
              <div class="text-[9px] text-slate-500 font-bold uppercase">Account Number</div>
              <div class="font-mono font-bold text-slate-900">${accountNo}</div>
            </div>
            <div class="p-2 bg-slate-50 rounded border border-slate-200">
              <div class="text-[9px] text-slate-500 font-bold uppercase">IFSC Code</div>
              <div class="font-mono font-bold text-slate-900">${ifsc}</div>
            </div>
            <div class="p-2 bg-slate-50 rounded border border-slate-200">
              <div class="text-[9px] text-slate-500 font-bold uppercase">Bank & Branch</div>
              <div class="font-bold text-slate-900 truncate">${bankName}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderQuotationDoc(v, att, quotes, formatDate, adminCompName) {
    const vendorName = (v.name || 'Vendor Entity').toUpperCase().trim();
    const qtnNo = v.quotationNo || v.id;
    const qtnDate = formatDate(v.quotationDate || v.createdAt);
    const validTill = formatDate(v.quotationValidTill || v.approvalValidTill) !== '-' ? formatDate(v.quotationValidTill || v.approvalValidTill) : '12 Months (Firm & Fixed)';
    const fullAddress = [v.address, v.addressTaluka, v.addressDistrict, v.addressState ? (v.addressState + (v.addressPinCode ? ' - ' + v.addressPinCode : '')) : v.addressPinCode].filter(Boolean).join(', ');

    const items = (Array.isArray(quotes) && quotes.length > 0) ? quotes : [
      {
        materialName: v.quotedMaterialName || 'Approved Store Consumable Supplies',
        materialId: v.quotedMaterialId || 'MAT-CMS-001',
        hsn: v.quotedMaterialHsn || '8472',
        unit: v.quotedMaterialUnit || 'Nos',
        rate: v.quotedMaterialRate || 0,
        mrp: v.quotedMaterialMrp || 0
      }
    ];

    return `
      <div class="max-w-3xl mx-auto my-3 bg-white border-2 border-slate-800 p-6 shadow-xs font-sans text-slate-900">
        <!-- Vendor Letterhead -->
        <div class="border-b-2 border-slate-900 pb-3 mb-4">
          <div class="flex justify-between items-start gap-4">
            <div>
              <h2 class="text-xl font-black uppercase tracking-tight text-slate-900">${vendorName}</h2>
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-600 mt-0.5">Authorized Institutional Supplier & Distributor</div>
              <div class="text-[11px] text-slate-600 mt-1 leading-tight max-w-md">
                ${fullAddress || 'Registered Commercial Premises'}
              </div>
            </div>
            <div class="text-right text-[11px] font-mono text-slate-700 space-y-0.5 shrink-0">
              <div>GSTIN: <strong class="text-slate-900">${v.gstNo || '-'}</strong></div>
              <div>PAN: <strong class="text-slate-900">${v.panNo || '-'}</strong></div>
              <div>Contact: <span class="font-sans font-medium text-slate-800">${this.formatVendorPhone(v)}</span></div>
              <div>Email: <span class="font-sans font-medium text-slate-800">${v.email || '-'}</span></div>
            </div>
          </div>
        </div>

        <!-- Meta Header Box -->
        <div class="bg-slate-100 p-3 rounded border border-slate-300 mb-4 flex flex-wrap justify-between items-center gap-3">
          <div>
            <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quotation Ref</div>
            <div class="text-sm font-black font-mono text-slate-900">QTN-${qtnNo}</div>
            <div class="text-[10px] text-slate-600">Dated: <strong class="font-mono text-slate-800">${qtnDate}</strong></div>
          </div>
          <div class="text-center">
            <span class="inline-block px-3 py-1 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded">
              Commercial Price Quotation
            </span>
            <div class="text-[10px] text-slate-600 mt-1">Status: <strong class="text-slate-900">Firm & Certified</strong></div>
          </div>
          <div class="text-right">
            <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rate Validity</div>
            <div class="text-xs font-mono font-bold text-slate-900">${validTill}</div>
            <div class="text-[10px] text-slate-600">Payment: <strong class="text-slate-800">30 Days Net Credit</strong></div>
          </div>
        </div>

        <!-- Addressed To -->
        <div class="mb-4 text-xs text-slate-700 leading-normal border-l-2 border-slate-900 pl-3">
          <div><strong>To:</strong> The Central Purchase & Store Procurement Committee</div>
          <div><strong>Organization:</strong> ${adminCompName}</div>
          <div class="text-slate-500 text-[11px] mt-0.5"><strong>Subject:</strong> Formal Commercial Price Bid and Supply Schedule for Approved Store Materials.</div>
        </div>

        <!-- BOQ Pricing Table -->
        <div class="border border-slate-300 rounded overflow-hidden mb-4">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                <th class="p-2 border-r border-slate-200 text-center w-8">#</th>
                <th class="p-2 border-r border-slate-200 text-left">Material Description</th>
                <th class="p-2 border-r border-slate-200 text-center w-16">HSN/SAC</th>
                <th class="p-2 border-r border-slate-200 text-center w-14">UOM</th>
                <th class="p-2 border-r border-slate-200 text-right w-24">Quoted Rate (₹)</th>
                <th class="p-2 border-r border-slate-200 text-right w-20">MRP (₹)</th>
                <th class="p-2 text-center w-24">Tax Terms</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((q, qidx) => `
                <tr class="border-b border-slate-200 ${qidx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}">
                  <td class="p-2 border-r border-slate-200 text-center font-bold text-slate-500">${qidx + 1}</td>
                  <td class="p-2 border-r border-slate-200">
                    <div class="font-bold text-slate-900">${q.materialName || q.materialId || 'Consumable Supply'}</div>
                    <div class="text-[10px] text-slate-500 font-mono">${q.materialId || ''}</div>
                  </td>
                  <td class="p-2 border-r border-slate-200 text-center font-mono">${q.hsn || '-'}</td>
                  <td class="p-2 border-r border-slate-200 text-center font-medium">${q.unit || 'Nos'}</td>
                  <td class="p-2 border-r border-slate-200 text-right font-mono font-bold text-slate-900">₹${Number(q.rate || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td class="p-2 border-r border-slate-200 text-right font-mono text-slate-600">${q.mrpNotApplicable || !q.mrp ? 'N/A' : '₹' + Number(q.mrp).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td class="p-2 text-center text-[10px] text-slate-600 font-semibold">Excl. GST</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Commercial Terms -->
        <div class="text-[10px] text-slate-600 space-y-1 mb-5 bg-slate-50 p-2.5 rounded border border-slate-200">
          <div class="font-bold text-slate-800 uppercase tracking-wider mb-1">Standard Commercial Conditions:</div>
          <div>1. <strong>Delivery:</strong> F.O.R Destination within 7 business days from official Purchase Order receipt.</div>
          <div>2. <strong>Warranty & Quality:</strong> All materials guaranteed 100% brand new, authentic, undamaged, and strictly conforming to specifications.</div>
          <div>3. <strong>Payment:</strong> 30 days interest-free credit from receipt and acceptance of materials at central store.</div>
        </div>

        <!-- Dual Verification Seals -->
        <div class="grid grid-cols-2 gap-6 pt-3 border-t-2 border-slate-800">
          <!-- Store Verification Seal -->
          <div class="border border-slate-300 p-3 rounded bg-slate-50 flex items-center gap-3">
            <div class="w-12 h-12 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center shrink-0 text-slate-800 font-bold text-[8px] uppercase text-center leading-tight">
              CMS<br/>VERIFIED
            </div>
            <div class="text-[10px] text-slate-700">
              <div class="font-bold uppercase text-slate-900">Central Stores Inspection</div>
              <div>Quotation verified and placed on vendor empanelment record.</div>
              <div class="font-mono text-slate-500 mt-0.5">Verified: ${qtnDate}</div>
            </div>
          </div>

          <!-- Vendor Signatory -->
          <div class="text-right border border-slate-300 p-3 rounded bg-white flex flex-col justify-between">
            <div class="text-[10px] font-bold uppercase text-slate-500">For ${vendorName}</div>
            <div class="font-serif italic text-base font-bold text-slate-900 tracking-wider my-1">[ Authorized Signatory ]</div>
            <div class="text-[9px] text-slate-600">Partner / Proprietor / Director<br/>(Official Stamp & Seal Affixed)</div>
          </div>
        </div>
      </div>
    `;
  },

  renderRegulatoryCertDoc(v, att, certs, formatDate) {
    const vendorName = (v.name || 'Vendor Entity').toUpperCase().trim();
    const matchedCert = Array.isArray(certs) ? certs.find(c => (c && (c.fileName || c.filename || c.file || c.doc) === att.filename)) : null;
    const certTitle = att.title || matchedCert?.documentName || matchedCert?.name || 'Statutory Quality & Compliance Certificate';
    const certNo = matchedCert?.certificateNo || matchedCert?.formNo || v.certificateNo || 'CMS/REG/2026/8941';
    const validity = matchedCert ? (matchedCert.hasValidity && matchedCert.validTill ? formatDate(matchedCert.validTill) : 'Perpetual / In Force') : (v.approvalValidTill ? formatDate(v.approvalValidTill) : 'Perpetual / In Force');
    const fullAddress = [v.address, v.addressTaluka, v.addressDistrict, v.addressState ? (v.addressState + (v.addressPinCode ? ' - ' + v.addressPinCode : '')) : v.addressPinCode].filter(Boolean).join(', ');

    return `
      <div class="max-w-3xl mx-auto my-3 bg-white border-4 border-double border-slate-800 p-6 shadow-xs font-sans text-slate-900">
        <div class="text-center border-b border-slate-300 pb-4 mb-4">
          <div class="w-12 h-12 mx-auto rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase mb-2">
            CERT
          </div>
          <h2 class="text-lg font-black uppercase tracking-wider text-slate-900">Certificate of Compliance & Accreditation</h2>
          <div class="text-xs font-semibold uppercase text-slate-600 mt-1">Quality Management & Regulatory Benchmarks</div>
        </div>

        <div class="text-center my-4 space-y-2">
          <div class="text-xs text-slate-500 italic">This is to officially certify that the business operations and supply capabilities of:</div>
          <div class="text-xl font-black uppercase text-slate-950 tracking-wide">${vendorName}</div>
          <div class="text-xs text-slate-700 max-w-lg mx-auto">
            ${fullAddress || 'Registered Commercial Premises'}
          </div>
          <div class="text-xs text-slate-500 italic pt-2">Have been formally inspected and registered under:</div>
          <div class="text-base font-bold text-slate-900 uppercase tracking-tight">${certTitle}</div>
        </div>

        <div class="bg-slate-50 border border-slate-300 rounded p-3 text-xs my-4 grid grid-cols-3 gap-2 text-center">
          <div>
            <div class="text-[10px] text-slate-500 font-bold uppercase">Certificate / Reg No.</div>
            <div class="font-mono font-bold text-slate-900 mt-0.5">${certNo}</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-500 font-bold uppercase">Accreditation Scope</div>
            <div class="font-bold text-slate-900 mt-0.5">Consumable Supplies</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-500 font-bold uppercase">Validity Status</div>
            <div class="font-mono font-bold text-slate-900 mt-0.5">${validity}</div>
          </div>
        </div>

        <div class="mt-6 pt-3 border-t border-slate-300 flex justify-between items-end text-xs">
          <div class="text-[10px] text-slate-500">
            <div>Issued by Authorized Accreditation Council</div>
            <div>Official Electronic Register of Compliant Vendors</div>
          </div>
          <div class="text-right">
            <div class="font-serif italic text-base font-bold text-slate-900">[ Registrar Seal & Signature ]</div>
            <div class="text-[10px] text-slate-600 uppercase">Director of Quality & Standards</div>
          </div>
        </div>
      </div>
    `;
  },

  renderDocumentAnnexureContent(att, cachedData, seq, v, opts = {}) {
    const isPrint = Boolean(opts.isPrint);
    const formatDate = opts.formatDate || ((d) => d || '-');
    const quotes = opts.quotes || [];
    const certs = opts.certs || [];
    const adminCompName = opts.adminCompName || 'Central Procurement & Consumable Stores';

    const fnLower = (att.filename || '').toLowerCase();
    const titleLower = (att.title || '').toLowerCase();
    const catLower = (att.category || '').toLowerCase();
    const docTypeLower = (att.docType || '').toLowerCase();

    // Check if it's an image
    const isImage = (cachedData && (cachedData.startsWith('data:image') || /\.(png|jpg|jpeg|gif|webp)$/i.test(cachedData))) || /\.(png|jpg|jpeg|gif|webp)$/i.test(att.filename);

    if (isImage && cachedData) {
      return `
        <div class="text-center py-3 bg-white">
          <img src="${cachedData}" alt="${att.title}" class="max-w-full max-h-[750px] mx-auto border border-slate-300 rounded shadow-xs object-contain" />
          ${!isPrint ? `
            <div class="mt-2.5 flex justify-end gap-2 no-print">
              <button type="button" onclick="CMS_APP.previewFile('${att.filename}', '${cachedData}')" class="px-2.5 py-1 text-[11px] font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition inline-flex items-center gap-1 cursor-pointer">
                <i data-lucide="maximize-2" class="w-3 h-3"></i> Full Screen
              </button>
              <a href="${cachedData}" download="${att.filename}" class="px-2.5 py-1 text-[11px] font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition inline-flex items-center gap-1 cursor-pointer">
                <i data-lucide="download" class="w-3 h-3"></i> Download Image
              </a>
            </div>
          ` : ''}
        </div>
      `;
    }

    if (cachedData) {
      const cleanPdfUrl = cachedData.includes('#') ? cachedData : (cachedData + '#toolbar=0&navpanes=0&scrollbar=0&view=FitH');
      return `
        <div class="w-full">
          ${!isPrint ? `
            <div class="no-print flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-t text-xs mb-3">
              <div class="flex items-center gap-1.5 text-slate-700 font-medium">
                <span class="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Uploaded Document: ${att.title || att.filename}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button type="button" onclick="CMS_APP.previewFile('${att.filename}', '${cachedData}')" class="px-2.5 py-1 text-[11px] font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 rounded transition inline-flex items-center gap-1 cursor-pointer">
                  <i data-lucide="maximize-2" class="w-3 h-3"></i> Full Screen
                </button>
                <a href="${cachedData}" download="${att.filename}" class="px-2.5 py-1 text-[11px] font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 rounded transition inline-flex items-center gap-1 cursor-pointer">
                  <i data-lucide="download" class="w-3 h-3"></i> Download Original
                </a>
              </div>
            </div>
          ` : ''}
          <iframe src="${cleanPdfUrl}" class="w-full h-[650px] border border-slate-300 rounded shadow-xs" title="${att.title}"></iframe>
        </div>
      `;
    }

    return `
      <div class="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded text-slate-600">
        <i data-lucide="file-text" class="w-8 h-8 text-slate-400 mx-auto mb-2"></i>
        <div class="font-bold text-xs">${att.title || att.filename}</div>
        <div class="text-[11px] text-slate-500 mt-1">Uploaded document: <span class="font-mono text-slate-800">${att.filename}</span></div>
      </div>
    `;
  },

  renderVendorPaperFormHtml(v, options = {}) {
    if (!v) return '<div class="p-4 text-rose-600 font-bold">Vendor record not found</div>';
    const isPrint = Boolean(options.forPrint);
    const role = window.CMS_STORE.getRole();
    const stateInfo = this.getStateInfo(v.addressState);

    // Format dates helper
    const formatDate = (val) => {
      if (!val) return '-';
      try {
        if (typeof val === 'string' && val.includes('T')) {
          const d = new Date(val);
          if (!isNaN(d.getTime())) {
            return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
          }
        }
        return this.formatDisplayDate(val);
      } catch (e) {
        return val;
      }
    };

    // Normalize quotes list
    const quotes = (Array.isArray(v.quotedItems) && v.quotedItems.length > 0)
      ? v.quotedItems
      : (v.quotationNo || v.quotedMaterialName || v.quotationDoc)
        ? [{
            quotationNo: v.quotationNo || 'Direct',
            quotationDate: v.quotationDate || '',
            effectiveFrom: v.quotationDate || '',
            validTill: v.quotationValidTill || '',
            alertDays: 15,
            alertDate: '',
            materialId: v.quotedMaterialId || '',
            materialName: v.quotedMaterialName || 'Quoted Material',
            rate: v.quotedMaterialRate || 0,
            mrp: v.quotedMaterialMrp || 0,
            unit: v.quotedMaterialUnit || 'Nos',
            hsn: v.quotedMaterialHsn || '8472',
            doc: v.quotationDoc || '',
            docTitle: v.quotationDocTitle || 'Quotation Document'
          }]
        : [];

    // Normalize certs list
    const certs = (Array.isArray(v.certificates) && v.certificates.length > 0)
      ? v.certificates
      : (v.certificateFile)
        ? [{
            regulator: 'Regulatory / MSME / ISO Certificate',
            name: 'Regulatory / MSME / ISO Certificate',
            formNo: '-',
            certificateNo: '-',
            hasValidity: false,
            validTill: '',
            alertDays: 15,
            alertDate: '',
            fileName: v.certificateFile,
            documentName: 'Statutory Certificate'
          }]
        : [];

    // GST Breakdown
    const cleanGst = (v.gstNo || '').trim().toUpperCase();
    const gstState = cleanGst.length >= 2 ? cleanGst.substring(0, 2) : (stateInfo.code || '-');
    const gstPan = cleanGst.length >= 12 ? cleanGst.substring(2, 12) : (v.panNo || '-');
    const gstSuffix = cleanGst.length >= 15 ? cleanGst.substring(12, 15) : (cleanGst.length > 12 ? cleanGst.substring(12) : '-');

    // Build sequential attachments list matching the registration wizard steps:
    // Step 2: Statutory & Regulatory -> PAN, GST, Certificates
    // Step 3: Commercial Quotations
    // Step 4: Bank Details -> Bank Proof Mandate
    const attachments = [];
    const seenSlots = new Set();

    const addAttachment = (item) => {
      if (!item || !item.filename) return;
      const fn = String(item.filename).trim();
      if (!fn) return;

      const slotKey = item.slotId || `${item.docType}_${fn}`;
      if (seenSlots.has(slotKey)) return;

      // Only merge if it's the exact same document type AND same filename (e.g. multiple line items in same quotation)
      const existingInSameType = attachments.find(a => a.docType === item.docType && a.filename === fn);
      if (existingInSameType) {
        if (item.extraRef && !existingInSameType.extraRef?.includes(item.extraRef)) {
          existingInSameType.extraRef = existingInSameType.extraRef ? `${existingInSameType.extraRef}, ${item.extraRef}` : item.extraRef;
        }
        return;
      }

      seenSlots.add(slotKey);
      attachments.push({
        ...item,
        filename: fn
      });
    };

    // 1. Step 2: PAN Card
    const panFile = v.panCardFile || v.panFile || (v.panDetails && v.panDetails.file) || '';
    if (panFile && !v.panNotApplicable) {
      addAttachment({
        slotId: 'pan',
        filename: panFile,
        title: v.panDocTitle || 'PAN Card Copy',
        category: 'Statutory Identification (PAN)',
        docType: 'pan'
      });
    }

    // 2. Step 2: GST Certificate
    const gstFile = v.gstCertificateFile || v.gstFile || (v.gstDetails && v.gstDetails.file) || '';
    if (gstFile && !v.gstNotApplicable) {
      addAttachment({
        slotId: 'gst',
        filename: gstFile,
        title: v.gstDocTitle || 'GST Registration Certificate',
        category: 'Statutory GSTIN Registration',
        docType: 'gst'
      });
    }

    // 3. Step 2: Regulatory & Compliance Certificates
    let certDocAdded = false;
    certs.forEach((c, idx) => {
      const cFile = (c && (c.fileName || c.filename || c.file || c.documentFile || c.certFile || c.doc)) || (certs.length === 1 ? v.certificateFile : '');
      if (cFile) {
        const certTitle = (c && (c.documentName || c.docTitle)) || (c && c.regulator ? (c.regulator + (c.certificateNo ? ` (${c.certificateNo})` : '')) : (c && c.name ? c.name : 'Regulatory License'));
        addAttachment({
          slotId: `cert_${idx}`,
          filename: cFile,
          title: certTitle,
          category: 'Regulatory Compliance / License',
          docType: 'cert'
        });
        certDocAdded = true;
      }
    });

    if (!certDocAdded && v.certificateFile) {
      addAttachment({
        slotId: 'cert_top',
        filename: v.certificateFile,
        title: v.certificateDocTitle || 'Regulatory / MSME / ISO Certificate',
        category: 'Regulatory Compliance / License',
        docType: 'cert'
      });
    }

    // 4. Step 3: Commercial Quotation Documents
    let quoteDocAdded = false;
    quotes.forEach((q, idx) => {
      const qDoc = (q && (q.doc || q.document || q.file || q.quotationDoc || q.fileName || q.filename)) || (quotes.length === 1 ? v.quotationDoc : '');
      if (qDoc) {
        const qTitle = (q && q.docTitle) || (q && q.quotationNo ? `Quotation Ref: ${q.quotationNo}` : (q && q.materialName ? `Quotation - ${q.materialName}` : (v.quotationNo ? `Quotation Ref: ${v.quotationNo}` : 'Commercial Quotation')));
        addAttachment({
          slotId: `quote_${idx}`,
          filename: qDoc,
          title: qTitle,
          category: 'Commercial Quotation',
          docType: 'quote',
          extraRef: (q && (q.materialName || q.materialId)) || v.quotedMaterialName || ''
        });
        quoteDocAdded = true;
      }
    });

    if (!quoteDocAdded && v.quotationDoc) {
      addAttachment({
        slotId: 'quote_top',
        filename: v.quotationDoc,
        title: v.quotationDocTitle || (v.quotationNo ? `Quotation Ref: ${v.quotationNo}` : 'Commercial Quotation'),
        category: 'Commercial Quotation',
        docType: 'quote',
        extraRef: v.quotedMaterialName || ''
      });
    }

    // 5. Step 4: Bank Supporting Document
    const bankDocFile = v.bankDoc || v.bankFile || v.bankCertificate || v.bankDocFile || (v.bankDetails && (v.bankDetails.bankDoc || v.bankDetails.bankFile)) || '';
    if (bankDocFile) {
      addAttachment({
        slotId: 'bank',
        filename: bankDocFile,
        title: v.bankDocTitle || (v.bankDetails && v.bankDetails.bankDocTitle) || 'Cancelled Cheque / Bank Statement',
        category: 'Banking Mandate & Remittance Proof',
        docType: 'bank'
      });
    }

    const getAnnexureSeq = (identifier, docType, slotId) => {
      if (!identifier && !docType && !slotId) return null;
      let idx = -1;
      if (slotId) {
        idx = attachments.findIndex(a => a.slotId === slotId);
      }
      if (idx === -1 && docType) {
        idx = attachments.findIndex(a => a.docType === docType && (!identifier || a.filename === identifier));
      }
      if (idx === -1 && identifier) {
        idx = attachments.findIndex(a => a.filename === identifier || a.slotId === identifier);
      }
      return idx !== -1 ? idx + 1 : null;
    };

    const panSeq = getAnnexureSeq(panFile, 'pan', 'pan');
    const gstSeq = getAnnexureSeq(gstFile, 'gst', 'gst');
    const bankSeq = getAnnexureSeq(bankDocFile, 'bank', 'bank');

    // Admin Company Information (from Settings / Company Profile)
    let companyInfo = {};
    try {
      if (window.CMS_HOME && window.CMS_HOME.companyInfo) {
        companyInfo = window.CMS_HOME.companyInfo;
      } else {
        companyInfo = JSON.parse(localStorage.getItem('CMS_COMPANY_INFO') || '{}') || {};
      }
    } catch (e) {
      companyInfo = {};
    }

    const currentUser = (window.CMS_STORE && window.CMS_STORE.getCurrentUser) ? window.CMS_STORE.getCurrentUser() : null;

    // Purge any dummy "Adminutes" default
    let rawName = (companyInfo.name || '').trim();
    if (rawName.toLowerCase().includes('adminutes')) rawName = '';

    let tenantName = (window.CMS_TENANT_NAME || (typeof localStorage !== 'undefined' ? localStorage.getItem('CMS_TENANT_NAME_CACHE') : '') || '').trim();
    if (tenantName.toLowerCase().includes('adminutes')) tenantName = '';

    let storeCompName = (window.CMS_STORE && window.CMS_STORE.data && (window.CMS_STORE.data.companyName || window.CMS_STORE.data.companyInfo?.name) || '').trim();
    if (storeCompName.toLowerCase().includes('adminutes')) storeCompName = '';

    const userDept = (currentUser && currentUser.department && !currentUser.department.toLowerCase().includes('adminutes')) ? currentUser.department : '';
    const userName = (currentUser && currentUser.name && !currentUser.name.toLowerCase().includes('adminutes')) ? currentUser.name : '';

    const adminCompName = rawName || tenantName || storeCompName || userDept || (userName ? `${userName}'s Organization` : 'Central Store Operations');

    let rawAddress = (companyInfo.address || '').trim();
    if (rawAddress.toLowerCase().includes('enterprise way') || rawAddress.toLowerCase().includes('adminutes')) rawAddress = '';

    const adminAddressParts = [
      rawAddress,
      companyInfo.taluka,
      companyInfo.district,
      companyInfo.state ? (companyInfo.state + (companyInfo.pin ? ' - ' + companyInfo.pin : '')) : companyInfo.pin,
      companyInfo.country || ''
    ].filter(Boolean);

    const adminAddressStr = adminAddressParts.length > 0 ? adminAddressParts.join(', ') : '';

    let adminGstin = (companyInfo.gstin || '').trim();
    if (adminGstin.toLowerCase().includes('29abcde1234f1z5')) adminGstin = '';

    let adminPan = (companyInfo.pan || '').trim();

    let adminContact = (companyInfo.contact || '').trim();
    if (adminContact.toLowerCase().includes('adminutes')) adminContact = '';
    if (/^India\b/i.test(adminContact)) {
      adminContact = adminContact.replace(/^India\s*/i, '+91 ');
    }

    let adminEmail = (companyInfo.email || '').trim();
    if (adminEmail.toLowerCase().includes('adminutes')) adminEmail = '';
    if (!adminEmail && currentUser && currentUser.email && !currentUser.email.toLowerCase().includes('adminutes')) {
      adminEmail = currentUser.email;
    }

    // Only show custom user logo if uploaded; never show Adminutes logo
    const customLogo = (companyInfo.logo && !companyInfo.logo.includes('adminutes_logo')) ? companyInfo.logo : (companyInfo.logoUrl && !companyInfo.logoUrl.includes('adminutes_logo') ? companyInfo.logoUrl : null);

    return `
      <div id="vendor-paper-form" data-vendor-id="${v.id}" class="space-y-5 text-xs bg-white ${isPrint ? 'p-0 border-0 shadow-none' : 'p-6 border border-slate-300 shadow-sm'} text-slate-800">
        
        <!-- Official Document Letterhead & Header -->
        <div class="${isPrint ? 'pb-4 mb-4' : 'border-b-2 border-slate-900 pb-4 mb-4'}">
          <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div class="flex items-start gap-3.5 max-w-xl">
              ${customLogo ? `
                <img src="${customLogo}" alt="Company Logo" class="h-14 w-auto rounded border border-slate-300 object-contain shadow-2xs mt-0.5 shrink-0" onerror="this.style.display='none'" />
              ` : ''}
              <div>
                <h1 class="text-xl font-black tracking-tight text-slate-900 uppercase leading-snug">${adminCompName}</h1>
                ${adminAddressStr ? `
                  <div class="text-[11px] text-slate-600 mt-1 leading-normal font-medium">
                    ${adminAddressStr}
                  </div>
                ` : ''}
                ${(adminGstin || adminPan) ? `
                  <div class="text-[11px] text-slate-700 mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono">
                    ${adminGstin ? `<span>GSTIN: <strong class="text-slate-900 font-bold">${adminGstin}</strong></span>` : ''}
                    ${adminPan ? `<span>PAN: <strong class="text-slate-900 font-bold">${adminPan}</strong></span>` : ''}
                  </div>
                ` : ''}
                ${(adminContact || adminEmail) ? `
                  <div class="text-[11px] text-slate-600 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 font-sans">
                    ${adminContact ? `<span>Contact: <strong class="font-mono text-slate-800">${adminContact}</strong></span>` : ''}
                    ${adminEmail ? `<span>Email: <strong class="text-slate-800">${adminEmail}</strong></span>` : ''}
                  </div>
                ` : ''}
                <div class="text-[10px] text-slate-800 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                  <span class="inline-block w-2 h-2 rounded-full bg-slate-800 shrink-0"></span>
                  <span>Central Procurement & Consumable Management System (CMS)</span>
                </div>
              </div>
            </div>
            <div class="text-left sm:text-right border-l-2 sm:border-l-0 sm:border-r-0 border-slate-300 pl-3 sm:pl-0 shrink-0">
              <span class="inline-block px-3 py-1 bg-slate-900 text-white font-bold text-[11px] tracking-wider uppercase rounded">
                VENDOR EMPANELMENT & REGISTRATION FORM
              </span>
              <div class="mt-1.5 text-xs">
                <span class="text-slate-500 font-medium">Form Ref:</span>
                <strong class="font-mono font-bold text-slate-900 ml-1">CMS/VRF/${v.id}</strong>
              </div>
              <div class="text-xs">
                <span class="text-slate-500 font-medium">Status:</span>
                <span class="font-bold ml-1 text-slate-900">${(v.status || 'Pending Approval').toUpperCase()}</span>
              </div>
              <div class="text-[11px] text-slate-500 mt-0.5">
                Date: <strong class="text-slate-700 font-mono">${formatDate(v.createdAt || new Date())}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- 1. Organization & Business Details -->
        <div class="border border-slate-300 rounded overflow-hidden">
          <div class="bg-slate-100 px-3.5 py-1.5 border-b border-slate-300 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
            <span>1. Organization & General Business Particulars</span>
            <span class="text-[10px] text-slate-500 font-normal">Section 1 of 8</span>
          </div>
          <table class="w-full text-xs border-collapse">
            <tbody>
              <tr class="border-b border-slate-200">
                <td class="w-1/4 p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Legal Business Name</td>
                <td class="w-1/4 p-2 font-bold text-slate-900 border-r border-slate-200">${v.name}</td>
                <td class="w-1/4 p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Constitution / Entity Type</td>
                <td class="w-1/4 p-2 font-medium text-slate-800">${v.constitution || 'Not Specified'}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Country of Origin</td>
                <td class="p-2 font-medium text-slate-800 border-r border-slate-200">${v.addressCountry || 'India'}</td>
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">State / UT (Code)</td>
                <td class="p-2 font-medium text-slate-800">${v.addressState || '-'} ${stateInfo.code ? `(${stateInfo.code})` : ''}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">District</td>
                <td class="p-2 font-medium text-slate-800 border-r border-slate-200">${v.addressDistrict || '-'}</td>
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Taluka / Tehsil</td>
                <td class="p-2 font-medium text-slate-800">${v.addressTaluka || '-'}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Registered Premises Address</td>
                <td class="p-2 font-medium text-slate-800 border-r border-slate-200">${v.address || '-'}</td>
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">PIN / Postal Code</td>
                <td class="p-2 font-mono font-bold text-slate-900">${v.addressPinCode || '-'}</td>
              </tr>
              <tr>
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Official Contact Number</td>
                <td class="p-2 font-mono font-medium text-slate-800 border-r border-slate-200">${this.formatVendorPhone(v)}</td>
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Official Email Address</td>
                <td class="p-2 font-medium text-slate-800">${v.email || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 2. Statutory Identifications (Tax & Legal) -->
        <div class="border border-slate-300 rounded overflow-hidden">
          <div class="bg-slate-100 px-3.5 py-1.5 border-b border-slate-300 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
            <span>2. Statutory Tax & Identification Credentials</span>
            <span class="text-[10px] text-slate-500 font-normal">Section 2 of 8</span>
          </div>
          <table class="w-full text-xs border-collapse">
            <tbody>
              <tr class="border-b border-slate-200">
                <td class="w-1/4 p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Income Tax PAN No.</td>
                <td class="w-1/4 p-2 border-r border-slate-200">
                  <div class="font-mono font-bold text-sm text-slate-900">${v.panNotApplicable ? 'EXEMPT / NOT APPLICABLE' : (v.panNo || 'Not Recorded')}</div>
                  <div class="text-[10px] text-slate-500">${v.panNotApplicable ? 'Exempt under IT Rules' : 'Income Tax Department PAN'}</div>
                  <div class="mt-1.5 pt-1.5 border-t border-slate-200 text-[10px]">
                    <div class="flex items-center justify-between">
                      <span class="text-slate-500 font-medium">Attached Proof:</span>
                      ${panFile ? `
                        <span class="text-[9px] font-bold text-slate-900 bg-white border border-slate-400 px-1.5 py-0.2 rounded font-mono">
                          Annexure Doc #${panSeq}
                        </span>
                      ` : ''}
                    </div>
                    ${panFile ? `
                      <div class="text-slate-800 font-mono font-bold truncate mt-0.5" title="${panFile}">${panFile}</div>
                      <div class="text-[9px] text-slate-500 italic mt-0.5">(See Section 8 at end of form)</div>
                    ` : `<div class="text-slate-400 italic mt-0.5">${v.panNotApplicable ? 'Not Applicable (Exempt)' : 'No document attached'}</div>`}
                  </div>
                </td>
                <td class="w-1/4 p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">GSTIN Registration No.</td>
                <td class="w-1/4 p-2">
                  <div class="font-mono font-bold text-sm text-slate-900">${v.gstNotApplicable ? 'EXEMPT / NOT REGISTERED' : (v.gstNo || 'Not Registered')}</div>
                  ${!v.gstNotApplicable && v.gstNo ? `
                    <div class="text-[10px] text-slate-500 font-mono mt-0.5">State: <strong>${gstState}</strong> | PAN: <strong>${gstPan}</strong> | Suffix: <strong>${gstSuffix}</strong></div>
                  ` : `<div class="text-[10px] text-slate-500">Exempt from GST under threshold/category</div>`}
                  <div class="mt-1.5 pt-1.5 border-t border-slate-200 text-[10px]">
                    <div class="flex items-center justify-between">
                      <span class="text-slate-500 font-medium">Attached Certificate:</span>
                      ${gstFile ? `
                        <span class="text-[9px] font-bold text-slate-900 bg-white border border-slate-400 px-1.5 py-0.2 rounded font-mono">
                          Annexure Doc #${gstSeq}
                        </span>
                      ` : ''}
                    </div>
                    ${gstFile ? `
                      <div class="text-slate-800 font-mono font-bold truncate mt-0.5" title="${gstFile}">${gstFile}</div>
                      <div class="text-[9px] text-slate-500 italic mt-0.5">(See Section 8 at end of form)</div>
                    ` : `<div class="text-slate-400 italic mt-0.5">${v.gstNotApplicable ? 'Not Applicable (Exempt)' : 'No document attached'}</div>`}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 3. Banking & Remittance Particulars -->
        <div class="border border-slate-300 rounded overflow-hidden">
          <div class="bg-slate-100 px-3.5 py-1.5 border-b border-slate-300 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
            <span>3. Banking & Remittance Particulars (PFMS / RTGS / NEFT)</span>
            <span class="text-[10px] text-slate-500 font-normal">Section 3 of 8</span>
          </div>
          <table class="w-full text-xs border-collapse">
            <tbody>
              <tr class="border-b border-slate-200">
                <td class="w-1/4 p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Bank Name</td>
                <td class="w-1/4 p-2 font-bold text-slate-900 border-r border-slate-200">${v.bankName || '-'}</td>
                <td class="w-1/4 p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Branch Name</td>
                <td class="w-1/4 p-2 font-medium text-slate-800">${v.branchName || '-'}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Beneficiary / Account Name</td>
                <td class="p-2 font-medium text-slate-800 border-r border-slate-200">${v.accountName || v.name || '-'}</td>
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Bank Account Number</td>
                <td class="p-2 font-mono font-bold text-slate-900">${v.accountNo || '-'}</td>
              </tr>
              <tr>
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">IFSC Code (11 Chars)</td>
                <td class="p-2 font-mono font-bold text-slate-900 border-r border-slate-200">${v.ifscCode || '-'}</td>
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Bank Verification Proof</td>
                <td class="p-2">
                  <div class="text-[11px] font-bold text-slate-800">${v.bankDocTitle || (v.bankDetails && v.bankDetails.bankDocTitle) || 'Cancelled Cheque / Bank Statement'}</div>
                  <div class="mt-1 pt-1 border-t border-slate-200 text-[10px]">
                    <div class="flex items-center justify-between">
                      <span class="text-slate-500 font-medium">Document File:</span>
                      ${bankDocFile ? `
                        <span class="text-[9px] font-bold text-slate-900 bg-white border border-slate-400 px-1.5 py-0.2 rounded font-mono">
                          Annexure Doc #${bankSeq}
                        </span>
                      ` : ''}
                    </div>
                    ${bankDocFile ? `
                      <div class="text-slate-800 font-mono font-bold truncate mt-0.5" title="${bankDocFile}">${bankDocFile}</div>
                      <div class="text-[9px] text-slate-500 italic mt-0.5">(See Section 8 at end of form)</div>
                    ` : `<div class="text-slate-400 italic mt-0.5">No document attached</div>`}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 4. Commercial Quotations & Approved Materials Catalog -->
        <div class="border border-slate-300 rounded overflow-hidden">
          <div class="bg-slate-100 px-3.5 py-1.5 border-b border-slate-300 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
            <span>4. Commercial Quotations & Approved Material Catalog</span>
            <span class="text-[10px] text-slate-500 font-normal">Section 4 of 8 (${quotes.length} Items)</span>
          </div>
          ${quotes.length === 0 ? `
            <div class="p-4 text-center text-slate-400 italic text-xs">No commercial quotations or approved materials recorded.</div>
          ` : `
            <table class="w-full text-[11px] border-collapse text-left">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-300 text-slate-700 font-bold">
                  <th class="p-2 border-r border-slate-200 text-center w-8">#</th>
                  <th class="p-2 border-r border-slate-200">Material Description</th>
                  <th class="p-2 border-r border-slate-200 text-center w-16">HSN</th>
                  <th class="p-2 border-r border-slate-200 text-center w-12">UOM</th>
                  <th class="p-2 border-r border-slate-200 text-right w-20">Rate (₹)</th>
                  <th class="p-2 border-r border-slate-200 text-right w-20">MRP (₹)</th>
                  <th class="p-2 border-r border-slate-200">Quote Ref & Date</th>
                  <th class="p-2 border-r border-slate-200">Validity & Alert</th>
                  <th class="p-2">Document</th>
                </tr>
              </thead>
              <tbody>
                ${quotes.map((q, idx) => {
                  const qDoc = (q && (q.doc || q.document || q.file || q.quotationDoc || q.fileName || q.filename)) || (quotes.length === 1 ? v.quotationDoc : '');
                  const qSeq = getAnnexureSeq(qDoc, 'quote', `quote_${idx}`);
                  return `
                    <tr class="border-b border-slate-200 ${idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}">
                      <td class="p-2 border-r border-slate-200 text-center font-bold text-slate-500">${idx + 1}</td>
                      <td class="p-2 border-r border-slate-200">
                        <div class="font-bold text-slate-900">${q.materialName || q.materialId || '-'}</div>
                        <div class="text-[10px] text-slate-500 font-mono">${q.materialId || ''}</div>
                      </td>
                      <td class="p-2 border-r border-slate-200 text-center font-mono">${q.hsn || '-'}</td>
                      <td class="p-2 border-r border-slate-200 text-center font-semibold">${q.unit || 'Nos'}</td>
                      <td class="p-2 border-r border-slate-200 text-right font-mono font-bold text-slate-900">₹${Number(q.rate || 0).toFixed(2)}</td>
                      <td class="p-2 border-r border-slate-200 text-right font-mono text-slate-600">${q.mrpNotApplicable || !q.mrp ? 'N/A' : '₹' + Number(q.mrp).toFixed(2)}</td>
                      <td class="p-2 border-r border-slate-200">
                        <div class="font-semibold text-slate-800">${q.quotationNo || 'Direct Quote'}</div>
                        <div class="text-[10px] text-slate-500 font-mono">Date: ${formatDate(q.quotationDate)}</div>
                      </td>
                      <td class="p-2 border-r border-slate-200">
                        <div class="text-[10px] text-slate-700">Valid Till: <strong class="font-mono">${formatDate(q.validTill || q.quotationValidTill)}</strong></div>
                        <div class="text-[9px] text-emerald-700 font-semibold flex items-center gap-1"><i data-lucide="mail-check" class="w-3 h-3 text-emerald-600"></i> Auto-Mail: Active (7:00 AM)</div>
                      </td>
                      <td class="p-2">
                        ${qDoc ? `
                          <div class="text-[10px] text-slate-700 font-mono truncate max-w-[120px]" title="${qDoc}">${qDoc}</div>
                          ${qSeq ? `<div class="text-[9px] text-slate-900 font-bold">Annexure #${qSeq}</div>` : ''}
                          ${!isPrint ? `<button type="button" onclick="CMS_APP.previewFile('${qDoc}')" class="text-[10px] text-blue-600 hover:underline block mt-0.5">View File</button>` : ''}
                        ` : '<span class="text-slate-400 italic text-[10px]">None</span>'}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `}
        </div>

        <!-- 5. Regulatory Licenses & Compliance Certificates -->
        <div class="border border-slate-300 rounded overflow-hidden">
          <div class="bg-slate-100 px-3.5 py-1.5 border-b border-slate-300 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
            <span>5. Regulatory Licenses & Quality Accreditations</span>
            <span class="text-[10px] text-slate-500 font-normal">Section 5 of 8 (${certs.length} Certificates)</span>
          </div>
          ${certs.length === 0 ? `
            <div class="p-4 text-center text-slate-400 italic text-xs">No regulatory compliance certificates or quality accreditations recorded.</div>
          ` : `
            <table class="w-full text-[11px] border-collapse text-left">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-300 text-slate-700 font-bold">
                  <th class="p-2 border-r border-slate-200 text-center w-8">#</th>
                  <th class="p-2 border-r border-slate-200">Accreditation / Authority</th>
                  <th class="p-2 border-r border-slate-200 text-center w-24">Form / Std</th>
                  <th class="p-2 border-r border-slate-200">Registration / License No.</th>
                  <th class="p-2 border-r border-slate-200 text-center w-24">Validity Type</th>
                  <th class="p-2 border-r border-slate-200">Valid Till Date</th>
                  <th class="p-2 border-r border-slate-200">Expiry Alert</th>
                  <th class="p-2">Document</th>
                </tr>
              </thead>
              <tbody>
                ${certs.map((c, idx) => {
                  const cFile = (c && (c.fileName || c.filename || c.file || c.documentFile || c.certFile || c.doc)) || (certs.length === 1 ? v.certificateFile : '');
                  const cSeq = getAnnexureSeq(cFile, 'cert', `cert_${idx}`);
                  return `
                    <tr class="border-b border-slate-200 ${idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}">
                      <td class="p-2 border-r border-slate-200 text-center font-bold text-slate-500">${idx + 1}</td>
                      <td class="p-2 border-r border-slate-200 font-bold text-slate-900">${(c && (c.regulator || c.name)) || 'Statutory Certificate'}</td>
                      <td class="p-2 border-r border-slate-200 text-center font-mono text-slate-600">${(c && c.formNo) || '-'}</td>
                      <td class="p-2 border-r border-slate-200 font-mono font-medium text-slate-800">${(c && c.certificateNo) || '-'}</td>
                      <td class="p-2 border-r border-slate-200 text-center font-semibold text-slate-900">${c && c.hasValidity ? 'Time-Bound' : 'Perpetual'}</td>
                      <td class="p-2 border-r border-slate-200 font-mono">${c && c.hasValidity && c.validTill ? formatDate(c.validTill) : 'Lifetime / No Expiry'}</td>
                      <td class="p-2 border-r border-slate-200 text-[10px] text-slate-600">
                        ${c && c.hasValidity ? `<div class="text-[9px] text-emerald-700 font-semibold flex items-center gap-1"><i data-lucide="mail-check" class="w-3 h-3 text-emerald-600"></i> Auto-Mail: Active (7:00 AM)</div>` : ''}
                      </td>
                      <td class="p-2">
                        ${cFile ? `
                          <div class="text-[10px] text-slate-700 font-mono truncate max-w-[120px]" title="${cFile}">${cFile}</div>
                          ${cSeq ? `<div class="text-[9px] text-slate-900 font-bold">Annexure #${cSeq}</div>` : ''}
                          ${!isPrint ? `<button type="button" onclick="CMS_APP.previewFile('${cFile}')" class="text-[10px] text-blue-600 hover:underline block mt-0.5">View File</button>` : ''}
                        ` : '<span class="text-slate-400 italic text-[10px]">None</span>'}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `}
        </div>

        <!-- 6. Governance, Administrative Approval & Audit Trail -->
        <div class="border border-slate-300 rounded overflow-hidden">
          <div class="bg-slate-100 px-3.5 py-1.5 border-b border-slate-300 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
            <span>6. Administrative Governance, Sanction & Audit Trail</span>
            <span class="text-[10px] text-slate-500 font-normal">Section 6 of 8</span>
          </div>
          <table class="w-full text-xs border-collapse">
            <tbody>
              <tr class="border-b border-slate-200">
                <td class="w-1/4 p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Empanelment Category</td>
                <td class="w-1/4 p-2 font-medium text-slate-800 border-r border-slate-200">
                  ${v.approvedForLimitedPeriod ? `
                    <span class="font-bold text-slate-900">Limited Period Approval</span>
                    <div class="text-[10px] text-slate-600 font-mono">Valid Till: ${formatDate(v.approvalValidTill)} (Alert: ${v.approvalAlertDays || 15}d prior on ${formatDate(v.approvalAlertDate)})</div>
                  ` : `
                    <span class="font-bold text-slate-900">Perpetual / Regular Empanelment</span>
                  `}
                </td>
                <td class="w-1/4 p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Risk & Blacklist Status</td>
                <td class="w-1/4 p-2 font-medium">
                  ${v.isBlocked ? `
                    <span class="font-bold text-slate-900">BLACKLISTED / BLOCKED</span>
                    <div class="text-[10px] text-slate-700">Reason: ${v.blockReason || 'Administrative order'}</div>
                  ` : `
                    <span class="font-bold text-slate-900">Cleared & In Good Standing</span>
                  `}
                </td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Registration Initiated By</td>
                <td class="p-2 font-medium text-slate-800 border-r border-slate-200">
                  <div>${v.createdByName || v.createdBy || 'Store Staff'}</div>
                  <div class="text-[10px] text-slate-500 font-mono">Initiated: ${formatDate(v.createdAt)}</div>
                </td>
                <td class="p-2 bg-slate-50 font-semibold text-slate-600 border-r border-slate-200">Sanctioning / Approval Authority</td>
                <td class="p-2 font-medium text-slate-800">
                  <div>${v.approvedBy || (v.status === 'Approved' ? 'Col. Anita Sharma (Admin)' : 'Pending Review')}</div>
                  <div class="text-[10px] text-slate-500 font-mono">Date: ${formatDate(v.approvedAt)}</div>
                </td>
              </tr>
              ${v.checkerMistakeRemark ? `
                <tr>
                  <td class="p-2 ${isPrint ? 'bg-slate-100 font-semibold text-slate-800' : 'bg-rose-50 font-semibold text-rose-800'} border-r border-slate-200">Checker Review / Mistake Remark</td>
                  <td colspan="3" class="p-2 font-medium ${isPrint ? 'text-slate-900 bg-white' : 'text-rose-900 bg-rose-50/30'}">
                    <div>${v.checkerMistakeRemark}</div>
                    <div class="text-[10px] ${isPrint ? 'text-slate-600' : 'text-rose-600'}">Reviewed By: ${v.rejectedBy || 'Store In-Charge'}</div>
                  </td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>

        <!-- 7. Undertaking & Tri-Partite Authorization Signatures -->
        <div class="border border-slate-300 rounded p-4 bg-slate-50/50 space-y-4">
          <div class="bg-slate-100 -mx-4 -mt-4 mb-3 px-3.5 py-1.5 border-b border-slate-300 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
            <span>7. Undertaking & Tri-Partite Authorization Signatures</span>
            <span class="text-[10px] text-slate-500 font-normal">Section 7 of 8</span>
          </div>

          <div class="text-[11px] text-slate-600 leading-relaxed italic border-b border-slate-200 pb-2.5">
            <strong>Statutory Undertaking:</strong> We hereby solemnly affirm and certify that all particulars, statutory registrations, bank credentials, and commercial quotations recorded in this registration form are true, correct, and legally valid. Any misrepresentation shall render this empanelment immediately null and void.
          </div>

          <div class="grid grid-cols-3 gap-4 pt-2">
            <!-- Box 1: Vendor Signatory -->
            <div class="border border-slate-300 bg-white p-3 rounded flex flex-col justify-between h-32">
              <div class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Authorized Signatory of Vendor</div>
              <div class="text-center text-slate-400 italic text-[10px]">[ Seal & Signature ]</div>
              <div class="border-t border-slate-200 pt-1 text-[10px] text-slate-700">
                <div>Name: ______________________</div>
                <div>Designation: ________________</div>
                <div>Date: _______________________</div>
              </div>
            </div>

            <!-- Box 2: Store Dealing Assistant -->
            <div class="border border-slate-300 bg-white p-3 rounded flex flex-col justify-between h-32">
              <div class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Store Dealing Assistant (Maker)</div>
              <div class="text-center font-mono font-bold text-slate-900 text-xs">${v.createdByName || 'Store Staff'}</div>
              <div class="border-t border-slate-200 pt-1 text-[10px] text-slate-700">
                <div>Emp ID: CMS-M-01</div>
                <div>Role: Store Keeper / Maker</div>
                <div>Verified: ${formatDate(v.createdAt)}</div>
              </div>
            </div>

            <!-- Box 3: Approving Officer -->
            <div class="border border-slate-300 bg-white p-3 rounded flex flex-col justify-between h-32">
              <div class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Store In-Charge / Approver (Checker)</div>
              <div class="text-center font-bold text-slate-900 text-xs">${v.approvedBy || (v.status === 'Approved' ? 'Col. Anita Sharma' : 'Pending Sanction')}</div>
              <div class="border-t border-slate-200 pt-1 text-[10px] text-slate-700">
                <div>Rank: Officer In-Charge</div>
                <div>Designation: Central Stores Head</div>
                <div>Sanctioned: ${formatDate(v.approvedAt)}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 8. Attached Supporting Documents & Statutory Scans (Annexures) -->
        <div class="border border-slate-300 rounded overflow-hidden mt-6 ${isPrint ? 'break-before-page' : ''}">
          <div class="bg-slate-100 px-3.5 py-1.5 border-b border-slate-300 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span>8. Attached Supporting Documents & Statutory Scans (Annexures)</span>
              <span class="bg-slate-900 text-white text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">${attachments.length} ${attachments.length === 1 ? 'Attachment' : 'Attachments'}</span>
            </div>
            <span class="text-[10px] text-slate-500 font-normal">Section 8 of 8</span>
          </div>

          ${attachments.length === 0 ? `
            <div class="p-6 text-center text-slate-400 italic text-xs bg-white">
              No physical or digital supporting documents attached with this vendor registration.
            </div>
          ` : `
            <div class="p-4 bg-white space-y-6">
              <div class="text-[11px] text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 rounded p-2.5">
                <strong>Sequential Document Annexures:</strong> All supporting statutory records, regulatory accreditations, commercial quotes, and bank verification mandates are appended below in the exact sequential order of their upload during registration.
              </div>

              ${attachments.map((att, index) => {
                const seq = index + 1;
                const cachedData = options.fileCache ? options.fileCache[att.filename] : null;
                const isImage = cachedData ? (cachedData.startsWith('data:image') || cachedData.match(/\.(png|jpg|jpeg|gif)$/i)) : att.filename.match(/\.(png|jpg|jpeg|gif)$/i);

                return `
                  <div class="border border-slate-300 rounded bg-white overflow-hidden shadow-2xs ${isPrint ? 'break-inside-avoid my-4' : ''}">
                    <!-- Document Header Bar with User Title -->
                    <div class="bg-slate-100 px-3 py-2 border-b border-slate-300 flex flex-wrap items-center justify-between gap-2">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="inline-flex items-center justify-center w-6 h-6 bg-slate-800 text-white text-[11px] font-bold rounded-full shrink-0 font-mono">
                          ${seq}
                        </span>
                        <div>
                          <div class="text-xs font-bold text-slate-900 tracking-tight uppercase flex items-center gap-2">
                            <span>${att.title}</span>
                          </div>
                          <div class="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                            <span>Filename: <strong class="text-slate-800">${att.filename}</strong></span>
                            ${att.extraRef ? `<span class="text-slate-400">| Covers: ${att.extraRef}</span>` : ''}
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center gap-2 shrink-0">
                        <span class="text-[9px] uppercase font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
                          ${att.category}
                        </span>
                        <span class="text-[10px] font-mono font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          Annexure #${seq}
                        </span>
                      </div>
                    </div>

                    <!-- Document Body / Scan Preview -->
                    <div class="p-3 bg-white">
                      ${this.renderDocumentAnnexureContent(att, cachedData, seq, v, { isPrint, quotes, certs, adminCompName, formatDate })}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        ${isPrint ? '' : `
          <!-- Document Footer -->
          <div class="border-t border-slate-400 pt-2 flex justify-between items-center text-[10px] text-slate-500">
            <span>${adminCompName} | Central Procurement & Consumable Management System (CMS)</span>
            <span>Generated: ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
          </div>
        `}

      </div>
    `;
  },

  buildVendorPrintDocument(v, paperHtml) {
    let companyInfo = {};
    try {
      if (window.CMS_HOME && window.CMS_HOME.companyInfo) {
        companyInfo = window.CMS_HOME.companyInfo;
      } else {
        companyInfo = JSON.parse(localStorage.getItem('CMS_COMPANY_INFO') || '{}') || {};
      }
    } catch (e) {
      companyInfo = {};
    }

    const currentUser = (window.CMS_STORE && window.CMS_STORE.getCurrentUser) ? window.CMS_STORE.getCurrentUser() : null;
    let rawName = (companyInfo.name || '').trim();
    if (rawName.toLowerCase().includes('adminutes')) rawName = '';

    let tenantName = (window.CMS_TENANT_NAME || (typeof localStorage !== 'undefined' ? localStorage.getItem('CMS_TENANT_NAME_CACHE') : '') || '').trim();
    if (tenantName.toLowerCase().includes('adminutes')) tenantName = '';

    let storeCompName = (window.CMS_STORE && window.CMS_STORE.data && (window.CMS_STORE.data.companyName || window.CMS_STORE.data.companyInfo?.name) || '').trim();
    if (storeCompName.toLowerCase().includes('adminutes')) storeCompName = '';

    const userDept = (currentUser && currentUser.department && !currentUser.department.toLowerCase().includes('adminutes')) ? currentUser.department : '';
    const userName = (currentUser && currentUser.name && !currentUser.name.toLowerCase().includes('adminutes')) ? currentUser.name : '';

    const adminCompName = rawName || tenantName || storeCompName || userDept || (userName ? `${userName}'s Organization` : 'Central Store Operations');

    const cleanTitle = `Vendor_Registration_Form_${v.id}_${(v.name || 'Vendor').replace(/\s+/g, '_')}`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${cleanTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @page {
      size: A4 portrait;
      margin: 0 !important;
    }
    * {
      box-sizing: border-box;
    }
    body {
      background-color: #ffffff !important;
      color: #000000 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      margin: 0;
      padding: 16px;
    }
    table {
      width: 100% !important;
      border-collapse: collapse !important;
    }
    th, td {
      vertical-align: top;
    }
    .break-before-page {
      page-break-before: always;
      break-before: page;
    }
    .break-inside-avoid {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    @media print {
      .no-print {
        display: none !important;
      }
      body {
        padding: 10mm 12mm !important;
        margin: 0 !important;
        background: #ffffff !important;
        color: #000000 !important;
      }
      #vendor-paper-form {
        border: none !important;
        padding: 0 !important;
        background: #ffffff !important;
        box-shadow: none !important;
      }
      * {
        box-shadow: none !important;
        text-shadow: none !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  </style>
</head>
<body class="p-4 bg-slate-100 text-slate-900">
  <div class="no-print max-w-5xl mx-auto mb-4 flex justify-between items-center bg-white p-3 rounded border border-slate-300 shadow-xs">
    <span class="text-xs font-bold text-slate-800">${adminCompName} - Official Vendor Empanelment Form (${v.id} - ${v.name})</span>
    <div class="flex gap-2">
      <button onclick="window.print()" class="px-4 py-1.5 bg-slate-900 hover:bg-black text-white font-bold rounded text-xs transition shadow-sm cursor-pointer">
        Print / Save PDF
      </button>
      <button onclick="window.close()" class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded text-xs transition cursor-pointer">
        Close Window
      </button>
    </div>
  </div>

  <div class="max-w-5xl mx-auto bg-white">
    ${paperHtml}
  </div>
  <script>
    if (window.lucide) {
      lucide.createIcons();
    }
  </script>
</body>
</html>`;
  },

  async openVendorPrintWindow(vendorId) {
    const v = window.CMS_STORE.data.vendors.find(i => i.id === vendorId);
    if (!v) return;

    // Prefetch files into fileCache for standalone print window
    const fileCache = {};
    const filesToLoad = [];
    if (v.panCardFile) filesToLoad.push(v.panCardFile);
    if (v.panFile) filesToLoad.push(v.panFile);
    if (v.gstCertificateFile) filesToLoad.push(v.gstCertificateFile);
    if (v.gstFile) filesToLoad.push(v.gstFile);
    const bankDocFile = v.bankDoc || v.bankFile || v.bankCertificate || v.bankDocFile || (v.bankDetails && (v.bankDetails.bankDoc || v.bankDetails.bankFile));
    if (bankDocFile) filesToLoad.push(bankDocFile);
    if (v.certificateFile) filesToLoad.push(v.certificateFile);
    if (v.quotationDoc) filesToLoad.push(v.quotationDoc);
    if (Array.isArray(v.certificates)) {
      v.certificates.forEach(c => {
        const fn = c && (c.fileName || c.filename || c.file || c.documentFile || c.certFile || c.doc);
        if (fn) filesToLoad.push(fn);
      });
    }
    if (Array.isArray(v.quotedItems)) {
      v.quotedItems.forEach(q => {
        const fn = q && (q.doc || q.document || q.file || q.quotationDoc || q.fileName || q.filename);
        if (fn) filesToLoad.push(fn);
      });
    }

    for (const f of filesToLoad) {
      if (f && !fileCache[f]) {
        let dataUrl = null;
        if (window.CMS_FILE_STORE) {
          dataUrl = await window.CMS_FILE_STORE.getFile(f);
        }
        if (!dataUrl) {
          dataUrl = localStorage.getItem('CMS_FILE_' + f);
        }
        if (dataUrl) fileCache[f] = dataUrl;
      }
    }

    const paperHtml = this.renderVendorPaperFormHtml(v, { forPrint: true, fileCache });
    const fullPrintDoc = this.buildVendorPrintDocument(v, paperHtml);
    const win = window.open('', '_blank', 'width=1000,height=900');
    if (win) {
      win.document.open();
      win.document.write(fullPrintDoc);
      win.document.close();
      win.focus();
    } else {
      window.CMS_APP.toast('Popup was blocked by browser. Please allow popups or use Download Form (Print).', 'warning');
    }
  },

  async viewVendorProfile(vendorId) {
    const v = window.CMS_STORE.data.vendors.find(i => i.id === vendorId);
    if (!v) return;

    // Prefetch files into fileCache for instant preview exactly matching download
    const fileCache = {};
    const filesToLoad = [];
    if (v.panCardFile) filesToLoad.push(v.panCardFile);
    if (v.panFile) filesToLoad.push(v.panFile);
    if (v.gstCertificateFile) filesToLoad.push(v.gstCertificateFile);
    if (v.gstFile) filesToLoad.push(v.gstFile);
    const bankDocFile = v.bankDoc || v.bankFile || v.bankCertificate || v.bankDocFile || (v.bankDetails && (v.bankDetails.bankDoc || v.bankDetails.bankFile));
    if (bankDocFile) filesToLoad.push(bankDocFile);
    if (v.certificateFile) filesToLoad.push(v.certificateFile);
    if (v.quotationDoc) filesToLoad.push(v.quotationDoc);
    if (Array.isArray(v.certificates)) {
      v.certificates.forEach(c => {
        const fn = c && (c.fileName || c.filename || c.file || c.documentFile || c.certFile || c.doc);
        if (fn) filesToLoad.push(fn);
      });
    }
    if (Array.isArray(v.quotedItems)) {
      v.quotedItems.forEach(q => {
        const fn = q && (q.doc || q.document || q.file || q.quotationDoc || q.fileName || q.filename);
        if (fn) filesToLoad.push(fn);
      });
    }

    for (const f of filesToLoad) {
      if (f && !fileCache[f]) {
        let dataUrl = null;
        if (window.CMS_FILE_STORE) {
          dataUrl = await window.CMS_FILE_STORE.getFile(f);
        }
        if (!dataUrl) {
          dataUrl = localStorage.getItem('CMS_FILE_' + f);
        }
        if (dataUrl) fileCache[f] = dataUrl;
      }
    }

    const role = window.CMS_STORE.getRole();
    const paperFormHtml = this.renderVendorPaperFormHtml(v, { forPrint: false, fileCache });

    const content = `
      ${v.status === 'Revision Required' ? `
        <div class="mb-4 p-4 bg-amber-50 border-2 border-amber-400 rounded-sm text-xs flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div class="flex items-start gap-2.5">
            <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600 shrink-0 mt-0.5"></i>
            <div>
              <div class="font-bold text-amber-950 uppercase tracking-wide text-xs">Returned by Approver for Revision & Correction</div>
              <div class="text-amber-900 text-xs mt-0.5"><strong>Reviewer Mistake Remark:</strong> <span class="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold text-amber-950">"${v.checkerMistakeRemark || 'Admin returned for revision'}"</span></div>
              ${role !== 'Admin' ? `
                <div class="text-amber-700 text-[11px] mt-1">Please review the remarks, click "Edit & Correct Form", update the relevant details across the wizard tabs, and re-submit for approval.</div>
              ` : `
                <div class="text-amber-700 text-[11px] mt-1">Vendor record returned to maker for correction and resubmission.</div>
              `}
            </div>
          </div>
          ${role !== 'Admin' ? `
            <button onclick="CMS_APP.closeModal(); CMS_MASTERS.openVendorModal('${v.id}')" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-sm shadow transition inline-flex items-center gap-1.5 cursor-pointer shrink-0 text-xs">
              <i data-lucide="edit-3" class="w-4 h-4 text-white"></i>
              <span>Edit & Correct Form</span>
            </button>
          ` : ''}
        </div>
      ` : ''}

      ${paperFormHtml}

      <div class="pt-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-2 print:hidden mt-4 bg-slate-50 p-3 rounded">
        <div class="flex items-center gap-2">
          <button type="button" onclick="CMS_MASTERS.downloadVendorForm('${v.id}')" class="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-sm shadow transition inline-flex items-center gap-1.5 text-xs">
            <i data-lucide="printer" class="w-4 h-4 text-white"></i>
            <span>Download Form (Print / Save PDF)</span>
          </button>
          <button type="button" onclick="CMS_MASTERS.openVendorPrintWindow('${v.id}')" class="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold rounded-sm transition inline-flex items-center gap-1.5 text-xs" title="Open print preview in new window">
            <i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>Open in New Tab</span>
          </button>
        </div>

        <div class="flex items-center gap-2">
          ${(role !== 'Admin' && !v.isApproved && v.status !== 'Approved' && (v.status === 'Pending Approval' || v.status === 'Revision Required' || v.status === 'Draft')) ? `
            <button onclick="CMS_APP.closeModal(); CMS_MASTERS.openVendorModal('${v.id}');" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-sm shadow transition inline-flex items-center gap-1.5 text-xs">
              <i data-lucide="edit-3" class="w-4 h-4 text-white"></i>
              <span>${v.status === 'Revision Required' ? 'Edit & Fix Form' : 'Edit Form'}</span>
            </button>
          ` : ''}
          ${v.status === 'Pending Approval' && role === 'Admin' ? `
            <button onclick="CMS_APP.closeModal(); CMS_MASTERS.openVendorRejectModal('${v.id}');" class="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold rounded-sm transition inline-flex items-center gap-1.5 text-xs">
              <i data-lucide="x-circle" class="w-4 h-4 text-rose-600"></i>
              <span>Reject / Return</span>
            </button>
            <button onclick="CMS_APP.closeModal(); CMS_MASTERS.openVendorSanctionModal('${v.id}');" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm shadow transition inline-flex items-center gap-1.5 text-xs">
              <i data-lucide="check-circle" class="w-4 h-4 text-white"></i>
              <span>Sanction / Approve</span>
            </button>
          ` : (v.status === 'Revision Required' || v.status === 'Rejected') && role === 'Admin' ? `
            <span class="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-sm" title="${v.checkerMistakeRemark ? `Reported Mistake: ${v.checkerMistakeRemark}` : 'Admin Rejected'}">
              <i data-lucide="x-circle" class="w-4 h-4 text-rose-600"></i>
              <span>Admin Rejected</span>
            </span>
          ` : ''}
          <button onclick="CMS_APP.closeModal()" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-sm transition text-xs">
            Close
          </button>
        </div>
      </div>
    `;

    window.CMS_APP.openModal('Vendor Profile & Statutory Inspection', content, 'max-w-5xl');
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) modalContainer.classList.add('show-print');
    
    // Document previews are rendered with high-fidelity vector components directly
    if (window.lucide) window.lucide.createIcons();

    if (window.lucide) window.lucide.createIcons();
  },


  async uploadMissingDoc(vendorId, docType, fileInput) {
    if (!fileInput || !fileInput.files || !fileInput.files[0]) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const store = window.CMS_STORE;
      const v = store.data.vendors.find(i => i.id === vendorId);
      if (!v) return;

      if (window.CMS_FILE_STORE) {
        await window.CMS_FILE_STORE.saveFile(file.name, dataUrl);
      }

      if (docType === 'gst') {
        v.gstCertificateFile = file.name;
      } else if (docType === 'pan') {
        v.panCardFile = file.name;
      } else if (docType === 'bank') {
        v.bankDoc = file.name;
      } else {
        if (v.gstCertificateFile === docType) v.gstCertificateFile = file.name;
        if (v.panCardFile === docType) v.panCardFile = file.name;
        if (v.bankDoc === docType) v.bankDoc = file.name;
      }

      store.save();
      window.CMS_APP.toast('Document uploaded and synchronized with cloud successfully!', 'success');
      CMS_MASTERS.viewVendorProfile(vendorId);
    };
    reader.readAsDataURL(file);
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

  checkRateVsMrp(el) {
    const row = el.closest('.quote-row');
    if (!row) return;
    const rateInput = row.querySelector('.q-rate');
    const mrpInput = row.querySelector('.q-mrp');
    const mrpNa = row.querySelector('.q-mrp-na')?.checked;

    if (mrpNa) return;

    const rate = parseFloat(rateInput.value) || 0;
    const mrp = parseFloat(mrpInput.value) || 0;
    
    if (rate > 0 && mrp > 0 && rate > mrp) {
       setTimeout(() => {
           const proceed = confirm('Approved rate is more than MRP, do you want to continue with entered rate?\n\n[OK] = Yes, continue with entered rate\n[Cancel] = No, allow me to enter revised rate');
           if (!proceed) {
              rateInput.value = '';
              rateInput.focus();
           }
       }, 50);
    }
  },

  async downloadVendorForm(vendorId = null) {
    const formEl = document.getElementById('vendor-paper-form');
    const targetId = vendorId || (formEl ? formEl.getAttribute('data-vendor-id') : null);
    const v = (targetId && window.CMS_STORE && window.CMS_STORE.data && window.CMS_STORE.data.vendors)
      ? window.CMS_STORE.data.vendors.find(i => i.id === targetId)
      : null;

    if (!v) {
      if (window.CMS_APP) window.CMS_APP.toast('Vendor record not found for printing.', 'error');
      return;
    }

    // Prefetch files into fileCache for standalone print
    const fileCache = {};
    const filesToLoad = [];
    if (v.panCardFile) filesToLoad.push(v.panCardFile);
    if (v.panFile) filesToLoad.push(v.panFile);
    if (v.gstCertificateFile) filesToLoad.push(v.gstCertificateFile);
    if (v.gstFile) filesToLoad.push(v.gstFile);
    const bankDocFile = v.bankDoc || v.bankFile || v.bankCertificate || v.bankDocFile || (v.bankDetails && (v.bankDetails.bankDoc || v.bankDetails.bankFile));
    if (bankDocFile) filesToLoad.push(bankDocFile);
    if (v.certificateFile) filesToLoad.push(v.certificateFile);
    if (v.quotationDoc) filesToLoad.push(v.quotationDoc);
    if (Array.isArray(v.certificates)) {
      v.certificates.forEach(c => {
        const fn = c && (c.fileName || c.filename || c.file || c.documentFile || c.certFile || c.doc);
        if (fn) filesToLoad.push(fn);
      });
    }
    if (Array.isArray(v.quotedItems)) {
      v.quotedItems.forEach(q => {
        const fn = q && (q.doc || q.document || q.file || q.quotationDoc || q.fileName || q.filename);
        if (fn) filesToLoad.push(fn);
      });
    }

    for (const f of filesToLoad) {
      if (f && !fileCache[f]) {
        let dataUrl = null;
        if (window.CMS_FILE_STORE) {
          dataUrl = await window.CMS_FILE_STORE.getFile(f);
        }
        if (!dataUrl) {
          dataUrl = localStorage.getItem('CMS_FILE_' + f);
        }
        if (dataUrl) fileCache[f] = dataUrl;
      }
    }

    const paperHtml = this.renderVendorPaperFormHtml(v, { forPrint: true, fileCache });
    const fullPrintDoc = this.buildVendorPrintDocument(v, paperHtml);

    // Primary: Open dedicated print window (standard established pattern in CMS_PRINT)
    const printWin = window.open('', '_blank', 'width=1000,height=900');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(fullPrintDoc);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        try {
          printWin.print();
        } catch (e) {
          console.warn('Auto-print prompt:', e);
        }
      }, 500);
      return;
    }

    // Fallback: If popup was blocked by browser, use full-size off-screen iframe (NOT visibility:hidden)
    try {
      const oldFrame = document.getElementById('vendor-print-frame');
      if (oldFrame) oldFrame.remove();

      const printFrame = document.createElement('iframe');
      printFrame.id = 'vendor-print-frame';
      printFrame.name = 'vendorPrintFrame';
      printFrame.style.position = 'fixed';
      printFrame.style.left = '0';
      printFrame.style.top = '0';
      printFrame.style.width = '100vw';
      printFrame.style.height = '100vh';
      printFrame.style.zIndex = '-9999';
      printFrame.style.opacity = '0.01';
      printFrame.style.pointerEvents = 'none';
      printFrame.style.border = 'none';
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow.document;
      frameDoc.open();
      frameDoc.write(fullPrintDoc);
      frameDoc.close();

      setTimeout(() => {
        try {
          printFrame.contentWindow.focus();
          printFrame.contentWindow.print();
        } catch (e) {
          console.warn('Iframe print failed:', e);
        }
      }, 600);
    } catch (err) {
      console.error('Print iframe creation error:', err);
    }
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
      this.validateGstStateCode();
    
  },

  assembleGst() {
    const sBox = document.getElementById('v-gst-state');
    const pBox = document.getElementById('v-gst-pan');
    const sufBox = document.getElementById('v-gst-suffix');
    const fullInput = document.getElementById('v-gst');
    const fullDisplay = document.getElementById('v-gst-full-display');
    const stateNameEl = document.getElementById('v-gst-state-name');

    const stateCode = (sBox?.value || '').trim().toUpperCase();
    const pan = (pBox?.value || '').trim().toUpperCase();
    const suffix = (sufBox?.value || '').trim().toUpperCase();

    const fullGst = stateCode + pan + suffix;
    if (fullInput) {
      fullInput.value = fullGst;
    }
    if (fullDisplay) {
      fullDisplay.innerText = fullGst.length > 0 ? fullGst : '-';
    }

    const stateSelect = document.getElementById('v-state');
    const stName = stateSelect?.value || '';
    if (stateNameEl && stName) {
      stateNameEl.innerText = '(' + stName + ')';
    }

    const gstNaCheckbox = document.getElementById('v-gst-na');
    if (gstNaCheckbox && fullGst.length > 2 && gstNaCheckbox.checked) {
      gstNaCheckbox.checked = false;
      this.toggleGstApplicable(false);
    }

    return fullGst;
  },

  onPanInput(val) {
    const cleanPan = (val || '').trim().toUpperCase();
    const gstPan = document.getElementById('v-gst-pan');
    if (gstPan && gstPan.value !== cleanPan) {
      gstPan.value = cleanPan;
    }
    this.assembleGst();
  },

  onGstPanSegmentInput(val) {
    const cleanPan = (val || '').trim().toUpperCase();
    const panInput = document.getElementById('v-pan');
    if (panInput && !panInput.disabled && panInput.value !== cleanPan) {
      panInput.value = cleanPan;
    }
    this.assembleGst();
  },

  onGstSuffixInput(val) {
    this.assembleGst();
  },

  onIfscInput(input, isBlur = false) {
    if (!input) input = document.getElementById('v-ifsc');
    if (!input) return;

    // Strict limit: uppercase alphanumeric only, maximum 11 characters
    input.value = (input.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11);
    const val = input.value;
    const len = val.length;

    const errorEl = document.getElementById('v-ifsc-error');
    const counterEl = document.getElementById('v-ifsc-counter');

    if (counterEl) {
      counterEl.textContent = `${len}/11`;
      if (len === 11) {
        counterEl.className = 'text-[10px] font-mono font-bold text-emerald-600';
      } else if (len > 0) {
        counterEl.className = 'text-[10px] font-mono font-bold text-rose-600';
      } else {
        counterEl.className = 'text-[10px] font-mono font-semibold text-slate-400';
      }
    }

    if (len === 11) {
      // Exactly 11 characters: Valid!
      input.classList.remove('border-rose-500', 'bg-rose-50', 'bg-rose-50/50', 'text-rose-900', 'ring-1', 'ring-rose-500', 'focus:ring-rose-500', 'focus:border-rose-500');
      input.classList.add('border-emerald-500', 'bg-emerald-50/20');
      if (errorEl) {
        errorEl.classList.add('hidden');
        errorEl.innerHTML = '';
      }
    } else if (len > 0 && len < 11) {
      // Less than 11 digits/characters entered: Red error mistake
      input.classList.remove('border-slate-300', 'border-emerald-500', 'bg-emerald-50/20', 'focus:ring-blue-500', 'focus:border-blue-500');
      input.classList.add('border-rose-500', 'bg-rose-50/50', 'text-rose-900', 'ring-1', 'ring-rose-500', 'focus:ring-rose-500', 'focus:border-rose-500');
      if (errorEl) {
        errorEl.classList.remove('hidden');
        errorEl.innerHTML = `<i data-lucide="alert-circle" class="w-3.5 h-3.5 text-rose-600 shrink-0"></i><span>IFSC Code must be exactly 11 characters (less digits entered: ${len}/11).</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    } else if (len === 0) {
      // Empty input
      input.classList.remove('border-emerald-500', 'bg-emerald-50/20');
      if (isBlur) {
        input.classList.add('border-rose-500', 'bg-rose-50/50', 'text-rose-900', 'ring-1', 'ring-rose-500');
        if (errorEl) {
          errorEl.classList.remove('hidden');
          errorEl.innerHTML = `<i data-lucide="alert-circle" class="w-3.5 h-3.5 text-rose-600 shrink-0"></i><span>Bank IFSC Code is mandatory (exactly 11 characters).</span>`;
          if (window.lucide) window.lucide.createIcons();
        }
      } else {
        input.classList.remove('border-rose-500', 'bg-rose-50/50', 'text-rose-900', 'ring-1', 'ring-rose-500');
        input.classList.add('border-slate-300');
        if (errorEl) {
          errorEl.classList.add('hidden');
          errorEl.innerHTML = '';
        }
      }
    }
  },

  onStateChange(stateName) {
    if (stateName) {
      const s = this.indianStates.find(item => item.name.toLowerCase() === String(stateName || '').toLowerCase());
      const stateBox = document.getElementById('v-gst-state');
      const stateNameEl = document.getElementById('v-gst-state-name');
      if (stateBox && s) {
        stateBox.value = s.code;
      }
      if (stateNameEl && s) {
        stateNameEl.innerText = '(' + s.name + ')';
      }
      this.assembleGst();
    }
    this.validateGstStateCode();
    this.populateDistrictDropdown(stateName, '');
  },

    validateGstStateCode() {
      const gstInput = document.getElementById('v-gst');
      const stateInput = document.getElementById('v-state');
      if (!gstInput || !stateInput || gstInput.disabled) return;

      const gstVal = gstInput.value.trim().toUpperCase();
      const stateVal = stateInput.value;

      gstInput.classList.remove('border-rose-600', 'bg-rose-50', 'text-rose-600');
      gstInput.setCustomValidity('');

      if (gstVal.length >= 2 && stateVal) {
        const prefix = gstVal.substring(0, 2);
        // Special case for Daman & Diu and Dadra & Nagar Haveli which merged (codes 25 and 26)
        // or just check against indianStates array directly.
        let matchedState = this.indianStates.find(s => s.code === prefix);
        if (prefix === '25') matchedState = this.indianStates.find(s => s.code === '26'); // Legacy Daman & Diu fallback
        
        if (matchedState && matchedState.name !== stateVal) {
          gstInput.classList.add('border-rose-600', 'bg-rose-50', 'text-rose-600');
          gstInput.setCustomValidity('State code ' + prefix + ' (' + matchedState.name + ') does not match selected state ' + stateVal + '.');
        } else if (!matchedState) {
          gstInput.classList.add('border-rose-600', 'bg-rose-50', 'text-rose-600');
          gstInput.setCustomValidity('Invalid GST State Code: ' + prefix);
        }
      }
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
      
      const stVal = document.getElementById('v-state')?.value || (isIndia ? 'Delhi' : '');
      this.populateDistrictDropdown(stVal, '');

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
  
  onQuotationDateChange(el) {
    const row = el.closest('.quote-row');
    if (!row) return;
    const eff = row.querySelector('.q-eff');
    const valid = row.querySelector('.q-valid');
    if (!eff) return;
    
    if (!el.value) {
       eff.disabled = true;
       eff.value = '';
       eff.removeAttribute('min');
       if (valid) {
           valid.disabled = true;
           valid.value = '';
           valid.removeAttribute('min');
       }
    } else {
       eff.disabled = false;
       eff.min = el.value;
       if (eff.value && eff.value < el.value) {
          eff.value = ''; 
          window.CMS_APP.toast('Effective date reset as it was older than the new quotation date.', 'warning');
          if (valid) {
              valid.disabled = true;
              valid.value = '';
              valid.removeAttribute('min');
          }
       }
    }
  },

  onEffectiveDateChange(el) {
    const row = el.closest('.quote-row');
    if (!row) return;
    const valid = row.querySelector('.q-valid');
    if (!valid) return;
    
    if (!el.value) {
       valid.disabled = true;
       valid.value = '';
       valid.removeAttribute('min');
    } else {
       valid.disabled = false;
       valid.min = el.value;
       if (valid.value && valid.value < el.value) {
          valid.value = '';
          window.CMS_APP.toast('Valid Till date reset as it was older than the new Effective date.', 'warning');
       }
    }
  },

    calculateAlertDate(expiryDateStr, days) {
    if (!expiryDateStr) return '';
    try {
      const d = new Date(expiryDateStr + 'T00:00:00');
      if (isNaN(d.getTime())) return '';
      const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
      const numDays = parseInt(days, 10);
      const safeDays = (isNaN(numDays) || numDays < minAlertPolicy) ? minAlertPolicy : numDays;
      d.setDate(d.getDate() - safeDays);
      return d.toISOString().split('T')[0];
    } catch(e) {
      return expiryDateStr;
    }
  },

  formatDisplayDate(isoDateStr) {
    if (!isoDateStr) return 'Not set';
    try {
      const parts = isoDateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    } catch(e) {}
    return isoDateStr;
  },

  onCertDateOrDaysChange(el, isBlur = false) {
    const box = el.closest('.cert-expiry-box');
    if (!box) return;
    const expiryInput = box.querySelector('.cert-expiry-input');
    const daysInput = box.querySelector('.cert-alert-days');
    const hiddenAlertInput = box.querySelector('.cert-alert-input');
    const previewText = box.querySelector('.cert-alert-preview-text');
    const summaryText = box.querySelector('.cert-alert-days-summary');
    const dispatchText = box.querySelector('.cert-mail-dispatch-date');

    const expDate = expiryInput ? expiryInput.value : '';
    const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
    let days = daysInput ? parseInt(daysInput.value, 10) : minAlertPolicy;

    if (daysInput) {
      if (isBlur) {
        if (isNaN(days) || days < minAlertPolicy) {
          if (daysInput.value !== '' && parseInt(daysInput.value, 10) < minAlertPolicy) {
            if (window.CMS_APP && window.CMS_APP.toast) {
              window.CMS_APP.toast(`Alert days cannot be less than Admin benchmark (${minAlertPolicy} days). Reset to ${minAlertPolicy} days.`, 'warning');
            }
          }
          daysInput.value = minAlertPolicy;
          days = minAlertPolicy;
        }
      }
      if (isNaN(days) || days < minAlertPolicy) {
        daysInput.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-700');
        daysInput.classList.remove('border-blue-300', 'bg-white', 'text-slate-800');
        days = minAlertPolicy;
        if (summaryText) summaryText.innerHTML = `<span class="text-rose-600 font-bold">(Min ${minAlertPolicy}d)</span>`;
      } else {
        daysInput.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-700');
        daysInput.classList.add('border-blue-300', 'bg-white', 'text-slate-800');
        if (summaryText) summaryText.innerText = '(' + days + 'd prior)';
      }
    }

    const calculatedDate = this.calculateAlertDate(expDate, days);
    if (hiddenAlertInput) hiddenAlertInput.value = calculatedDate;
    const formatted = expDate ? this.formatDisplayDate(calculatedDate) : 'Select date above';
    if (previewText) previewText.innerText = formatted;
    if (dispatchText) dispatchText.innerText = formatted;
  },

  onCertMailRadioToggle(rowId, enabled) {
    const box = document.getElementById('expiry_box_' + rowId);
    if (!box) return;
    const mailSection = box.querySelector('.cert-mail-fixation-section');
    const noMailSection = box.querySelector('.cert-no-mail-section');
    if (mailSection) mailSection.classList.toggle('hidden', !enabled);
    if (noMailSection) noMailSection.classList.toggle('hidden', enabled);
    if (window.lucide) window.lucide.createIcons();
  },

  onQuoteDateOrDaysChange(el, isBlur = false) {
    const row = el.closest('.quote-row');
    if (!row) return;
    const validInp = row.querySelector('.q-valid');
    const daysInp = row.querySelector('.q-alert-days');
    const hiddenAlertInp = row.querySelector('.q-alert');
    const preview = row.querySelector('.q-alert-preview');
    const previewText = row.querySelector('.q-alert-preview-text');
    const dispatchText = row.querySelector('.q-mail-dispatch-date');
    const summaryText = row.querySelector('.q-alert-days-summary');

    const expDate = validInp ? validInp.value : '';
    const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
    let days = daysInp ? parseInt(daysInp.value, 10) : minAlertPolicy;

    if (daysInp) {
      if (isBlur) {
        if (isNaN(days) || days < minAlertPolicy) {
          if (daysInp.value !== '' && parseInt(daysInp.value, 10) < minAlertPolicy) {
            if (window.CMS_APP && window.CMS_APP.toast) {
              window.CMS_APP.toast(`Alert days cannot be less than Admin benchmark (${minAlertPolicy} days). Reset to ${minAlertPolicy} days.`, 'warning');
            }
          }
          daysInp.value = minAlertPolicy;
          days = minAlertPolicy;
        }
      }
      if (isNaN(days) || days < minAlertPolicy) {
        daysInp.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-700');
        daysInp.classList.remove('border-blue-300', 'bg-white', 'text-slate-800');
        days = minAlertPolicy;
        if (summaryText) summaryText.innerHTML = `<span class="text-rose-600 font-bold">(Min ${minAlertPolicy}d)</span>`;
      } else {
        daysInp.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-700');
        daysInp.classList.add('border-blue-300', 'bg-white', 'text-slate-800');
        if (summaryText) summaryText.innerText = '(' + days + 'd prior)';
      }
    }

    const calculatedDate = this.calculateAlertDate(expDate, days);
    if (hiddenAlertInp) hiddenAlertInp.value = calculatedDate;
    const formatted = expDate ? this.formatDisplayDate(calculatedDate) : 'Select date';
    if (preview) {
      preview.innerText = 'Alert: ' + (expDate ? formatted : '—');
      preview.title = expDate ? 'Alert: ' + formatted + ' (' + days + 'd prior)' : 'Set valid till date';
    }
    if (previewText) previewText.innerText = formatted;
    if (dispatchText) dispatchText.innerText = formatted;
  },

  onQuoteMailRadioToggle(rowId, enabled) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const mailSection = row.querySelector('.quote-mail-fixation-section');
    const noMailSection = row.querySelector('.quote-no-mail-section');
    if (mailSection) mailSection.classList.toggle('hidden', !enabled);
    if (noMailSection) noMailSection.classList.toggle('hidden', enabled);
    if (window.lucide) window.lucide.createIcons();
  },

  onLimitedApprovalDateOrDaysChange(isBlur = false) {
    const validInp = document.getElementById('v-approval-valid-till');
    const daysInp = document.getElementById('v-approval-alert-days');
    const hiddenAlertInp = document.getElementById('v-approval-alert-date');
    const preview = document.getElementById('v-approval-alert-preview');
    const dispatch = document.getElementById('v-approval-mail-dispatch-date');
    const summary = document.getElementById('v-approval-alert-days-summary');

    const expDate = validInp ? validInp.value : '';
    const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
    let days = daysInp ? parseInt(daysInp.value, 10) : minAlertPolicy;

    if (daysInp) {
      if (isBlur) {
        if (isNaN(days) || days < minAlertPolicy) {
          if (daysInp.value !== '' && parseInt(daysInp.value, 10) < minAlertPolicy) {
            if (window.CMS_APP && window.CMS_APP.toast) {
              window.CMS_APP.toast(`Alert days cannot be less than Admin benchmark (${minAlertPolicy} days). Reset to ${minAlertPolicy} days.`, 'warning');
            }
          }
          daysInp.value = minAlertPolicy;
          days = minAlertPolicy;
        }
      }
      if (isNaN(days) || days < minAlertPolicy) {
        daysInp.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-700');
        daysInp.classList.remove('border-blue-300', 'bg-white', 'text-slate-800');
        days = minAlertPolicy;
        if (summary) summary.innerHTML = `<span class="text-rose-600 font-bold">(Min ${minAlertPolicy}d)</span>`;
      } else {
        daysInp.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-700');
        daysInp.classList.add('border-blue-300', 'bg-white', 'text-slate-800');
        if (summary) summary.innerText = '(' + days + 'd prior)';
      }
    }

    const calculatedDate = this.calculateAlertDate(expDate, days);
    if (hiddenAlertInp) hiddenAlertInp.value = calculatedDate;
    const formatted = expDate ? this.formatDisplayDate(calculatedDate) : 'Select date above';
    if (preview) preview.innerText = formatted;
    if (dispatch) dispatch.innerText = formatted;
  },

  onApprovalMailRadioToggle(enabled) {
    const mailSection = document.getElementById('v-approval-mail-fixation-section');
    const noMailSection = document.getElementById('v-approval-no-mail-section');
    if (mailSection) mailSection.classList.toggle('hidden', !enabled);
    if (noMailSection) noMailSection.classList.toggle('hidden', enabled);
    if (window.lucide) window.lucide.createIcons();
  },

  addVendorQuotationRow(qData = null) {
    const container = document.getElementById('v-quotations-container');
    if (!container) return;
    const rowId = 'quote_row_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    
    const no = qData ? (qData.quotationNo || '') : '';
    const dt = qData ? (qData.quotationDate || '') : '';
    const exp = qData ? (qData.validTill || qData.quotationValidTill || '') : '';
    const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
    const qAlertDays = (qData && qData.alertDays !== undefined && qData.alertDays !== '') ? qData.alertDays : minAlertPolicy;
    const computedQuoteAlertIso = (qData && qData.alertDate) ? qData.alertDate : (exp ? CMS_MASTERS.calculateAlertDate(exp, qAlertDays) : '');
    const computedQuoteAlertDisplay = exp ? CMS_MASTERS.formatDisplayDate(computedQuoteAlertIso) : 'Set date';
    const qSendEmail = qData && qData.sendEmailNotification !== undefined ? Boolean(qData.sendEmailNotification) : true;
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
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pr-6">
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Quotation Ref No <span class="text-rose-600 font-bold">*</span></label>
          <input type="text" class="q-no w-full font-mono uppercase font-bold text-blue-600 px-2.5 py-1.5 border border-blue-300 rounded text-xs bg-white" value="${no}" placeholder="e.g. QT-101" />
        </div>
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Quotation Date <span class="text-rose-600 font-bold">*</span></label>
          <input type="date" class="q-date w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${dt}" max="${today}" onchange="CMS_MASTERS.onQuotationDateChange(this)" />
        </div>
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Effective From</label>
          <input type="date" class="q-eff w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${eff}" ${!dt ? 'disabled' : `min="${dt}"`} onchange="CMS_MASTERS.onEffectiveDateChange(this)" />
        </div>
        <div>
          <label class="block font-bold text-slate-800 mb-1 text-[10px]">Valid Till / Expiry Date</label>
          <input type="date" class="q-valid w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${exp}" ${!eff ? 'disabled' : `min="${eff}"`} onchange="CMS_MASTERS.onQuoteDateOrDaysChange(this)" oninput="CMS_MASTERS.onQuoteDateOrDaysChange(this)" />
        </div>
      </div>

      <!-- Number of Days Fixation for Quotation Mail Notification (Always Active) -->
      <div class="quote-mail-fixation-section p-3 bg-blue-50/80 border border-blue-200 rounded space-y-2.5 mt-2">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1.5 border-b border-blue-200/60">
          <div class="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
            <i data-lucide="calendar-clock" class="w-4 h-4 text-blue-600 shrink-0"></i>
            <span>Number of Days Fixation</span>
          </div>
          <span class="text-[10px] font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded shadow-2xs">
            ${minAlertPolicy} Days
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-[11px] font-bold text-slate-700">Fix Days Prior to Expiry <span class="text-rose-600 font-bold">*</span></label>
              <span class="text-[10px] text-slate-400 font-medium">Days</span>
            </div>
            <div class="flex items-center gap-1.5">
              <input type="number" min="${minAlertPolicy}" max="365" class="q-alert-days w-20 text-center font-bold font-mono px-2 py-1.5 border border-blue-300 bg-white rounded text-xs text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" value="${qAlertDays}" placeholder="${minAlertPolicy}" oninput="CMS_MASTERS.onQuoteDateOrDaysChange(this)" onchange="CMS_MASTERS.onQuoteDateOrDaysChange(this, true)" onblur="CMS_MASTERS.onQuoteDateOrDaysChange(this, true)" />
              <div class="inline-flex rounded border border-blue-200 bg-white p-0.5 shadow-2xs">
                <button type="button" onclick="const r=this.closest('.quote-row'); const inp=r.querySelector('.q-alert-days'); inp.value=${minAlertPolicy}; CMS_MASTERS.onQuoteDateOrDaysChange(inp, true);" class="px-1.5 py-0.5 text-[10px] font-bold text-blue-700 hover:bg-blue-100 rounded transition" title="Fix to Admin Minimum">Admin (${minAlertPolicy}d)</button>
                ${minAlertPolicy < 30 ? `<button type="button" onclick="const r=this.closest('.quote-row'); const inp=r.querySelector('.q-alert-days'); inp.value=30; CMS_MASTERS.onQuoteDateOrDaysChange(inp, true);" class="px-1.5 py-0.5 text-[10px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition">30d</button>` : ''}
                ${minAlertPolicy < 60 ? `<button type="button" onclick="const r=this.closest('.quote-row'); const inp=r.querySelector('.q-alert-days'); inp.value=60; CMS_MASTERS.onQuoteDateOrDaysChange(inp, true);" class="px-1.5 py-0.5 text-[10px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition">60d</button>` : ''}
              </div>
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">Calculated Mail Dispatch Date</label>
            <div class="px-2.5 py-1.5 bg-white border border-blue-200 rounded text-xs text-slate-700 flex items-center justify-between shadow-2xs">
              <div class="flex items-center gap-1.5 min-w-0">
                <i data-lucide="bell" class="w-3.5 h-3.5 text-blue-600 shrink-0"></i>
                <strong class="q-alert-preview-text font-mono font-bold text-blue-700 text-[11px] truncate">${computedQuoteAlertDisplay}</strong>
              </div>
              <span class="q-alert-days-summary text-[10px] font-bold text-slate-500 whitespace-nowrap ml-2">(${qAlertDays}d prior)</span>
            </div>
          </div>
        </div>
      </div>

      <input type="hidden" class="q-send-mail-radio" value="yes" />

      <input type="hidden" class="q-alert" value="${computedQuoteAlertIso}" />
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5 mt-2">
        <div class="sm:col-span-6">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">Select Existing Material <span class="text-rose-600 font-bold">*</span></label>
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
        <div class="col-span-12 sm:col-span-6 flex flex-col justify-end">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">Approved Rate <span class="text-rose-600 font-bold">*</span></label>
          <input type="number" step="0.01" class="q-rate w-full font-mono font-bold text-blue-600 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${rate}" placeholder="0.00" onchange="CMS_MASTERS.checkRateVsMrp(this)" />
        </div>
        <div class="col-span-12 sm:col-span-6 flex flex-col justify-end">
          <label class="flex justify-between items-center font-semibold text-slate-700 mb-1 text-[10px] w-full">
            <span>MRP</span>
            <label class="flex items-center gap-1 cursor-pointer text-slate-500 hover:text-slate-700" title="MRP is not applicable">
              <input type="checkbox" class="q-mrp-na m-0 h-3 w-3" onchange="CMS_MASTERS.toggleMrp(this)" ${qData && qData.mrpNotApplicable ? 'checked' : ''} />
              <span class="text-[9px]">N/A</span>
            </label>
          </label>
          <input type="number" step="0.01" class="q-mrp w-full font-mono font-bold text-emerald-900 px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${mrp}" placeholder="0.00" onchange="CMS_MASTERS.checkRateVsMrp(this)" ${qData && qData.mrpNotApplicable ? 'disabled' : ''} />
        </div>
        <div class="col-span-12 sm:col-span-6 flex flex-col justify-end">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">UOM</label>
          <input type="text" class="q-unit w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${unit}" placeholder="Nos, Rim, Box" />
        </div>
        <div class="col-span-12 sm:col-span-6 flex flex-col justify-end">
          <label class="block font-semibold text-slate-700 mb-1 text-[10px]">HSN / SAC</label>
          <input type="text" class="q-hsn w-full font-mono px-2.5 py-1.5 border border-slate-300 rounded text-xs" value="${hsn}" placeholder="e.g. 4802" />
        </div>
      </div>
      <div>
        <label class="block font-bold text-slate-700 mb-1 text-[10px]">Upload Quotation Copy (PDF / Image) <span class="text-rose-600 font-bold">*</span></label>
        <div class="q-file-wrapper relative w-full">
          <input type="file" class="q-file hidden" data-cms-dropzone="true" accept=".pdf,image/*" data-current="${doc || ''}" onchange="CMS_MASTERS.onRowDropzoneFileChange(this)" />
          
          <!-- Dropzone -->
          <div onclick="this.closest('.q-file-wrapper').querySelector('.q-file').click()"
               ondragover="event.preventDefault(); this.classList.add('border-blue-500', 'bg-blue-50/50');"
               ondragleave="this.classList.remove('border-blue-500', 'bg-blue-50/50');"
               ondrop="CMS_MASTERS.handleRowFileDrop(event, this)"
               class="q-dropzone ${doc ? 'hidden' : ''} cms-dropzone group p-2.5">
            <i data-lucide="upload-cloud" class="w-4 h-4 text-blue-600"></i>
            <span class="text-xs font-bold text-slate-700 group-hover:text-blue-700">Click to Browse or Drag Quotation File</span>
          </div>

          <!-- Attached Card -->
          <div class="q-card-preview ${doc ? '' : 'hidden'} cms-file-card p-2">
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <i data-lucide="file-text" class="w-4 h-4 text-slate-600 shrink-0"></i>
              <div class="min-w-0 flex-1">
                <div class="text-xs font-bold text-slate-900 truncate file-name-display" title="${doc || ''}">${doc || ''}</div>
                <div class="flex items-center gap-1 mt-0.5">
                  <span class="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 rounded">Attached</span>
                  <span class="text-[9px] text-slate-400 file-size-display"></span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button type="button" onclick="CMS_MASTERS.previewRowDoc(this, '${doc || ''}')" class="px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded border border-slate-200 cursor-pointer" title="Preview">View</button>
              <button type="button" onclick="this.closest('.q-file-wrapper').querySelector('.q-file').click()" class="px-2 py-0.5 text-[10px] font-semibold text-blue-700 hover:bg-blue-50 rounded border border-blue-200 cursor-pointer" title="Replace">Change</button>
              <button type="button" onclick="CMS_MASTERS.clearRowDoc(this)" class="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-rose-600 cursor-pointer" title="Remove"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
            </div>
          </div>
        </div>
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
    const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
    const certAlertDays = (certData && typeof certData === 'object' && certData.alertDays !== undefined && certData.alertDays !== '') ? certData.alertDays : minAlertPolicy;
    const computedCertAlertIso = (certData && certData.alertDate) ? certData.alertDate : (validTill ? CMS_MASTERS.calculateAlertDate(validTill, certAlertDays) : '');
    const computedCertAlertDisplay = validTill ? CMS_MASTERS.formatDisplayDate(computedCertAlertIso) : 'Select date above';
    const certSendEmail = certData && typeof certData === 'object' && certData.sendEmailNotification !== undefined ? Boolean(certData.sendEmailNotification) : true;
    const formNo = certData && typeof certData === 'object' ? (certData.formNo || '') : '';
    const certificateNo = certData && typeof certData === 'object' ? (certData.certificateNo || '') : '';
    const fileName = certData && typeof certData === 'object' ? (certData.fileName || '') : '';
    const docTitle = certData && typeof certData === 'object' ? (certData.documentName || certData.docTitle || '') : '';
    const today = new Date().toISOString().split('T')[0];

    

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
          <div id="expiry_box_${rowId}" class="cert-expiry-box ${hasValidity ? '' : 'hidden'} mt-2.5 p-3 bg-slate-50 border border-slate-200 rounded space-y-3 text-xs">
            <!-- 1. Valid Till Date -->
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Valid Till / Expiry Date <span class="text-rose-600 font-bold">*</span></label>
              <input type="date" min="${today}" class="cert-expiry-input w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-mono outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value="${validTill}" onchange="CMS_MASTERS.onCertDateOrDaysChange(this)" oninput="CMS_MASTERS.onCertDateOrDaysChange(this)" />
            </div>

            <!-- 2. Number of Days Fixation (Always Active with Validity) -->
            <div class="cert-mail-fixation-section p-3 bg-blue-50/80 border border-blue-200 rounded space-y-2.5">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1.5 border-b border-blue-200/60">
                <div class="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
                  <i data-lucide="calendar-clock" class="w-4 h-4 text-blue-600 shrink-0"></i>
                  <span>Number of Days Fixation</span>
                </div>
                <span class="text-[10px] font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded shadow-2xs">
                  ${minAlertPolicy} Days
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block text-[11px] font-bold text-slate-700">Fix Days Prior to Valid Till Date <span class="text-rose-600 font-bold">*</span></label>
                    <span class="text-[10px] text-slate-400 font-medium">Days</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <input type="number" min="${minAlertPolicy}" max="365" class="cert-alert-days w-20 text-center font-bold font-mono px-2 py-1.5 border border-blue-300 bg-white rounded text-xs text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" value="${certAlertDays}" placeholder="${minAlertPolicy}" oninput="CMS_MASTERS.onCertDateOrDaysChange(this)" onchange="CMS_MASTERS.onCertDateOrDaysChange(this, true)" onblur="CMS_MASTERS.onCertDateOrDaysChange(this, true)" />
                    <div class="inline-flex rounded border border-blue-200 bg-white p-0.5 shadow-2xs">
                      <button type="button" onclick="const b=this.closest('.cert-expiry-box'); const inp=b.querySelector('.cert-alert-days'); inp.value=${minAlertPolicy}; CMS_MASTERS.onCertDateOrDaysChange(inp, true);" class="px-1.5 py-0.5 text-[10px] font-bold text-blue-700 hover:bg-blue-100 rounded transition" title="Fix to Admin Minimum">Admin (${minAlertPolicy}d)</button>
                      ${minAlertPolicy < 30 ? `<button type="button" onclick="const b=this.closest('.cert-expiry-box'); const inp=b.querySelector('.cert-alert-days'); inp.value=30; CMS_MASTERS.onCertDateOrDaysChange(inp, true);" class="px-1.5 py-0.5 text-[10px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition">30d</button>` : ''}
                      ${minAlertPolicy < 60 ? `<button type="button" onclick="const b=this.closest('.cert-expiry-box'); const inp=b.querySelector('.cert-alert-days'); inp.value=60; CMS_MASTERS.onCertDateOrDaysChange(inp, true);" class="px-1.5 py-0.5 text-[10px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition">60d</button>` : ''}
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-[11px] font-bold text-slate-700 mb-1">Calculated Mail Dispatch Date</label>
                  <div class="px-2.5 py-1.5 bg-white border border-blue-200 rounded text-xs text-slate-700 flex items-center justify-between shadow-2xs">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <i data-lucide="bell" class="w-3.5 h-3.5 text-blue-600 shrink-0"></i>
                      <strong class="cert-alert-preview-text font-mono font-bold text-blue-700 text-[11px] truncate">${computedCertAlertDisplay}</strong>
                    </div>
                    <span class="cert-alert-days-summary text-[10px] font-bold text-slate-500 whitespace-nowrap ml-2">(${certAlertDays}d prior)</span>
                  </div>
                </div>
              </div>
            </div>

            <input type="hidden" class="cert-send-mail-radio" value="yes" />

            <input type="hidden" class="cert-alert-input" value="${computedCertAlertIso}" />
          </div>
        </div>

        <!-- 5. Upload File Copy & Document Name -->
        <div class="space-y-2">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">
              5. Upload Certificate Copy (PDF/Image) <span class="text-rose-600 font-bold">*</span>
            </label>
            <div class="cert-file-wrapper relative w-full">
              <input type="file" accept=".pdf,image/*" class="cert-file-input hidden" data-cms-dropzone="true" data-current="${fileName || ''}" onchange="CMS_MASTERS.onRowDropzoneFileChange(this)" />
              
              <!-- Dropzone -->
              <div onclick="this.closest('.cert-file-wrapper').querySelector('.cert-file-input').click()"
                   ondragover="event.preventDefault(); this.classList.add('border-blue-500', 'bg-blue-50/50');"
                   ondragleave="this.classList.remove('border-blue-500', 'bg-blue-50/50');"
                   ondrop="CMS_MASTERS.handleRowFileDrop(event, this)"
                   class="cert-dropzone ${fileName ? 'hidden' : ''} cms-dropzone group p-2.5">
                <i data-lucide="upload-cloud" class="w-4 h-4 text-blue-600"></i>
                <span class="text-xs font-bold text-slate-700 group-hover:text-blue-700">Click to Browse or Drag Certificate</span>
              </div>

              <!-- Attached Card -->
              <div class="cert-card-preview ${fileName ? '' : 'hidden'} cms-file-card p-2">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                  <i data-lucide="file-text" class="w-4 h-4 text-slate-600 shrink-0"></i>
                  <div class="min-w-0 flex-1">
                    <div class="text-xs font-bold text-slate-900 truncate file-name-display" title="${fileName || ''}">${fileName || ''}</div>
                    <div class="flex items-center gap-1 mt-0.5">
                      <span class="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 rounded">Attached</span>
                      <span class="text-[9px] text-slate-400 file-size-display"></span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                  <button type="button" onclick="CMS_MASTERS.previewRowDoc(this, '${fileName || ''}')" class="px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded border border-slate-200 cursor-pointer" title="Preview">View</button>
                  <button type="button" onclick="this.closest('.cert-file-wrapper').querySelector('.cert-file-input').click()" class="px-2 py-0.5 text-[10px] font-semibold text-blue-700 hover:bg-blue-50 rounded border border-blue-200 cursor-pointer" title="Replace">Change</button>
                  <button type="button" onclick="CMS_MASTERS.clearRowDoc(this)" class="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-rose-600 cursor-pointer" title="Remove"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1">
              Document Name
            </label>
            <input type="text" class="cert-title-input w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs outline-none focus:border-blue-500" placeholder="e.g. ISO 9001:2015 Quality Certificate" value="${docTitle}" />
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
            Quotation Rate (?) <span class="text-rose-500">*</span>
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
      window.CMS_APP.toast('Approvers / Admins cannot create or edit vendor registrations. Registration is handled by Store Staff (Maker).', 'info');
      if (vendorId) this.viewVendorProfile(vendorId);
      return;
    }
    const isEdit = Boolean(vendorId);
    if (isEdit) {
      const existingVendor = window.CMS_STORE.data.vendors.find(v => v.id === vendorId);
      if (existingVendor && (existingVendor.status === 'Approved' || existingVendor.isApproved)) {
        window.CMS_APP.toast('Approved vendor records are locked and cannot be edited.', 'info');
        this.viewVendorProfile(vendorId);
        return;
      }
    }
    const vendor = isEdit ? window.CMS_STORE.data.vendors.find(v => v.id === vendorId) : {
      name: '', address: '', addressTaluka: '', addressDistrict: '', addressState: 'Delhi', addressCountry: 'India', addressPinCode: '',
      gstNo: '', panNo: '', gstNotApplicable: false, panNotApplicable: false, certificates: [], contactNo: '', email: '',
      certificateFile: '', gstCertificateFile: '', panCardFile: '', approvedForLimitedPeriod: false, approvalValidTill: '',
      bankName: '', accountNo: '', accountName: '', ifscCode: '', branchName: '', isBlocked: false, blockReason: '',
      quotationNo: '', quotationDate: '', quotationValidTill: '', quotationDoc: '',
      quotedMaterialId: '', quotedMaterialName: '', quotedMaterialRate: '', quotedMaterialUnit: 'Nos', quotedMaterialHsn: '8472'
    };

    const initialPan = vendor.panNo || '';
    const today = new Date().toISOString().split('T')[0];
    const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
    const initialInfo = this.getStateInfo(vendor.addressState || 'Delhi');
    const initialGst = (vendor.gstNo || '').trim().toUpperCase();
    const initialGstState = initialGst.length >= 2 ? initialGst.substring(0, 2) : (initialInfo.code || '07');
    const initialGstPan = initialGst.length >= 12 ? initialGst.substring(2, 12) : (initialPan || '');
    const initialGstSuffix = initialGst.length >= 15 ? initialGst.substring(12, 15) : (initialGst.length > 12 ? initialGst.substring(12) : '');
      
      setTimeout(() => {
        const cEl = document.getElementById('v-country');
        if (cEl && !cEl.value.includes('India')) {
          CMS_MASTERS.onCountryChange(cEl.value);
        }
      }, 50);

    // Global step state for this modal
    window.CMS_MASTERS.editingVendorId = vendorId || null;
    window.CMS_MASTERS.currentVendorStep = 1;

    // Attach step functions
    window.CMS_MASTERS.switchVendorTab = function(step) {
      const currentStep = window.CMS_MASTERS.currentVendorStep || 1;
      
      // When moving forward, validate all steps from currentStep up to step - 1
      if (step > currentStep) {
        for (let s = currentStep; s < step; s++) {
          if (!window.CMS_MASTERS.validateVendorStep(s)) {
            return; // Stop and keep user on the invalid step
          }
        }
      }

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

      // Scroll modal body to top smoothly on step change
      const modalBox = document.querySelector('#cms-modal .max-h-\\[85vh\\]') || document.querySelector('#cms-modal .overflow-y-auto') || document.querySelector('#cms-modal');
      if (modalBox) modalBox.scrollTop = 0;
    };

    window.CMS_MASTERS.nextVendorTab = function() {
      const currentStep = window.CMS_MASTERS.currentVendorStep || 1;
      if (!window.CMS_MASTERS.validateVendorStep(currentStep)) {
        return; // Validation failed, do not advance
      }
      if (currentStep < 4) {
        window.CMS_MASTERS.switchVendorTab(currentStep + 1);
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
        ${(vendor && vendor.status === 'Revision Required') ? `
          <div class="p-3.5 bg-amber-50 border-2 border-amber-400 rounded mb-4 text-xs flex items-start gap-2.5 text-amber-900 shadow-2xs">
            <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600 shrink-0 mt-0.5"></i>
            <div>
              <div class="font-bold uppercase tracking-wider text-amber-950">Revision Required: Reviewer Mistake Remark</div>
              <div class="text-xs font-semibold text-rose-700 mt-0.5 font-mono">"${vendor.checkerMistakeRemark || 'Admin returned for revision'}"</div>
              <div class="text-[11px] text-amber-800 mt-1">Make your updates across Parts 1-4 below. When finished, proceed to Part 4 and click <strong>"Submit for Admin Approval"</strong> to re-submit.</div>
            </div>
          </div>
        ` : ''}
        
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

                  <!-- Sequence: Nationality -> State -> District -> Taluka -> Street -->
                  <div class="md:col-span-1">
                    <label class="block font-bold text-slate-700 mb-1">Nationality / Country of Vendor <span class="text-rose-600 font-bold">*</span></label>
                    <select id="v-country" required onchange="CMS_MASTERS.onCountryChange(this.value)" class="w-full px-3.5 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm bg-white">
                      ${this.countries.map(c => `<option value="${c.name}" ${(vendor.addressCountry || 'India').includes(c.name) ? 'selected' : ''}>${c.name}</option>`).join('')}
                    </select>
                  </div>
                  <div class="md:col-span-1">
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

                  <div class="md:col-span-1" id="v-district-container">
                    <label class="block font-bold text-slate-700 mb-1">District <span class="text-rose-600 font-bold">*</span></label>
                    <select id="v-district" required onchange="CMS_MASTERS.onDistrictChange(this.value)" class="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-xs">
                      <option value="">-- Choose District --</option>
                    </select>
                  </div>
                  <div class="md:col-span-1">
                    <label class="block font-bold text-slate-700 mb-1">Taluka / Tehsil</label>
                    <input id="v-taluka" value="${vendor.addressTaluka || ''}" class="w-full px-3 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Taluka name" />
                  </div>

                  <div class="md:col-span-2">
                    <label class="block font-bold text-slate-700 mb-1">Street / Building Address <span class="text-rose-600 font-bold">*</span></label>
                    <input id="v-address" required value="${vendor.address || ''}" class="w-full px-3.5 py-2 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Plot / Flat / Street / Area" />
                  </div>

                  <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-10 gap-3">
                    <div class="md:col-span-2">
                      <label class="block font-bold text-slate-700 mb-1">PIN Code (6 Digits) <span class="text-rose-600 font-bold">*</span></label>
                      <input id="v-pin" required maxlength="6" pattern="[0-9]{6}" value="${vendor.addressPinCode || ''}" class="w-full font-mono px-3 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="110020" />
                    </div>
                    <div class="md:col-span-4">
                      <label class="block font-bold text-slate-700 mb-1">Phone Number <span class="text-rose-600 font-bold">*</span></label>
                      <div class="flex items-stretch border border-slate-300 rounded-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 shadow-sm w-full bg-white">
                        <select id="v-country-code" class="w-[115px] px-2 py-2 bg-slate-50 border-r border-slate-300 text-slate-700 font-mono text-xs focus:outline-none cursor-pointer">
                          ${this.countries.map(c => {
                            const vCode = (vendor.countryCode || '').trim();
                            const isSel = (vCode === c.code) || (!vCode && c.code === '+91') || (vCode.toLowerCase() === 'india' && c.code === '+91') || (vCode === c.name);
                            return `<option value="${c.code}" ${isSel ? 'selected' : ''}>${c.code} (${c.name})</option>`;
                          }).join('')}
                        </select>
                        <input type="tel" id="v-contact" required maxlength="10" pattern="[0-9]{10}" value="${(vendor.contactNo || '').replace(/^India\s*/i, '').replace(/^\+\d+\s*/, '')}" class="flex-1 min-w-0 px-3 py-2 font-mono text-sm border-none focus:ring-0 focus:outline-none bg-transparent" placeholder="10-digit number" />
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
          <div class="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
            <div class="flex items-center justify-between border-b border-slate-200 pb-2">
              <div class="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <i data-lucide="shield-check" class="w-4 h-4 text-blue-600"></i>
                <span>Statutory PAN & GSTIN Identification</span>
              </div>
              <span class="text-[10px] text-slate-500 font-medium">Step 2 of 4</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- 1. PAN Card Details (Left Card) -->
              <div class="bg-white p-4 rounded border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-1.5 h-5">
                    <label for="v-pan" class="text-xs font-bold text-slate-800">
                      PAN Card Number (10 Characters) <span class="text-rose-600">*</span>
                    </label>
                    <span class="text-[9px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">Income Tax</span>
                  </div>

                  <input type="text" id="v-pan" ${vendor.panNotApplicable ? 'disabled' : ''} maxlength="10" value="${initialPan}" oninput="this.value = this.value.toUpperCase(); this.dataset.autoFilled = 'false'; CMS_MASTERS.onPanInput(this.value);" class="w-full h-10 px-3 border border-slate-300 rounded font-mono font-bold uppercase tracking-wider text-xs text-slate-800 bg-white placeholder:font-sans placeholder:normal-case placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition shadow-2xs" placeholder="e.g. AABCA1234F" />

                  <div class="h-5 mt-1.5 flex items-center text-[11px] text-slate-500">
                    <i data-lucide="info" class="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0"></i>
                    <span>Auto-syncs into middle 10 characters of GSTIN</span>
                  </div>

                  <div class="h-6 mt-2 flex items-center">
                    <label class="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                      <input type="checkbox" id="v-pan-na" ${vendor.panNotApplicable ? 'checked' : ''} onchange="CMS_MASTERS.togglePanApplicable(this.checked)" class="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <span>PAN card is not applicable for this vendor</span>
                    </label>
                  </div>
                </div>

                <div id="v-pan-file-box" class="${vendor.panNotApplicable ? 'hidden' : ''} mt-3 pt-3 border-t border-slate-200/80">
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="block text-xs font-bold text-slate-800">
                      Upload PAN Card Copy (PDF/Image) <span class="text-rose-600 font-bold">*</span>
                    </label>
                    <span class="text-[10px] text-slate-500 font-medium">Max 10MB</span>
                  </div>

                  <!-- Hidden native file input -->
                  <input type="file" id="v-pan-file" accept=".pdf,image/*" class="hidden" data-cms-dropzone="true" data-current="${vendor.panCardFile || ''}" onchange="CMS_MASTERS.onDropzoneFileChange(this, 'v-pan-card-preview', 'v-pan-dropzone')" />

                  <!-- 1. Dropzone (visible when no file attached) -->
                  <div id="v-pan-dropzone" onclick="document.getElementById('v-pan-file').click()"
                       ondragover="event.preventDefault(); this.classList.add('border-blue-500', 'bg-blue-50/50');"
                       ondragleave="this.classList.remove('border-blue-500', 'bg-blue-50/50');"
                       ondrop="CMS_MASTERS.handleFileDrop(event, 'v-pan-file', 'v-pan-card-preview', 'v-pan-dropzone')"
                       class="${vendor.panCardFile ? 'hidden' : ''} cms-dropzone group">
                    <div class="w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 transition">
                      <i data-lucide="upload-cloud" class="w-4 h-4"></i>
                    </div>
                    <div class="text-left min-w-0">
                      <div class="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition">
                        Click to Browse or Drag File Here
                      </div>
                      <div class="text-[10px] text-slate-500">Attach scanned PAN card copy (PDF, JPG, PNG)</div>
                    </div>
                  </div>

                  <!-- 2. Attached File Card (visible when file is attached) -->
                  <div id="v-pan-card-preview" class="${vendor.panCardFile ? '' : 'hidden'} cms-file-card">
                    <div class="flex items-center gap-2 min-w-0 flex-1">
                      <div class="w-7 h-7 rounded bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <i data-lucide="file-text" class="w-4 h-4"></i>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="text-xs font-bold text-slate-900 truncate file-name-display" title="${vendor.panCardFile || ''}">${vendor.panCardFile || ''}</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                            <i data-lucide="check" class="w-2.5 h-2.5"></i> Attached
                          </span>
                          <span class="text-[10px] text-slate-400 file-size-display"></span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center gap-1 shrink-0">
                      <button type="button" onclick="CMS_MASTERS.previewAttachedDoc('v-pan-file', '${vendor.panCardFile || ''}')" class="px-2 py-1 text-[11px] font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded border border-slate-200 transition flex items-center gap-1 cursor-pointer" title="Preview Document">
                        <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                        <span>View</span>
                      </button>
                      <button type="button" onclick="document.getElementById('v-pan-file').click()" class="px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 rounded border border-blue-200 transition flex items-center gap-1 cursor-pointer" title="Replace File">
                        <i data-lucide="refresh-cw" class="w-3 h-3"></i>
                        <span>Change</span>
                      </button>
                      <button type="button" onclick="CMS_MASTERS.clearAttachedDoc('v-pan-file', 'v-pan-card-preview', 'v-pan-dropzone')" class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer" title="Remove Document">
                        <i data-lucide="x" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. GSTIN Number (Right Card - auto-synced from State & PAN) -->
              <div class="bg-white p-4 rounded border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-1.5 h-5">
                    <label class="text-xs font-bold text-slate-800">
                      GSTIN Number (15 Characters) <span class="text-rose-600">*</span>
                    </label>
                    <span class="text-[9px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">Goods & Services</span>
                  </div>
                  
                  <div class="flex items-center gap-1.5 h-10">
                    <!-- Bracket 1: State Code (2 digits) - Locked to State -->
                    <div class="w-14 h-10 shrink-0">
                      <input type="text" id="v-gst-state" readonly tabindex="-1" maxlength="2" value="${initialGstState}"
                        class="w-full h-10 text-center font-mono font-bold text-xs bg-slate-100 border border-slate-300 rounded text-slate-800 cursor-not-allowed select-none focus:outline-none shadow-2xs"
                        title="2-digit State code (Locked to selected State)" placeholder="State" />
                    </div>

                    <span class="text-slate-400 font-bold">-</span>

                    <!-- Bracket 2: PAN (10 chars) - Auto-synced with PAN Card -->
                    <div class="flex-1 h-10 min-w-0">
                      <input type="text" id="v-gst-pan" maxlength="10" value="${initialGstPan}" placeholder="10-digit PAN"
                        oninput="this.value = this.value.toUpperCase(); CMS_MASTERS.onGstPanSegmentInput(this.value);"
                        class="w-full h-10 text-center font-mono font-bold uppercase text-xs px-2 border border-slate-300 rounded text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition shadow-2xs"
                        title="10-digit PAN (Auto-synced with PAN Card)" />
                    </div>

                    <span class="text-slate-400 font-bold">-</span>

                    <!-- Bracket 3: Entity / Suffix (3 chars) - Editable for ahead numbers -->
                    <div class="w-20 h-10 shrink-0">
                      <input type="text" id="v-gst-suffix" maxlength="3" value="${initialGstSuffix}" placeholder="1Z5"
                        oninput="this.value = this.value.toUpperCase(); CMS_MASTERS.onGstSuffixInput(this.value);"
                        class="w-full h-10 text-center font-mono font-bold uppercase text-xs px-1.5 border border-slate-300 bg-white rounded text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-2xs"
                        title="Entity / Suffix code (3 chars, e.g. 1Z5)" />
                    </div>
                  </div>

                  <!-- Hidden full input to preserve full compatibility with database & validation -->
                  <input type="hidden" id="v-gst" value="${vendor.gstNo || ''}" />
                  <div class="h-5 mt-1.5 flex items-center justify-between text-[11px] text-slate-600 font-mono">
                    <span class="truncate">Full GSTIN: <strong id="v-gst-full-display" class="text-slate-900 font-bold">${vendor.gstNo || (initialGstState + initialGstPan + initialGstSuffix) || '-'}</strong></span>
                    <span id="v-gst-state-name" class="text-slate-500 italic font-sans text-[10px] shrink-0 ml-1">${initialInfo.name ? '(' + initialInfo.name + ')' : ''}</span>
                  </div>
                  
                  <div class="h-6 mt-2 flex items-center">
                    <label class="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                      <input type="checkbox" id="v-gst-na" ${vendor.gstNotApplicable ? 'checked' : ''} onchange="CMS_MASTERS.toggleGstApplicable(this.checked)" class="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <span>GST registration is not applicable for this vendor (Exempt)</span>
                    </label>
                  </div>
                </div>

                <div id="v-gst-file-box" class="${vendor.gstNotApplicable ? 'hidden' : ''} mt-3 pt-3 border-t border-slate-200/80">
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="block text-xs font-bold text-slate-800">
                      Upload GST Certificate (PDF/Image) <span class="text-rose-600 font-bold">*</span>
                    </label>
                    <span class="text-[10px] text-slate-500 font-medium">Max 10MB</span>
                  </div>

                  <!-- Hidden native file input -->
                  <input type="file" id="v-gst-file" accept=".pdf,image/*" class="hidden" data-cms-dropzone="true" data-current="${vendor.gstCertificateFile || ''}" onchange="CMS_MASTERS.onDropzoneFileChange(this, 'v-gst-card-preview', 'v-gst-dropzone')" />

                  <!-- 1. Dropzone (visible when no file attached) -->
                  <div id="v-gst-dropzone" onclick="document.getElementById('v-gst-file').click()"
                       ondragover="event.preventDefault(); this.classList.add('border-blue-500', 'bg-blue-50/50');"
                       ondragleave="this.classList.remove('border-blue-500', 'bg-blue-50/50');"
                       ondrop="CMS_MASTERS.handleFileDrop(event, 'v-gst-file', 'v-gst-card-preview', 'v-gst-dropzone')"
                       class="${vendor.gstCertificateFile ? 'hidden' : ''} cms-dropzone group">
                    <div class="w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 transition">
                      <i data-lucide="upload-cloud" class="w-4 h-4"></i>
                    </div>
                    <div class="text-left min-w-0">
                      <div class="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition">
                        Click to Browse or Drag File Here
                      </div>
                      <div class="text-[10px] text-slate-500">Attach scanned GST registration certificate (PDF, JPG, PNG)</div>
                    </div>
                  </div>

                  <!-- 2. Attached File Card (visible when file is attached) -->
                  <div id="v-gst-card-preview" class="${vendor.gstCertificateFile ? '' : 'hidden'} cms-file-card">
                    <div class="flex items-center gap-2 min-w-0 flex-1">
                      <div class="w-7 h-7 rounded bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <i data-lucide="file-text" class="w-4 h-4"></i>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="text-xs font-bold text-slate-900 truncate file-name-display" title="${vendor.gstCertificateFile || ''}">${vendor.gstCertificateFile || ''}</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                            <i data-lucide="check" class="w-2.5 h-2.5"></i> Attached
                          </span>
                          <span class="text-[10px] text-slate-400 file-size-display"></span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center gap-1 shrink-0">
                      <button type="button" onclick="CMS_MASTERS.previewAttachedDoc('v-gst-file', '${vendor.gstCertificateFile || ''}')" class="px-2 py-1 text-[11px] font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded border border-slate-200 transition flex items-center gap-1 cursor-pointer" title="Preview Document">
                        <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                        <span>View</span>
                      </button>
                      <button type="button" onclick="document.getElementById('v-gst-file').click()" class="px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 rounded border border-blue-200 transition flex items-center gap-1 cursor-pointer" title="Replace File">
                        <i data-lucide="refresh-cw" class="w-3 h-3"></i>
                        <span>Change</span>
                      </button>
                      <button type="button" onclick="CMS_MASTERS.clearAttachedDoc('v-gst-file', 'v-gst-card-preview', 'v-gst-dropzone')" class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer" title="Remove Document">
                        <i data-lucide="x" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </div>
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
                <span>Add Certificate</span>
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
                <div id="v-limited-date-box" class="${vendor.approvedForLimitedPeriod ? '' : 'hidden'} mt-2.5 p-3 bg-slate-50 border border-slate-200 rounded space-y-3 text-xs">
                  <!-- 1. Approval Valid Till Date -->
                  <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">Approval Valid Till Date <span class="text-rose-600 font-bold">*</span></label>
                    <input type="date" id="v-approval-valid-till" min="${today}" value="${vendor.approvalValidTill || ''}" onchange="CMS_MASTERS.onLimitedApprovalDateOrDaysChange()" oninput="CMS_MASTERS.onLimitedApprovalDateOrDaysChange()" class="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs font-mono outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>

                  <!-- 2. Number of Days Fixation (Always Active with Validity) -->
                  <div id="v-approval-mail-fixation-section" class="p-3 bg-blue-50/80 border border-blue-200 rounded space-y-2.5">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1.5 border-b border-blue-200/60">
                      <div class="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
                        <i data-lucide="calendar-clock" class="w-4 h-4 text-blue-600 shrink-0"></i>
                        <span>Number of Days Fixation</span>
                      </div>
                      <span class="text-[10px] font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded shadow-2xs">
                        ${minAlertPolicy} Days
                      </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div>
                        <div class="flex items-center justify-between mb-1">
                          <label class="block text-[11px] font-bold text-slate-700">Fix Days Prior to Approval Expiry <span class="text-rose-600 font-bold">*</span></label>
                          <span class="text-[10px] text-slate-400 font-medium">Days</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                          <input type="number" min="${minAlertPolicy}" max="365" id="v-approval-alert-days" value="${vendor.approvalAlertDays || minAlertPolicy}" placeholder="${minAlertPolicy}" oninput="CMS_MASTERS.onLimitedApprovalDateOrDaysChange()" onchange="CMS_MASTERS.onLimitedApprovalDateOrDaysChange(true)" onblur="CMS_MASTERS.onLimitedApprovalDateOrDaysChange(true)" class="w-20 text-center font-bold font-mono px-2 py-1.5 border border-blue-300 bg-white rounded text-xs text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                          <div class="inline-flex rounded border border-blue-200 bg-white p-0.5 shadow-2xs">
                            <button type="button" onclick="document.getElementById('v-approval-alert-days').value=${minAlertPolicy}; CMS_MASTERS.onLimitedApprovalDateOrDaysChange(true);" class="px-1.5 py-0.5 text-[10px] font-bold text-blue-700 hover:bg-blue-100 rounded transition" title="Fix to Admin Minimum">Admin (${minAlertPolicy}d)</button>
                            ${minAlertPolicy < 30 ? `<button type="button" onclick="document.getElementById('v-approval-alert-days').value=30; CMS_MASTERS.onLimitedApprovalDateOrDaysChange(true);" class="px-1.5 py-0.5 text-[10px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition">30d</button>` : ''}
                            ${minAlertPolicy < 60 ? `<button type="button" onclick="document.getElementById('v-approval-alert-days').value=60; CMS_MASTERS.onLimitedApprovalDateOrDaysChange(true);" class="px-1.5 py-0.5 text-[10px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition">60d</button>` : ''}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label class="block text-[11px] font-bold text-slate-700 mb-1">Calculated Mail Dispatch Date</label>
                        <div class="px-2.5 py-1.5 bg-white border border-blue-200 rounded text-xs text-slate-700 flex items-center justify-between shadow-2xs">
                          <div class="flex items-center gap-1.5 min-w-0">
                            <i data-lucide="bell" class="w-3.5 h-3.5 text-blue-600 shrink-0"></i>
                            <strong id="v-approval-alert-preview" class="font-mono font-bold text-blue-700 text-[11px] truncate">${vendor.approvalValidTill ? CMS_MASTERS.formatDisplayDate(vendor.approvalAlertDate || CMS_MASTERS.calculateAlertDate(vendor.approvalValidTill, vendor.approvalAlertDays || minAlertPolicy)) : 'Select date above'}</strong>
                          </div>
                          <span id="v-approval-alert-days-summary" class="text-[10px] font-bold text-slate-500 whitespace-nowrap ml-2">(${vendor.approvalAlertDays || minAlertPolicy}d prior)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <input type="hidden" id="v-approval-mail-yes" value="yes" />

                  <input type="hidden" id="v-approval-alert-date" value="${vendor.approvalAlertDate || (vendor.approvalValidTill ? CMS_MASTERS.calculateAlertDate(vendor.approvalValidTill, vendor.approvalAlertDays || minAlertPolicy) : '')}" />
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
                <div class="flex items-center justify-between mb-1">
                  <label class="block font-bold text-slate-700 text-xs">IFSC Code (11 Chars) <span class="text-rose-600 font-bold">*</span></label>
                  <span id="v-ifsc-counter" class="text-[10px] font-mono font-bold ${(vendor.ifscCode || '').length === 11 ? 'text-emerald-600' : (vendor.ifscCode || '').length > 0 ? 'text-rose-600' : 'text-slate-400'}">${(vendor.ifscCode || '').length}/11</span>
                </div>
                <input type="text" id="v-ifsc" autocomplete="new-password" required maxlength="11" minlength="11" value="${vendor.ifscCode || ''}" oninput="CMS_MASTERS.onIfscInput(this)" onblur="CMS_MASTERS.onIfscInput(this, true)" class="w-full font-mono uppercase px-3 py-1.5 border ${(vendor.ifscCode || '').length === 11 ? 'border-emerald-500 bg-emerald-50/20' : (vendor.ifscCode || '').length > 0 ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-500 text-rose-900' : 'border-slate-300'} rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. HDFC0001234" />
                <div id="v-ifsc-error" class="${(vendor.ifscCode && vendor.ifscCode.length !== 11) ? '' : 'hidden'} text-rose-600 font-bold text-[10px] mt-1 flex items-center gap-1">
                  ${(vendor.ifscCode && vendor.ifscCode.length !== 11) ? `<i data-lucide="alert-circle" class="w-3.5 h-3.5 text-rose-600 shrink-0"></i><span>IFSC Code must be exactly 11 characters (less digits entered: ${vendor.ifscCode.length}/11).</span>` : ''}
                </div>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Branch Name</label>
                <input type="text" id="v-branch-name" autocomplete="new-password" value="${vendor.branchName || ''}" class="w-full px-3 py-1.5 border border-slate-300 rounded-sm px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Branch Name" />
              </div>
            </div>
            <div class="mt-3 pt-3 border-t border-slate-200">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                <label class="block font-bold text-slate-800 text-xs">
                  Upload Supporting Bank Document <span class="text-rose-600 font-bold">*</span>
                </label>
                <div class="flex items-center gap-2">
                  <label class="text-[11px] font-bold text-slate-600">Document Type: <span class="text-rose-600 font-bold">*</span></label>
                  <select id="v-bank-title" required class="px-2 py-1 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium">
                    <option value="" ${!vendor.bankDocTitle ? 'selected' : ''}>-- Select Type --</option>
                    <option value="Cancelled Cheque" ${vendor.bankDocTitle === 'Cancelled Cheque' ? 'selected' : ''}>Cancelled Cheque</option>
                    <option value="Passbook" ${vendor.bankDocTitle === 'Passbook' ? 'selected' : ''}>Passbook</option>
                    <option value="Bank Statement" ${vendor.bankDocTitle === 'Bank Statement' ? 'selected' : ''}>Bank Statement</option>
                    <option value="Other Bank Document" ${vendor.bankDocTitle === 'Other Bank Document' ? 'selected' : ''}>Other Bank Document</option>
                  </select>
                </div>
              </div>

              <!-- Hidden native file input -->
              <input type="file" id="v-bank-file" accept=".pdf,image/*" class="hidden" data-cms-dropzone="true" data-current="${vendor.bankDoc || ''}" onchange="CMS_MASTERS.onDropzoneFileChange(this, 'v-bank-card-preview', 'v-bank-dropzone')" />

              <!-- 1. Dropzone (visible when no file attached) -->
              <div id="v-bank-dropzone" onclick="document.getElementById('v-bank-file').click()"
                   ondragover="event.preventDefault(); this.classList.add('border-blue-500', 'bg-blue-50/50');"
                   ondragleave="this.classList.remove('border-blue-500', 'bg-blue-50/50');"
                   ondrop="CMS_MASTERS.handleFileDrop(event, 'v-bank-file', 'v-bank-card-preview', 'v-bank-dropzone')"
                   class="${vendor.bankDoc ? 'hidden' : ''} cms-dropzone group">
                <div class="w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 transition">
                  <i data-lucide="upload-cloud" class="w-4 h-4"></i>
                </div>
                <div class="text-left min-w-0">
                  <div class="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition">
                    Click to Browse or Drag File Here
                  </div>
                  <div class="text-[10px] text-slate-500">Attach Cancelled Cheque / Bank Passbook / Bank Statement (PDF, JPG, PNG)</div>
                </div>
              </div>

              <!-- 2. Attached File Card (visible when file is attached) -->
              <div id="v-bank-card-preview" class="${vendor.bankDoc ? '' : 'hidden'} cms-file-card">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                  <div class="w-7 h-7 rounded bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <i data-lucide="file-text" class="w-4 h-4"></i>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-xs font-bold text-slate-900 truncate file-name-display" title="${vendor.bankDoc || ''}">${vendor.bankDoc || ''}</div>
                    <div class="flex items-center gap-1.5 mt-0.5">
                      <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                        <i data-lucide="check" class="w-2.5 h-2.5"></i> Attached
                      </span>
                      <span class="text-[10px] text-slate-400 file-size-display"></span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                  <button type="button" onclick="CMS_MASTERS.previewAttachedDoc('v-bank-file', '${vendor.bankDoc || ''}')" class="px-2 py-1 text-[11px] font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded border border-slate-200 transition flex items-center gap-1 cursor-pointer" title="Preview Document">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                    <span>View</span>
                  </button>
                  <button type="button" onclick="document.getElementById('v-bank-file').click()" class="px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 rounded border border-blue-200 transition flex items-center gap-1 cursor-pointer" title="Replace File">
                    <i data-lucide="refresh-cw" class="w-3 h-3"></i>
                    <span>Change</span>
                  </button>
                  <button type="button" onclick="CMS_MASTERS.clearAttachedDoc('v-bank-file', 'v-bank-card-preview', 'v-bank-dropzone')" class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer" title="Remove Document">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-between gap-2.5">
          <div>
            <button type="button" onclick="CMS_APP.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-sm transition">Cancel</button>
          </div>
          <div class="flex items-center justify-between w-full"><div id="v-autosave-status" class="flex-1 text-xs text-emerald-600 font-semibold italic"></div><div class="flex gap-2.5">
            <button id="v-prev-btn" type="button" onclick="CMS_MASTERS.prevVendorTab()" class="hidden px-4 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold rounded-sm transition text-xs">Previous Step</button>
            <button id="v-next-btn" type="button" onclick="CMS_MASTERS.nextVendorTab()" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm shadow transition text-xs">Next Step <i data-lucide="arrow-right" class="w-3.5 h-3.5 inline"></i></button>
            <button id="v-draft-btn" type="button" onclick="CMS_MASTERS.saveVendorDraft()" class="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-sm transition flex items-center gap-1.5 text-xs">
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>Save Draft</span>
            </button>
            <button id="v-submit-btn" type="button" onclick="CMS_MASTERS.saveVendor('${vendorId || ''}', true)" class="hidden px-5 py-2.5 bg-slate-900 hover:bg-slate-900 text-white font-bold rounded-sm shadow transition flex items-center gap-1.5 text-xs">
              <i data-lucide="send" class="w-4 h-4"></i>
              <span>Submit for Admin Approval</span>
            </button>
            </div>
          </div>
          </div>
        </form>
    `;

    window.CMS_APP.openModal(isEdit ? 'Modify Vendor Record' : 'Register New Vendor', content, 'max-w-4xl');
    this.populateDistrictDropdown(vendor.addressState || 'Delhi', vendor.addressDistrict || '');

      // Auto-clear error styling and Auto-Save Draft
        const vendorForm = document.getElementById('vendor-form');
        if (vendorForm) {
          
          let draftTimeout;
          const triggerAutoSave = () => {
             // Only auto-save if they've at least typed a Company Name or something basic, to avoid blank drafts.
             const n = document.getElementById('v-name')?.value.trim();
             if (!n) return;
             clearTimeout(draftTimeout);
             draftTimeout = setTimeout(() => {
                // Determine ID: if we opened an edit modal, vendorId is passed. 
                // Wait, openVendorModal passes vendorId into the HTML string: saveVendor('${vendorId || ''}')
                // We need to know the active ID. Let's just parse it from the submit button.
                const btn = document.getElementById('v-submit-btn');
                let activeId = null;
                if (btn) {
                  const match = btn.getAttribute('onclick').match(/'([^']+)'/);
                  if (match && match[1]) activeId = match[1];
                }
                
                // If no active ID, generate one and update the submit button so future saves use it!
                if (!activeId) {
                  activeId = 'VEN-' + String(Math.floor(Date.now() / 1000)).padStart(3, '0');
                  if (btn) btn.setAttribute('onclick', `CMS_MASTERS.saveVendor('${activeId}', true)`);
                  vendorForm.setAttribute('onsubmit', `event.preventDefault(); CMS_MASTERS.saveVendor('${activeId}', true);`);
                }
                
                // Save quietly as draft
                CMS_MASTERS.saveVendor(activeId, false, false);
                const statusEl = document.getElementById('v-autosave-status');
                if (statusEl) {
                   statusEl.innerText = 'Draft auto-saved at ' + new Date().toLocaleTimeString();
                   setTimeout(() => { if (statusEl.innerText.includes('auto-saved')) statusEl.innerText = ''; }, 3000);
                }
                if (!vendorForm.dataset.toastShown) {
                   window.CMS_APP.toast('Draft successfully auto-saved in the background!', 'success');
                   vendorForm.dataset.toastShown = 'true';
                }
             }, 1000); // 1-second debounce
          };

          vendorForm.addEventListener('input', (e) => {
            if (e.target.classList.contains('border-rose-500')) {
              e.target.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-600');
            }
            triggerAutoSave();
          });
          vendorForm.addEventListener('change', (e) => {
            if (e.target.classList.contains('border-rose-500')) {
              e.target.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-600');
            }
            triggerAutoSave();
          });
        }

    // Populate dynamic certificates if present
    
      const certList = vendor.certificates || [];
      if (certList.length > 0) {
        certList.forEach(c => this.addCertificateRow(c));
      }

      setTimeout(() => {
        const qList = vendor.quotedItems || [];
        if (qList.length === 0 && (vendor.quotedMaterialId || vendor.quotedMaterialName || vendor.quotationNo)) {
          CMS_MASTERS.addVendorQuotationRow({
            quotationNo: vendor.quotationNo,
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
    const sInput = document.getElementById('v-gst-state');
    const pInput = document.getElementById('v-gst-pan');
    const sufInput = document.getElementById('v-gst-suffix');
    const box = document.getElementById('v-gst-file-box');
    
    [input, sInput, pInput, sufInput].forEach(el => {
      if (!el) return;
      el.disabled = isNotApplicable;
      if (isNotApplicable) {
        el.classList.add('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      } else {
        el.classList.remove('bg-slate-100', 'text-slate-400', 'cursor-not-allowed', 'opacity-50');
      }
    });

    if (isNotApplicable) {
      if (input) input.value = '';
      if (pInput) pInput.value = '';
      if (sufInput) sufInput.value = '';
      const displayEl = document.getElementById('v-gst-full-display');
      if (displayEl) displayEl.innerText = 'Exempt (N/A)';
    } else {
      const stateVal = document.getElementById('v-state')?.value;
      if (stateVal) this.onStateChange(stateVal);
      const panVal = document.getElementById('v-pan')?.value;
      if (panVal && pInput) pInput.value = panVal;
      this.assembleGst();
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

  // -------------------------------------------------------------
  // Universal Dropzone & File Management Subsystem for Masters
  // -------------------------------------------------------------
  async onDropzoneFileChange(input, previewCardId, dropzoneId) {
    if (!input || !input.files || input.files.length === 0) return;
    const file = input.files[0];
    const preview = document.getElementById(previewCardId);
    const dropzone = document.getElementById(dropzoneId);

    if (input.dataset) {
      delete input.dataset.removed;
      input.dataset.current = file.name;
    }

    const sizeStr = file.size > 1024 * 1024 
      ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' 
      : Math.round(file.size / 1024) + ' KB';

    if (preview) {
      const nameEl = preview.querySelector('.file-name-display');
      const sizeEl = preview.querySelector('.file-size-display');
      if (nameEl) {
        nameEl.textContent = file.name;
        nameEl.title = file.name;
      }
      if (sizeEl) sizeEl.textContent = '(' + sizeStr + ')';
      preview.classList.remove('hidden');
    }
    if (dropzone) {
      dropzone.classList.remove('border-rose-500', 'bg-rose-50');
      dropzone.classList.add('hidden');
    }

    try {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        if (window.CMS_FILE_STORE) {
          await window.CMS_FILE_STORE.saveFile(file.name, ev.target.result);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('Repository file save error:', err);
    }

    if (window.CMS_APP && window.CMS_APP.toast) {
      window.CMS_APP.toast(`Document ready: ${file.name}`, 'success');
    }
    if (window.lucide) window.lucide.createIcons();
  },

  handleFileDrop(event, inputId, previewCardId, dropzoneId) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const input = document.getElementById(inputId);
      if (input) {
        input.files = event.dataTransfer.files;
        this.onDropzoneFileChange(input, previewCardId, dropzoneId);
      }
    }
  },

  previewAttachedDoc(inputId, fallbackName) {
    const input = document.getElementById(inputId);
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (window.CMS_APP && window.CMS_APP.previewFile) {
          window.CMS_APP.previewFile(file.name, e.target.result);
        }
      };
      reader.readAsDataURL(file);
      return;
    }
    const name = fallbackName || input?.dataset?.current;
    if (name && window.CMS_APP && window.CMS_APP.previewFile) {
      window.CMS_APP.previewFile(name);
    } else {
      if (window.CMS_APP && window.CMS_APP.toast) {
        window.CMS_APP.toast('No document file attached to preview.', 'warning');
      }
    }
  },

  clearAttachedDoc(inputId, previewCardId, dropzoneId) {
    const input = document.getElementById(inputId);
    if (input) {
      input.value = '';
      if (input.dataset) {
        input.dataset.current = '';
        input.dataset.removed = 'true';
      }
    }
    const preview = document.getElementById(previewCardId);
    const dropzone = document.getElementById(dropzoneId);
    if (preview) preview.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (window.CMS_APP && window.CMS_APP.toast) {
      window.CMS_APP.toast('Document removed. Choose new file to upload.', 'info');
    }
    if (window.lucide) window.lucide.createIcons();
  },

  async onRowDropzoneFileChange(input) {
    if (!input || !input.files || input.files.length === 0) return;
    const file = input.files[0];
    const wrapper = input.closest('.cert-file-wrapper, .q-file-wrapper');
    if (!wrapper) return;

    if (input.dataset) {
      delete input.dataset.removed;
      input.dataset.current = file.name;
    }

    const sizeStr = file.size > 1024 * 1024 
      ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' 
      : Math.round(file.size / 1024) + ' KB';

    const preview = wrapper.querySelector('.cert-card-preview, .q-card-preview');
    const dropzone = wrapper.querySelector('.cert-dropzone, .q-dropzone');

    if (preview) {
      const nameEl = preview.querySelector('.file-name-display');
      const sizeEl = preview.querySelector('.file-size-display');
      if (nameEl) {
        nameEl.textContent = file.name;
        nameEl.title = file.name;
      }
      if (sizeEl) sizeEl.textContent = '(' + sizeStr + ')';
      preview.classList.remove('hidden');
    }
    if (dropzone) {
      dropzone.classList.remove('border-rose-500', 'bg-rose-50');
      dropzone.classList.add('hidden');
    }

    try {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        if (window.CMS_FILE_STORE) {
          await window.CMS_FILE_STORE.saveFile(file.name, ev.target.result);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('Row file repository save error:', err);
    }

    if (window.CMS_APP && window.CMS_APP.toast) {
      window.CMS_APP.toast(`Document attached: ${file.name}`, 'success');
    }
    if (window.lucide) window.lucide.createIcons();
  },

  handleRowFileDrop(event, dropzoneEl) {
    event.preventDefault();
    const wrapper = dropzoneEl.closest('.cert-file-wrapper, .q-file-wrapper');
    if (!wrapper) return;
    const input = wrapper.querySelector('.cert-file-input, .q-file');
    if (input && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      input.files = event.dataTransfer.files;
      this.onRowDropzoneFileChange(input);
    }
  },

  previewRowDoc(btn, fallbackName) {
    const wrapper = btn.closest('.cert-file-wrapper, .q-file-wrapper');
    if (!wrapper) return;
    const input = wrapper.querySelector('.cert-file-input, .q-file');
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (window.CMS_APP && window.CMS_APP.previewFile) {
          window.CMS_APP.previewFile(file.name, e.target.result);
        }
      };
      reader.readAsDataURL(file);
      return;
    }
    const name = fallbackName || input?.dataset?.current;
    if (name && window.CMS_APP && window.CMS_APP.previewFile) {
      window.CMS_APP.previewFile(name);
    } else {
      if (window.CMS_APP && window.CMS_APP.toast) {
        window.CMS_APP.toast('No document file attached to preview.', 'warning');
      }
    }
  },

  clearRowDoc(btn) {
    const wrapper = btn.closest('.cert-file-wrapper, .q-file-wrapper');
    if (!wrapper) return;
    const input = wrapper.querySelector('.cert-file-input, .q-file');
    if (input) {
      input.value = '';
      if (input.dataset) {
        input.dataset.current = '';
        input.dataset.removed = 'true';
      }
    }
    const preview = wrapper.querySelector('.cert-card-preview, .q-card-preview');
    const dropzone = wrapper.querySelector('.cert-dropzone, .q-dropzone');
    if (preview) preview.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (window.CMS_APP && window.CMS_APP.toast) {
      window.CMS_APP.toast('Document removed. Choose new file to upload.', 'info');
    }
    if (window.lucide) window.lucide.createIcons();
  },

  validateVendorStep(step) {
    const store = window.CMS_STORE;
    const vendorId = window.CMS_MASTERS.editingVendorId || document.getElementById('v-submit-btn')?.getAttribute('onclick')?.match(/'([^']*)'/)?.[1] || '';
    const existingVendor = vendorId ? store.data.vendors.find(v => v.id === vendorId) : null;
    const today = new Date().toISOString().split('T')[0];

    const stepDiv = document.getElementById('v-step-' + step);
    if (stepDiv) {
      stepDiv.querySelectorAll('.border-rose-500, .bg-rose-50, .border-rose-400').forEach(el => {
        el.classList.remove('border-rose-500', 'bg-rose-50', 'border-rose-400');
      });
    }

    const highlightError = (el, message) => {
      if (el) {
        el.classList.add('border-rose-500', 'bg-rose-50');
        const clearHandler = () => el.classList.remove('border-rose-500', 'bg-rose-50');
        el.addEventListener('input', clearHandler, { once: true });
        el.addEventListener('change', clearHandler, { once: true });
        el.addEventListener('click', clearHandler, { once: true });
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof el.focus === 'function') el.focus();
      }
      if (window.CMS_APP && window.CMS_APP.toast) {
        window.CMS_APP.toast(message, 'error');
      }
      return false;
    };

    if (step === 1) {
      // 1. Organization & Business Address
      const constitution = document.getElementById('v-constitution');
      if (!constitution || !constitution.value.trim()) {
        return highlightError(constitution, 'Please select the Constitution Type.');
      }

      const name = document.getElementById('v-name');
      if (!name || !name.value.trim()) {
        return highlightError(name, 'Vendor / Supplier Company Name is mandatory.');
      }

      const country = document.getElementById('v-country');
      if (!country || !country.value.trim()) {
        return highlightError(country, 'Please select Nationality / Country of vendor.');
      }

      const isIndia = (country.value || 'India').includes('India');

      const state = document.getElementById('v-state');
      if (!state || !state.value.trim()) {
        return highlightError(state, 'Please select the State / Province.');
      }

      const distSelect = document.getElementById('v-district');
      const distOther = document.getElementById('v-district-other');
      let distVal = distSelect ? distSelect.value.trim() : '';
      if (distVal === 'Other' && distOther) {
        distVal = distOther.value.trim();
        if (!distVal) {
          return highlightError(distOther, 'Please specify the District name for "Other".');
        }
      }
      if (!distVal) {
        return highlightError(distSelect, 'District is mandatory.');
      }

      const address = document.getElementById('v-address');
      if (!address || !address.value.trim()) {
        return highlightError(address, 'Street / Building Address is mandatory.');
      }

      const pin = document.getElementById('v-pin');
      const pinVal = pin ? pin.value.trim() : '';
      if (!pinVal) {
        return highlightError(pin, 'PIN Code is mandatory.');
      }
      if (isIndia && !/^[0-9]{6}$/.test(pinVal)) {
        return highlightError(pin, `PIN Code must be exactly 6 numeric digits (currently "${pinVal}"). Example: 110020.`);
      }

      const contact = document.getElementById('v-contact');
      const rawContact = contact ? contact.value.trim() : '';
      const cleanPhone = rawContact.replace(/[^0-9]/g, '');
      if (!cleanPhone) {
        return highlightError(contact, 'Phone number is mandatory.');
      }
      if (cleanPhone.length < 10) {
        return highlightError(contact, `Phone number must contain at least 10 numeric digits (currently ${cleanPhone.length} digits).`);
      }

      const email = document.getElementById('v-email');
      const emailVal = email ? email.value.trim() : '';
      if (!emailVal) {
        return highlightError(email, 'Email Address is mandatory.');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        return highlightError(email, 'Please enter a valid email address (e.g. vendor@domain.com).');
      }

      return true;
    }

    if (step === 2) {
      // 2. Statutory PAN & GSTIN Identification + Regulatory Certificates
      const panNa = document.getElementById('v-pan-na')?.checked || false;
      const panInput = document.getElementById('v-pan');
      const panVal = panInput ? panInput.value.trim().toUpperCase() : '';

      if (!panNa) {
        if (!panVal) {
          return highlightError(panInput, 'PAN Card Number is mandatory. If exempt, check "PAN card is not applicable".');
        }
        if (panVal.length !== 10) {
          return highlightError(panInput, `PAN Number must be exactly 10 characters (currently ${panVal.length} characters). Example: AABCA1234F.`);
        }
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panVal)) {
          return highlightError(panInput, 'PAN format must be 5 letters, 4 digits, and 1 letter (e.g. AABCA1234F).');
        }

        const panFileInput = document.getElementById('v-pan-file');
        const hasPanFile = Boolean(
          (panFileInput?.files && panFileInput.files.length > 0) ||
          (panFileInput?.dataset?.current && panFileInput.dataset.removed !== 'true') ||
          (panFileInput?.dataset?.removed !== 'true' && existingVendor?.panCardFile)
        );
        if (!hasPanFile) {
          const dropzone = document.getElementById('v-pan-dropzone');
          return highlightError(dropzone, 'Please upload a scanned copy of the PAN Card (PDF or Image).');
        }
      }

      const gstNa = document.getElementById('v-gst-na')?.checked || false;
      const gstInput = document.getElementById('v-gst');
      const sCode = document.getElementById('v-gst-state')?.value.trim() || '';
      const pCode = document.getElementById('v-gst-pan')?.value.trim().toUpperCase() || '';
      const sufCode = document.getElementById('v-gst-suffix')?.value.trim().toUpperCase() || '';
      let fullGst = (sCode + pCode + sufCode).toUpperCase();
      if (gstInput && gstInput.value) {
        fullGst = gstInput.value.trim().toUpperCase();
      }

      if (!gstNa) {
        if (!fullGst || fullGst.length === 0) {
          const target = document.getElementById('v-gst-suffix') || gstInput;
          return highlightError(target, 'GSTIN Number is mandatory. If vendor is unregistered/exempt, check the GST exemption box.');
        }
        if (fullGst.length !== 15) {
          const target = document.getElementById('v-gst-suffix') || gstInput;
          return highlightError(target, `GSTIN must be exactly 15 characters (currently ${fullGst.length} characters). Example: 07AABCA1234F1Z5.`);
        }
        if (!/^[0-9A-Z]{15}$/.test(fullGst)) {
          const target = document.getElementById('v-gst-suffix') || gstInput;
          return highlightError(target, 'GSTIN must be 15 alphanumeric characters without spaces or symbols.');
        }

        // Duplicate GSTIN check
        const duplicateGst = store.data.vendors.find(v => v.id !== vendorId && v.gstNo && v.gstNo.toUpperCase() === fullGst);
        if (duplicateGst) {
          const target = document.getElementById('v-gst-suffix') || gstInput;
          return highlightError(target, `Duplicate GSTIN! "${duplicateGst.name}" (${duplicateGst.id}) is already registered with GSTIN ${fullGst}.`);
        }

        const gstFileInput = document.getElementById('v-gst-file');
        const hasGstFile = Boolean(
          (gstFileInput?.files && gstFileInput.files.length > 0) ||
          (gstFileInput?.dataset?.current && gstFileInput.dataset.removed !== 'true') ||
          (gstFileInput?.dataset?.removed !== 'true' && existingVendor?.gstCertificateFile)
        );
        if (!hasGstFile) {
          const dropzone = document.getElementById('v-gst-dropzone');
          return highlightError(dropzone, 'Please upload the GST Registration Certificate (PDF or Image).');
        }
      }

      // Regulatory Certificates Check
      const certRows = document.querySelectorAll('#v-cert-container .cert-row');
      for (const row of certRows) {
        let reg = row.querySelector('.cert-regulator-select')?.value || '';
        const regSelect = row.querySelector('.cert-regulator-select');
        if (reg === 'Other') {
          const otherInput = row.querySelector('.cert-regulator-other-input');
          const otherVal = otherInput?.value.trim();
          if (!otherVal) return highlightError(otherInput, 'Please specify the regulatory agency name for "Other".');
          reg = otherVal;
        }
        const certInput = row.querySelector('.cert-number-input');
        const certNo = certInput?.value.trim() || '';
        const hasVal = row.querySelector('input[type="radio"]:checked')?.value === 'yes';
        const expiryInput = row.querySelector('.cert-expiry-input');
        const expiry = hasVal ? (expiryInput?.value || '') : '';

        if (reg || certNo) {
          if (!reg) return highlightError(regSelect, 'Please select a Regulatory / Certification Agency.');
          if (!certNo) return highlightError(certInput, `License / Certificate Number is mandatory for ${reg}.`);
          if (hasVal && !expiry) return highlightError(expiryInput, `Expiry date is mandatory for ${reg} (${certNo}).`);
          if (hasVal && expiry < today) return highlightError(expiryInput, `Expiry date for ${reg} cannot be in the past.`);
          
          const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
          const certAlertDaysInput = row.querySelector('.cert-alert-days');
          const certAlertDaysVal = certAlertDaysInput ? (parseInt(certAlertDaysInput.value, 10) || 0) : minAlertPolicy;
          if (hasVal && certAlertDaysVal < minAlertPolicy) {
            if (certAlertDaysInput) {
              certAlertDaysInput.value = minAlertPolicy;
              CMS_MASTERS.onCertDateOrDaysChange(certAlertDaysInput, true);
            }
            return highlightError(certAlertDaysInput, `Number of days fixation for ${reg} cannot be less than Admin benchmark (${minAlertPolicy} days).`);
          }

          const certFileInput = row.querySelector('.cert-file-input');
          const hasCertFile = Boolean(
            (certFileInput?.files && certFileInput.files.length > 0) ||
            (certFileInput?.dataset?.current && certFileInput.dataset.removed !== 'true')
          );
          if (!hasCertFile) {
            const dropzone = row.querySelector('.cert-dropzone');
            return highlightError(dropzone, `Please upload the certificate document copy for ${reg} (${certNo}).`);
          }
        }
      }

      return true;
    }

    if (step === 3) {
      // 3. Commercial Quotations & Approved Materials
      const quoteRows = document.querySelectorAll('#v-quotations-container .quote-row');
      if (quoteRows.length === 0) {
        const quoteBox = document.getElementById('v-quotations-container');
        return highlightError(quoteBox, 'Please add at least one commercial quotation with rate and quotation copy document.');
      }
      for (let idx = 0; idx < quoteRows.length; idx++) {
        const row = quoteRows[idx];
        const qnoInput = row.querySelector('.q-no');
        const matSelect = row.querySelector('.q-mat-id');
        const matInput = row.querySelector('.q-mat-name');
        const qno = qnoInput?.value.trim() || '';
        const matName = matInput?.value.trim() || '';
        const qDateInput = row.querySelector('.q-date');
        const qDate = qDateInput?.value || '';
        const qEffInput = row.querySelector('.q-eff');
        const qEff = qEffInput?.value || '';
        const qValidInput = row.querySelector('.q-valid');
        const qValid = qValidInput?.value || '';
        const qRateInput = row.querySelector('.q-rate');
        const rate = parseFloat(qRateInput?.value || '0');

        const qFileInput = row.querySelector('.q-file');
        const hasQFile = Boolean(
          (qFileInput?.files && qFileInput.files.length > 0) ||
          (qFileInput?.dataset?.current && qFileInput.dataset.removed !== 'true')
        );

        if (idx === 0 || qno || matName || qDate || rate > 0 || hasQFile) {
          if (!qno) return highlightError(qnoInput, 'Quotation Ref Number is mandatory.');
          if (!matName) return highlightError(matSelect || qnoInput, 'Please choose or enter the quoted Material / Consumable.');
          if (!qDate) return highlightError(qDateInput, 'Quotation Date is mandatory.');
          if (qDate > today) return highlightError(qDateInput, 'Quotation Date cannot be in the future.');
          if (qEff && qEff < qDate) return highlightError(qEffInput, 'Effective Date cannot be older than Quotation Date.');
          const compareBase = qEff || qDate;
          if (qValid && compareBase && qValid < compareBase) {
            return highlightError(qValidInput, 'Valid Till / Expiry Date cannot be older than ' + (qEff ? 'Effective' : 'Quotation') + ' Date.');
          }
          if (qValid && qValid < today) {
            return highlightError(qValidInput, 'Quotation Valid Till Date cannot be in the past.');
          }
          if (qValid) {
            const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
            const qAlertDaysInput = row.querySelector('.q-alert-days');
            const qAlertDaysVal = qAlertDaysInput ? (parseInt(qAlertDaysInput.value, 10) || 0) : minAlertPolicy;
            if (qAlertDaysVal < minAlertPolicy) {
              if (qAlertDaysInput) {
                qAlertDaysInput.value = minAlertPolicy;
                CMS_MASTERS.onQuoteDateOrDaysChange(qAlertDaysInput, true);
              }
              return highlightError(qAlertDaysInput, `Number of days fixation for Quotation "${qno}" cannot be less than Admin benchmark (${minAlertPolicy} days).`);
            }
          }
          if (!rate || rate <= 0) return highlightError(qRateInput, 'Please enter a valid quoted Unit Rate (greater than 0).');
          if (!hasQFile) {
            const dropzone = row.querySelector('.q-dropzone');
            return highlightError(dropzone, `Please upload the Quotation Copy document (PDF or Image) for Quotation "${qno}".`);
          }
        }
      }

      const limited = document.getElementById('v-limited')?.checked || false;
      if (limited) {
        const validTillInput = document.getElementById('v-approval-valid-till');
        const validTill = validTillInput?.value || '';
        if (!validTill) return highlightError(validTillInput, 'Approval Expiry Date is mandatory when limited period approval is checked.');
        if (validTill < today) return highlightError(validTillInput, 'Approval Expiry Date cannot be in the past.');
        const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;
        const limAlertDaysInput = document.getElementById('v-approval-alert-days');
        const limAlertDaysVal = limAlertDaysInput ? (parseInt(limAlertDaysInput.value, 10) || 0) : minAlertPolicy;
        if (limAlertDaysVal < minAlertPolicy) {
          if (limAlertDaysInput) {
            limAlertDaysInput.value = minAlertPolicy;
            CMS_MASTERS.onLimitedApprovalDateOrDaysChange(true);
          }
          return highlightError(limAlertDaysInput, `Number of days fixation for Limited Period Approval cannot be less than Admin benchmark (${minAlertPolicy} days).`);
        }
      }

      return true;
    }

    if (step === 4) {
      // 4. Bank Details & Supporting Document
      const bankName = document.getElementById('v-bank-name');
      if (!bankName || !bankName.value.trim()) {
        return highlightError(bankName, 'Bank Name is mandatory.');
      }

      const accName = document.getElementById('v-account-name');
      const accNameVal = accName ? accName.value.trim() : '';
      if (!accNameVal) {
        return highlightError(accName, 'Account Beneficiary Name is mandatory.');
      }
      if (/[^a-zA-Z\s.\-&]/.test(accNameVal)) {
        return highlightError(accName, 'Bank Account Name cannot contain numbers or special symbols.');
      }

      const accNo = document.getElementById('v-account-no');
      const accNoVal = accNo ? accNo.value.trim() : '';
      if (!accNoVal) {
        return highlightError(accNo, 'Bank Account Number is mandatory.');
      }
      if (accNoVal.length < 5 || accNoVal.length > 22) {
        return highlightError(accNo, `Bank Account Number must be between 5 and 22 digits (currently ${accNoVal.length} digits).`);
      }

      const ifsc = document.getElementById('v-ifsc');
      const ifscVal = ifsc ? ifsc.value.trim().toUpperCase() : '';
      if (!ifscVal) {
        CMS_MASTERS.onIfscInput(ifsc, true);
        return highlightError(ifsc, 'Bank IFSC Code is mandatory (must be exactly 11 characters).');
      }
      if (ifscVal.length !== 11) {
        CMS_MASTERS.onIfscInput(ifsc, true);
        return highlightError(ifsc, `Bank IFSC Code must be exactly 11 characters (currently "${ifscVal}" - ${ifscVal.length} chars). No less than or greater number accepted.`);
      }

      const bankTitle = document.getElementById('v-bank-title');
      if (!bankTitle || !bankTitle.value.trim()) {
        return highlightError(bankTitle, 'Please select the Supporting Bank Document Type (e.g. Cancelled Cheque / Passbook).');
      }

      const bankFileInput = document.getElementById('v-bank-file');
      const hasBankDoc = Boolean(
        (bankFileInput?.files && bankFileInput.files.length > 0) ||
        (bankFileInput?.dataset?.current && bankFileInput.dataset.removed !== 'true') ||
        (bankFileInput?.dataset?.removed !== 'true' && existingVendor?.bankDoc)
      );
      if (!hasBankDoc) {
        const dropzone = document.getElementById('v-bank-dropzone');
        return highlightError(dropzone, 'Please upload the supporting Bank Document (Cancelled Cheque or Passbook).');
      }

      return true;
    }

    return true;
  },

  saveAndSubmitVendor(vendorId) {
    this.saveVendor(vendorId, true, false);
  },

  saveVendorDraft() {
    const btn = document.getElementById('v-submit-btn');
    let activeId = null;
    if (btn) {
      const match = btn.getAttribute('onclick')?.match(/'([^']*)'/);
      if (match && match[1]) activeId = match[1];
    }
    this.saveVendor(activeId, false, true);
  },

  async saveVendor(vendorId = null, directSubmit = true, isManualDraft = false) {
    const store = window.CMS_STORE;
    const role = store.getRole();
    if (role === 'Admin') {
      if (window.CMS_APP) window.CMS_APP.toast('Administrative Approvers (Checker) cannot create or modify vendor registrations.', 'error');
      return;
    }
    const readFileAsDataUrl = (file) => {
      return new Promise((resolve) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    };
    const currentUser = store.getCurrentUser();
    
    if (directSubmit) {
      for (let s = 1; s <= 4; s++) {
        if (!this.validateVendorStep(s)) {
          this.switchVendorTab(s);
          return;
        }
      }
    }
    const isEdit = Boolean(vendorId && store.data.vendors.some(v => v.id === vendorId));
    const existingVendor = isEdit ? store.data.vendors.find(v => v.id === vendorId) : null;
    const today = new Date().toISOString().split('T')[0];
    const minAlertPolicy = (window.CMS_NOTIFICATIONS ? window.CMS_NOTIFICATIONS.getSettings().minAlertDays : 15) || 15;

    const name = document.getElementById('v-name')?.value.trim() || '';
    const address = document.getElementById('v-address')?.value.trim() || '';
    const constitution = document.getElementById('v-constitution')?.value || '';
      const addressTaluka = document.getElementById('v-taluka')?.value.trim() || '';
    const distSelect = document.getElementById('v-district');
    const distOther = document.getElementById('v-district-other');
    let addressDistrict = '';
    if (distSelect) {
      if (distSelect.tagName === 'SELECT') {
        addressDistrict = (distSelect.value === 'Other' && distOther && distOther.value.trim()) ? distOther.value.trim() : distSelect.value.trim();
      } else {
        addressDistrict = distSelect.value.trim();
      }
    }
    const addressState = document.getElementById('v-state')?.value || '';
    const addressCountry = document.getElementById('v-country')?.value.trim() || 'India';
    const addressPinCode = document.getElementById('v-pin')?.value.trim() || '';
    const rawContact = document.getElementById('v-contact')?.value.trim() || '';
    const contactNo = rawContact.replace(/^India\s*/i, '').replace(/^\+\d+\s*/, '').trim();
    let countryCode = document.getElementById('v-country-code')?.value.trim() || '+91';
    if (!countryCode.startsWith('+')) {
      const matched = (this.countries || []).find(c => c.name.toLowerCase() === countryCode.toLowerCase());
      countryCode = matched ? matched.code : (countryCode ? '+' + countryCode.replace(/\D/g, '') : '+91');
    }
    if (!countryCode || countryCode === '+' || countryCode.toLowerCase() === 'india') {
      countryCode = '+91';
    }
    const email = document.getElementById('v-email')?.value.trim() || '';
    const gstDocTitle = document.getElementById('v-gst-title')?.value.trim() || 'GST Certificate';
    const panDocTitle = document.getElementById('v-pan-title')?.value.trim() || 'PAN Card';
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
    let gstCertificateFile = '';
    if (gstFileInput?.files?.[0]) {
      gstCertificateFile = gstFileInput.files[0].name;
    } else if (gstFileInput?.dataset?.current && gstFileInput.dataset.removed !== 'true') {
      gstCertificateFile = gstFileInput.dataset.current;
    } else if (gstFileInput?.dataset?.removed !== 'true' && existingVendor?.gstCertificateFile) {
      gstCertificateFile = existingVendor.gstCertificateFile;
    }

    let panCardFile = '';
    if (panFileInput?.files?.[0]) {
      panCardFile = panFileInput.files[0].name;
    } else if (panFileInput?.dataset?.current && panFileInput.dataset.removed !== 'true') {
      panCardFile = panFileInput.dataset.current;
    } else if (panFileInput?.dataset?.removed !== 'true' && existingVendor?.panCardFile) {
      panCardFile = existingVendor.panCardFile;
    }

    // Asynchronously read and persist uploaded PAN and GST documents directly into backend repository
    if (panFileInput?.files?.[0]) {
      const dataUrl = await readFileAsDataUrl(panFileInput.files[0]);
      if (dataUrl && window.CMS_FILE_STORE) {
        await window.CMS_FILE_STORE.saveFile(panFileInput.files[0].name, dataUrl);
      }
    }
    if (gstFileInput?.files?.[0]) {
      const dataUrl = await readFileAsDataUrl(gstFileInput.files[0]);
      if (dataUrl && window.CMS_FILE_STORE) {
        await window.CMS_FILE_STORE.saveFile(gstFileInput.files[0].name, dataUrl);
      }
    }

    if (directSubmit && !panNotApplicable && !panCardFile) {
      window.CMS_APP.toast('Please upload a copy of the PAN Card in Step 2.', 'error');
      this.switchVendorTab(2);
      return;
    }

    if (directSubmit && !gstNotApplicable && !gstCertificateFile) {
      window.CMS_APP.toast('Please upload a copy of the GST Registration Certificate in Step 2.', 'error');
      this.switchVendorTab(2);
      return;
    }

    // Bank Details
    const bankName = document.getElementById('v-bank-name')?.value.trim() || '';
    const accountName = document.getElementById('v-account-name')?.value.trim() || name;
    const accountNo = document.getElementById('v-account-no')?.value.trim() || '';
    const ifscCode = document.getElementById('v-ifsc')?.value.trim().toUpperCase() || '';
    const branchName = document.getElementById('v-branch-name')?.value.trim() || '';
    
    const bankFileInput = document.getElementById('v-bank-file');
    let bankDoc = '';
    if (bankFileInput?.files?.[0]) {
      bankDoc = bankFileInput.files[0].name;
    } else if (bankFileInput?.dataset?.current && bankFileInput.dataset.removed !== 'true') {
      bankDoc = bankFileInput.dataset.current;
    } else if (bankFileInput?.dataset?.removed !== 'true' && existingVendor?.bankDoc) {
      bankDoc = existingVendor.bankDoc;
    }

    // Asynchronously read and persist uploaded Bank document directly into backend repository
    if (bankFileInput?.files?.[0]) {
      const dataUrl = await readFileAsDataUrl(bankFileInput.files[0]);
      if (dataUrl && window.CMS_FILE_STORE) {
        await window.CMS_FILE_STORE.saveFile(bankFileInput.files[0].name, dataUrl);
      }
    }
      
    if (directSubmit && (!bankDoc || !bankDocTitle)) {
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
      let docName = (fileInput?.files?.[0]) ? fileInput.files[0].name : '';
      if (fileInput?.files?.[0]) {
        const dataUrl = await readFileAsDataUrl(fileInput.files[0]);
        if (dataUrl && window.CMS_FILE_STORE) {
          await window.CMS_FILE_STORE.saveFile(fileInput.files[0].name, dataUrl);
        }
      }
      if (!docName && fileInput?.dataset?.current && fileInput.dataset.removed !== 'true') {
        docName = fileInput.dataset.current;
      }
      if (!docName) {
          const span = row.querySelector('span.text-emerald-700');
          if (span && span.innerText.includes('Attached on record: ')) {
              docName = span.innerText.split('Attached on record: ')[1].trim();
          }
      }
      
      if (directSubmit && !docName) {
        window.CMS_APP.toast(`Quotation Copy document (PDF or Image) is mandatory for Quotation "${qno || '1'}".`, 'error');
        this.switchVendorTab(3);
        const dropzone = row.querySelector('.q-dropzone');
        if (dropzone) {
          dropzone.classList.add('border-rose-500', 'bg-rose-50');
          dropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      
      const qDate = row.querySelector('.q-date')?.value || '';
      const qEff = row.querySelector('.q-eff')?.value || '';
      const qValid = row.querySelector('.q-valid')?.value || '';
      
      const today = new Date().toISOString().split('T')[0];
      if (qDate && qDate > today) {
        if (directSubmit) return window.CMS_APP.toast('System does not allow future quotation dates.', 'error');
      }
      if (qEff && qDate && qEff < qDate) {
        if (directSubmit) return window.CMS_APP.toast('Effective date cannot be older than the quotation date.', 'error');
      }
      if (qValid && qEff && qValid < qEff) {
          if (directSubmit) return window.CMS_APP.toast('Valid till/expiry date cannot be older than the effective date.', 'error');
        }
        
        const rateVal = parseFloat(row.querySelector('.q-rate')?.value || 0);
        const mrpVal = parseFloat(row.querySelector('.q-mrp')?.value || 0);
        const mrpNa = row.querySelector('.q-mrp-na')?.checked;
        // MRP vs Rate strict blocking removed; handled by confirm prompt onchange.

      const qSendMail = qValid ? true : (row.querySelector('.q-send-mail-radio:checked')?.value !== 'no');
      quotedItems.push({
        quotationNo: qno,
        quotationDate: qDate,
        effectiveFrom: qEff,
        validTill: qValid,
          alertDate: row.querySelector('.q-alert')?.value || '',
        alertDays: Math.max(parseInt(row.querySelector('.q-alert-days')?.value, 10) || minAlertPolicy, minAlertPolicy),
          alertFreq: row.querySelector('.q-freq') ? row.querySelector('.q-freq').value : 'Daily',
        sendEmailNotification: Boolean(qValid),
        materialId: row.querySelector('.q-mat-id')?.value || '',
        materialName: matName,
        rate: row.querySelector('.q-rate')?.value || 0,
        mrp: row.querySelector('.q-mrp')?.value || 0,
        mrpNotApplicable: row.querySelector('.q-mrp-na')?.checked || false,
        unit: row.querySelector('.q-unit')?.value || 'Nos',
        hsn: row.querySelector('.q-hsn')?.value || '',
        doc: docName,
        docTitle: row.querySelector('.q-title') ? row.querySelector('.q-title').value : ''
      });

    }
    
    if (directSubmit && quotedItems.length === 0) {
      window.CMS_APP.toast('At least one commercial quotation with rate and uploaded quotation copy document is required.', 'error');
      this.switchVendorTab(3);
      return;
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
    const approvalAlertDays = approvedForLimitedPeriod ? Math.max(parseInt(document.getElementById('v-approval-alert-days')?.value, 10) || minAlertPolicy, minAlertPolicy) : minAlertPolicy;
    const approvalAlertDate = approvedForLimitedPeriod ? (document.getElementById('v-approval-alert-date')?.value || CMS_MASTERS.calculateAlertDate(approvalValidTill, approvalAlertDays)) : '';
    const approvalSendEmailNotification = approvedForLimitedPeriod ? Boolean(approvalValidTill) : false;
    const isBlocked = document.getElementById('v-blocked')?.checked || false;
    const blockReason = isBlocked ? (document.getElementById('v-block-reason')?.value.trim() || 'Blocked by administrator') : '';

    // ==========================================
    // RIGOROUS MARGIN & LIMIT STATUTORY VALIDATION
    // ==========================================
    
      const todayDateStr = new Date().toISOString().split('T')[0];
      for (const q of quotedItems) {
        if (q.quotationDate && q.quotationDate > todayDateStr) {
          if (directSubmit) return window.CMS_APP.toast('Quotation Date cannot be a future date.', 'error');
        }
        if (q.effectiveFrom && q.quotationDate && q.effectiveFrom < q.quotationDate) {
          if (directSubmit) return window.CMS_APP.toast('Effective Date cannot be older than Quotation Date.', 'error');
        }
        const compareBase = q.effectiveFrom || q.quotationDate;
        if (q.quotationValidTill && compareBase && q.quotationValidTill < compareBase) {
          if (directSubmit) return window.CMS_APP.toast('Valid Till / Expiry Date cannot be older than the ' + (q.effectiveFrom ? 'Effective' : 'Quotation') + ' Date.', 'error');
        }
      }
if (directSubmit && !name) return window.CMS_APP.toast('Vendor / Supplier Company Name is required.', 'error');
    if (directSubmit && !address) return window.CMS_APP.toast('Street / Building address is mandatory.', 'error');
    if (directSubmit && !addressDistrict) return window.CMS_APP.toast('District is required.', 'error');
    if (directSubmit && !addressState) return window.CMS_APP.toast('Please select an Indian State or Union Territory.', 'error');

    // PIN Code: exactly 6 digits
    if (!addressPinCode || !/^[0-9]{6}$/.test(addressPinCode)) {
      if (directSubmit) return window.CMS_APP.toast(`PIN Code must be exactly 6 numeric digits (currently "${addressPinCode}"). Example: 110020.`, 'error');
    }

    // Phone: minimum 10 digits
    const cleanPhone = contactNo.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      if (directSubmit) return window.CMS_APP.toast(`Phone number must contain at least 10 digits (currently ${cleanPhone.length} digits).`, 'error');
    }

    // GSTIN Validation (unless exempt)
    if (!gstNotApplicable) {
      if (!gstNo) {
        if (directSubmit) return window.CMS_APP.toast('GSTIN Number is mandatory. If vendor is unregistered, you must confirm the blue box (GST registration is not applicable).', 'error');
      }
      if (gstNo.length !== 15) {
        if (directSubmit) return window.CMS_APP.toast(`GSTIN must be exactly 15 characters (currently ${gstNo.length} characters). Example: 07AABCA1234F1Z5.`, 'error');
      }
      if (!/^[0-9A-Z]{15}$/.test(gstNo)) {
        if (directSubmit) return window.CMS_APP.toast('GSTIN must be 15 alphanumeric characters without spaces or symbols.', 'error');
      }
      // Check duplicate GSTIN across other vendors
      const duplicateGst = store.data.vendors.find(v => v.id !== vendorId && v.gstNo && v.gstNo.toUpperCase() === gstNo);
      if (duplicateGst) {
        if (directSubmit) return window.CMS_APP.toast(`Duplicate GSTIN! "${duplicateGst.name}" (${duplicateGst.id}) is already registered with GSTIN ${gstNo}.`, 'error');
      }
    }

    // PAN Validation (unless exempt)
    if (!panNotApplicable) {
      if (!panNo) {
        if (directSubmit) return window.CMS_APP.toast('PAN Card Number is mandatory. If vendor has no PAN, confirm the PAN exemption blue box.', 'error');
      }
      if (panNo.length !== 10) {
        if (directSubmit) return window.CMS_APP.toast(`PAN Number must be exactly 10 characters (currently ${panNo.length} characters). Example: AABCA1234F.`, 'error');
      }
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNo)) {
        if (directSubmit) return window.CMS_APP.toast('PAN format must be 5 letters, 4 digits, and 1 letter (e.g. AABCA1234F).', 'error');
      }
    }

    // Bank Validation
    if (directSubmit && !bankName) return window.CMS_APP.toast('Bank Name is mandatory.', 'error');
    if (/[^a-zA-Z\s.\-&]/.test(accountName)) {
        if (directSubmit) return window.CMS_APP.toast('Bank Account Name cannot contain numbers or special symbols.', 'error');
      }
      if (!accountNo || accountNo.length < 5 || accountNo.length > 22) {
      if (directSubmit) return window.CMS_APP.toast(`Bank Account Number must be between 5 and 22 digits (currently ${accountNo.length} digits).`, 'error');
    }
    if (!ifscCode || ifscCode.length !== 11) {
      if (directSubmit) return window.CMS_APP.toast(`Bank IFSC Code must be exactly 11 characters (e.g. HDFC0001234). Currently: "${ifscCode}" (${ifscCode.length} chars).`, 'error');
    }

    // Limited period approval validation
    if (approvedForLimitedPeriod) {
      if (!approvalValidTill) {
        if (directSubmit) return window.CMS_APP.toast('Approval Expiry Date is mandatory when limited period approval is selected.', 'error');
      }
      if (approvalValidTill < today) {
        if (directSubmit) return window.CMS_APP.toast('Approval Expiry Date cannot be a past date.', 'error');
      }
    }

    // Quotation validation
    if (quotationValidTill && quotationValidTill < today) {
      if (directSubmit) return window.CMS_APP.toast('Quotation Validity Date cannot be a past date.', 'error');
    }

    // Extract dynamic certificates (optional)
    const certRows = document.querySelectorAll('#v-cert-container .cert-row');
    const certificates = [];
    for (const row of certRows) {
      let reg = row.querySelector('.cert-regulator-select')?.value || '';
      if (reg === 'Other') {
        const otherVal = row.querySelector('.cert-regulator-other-input')?.value.trim();
        if (otherVal) reg = otherVal;
        else if (directSubmit) return window.CMS_APP.toast('Please specify the agency name for "Other".', 'error');
      }
      const formNo = row.querySelector('.cert-form-input')?.value.trim() || '';
      const certNo = row.querySelector('.cert-number-input')?.value.trim() || '';
      const hasVal = row.querySelector('input[type="radio"]:checked')?.value === 'yes';
      const expiry = hasVal ? (row.querySelector('.cert-expiry-input')?.value || '') : '';
            const docName = row.querySelector('.cert-title-input')?.value.trim() || '';
      const alertDays = Math.max(parseInt(row.querySelector('.cert-alert-days')?.value, 10) || minAlertPolicy, minAlertPolicy);
      const alertDate = row.querySelector('.cert-alert-input')?.value || (expiry ? CMS_MASTERS.calculateAlertDate(expiry, alertDays) : '');
      const fileInput = row.querySelector('.cert-file-input');
      let fileName = (fileInput?.files?.[0]) ? fileInput.files[0].name : (fileInput?.dataset.current || '');
      if (fileInput?.files?.[0]) {
        const dataUrl = await readFileAsDataUrl(fileInput.files[0]);
        if (dataUrl && window.CMS_FILE_STORE) {
          await window.CMS_FILE_STORE.saveFile(fileInput.files[0].name, dataUrl);
        }
      }

      // Skip blank rows if user didn't enter agency or number
      if (!reg && !certNo) continue;

      if (directSubmit && !reg) return window.CMS_APP.toast('Please select a Regulatory / Certification Agency for the added certificate row.', 'error');
      if (directSubmit && !certNo) return window.CMS_APP.toast(`License / Certificate Number is mandatory for ${reg}.`, 'error');
      if (directSubmit && hasVal && !expiry) return window.CMS_APP.toast(`Expiry date is mandatory for ${reg} (${certNo}).`, 'error');
      if (directSubmit && hasVal && expiry < today) return window.CMS_APP.toast(`Expiry date for ${reg} cannot be in the past.`, 'error');
      
      if (directSubmit && !fileName) return window.CMS_APP.toast(`Please upload the document file for ${reg} (${certNo}).`, 'error');

      if (!fileName) {
        fileName = `${reg.replace(/\s+/g, '_')}_${certNo || 'Certificate'}.pdf`;
      }

      const certSendMail = (hasVal && expiry) ? true : (row.querySelector('.cert-send-mail-radio:checked')?.value !== 'no');
      certificates.push({
        regulator: reg,
        name: reg,
        formNo,
        certificateNo: certNo,
        hasValidity: hasVal,
        validTill: expiry,
        alertDays,
        alertDate,
        sendEmailNotification: Boolean(hasVal && expiry),
        documentName: docName,
        docTitle: docName,
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
          approvedForLimitedPeriod, approvalValidTill, approvalAlertDays, approvalAlertDate, approvalSendEmailNotification, limAlertFreq,
          isBlocked, blockReason, quotedItems,
          certificates,
          certificateFile: (certificates[0] && (certificates[0].fileName || certificates[0].filename)) || store.data.vendors[idx].certificateFile || '',
          status: directSubmit ? 'Pending Approval' : (store.data.vendors[idx].status || 'Draft'),
          updatedAt: new Date().toISOString(),
          // Clear previous rejection remarks upon resubmission
          checkerMistakeRemark: directSubmit ? '' : store.data.vendors[idx].checkerMistakeRemark
        };
      }
    } else {
      // Sequence-based unique Vendor ID or use passed vendorId (e.g. from draft auto-save)
      let newId = vendorId;
      if (!newId) {
        const existingIds = new Set(store.data.vendors.map(v => v.id));
        let nextNum = Math.floor(Date.now() / 1000);
        newId = 'VEN-' + String(nextNum).padStart(3, '0');
        while (existingIds.has(newId)) {
          nextNum++;
          newId = 'VEN-' + String(nextNum).padStart(3, '0');
        }
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
        gstDocTitle, panDocTitle, bankDocTitle, limAlertDays, limAlertFreq,
        quotationNo, quotationDate, quotationValidTill, quotationDoc,
        quotedMaterialId, quotedMaterialName, quotedMaterialRate, quotedMaterialUnit, quotedMaterialHsn,
        approvedForLimitedPeriod, approvalValidTill, approvalAlertDays, approvalAlertDate, approvalSendEmailNotification,
        isBlocked, blockReason, quotedItems,
        certificates,
        certificateFile: (certificates[0] && (certificates[0].fileName || certificates[0].filename)) || '',
        status: directSubmit ? 'Pending Approval' : 'Draft',
        createdAt: new Date().toISOString(),
        createdBy: currentUser ? currentUser.id : 'system',
        createdByName: currentUser ? currentUser.name : 'Store Staff'
      });

      const btn = document.getElementById('v-submit-btn');
      if (btn) btn.setAttribute('onclick', `CMS_MASTERS.saveVendor('${newId}', true)`);
      if (form) form.setAttribute('onsubmit', `event.preventDefault(); CMS_MASTERS.saveVendor('${newId}', true);`);
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
              quotationNo: q.quotationNo,

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

      
    // Harvest all documents associated with this vendor into cloud store before saving
    const allVendorFiles = [
      panCardFile,
      gstCertificateFile,
      bankDoc,
      ...certificates.map(c => c.fileName),
      ...quotedItems.map(q => q.doc)
    ].filter(Boolean);

    for (const f of allVendorFiles) {
      if (!store.data.files) store.data.files = {};
      if (!store.data.files[f]) {
        let cached = null;
        if (window.CMS_FILE_STORE) {
          cached = await window.CMS_FILE_STORE.getFile(f);
        }
        if (!cached) {
          cached = localStorage.getItem('CMS_FILE_' + f);
        }
        if (cached) {
          store.data.files[f] = cached;
        }
      }
    }

    if (directSubmit) {
      store.save(); // full UI update
      window.CMS_APP.closeModal();
      window.CMS_APP.toast('Vendor credentials and statutory certificates submitted for Admin approval!', 'success');
      window.CMS_APP.refreshView();
    } else if (isManualDraft) {
      store.save();
      window.CMS_APP.closeModal();
      window.CMS_APP.toast('Vendor draft saved to workspace successfully!', 'success');
      window.CMS_APP.refreshView();
    } else {
      // Quiet background save for drafts: update localStorage directly without triggering global UI rebuilds
      const storageKey = window.CMS_TENANT_ID ? 'CMS_DATA_' + window.CMS_TENANT_ID : 'CMS_DATA';
      localStorage.setItem(storageKey, JSON.stringify(store.data));
      if (window.CMS_TENANT_ID && window.CMS_SUPABASE) {
          window.CMS_SUPABASE.from('master_tenants').update({ cms_db: store.data }).eq('id', window.CMS_TENANT_ID).then(() => {});
      }
    }
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
      onConfirm: `() => CMS_MASTERS.approveVendor('${vendorId}')`,
      onDelete: `() => CMS_MASTERS.deleteVendor('${vendorId}')`
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

  deleteVendor(vendorId) {
    const store = window.CMS_STORE;
    const v = store.data.vendors.find(i => i.id === vendorId);
    if (!v) return;
    if (v.status === 'Approved') {
      window.CMS_APP.toast('Master deletion is disabled for approved vendors.', 'error');
      return;
    }
    const name = v.name || v.id;
    if (confirm(`Delete draft vendor "${name}"? This action cannot be undone.`)) {
      const idx = store.data.vendors.findIndex(i => i.id === vendorId);
      if (idx !== -1) {
        store.data.vendors.splice(idx, 1);
        store.save();
        window.CMS_APP.toast(`Draft vendor "${name}" deleted successfully.`, 'success');
        window.CMS_APP.refreshView();
      }
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
          </div>
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
          ${(role === 'Maker' || role === 'User' || role === 'Admin') ? `
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
                    ${(role === 'Maker' || role === 'User' || role === 'Admin') ? `
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
      if (directSubmit) return window.CMS_APP.toast('Col. Anita Sharma (Admin) is authorized for review and approval only. Adding or modifying categories must be initiated by User.', 'warning');
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
      if (directSubmit) return window.CMS_APP.toast('Col. Anita Sharma (Admin) is authorized for review and approval only. Adding or modifying categories must be initiated by User.', 'warning');
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
          ${(role === 'Maker' || role === 'User' || role === 'Admin') ? `
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
                        <div class="text-blue-600 font-medium">Quote: <span class="font-mono font-bold text-blue-600">?${Number(m.quotationRate || m.vendor1Rate || 0).toFixed(2)}</span></div>
                        <div class="text-[10px] text-slate-500 font-mono">Ref: ${m.quotationNo || 'Direct'} (${m.quotationDate || '-'})</div>
                        <div class="text-[11px] text-slate-800 font-semibold mt-0.5">MRP: <span class="font-mono text-blue-600">?${Number(m.mrpBooked || 0).toFixed(2)}</span></div>
                      </td>
                      <td class="p-4">
                        <span class="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[11px] rounded-sm">${m.categoryName || 'General'}</span>
                        <div class="text-slate-500 mt-1">Unit: <span class="font-bold text-slate-800 font-mono">${m.unit}</span></div>
                      </td>
                      <td class="p-4">
                        <div class="font-mono text-xs"><strong class="text-blue-600">?${Number(m.vendor1Rate || 0).toFixed(2)}</strong></div>
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
                        <button onclick="CMS_MASTERS.viewMaterial360('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-sm transition" title="Inspect 360� Material Details">
                          <i data-lucide="scan" class="w-3.5 h-3.5"></i>
                        </button>
                        ${(role === 'Maker' || role === 'User' || role === 'Admin') ? `
      <button onclick="CMS_MASTERS.openConsumableModal('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-sm transition" title="Modify Item Master">
        <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
      </button>
    ` : ''}
                        ${m.status === 'Pending Approval' && role === 'Admin' ? `
      <button onclick="CMS_MASTERS.openConsumableSanctionModal('${m.id}')" class="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-sm transition shadow-sm" title="Sanction Material">
        Approve
      </button>
      <button onclick="CMS_MASTERS.openConsumableRejectModal('${m.id}')" class="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded-sm transition" title="Reject / Request Revision">
        Reject
      </button>
    ` : (m.status === 'Revision Required' || m.status === 'Rejected') && role === 'Admin' ? `
      <span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-sm" title="${m.checkerMistakeRemark ? `Reported Mistake: ${m.checkerMistakeRemark}` : 'Admin Rejected'}">
        <i data-lucide="x-circle" class="w-3.5 h-3.5 text-rose-600"></i>
        <span>Admin Rejected</span>
      </span>
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
              <strong class="font-mono text-emerald-700 text-sm">?${Number(m.quotationRate || m.vendor1Rate || 0).toFixed(2)}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Booked MRP:</span>
              <strong class="font-mono text-blue-600 text-sm">?${Number(m.mrpBooked || 0).toFixed(2)}</strong>
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
              ...(m.vendor1Id ? [{ vendorId: m.vendor1Id, vendorName: m.vendor1Name, rate: m.vendor1Rate, quotationNo: m.quotationNo, effectiveFrom: m.vendor1RateEffectiveFrom, isPrimary: true }] : []),
              ...(m.vendor2Id ? [{ vendorId: m.vendor2Id, vendorName: m.vendor2Name, rate: m.vendor2Rate, quotationNo: '', effectiveFrom: m.vendor2RateEffectiveFrom, isPrimary: false }] : [])
            ]).map((v, i) => `
              <div class="p-3.5 border-2 ${v.isPrimary ? 'border-blue-300 bg-slate-50/50' : 'border-slate-200 bg-slate-50'} rounded-sm space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs uppercase flex items-center gap-1 ${v.isPrimary ? 'text-blue-600' : 'text-slate-700'}">
                    <i data-lucide="${v.isPrimary ? 'award' : 'building'}" class="w-3.5 h-3.5 ${v.isPrimary ? 'text-blue-600' : 'text-slate-500'}"></i>
                    ${v.isPrimary ? 'Vendor-1 (Primary Source)' : `Vendor-${i + 1} (Alternate Source)`}
                  </span>
                  <span class="font-mono font-bold text-blue-600 text-sm">?${Number(v.rate || 0).toFixed(2)}</span>
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

    window.CMS_APP.openModal('Material 360� Inspection Drawer', content, 'max-w-2xl');
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
      if (directSubmit) return window.CMS_APP.toast('Col. Anita Sharma (Admin) is authorized for review and approval only. Adding or modifying materials must be initiated by User.', 'warning');
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
                    ${g.name} � ${window.CMS_STORE.getTaxLabel(g)} (${g.taxMode === 'IGST' ? 'Inter-state IGST' : 'Intra-state CGST+SGST'})
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
              <label class="block font-semibold text-slate-700 mb-1">Booked MRP (?) <span class="text-rose-500">*</span></label>
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
          <button type="button" onclick="CMS_MASTERS.saveConsumable('${matId || ''}', false)" class="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-sm transition flex items-center gap-1.5 text-xs">
            <i data-lucide="save" class="w-4 h-4"></i>
            <span>Save Draft</span>
          </button>
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
      if (directSubmit) return window.CMS_APP.toast('Col. Anita Sharma (Admin) is authorized for review and approval only. Adding or modifying materials must be initiated by User.', 'warning');
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

    const consumerConfirmed = document.getElementById('m-conf')?.checked || false;
    const confirmedBy = document.getElementById('m-conf-by')?.value.trim() || '';
    const confirmationDate = document.getElementById('m-conf-date')?.value || '';
    const confirmationRemarks = document.getElementById('m-conf-remarks')?.value.trim() || '';

    const avgMonthlyConsumption = parseFloat(document.getElementById('m-monthly')?.value) || 0;
    const initStockEl = document.getElementById('m-init-stock');
    const initialStock = initStockEl ? (parseFloat(initStockEl.value) || 0) : 0;

    if (!materialName || !unit) {
      alert('Please fill all required fields');
      return;
    }

    const isEdit = Boolean(matId && store.data.consumables.some(m => m.id === matId));
    if (isEdit) {
      const idx = store.data.consumables.findIndex(m => m.id === matId);
      if (idx !== -1) {
        store.data.consumables[idx] = {
          ...store.data.consumables[idx],
          inventoryType,
          categoryId: catId,
          categoryName: category ? category.name : store.data.consumables[idx].categoryName,
          materialName, unit, brand, supplierProductCode, hsnCode,
          gstSlabId, taxMode, sgst, cgst, igst,
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
          status: directSubmit ? 'Pending Approval' : (store.data.consumables[idx].status || 'Draft'),
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      const prefix = inventoryType === 'Fixed' ? 'MAT-FIX-' : 'MAT-';
      const newId = matId || (prefix + String(Date.now()).slice(-6));
      store.data.consumables.push({
        id: newId,
        inventoryType,
        categoryId: catId,
        categoryName: category ? category.name : 'General',
        materialName, unit, brand, supplierProductCode, hsnCode,
        gstSlabId, taxMode, sgst, cgst, igst,
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
          <div>Approved Rate: <strong class="font-mono text-emerald-700 font-bold">?${Number(m.vendor1Rate || 0).toFixed(2)}</strong></div>
        </div>
      </div>
    `;

    window.CMS_APP.promptSanctionApproval({
      title: m.materialName,
      id: m.id,
      entityType: 'consumable',
      summaryHtml,
      documents: docs,
      onConfirm: `() => CMS_MASTERS.approveConsumable('${matId}')`,
      onDelete: `() => CMS_MASTERS.deleteConsumable('${matId}')`
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

  deleteConsumable(matId) {
    const store = window.CMS_STORE;
    const item = store.data.consumables.find(m => m.id === matId);
    if (!item) return;
    if (['Draft', 'Pending Approval', 'Pending', 'Revision Required'].includes(item.status)) {
      if (confirm('Delete this draft material/quotation? This action cannot be undone.')) {
        const idx = store.data.consumables.findIndex(m => m.id === matId);
        if (idx !== -1) {
          store.data.consumables.splice(idx, 1);
          store.save();
          window.CMS_APP.toast('Draft material deleted successfully.', 'success');
          window.CMS_APP.refreshView();
        }
      }
    } else {
      window.CMS_APP.toast("Master deletion is disabled for statutory audit integrity.", "error");
    }
  },

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





































