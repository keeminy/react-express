export const signSql = `
    select
        user_id, user_name, employee_number, auth_id
    from wcs_standard.md_user 
    where user_id = $1 
    and user_password = $2;
`;
