function Konyv(cim, szerzo, kiadasiEv, oldalszam, kolcsonozve, kolcsonoz, visszahoz) {
    this.cim = cim;
    this.szerzo = szerzo;
    this.kiadasiEv = kiadasiEv;
    this.oldalszam = oldalszam;
    this.kolcsonozve = kolcsonozve;
    this.kolcsonoz = kolcsonoz;
    this.visszahoz = visszahoz;



}


const egriCsillagok = new Konyv("Egri csillagok", "Gárdonyi Géza", 1901, 600, false);
const toldi = new Konyv("Toldi", "Arany János", 1847, 120, false);
const palUtcaifiuk = new Konyv("Pál utcai fiúk", "Molnár Ferenc", 1907, 240, false);
const legyJoMindhalalig = new Konyv("Légy jó mindhalálig", "Móricz Zsigmond", 1920, 280, false);
const aranyEmber = new Konyv("Az arany ember", "Jókai Mór", 1872, 450, false)

const Konyvek = [
    egriCsillagok, toldi, palUtcaifiuk, legyJoMindhalalig, aranyEmber
]





const cim = document.getElementById("cimInput")
const szerzo = document.getElementById("szerzoInput")
const kiadas = document.getElementById("evInput")
const oldal = document.getElementById("oldalInput")



function tablazatfeltoltese() {
    document.getElementById("book-table-body").innerHTML = Konyvek.map((konyv, index) => `
        <tr>
            <td>${konyv.cim}</td>
            <td>${konyv.szerzo}</td>
            <td>${konyv.kiadasiEv}</td>
            <td>${konyv.oldalszam}</td>
            <td>${konyv.kolcsonozve ? "Igen" : "Nem"}</td>
            <td class="actions">
                <button onclick="konyvKolcsonzes(${index})"
                    ${konyv.kolcsonozve ? "disabled" : ""}>
                    Kölcsönöz
                </button>

                <button onclick="konyvVisszahozatal(${index})"
                    ${!konyv.kolcsonozve ? "disabled" : ""}>
                    Visszahoz
                </button>
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
            kolcsonozve: false
        })

        tablazatfeltoltese()
        alert("A könyv sikeresen hozzá lett adva!")
        cim.value = ""
        szerzo.value = ""
        kiadas.value = ""
        oldal.value = ""


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


document.getElementById("osszesKonyv").addEventListener("click", function() {
    let osszes = Konyvek

    document.getElementById("book-table-body").innerHTML = osszes.map((konyv) => `
        <tr>
            <td>${konyv.cim}</td>
            <td>${konyv.szerzo}</td>
            <td>${konyv.kiadasiEv}</td>
            <td>${konyv.oldalszam}</td>
            <td>${konyv.kolcsonozve ? "Igen" : "Nem"}</td>
            <td>
                <button onclick="konyvKolcsonzes(${Konyvek.indexOf(konyv)})">Kölcsönöz</button>
                <button onclick="konyvVisszahozatal(${Konyvek.indexOf(konyv)})">Visszahoz</button>
            </td>
        </tr>
    `).join("");
});

















document.getElementById("szabadKonyvek").addEventListener("click",function()
{
    let elerheto=Konyvek.filter(konyv=>konyv.kolcsonozve===false)
    document.getElementById("book-table-body").innerHTML=elerheto.map((konyv)=>`
        <tr>
            <td>${konyv.cim}</td>
            <td>${konyv.szerzo}</td>
            <td>${konyv.kiadasiEv}</td>
            <td>${konyv.oldalszam}</td>
            <td>${konyv.kolcsonozve ? "Igen" : "Nem"}</td>
        
               </tr>`).join("");



})


