export const times = [
    {
        "Desde": "Gaucho", "Hasta": "Balc\u00f3n IM", "Minutos": "2"
    },
    {
        "Desde": "Gaucho",
        "Hasta": "Libertador",
        "Minutos": "14"
    }, {"Desde": "Gaucho", "Hasta": "Cagancha", "Minutos": "9"}, {
        "Desde": "Balc\u00f3n IM",
        "Hasta": "Libertador",
        "Minutos": "12"
    }, {"Desde": "Cagancha", "Hasta": "Balc\u00f3n IM", "Minutos": "7"}, {
        "Desde": "Cagancha",
        "Hasta": "Libertador",
        "Minutos": "7"
    }, {"Desde": "Matriz", "Hasta": "Balc\u00f3n IM", "Minutos": "22"}, {
        "Desde": "Matriz",
        "Hasta": "Gaucho",
        "Minutos": "24"
    }, {"Desde": "Matriz", "Hasta": "Libertador", "Minutos": "16"}, {
        "Desde": "Matriz",
        "Hasta": "Cagancha",
        "Minutos": "16"
    }
], bands = [
    {"Hora": "15:00", "Escenario": "Balc\u00f3n IM", "Banda": "Paola Dalto (Tarde)"}, {
        "Hora": "16:15",
        "Escenario": "Balc\u00f3n IM",
        "Banda": "Dani Umpi"
    }, {"Hora": "17:15", "Escenario": "Balc\u00f3n IM", "Banda": "La Imbailable"}, {
        "Hora": "18:45",
        "Escenario": "Balc\u00f3n IM",
        "Banda": "Zeballos"
    }, {"Hora": "20:30", "Escenario": "Balc\u00f3n IM", "Banda": "Luciano Supervielle"}, {
        "Hora": "22:45",
        "Escenario": "Balc\u00f3n IM",
        "Banda": "F5"
    }, {"Hora": "24:15", "Escenario": "Balc\u00f3n IM", "Banda": "Paola Dalto (Noche)"}, {
        "Hora": "25:35",
        "Escenario": "Balc\u00f3n IM",
        "Banda": "Candombe 300"
    }, {"Hora": "15:30", "Escenario": "Libertador", "Banda": "Spuntone y Mendaro"}, {
        "Hora": "16:35",
        "Escenario": "Libertador",
        "Banda": "La Triple Nelson"
    }, {"Hora": "17:40", "Escenario": "Libertador", "Banda": "Ana Prada"}, {
        "Hora": "18:45",
        "Escenario": "Libertador",
        "Banda": "Mocchi"
    }, {"Hora": "19:50", "Escenario": "Libertador", "Banda": "Ruben Rada"}, {
        "Hora": "21:10",
        "Escenario": "Libertador",
        "Banda": "Laura Canoura"
    }, {"Hora": "22:15", "Escenario": "Libertador", "Banda": "Hereford"}, {
        "Hora": "23:20",
        "Escenario": "Libertador",
        "Banda": "EMI"
    }, {"Hora": "24:25", "Escenario": "Libertador", "Banda": "Buitres"}, {
        "Hora": "15:30",
        "Escenario": "Gaucho",
        "Banda": "Asaltantes con Patente"
    }, {"Hora": "16:45", "Escenario": "Gaucho", "Banda": "Camila Sapin"}, {
        "Hora": "17:45",
        "Escenario": "Gaucho",
        "Banda": "Luana"
    }, {"Hora": "19:30", "Escenario": "Gaucho", "Banda": "Lucas Sugo"}, {
        "Hora": "21:15",
        "Escenario": "Gaucho",
        "Banda": "Larbanois y Carrero"
    }, {"Hora": "23:30", "Escenario": "Gaucho", "Banda": "Florencia N\u00fa\u00f1ez"}, {
        "Hora": "24:35",
        "Escenario": "Gaucho",
        "Banda": "Karibe con K"
    }, {"Hora": "15:00", "Escenario": "Cagancha", "Banda": "Ninguna Higuera"}, {
        "Hora": "15:50",
        "Escenario": "Cagancha",
        "Banda": "Samantha Navarro y La Dulce"
    }, {"Hora": "16:55", "Escenario": "Cagancha", "Banda": "Gonzalo Deniz"}, {
        "Hora": "18:00",
        "Escenario": "Cagancha",
        "Banda": "Sof\u00eda \u00c1lvez"
    }, {"Hora": "18:50", "Escenario": "Cagancha", "Banda": "Ni\u00f1a Lobo"}, {
        "Hora": "19:40",
        "Escenario": "Cagancha",
        "Banda": "Fernando Cabrera"
    }, {"Hora": "20:45", "Escenario": "Cagancha", "Banda": "Et\u00e9 y los Problems"}, {
        "Hora": "21:50",
        "Escenario": "Cagancha",
        "Banda": "Cuatro Pesos de Propina"
    }, {"Hora": "23:10", "Escenario": "Cagancha", "Banda": "Agarrate Catalina"}, {
        "Hora": "15:00",
        "Escenario": "Matriz",
        "Banda": "Rossana Taddei"
    }, {"Hora": "15:50", "Escenario": "Matriz", "Banda": "Diane Denoir"}, {
        "Hora": "16:40",
        "Escenario": "Matriz",
        "Banda": "Milongas Extremas"
    }, {"Hora": "17:45", "Escenario": "Matriz", "Banda": "Maia Castro"}, {
        "Hora": "18:50",
        "Escenario": "Matriz",
        "Banda": "Las 10 Guitarras de los 300 A\u00f1os"
    }, {"Hora": "19:55", "Escenario": "Matriz", "Banda": "Francis Andreu"}, {
        "Hora": "21:15",
        "Escenario": "Matriz",
        "Banda": "Jorge Nasser"
    }
];
export const timetable = {};

for (let {Desde, Hasta, Minutos} of times) {
    if (!(Desde in timetable)) {
        timetable[Desde] = {};
    }
    timetable[Desde][Hasta] = Number.parseInt(Minutos);
    if (!(Hasta in timetable)) {
        timetable[Hasta] = {};
    }
    timetable[Hasta][Desde] = Number.parseInt(Minutos);
}