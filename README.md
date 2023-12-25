# Panduan Instalasi

## Front End

1. Pindah ke direktori front-end:
    ```
    cd front-end
    ```

2. Salin file `.env.example` menjadi `.env`:
    ```
    cp .env.example .env
    ```

3. Install dependensi npm:
    ```
    npm i
    ```

4. Jalankan server pengembangan:
    ```
    npm run dev
    ```

## Back End

1. Pindah ke direktori back-end:
    ```
    cd back-end
    ```

2. Jalankan Docker Compose untuk memulai layanan backend dalam mode detached (di latar belakang):
    ```
    docker-compose up -d
    ```

3. Install dependensi npm:
    ```
    npm i
    ```

4. Mulai server backend dalam mode pengembangan:
    ```
    npm run start:dev
    ```

Pastikan untuk mengikuti langkah-langkah di atas dengan urutan yang benar untuk mengatur front end dan back end aplikasi ini.
