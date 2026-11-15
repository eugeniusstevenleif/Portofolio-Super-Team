// 1. FUNGSI INTERAKTIF BACKGROUND (SPOTLIGHT MOUSE)
        // Setiap kali mouse digerakkan di layar, posisi cahaya radial bakal ngikutin koordinat kursor
        document.addEventListener("mousemove", function(event) {
            const spotlight = document.getElementById("bgSpotlight");
            spotlight.style.setProperty("--x", event.clientX + "px");
            spotlight.style.setProperty("--y", event.clientY + "px");
        });

        // 2. FUNGSI GANTI TEMA BACKGROUND
        // Mengganti tema latar belakang secara bergantian (Daylight -> Midnight Gamer -> Night-Wind Mystic)
        const daftarTema = ["", "theme-gamer", "theme-mystic"];
        let indeksTemaSekarang = 0;

        function gantiTemaBackground() {
            // Hapus kelas tema sebelumnya kalau ada
            if (daftarTema[indeksTemaSekarang] !== "") {
                document.body.classList.remove(daftarTema[indeksTemaSekarang]);
            }
            // Geser ke indeks tema berikutnya secara melingkar
            indeksTemaSekarang = (indeksTemaSekarang + 1) % daftarTema.length;
            
            // Pasang kelas tema yang baru dipilih
            if (daftarTema[indeksTemaSekarang] !== "") {
                document.body.classList.add(daftarTema[indeksTemaSekarang]);
            }
        }

        // 3. FUNGSI TOMBOL SURPRISE (POP-UP RANDOM LUCU)
        // Kumpulan pesan dan emoji acak yang bakal muncul tiap kali tombol surprise diklik
        const daftarKejutanLucu = [
            { emoji: "☕", teks: "Fun Fact: 90% kode Java & Springboot Sinclair ditulis dengan doa sebelum deadline!" },
            { emoji: "🎮", teks: "Status Gaming: Bilangnya cuma mau login 15 menit buat daily quest, eh tau-tau udah jam 2 pagi!" },
            { emoji: "🐛", teks: "Momen Langka: Error NullPointerException hilang sendiri setelah laptop direstart tanpa ngubah kode apa-apa." },
            { emoji: "😴", teks: "Skill Pasif Aktif: Bisa ketiduran nyenyak dalam 3 detik setelah nutup IDE IntelliJ / VS Code." },
            { emoji: "✨", teks: "Pesan Rahasia: Jangan lupa istirahat ya! Coding terus tanpa ngemil nanti error-nya makin nambah lho~" }
        ];

        function bukaSurpriseModal() {
            // Pilih satu indeks acak berdasarkan panjang array daftarKejutanLucu
            const indeksAcak = Math.floor(Math.random() * daftarKejutanLucu.length);
            const kejutanTerpilih = daftarKejutanLucu[indeksAcak];

            // Masukkan emoji dan teks acak ke dalam elemen pop-up modal
            document.getElementById("surpriseEmoji").innerText = kejutanTerpilih.emoji;
            document.getElementById("surpriseText").innerText = kejutanTerpilih.teks;

            // Munculkan jendela pop-up ke tengah layar
            document.getElementById("surpriseModal").style.display = "flex";
        }

        // Menutup jendela pop-up kalau tombol tutup diklik atau area gelap di luar kotak diklik
        function tutupSurpriseModal(event, paksaTutup = false) {
            if (paksaTutup || event.target.id === "surpriseModal") {
                document.getElementById("surpriseModal").style.display = "none";
            }
        }

        // 4. FUNGSI ANIMASI PET-PET INTERAKTIF
        // Memberikan reaksi lompat, ekspresi berubah, dan memunculkan partikel hati saat pet diklik
        let jumlahElusan = 0;

        function elusPet() {
            jumlahElusan++;
            const petAvatar = document.getElementById("petAvatar");
            const petStatus = document.getElementById("petStatusText");
            const petContainer = document.getElementById("petContainer");

            // Reset dan jalankan ulang animasi lompat
            petAvatar.classList.remove("pet-jump-anim");
            void petAvatar.offsetWidth; // Trik CSS reflow biar animasi bisa diulang berkali-kali
            petAvatar.classList.add("pet-jump-anim");

            // Ubah ekspresi kucing dan teks status sesuai seberapa sering di-elus
            if (jumlahElusan < 3) {
                petAvatar.innerText = "😺";
                petStatus.innerText = `Purrr~ Enak banget di-elus! (${jumlahElusan}x elus)`;
            } else if (jumlahElusan < 7) {
                petAvatar.innerText = "😻";
                petStatus.innerText = `Mochi sayang banget sama Sinclair! (${jumlahElusan}x elus)`;
            } else {
                petAvatar.innerText = "😽";
                petStatus.innerText = `Mood Maksimal! Siap nemenin ngoding Java! (${jumlahElusan}x elus)`;
            }

            // Bikin elemen partikel hati melayang di dekat kucing
            const hati = document.createElement("span");
            hati.innerText = "💖";
            hati.className = "floating-heart";
            hati.style.right = (20 + Math.random() * 25) + "px";
            hati.style.top = "10px";
            petContainer.appendChild(hati);

            // Hapus partikel hati dari HTML setelah animasinya selesai (900ms) biar memori tetap bersih
            setTimeout(() => {
                hati.remove();
            }, 900);
        }

        // 5. FUNGSI GRAFIK SKILL DENGAN PERSENTASE ANIMASI
        // Mengisi lebar progress bar dan menghitung angka persentase dari 0% ke nilai target
        function animasiGrafikSkill() {
            const semuaSkill = document.querySelectorAll(".skill-item");

            semuaSkill.forEach((item) => {
                const targetPersen = parseInt(item.getAttribute("data-percent"));
                const barFill = item.querySelector(".progress-fill");
                const teksPersen = item.querySelector(".skill-percent-text");

                // Kembalikan ke 0% dulu sebelum animasi dimulai
                barFill.style.width = "0%";
                teksPersen.innerText = "0%";

                // Beri jeda sedikit biar transisi CSS berjalan mulus
                setTimeout(() => {
                    barFill.style.width = targetPersen + "%";
                    teksPersen.innerText = targetPersen + "%";
                }, 150);
            });
        }

        // Jalankan animasi grafik skill secara otomatis begitu halaman selesai dibuka
        window.addEventListener("DOMContentLoaded", animasiGrafikSkill);