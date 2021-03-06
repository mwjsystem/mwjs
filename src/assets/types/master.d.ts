declare namespace mwI {
  interface Sval {
    value: string;
    viewval: string;  
  }
  interface Adrs {
    eda:number;
    zip:string;
    region:string;
    local:string;
    street:string;
    extend:string;
    extend2:string;
    adrname:string;
    tel:string;
    fax:string;
    tel2:string;
    tel3:string;
    adrbikou:string;
    adrinbikou:string;
    adrokrbko:string;
    del:boolean;
  }
  interface Member {
    mcode:number;
    sei:string;
    mei:string;
    kana:string;
    tankakbn:string;
    mail:string;
    mail2:string;
    mail3:string;
    mail4:string;
    mail5:string;
    torikbn:boolean;
    sime:number;
    site:string;
    inday:number;
    icode:string;
    bikou:string;
    inbikou:string;
    pay:string;
    okuri:string;
    mtax:string;
    sscode:string;
    tcode1:string;
    tcode2:string;
    del:boolean;
    sptnkbn:string;
    daibunuri:string;
    bumon:string;
    shobunrui:string;
    created_at:Date;
    updated_at:Date;
    lday:Date;
    created_by:string;
    updated_by:string;
    msmadrs:Adrs[];
  }
  interface Gtanka {
    day:Date;
    tanka1:number;
    tanka2:number;
    tanka3:number;
    tanka4:number;
    tanka5:number;
    tanka6:number;
    tanka7:number;
    tanka8:number;
    tanka9:number;
    taxrate:number;
    genka:number;
    currency:string;
    cost:number;
  }
  interface Goods {
    gcode:string;
    size:string;
    color:string;
    irisu:number;
    skbn:number;
    jan:string;
    weight:number;
    iriunit:string;
    tkbn:number;
    zkbn:number;
    subname:string;
    max:number;
    send:string;
    order:boolean;
    koguchi:number;
  }
  
  interface Msgoods extends Goods{
    msgtankas:Gtanka[];
  }

  interface Ggroup {
    code:string;
    kana:string;
    name:string;
    gkbn:number;
    bikou:string;
    sozai:string;
    created_at:Date;
    created_by:string;
    updated_at:Date;
    updated_by:string;
    siire:string;
    msgoods:Msgoods[];    
  }
  
  interface Bunrui {
    kubun:number;
    code:string;
    name:string;
    memo:string;
  }
  interface Staff {
    code:number;
    name:string;
    mail:string;
  }
}