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
    created_at:Date;
    updated_at:Date;
    lday:Date;
    created_by:string;
    updated_by:string;
    msmadrs:Adrs[];
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