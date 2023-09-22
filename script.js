
let horarios = {
    domingo: [],
    segunda: [],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sabado: []
}

let horarios_datas = {
    data_inicio: new Date(),
    data_fim: new Date()
}

function retrieveDate() {
    const data_inicial = document.querySelector('#data_inicial').value;//date object. Format YYYY-MM-DD
    //console.log(data_inicial);
    const data_inicial_DMY = convertDateToDMY(data_inicial);
    //console.log(data_inicial_DMY);


    let DateValues_inicial = getDateNumbers(data_inicial);
    horarios_datas.data_inicio.setFullYear(DateValues_inicial.year, DateValues_inicial.month - 1, DateValues_inicial.day);//months indexed from 0
    //console.log(horarios_datas.data_inicio);


    const data_final = document.querySelector('#data_final').value;//date object. Format YYYY-MM-DD
    //console.log(data_final);
    const data_final_DMY = convertDateToDMY(data_final);
    // console.log(data_final_DMY);


    let DateValues_final = getDateNumbers(data_final);
    horarios_datas.data_fim.setFullYear(DateValues_final.year, DateValues_final.month - 1, DateValues_final.day);//months indexed from 0
    //console.log(horarios_datas.data_fim);

    /*     const p_horario = document.createElement('p');//create p element
        p_horario.appendChild(document.createTextNode(data_DMY));
    
        const horarios = document.querySelector('#horarios');
        horarios.appendChild(p_horario); */
}

function printTable() {
    const textAreaHorarios = document.querySelector('#text-area');
    textAreaHorarios.value = '';
    let current_date = new Date(horarios_datas.data_inicio.getTime());


    let data_fimPlusOne = horarios_datas.data_fim;
    data_fimPlusOne.setDate(data_fimPlusOne.getDate() + 1);//this allows the loop to iterate through the last day as well
    let i = 0;
    while (current_date.toDateString() != data_fimPlusOne.toDateString()) {

        let dataString = convertDateOBJtoDMYstring(current_date);

        textAreaHorarios.value += dataString + '; ';//add day

        /*  if (current_date.getDay() == 1) {//monday
             let num_horarios = document.getElementById("num_horarios_segunda").value;
             let j = 0;
             for (j = 0; j < num_horarios; j++) {
                 textAreaHorarios.value += getStringInicioFimHorario(1, j) + '; ';
             }
         } */
        let num_horarios;
        switch (current_date.getDay()) {
            case 1:
                num_horarios = document.getElementById("num_horarios_segunda").value;
            case 2:
                num_horarios = document.getElementById("num_horarios_terca").value;
                console.log('oioiii');
                console.log(num_horarios);

        }
        let j = 0;
        for (j = 0; j < num_horarios; j++) {
            textAreaHorarios.value += getStringInicioFimHorario(current_date.getDay(), j) + '; ';
        }


        textAreaHorarios.value += '\n';

        current_date.setDate(current_date.getDate() + 1);
        i++;
    }
}

function getStringInicioFimHorario(diaSemana, indexHorario) {
    let stringData = '';
    console.log(horarios[Object.keys(horarios)[diaSemana]]);
    stringData += converttimeObjToStr(horarios[Object.keys(horarios)[diaSemana]][indexHorario][0]) + ' - ' + converttimeObjToStr(horarios[Object.keys(horarios)[diaSemana]][indexHorario][1]);

    return stringData;
}

function convertDateOBJtoDMYstring(date) {
    //console.log('oh' + date.getDate());
    let newString = '';
    newString += date.getDate();
    newString += '/';
    newString += date.getMonth() + 1;
    newString += '/';
    newString += date.getFullYear();

    //console.log('olha so' + newString);
    return newString;
}

function getDateNumbers(date) {//input: stringdate in format YYYY-MM-DD; output: date array in format YYYY-MM-DD
    let DateValues = {
        year: 0,
        month: 0,
        day: 0
    }
    let tempString = '';

    for (let i = 0; i < 4; i++)//year
    {
        tempString += date.charAt(i);
    }
    DateValues.year = parseInt(tempString);
    tempString = '';
    for (let i = 0; i < 2; i++)//day
    {
        tempString += date.charAt(8 + i);
    }
    DateValues.day = parseInt(tempString);
    tempString = '';
    for (let i = 0; i < 2; i++)//month
    {
        tempString += date.charAt(5 + i);
    }
    DateValues.month = parseInt(tempString);

    return DateValues;
}

function convertDateToDMY(date) {
    let newDateString = '';

    for (let i = 0; i < 2; i++) {
        newDateString += date.charAt(8 + i);
    }
    newDateString += '/';
    for (let i = 0; i < 2; i++) {
        newDateString += date.charAt(5 + i);
    }
    newDateString += '/';
    for (let i = 0; i < 4; i++) {
        newDateString += date.charAt(i);
    }

    return newDateString;
}

function convertTimeStringTonumbers(time) {
    //console.log('converting str to nmm');
    //console.log(time);
    let timeNumbers = [];
    let timeStr = '';

    timeStr += time.charAt(0);
    timeStr += time.charAt(1);

    timeNumbers.push(parseInt(timeStr));
    //console.log(timeStr);

    timeStr = '';
    timeStr += time.charAt(3);
    timeStr += time.charAt(4);

    timeNumbers.push(parseInt(timeStr));
    //console.log(timeNumbers);


    //console.log(timeNumbers)

    return timeNumbers;
}

function converttimeObjToStr(time) {
    let tempString = '';
    let hours = time.getHours();
    if (hours < 10) {
        tempString += '0' + hours;
    }
    else {
        tempString += hours;
    }
    tempString += 'h';
    let minutes = time.getMinutes();
    if (minutes < 10) {
        tempString += '0' + minutes;
    }
    else {
        tempString += minutes;
    }


    console.log(tempString);

    return tempString;
}

function retrieveTime() {//fazer p todos os dias
    let inicio_horarioSegundaID = '';
    let fim_horarioSegundaID = '';
    let num_horarios = document.getElementById("num_horarios_segunda").value;
    for (let i = 0; i < num_horarios; i++) {
        let horarios_inicioFim = [];

        inicio_horarioSegundaID = '#horario_inicial_segunda_';
        inicio_horarioSegundaID += i + 1;
        fim_horarioSegundaID = '#horario_final_segunda_';
        fim_horarioSegundaID += i + 1;


        let horarioSegundaInicioElem = document.querySelector(inicio_horarioSegundaID);
        let timeNumbersInicio = convertTimeStringTonumbers(horarioSegundaInicioElem.value);
        let horarioInicioSegunda = new Date();
        horarioInicioSegunda.setHours(timeNumbersInicio[0], timeNumbersInicio[1]);

        let horarioSegundaFimElem = document.querySelector(fim_horarioSegundaID);
        let timeNumbersFim = convertTimeStringTonumbers(horarioSegundaFimElem.value);
        let horarioFimSegunda = new Date();
        horarioFimSegunda.setHours(timeNumbersFim[0], timeNumbersFim[1]);

        horarios_inicioFim.push(horarioInicioSegunda);
        horarios_inicioFim.push(horarioFimSegunda);
        console.log(horarios_inicioFim);

        horarios.segunda.push(horarios_inicioFim);
    }

    console.log('horarios' + horarios.segunda);
}

function resetGlobalVariables() {
    horarios.segunda = [];
    horarios.terca = [];
    horarios.quarta = [];
    horarios.quinta = [];
    horarios.sexta = [];
    horarios.sabado = [];
    horarios.domingo = [];
}

function execTable() {

    resetGlobalVariables();
    retrieveTime();
    retrieveDate();

    //apagar o que ja tava na text area

    printTable();
}

function showTimeForms(diaSemana) {
    let num_horarios = document.getElementById("num_horarios_" + diaSemana).value;

    let horarios1 = document.getElementById("horarios_" + diaSemana + '1');
    let horarios2 = document.getElementById("horarios_" + diaSemana + '2');
    let horarios3 = document.getElementById("horarios_" + diaSemana + '3');

    //console.log(num_horarios);
    if (num_horarios == 0) {
        horarios1.setAttribute("style", "display:none;");
        horarios2.setAttribute("style", "display:none;");
        horarios3.setAttribute("style", "display:none;");
    }
    else if (num_horarios == 1) {
        horarios1.setAttribute("style", "display:block;");
        horarios2.setAttribute("style", "display:none;");
        horarios3.setAttribute("style", "display:none;");
    }
    else if (num_horarios == 2) {
        horarios1.setAttribute("style", "display:block;");
        horarios2.setAttribute("style", "display:block;");
        horarios3.setAttribute("style", "display:none;");
    }
    else if (num_horarios == 3) {
        horarios1.setAttribute("style", "display:block;");
        horarios2.setAttribute("style", "display:block;");
        horarios3.setAttribute("style", "display:block;");
    }
}