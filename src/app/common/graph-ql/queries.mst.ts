import gql from 'graphql-tag';

export const GetMast1 = gql`
query get_owner($gid: String!) {
  tblowner(where: {googleid: {_eq: $gid}}) {
    dojoid
    dojoname
    sei
    mei
    mail
    zip
    region
    local
    street
    extend
    url
    tel
    tblforms {
      dojoid
      pattern
      name
      memo
      url
    }
    tblmaillogs(order_by: {created_at: desc}) {
      dojoid
      created_at
      subject
      body
      sendto
      from
      fromnm
    }    
  }
}`;

export const GetQuery2 = gql`
query get_dojoid {
  tblowner_aggregate {
    aggregate {
      max {
        dojoid
      }
    }
  }
}`;

export const InsertOwner = gql`
mutation ins_owner($object: tblowner_insert_input!) {
  insert_tblowner_one(object: $object) {
    dojoid
    googleid
  }
}`;

export const InsertForms = gql`
mutation ins_forms($objects: [tblform_insert_input!]!) {
  insert_tblform(objects: $objects) {
    affected_rows
  }
}`;

export const DeleteForms= gql`
mutation del_forms($did: Int!) {
  delete_tblform(where: {dojoid: {_eq: $did}}) {
    affected_rows
  }
}`;

export const InsertMaillog = gql`
mutation ins_maillog($object: tblmaillog_insert_input!) {
  insert_tblmaillog_one(object: $object) {
    id
    dojoid
  }
}`;