import { IMDIRecord, ParticipantRecord, AuditFinding } from '../types';

export const BENCHMARK_IMDI: Record<string, IMDIRecord> = {
  // Jawa Timur (38 Kab/Kota)
  'Kota Surabaya': {
    province: 'Jawa Timur',
    city: 'Kota Surabaya',
    score: 59.8,
    category: 'Sangat Tinggi',
    pilarInfrastruktur: 68.2,
    pilarKeterampilan: 62.4,
    pilarPemberdayaan: 55.1,
    pilarPekerjaan: 53.5,
    catatanKebutuhan: 'Fokus pada adopsi AI lanjutan, Cybersecurity enterprise, dan Cloud Architecture untuk ekosistem industri jasa/fintech.'
  },
  'Kota Malang': {
    province: 'Jawa Timur',
    city: 'Kota Malang',
    score: 56.4,
    category: 'Tinggi',
    pilarInfrastruktur: 64.0,
    pilarKeterampilan: 59.8,
    pilarPemberdayaan: 52.3,
    pilarPekerjaan: 49.5,
    catatanKebutuhan: 'Pusat talenta digital kampus; membutuhkan akselerasi Game Dev, AI Product Management, dan Fullstack Web.'
  },
  'Kab. Sidoarjo': {
    province: 'Jawa Timur',
    city: 'Kab. Sidoarjo',
    score: 52.1,
    category: 'Tinggi',
    pilarInfrastruktur: 60.5,
    pilarKeterampilan: 53.2,
    pilarPemberdayaan: 48.7,
    pilarPekerjaan: 46.0,
    catatanKebutuhan: 'Industri manufaktur & logistik; pelatihan IoT & Smart Logistics, E-Commerce UMKM.'
  },
  'Kab. Gresik': {
    province: 'Jawa Timur',
    city: 'Kab. Gresik',
    score: 49.6,
    category: 'Sedang',
    pilarInfrastruktur: 57.1,
    pilarKeterampilan: 50.4,
    pilarPemberdayaan: 46.2,
    pilarPekerjaan: 44.7,
    catatanKebutuhan: 'Kawasan industri KIIP; prioritas otomatisasi pabrik, data analytics operasional.'
  },
  'Kab. Banyuwangi': {
    province: 'Jawa Timur',
    city: 'Kab. Banyuwangi',
    score: 47.8,
    category: 'Sedang',
    pilarInfrastruktur: 52.0,
    pilarKeterampilan: 48.3,
    pilarPemberdayaan: 47.9,
    pilarPekerjaan: 43.0,
    catatanKebutuhan: 'Smart Kampung & digital pariwisata; penguatan Digital Marketing, Content Creation, dan GTA Smart Governance.'
  },
  'Kab. Jember': {
    province: 'Jawa Timur',
    city: 'Kab. Jember',
    score: 44.9,
    category: 'Sedang',
    pilarInfrastruktur: 49.1,
    pilarKeterampilan: 46.2,
    pilarPemberdayaan: 43.8,
    pilarPekerjaan: 40.5,
    catatanKebutuhan: 'Sektor agrobisnis tembakau & kopi; butuh Digital Agri-marketing dan literasi digital desa.'
  },
  'Kab. Malang': {
    province: 'Jawa Timur',
    city: 'Kab. Malang',
    score: 46.7,
    category: 'Sedang',
    pilarInfrastruktur: 51.2,
    pilarKeterampilan: 47.5,
    pilarPemberdayaan: 45.1,
    pilarPekerjaan: 43.0,
    catatanKebutuhan: 'Area wisata dan agrobisnis; perlukan pelatihan DEA untuk desa wisata & hospitality digital.'
  },
  'Kab. Bojonegoro': {
    province: 'Jawa Timur',
    city: 'Kab. Bojonegoro',
    score: 42.5,
    category: 'Sedang',
    pilarInfrastruktur: 46.3,
    pilarKeterampilan: 43.1,
    pilarPemberdayaan: 41.5,
    pilarPekerjaan: 39.1,
    catatanKebutuhan: 'Pilar pekerjaan dan keahlian digital perlu ditingkatkan melalui VSGA teknisi jaringan.'
  },
  'Kab. Pasuruan': {
    province: 'Jawa Timur',
    city: 'Kab. Pasuruan',
    score: 48.3,
    category: 'Sedang',
    pilarInfrastruktur: 54.2,
    pilarKeterampilan: 48.9,
    pilarPemberdayaan: 46.1,
    pilarPekerjaan: 44.0,
    catatanKebutuhan: 'Industrial estate PIER; penyiapan fresh graduate di bidang Cloud dan IT Support.'
  },
  'Kab. Kediri': {
    province: 'Jawa Timur',
    city: 'Kab. Kediri',
    score: 46.1,
    category: 'Sedang',
    pilarInfrastruktur: 50.8,
    pilarKeterampilan: 46.7,
    pilarPemberdayaan: 44.0,
    pilarPekerjaan: 42.9,
    catatanKebutuhan: 'Adanya bandara baru Dhoho mendorong percepatan logistik digital & pariwisata.'
  },
  'Kota Kediri': {
    province: 'Jawa Timur',
    city: 'Kota Kediri',
    score: 54.3,
    category: 'Tinggi',
    pilarInfrastruktur: 61.2,
    pilarKeterampilan: 56.4,
    pilarPemberdayaan: 51.0,
    pilarPekerjaan: 48.6,
    catatanKebutuhan: 'Digitalisasi jasa ritel & e-commerce kreatif; penguatan UI/UX design.'
  },
  'Kota Batu': {
    province: 'Jawa Timur',
    city: 'Kota Batu',
    score: 53.7,
    category: 'Tinggi',
    pilarInfrastruktur: 59.8,
    pilarKeterampilan: 55.3,
    pilarPemberdayaan: 50.9,
    pilarPekerjaan: 48.8,
    catatanKebutuhan: 'Agrowisata digital & smart tourism governance.'
  },
  'Kab. Lamongan': {
    province: 'Jawa Timur',
    city: 'Kab. Lamongan',
    score: 43.2,
    category: 'Sedang',
    pilarInfrastruktur: 47.5,
    pilarKeterampilan: 44.0,
    pilarPemberdayaan: 42.1,
    pilarPekerjaan: 39.2,
    catatanKebutuhan: 'Perikanan & pertanian; pemanfaatan marketplace nelayan & petambak.'
  },
  'Kab. Tuban': {
    province: 'Jawa Timur',
    city: 'Kab. Tuban',
    score: 42.8,
    category: 'Sedang',
    pilarInfrastruktur: 47.0,
    pilarKeterampilan: 43.5,
    pilarPemberdayaan: 41.8,
    pilarPekerjaan: 38.9,
    catatanKebutuhan: 'Keterampilan digital dasar dan digitalisasi UMKM pesisir.'
  },
  'Kab. Bangkalan': {
    province: 'Jawa Timur',
    city: 'Kab. Bangkalan',
    score: 38.9,
    category: 'Rendah',
    pilarInfrastruktur: 43.1,
    pilarKeterampilan: 39.2,
    pilarPemberdayaan: 37.5,
    pilarPekerjaan: 35.9,
    catatanKebutuhan: 'PRIORITAS INTERVENSI: Rendahnya indeks keterampilan; perbanyak pelatihan literasi, DEA, dan VSGA dasar.'
  },
  'Kab. Sampang': {
    province: 'Jawa Timur',
    city: 'Kab. Sampang',
    score: 36.4,
    category: 'Rendah',
    pilarInfrastruktur: 40.5,
    pilarKeterampilan: 37.1,
    pilarPemberdayaan: 35.0,
    pilarPekerjaan: 33.0,
    catatanKebutuhan: 'PRIORITAS TINGGI: Jangkauan pelatihan minim; butuh Thematic Academy inklusif & pemberdayaan pemuda.'
  },
  'Kab. Pamekasan': {
    province: 'Jawa Timur',
    city: 'Kab. Pamekasan',
    score: 40.2,
    category: 'Sedang',
    pilarInfrastruktur: 44.8,
    pilarKeterampilan: 41.0,
    pilarPemberdayaan: 39.0,
    pilarPekerjaan: 36.0,
    catatanKebutuhan: 'Pengembangan sentra batik digital dan wirausaha muda.'
  },
  'Kab. Sumenep': {
    province: 'Jawa Timur',
    city: 'Kab. Sumenep',
    score: 37.8,
    category: 'Rendah',
    pilarInfrastruktur: 41.9,
    pilarKeterampilan: 38.4,
    pilarPemberdayaan: 36.1,
    pilarPekerjaan: 34.8,
    catatanKebutuhan: 'Wilayah kepulauan; prioritaskan pelatihan daring asynchronous & pelatihan guru/aparatur desa.'
  },
  'Kab. Madiun': {
    province: 'Jawa Timur',
    city: 'Kab. Madiun',
    score: 45.0,
    category: 'Sedang',
    pilarInfrastruktur: 49.5,
    pilarKeterampilan: 46.0,
    pilarPemberdayaan: 43.0,
    pilarPekerjaan: 41.5,
    catatanKebutuhan: 'Digitalisasi pertanian & smart village.'
  },
  'Kota Madiun': {
    province: 'Jawa Timur',
    city: 'Kota Madiun',
    score: 55.1,
    category: 'Tinggi',
    pilarInfrastruktur: 62.1,
    pilarKeterampilan: 57.0,
    pilarPemberdayaan: 52.4,
    pilarPekerjaan: 48.9,
    catatanKebutuhan: 'Kota pintar / Pendekar ICT; pelatihan GTA cyber security dan data analytic e-gov.'
  },
  'Kab. Probolinggo': {
    province: 'Jawa Timur',
    city: 'Kab. Probolinggo',
    score: 41.9,
    category: 'Sedang',
    pilarInfrastruktur: 45.8,
    pilarKeterampilan: 42.3,
    pilarPemberdayaan: 40.5,
    pilarPekerjaan: 39.0,
    catatanKebutuhan: 'Pariwisata Bromo & perikanan; butuh content creator academy & digital hospitality.'
  },
  'Kota Probolinggo': {
    province: 'Jawa Timur',
    city: 'Kota Probolinggo',
    score: 48.9,
    category: 'Sedang',
    pilarInfrastruktur: 54.0,
    pilarKeterampilan: 49.5,
    pilarPemberdayaan: 47.0,
    pilarPekerjaan: 45.1,
    catatanKebutuhan: 'Pelabuhan & industri pengolahan; automasi dan web business.'
  },
  'Kab. Lumajang': {
    province: 'Jawa Timur',
    city: 'Kab. Lumajang',
    score: 42.1,
    category: 'Sedang',
    pilarInfrastruktur: 46.0,
    pilarKeterampilan: 42.5,
    pilarPemberdayaan: 41.0,
    pilarPekerjaan: 38.9,
    catatanKebutuhan: 'Mitigasi bencana berbasis IoT dan pemasaran produk holtikultura.'
  },
  'Kab. Bondowoso': {
    province: 'Jawa Timur',
    city: 'Kab. Bondowoso',
    score: 39.5,
    category: 'Rendah',
    pilarInfrastruktur: 43.5,
    pilarKeterampilan: 40.0,
    pilarPemberdayaan: 38.2,
    pilarPekerjaan: 36.3,
    catatanKebutuhan: 'PRIORITAS INTERVENSI: Butuh penetrasi pelatihan wirausaha digital desa kopi & agrowisata.'
  },
  'Kab. Situbondo': {
    province: 'Jawa Timur',
    city: 'Kab. Situbondo',
    score: 41.0,
    category: 'Sedang',
    pilarInfrastruktur: 45.2,
    pilarKeterampilan: 41.7,
    pilarPemberdayaan: 39.8,
    pilarPekerjaan: 37.3,
    catatanKebutuhan: 'Sektor maritim & mangrove; promosi pariwisata bahari digital.'
  },
  'Kab. Magetan': {
    province: 'Jawa Timur',
    city: 'Kab. Magetan',
    score: 44.6,
    category: 'Sedang',
    pilarInfrastruktur: 49.0,
    pilarKeterampilan: 45.5,
    pilarPemberdayaan: 43.1,
    pilarPekerjaan: 40.8,
    catatanKebutuhan: 'Kerajinan kulit & alas kaki; branding & visual copywriting.'
  },
  'Kab. Ngawi': {
    province: 'Jawa Timur',
    city: 'Kab. Ngawi',
    score: 43.8,
    category: 'Sedang',
    pilarInfrastruktur: 48.0,
    pilarKeterampilan: 44.6,
    pilarPemberdayaan: 42.4,
    pilarPekerjaan: 40.2,
    catatanKebutuhan: 'Lumbung padi; penguatan sistem informasi komoditas desa.'
  },
  'Kab. Ponorogo': {
    province: 'Jawa Timur',
    city: 'Kab. Ponorogo',
    score: 44.2,
    category: 'Sedang',
    pilarInfrastruktur: 48.5,
    pilarKeterampilan: 45.0,
    pilarPemberdayaan: 42.8,
    pilarPekerjaan: 40.5,
    catatanKebutuhan: 'Ekonomi kreatif reog & UMKM; digital storytelling & IP protection.'
  },
  'Kab. Pacitan': {
    province: 'Jawa Timur',
    city: 'Kab. Pacitan',
    score: 43.0,
    category: 'Sedang',
    pilarInfrastruktur: 47.2,
    pilarKeterampilan: 43.9,
    pilarPemberdayaan: 41.9,
    pilarPekerjaan: 39.0,
    catatanKebutuhan: 'Pariwisata geowisata & pantai; search engine marketing desa.'
  },
  'Kab. Trenggalek': {
    province: 'Jawa Timur',
    city: 'Kab. Trenggalek',
    score: 43.5,
    category: 'Sedang',
    pilarInfrastruktur: 47.9,
    pilarKeterampilan: 44.2,
    pilarPemberdayaan: 42.2,
    pilarPekerjaan: 39.7,
    catatanKebutuhan: 'Ekonomi hijau & wirausaha perempuan; digital gender inclusion.'
  },
  'Kab. Tulungagung': {
    province: 'Jawa Timur',
    city: 'Kab. Tulungagung',
    score: 46.3,
    category: 'Sedang',
    pilarInfrastruktur: 51.0,
    pilarKeterampilan: 47.0,
    pilarPemberdayaan: 44.8,
    pilarPekerjaan: 42.4,
    catatanKebutuhan: 'Industri marmer & perikanan; e-commerce B2B.'
  },
  'Kab. Blitar': {
    province: 'Jawa Timur',
    city: 'Kab. Blitar',
    score: 45.2,
    category: 'Sedang',
    pilarInfrastruktur: 49.8,
    pilarKeterampilan: 46.1,
    pilarPemberdayaan: 43.5,
    pilarPekerjaan: 41.4,
    catatanKebutuhan: 'Peternakan unggas; supply chain monitoring dan pemasaran digital.'
  },
  'Kota Blitar': {
    province: 'Jawa Timur',
    city: 'Kota Blitar',
    score: 52.8,
    category: 'Tinggi',
    pilarInfrastruktur: 59.5,
    pilarKeterampilan: 54.8,
    pilarPemberdayaan: 50.1,
    pilarPekerjaan: 46.8,
    catatanKebutuhan: 'Kota jasa & kuliner; content creation dan digital payment.'
  },
  'Kab. Nganjuk': {
    province: 'Jawa Timur',
    city: 'Kab. Nganjuk',
    score: 43.9,
    category: 'Sedang',
    pilarInfrastruktur: 48.2,
    pilarKeterampilan: 44.8,
    pilarPemberdayaan: 42.5,
    pilarPekerjaan: 40.1,
    catatanKebutuhan: 'Pusat bawang merah; agro-digital marketplace.'
  },
  'Kab. Mojokerto': {
    province: 'Jawa Timur',
    city: 'Kab. Mojokerto',
    score: 49.1,
    category: 'Sedang',
    pilarInfrastruktur: 55.4,
    pilarKeterampilan: 50.0,
    pilarPemberdayaan: 46.8,
    pilarPekerjaan: 44.2,
    catatanKebutuhan: 'Pariwisata Trowulan & industri Ngoro; web programming dasar.'
  },
  'Kota Mojokerto': {
    province: 'Jawa Timur',
    city: 'Kota Mojokerto',
    score: 53.4,
    category: 'Tinggi',
    pilarInfrastruktur: 60.2,
    pilarKeterampilan: 55.0,
    pilarPemberdayaan: 50.6,
    pilarPekerjaan: 47.8,
    catatanKebutuhan: 'Sentra alas kaki; digital marketing & marketplace ekspor.'
  },
  'Kab. Jombang': {
    province: 'Jawa Timur',
    city: 'Kab. Jombang',
    score: 45.8,
    category: 'Sedang',
    pilarInfrastruktur: 50.4,
    pilarKeterampilan: 46.8,
    pilarPemberdayaan: 44.1,
    pilarPekerjaan: 41.9,
    catatanKebutuhan: 'Pendidikan pesantren; Thematic Academy santri digitalpreneur.'
  },
  'Kota Pasuruan': {
    province: 'Jawa Timur',
    city: 'Kota Pasuruan',
    score: 51.5,
    category: 'Tinggi',
    pilarInfrastruktur: 58.0,
    pilarKeterampilan: 53.4,
    pilarPemberdayaan: 49.0,
    pilarPekerjaan: 45.6,
    catatanKebutuhan: 'Sentra mebel kayu; 3D modelling produk dan platform e-commerce.'
  },

  // Nusa Tenggara Barat (10 Kab/Kota)
  'Kota Mataram': {
    province: 'Nusa Tenggara Barat',
    city: 'Kota Mataram',
    score: 54.8,
    category: 'Tinggi',
    pilarInfrastruktur: 63.5,
    pilarKeterampilan: 56.8,
    pilarPemberdayaan: 51.2,
    pilarPekerjaan: 47.7,
    catatanKebutuhan: 'Ibu kota provinsi NTB; butuh talenta Data Analyst, AI for Governance (GTA), dan Cloud Infrastructure.'
  },
  'Kab. Lombok Barat': {
    province: 'Nusa Tenggara Barat',
    city: 'Kab. Lombok Barat',
    score: 45.2,
    category: 'Sedang',
    pilarInfrastruktur: 51.0,
    pilarKeterampilan: 46.2,
    pilarPemberdayaan: 43.8,
    pilarPekerjaan: 39.8,
    catatanKebutuhan: 'Pariwisata Senggigi & kerajinan mutiara/gerabah; butuh pelatihan Digital Branding, Social Media Specialist.'
  },
  'Kab. Lombok Tengah': {
    province: 'Nusa Tenggara Barat',
    city: 'Kab. Lombok Tengah',
    score: 46.0,
    category: 'Sedang',
    pilarInfrastruktur: 52.4,
    pilarKeterampilan: 47.0,
    pilarPemberdayaan: 44.5,
    pilarPekerjaan: 40.1,
    catatanKebutuhan: 'Kawasan KEK Mandalika; akselerasi talenta digital hospitality, event management IT, dan cybersecurity perhotelan.'
  },
  'Kab. Lombok Timur': {
    province: 'Nusa Tenggara Barat',
    city: 'Kab. Lombok Timur',
    score: 42.1,
    category: 'Sedang',
    pilarInfrastruktur: 47.2,
    pilarKeterampilan: 43.1,
    pilarPemberdayaan: 40.8,
    pilarPekerjaan: 37.3,
    catatanKebutuhan: 'Populasi terbesar di NTB, potensi PMI/tenaga kerja; butuh masif program VSGA dan DEA UMKM pangan olahan.'
  },
  'Kab. Lombok Utara': {
    province: 'Nusa Tenggara Barat',
    city: 'Kab. Lombok Utara',
    score: 39.8,
    category: 'Rendah',
    pilarInfrastruktur: 44.6,
    pilarKeterampilan: 40.8,
    pilarPemberdayaan: 38.3,
    pilarPekerjaan: 35.5,
    catatanKebutuhan: 'PRIORITAS INTERVENSI: Wilayah pariwisata 3 Gili dan agraris; butuh digitalisasi homestay dan literasi digital dasar.'
  },
  'Kab. Sumbawa': {
    province: 'Nusa Tenggara Barat',
    city: 'Kab. Sumbawa',
    score: 43.5,
    category: 'Sedang',
    pilarInfrastruktur: 48.9,
    pilarKeterampilan: 44.5,
    pilarPemberdayaan: 42.0,
    pilarPekerjaan: 38.6,
    catatanKebutuhan: 'Sektor peternakan & madu; digital marketing produk khas daerah dan pemanfaatan platform logistik.'
  },
  'Kab. Sumbawa Barat': {
    province: 'Nusa Tenggara Barat',
    city: 'Kab. Sumbawa Barat',
    score: 47.9,
    category: 'Sedang',
    pilarInfrastruktur: 54.0,
    pilarKeterampilan: 48.7,
    pilarPemberdayaan: 46.1,
    pilarPekerjaan: 42.8,
    catatanKebutuhan: 'Kawasan industri pertambangan AMNT; butuh talenta IT Maintenance, Data Capture, dan automasi industri.'
  },
  'Kab. Dompu': {
    province: 'Nusa Tenggara Barat',
    city: 'Kab. Dompu',
    score: 40.4,
    category: 'Sedang',
    pilarInfrastruktur: 45.1,
    pilarKeterampilan: 41.5,
    pilarPemberdayaan: 39.0,
    pilarPekerjaan: 36.0,
    catatanKebutuhan: 'Sentra jagung & sapi (JAGASAPU); digitalisasi rantai pasok pertanian dan literasi keuangan digital petani.'
  },
  'Kab. Bima': {
    province: 'Nusa Tenggara Barat',
    city: 'Kab. Bima',
    score: 39.2,
    category: 'Rendah',
    pilarInfrastruktur: 43.8,
    pilarKeterampilan: 40.2,
    pilarPemberdayaan: 37.8,
    pilarPekerjaan: 35.0,
    catatanKebutuhan: 'PRIORITAS INTERVENSI: Rasio partisipasi pelatihan masih rendah; butuh perluasan ke kecamatan pedalaman dan pesisir.'
  },
  'Kota Bima': {
    province: 'Nusa Tenggara Barat',
    city: 'Kota Bima',
    score: 50.2,
    category: 'Tinggi',
    pilarInfrastruktur: 57.0,
    pilarKeterampilan: 51.8,
    pilarPemberdayaan: 48.0,
    pilarPekerjaan: 44.0,
    catatanKebutuhan: 'Pusat perdagangan timur NTB; butuh penguatan administrasi pemerintahan digital (GTA) dan e-commerce ritel.'
  }
};

// Realistic initial dataset for 1,850 participants covering East Java & NTB
export const INITIAL_BENCHMARK_PARTICIPANTS: ParticipantRecord[] = [
  // Jawa Timur - Surabaya
  ...generateCohort('Kota Surabaya', 'Jawa Timur', 'Gubeng', 'Fresh Graduate Academy (FGA)', 'Artificial Intelligence & Machine Learning', 'Pelatihan AI Engineering Batch 1', 120, 108, 6, 6, 45, 2025),
  ...generateCohort('Kota Surabaya', 'Jawa Timur', 'Wonokromo', 'Government Transformation Academy (GTA)', 'Cybersecurity Specialist', 'Pelatihan CSIRT Sektor Publik Batch 2', 95, 88, 4, 3, 38, 2025),
  ...generateCohort('Kota Surabaya', 'Jawa Timur', 'Sukolilo', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Pemasaran Digital UMKM Naik Kelas', 110, 102, 5, 3, 12, 2025),
  ...generateCohort('Kota Surabaya', 'Jawa Timur', 'Rungkut', 'Vocational School Graduate Academy (VSGA)', 'Cloud Computing & DevOps', 'Teknisi Cloud Practitioner Batch 1', 85, 76, 5, 4, 30, 2025),
  
  // Jawa Timur - Malang & Kota Malang
  ...generateCohort('Kota Malang', 'Jawa Timur', 'Klojen', 'Fresh Graduate Academy (FGA)', 'Data Science & Analytics', 'Data Science for Fast Track Industry', 115, 104, 7, 4, 42, 2025),
  ...generateCohort('Kota Malang', 'Jawa Timur', 'Lowokwaru', 'Thematic Academy (TA)', 'UI/UX Design & Product Management', 'UI/UX Design Bootcamp Mahasiswa', 90, 84, 4, 2, 25, 2025),
  ...generateCohort('Kab. Malang', 'Jawa Timur', 'Singosari', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Digitalisasi Desa Wisata & Kuliner', 85, 78, 4, 3, 8, 2025),
  ...generateCohort('Kab. Malang', 'Jawa Timur', 'Kepanjen', 'Vocational School Graduate Academy (VSGA)', 'Pemrograman Web & Mobile', 'Junior Web Developer Batch 3', 70, 62, 5, 3, 15, 2025),
  
  // Jawa Timur - Sidoarjo & Gresik
  ...generateCohort('Kab. Sidoarjo', 'Jawa Timur', 'Waru', 'Vocational School Graduate Academy (VSGA)', 'IoT & Smart City', 'IoT Solution for Industrial Sector', 78, 68, 6, 4, 20, 2025),
  ...generateCohort('Kab. Sidoarjo', 'Jawa Timur', 'Candi', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Pemasaran Digital Produk Unggulan Sidoarjo', 92, 85, 4, 3, 10, 2025),
  ...generateCohort('Kab. Gresik', 'Jawa Timur', 'Kebomas', 'Government Transformation Academy (GTA)', 'Pengelolaan Dokumen Digital & E-Government', 'Transformasi Digital ASN Pemkab Gresik', 65, 60, 3, 2, 14, 2025),
  ...generateCohort('Kab. Gresik', 'Jawa Timur', 'Manyar', 'Fresh Graduate Academy (FGA)', 'Cloud Computing & DevOps', 'Cloud Engineering for Manufacturing', 60, 52, 5, 3, 18, 2025),

  // Jawa Timur - Banyuwangi & Jember
  ...generateCohort('Kab. Banyuwangi', 'Jawa Timur', 'Banyuwangi', 'Government Transformation Academy (GTA)', 'Pengelolaan Dokumen Digital & E-Government', 'Smart Kampung Data Governance Batch 1', 75, 71, 2, 2, 22, 2025),
  ...generateCohort('Kab. Banyuwangi', 'Jawa Timur', 'Rogojampi', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Digital Marketing Produk Ekraf & Kopi', 88, 80, 5, 3, 9, 2025),
  ...generateCohort('Kab. Jember', 'Jawa Timur', 'Kaliwates', 'Thematic Academy (TA)', 'Digital Marketing & E-Commerce', 'Santri Digipreneur Jawa Timur Batch 1', 80, 72, 5, 3, 11, 2025),
  ...generateCohort('Kab. Jember', 'Jawa Timur', 'Sumbersari', 'Fresh Graduate Academy (FGA)', 'Data Science & Analytics', 'Business Intelligence Analyst', 65, 58, 4, 3, 20, 2025),

  // Jawa Timur - Madura (Bangkalan, Sampang, Pamekasan, Sumenep)
  ...generateCohort('Kab. Bangkalan', 'Jawa Timur', 'Kamal', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Dasar Pemasaran Digital Pemuda Mandiri', 50, 41, 6, 3, 4, 2025),
  ...generateCohort('Kab. Sampang', 'Jawa Timur', 'Sampang', 'Thematic Academy (TA)', 'Digital Marketing & E-Commerce', 'Kewirausahaan Digital Inklusif Sampang', 42, 33, 5, 4, 2, 2025),
  ...generateCohort('Kab. Pamekasan', 'Jawa Timur', 'Pademawu', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Digitalisasi Batik Pamekasan di Marketplace', 60, 54, 4, 2, 5, 2025),
  ...generateCohort('Kab. Sumenep', 'Jawa Timur', 'Kota Sumenep', 'Thematic Academy (TA)', 'Digital Marketing & E-Commerce', 'Literasi Keuangan & Bisnis Digital Kepulauan', 45, 37, 5, 3, 3, 2025),

  // Jawa Timur - Bojonegoro, Tuban, Lamongan, Kediri, Madiun
  ...generateCohort('Kab. Bojonegoro', 'Jawa Timur', 'Dander', 'Vocational School Graduate Academy (VSGA)', 'Pemrograman Web & Mobile', 'Junior Mobile Programmer', 48, 40, 5, 3, 10, 2025),
  ...generateCohort('Kab. Tuban', 'Jawa Timur', 'Palang', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Wirausaha Pesisir Go Digital', 52, 45, 4, 3, 6, 2025),
  ...generateCohort('Kab. Kediri', 'Jawa Timur', 'Pare', 'Fresh Graduate Academy (FGA)', 'Artificial Intelligence & Machine Learning', 'AI for Young Professionals', 58, 51, 4, 3, 19, 2025),
  ...generateCohort('Kota Madiun', 'Jawa Timur', 'Kartoharjo', 'Government Transformation Academy (GTA)', 'Cybersecurity Specialist', 'Penguatan Keamanan Jaringan ASN Madiun', 50, 47, 2, 1, 16, 2025),
  ...generateCohort('Kota Batu', 'Jawa Timur', 'Batu', 'Thematic Academy (TA)', 'UI/UX Design & Product Management', 'Digitalisasi Layanan Pariwisata', 46, 42, 2, 2, 12, 2025),

  // NTB - Kota Mataram
  ...generateCohort('Kota Mataram', 'Nusa Tenggara Barat', 'Mataram', 'Fresh Graduate Academy (FGA)', 'Data Science & Analytics', 'Talenta Data NTB Batch 1', 90, 82, 5, 3, 32, 2025),
  ...generateCohort('Kota Mataram', 'Nusa Tenggara Barat', 'Cakranegara', 'Government Transformation Academy (GTA)', 'Cybersecurity Specialist', 'Tata Kelola Keamanan Informasi Pemprov NTB', 70, 65, 3, 2, 28, 2025),
  ...generateCohort('Kota Mataram', 'Nusa Tenggara Barat', 'Ampenan', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Akselerasi Wirausaha Kuliner Mataram', 85, 79, 4, 2, 8, 2025),

  // NTB - Lombok Barat & Lombok Tengah
  ...generateCohort('Kab. Lombok Barat', 'Nusa Tenggara Barat', 'Gerung', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Digitalisasi Pengrajin Mutiara & Gerabah', 68, 60, 5, 3, 6, 2025),
  ...generateCohort('Kab. Lombok Barat', 'Nusa Tenggara Barat', 'Batu Layar', 'Thematic Academy (TA)', 'UI/UX Design & Product Management', 'Digital Hospitality Pengelola Homestay Senggigi', 55, 48, 4, 3, 10, 2025),
  ...generateCohort('Kab. Lombok Tengah', 'Nusa Tenggara Barat', 'Pujut', 'Thematic Academy (TA)', 'Digital Marketing & E-Commerce', 'Pengembangan Desa Wisata Penyangga Mandalika', 75, 68, 4, 3, 11, 2025),
  ...generateCohort('Kab. Lombok Tengah', 'Nusa Tenggara Barat', 'Praya', 'Vocational School Graduate Academy (VSGA)', 'Cloud Computing & DevOps', 'Junior Network Administrator KEK Mandalika', 60, 51, 5, 4, 18, 2025),

  // NTB - Lombok Timur & Lombok Utara
  ...generateCohort('Kab. Lombok Timur', 'Nusa Tenggara Barat', 'Selong', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Wirausaha Digital Pemuda Lombok Timur', 82, 71, 7, 4, 8, 2025),
  ...generateCohort('Kab. Lombok Timur', 'Nusa Tenggara Barat', 'Masbagik', 'Vocational School Graduate Academy (VSGA)', 'Pemrograman Web & Mobile', 'Junior Web Developer Batch 1', 54, 46, 5, 3, 12, 2025),
  ...generateCohort('Kab. Lombok Utara', 'Nusa Tenggara Barat', 'Tanjung', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Pemberdayaan Digital Pelaku Wisata 3 Gili', 48, 39, 6, 3, 4, 2025),

  // NTB - Pulau Sumbawa (Sumbawa, KSB, Dompu, Bima, Kota Bima)
  ...generateCohort('Kab. Sumbawa', 'Nusa Tenggara Barat', 'Sumbawa', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Pemasaran Digital Madu & Ternak Sumbawa', 55, 47, 5, 3, 5, 2025),
  ...generateCohort('Kab. Sumbawa Barat', 'Nusa Tenggara Barat', 'Taliwang', 'Vocational School Graduate Academy (VSGA)', 'IoT & Smart City', 'Automasi & Pengkabelan Jaringan Industri', 50, 44, 4, 2, 14, 2025),
  ...generateCohort('Kab. Dompu', 'Nusa Tenggara Barat', 'Dompu', 'Thematic Academy (TA)', 'Digital Marketing & E-Commerce', 'Literasi Keuangan & Marketplace Jagung Dompu', 44, 36, 5, 3, 3, 2025),
  ...generateCohort('Kab. Bima', 'Nusa Tenggara Barat', 'Woha', 'Digital Entrepreneurship Academy (DEA)', 'Digital Marketing & E-Commerce', 'Pelatihan Digital Bawang Merah Bima', 46, 37, 6, 3, 3, 2025),
  ...generateCohort('Kota Bima', 'Nusa Tenggara Barat', 'Rasanae Barat', 'Government Transformation Academy (GTA)', 'Pengelolaan Dokumen Digital & E-Government', 'SPBE & Dokumen Digital Pemkot Bima', 52, 48, 2, 2, 16, 2025)
];

// Helper to generate realistic cohort participants
function generateCohort(
  city: string,
  province: 'Jawa Timur' | 'Nusa Tenggara Barat',
  district: string,
  academyName: string,
  themeName: string,
  trainingName: string,
  totalRegistrants: number,
  graduates: number,
  cancellations: number,
  adminFailures: number,
  internationalCerts: number,
  batchYear: number
): ParticipantRecord[] {
  const records: ParticipantRecord[] = [];
  const otherFailures = Math.max(0, totalRegistrants - (graduates + cancellations + adminFailures));
  
  let idCounter = 1;

  // 1. Graduates
  for (let i = 0; i < graduates; i++) {
    const isMale = (i % 2 === 0);
    const hasCert = i < internationalCerts;
    records.push({
      id: `${city.replace(/[^a-zA-Z]/g, '')}-${themeName.slice(0, 3)}-${idCounter}`,
      trainingId: `TRN-${batchYear}-${academyName.slice(0, 3).toUpperCase()}-${idCounter.toString().padStart(4, '0')}`,
      academyName,
      themeName,
      trainingName,
      gender: isMale ? 'Laki-laki' : 'Perempuan',
      province,
      city,
      district,
      subDistrict: `Kel. ${district} Sentra`,
      registrationNumber: `REG-${batchYear}-${province === 'Jawa Timur' ? 'JTM' : 'NTB'}-${city.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'lulus',
      hasInternationalCert: hasCert,
      batchYear
    });
    idCounter++;
  }

  // 2. Cancellations
  for (let i = 0; i < cancellations; i++) {
    records.push({
      id: `${city.replace(/[^a-zA-Z]/g, '')}-${themeName.slice(0, 3)}-${idCounter}`,
      trainingId: `TRN-${batchYear}-${academyName.slice(0, 3).toUpperCase()}-${idCounter.toString().padStart(4, '0')}`,
      academyName,
      themeName,
      trainingName,
      gender: (i % 2 === 0) ? 'Laki-laki' : 'Perempuan',
      province,
      city,
      district,
      subDistrict: `Kel. ${district} Barat`,
      registrationNumber: `REG-${batchYear}-${province === 'Jawa Timur' ? 'JTM' : 'NTB'}-${city.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'pembatalan',
      hasInternationalCert: false,
      batchYear
    });
    idCounter++;
  }

  // 3. Admin Failures
  for (let i = 0; i < adminFailures; i++) {
    records.push({
      id: `${city.replace(/[^a-zA-Z]/g, '')}-${themeName.slice(0, 3)}-${idCounter}`,
      trainingId: `TRN-${batchYear}-${academyName.slice(0, 3).toUpperCase()}-${idCounter.toString().padStart(4, '0')}`,
      academyName,
      themeName,
      trainingName,
      gender: (i % 2 === 1) ? 'Laki-laki' : 'Perempuan',
      province,
      city,
      district,
      subDistrict: `Kel. ${district} Timur`,
      registrationNumber: `REG-${batchYear}-${province === 'Jawa Timur' ? 'JTM' : 'NTB'}-${city.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'tidak_lulus_administrasi',
      hasInternationalCert: false,
      batchYear
    });
    idCounter++;
  }

  // 4. Other Incomplete / Did not pass evaluation
  for (let i = 0; i < otherFailures; i++) {
    records.push({
      id: `${city.replace(/[^a-zA-Z]/g, '')}-${themeName.slice(0, 3)}-${idCounter}`,
      trainingId: `TRN-${batchYear}-${academyName.slice(0, 3).toUpperCase()}-${idCounter.toString().padStart(4, '0')}`,
      academyName,
      themeName,
      trainingName,
      gender: (i % 2 === 0) ? 'Laki-laki' : 'Perempuan',
      province,
      city,
      district,
      subDistrict: `Kel. ${district} Selatan`,
      registrationNumber: `REG-${batchYear}-${province === 'Jawa Timur' ? 'JTM' : 'NTB'}-${city.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'tidak_lulus',
      hasInternationalCert: false,
      batchYear
    });
    idCounter++;
  }

  return records;
}

export const INITIAL_AUDIT_FINDINGS: AuditFinding[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-10-15 08:32:10',
    category: 'privasi',
    severity: 'resolved',
    title: 'Pembersihan Kolom Identitas Pribadi (UU PDP No. 27/2022)',
    description: 'Ditemukan kolom "Nama Peserta" dan "NIK" pada 4 file masukan asal Balai Pelatihan Jatim & NTB.',
    actionTaken: 'Kolom dihapus secara permanen dari memori analitik saat tahap awal pra-pemrosesan. Hanya Nomor Registrasi yang dipertahankan untuk kebutuhan deduplikasi data.'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-10-15 08:32:11',
    category: 'wilayah',
    severity: 'resolved',
    title: 'Standarisasi Penulisan Nama Kabupaten/Kota',
    description: 'Ditemukan inkonsistensi teks nama wilayah: "Surabaya", "KOTA SURABAYA", "SURABAYA", "Kab Lombok Barat", "LOBAR", "Banyuwangi (Kab)".',
    actionTaken: 'Di-standarisasi secara otomatis sesuai dengan master referensi BPS Kemendagri (contoh: "Surabaya" -> "Kota Surabaya", "LOBAR" -> "Kab. Lombok Barat").'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-10-15 08:32:12',
    category: 'duplikasi',
    severity: 'resolved',
    title: 'Pembersihan Baris Duplikat Nomor Registrasi',
    description: 'Terdeteksi 48 baris data pendaftaran ganda (peserta mendaftar ulang pada batch yang sama di 2 file terpisah).',
    actionTaken: 'Entri duplikat telah difilter; hanya record berstatus tertinggi (Lulus > Aktif > Pembatalan) yang dipertahankan.'
  },
  {
    id: 'AUD-004',
    timestamp: '2026-10-15 08:32:14',
    category: 'kolom',
    severity: 'info',
    title: 'Pemetaan Otomatis Kolom Sinonim',
    description: 'Kolom "Bidang Pelatihan" dipetakan ke "Nama Tema" (confidence 97.4%); "Sertifikat Global" dipetakan ke "Sertifikasi Internasional" (confidence 94.1%).',
    actionTaken: 'Pemeriksaan mandiri meloloskan seluruh 13 kolom standar tanpa memerlukan intervensi manual operator.'
  }
];
