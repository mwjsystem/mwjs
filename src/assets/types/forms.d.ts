declare namespace mwI {
  interface Jyuden {
    id:number;
    denno:number;
    day:Date;
    yday:Date;
    sday:Date;
    uday:Date;
    nday:Date;
    hday:Date;
    htime:number;
    hcode:string;
    ncode:number;
    nadr:number;
    souko:string;
    tcode:number;
    bunsho:number;
    dbikou:string;
    nbikou:string;
    obikou:string;
    keep:string;
    okurisuu:number;
    okurino:string;
    cusden:string;
    inbikou:string;
    cusdaib:number;
    gtotal:number;
    souryou:number;
    tesuu:number;
    nebiki:number;
    ttotal:number;
    tax:number;
    syoukei:number;
    tyousei:number;
    total:number;
    okurinusi:string;
    skbn:string;
    uttotal:number;
    utax:number;
    httotal:number;
    gtotalzn:number;
    souryouzn:number;
    tesuuzn:number;
    nebikizn:number;
    taxtotal:number;
    total8:number;
    total10:number;
    genka:number;
    hgenka:number;
    egenka:number;
    torikbn:boolean;
    mcode:string;
    scode:string;
    jcode:string;
    pcode:string;
    daibunrui:string;
    bumon :string;
    shobunrui:string;
    tcode1 :string;
    del:boolean;
    created_at:Date;
    created_by:string;
    updated_at:Date;
    updated_by:string;
  }
  interface Jyumei {
    id:number;
    denno:number;
    line:number;
    day:Date;
    sday:Date;
    souko:string;
    gcode:string;
    gtext:string;
    suu:number;
    teika:number;
    tanka:number;
    money:number;
    taxkbn:number;
    mbikou:string;
    genka:number;
    spec:string;
    tintanka:number;
    touttanka:number;
    taxtanka:number;
    tinmoney:number;
    toutmoney:number;
    taxmoney:number;
    taxrate:number;
    currency:string;
  }
  interface SalGds {
    gcode:string;
    gkbn:number;
    siire:string;
    subname:string;
    irisu:number;
    iriunit:string;
    max:number;
    send:string;
    order:boolean;
    koguchi:number;
    skbn:number;
    zkbn:number;
    day:Date;
  }  
  interface Trjyuden extends Jyuden{
    trjyumeis:Jyumei[];
  }
}