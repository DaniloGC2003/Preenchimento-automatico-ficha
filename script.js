let horarios = {
    inicio: '',
    fim: ''
}

let horarios_datas = {
    data_inicio: new Date(),
    data_fim: new Date()
}

function retrieveDate()
{
    const data_inicial = document.querySelector('#data_inicial').value;//date object. Format YYYY-MM-DD
    console.log(data_inicial);
    const data_inicial_DMY = convertDateToDMY(data_inicial);
    console.log(data_inicial_DMY);


    let DateValues_inicial = getDateNumbers(data_inicial);
    horarios_datas.data_inicio.setFullYear(DateValues_inicial.year, DateValues_inicial.month - 1, DateValues_inicial.day);//months indexed from 0
    console.log(horarios_datas.data_inicio);


    const data_final = document.querySelector('#data_final').value;//date object. Format YYYY-MM-DD
    console.log(data_final);
    const data_final_DMY = convertDateToDMY(data_final);
    console.log(data_final_DMY);


    let DateValues_final = getDateNumbers(data_final);
    horarios_datas.data_fim.setFullYear(DateValues_final.year, DateValues_final.month - 1, DateValues_final.day);//months indexed from 0
    console.log(horarios_datas.data_fim);

/*     const p_horario = document.createElement('p');//create p element
    p_horario.appendChild(document.createTextNode(data_DMY));

    const horarios = document.querySelector('#horarios');
    horarios.appendChild(p_horario); */
}

function printTable() {
    let current_date = new Date(horarios_datas.data_inicio.getTime())
    console.log(horarios_datas.data_inicio);
    console.log(current_date.getFullYear());
    console.log(horarios_datas.data_fim.getFullYear());
    while (current_date.toDateString() != horarios_datas.data_fim.toDateString())
    {
        let i = 0;
        console.log(i);
        const p_horario = document.createElement('p');//create p element
        p_horario.appendChild(document.createTextNode(convertDateOBJtoDMYstring(current_date)));

        const horarios = document.querySelector('#horarios');
        horarios.appendChild(p_horario);

        current_date.setDate(current_date.getDate() + 1);
        i++;
    }
}

function convertDateOBJtoDMYstring(date)
{
    let newString = '';
    newString += toString(date.getDate());
    newString += '/';
    newString += toString(date.getMonth() + 1);
    newString += '/';
    newString += toString(date.getFullYear());
}

function getDateNumbers(date) 
{//input: stringdate in format YYYY-MM-DD; output: date array in format YYYY-MM-DD
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

function convertDateToDMY(date)
{
    let newDateString = '';

    for (let i = 0; i < 2; i++)
    {
        newDateString += date.charAt(8 + i);
    }
    newDateString += '/';
    for (let i = 0; i < 2; i++)
    {
        newDateString += date.charAt(5 + i);
    }
    newDateString += '/';
    for (let i = 0; i < 4; i++)
    {
        newDateString += date.charAt(i);
    }

    return newDateString;
}

function execTable() {
    retrieveDate();

    printTable();
}