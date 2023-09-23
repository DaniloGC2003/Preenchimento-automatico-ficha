
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
    /* preenche objeto horarios_datas com as datas contidas no form */
    const data_inicial = document.querySelector('#data_inicial').value;//date object. Format YYYY-MM-DD
    const data_inicial_DMY = convertDateToDMY(data_inicial);


    let DateValues_inicial = getDateNumbers(data_inicial);
    horarios_datas.data_inicio.setFullYear(DateValues_inicial.year, DateValues_inicial.month - 1, DateValues_inicial.day);//months indexed from 0


    const data_final = document.querySelector('#data_final').value;//date object. Format YYYY-MM-DD
    const data_final_DMY = convertDateToDMY(data_final);


    let DateValues_final = getDateNumbers(data_final);
    horarios_datas.data_fim.setFullYear(DateValues_final.year, DateValues_final.month - 1, DateValues_final.day);//months indexed from 0
}

function printTable() {
    /* imprime horarios na textArea */
    const textAreaHorarios = document.querySelector('#text-area');
    textAreaHorarios.value = '';
    let current_date = new Date(horarios_datas.data_inicio.getTime());


    let data_fimPlusOne = horarios_datas.data_fim;
    data_fimPlusOne.setDate(data_fimPlusOne.getDate() + 1);//this allows the loop to iterate through the last day as well
    let i = 0;
    while (current_date.toDateString() != data_fimPlusOne.toDateString()) {

        let dataString = convertDateOBJtoDMYstring(current_date);

        textAreaHorarios.value += dataString + '; ';//add day of the year

        let num_horarios;
        switch (current_date.getDay()) {
            case 0:
                num_horarios = document.getElementById("num_horarios_domingo").value;
                break;
            case 1:
                num_horarios = document.getElementById("num_horarios_segunda").value;
                break;
            case 2:
                num_horarios = document.getElementById("num_horarios_terca").value;
                break;
            case 3:
                num_horarios = document.getElementById("num_horarios_quarta").value;
                break;
            case 4:
                num_horarios = document.getElementById("num_horarios_quinta").value;
                break;
            case 5:
                num_horarios = document.getElementById("num_horarios_sexta").value;
                break;
            case 6:
                num_horarios = document.getElementById("num_horarios_sabado").value;
                break;
        }

        if (num_horarios == 0)//nao atua nesse dia
        {
            if (current_date.getDay() == 0)//domingo
            {
                textAreaHorarios.value += 'DOMINGO';
            }
            else
            {
                textAreaHorarios.value += 'SEM ATUAÇÃO';   
            }
        }
        else
        {
            let j = 0;
            for (j = 0; j < num_horarios; j++) {//coloca horarios
                textAreaHorarios.value += getStringInicioFimHorario(current_date.getDay(), j);
                if (num_horarios - j >= 2)//nao printa ; depois do ultimo horario
                {
                    textAreaHorarios.value += '; ';
                }
            }
        }
        
        textAreaHorarios.value += '\n';

        current_date.setDate(current_date.getDate() + 1);
        i++;
    }
}

function getStringInicioFimHorario(diaSemana, indexHorario) {
    /* input: dia da semana representado por numero de 0 a 6; numero que indica qual dos 3 horarios deve ser retornado
    output: string que contem horario de inicio e horario de fim */
    let stringData = '';
    console.log(horarios[Object.keys(horarios)[diaSemana]]);
    stringData += converttimeObjToStr(horarios[Object.keys(horarios)[diaSemana]][indexHorario][0]) + ' - ' + converttimeObjToStr(horarios[Object.keys(horarios)[diaSemana]][indexHorario][1]);

    return stringData;
}

function convertDateOBJtoDMYstring(date) {
    /* input: objeto de Data do JS
    output: string de data em formato DD/MM//YYYY */
    let newString = '';
    newString += date.getDate();
    newString += '/';
    newString += date.getMonth() + 1;
    newString += '/';
    newString += date.getFullYear();

    return newString;
}

function getDateNumbers(date) {
    /* input: string de data em formato YYYY-MM-DD; 
    output: vetor de data em formato YYYY-MM-DD */
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
    /* input: objeto de data do JS
    output: string de data em DD/MM/YYYY */
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
    /* inout: string de horario 
    output: vetor contendo horas e minutos do horario */
    let timeNumbers = [];
    let timeStr = '';

    timeStr += time.charAt(0);
    timeStr += time.charAt(1);

    timeNumbers.push(parseInt(timeStr));

    timeStr = '';
    timeStr += time.charAt(3);
    timeStr += time.charAt(4);

    timeNumbers.push(parseInt(timeStr));

    return timeNumbers;
}

function converttimeObjToStr(time) {
    /* input: objeto de data do JS
    output: string de horario */
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

function retrieveTime() {
    /* preenche objeto horarios com os horarios contidos no form */
    for (let i = 0; i < 7; i++)
    {
        let num_horarios;
        let inicio_horarioID = '';
        let fim_horarioID = '';

        switch(i)
        {
            case 0:
                num_horarios = document.getElementById("num_horarios_domingo").value;
                inicio_horarioID = '#horario_inicial_domingo_0';
                fim_horarioID = '#horario_final_domingo_0';
                break;
            case 1:
                num_horarios = document.getElementById("num_horarios_segunda").value;
                inicio_horarioID = '#horario_inicial_segunda_0';
                fim_horarioID = '#horario_final_segunda_0';
                break;
            case 2:
                num_horarios = document.getElementById("num_horarios_terca").value;
                inicio_horarioID = '#horario_inicial_terca_0';
                fim_horarioID = '#horario_final_terca_0';
                break;
            case 3:
                num_horarios = document.getElementById("num_horarios_quarta").value;
                inicio_horarioID = '#horario_inicial_quarta_0';
                fim_horarioID = '#horario_final_quarta_0';
                break;
            case 4:
                num_horarios = document.getElementById("num_horarios_quinta").value;
                inicio_horarioID = '#horario_inicial_quinta_0';
                fim_horarioID = '#horario_final_quinta_0';
                break;
            case 5:
                num_horarios = document.getElementById("num_horarios_sexta").value;
                inicio_horarioID = '#horario_inicial_sexta_0';
                fim_horarioID = '#horario_final_sexta_0';
                break;
            case 6:
                num_horarios = document.getElementById("num_horarios_sabado").value;
                inicio_horarioID = '#horario_inicial_sabado_0';
                fim_horarioID = '#horario_final_sabado_0';
                break;
            default:
                break;
        }

        for (let j = 0; j < num_horarios; j++)
        {
            console.log('comeco');

            inicio_horarioID = inicio_horarioID.slice(0, -1);
            inicio_horarioID += j + 1;
            fim_horarioID = fim_horarioID.slice(0, -1);
            fim_horarioID += j + 1;

            let horarios_inicioFim = [];

            let horarioInicioElem = document.querySelector(inicio_horarioID);
            let timeNumbersInicio = convertTimeStringTonumbers(horarioInicioElem.value);//eh um vetor
            let horarioInicio = new Date();
            horarioInicio.setHours(timeNumbersInicio[0], timeNumbersInicio[1]);//cria obj data com as horas do vetor

            let horarioFimElem = document.querySelector(fim_horarioID);
            let timeNumbersFim = convertTimeStringTonumbers(horarioFimElem.value);
            let horarioFim = new Date();
            horarioFim.setHours(timeNumbersFim[0], timeNumbersFim[1]);

            horarios_inicioFim.push(horarioInicio);
            horarios_inicioFim.push(horarioFim);

            horarios[Object.keys(horarios)[i]].push(horarios_inicioFim);
        }
        
    }
}

function resetGlobalVariables() {
    /* reseta objeto horarios */
    horarios.segunda = [];
    horarios.terca = [];
    horarios.quarta = [];
    horarios.quinta = [];
    horarios.sexta = [];
    horarios.sabado = [];
    horarios.domingo = [];
}

function execTable() {
    /* extrai dados do form e preenche a textArea */
    resetGlobalVariables();
    retrieveTime();
    retrieveDate();
    printTable();
}

function showTimeForms(diaSemana) {
    /* mostra ou oculta forms de horarios dependendo de quantos horarios atua
    input: string de dia da semana */
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