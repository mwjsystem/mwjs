import gql from 'graphql-tag';

export const GetMast = gql`
query get_member($where:msmember_bool_exp!,$where2:msmadr_bool_exp) {
  msmember(where:$where) {
    mcode
    sei
    mei
    kana
    mail
    mail2
    mail3
    mail4
    mail5
    tcode1
    tcode2
    msmadrs(where:$where2) {
      eda
      zip
      region
      local
      street
      extend
      extend2
      tel
      fax
      tel2
      tel3
    }    
  }
}`;

export const GetMast0 = gql`
query get_groups($id: smallint!) {
  msggroup(where: {id: {_eq: $id}}, order_by: {code: asc}) {
    code
    name
    kana
  }
}`;

export const GetMast1 = gql`
query get_ggroup($id: smallint!, $grpcd: String!) {
  msggroup_by_pk(id: $id, code: $grpcd) {
    code
    kana
    name
    sozai
    siire
    bikou
    created_at
    updated_at
    created_by
    updated_by
    msgoods(order_by: {gcode: asc}) {
      gcode
      color
      irisu
      iriunit
      jan
      koguchi
      max
      order
      send
      size
      skbn
      subname
      tkbn
      weight
      zkbn
      msgtankas(order_by: {day: desc}) {
        day
        tanka1
        tanka2
        tanka3
        tanka4
        tanka5
        tanka6
        tanka7
        tanka8
        tanka9
        taxrate
        genka
        currency
        cost
      }
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
export const GetMast4 = gql`
query get_system($id: smallint!){
  mssystem(where: {id: {_eq: $id}}) {
    name
    subname
    maxmcd
  }
}`;
export const GetMast5 = gql`
query get_mcode($id: smallint!,$maxmcd: Int){
  msmember_aggregate(where: {id: {_eq: $id}, mcode: {_lt: $maxmcd}}) {
    aggregate {
      max {
        mcode
      }
    }
  }
}`;
export const GetMast6 = gql`
query get_eda($id: smallint!,$mcode: Int!){
  msmadr_aggregate(where: {id: {_eq: $id}, mcode: {_eq: $mcode}}) {
    aggregate {
      max {
        eda
      }
    }
  }
}`;
export const InsertMast1 = gql`
mutation ins_member($object: [msmember_insert_input!]!) {
  insert_msmember(objects: $object) {
    affected_rows
  }
}`;
export const InsertMast2 = gql`
mutation ins_madr($object: [msmadr_insert_input!]!) {
  insert_msmadr(objects: $object) {
    affected_rows
  }
}`;
export const UpdateMast1 = gql`
mutation upd_member($id: smallint!, $mcode: Int!,$_set: msmember_set_input!) {
  update_msmember(where: {id: {_eq: $id},mcode: {_eq:$mcode}}, _set: $_set)  {
    affected_rows
  }
}`;
export const UpdateMast2 = gql`
mutation upd_madr($id: smallint!, $mcode: Int!, $eda: Int!,$_set: msmadr_set_input!) {
  update_msmadr(where: {id: {_eq: $id},mcode: {_eq:$mcode},eda: {_eq:$eda}}, _set: $_set)  {
    affected_rows
  }
}`;