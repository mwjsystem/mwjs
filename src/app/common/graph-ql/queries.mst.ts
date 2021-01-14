import gql from 'graphql-tag';

export const GetMast1 = gql`
query get_members($id: smallint!) {
  msmember(where: {id: {_eq: $id}}) {
    mcode
    sei
    mei
    kana
    tankakbn
    mail
    mail2
    mail3
    mail4
    mail5
    torikbn
    sime
    site
    inday
    icode
    sscode
    tcode1
    tcode2
    del
    sptnkbn
    msmadrs {
      eda
      zip
      region
      local
      street
      extend
      tel
      fax
      tel2
      tel3
      extend2
      adrname
      adrbikou
    }    
  }
}`;
export const GetMast2 = gql`
query get_bunrui($id: smallint!){
  msbunrui(where: {id: {_eq: $id}}) {
    kubun
    code
    name
    memo
  }
}`;
export const GetMast3 = gql`
query get_staff($id: smallint!){
  msstaff(where: {id: {_eq: $id}}) {
    code
    name
    mail
  }
}`;