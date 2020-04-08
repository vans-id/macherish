const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);

  res.status(201).json({ message: "Post added successfully" });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "k123bhjkasbd",
      title: "iPhone 11 Pro 64 GB",
      content: `
      Kode : #CS1080
      💰IDR 14.500.000 Nego
      💁🏻‍♂️Eliesar Yosua P
      📱 085695279127 - WA
      —
      Face ID Lancar 💯
      True tone💯
      LCD Original💯
      Kamera jernih💯
      Kamera Silent💯
      icloud bersih💯
      No dead pixel💯
      Wifi normal💯
      Mesin 💯 normal
      Battery Health 100%
      Model Regional LL/A
      US✅
      __
      Kondisi fisik?
      98% silahkan cek foto & videonya 🔥
      —
      Kondisi mesin? Siap pakai bebas reset. Mesin bekerja dengan Normal💯
      Garansi Inter aktif sampai dengan 7 Desember 2020✅
      —
      Kelengkapan? Fullset✅
      unit✅
      box✅
      Charger✅
      earphone✅
      —
      `,
    },
    {
      id: "12l3kjlasd",
      title: "MacBook Pro Retina 13 Inch 2015",
      content: `
      Kode : #CS1077
        💸IDR 11.200.000 nego
        💁🏻‍♂️ Kholid Abdillah
        🤳🏻 085731825957 - Whatsapp
        __
        Detail Mac 💻
        Processor 2.7 GHz Intel Core i5
        RAM 8GB 1867 MHz DDR3
        Graphics Intel Iris Graphics 6100 1536 MB
        SSD 128GB ✅
        Cycle count 569💥
        Full charge capacity 5613mAh
        Status Battery Normal✅
        OS Mojave✅
        __
        Kondisi fisik ?
        95%. Silahkan cek foto & video👌
        Wifi 💯
        Sound aman 💯
        body💯
        No dead pixel💯
        Mesin aman💯
        engsel layar💯
        keyboard aman💯
        port USB Normal💯
        Facetime 720p HD Cam💯
        OS Mojave💯
        __
        Kelengkapan ?
        💥Unit Mac✅
        💥Charger✅
        __
        Kondisi mesin ? Bekerja dengan Normal siap pakai✅
      `,
    },
  ];

  res.status(200).json({ message: "Posts fetched successfully", posts });
});

module.exports = app;
