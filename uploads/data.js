// 6.mock_data.js
//
// Single source of truth de todos los datos mock del prototipo.
// Modelo de 4 tablas relacionales (ver 1.prd.md §2):
//   - opticas_google      (PK: place_id) — 40 registros
//   - opticas_cpv         (PK: CODIGO, FK: place_id_fk) — 18 registros
//   - opticas_app_data    (FK: place_id, 1:1) — alineado con opticas_google
//   - opticas_overrides   (append-only log) — 8 overrides activos
// + auxiliares: cadenas, usuarios, logs_actividad, syncs_historial, cambios_historicos
//
// Expuesto como objeto global `mockData` (evita problemas de fetch sobre file://).
// En la reescritura React, importar como módulo ES.

window.mockData = (function () {

  // ─────────────────────────────────────────────────────────────────
  // CADENAS (25)
  // ─────────────────────────────────────────────────────────────────
  const cadenas = [
    { id: 1,  nombre: 'Visionlab',            keywords: ['visionlab'],                 dominios: ['visionlab.es'],         pais: 'ES' },
    { id: 2,  nombre: 'Multiópticas',         keywords: ['multiopticas'],              dominios: ['multiopticas.com'],     pais: 'ES' },
    { id: 3,  nombre: 'Alain Afflelou',       keywords: ['afflelou'],                  dominios: ['afflelou.es'],          pais: 'ES' },
    { id: 4,  nombre: 'General Óptica',       keywords: ['general optica'],            dominios: ['generaloptica.es'],     pais: 'ES' },
    { id: 5,  nombre: 'Soloptical',           keywords: ['soloptical'],                dominios: ['soloptical.com'],       pais: 'ES' },
    { id: 6,  nombre: '+Visión',              keywords: ['masvision', '+vision'],      dominios: ['masvision.es'],         pais: 'ES' },
    { id: 7,  nombre: 'Federópticos',         keywords: ['federopticos'],              dominios: ['federopticos.com'],     pais: 'ES' },
    { id: 8,  nombre: 'Cottet',               keywords: ['cottet'],                    dominios: ['cottet.com'],           pais: 'ES' },
    { id: 9,  nombre: 'Opticalia',            keywords: ['opticalia'],                 dominios: ['opticalia.com'],        pais: 'ES' },
    { id: 10, nombre: 'Specsavers',           keywords: ['specsavers'],                dominios: ['specsavers.es'],        pais: 'ES' },
    { id: 11, nombre: 'GrandVision',          keywords: ['grandvision'],               dominios: ['grandvision.es'],       pais: 'ES' },
    { id: 12, nombre: 'Óptica 2000',          keywords: ['optica 2000'],               dominios: ['optica2000.com'],       pais: 'ES' },
    { id: 13, nombre: 'Natural Optics',       keywords: ['natural optics'],            dominios: ['naturaloptics.com'],    pais: 'ES' },
    { id: 14, nombre: 'Óptica Universitaria', keywords: ['optica universitaria'],      dominios: ['opticauniversitaria.es'], pais: 'ES' },
    { id: 15, nombre: 'Optimil',              keywords: ['optimil'],                   dominios: ['optimil.com'],          pais: 'ES' },
    { id: 16, nombre: 'Mister Spex',          keywords: ['mister spex'],               dominios: ['misterspex.es'],        pais: 'ES' },
    { id: 17, nombre: 'MultiOpticas PT',      keywords: ['multiopticas portugal'],     dominios: ['multiopticas.pt'],      pais: 'PT' },
    { id: 18, nombre: 'Óticas Lince',         keywords: ['oticas lince'],              dominios: ['lince.pt'],             pais: 'PT' },
    { id: 19, nombre: 'Wells Óptica',         keywords: ['wells'],                     dominios: ['wells.pt'],             pais: 'PT' },
    { id: 20, nombre: 'Instituto Óptico',     keywords: ['instituto optico'],          dominios: ['institutooptico.pt'],   pais: 'PT' },
    { id: 21, nombre: 'Óticas Visão',         keywords: ['oticas visao'],              dominios: ['oticasvisao.pt'],       pais: 'PT' },
    { id: 22, nombre: 'Optivisão',            keywords: ['optivisao'],                 dominios: ['optivisao.pt'],         pais: 'PT' },
    { id: 23, nombre: 'José de Mello',        keywords: ['jose de mello'],             dominios: ['jdmsaude.pt'],          pais: 'PT' },
    { id: 24, nombre: 'Óculos Centro',        keywords: ['oculos centro'],             dominios: [],                       pais: 'PT' },
    { id: 25, nombre: 'Óticas SA',            keywords: ['oticas sa'],                 dominios: [],                       pais: 'PT' },
  ];

  // Helper para no repetir campos constantes
  const G = (id, name, lat, lng, city, state, postal, addr, rating, reviews, phone, website, verified, cat, owner, photos) => ({
    place_id: `ChIJ_${id}`,
    google_id: `0x${id}`,
    cid: `${id}_cid`,
    name,
    name_for_emails: name,
    phone,
    website,
    business_status: 'OPERATIONAL',
    verified,
    description: null,
    about: null,
    address: `${addr}, ${postal} ${city}, ${state === 'PT' ? 'Portugal' : 'España'}`,
    street: addr,
    city, state, postal_code: postal,
    country: state === 'PT' ? 'Portugal' : 'España',
    country_code: state === 'PT' ? 'PT' : 'ES',
    latitude: lat, longitude: lng,
    located_in: null,
    category: cat || 'Optician',
    subtypes: ['Optician'],
    query: `optica ${city.toLowerCase()}`,
    rating, reviews,
    reviews_per_score_1: Math.floor(reviews * 0.05),
    reviews_per_score_5: Math.floor(reviews * 0.7),
    reviews_link: '#',
    photos_count: photos || Math.floor(reviews / 5),
    working_hours_csv_compatible: 'Lun-Vie: 10:00-14:00, 17:00-20:30; Sáb: 10:00-14:00',
    booking_appointment_link: null,
    owner_title: owner,
    location_link: '#',
  });

  // ─────────────────────────────────────────────────────────────────
  // OPTICAS_GOOGLE (40 registros, mix por provincia)
  // ─────────────────────────────────────────────────────────────────
  const opticas_google = [
    // Madrid (10)
    G('madrid_001', 'Óptica San Carlos',      40.4154, -3.7090, 'Madrid', 'Madrid', '28013', 'C/ Mayor 23',           4.8, 324, '+34 91 555 1234', 'https://opticasancarlos.es',     true,  'Optician', 'Carlos Martínez', 47),
    G('madrid_002', 'Visionlab Gran Vía',     40.4200, -3.7048, 'Madrid', 'Madrid', '28013', 'Gran Vía 32',           4.2, 187, '+34 91 222 8800', 'https://www.visionlab.es/gran-via', true,  'Optician', null, 23),
    G('madrid_003', 'General Óptica Castellana', 40.4441, -3.6907, 'Madrid', 'Madrid', '28046', 'Paseo de la Castellana 89', 4.5, 412, '+34 91 411 2233', 'https://www.generaloptica.es/castellana', true, 'Optician', null, 31),
    G('madrid_004', 'Óptica Bermejo',         40.4324, -3.7008, 'Madrid', 'Madrid', '28010', 'C/ Fuencarral 121',     4.9, 156, '+34 91 446 5566', 'https://opticabermejo.com',      true,  'Optician', 'María Bermejo', 89),
    G('madrid_005', 'Alain Afflelou Serrano', 40.4279, -3.6889, 'Madrid', 'Madrid', '28001', 'C/ Serrano 47',         4.1, 89,  '+34 91 575 9988', 'https://www.afflelou.es/serrano', true,  'Optician', null, 14),
    G('madrid_006', 'Multiópticas Atocha',    40.4119, -3.6979, 'Madrid', 'Madrid', '28012', 'C/ Atocha 89',          3.8, 67,  '+34 91 530 1122', 'https://www.multiopticas.com/atocha', false, 'Optician', null, 8),
    G('madrid_007', 'Óptica Vista Norte',     40.4546, -3.7034, 'Madrid', 'Madrid', '28020', 'C/ Bravo Murillo 234',  4.6, 78,  '+34 91 388 7766', null,                              true,  'Optician', 'Antonio Ruiz', 12),
    G('madrid_008', '+Visión Princesa',       40.4302, -3.7117, 'Madrid', 'Madrid', '28008', 'C/ Princesa 45',        4.0, 134, '+34 91 540 3344', 'https://www.masvision.es/princesa', true, 'Optician', null, 18),
    G('madrid_009', 'Óptica Vega',            40.4264, -3.6797, 'Madrid', 'Madrid', '28009', 'C/ Goya 78',            4.7, 203, '+34 91 575 1122', 'https://opticavega.es',          true,  'Optician', 'Pedro Vega', 35),
    G('madrid_010', 'Cottet Salamanca',       40.4259, -3.6857, 'Madrid', 'Madrid', '28001', 'C/ Velázquez 35',       4.3, 92,  '+34 91 435 2244', 'https://www.cottet.com/salamanca', true, 'Optician', null, 21),

    // Barcelona (8)
    G('bcn_001', 'Visionlab Diagonal',           41.3909, 2.1494, 'Barcelona', 'Barcelona', '08036', 'Av. Diagonal 477',          4.3, 245, '+34 93 444 5566', 'https://www.visionlab.es/diagonal-bcn', true, 'Optician', null, 27),
    G('bcn_002', 'Óptica Universitaria PG',      41.3936, 2.1622, 'Barcelona', 'Barcelona', '08008', 'Passeig de Gràcia 71',      4.6, 511, '+34 93 215 8877', 'https://www.opticauniversitaria.es/paseo-gracia', true, 'Optician', null, 64),
    G('bcn_003', 'Òptica Gràcia',                41.4030, 2.1554, 'Barcelona', 'Barcelona', '08012', 'C/ Gran de Gràcia 122',     4.9, 167, '+34 93 217 4455', null,                                    true, 'Optician', 'Joan Puig', 22),
    G('bcn_004', 'Multiópticas Aragó',           41.3897, 2.1612, 'Barcelona', 'Barcelona', '08007', 'C/ Aragó 256',              3.6, 54,  '+34 93 453 2233', 'https://www.multiopticas.com/arago',    false,'Optician', null, 6),
    G('bcn_005', 'Òptica Bofill',                41.3922, 2.1639, 'Barcelona', 'Barcelona', '08008', 'Rambla de Catalunya 88',    4.8, 289, '+34 93 487 9911', 'https://opticabofill.cat',              true, 'Optician', 'Marta Bofill', 98),
    G('bcn_006', 'Federópticos Sants',           41.3756, 2.1356, 'Barcelona', 'Barcelona', '08028', 'C/ Sants 142',              4.4, 124, '+34 93 332 4488', 'https://www.federopticos.com/sants',    true, 'Optician', null, 17),
    G('bcn_007', 'Alain Afflelou Diagonal',      41.3911, 2.1394, 'Barcelona', 'Barcelona', '08029', 'Av. Diagonal 561',          4.0, 76,  '+34 93 419 5566', 'https://www.afflelou.es/diagonal',      true, 'Optician', null, 11),
    G('bcn_008', 'Óptica Sarrià',                41.4007, 2.1224, 'Barcelona', 'Barcelona', '08017', 'C/ Major de Sarrià 56',     4.7, 142, '+34 93 204 3322', 'https://opticasarria.com',              true, 'Optician', 'Laura Tort', 24),

    // Valencia (4)
    G('val_001', 'Óptica Valenciana',            39.4699, -0.3763, 'Valencia', 'Valencia', '46004', 'C/ Colón 12',                4.6, 198, '+34 96 351 2233', 'https://opticavalenciana.es',           true, 'Optician', 'Vicente López', 28),
    G('val_002', 'Visionlab Valencia Centro',    39.4702, -0.3768, 'Valencia', 'Valencia', '46002', 'Pl. Ayuntamiento 19',        4.1, 134, '+34 96 392 7788', 'https://www.visionlab.es/valencia',     true, 'Optician', null, 14),
    G('val_003', 'Òptica Russafa',               39.4622, -0.3713, 'Valencia', 'Valencia', '46006', 'C/ Cuba 24',                 4.8, 89,  '+34 96 333 4455', null,                                    true, 'Optician', 'Carmen Soler', 31),
    G('val_004', 'General Óptica Blasco Ibáñez', 39.4724, -0.3514, 'Valencia', 'Valencia', '46022', 'Av. Blasco Ibáñez 122',      4.4, 145, '+34 96 339 6677', 'https://www.generaloptica.es/blasco',   true, 'Optician', null, 19),

    // Sevilla (3)
    G('sev_001', 'Óptica Macarena',              37.4061, -5.9897, 'Sevilla', 'Sevilla', '41003', 'C/ Feria 67',                  4.5, 167, '+34 95 437 5566', 'https://opticamacarena.es',             true, 'Optician', 'Manuel Jiménez', 22),
    G('sev_002', 'Multiópticas Nervión',         37.3826, -5.9712, 'Sevilla', 'Sevilla', '41005', 'Av. Eduardo Dato 33',          3.9, 89,  '+34 95 463 1122', 'https://www.multiopticas.com/nervion',  false,'Optician', null, 10),
    G('sev_003', 'Òptica Triana',                37.3852, -6.0024, 'Sevilla', 'Sevilla', '41010', 'C/ Pagés del Corro 145',       4.7, 234, '+34 95 433 9988', 'https://opticatriana.com',              true, 'Optician', 'Rocío Romero', 41),

    // Bilbao (2)
    G('bio_001', 'Óptica Indautxu',              43.2630, -2.9395, 'Bilbao', 'Bizkaia', '48010', 'C/ Iparragirre 23',             4.6, 187, '+34 94 421 3344', 'https://opticaindautxu.com',            true, 'Optician', 'Iñaki Beitia', 28),
    G('bio_002', 'Visionlab Bilbao Gran Vía',    43.2603, -2.9347, 'Bilbao', 'Bizkaia', '48001', 'Gran Vía 45',                   4.2, 156, '+34 94 442 5577', 'https://www.visionlab.es/bilbao',       true, 'Optician', null, 18),

    // Zaragoza (2)
    G('zgz_001', 'Òptica Pilar',                 41.6488, -0.8891, 'Zaragoza', 'Zaragoza', '50001', 'C/ Alfonso I 23',            4.7, 203, '+34 97 622 4455', 'https://opticapilar.es',                true, 'Optician', 'Pilar Aragón', 33),
    G('zgz_002', 'General Óptica Independencia', 41.6499, -0.8829, 'Zaragoza', 'Zaragoza', '50001', 'Pº Independencia 18',        4.3, 124, '+34 97 621 8899', 'https://www.generaloptica.es/zgz',      true, 'Optician', null, 16),

    // Málaga (2)
    G('mlg_001', 'Óptica Larios',                36.7196, -4.4200, 'Málaga', 'Málaga', '29005', 'C/ Marqués de Larios 12',        4.6, 245, '+34 95 221 3344', 'https://opticalarios.es',               true, 'Optician', 'José Luis Pérez', 39),
    G('mlg_002', '+Visión Málaga Centro',        36.7213, -4.4214, 'Málaga', 'Málaga', '29008', 'C/ Granada 45',                  3.9, 78,  '+34 95 222 5566', 'https://www.masvision.es/malaga',       false,'Optician', null, 9),

    // Otras ciudades ES (4)
    G('mur_001', 'Óptica Murciana',              37.9922, -1.1307, 'Murcia',    'Murcia',    '30001', 'C/ Trapería 33',           4.5, 134, '+34 96 822 1144', 'https://opticamurciana.es',          true,  'Optician', 'Asunción García', 19),
    G('vig_001', 'Óptica Casablanca Vigo',       42.2406, -8.7207, 'Vigo',      'Pontevedra','36202', 'C/ Príncipe 12',           4.8, 178, '+34 98 643 2255', 'https://opticacasablanca.gal',       true,  'Optician', 'Manuel Vázquez', 25),
    G('plm_001', 'Òptica Palma',                 39.5696, 2.6502,  'Palma',     'Illes Balears','07001', 'C/ Sant Miquel 56',     4.6, 156, '+34 97 172 3344', 'https://opticapalma.com',            true,  'Optician', 'Joana Morey', 22),
    G('sant_001','Visionlab Santander',          43.4623, -3.8099, 'Santander', 'Cantabria', '39003', 'C/ Burgos 13',             4.2, 98,  '+34 94 221 5566', 'https://www.visionlab.es/santander', true,  'Optician', null, 13),

    // Portugal (5)
    G('lis_001', 'Optivisão Chiado',             38.7104, -9.1418, 'Lisboa', 'Lisboa', '1200-094', 'R. Garrett 41',               4.6, 312, '+351 21 346 7788', 'https://www.optivisao.pt/chiado',   true, 'Optician', null, 38),
    G('lis_002', 'Óculos Centro Avenida',        38.7223, -9.1462, 'Lisboa', 'Lisboa', '1050-016', 'Av. da Liberdade 89',         4.8, 234, '+351 21 354 9911', 'https://oculoscentro.pt',          true, 'Optician', 'João Silva', 42),
    G('lis_003', 'MultiOpticas Saldanha',        38.7338, -9.1450, 'Lisboa', 'Lisboa', '1050-185', 'Pç. Duque de Saldanha 24',    4.0, 167, '+351 21 359 4422', 'https://www.multiopticas.pt/saldanha', true,'Optician', null, 19),
    G('opo_001', 'Wells Óptica Boavista',        41.1546, -8.6303, 'Porto',  'Porto',  '4100-129', 'Av. da Boavista 1289',        4.4, 198, '+351 22 605 7733', 'https://wells.pt/boavista',         true, 'Optician', null, 24),
    G('opo_002', 'Óticas Lince Aliados',         41.1496, -8.6109, 'Porto',  'Porto',  '4000-064', 'Av. dos Aliados 67',          4.7, 143, '+351 22 200 8855', 'https://lince.pt/aliados',          true, 'Optician', 'Maria Santos', 29),
  ];

  // ─────────────────────────────────────────────────────────────────
  // OPTICAS_CPV (18 registros, 15 vinculados + 3 sin vincular)
  // ─────────────────────────────────────────────────────────────────
  const opticas_cpv = [
    // 15 clientes vinculados
    { CODIGO: 'CPV-08234', GRUPO: 'Independiente',     DIRECCION: 'Calle Mayor 23',                  LOCALIDAD: 'Madrid',    PROVINCIA: 'Madrid',     TEL: '915551234',   EMAIL: 'info@opticasancarlos.es',     DP: 'Juan García',     COM: 'Sara Pérez',     TIPOLOGIA: 'Optometría premium',      SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_madrid_001' },
    { CODIGO: 'CPV-04122', GRUPO: 'Visionlab',          DIRECCION: 'Gran Vía 32',                     LOCALIDAD: 'Madrid',    PROVINCIA: 'Madrid',     TEL: '912228800',   EMAIL: null,                          DP: 'Juan García',     COM: 'Sara Pérez',     TIPOLOGIA: 'Cadena',                  SEGMENTACION: 'B',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_madrid_002' },
    { CODIGO: 'CPV-04567', GRUPO: 'General Óptica',     DIRECCION: 'P. de la Castellana 89',          LOCALIDAD: 'Madrid',    PROVINCIA: 'Madrid',     TEL: '914112233',   EMAIL: 'castellana@generaloptica.es', DP: 'Juan García',     COM: 'Diego Romero',   TIPOLOGIA: 'Cadena premium',          SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_madrid_003' },
    { CODIGO: 'CPV-09812', GRUPO: 'Independiente',     DIRECCION: 'C/ Fuencarral 121',                LOCALIDAD: 'Madrid',    PROVINCIA: 'Madrid',     TEL: '914465566',   EMAIL: 'maria@opticabermejo.com',     DP: 'Juan García',     COM: 'Sara Pérez',     TIPOLOGIA: 'Boutique',                SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_madrid_004' },
    { CODIGO: 'CPV-06432', GRUPO: 'Independiente',     DIRECCION: 'C/ Goya 78',                       LOCALIDAD: 'Madrid',    PROVINCIA: 'Madrid',     TEL: '915751122',   EMAIL: 'cita@opticavega.es',          DP: 'Juan García',     COM: 'Diego Romero',   TIPOLOGIA: 'Optometría',              SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_madrid_009' },
    { CODIGO: 'CPV-02345', GRUPO: 'Visionlab',          DIRECCION: 'Av. Diagonal 477',                LOCALIDAD: 'Barcelona', PROVINCIA: 'Barcelona',  TEL: '934445566',   EMAIL: null,                          DP: 'Núria Vidal',     COM: 'Marc Esteve',    TIPOLOGIA: 'Cadena',                  SEGMENTACION: 'B',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_bcn_001' },
    { CODIGO: 'CPV-08899', GRUPO: 'Óptica Universitaria', DIRECCION: 'Passeig de Gràcia 71',         LOCALIDAD: 'Barcelona', PROVINCIA: 'Barcelona',  TEL: '932158877',   EMAIL: 'pg@opticauniversitaria.es',   DP: 'Núria Vidal',     COM: 'Marc Esteve',    TIPOLOGIA: 'Cadena premium',          SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_bcn_002' },
    { CODIGO: 'CPV-07711', GRUPO: 'Independiente',     DIRECCION: 'C/ Gran de Gràcia 122',            LOCALIDAD: 'Barcelona', PROVINCIA: 'Barcelona',  TEL: '932174455',   EMAIL: null,                          DP: 'Núria Vidal',     COM: 'Joan Bosch',     TIPOLOGIA: 'Optometría barrio',       SEGMENTACION: 'B',  LOCATION_ACC: 'Approx',  place_id_fk: 'ChIJ_bcn_003' },
    { CODIGO: 'CPV-05544', GRUPO: 'Independiente',     DIRECCION: 'Rambla de Catalunya 88',           LOCALIDAD: 'Barcelona', PROVINCIA: 'Barcelona',  TEL: '934879911',   EMAIL: 'marta@opticabofill.cat',      DP: 'Núria Vidal',     COM: 'Marc Esteve',    TIPOLOGIA: 'Boutique',                SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_bcn_005' },
    { CODIGO: 'CPV-04488', GRUPO: 'Independiente',     DIRECCION: 'C/ Colón 12',                      LOCALIDAD: 'Valencia',  PROVINCIA: 'Valencia',   TEL: '963512233',   EMAIL: 'vicente@opticavalenciana.es', DP: 'Vicente Beltrán', COM: 'Lucía Ferrer',   TIPOLOGIA: 'Optometría',              SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_val_001' },
    { CODIGO: 'CPV-06677', GRUPO: 'Independiente',     DIRECCION: 'C/ Cuba 24',                       LOCALIDAD: 'Valencia',  PROVINCIA: 'Valencia',   TEL: '963334455',   EMAIL: null,                          DP: 'Vicente Beltrán', COM: 'Lucía Ferrer',   TIPOLOGIA: 'Boutique',                SEGMENTACION: 'B',  LOCATION_ACC: 'Approx',  place_id_fk: 'ChIJ_val_003' },
    { CODIGO: 'CPV-03366', GRUPO: 'Independiente',     DIRECCION: 'C/ Feria 67',                      LOCALIDAD: 'Sevilla',   PROVINCIA: 'Sevilla',    TEL: '954375566',   EMAIL: 'manuel@opticamacarena.es',    DP: 'Manuel Quintana', COM: 'Ana Ramírez',    TIPOLOGIA: 'Optometría',              SEGMENTACION: 'B',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_sev_001' },
    { CODIGO: 'CPV-04477', GRUPO: 'Independiente',     DIRECCION: 'C/ Pagés del Corro 145',           LOCALIDAD: 'Sevilla',   PROVINCIA: 'Sevilla',    TEL: '954339988',   EMAIL: 'rocio@opticatriana.com',      DP: 'Manuel Quintana', COM: 'Ana Ramírez',    TIPOLOGIA: 'Optometría premium',      SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_sev_003' },
    { CODIGO: 'CPV-02288', GRUPO: 'Independiente',     DIRECCION: 'C/ Iparragirre 23',                LOCALIDAD: 'Bilbao',    PROVINCIA: 'Bizkaia',    TEL: '944213344',   EMAIL: 'inaki@opticaindautxu.com',    DP: 'Iñaki Larrazabal',COM: 'Maite Etxeberria',TIPOLOGIA: 'Optometría',              SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_bio_001' },
    { CODIGO: 'CPV-01199', GRUPO: 'Independiente',     DIRECCION: 'C/ Alfonso I 23',                  LOCALIDAD: 'Zaragoza',  PROVINCIA: 'Zaragoza',   TEL: '976224455',   EMAIL: 'pilar@opticapilar.es',        DP: 'Carlos Aragüés',  COM: 'Eva Tena',       TIPOLOGIA: 'Optometría premium',      SEGMENTACION: 'A',  LOCATION_ACC: 'Rooftop', place_id_fk: 'ChIJ_zgz_001' },

    // 3 sin vincular: para A3 Revisión
    // conflicto (76% similitud con madrid_010): nombre y dirección parecidos pero código distinto
    { CODIGO: 'CPV-99001', GRUPO: 'Cottet',             DIRECCION: 'Calle Velazquez 35',              LOCALIDAD: 'Madrid',    PROVINCIA: 'Madrid',     TEL: '914352244',   EMAIL: null,                          DP: 'Juan García',     COM: 'Sara Pérez',     TIPOLOGIA: 'Cadena',                  SEGMENTACION: 'B',  LOCATION_ACC: 'Approx',  place_id_fk: null },
    // solo_cpv: sin candidato viable
    { CODIGO: 'CPV-99002', GRUPO: 'Independiente',     DIRECCION: 'Calle Alcalde Andrés 12',         LOCALIDAD: 'Alcorcón',  PROVINCIA: 'Madrid',     TEL: '916441122',   EMAIL: 'opticaalcorcon@gmail.com',    DP: 'Juan García',     COM: 'Diego Romero',   TIPOLOGIA: 'Optometría',              SEGMENTACION: 'C',  LOCATION_ACC: 'Approx',  place_id_fk: null },
    // conflicto (68% similitud con bcn_007): nombre y zona compatibles
    { CODIGO: 'CPV-99003', GRUPO: 'Alain Afflelou',     DIRECCION: 'Avda Diagonal 561',               LOCALIDAD: 'Barcelona', PROVINCIA: 'Barcelona',  TEL: '934195566',   EMAIL: null,                          DP: 'Núria Vidal',     COM: 'Marc Esteve',    TIPOLOGIA: 'Cadena',                  SEGMENTACION: 'B',  LOCATION_ACC: 'Approx',  place_id_fk: null },
  ];

  // ─────────────────────────────────────────────────────────────────
  // OPTICAS_APP_DATA
  // ─────────────────────────────────────────────────────────────────
  const opticas_app_data = opticas_google.map((g) => {
    // resuelve cadena por matching de nombre+website contra cadenas.keywords+dominios
    let cadena_id = null;
    const nameL = g.name.toLowerCase();
    const webL = (g.website || '').toLowerCase();
    for (const c of cadenas) {
      if (c.keywords.some((k) => nameL.includes(k.toLowerCase())) ||
          c.dominios.some((d) => webL.includes(d.toLowerCase()))) {
        cadena_id = c.id; break;
      }
    }
    return {
      place_id: g.place_id,
      show_campañas_core: true,
      show_campañas_miopia: ['ChIJ_madrid_001','ChIJ_madrid_004','ChIJ_madrid_009','ChIJ_bcn_005','ChIJ_val_001','ChIJ_sev_003','ChIJ_bio_001','ChIJ_zgz_001'].includes(g.place_id),
      cadena_resuelta_id: cadena_id,
      fecha_alta_en_app: '2025-08-15',
      notas_internas: null,
    };
  });

  // Algunas notas internas para varias ópticas
  opticas_app_data.find((a) => a.place_id === 'ChIJ_madrid_001').notas_internas = 'Cliente histórico. Pedido especial de lentes esclerales en Q2.';
  opticas_app_data.find((a) => a.place_id === 'ChIJ_bcn_005').notas_internas = 'Solicitan formación MyDay en septiembre.';
  opticas_app_data.find((a) => a.place_id === 'ChIJ_val_001').notas_internas = 'Punto piloto programa Control de Miopía.';

  // ─────────────────────────────────────────────────────────────────
  // OPTICAS_OVERRIDES (8 activos)
  // ─────────────────────────────────────────────────────────────────
  const opticas_overrides = [
    { id: 1, tabla_origen: 'opticas_google', registro_id: 'ChIJ_madrid_001', campo: 'phone',   valor_nuevo: '+34 91 555 12 34',   valor_anterior: '+34 91 555 1234',   usuario_id: 1, fecha: '2026-05-15T10:32:00', motivo: 'Formato corregido manualmente' },
    { id: 2, tabla_origen: 'opticas_cpv',    registro_id: 'CPV-08234',         campo: 'EMAIL',   valor_nuevo: 'info@opticasancarlos.es', valor_anterior: 'opticasancarlos@gmail.com', usuario_id: 1, fecha: '2026-05-15T10:34:00', motivo: 'Email actualizado por el cliente' },
    { id: 3, tabla_origen: 'opticas_google', registro_id: 'ChIJ_bcn_003',     campo: 'website', valor_nuevo: 'https://opticagracia.cat', valor_anterior: null,                  usuario_id: 2, fecha: '2026-05-12T16:18:00', motivo: 'Tenían web pero Google no la detectó' },
    { id: 4, tabla_origen: 'opticas_google', registro_id: 'ChIJ_val_003',     campo: 'website', valor_nuevo: 'https://opticarussafa.com', valor_anterior: null,                  usuario_id: 1, fecha: '2026-05-08T09:55:00', motivo: 'Lanzaron web hace 2 meses' },
    { id: 5, tabla_origen: 'opticas_cpv',    registro_id: 'CPV-06432',         campo: 'TEL',     valor_nuevo: '915751122',          valor_anterior: '91 575 11 22',         usuario_id: 1, fecha: '2026-04-28T11:12:00', motivo: 'Estandarización formato' },
    { id: 6, tabla_origen: 'opticas_google', registro_id: 'ChIJ_madrid_006',  campo: 'address', valor_nuevo: 'C/ Atocha 89, 28012 Madrid', valor_anterior: 'C/ Atocha 89 28012 Madrid', usuario_id: 2, fecha: '2026-04-22T14:00:00', motivo: 'Corrección de formato' },
    { id: 7, tabla_origen: 'opticas_google', registro_id: 'ChIJ_sev_001',     campo: 'phone',   valor_nuevo: '+34 954 37 55 66',   valor_anterior: '+34 95 437 5566',     usuario_id: 1, fecha: '2026-04-15T17:30:00', motivo: 'Formato corregido' },
    { id: 8, tabla_origen: 'opticas_cpv',    registro_id: 'CPV-08899',         campo: 'COM',     valor_nuevo: 'Marc Esteve',         valor_anterior: 'Por asignar',           usuario_id: 1, fecha: '2026-04-10T08:45:00', motivo: 'Comercial asignado tras reorganización' },
  ];

  // ─────────────────────────────────────────────────────────────────
  // USUARIOS (14)
  // ─────────────────────────────────────────────────────────────────
  const usuarios = [
    { id: 1,  nombre: 'Alex Sánchez-Brunete', email: 'alex@newno.marketing',         rol: 'admin', activo: true, ultimo_acceso: '2026-06-08T13:55:00', creado: '2025-09-10' },
    { id: 2,  nombre: 'Carla Mandado',         email: 'carla@newno.marketing',        rol: 'admin', activo: true, ultimo_acceso: '2026-06-08T10:12:00', creado: '2025-09-10' },
    { id: 3,  nombre: 'Tomás García',          email: 'tomas@newno.marketing',        rol: 'admin', activo: true, ultimo_acceso: '2026-06-07T18:45:00', creado: '2025-09-10' },
    { id: 4,  nombre: 'Mónica Gómez',          email: 'monica.gomez@coopervision.es', rol: 'admin', activo: true, ultimo_acceso: '2026-06-06T16:33:00', creado: '2025-09-15' },
    { id: 5,  nombre: 'Silvia Doménech',       email: 'silvia.domenech@coopervision.es', rol: 'user', activo: true, ultimo_acceso: '2026-06-05T11:20:00', creado: '2025-10-01' },
    { id: 6,  nombre: 'Pablo Marín',           email: 'pablo.marin@coopervision.es',  rol: 'user', activo: true, ultimo_acceso: '2026-06-03T09:45:00', creado: '2025-10-01' },
    { id: 7,  nombre: 'Elena Torres',          email: 'elena.torres@coopervision.es', rol: 'user', activo: true, ultimo_acceso: '2026-06-02T15:10:00', creado: '2025-10-15' },
    { id: 8,  nombre: 'Javier Ramos',          email: 'javier.ramos@coopervision.es', rol: 'user', activo: true, ultimo_acceso: '2026-05-28T17:22:00', creado: '2025-11-03' },
    { id: 9,  nombre: 'Lucía Fernández',       email: 'lucia.fernandez@coopervision.es', rol: 'user', activo: true, ultimo_acceso: '2026-05-30T10:00:00', creado: '2025-11-03' },
    { id: 10, nombre: 'Sergio Vidal',          email: 'sergio.vidal@coopervision.es', rol: 'user', activo: true, ultimo_acceso: '2026-05-25T14:48:00', creado: '2026-01-10' },
    { id: 11, nombre: 'Patricia Lara',         email: 'patricia.lara@coopervision.es', rol: 'user', activo: true, ultimo_acceso: '2026-06-01T08:55:00', creado: '2026-01-10' },
    { id: 12, nombre: 'Ramón Castro',          email: 'ramon.castro@coopervision.es', rol: 'user', activo: true, ultimo_acceso: '2026-05-20T16:30:00', creado: '2026-02-05' },
    { id: 13, nombre: 'Beatriz Soto',          email: 'beatriz.soto@coopervision.es', rol: 'user', activo: false, ultimo_acceso: '2026-03-15T12:00:00', creado: '2025-12-01' },
    { id: 14, nombre: 'Arthur Davoudi',        email: 'arthur@newno.marketing',       rol: 'admin', activo: true, ultimo_acceso: '2026-06-07T19:10:00', creado: '2025-09-10' },
  ];

  // ─────────────────────────────────────────────────────────────────
  // SYNCS_HISTORIAL
  // ─────────────────────────────────────────────────────────────────
  const syncs_historial = [
    { id: 12, fuente: 'outscraper',  fecha_inicio: '2026-05-10T02:00:00', fecha_fin: '2026-05-10T14:32:00', resultado: 'ok',         deltas: { nuevos: 127, conflictos: 23, no_encontrados: 7 } },
    { id: 11, fuente: 'salesforce',  fecha_inicio: '2026-02-03T02:00:00', fecha_fin: '2026-02-03T09:00:00', resultado: 'ok',         deltas: { nuevos: 5,   conflictos: 2,  no_encontrados: 0 } },
    { id: 10, fuente: 'outscraper',  fecha_inicio: '2026-02-08T02:00:00', fecha_fin: '2026-02-08T13:20:00', resultado: 'ok',         deltas: { nuevos: 89,  conflictos: 18, no_encontrados: 4 } },
    { id: 9,  fuente: 'salesforce',  fecha_inicio: '2025-11-03T02:00:00', fecha_fin: '2025-11-03T08:45:00', resultado: 'ok',         deltas: { nuevos: 3,   conflictos: 1,  no_encontrados: 0 } },
    { id: 8,  fuente: 'outscraper',  fecha_inicio: '2025-11-10T02:00:00', fecha_fin: '2025-11-10T15:10:00', resultado: 'fallo_parcial', deltas: { nuevos: 156, conflictos: 31, no_encontrados: 9 } },
    { id: 7,  fuente: 'outscraper',  fecha_inicio: '2025-08-10T02:00:00', fecha_fin: '2025-08-10T13:55:00', resultado: 'ok',         deltas: { nuevos: 178, conflictos: 28, no_encontrados: 5 } },
    { id: 6,  fuente: 'salesforce',  fecha_inicio: '2025-08-03T02:00:00', fecha_fin: '2025-08-03T08:30:00', resultado: 'ok',         deltas: { nuevos: 11,  conflictos: 0,  no_encontrados: 0 } },
  ];

  // Configuración actual de sync
  const syncs_config = {
    outscraper:  { frecuencia: '3_meses', dia: 'lunes', hora: '02:00', proxima: '2026-08-10T02:00:00' },
    salesforce:  { frecuencia: '6_meses', dia: 'lunes', hora: '02:00', proxima: '2026-08-03T02:00:00' },
  };

  // ─────────────────────────────────────────────────────────────────
  // CAMBIOS_HISTORICOS (eventos para V6 Changelog y V5 tab 3)
  // Combina overrides + eventos de sync + vínculos + app_data
  // ─────────────────────────────────────────────────────────────────
  const cambios_historicos = [
    ...opticas_overrides.map((o) => ({
      fecha: o.fecha,
      tipo: 'override_aplicado',
      tabla: o.tabla_origen,
      place_id: o.tabla_origen === 'opticas_google' ? o.registro_id : (opticas_cpv.find((c) => c.CODIGO === o.registro_id) || {}).place_id_fk,
      registro_id: o.registro_id,
      campo: o.campo,
      valor_nuevo: o.valor_nuevo,
      valor_anterior: o.valor_anterior,
      usuario_id: o.usuario_id,
      motivo: o.motivo,
    })),
    { fecha: '2026-05-10T14:32:00', tipo: 'sync_outscraper', tabla: 'opticas_google', place_id: null, registro_id: null, campo: null, valor_nuevo: null, valor_anterior: null, usuario_id: null, motivo: '+127 nuevos · 23 conflictos · 7 desaparecidos' },
    { fecha: '2026-05-11T09:15:00', tipo: 'vinculo_creado',   tabla: 'opticas_cpv',    place_id: 'ChIJ_madrid_010', registro_id: 'CPV-11200', campo: 'place_id_fk', valor_nuevo: 'ChIJ_madrid_010', valor_anterior: null, usuario_id: 1, motivo: 'Match confirmado tras revisión' },
    { fecha: '2026-05-11T09:18:00', tipo: 'vinculo_creado',   tabla: 'opticas_cpv',    place_id: 'ChIJ_bcn_006',    registro_id: 'CPV-11201', campo: 'place_id_fk', valor_nuevo: 'ChIJ_bcn_006',    valor_anterior: null, usuario_id: 1, motivo: 'Match confirmado tras revisión' },
    { fecha: '2026-04-30T13:22:00', tipo: 'app_data_actualizado', tabla: 'opticas_app_data', place_id: 'ChIJ_madrid_001', registro_id: 'ChIJ_madrid_001', campo: 'notas_internas', valor_nuevo: 'Cliente histórico. Pedido especial...', valor_anterior: null, usuario_id: 1, motivo: 'Nota añadida' },
    { fecha: '2026-04-20T11:00:00', tipo: 'app_data_actualizado', tabla: 'opticas_app_data', place_id: 'ChIJ_val_001', registro_id: 'ChIJ_val_001', campo: 'show_campañas_miopia', valor_nuevo: 'true', valor_anterior: 'false', usuario_id: 2, motivo: 'Punto piloto miopía' },
    { fecha: '2026-02-03T09:00:00', tipo: 'sync_salesforce', tabla: 'opticas_cpv', place_id: null, registro_id: null, campo: null, valor_nuevo: null, valor_anterior: null, usuario_id: null, motivo: '+5 clientes · 2 conflictos' },
  ];

  // ─────────────────────────────────────────────────────────────────
  // LOGS_ACTIVIDAD (acciones de usuario, no cambios sobre datos)
  // ─────────────────────────────────────────────────────────────────
  const logs_actividad = [
    { fecha: '2026-06-08T13:55:23', usuario_id: 1, accion: 'login',                detalle: null },
    { fecha: '2026-06-08T13:56:48', usuario_id: 1, accion: 'descarga_csv',         detalle: '1.847 ópticas · provincia=Madrid' },
    { fecha: '2026-06-08T10:12:05', usuario_id: 2, accion: 'login',                detalle: null },
    { fecha: '2026-06-08T10:15:33', usuario_id: 2, accion: 'override_creado',      detalle: 'place_id=ChIJ_madrid_004 · campo=website' },
    { fecha: '2026-06-07T18:45:11', usuario_id: 3, accion: 'login',                detalle: null },
    { fecha: '2026-06-07T18:50:24', usuario_id: 3, accion: 'descarga_csv',         detalle: '18.234 ópticas · sin filtros' },
    { fecha: '2026-06-07T19:10:02', usuario_id: 14, accion: 'sync_lanzada',        detalle: 'outscraper · manual' },
    { fecha: '2026-06-06T16:33:55', usuario_id: 4, accion: 'login',                detalle: null },
    { fecha: '2026-06-06T16:40:12', usuario_id: 4, accion: 'vinculo_creado',      detalle: 'CODIGO=CPV-08234 ↔ place_id=ChIJ_madrid_001' },
    { fecha: '2026-06-06T16:45:33', usuario_id: 4, accion: 'creación_usuario',     detalle: 'sergio.vidal@coopervision.es · rol=user' },
    { fecha: '2026-06-05T11:20:18', usuario_id: 5, accion: 'login',                detalle: null },
    { fecha: '2026-06-05T11:25:42', usuario_id: 5, accion: 'descarga_csv',         detalle: '412 ópticas · tipo=cliente · provincia=Madrid' },
    { fecha: '2026-06-04T09:00:00', usuario_id: null, accion: 'sync_lanzada',     detalle: 'outscraper · programada' },
    { fecha: '2026-06-03T09:45:11', usuario_id: 6, accion: 'login',                detalle: null },
    { fecha: '2026-06-02T15:10:55', usuario_id: 7, accion: 'login',                detalle: null },
    { fecha: '2026-05-30T10:00:32', usuario_id: 9, accion: 'login',                detalle: null },
    { fecha: '2026-05-28T17:22:08', usuario_id: 8, accion: 'login',                detalle: null },
    { fecha: '2026-05-25T14:48:19', usuario_id: 10, accion: 'login',               detalle: null },
    { fecha: '2026-05-22T11:33:00', usuario_id: 1, accion: 'configuración_modificada', detalle: 'frecuencia_outscraper: 2_meses → 3_meses' },
    { fecha: '2026-05-20T16:30:42', usuario_id: 12, accion: 'login',               detalle: null },
    { fecha: '2026-05-18T14:00:18', usuario_id: 2, accion: 'cadena_creada',        detalle: 'nombre=Mister Spex · pais=ES' },
    { fecha: '2026-05-15T10:32:00', usuario_id: 1, accion: 'override_creado',      detalle: 'place_id=ChIJ_madrid_001 · campo=phone' },
    { fecha: '2026-05-15T10:34:00', usuario_id: 1, accion: 'override_creado',      detalle: 'CODIGO=CPV-08234 · campo=EMAIL' },
    { fecha: '2026-05-12T16:18:00', usuario_id: 2, accion: 'override_creado',      detalle: 'place_id=ChIJ_bcn_003 · campo=website' },
    { fecha: '2026-05-10T02:00:00', usuario_id: null, accion: 'sync_lanzada',     detalle: 'outscraper · programada' },
  ];

  // ─────────────────────────────────────────────────────────────────
  // CANDIDATOS DE MATCHING (para A3 Revisión)
  // ─────────────────────────────────────────────────────────────────
  // Cada candidato representa un posible vínculo place_id ↔ CODIGO con score de similitud
  const matching_candidatos = [
    // Conflicto 1: CPV-99001 (Cottet Madrid mal escrito) vs ChIJ_madrid_010 (Cottet Salamanca real)
    {
      cpv_codigo: 'CPV-99001',
      estado: 'conflicto',
      candidatos: [
        { place_id: 'ChIJ_madrid_010', score: 0.76, metricas: { nombre: 0.85, direccion: 0.78, codigo_postal: 1.0, telefono: 1.0, distancia_m: 0 } },
      ],
      detectado: '2026-05-10T14:32:00',
    },
    // Conflicto 2: CPV-99003 (Afflelou Diagonal con formato distinto) vs ChIJ_bcn_007 (Afflelou Diagonal real)
    {
      cpv_codigo: 'CPV-99003',
      estado: 'conflicto',
      candidatos: [
        { place_id: 'ChIJ_bcn_007', score: 0.68, metricas: { nombre: 0.72, direccion: 0.65, codigo_postal: 1.0, telefono: 1.0, distancia_m: 0 } },
      ],
      detectado: '2026-05-10T14:32:00',
    },
    // Solo_cpv: CPV-99002 (Alcorcón, no hay candidato viable)
    {
      cpv_codigo: 'CPV-99002',
      estado: 'solo_cpv',
      candidatos: [],
      detectado: '2026-05-10T14:32:00',
    },
  ];

  // No encontrados: lista de place_id que estaban antes y desaparecieron en la última sync
  const no_encontrados = [
    { place_id: 'ChIJ_madrid_legacy_01', name: 'Óptica Diaz (desaparecida)',  city: 'Madrid',    state: 'Madrid',    rating: 4.4, reviews: 67,  desaparecido_desde: '2026-05-10' },
    { place_id: 'ChIJ_bcn_legacy_01',     name: 'Òptica Vall (desaparecida)',  city: 'Barcelona', state: 'Barcelona', rating: 4.2, reviews: 89,  desaparecido_desde: '2026-05-10' },
  ];

  // ─────────────────────────────────────────────────────────────────
  // AGREGADOS PRECOMPUTADOS (para V1 Resumen y V2 BI)
  // ─────────────────────────────────────────────────────────────────
  const total_opticas = 18234;       // simula prod, no length del array (40 mock)
  const total_clientes = 3142;
  const ultima_sync_outscraper = '2026-05-10T14:32:00';
  const dias_desde_ultima_sync = 12;

  const resumen_kpis = {
    total_opticas, total_clientes,
    pct_clientes: 17.2,
    nuevos_ult_sync: 84,
    valoracion_media: 4.32,
    valoracion_media_clientes: 4.41,
    valoracion_media_no_clientes: 4.18,
    reseñas_total: 1247650,
    pct_con_web: 72.4,
    pct_con_telefono: 94.1,
    pct_con_email: 38.5,
    pct_con_booking: 12.7,
    n_provincias: 52,
    n_ciudades: 1847,
  };

  const top_provincias = [
    { provincia: 'Madrid',     total: 2840, clientes: 412 },
    { provincia: 'Barcelona',  total: 2611, clientes: 389 },
    { provincia: 'Valencia',   total: 1187, clientes: 178 },
    { provincia: 'Sevilla',    total: 945,  clientes: 142 },
    { provincia: 'Málaga',     total: 887,  clientes: 134 },
    { provincia: 'Bizkaia',    total: 612,  clientes: 98 },
    { provincia: 'Alicante',   total: 588,  clientes: 81 },
    { provincia: 'Zaragoza',   total: 521,  clientes: 76 },
    { provincia: 'Murcia',     total: 487,  clientes: 71 },
    { provincia: 'A Coruña',   total: 445,  clientes: 65 },
  ];

  const dist_categorias = [
    { categoria: 'Optician',                  count: 14210 },
    { categoria: 'Eye care center',           count: 2456 },
    { categoria: 'Contact lenses supplier',   count: 1024 },
    { categoria: 'Designer eyewear',          count: 312 },
    { categoria: 'Otros',                     count: 232 },
  ];

  const dist_valoraciones = [
    { rango: '<3.5',     count: 1567 },
    { rango: '3.5-3.9',  count: 3245 },
    { rango: '4.0-4.4',  count: 6892 },
    { rango: '4.5-5.0',  count: 6530 },
  ];

  const top_ciudades_engagement = [
    { ciudad: 'Madrid',     reseñas_total: 287450, n_opticas: 2840, ratio: 101.2 },
    { ciudad: 'Barcelona',  reseñas_total: 245680, n_opticas: 2611, ratio: 94.1 },
    { ciudad: 'Valencia',   reseñas_total: 87340,  n_opticas: 1187, ratio: 73.6 },
    { ciudad: 'Sevilla',    reseñas_total: 68220,  n_opticas: 945,  ratio: 72.2 },
    { ciudad: 'Málaga',     reseñas_total: 64890,  n_opticas: 887,  ratio: 73.2 },
    { ciudad: 'Bilbao',     reseñas_total: 39450,  n_opticas: 401,  ratio: 98.4 },
    { ciudad: 'Zaragoza',   reseñas_total: 34120,  n_opticas: 412,  ratio: 82.8 },
    { ciudad: 'Palma',      reseñas_total: 28870,  n_opticas: 287,  ratio: 100.6 },
    { ciudad: 'Vigo',       reseñas_total: 26340,  n_opticas: 298,  ratio: 88.4 },
    { ciudad: 'Murcia',     reseñas_total: 25890,  n_opticas: 487,  ratio: 53.2 },
  ];

  const oportunidades_provincias = top_provincias
    .map((p) => ({ ...p, no_clientes: p.total - p.clientes, pct_partners: ((p.clientes / p.total) * 100).toFixed(1), oportunidad: p.total * (1 - p.clientes / p.total) }))
    .sort((a, b) => b.oportunidad - a.oportunidad);

  // ─────────────────────────────────────────────────────────────────
  // SESIÓN (rol activo en runtime, controlado por toggle del prototipo)
  // ─────────────────────────────────────────────────────────────────
  const sesion = {
    usuario_actual_id: 1,  // por defecto, Alex (admin)
    rol_activo: 'admin',   // 'admin' | 'user' — controlado por toggle topbar
  };

  // ─────────────────────────────────────────────────────────────────
  // EXPORT
  // ─────────────────────────────────────────────────────────────────
  return {
    // Tablas
    cadenas,
    opticas_google,
    opticas_cpv,
    opticas_app_data,
    opticas_overrides,
    // Operativa
    usuarios,
    syncs_historial,
    syncs_config,
    cambios_historicos,
    logs_actividad,
    // Matching
    matching_candidatos,
    no_encontrados,
    // Agregados
    resumen_kpis,
    top_provincias,
    dist_categorias,
    dist_valoraciones,
    top_ciudades_engagement,
    oportunidades_provincias,
    ultima_sync_outscraper,
    dias_desde_ultima_sync,
    // Sesión
    sesion,
    // Helpers (para usar desde las vistas)
    helpers: {
      // is_client: emergente - true si existe opticas_cpv con FK a este place_id
      is_client: (place_id) => opticas_cpv.some((c) => c.place_id_fk === place_id),
      // cpv_de: devuelve la fila opticas_cpv vinculada o null
      cpv_de: (place_id) => opticas_cpv.find((c) => c.place_id_fk === place_id) || null,
      // app_data_de: devuelve la fila opticas_app_data
      app_data_de: (place_id) => opticas_app_data.find((a) => a.place_id === place_id) || null,
      // cadena_de: devuelve el objeto cadena resuelto
      cadena_de: (place_id) => {
        const a = opticas_app_data.find((a) => a.place_id === place_id);
        if (!a || !a.cadena_resuelta_id) return null;
        return cadenas.find((c) => c.id === a.cadena_resuelta_id) || null;
      },
      // overrides_de: lista de overrides activos para place_id (resuelve también los de opticas_cpv del cliente vinculado)
      overrides_de: (place_id) => {
        const cpv = opticas_cpv.find((c) => c.place_id_fk === place_id);
        return opticas_overrides.filter((o) =>
          (o.tabla_origen === 'opticas_google' && o.registro_id === place_id) ||
          (o.tabla_origen === 'opticas_cpv' && cpv && o.registro_id === cpv.CODIGO)
        );
      },
      // aplica_overrides: devuelve fila opticas_google con overrides on top
      aplica_overrides_google: (place_id) => {
        const base = opticas_google.find((g) => g.place_id === place_id);
        if (!base) return null;
        const result = { ...base };
        opticas_overrides
          .filter((o) => o.tabla_origen === 'opticas_google' && o.registro_id === place_id)
          .forEach((o) => { result[o.campo] = o.valor_nuevo; });
        return result;
      },
      // formato de números: 1.234, 1,5, 1.2K/1.2M
      fmt_int:   (n) => n.toLocaleString('es-ES'),
      fmt_dec:   (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      fmt_compact: (n) => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : String(n),
      fmt_pct:   (n) => n.toFixed(1) + '%',
      fmt_fecha: (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      },
      fmt_fecha_hora: (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }) + ' ' +
               d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      },
    },
  };
})();
