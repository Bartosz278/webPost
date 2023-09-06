function getData(){
function obliczRozniceDaty(data) {

  const dzisiaj = new Date();
  const podanaData = new Date(data);
  let roznicaLat = dzisiaj.getFullYear() - podanaData.getFullYear();
  if (dzisiaj.getMonth() < podanaData.getMonth() || (dzisiaj.getMonth() === podanaData.getMonth() && dzisiaj.getDate() < podanaData.getDate())) {
    roznicaLat--;
  }

  let roznicaMiesiecy = dzisiaj.getMonth() - podanaData.getMonth();
  if (roznicaMiesiecy < 0) {
    roznicaMiesiecy += 12;
  }
  let roznicaDni = dzisiaj.getDate() - podanaData.getDate();

  if (roznicaDni < 0) {
    const ostatniDzienMiesiaca = new Date(dzisiaj.getFullYear(), dzisiaj.getMonth(), 0).getDate();
    roznicaDni = ostatniDzienMiesiaca - podanaData.getDate() + dzisiaj.getDate();
    roznicaMiesiecy--;
  }

  return {
    lata: roznicaLat,
    miesiace: roznicaMiesiecy,
    dni: roznicaDni,
  }
}

let dayValue = Number(document.getElementById('day').value);
let monthValue = Number(document.getElementById('month').value);
let yearValue = Number(document.getElementById('year').value);

const dataUrodzenia = yearValue+'-'+monthValue+'-'+dayValue; 
const roznica = obliczRozniceDaty(dataUrodzenia);


if(dayValue != '' && monthValue != '' && yearValue != ''){
        document.getElementById('dayOutput').innerHTML = roznica.dni+' ';
        document.getElementById('monthOutput').innerHTML = roznica.miesiace+' ';
        document.getElementById('yearOutput').innerHTML = roznica.lata+' ';
    }
    else{
        console.log('puste');
    }
    function dniOdDaty(data) {
        const dzisiaj = new Date();
        const podanaData = new Date(data);
        const roznicaMs = dzisiaj - podanaData;
        const roznicaDni = Math.floor(roznicaMs / (1000 * 60 * 60 * 24));
        return roznicaDni;
      }
      const iloscDni = dniOdDaty(dataUrodzenia);
      console.log(`Ilość dni od daty: ${iloscDni}`);

}