import {times, bands, timetable} from './data.js';

function getBandlist() {
    return document.getElementById("bandlist");
}

function setup() {
    const bandlist = getBandlist();
    const template = document.getElementById("check-template");
    for (const i in bands) {
        const bandElem = template.cloneNode(true);
        bandElem.setAttribute('id', 'band-' + i);
        bandlist.appendChild(bandElem);

        let firstNode = bandElem.children[0];

        firstNode.id = "band-check-" + i;
        const lastChild = bandElem.children[1];
        lastChild.setAttribute('for', "band-check-" + i);
        const band = bands[i];
        lastChild.textContent = band.Banda;
    }

    const escenarios = Array.from(new Set(bands.map(p => p.Escenario))).sort();
    const hrhead = document.getElementById('tblhdr-hour')
    hrhead.append(...
        escenarios.map(p => {
            const elem = document.createElement('th');
            elem.innerText = p;
            return elem;
        })
    );
    const mappings = {};
    for (const escenario of escenarios) mappings[escenario] = {};
    for (const band of bands) {
        mappings[band.Escenario][band.Hora] = band.Banda;
    }
    const hours = Array.from(new Set(bands.map(p => p.Hora))).sort();

    for (const hora of hours) {
        const tr = document.createElement("tr");
        const hrelem = document.createElement("td");
        hrelem.innerText = hora.replace("24:", "00:").replace("25:", "01:");
        tr.append(hrelem);
        for (const escenario of escenarios) {
            const escelem = document.createElement("td");
            escelem.innerText = mappings[escenario][hora] ?? "";
            tr.append(escelem);
        }
        document.getElementById("hour-table").children[0].append(tr);
    }

    for (const {Desde, Hasta, Minutos} of times.toSorted((a, b) => -(a.Desde.localeCompare(b)))) {
        const tr = document.createElement("tr");
        const delem = document.createElement("td");
        delem.innerText = Desde;
        const helem = document.createElement("td");
        helem.innerText = Hasta;
        const melem = document.createElement("td");
        melem.innerText = Minutos;
        tr.append(delem, helem, melem);
        document.getElementById("time-table").children[0].append(tr);
    }
}

function calculate() {
    const enabledBands = [];
    for (const elem of getBandlist().children) {
        if (elem.children[0].checked) {
            const bandId = Number.parseInt(elem.id.split('-')[1]);
            enabledBands.push({...(bands[bandId])});
        }
    }

    for (const band of enabledBands) {
        let [hora, minuto] = band.Hora.split(':');
        band.MinTot = Number.parseInt(hora) * 60 + Number.parseInt(minuto);
        if (hora >= 24) {
            hora -= 24;
            band.Hora = (hora.toString().padStart(2, '0')) + ":" + (minuto.toString().padStart(2, '0'));
        }

    }

    let error = undefined, warning = undefined;

    enabledBands.sort((a, b) => a.MinTot - b.MinTot);

    for (let i = 0; i < enabledBands.length - 1; i++) {
        let thisBand = enabledBands[i + 1];
        let nextBand = enabledBands[i];
        if ((thisBand.MinTot - nextBand.MinTot) - timetable[thisBand.Escenario][nextBand.Escenario] < 15) {
            error = (error ?? "") + "'" + thisBand.Banda + "' y '" + nextBand.Banda + "' empiezan a " + Math.abs(nextBand.MinTot - thisBand.MinTot) + " minutos de diferencia, no podrás ver ambas.\n";
        } else if ((thisBand.MinTot - nextBand.MinTot) - timetable[thisBand.Escenario][nextBand.Escenario] < 40) {
            warning = (warning ?? "") + "'" + thisBand.Banda + "' y '" + nextBand.Banda + "' empiezan a " + Math.abs(nextBand.MinTot - thisBand.MinTot) + " minutos de diferencia, puede ser que no tengas tiempo de ver ambas.\n";
        }
    }

    const warningView = document.getElementById("warning-view");
    if (warning !== undefined) {
        warningView.style.display = "block";
        warningView.innerText = warning;
    } else {
        warningView.style.display = "none";
        warningView.innerText = "";
    }

    const errorView = document.getElementById("error-view");
    if (error !== undefined) {
        errorView.style.display = "block";
        document.getElementById("error-alert").innerText = error;
        if (!document.getElementById('ignore-error-check').checked) {
            document.getElementById("timetable-view").style.display = "none";
            return;
        }
    } else {
        errorView.style.display = "none";
    }

    const times = [];

    times.push(`Llegar ${enabledBands[0].Hora} a ${enabledBands[0].Escenario} para ver ${enabledBands[0].Banda}`);
    for (let i = 0; i < enabledBands.length - 1; i++) {
        let thisBand = enabledBands[i];
        let nextBand = enabledBands[i + 1];
        if (thisBand.Escenario === nextBand.Escenario) {
            times.push(`Quedarse en ${thisBand.Escenario} hasta ${nextBand.Hora} para ver ${nextBand.Banda}`);
        } else {
            const walkTime = timetable[thisBand.Escenario][nextBand.Escenario];
            const walkHour = nextBand.MinTot - Math.ceil(walkTime * 1.25);
            let [wh, wm] = [Math.floor(walkHour / 60), walkHour % 60];
            if (wh >= 24) wh -= 24;
            wh = wh.toString().padStart(2, '0');
            wm = wm.toString().padStart(2, '0');
            times.push(`A las ${wh}:${wm} empezar a caminar hacia ${nextBand.Escenario} para ver ${nextBand.Banda} a las ${nextBand.Hora}`);
        }
    }
    const timetableEl = document.getElementById("timetable");
    timetableEl.innerHTML = "";
    for (const time of times) {
        const tli = document.createElement("li");
        tli.innerText = time;
        timetableEl.appendChild(tli);
    }
    document.getElementById("timetable-view").style.display = "block";
}

window.setup = setup;
window.calculate = calculate;