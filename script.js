function Konyv(cim, szerzo, kiadasiEv, oldalszam,kategoria, kolcsonozve, kolcsonoz, visszahoz) {
    this.cim = cim;
    this.szerzo = szerzo;
    this.kiadasiEv = kiadasiEv;
    this.oldalszam = oldalszam;
    this.kategoria=kategoria
    this.kolcsonozve = kolcsonozve;
    this.kolcsonoz = kolcsonoz;
    this.visszahoz = visszahoz;



}


const egriCsillagok = new Konyv("Egri csillagok", "Gárdonyi Géza", 1901, 600,"Történelmi regény", false);
const toldi = new Konyv("Toldi", "Arany János", 1847, 120,"Elbeszélő költemény", false);
const palUtcaifiuk = new Konyv("Pál utcai fiúk", "Molnár Ferenc", 1907, 240,"Regény", false);
const legyJoMindhalalig = new Konyv("Légy jó mindhalálig", "Móricz Zsigmond", 1920, 280,"Regény",false);
const aranyEmber = new Konyv("Az arany ember", "Jókai Mór", 1872, 450,"Regény", false)
const harryPotter = new Konyv("Harry Potter és a bölcsek köve", "J. K. Rowling", 1997, 320, "Fantasy", false);
const hobbit = new Konyv("A hobbit", "J. R. R. Tolkien", 1937, 310, "Fantasy, kalandregény", false);

const Konyvek = [
    egriCsillagok, toldi, palUtcaifiuk, legyJoMindhalalig, aranyEmber,harryPotter,hobbit
]





const cim = document.getElementById("cimInput")
const szerzo = document.getElementById("szerzoInput")
const kiadas = document.getElementById("evInput")
const oldal = document.getElementById("oldalInput")
const kategoria=document.getElementById("kategoriaInput")



function tablazatfeltoltese() {
    document.getElementById("book-table-body").innerHTML = Konyvek.map((konyv, index) => `
        <tr>
            <td>${konyv.cim}</td>
            <td>${konyv.szerzo}</td>
            <td>${konyv.kiadasiEv}</td>
            <td>${konyv.oldalszam}</td>
            <td>${konyv.kategoria}</td>
            <td>${konyv.kolcsonozve ? "Igen" : "Nem"}</td>
            <td class="actions">
                <button onclick="konyvKolcsonzes(${index})"
                    ${konyv.kolcsonozve}>
                    Kölcsönöz
                </button>

                <button onclick="konyvVisszahozatal(${index})"
                    ${!konyv.kolcsonozve}>
                    Visszahoz
                </button>
                <button class="torles" onclick="torles(event)">Törlés</button>
            </td>
        </tr>
    `).join("");
}
tablazatfeltoltese()

hozzaadasGomb.addEventListener("click", function () {
    try {
        Konyvek.push({
            cim: cim.value,
            szerzo: szerzo.value,
            kiadasiEv: kiadas.value,
            oldalszam: oldal.value,
            kategoria:kategoria.value,
            kolcsonozve: false
        })

        tablazatfeltoltese()
        alert("A könyv sikeresen hozzá lett adva!")
        cim.value = ""
        szerzo.value = ""
        kiadas.value = ""
        oldal.value = ""
        kategoria.value=""


    }
    catch (error) {
        alert(error.message);
        return;
    }
})
function konyvKolcsonzes(index) {
    try {
        if (Konyvek[index].kolcsonozve) {
            throw new Error("Ez a könyv már ki van kölcsönözve!");
        }
        Konyvek[index].kolcsonozve = true;
        tablazatfeltoltese();
        alert(`A(z) "${Konyvek[index].cim}" sikeresen kikölcsönözve!`);
    } catch (error) {
        alert(error.message);
    }
}

function konyvVisszahozatal(index) {
    try {
        if (!Konyvek[index].kolcsonozve) {
            throw new Error("Ez a könyv nem volt kikölcsönözve!");
        }
        Konyvek[index].kolcsonozve = false;
        tablazatfeltoltese();
        alert(`A(z) "${Konyvek[index].cim}" sikeresen visszahozva!`);
    } catch (error) {
        alert(error.message);
    }
}


document.getElementById("osszesKonyv").addEventListener("click", function () {
    let osszes = Konyvek

    document.getElementById("book-table-body").innerHTML = osszes.map((konyv) => `
        <tr>
            <td>${konyv.cim}</td>
            <td>${konyv.szerzo}</td>
            <td>${konyv.kiadasiEv}</td>
            <td>${konyv.oldalszam}</td>
            <td>${konyv.kategoria}</td>
            <td>${konyv.kolcsonozve ? "Igen" : "Nem"}</td>
            <td>
                <button onclick="konyvKolcsonzes(${Konyvek.indexOf(konyv)})">Kölcsönöz</button>
                <button onclick="konyvVisszahozatal(${Konyvek.indexOf(konyv)})">Visszahoz</button>
            </td>
        </tr>
    `).join("");
});



document.getElementById("szabadKonyvek").addEventListener("click", function () {
    let elerheto = Konyvek.filter(konyv => konyv.kolcsonozve === false)
    document.getElementById("book-table-body").innerHTML = elerheto.map((konyv) => `
        <tr>
            <td>${konyv.cim}</td>
            <td>${konyv.szerzo}</td>
            <td>${konyv.kiadasiEv}</td>
            <td>${konyv.oldalszam}</td>
            <td>${konyv.kategoria}</td>
            <td>${konyv.kolcsonozve ? "Igen" : "Nem"}</td>
        
               </tr>`).join("");



})


document.getElementById("legregebbiKonyv").addEventListener("click", function () {
    let legregebbi = Konyvek[0];

    Konyvek.forEach(function (konyv) {
        if (konyv.kiadasiEv < legregebbi.kiadasiEv) {
            legregebbi = konyv;
        }
    });

    document.getElementById("book-table-body").innerHTML = `
        <tr>
            <td>${legregebbi.cim}</td>
            <td>${legregebbi.szerzo}</td>
            <td>${legregebbi.kiadasiEv}</td>
            <td>${legregebbi.oldalszam}</td>
            <td>${legregebbi.kategoria}</td>
            <td>${legregebbi.kolcsonozve ? "Igen" : "Nem"}</td>
        </tr>`;
});

document.getElementById("legvastagabbKonyv").addEventListener("click", function () {

    let legvastagabb = Konyvek[0]
    Konyvek.forEach(function (konyv) {
        if (konyv.oldalszam > legvastagabb.oldalszam) {
            legvastagabb = konyv
        }
        document.getElementById("book-table-body").innerHTML = `
        <tr>
            <td>${legvastagabb.cim}</td>
            <td>${legvastagabb.szerzo}</td>
            <td>${legvastagabb.kiadasiEv}</td>
            <td>${legvastagabb.oldalszam}</td>
            <td>${legvastagabb.kategoria}</td>
            <td>${legvastagabb.kolcsonozve ? "Igen" : "Nem"}</td>
        </tr>`;


    })

})

document.getElementById("atlagosOldalszam").addEventListener("click", function () {
let osszes=0
Konyvek.forEach(function(konyv)
{
    osszes+=Number(konyv.oldalszam)
})
let atlag=osszes/Konyvek.length
alert("Az átlagos oldalszám:"+atlag+" "+"oldal")
})


function torles(e) {
    e.stopPropagation();

    if (e.target.classList.contains("torles")) {
        let sor = e.target.closest("tr");
        let sorIndex = sor.rowIndex - 1;

        Konyvek.splice(sorIndex, 1);

        tablazatfeltoltese();

        alert("A könyv törölve!");
    }
}






