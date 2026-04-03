export const samplePRD = {
  "title": "Nusantara Marketplace",
  "version": "1.0.0",
  "vision": "Menjadi platform e-commerce nomor satu yang menghubungkan UMKM lokal dengan pasar global melalui teknologi AI dan logistik terintegrasi.",
  "overview": "Nusantara Marketplace adalah platform jual beli modern yang difokuskan pada pemberdayaan UMKM Indonesia. Sistem ini mencakup manajemen stok otomatis, integrasi pembayaran nasional, dan dashboard analitik berbasis AI.",
  "userStories": [
    {
      "id": 1,
      "epic": "Onboarding",
      "role": "Penjual UMKM",
      "action": "mendaftarkan toko dengan verifikasi NIB otomatis",
      "benefit": "bisa mulai berjualan secara legal dalam hitungan menit",
      "priority": "High",
      "storyPoints": 5,
      "acceptanceCriteria": [
        "Sistem dapat menautkan data OSS",
        "Dokumen KTP otomatis terbaca OCR",
        "SMS verifikasi terkirim < 10 detik"
      ]
    },
    {
      "id": 2,
      "epic": "Transaksi",
      "role": "Pembeli",
      "action": "menggunakan fitur 'Beli Sekarang' dengan QRIS",
      "benefit": "pembayaran instan tanpa perlu upload bukti transfer",
      "priority": "High",
      "storyPoints": 3,
      "acceptanceCriteria": [
        "QRIS dinamis tergenerate otomatis",
        "Status pesanan berubah otomatis setelah bayar",
        "Konfirmasi email terkirim instan"
      ]
    }
  ],
  "functionalSpecs": [
    {
      "module": "Manajemen Produk",
      "features": ["Upload Bulk via Excel", "Variant Management", "AI Image Background Remover"],
      "description": "Modul untuk mengelola katalog produk penjual dengan bantuan AI untuk pembersihan foto produk."
    },
    {
      "module": "Sistem Pembayaran",
      "features": ["Integrasi QRIS", "Virtual Account", "E-Wallet"],
      "description": "Gerbang pembayaran terpadu yang mendukung berbagai metode pembayaran populer di Indonesia."
    }
  ],
  "databaseSchema": "CREATE TABLE users (\n  id UUID PRIMARY KEY,\n  email VARCHAR(255) UNIQUE,\n  role VARCHAR(50) DEFAULT 'buyer',\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\nCREATE TABLE products (\n  id UUID PRIMARY KEY,\n  seller_id UUID REFERENCES users(id),\n  name VARCHAR(255),\n  price DECIMAL(12,2),\n  stock INT DEFAULT 0,\n  category VARCHAR(100)\n);\n\nCREATE TABLE orders (\n  id UUID PRIMARY KEY,\n  buyer_id UUID REFERENCES users(id),\n  total_amount DECIMAL(12,2),\n  status VARCHAR(50) DEFAULT 'pending',\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\nCREATE TABLE order_items (\n  id UUID PRIMARY KEY,\n  order_id UUID REFERENCES orders(id),\n  product_id UUID REFERENCES products(id),\n  quantity INT,\n  price DECIMAL(12,2)\n);",
  "techStack": {
    "frontend": ["Next.js 14", "Tailwind CSS", "Lucide Icons"],
    "backend": ["Node.js (NestJS)", "Redis for Caching", "BullMQ for Jobs"],
    "database": ["PostgreSQL (Supabase)", "ElasticSearch for Search"],
    "infrastructure": ["Vercel Edge Functions", "S3 Storage", "Cloudflare WAF"]
  },
  "systemArchitecture": "Arsitektur berbasis Microservices dengan API Gateway untuk menangani trafik tinggi. Menggunakan Redis untuk caching katalog produk dan BullMQ untuk antrean pengiriman notifikasi/email secara asinkron.",
  "apiDocs": [
    {"method": "GET", "endpoint": "/api/v1/products", "auth": "None", "desc": "Mengambil daftar produk publik"},
    {"method": "POST", "endpoint": "/api/v1/orders", "auth": "JWT Token", "desc": "Membuat pesanan baru"}
  ],
  "roadmap": [
    {"phase": "MVP Launch", "duration": "4 Weeks", "deliverables": ["Auth", "Katalog", "QRIS"], "milestone": "Beta Testing 100 UMKM"},
    {"phase": "Scale & AI", "duration": "8 Weeks", "deliverables": ["AI Recommendation", "Live Chat"], "milestone": "10.000 Transaksi pertama"}
  ],
  "designTips": "Gunakan warna primer Deep Indigo (#1A237E) untuk kesan profesional dan aksen Gold (#FFD700) untuk elemen CTA. Pastikan alur 'Add to Cart' ke 'Payment' maksimal 3 klik."
};
