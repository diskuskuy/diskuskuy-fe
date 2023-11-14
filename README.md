## Getting Started

1. Buka command prompt lalu masuk ke direktori yang diinginkan
2. Clone repositori program aplikasi front end di GitHub https://github.com/diskuskuy/diskuskuy-fe pada branch develop (merupakan branch yang paling up to date) menggunakan command:

`git clone https://github.com/diskuskuy/diskuskuy-fe`

`git checkout -b develop`

`git pull origin develop`

3. Masuk ke dalam folder proyek diskuskuy-fe kemudian instalasi dependency di dalam package.json menggunakan command:

`npm i`

4. Jalankan program aplikasi front end dengan command:

`npm run dev`

5. Server front end akan berjalan pada port 3000. URL yang digunakan `http://127.0.0.1:3000`.
Buka aplikasi browser yang ada pada komputer Anda, contohnya: Firefox, Internet Explorer, Opera, Google Chrome, Safari, dll. Ketikan alamat url `http://127.0.0.1:3000`  pada baris alamat (address bar) kemudian tekan tombol Enter. Maka halaman login dari aplikasi front end akan muncul dan Anda dapat menggunakan aplikasi front end sesuai di buku petunjuk penggunaan aplikasi.
6. Apabila Anda ingin aplikasi front end memanggil API dari aplikasi back end yang dijalankan di mesin yang sama dengan aplikasi front end dijalankan, Anda perlu mengganti url back end di file .env.development menjadi:

`NEXT_PUBLIC_BE_URL="http://127.0.0.1:8000"`
