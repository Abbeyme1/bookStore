import fetch from 'node-fetch';
import fs from "fs";

interface LooseObject {
    [key: string]: any
}

let baseURL:string = 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/'

let files:string[] = ["authors","books","magazines"]
// https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv


const convert = (csv:string):string => {

    const lines:string[] = csv.split('\n')
    const result:any = []
    const headers:string[] = lines[0].split(';');

    for(let i:number=0;i<headers.length;i++)
    {
        headers[i] = fix(headers[i]);
    }

    for(let i:number=1;i<lines.length-1;i++)
    {
        let l:string = lines[i];
        const obj:LooseObject = {}
        const line:string[] = l.split(';')

        headers.map((h:string, i:number) => {

            if(h === 'authors')
            {
                let authors:string[] = line[i].split(',');
                obj[h] = authors
                
            }
            else obj[h] = line[i]
        })

        result.push(obj)
    }

    return result
}


const fix = (str: string):string => {
    return str.replace('﻿', '');
}

export const csvToJSON = async () => {

    files.forEach(async (file:string) => {

        let url:string = baseURL + file + ".csv";
        const response:any = await fetch(url);
        const body:string = await response.text();

        const data:string = convert(body);

        let json:string = JSON.stringify(data);
        fs.writeFileSync(__dirname+`/data/${file}.json`, json);
    })
}

csvToJSON()