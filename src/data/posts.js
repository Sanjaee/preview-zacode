// src/data/posts.js
const posts = [
  {
    id: 1,
    title:
      "Cara Hosting Express.js Dan Prisma orm Di Vercel GRATIS (Membuat RESTFull API CRUD)",
    content:
      "Panduan lengkap cara meng-host aplikasi Express.js dan Prisma ORM di Vercel secara gratis, mulai dari persiapan project hingga deployment. Tutorial ini mencakup pembuatan RESTful API dengan CRUD untuk mengelola database secara efisien.",
    description:
      "Dalam tutorial ini, kamu akan belajar cara meng-host aplikasi Express.js yang menggunakan Prisma ORM untuk mengelola database, di Vercel secara gratis. Dengan menggunakan Vercel, kamu bisa dengan mudah memanfaatkan platform yang handal dan performa tinggi untuk meng-host aplikasi Node.js dengan RESTful API yang lengkap. Kita akan membahas langkah demi langkah mulai dari persiapan project, konfigurasi Prisma ORM, hingga proses deploy ke Vercel. Tutorial ini juga mencakup pembuatan CRUD API (Create, Read, Update, Delete) untuk berinteraksi dengan database. Di akhir tutorial, kamu akan memiliki aplikasi backend yang berfungsi penuh dan siap diakses secara online.",
    image: "https://res.cloudinary.com/dgmlqboeq/image/upload/v1727825259/folder%20BLOG%20ZACODE/Next%20js/Screenshot_2024-10-02_062703_xasyzs.png",
    category: "Express.js",
    contentSections: [
      {
        type: "text",
        content:
          "Siapkan project Express.js yang sudah di buat, Jika tidak ada project nya maka bisa Download project saya di sini sebagai latihan saja",
      },

      {
        type: "code",
        content: `https://github.com/Sanjaee/Express-OTP.git`,
      },

      {
        type: "text",
        content: "jika sudah ada project nya bisa skip di atas",
      },

      {
        type: "text",
        content:
          "sebelum di hosting, buat database dulu untuk menghost data nya, saya menggunakan supabase dan prisma, jika sudah membuat dan migrasi data nya di supabase bisa skip vidio toturial di bawah ini",
      },

      {
        type: "video",
        src: "https://res.cloudinary.com/dgmlqboeq/video/upload/v1727487355/folder%20BLOG%20ZACODE/Next%20js/lv_0_20240928082925_gpuc9e.mp4",
      },

      {
        type: "text",
        content:
          "Masukan url database supabase ke dalam variabel DATABASE_URL di .env UBAH PASSWORD NYA DAN PORT NYA JADI 5432",
      },

      {
        type: "code",
        content: `
DATABASE_URL="postgresql://postgres.seognlkyzwtxjzitdczx:Ezagaming2005.@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres" // SESUAIKAN PASSWORD DAN PORT NYA 5432`,
      },

      {
        type: "text",
        content: "kemudian migrasi database nya, jalankan perintah ini",
      },

      {
        type: "code",
        content: `npx prisma migrate dev`,
      },

      {
        type: "text",
        content:
          "jika sudah di migrasi database nya, buat FILE vercel.json sejajar dengan file utama (index.js), Lalu salin code Konfigurasi vercel di bawah ini",
      },

      {
        type: "code",
        content: `{
  "version": 2,
  "builds": [
    {
      "src": "index.js",        //sesuaikan dengan nama file utama nya di sini saya menggunakan index.js (hapus comment ini)
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"  //sesuaikan dengan nama file utama nya di sini saya menggunakan index.js  (hapus comment ini)
    }
  ]
}`,
      },

      {
        type: "text",
        content: "Struktur file nya seperti ini",
      },

      {
        type: "code",
        content: `.
├── prisma
│   └── schema.prisma
├── controllers
│   └── authController.js
├── middleware
│   └── authMiddleware.js
├── routes
│   └── authRoutes.js
├── models
│   └── userModel.js
├── index.js
├── .gitignore
├── vercel.json
├── package.json
└── .env`,
      },

      {
        type: "text",
        content: "Lalu konfigurasi prisma di package.json (wajib)",
      },

      {
        type: "code",
        content: ` "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js",
    "dev": "nodemon index.js",
    "postinstall": "prisma generate"  // tambahkan ini di scripts, package.json 
  },`,
      },

      {
        type: "text",
        content:
          "Sekarang Buat repositori dan push code ini ke repositri github, JIKA PROJECT CLONE DARI https://github.com/Sanjaee/Express-OTP.git TOLONG HAPUS DULU FILE .git nya, cara ada di bawah ini",
      },

      {
        type: "video",
        src: `https://res.cloudinary.com/dgmlqboeq/video/upload/v1727822364/folder%20BLOG%20ZACODE/Next%20js/2024-10-02_05-37-53_lvki5z.mp4`,
      },

      {
        type: "text",
        content: "cara push dan membuat repositori ada vidio di bawah ini ",
      },

      {
        type: "video",
        src: `https://res.cloudinary.com/dgmlqboeq/video/upload/v1727758117/folder%20BLOG%20ZACODE/Next%20js/Download_eiwefw.mp4`,
      },

      {
        type: "text",
        content:
          "jika sudah di push, buat akun vercel jika sudah ada bisa skip vidio ini",
      },

      {
        type: "video",
        src: "https://res.cloudinary.com/dgmlqboeq/video/upload/v1727822787/folder%20BLOG%20ZACODE/Next%20js/2024-10-01_11-53-04_yozpox.mp4",
      },

      {
        type: "text",
        content:
          "jika sudah di hubungkan dengan github maka pilih project nya lalu klik import, vidio konfigurasi di bawah ini",
      },

      {
        type: "video",
        src: "https://res.cloudinary.com/dgmlqboeq/video/upload/v1727823714/folder%20BLOG%20ZACODE/Next%20js/2024-10-02_05-59-57_xh3pvk.mp4",
      },

      {
        type: "text",
        content:
          "jika tampilan nya Cannot GET / maka sudah berhasil silhakan test endpoin API nya, untuk yang clone project saya bisa test hit di postman, JANGAN LUPA UBAH http://localhost:3000 dengan Nama domain yang di deploy tadi contoh https://express-otp.vercel.app/api/barang",
      },

      {
        type: "text",
        content: 'TEST POST di posman ubah method nya ke POST'
      },

      {
        type: "code",
        content: "http://localhost:3000/api/barang",
      },

      {
        type: "code",
        content: `{
  "nama": "Laptop",
  "deskripsi": "Laptop Gaming",
  "harga": 15000000,
  "stok": 10
}
`,
      },

      {
        type: "text",
        content: 'TEST GET di posman ubah method nya ke GET'
      },

      {
        type: "code",
        content: "http://localhost:3000/api/barang",
      },


      {
        type: "text",
        content: 'TEST GET by ID (AMBIL 1 BARANG DENGAN ID) di posman ubah method nya ke GET'
      },

      {
        type: "code",
        content: "http://localhost:3000/api/barang/masukanIDBarang",
      },

      {
        type: "text",
        content: 'TEST PUT(UPDATE) di posman'
      },

      {
        type: "code",
        content: "http://localhost:3000/api/barang/masukanIDBarang",
      },

      
      {
        type: "code",
        content: `{
  "nama": "Laptop UPDATE BARANG",
  "deskripsi": "Laptop Gaming",
  "harga": 15000000,
  "stok": 10
}
`,
      },


      {
        type: "text",
        content: 'TEST DELETE(HAPUS) di posman ubah method nya ke DELETE'
      },

      {
        type: "code",
        content: "http://localhost:3000/api/barang/masukanIDBarang",
      },


      {
        type: "text",
        content: 'Jika ada error bisa dm saya di tiktok https://www.tiktok.com/@ahmadafriza25'
      },
    ],
  },
];

export default posts;
