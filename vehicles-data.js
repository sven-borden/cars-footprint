// Vehicle data organized by brand
const vehiclesByBrand = {
    'Audi': [
        { id: 'audi-a3', name: 'Audi A3', length: 4343, width: 1816, color: '#e74c3c' },
        { id: 'audi-a4', name: 'Audi A4', length: 4762, width: 1847, color: '#c0392b' },
        { id: 'audi-q5', name: 'Audi Q5', length: 4663, width: 1893, color: '#e67e22' }
    ],
    'BMW': [
        { id: 'bmw-3series', name: 'BMW 3 Series', length: 4709, width: 1827, color: '#3498db' },
        { id: 'bmw-x3', name: 'BMW X3', length: 4708, width: 1891, color: '#2980b9' }
    ],
    'Citroen': [
        { id: 'citroen-c8', name: 'Citroen C8', length: 4727, width: 1854, color: '#34495e' }
    ],
    'Fiat': [
        { id: 'fiat-500', name: 'Fiat 500', length: 3632, width: 1627, color: '#1abc9c' }
    ],
    'Hyundai': [
        { id: 'ioniq5', name: 'Hyundai Ioniq 5', length: 4655, width: 1890, color: '#16a085' }
    ],
    'Kia': [
        { id: 'kia-ev6', name: 'Kia EV6 2025', length: 4695, width: 1890, color: '#27ae60' }
    ],
    'Mercedes-Benz': [
        { id: 'mercedes-cclass', name: 'Mercedes-Benz C-Class', length: 4751, width: 1820, color: '#9b59b6' },
        { id: 'mercedes-eclass', name: 'Mercedes-Benz E-Class', length: 4923, width: 1852, color: '#8e44ad' }
    ],
    'Nissan': [
        { id: 'nissan-ariya', name: 'Nissan Ariya', length: 4595, width: 1850, color: '#95a5a6' }
    ],
    'Peugeot': [
        { id: 'peugeot-308', name: 'Peugeot 308', length: 4367, width: 1805, color: '#d35400' },
        { id: 'peugeot-3008', name: 'Peugeot 3008', length: 4447, width: 1826, color: '#e67e22' },
        { id: 'peugeot-4007', name: 'Peugeot 4007', length: 4635, width: 1805, color: '#ca6f1e' }
    ],
    'Polestar': [
        { id: 'polestar-2', name: 'Polestar 2', length: 4606, width: 1859, color: '#7f8c8d' }
    ],
    'Porsche': [
        { id: 'porsche-cayenne-s-hybrid-2017', name: 'Porsche Cayenne S Hybrid 2017', length: 4855, width: 1939, color: '#f39c12' }
    ],
    'Renault': [
        { id: 'renault-megane', name: 'Renault Megane E-Tech', length: 4200, width: 1768, color: '#f1c40f' }
    ],
    'Skoda': [
        { id: 'skoda-citigo', name: 'Skoda Citigo', length: 3597, width: 1645, color: '#2ecc71' },
        { id: 'skoda-octavia', name: 'Skoda Octavia', length: 4689, width: 1829, color: '#27ae60' }
    ],
    'Tesla': [
        { id: 'tesla-model3', name: 'Tesla Model 3 2024', length: 4720, width: 1850, color: '#e74c3c' },
        { id: 'tesla-modely', name: 'Tesla Model Y Juniper', length: 4790, width: 1920, color: '#c0392b' },
        { id: 'tesla-models', name: 'Tesla Model S 2024', length: 4978, width: 1964, color: '#e67e22' },
        { id: 'tesla-modelx', name: 'Tesla Model X', length: 5036, width: 1999, color: '#d35400' }
    ],
    'Toyota': [
        { id: 'toyota-yaris', name: 'Toyota Yaris', length: 3940, width: 1745, color: '#3498db' },
        { id: 'toyota-corolla', name: 'Toyota Corolla', length: 4370, width: 1790, color: '#2980b9' },
        { id: 'toyota-rav4', name: 'Toyota RAV4', length: 4600, width: 1855, color: '#1abc9c' }
    ],
    'Volkswagen': [
        { id: 'vw-golf', name: 'Volkswagen Golf', length: 4284, width: 1789, color: '#9b59b6' },
        { id: 'vw-passat', name: 'Volkswagen Passat', length: 4773, width: 1832, color: '#8e44ad' },
        { id: 'vw-tiguan', name: 'Volkswagen Tiguan', length: 4509, width: 1839, color: '#95a5a6' },
        { id: 'vw-id4', name: 'Volkswagen ID.4', length: 4584, width: 1852, color: '#7f8c8d' }
    ],
    'Xpeng': [
        { id: 'xpeng-p7plus', name: 'Xpeng P7+ 2026', length: 5071, width: 1937, color: '#17a2b8' },
        { id: 'xpeng-g6', name: 'Xpeng G6', length: 4753, width: 1920, color: '#6f42c1' }
    ]
};

// Flatten the data for backward compatibility
const vehiclesData = Object.values(vehiclesByBrand).flat();
