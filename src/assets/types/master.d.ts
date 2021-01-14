declare namespace mwI {
  interface Sval {
      value: string | number;
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
    }
    interface Member {
      mcode:string;
      sei:string;
      mei:string;
      kana:string;
      tankakbn:number;
      mail:string;
      mail2:string;
      mail3:string;
      mail4:string;
      mail5:string;
      torikbn:number;
      sime:number;
      site:number;
      inday:number;
      icode:string;
      bikou:string;
      inbikou:string;
      pay:number;
      okuri:number;
      mtax:number;
      sscode:string;
      tcode1:string;
      tcode2:string;
      del:boolean;
      sptnkbn:string;
      daibunuri:string;
      bumon:string;
      msmadrs:Adrs[];
    }
    interface Bunrui {
      kubun:number;
      code:string;
      name:string;
      memo:string;
    }
    interface Staff {
      code:string;
      name:string;
      mail:string;
    }
}