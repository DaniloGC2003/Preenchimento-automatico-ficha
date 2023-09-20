
let horarios = {
    segunda: [],
    terca: []
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
    //console.log('in print table');
    const textAreaHorarios = document.querySelector('#text-area');
    textAreaHorarios.value = '';
    let current_date = new Date(horarios_datas.data_inicio.getTime());
    //console.log(horarios_datas.data_inicio);
    //console.log(horarios_datas.data_fim);
    //console.log('current_date:' + current_date);

    let data_fimPlusOne = horarios_datas.data_fim;
    data_fimPlusOne.setDate(data_fimPlusOne.getDate() + 1);//this allows the loop to iterate through the last day as well
    let i = 0;
    while (current_date.toDateString() != data_fimPlusOne.toDateString()) {

        console.log(i);
        //let p_horario = document.createElement('p');//create p element
        let dataString = convertDateOBJtoDMYstring(current_date);
        //p_horario.innerHTML = dataString;

        //const horarios = document.querySelector('#horarios');
        //horarios.appendChild(p_horario);

        if (current_date.getDay() == 1) {
            textAreaHorarios.value += dataString + ': ' + converttimeObjToStr(current_date) + ';\n';
        }
        textAreaHorarios.value += dataString + ';\n';

        current_date.setDate(current_date.getDate() + 1);
        i++;
    }
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
    console.log('converting str to nmm');
    console.log(time);
    let timeNumbers = [];
    let timeStr = '';

    timeStr += time.charAt(0);
    timeStr += time.charAt(1);

    timeNumbers.push(parseInt(timeStr));
    console.log(timeStr);

    timeStr = '';
    timeStr += time.charAt(3);
    timeStr += time.charAt(4);

    timeNumbers.push(parseInt(timeStr));
    console.log(timeNumbers);


    //console.log(timeNumbers)

    return timeNumbers;
}

function converttimeObjToStr(time) {
    let tempString = '';
    tempString += time.getHours();
    tempString += 'h';
    tempString += time.getMinutes();

    console.log(tempString);

    return tempString;
}

function retrieveTime() {
    const horarioSegunda = document.querySelector('#horario_inicial_segunda');
    console.log(horarioSegunda.value);

    //create date object
    let timeNumbers = convertTimeStringTonumbers(horarioSegunda.value);
    console.log(timeNumbers);
    let horarioInicioSegunda = new Date();
    console.log(horarioInicioSegunda);
    horarioInicioSegunda.setHours(timeNumbers[0], timeNumbers[1]);
    console.log(horarioInicioSegunda);
    //add to arr
    horarios.segunda.push(horarioInicioSegunda);
}

function execTable() {

    retrieveTime();
    retrieveDate();

    //apagar o que ja tava na text area

    printTable();
}