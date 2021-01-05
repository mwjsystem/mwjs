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