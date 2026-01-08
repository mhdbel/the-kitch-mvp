'use client';

const deliveryZones = [
  { name: 'Hassan / Agdal', eta: '30 min', fee: 'Gratuit', highlight: true },
  { name: 'Hay Riad', eta: '35 min', fee: '15 DH', highlight: false },
  { name: 'Salé Centre', eta: '40 min', fee: '20 DH', highlight: false },
  { name: 'Témara', eta: '50 min', fee: '25 DH', highlight: false }
];

const businessPackages = [
  { name: 'Formule Executive', price: 145, note: 'Réunions importantes' },
  { name: 'Formule Team', price: 120, note: 'Déjeuners d’équipe' },
  { name: 'Formule Traiteur', price: 450, note: 'Événements d’entreprise' }
];

export default function RabatFeatures() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Zones Rabat & Livraison</h2>
        <p className="text-gray-600">Gérez les zones de livraison et les temps estimés pour Rabat et alentours.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Zones actives</h3>
          {deliveryZones.map((zone) => (
            <div
              key={zone.name}
              className={`p-4 rounded-xl border ${zone.highlight ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{zone.name}</p>
                  <p className="text-sm text-gray-500">ETA {zone.eta}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">{zone.fee}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Offres Business Rabat</h3>
          {businessPackages.map((pack) => (
            <div key={pack.name} className="p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{pack.name}</p>
                  <p className="text-sm text-gray-500">{pack.note}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">{pack.price} DH</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
