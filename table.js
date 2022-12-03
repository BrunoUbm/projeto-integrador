document.addEventListener('DOMContentLoaded', async (ev) => {
    const periodicData = await (await fetch('./tableJSON.json')).json();

    const elemTable = document.getElementById('table');

    const tableArr = [[], [], [], [], [], [], [], [], [], []];

    for(const atomicData of periodicData.elements) {
        tableArr[atomicData.ypos - 1][atomicData.xpos - 1] = atomicData;
    }

    console.log(tableArr);

    for(const tableRow of tableArr) {
        let textToInsert = '';
        textToInsert += '<tr>';
        for(const tableCol of tableRow) {
            if(tableCol) {
                textToInsert += `<td onClick="onCardClick(this)" class="table-data">
                    <div class="content">
                        <span class="elem-number">${tableCol.number}</span>
                        <span class="elem-symbol">${tableCol.symbol}</span>
                        <span class="elem-name">${tableCol.name}</span>
                        <span class="elem-mass">${tableCol.atomic_mass.toFixed(3)}</span>
                    </div>
                </td>`;
            }
            else {
                textToInsert += '<td class="table-data-empty"></td>';
            }
        }
        textToInsert += '</tr>';

        elemTable.innerHTML += textToInsert;
    }
});

function onCardClick(ev) {

    const elemId = ev.getElementsByClassName('elem-number')[0].innerText;

    console.log(ev);
    
    ev.classList.add('.table-data-actived');
}