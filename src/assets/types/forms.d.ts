declare namespace mwI {
    interface Frms {
      zip:string;
      region:string;
      local:string;
      street:string;
      extend:string;
      extend2:string;
      adrname:string;
    }
    interface Sales {
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
      msmadr:Frms[];
    }
}