export const Queries = {
  logSize: `select convert(char(16), db_name(d.dbid)) as DB_NAME,
    convert(char(9), ceiling(sum(case when u.segmap = 4 then u.size/1048576.*@@maxpagesize end))) as LOG_TOTAL_MB,
    convert(char(12), (convert(numeric(8,1),(lct_admin('logsegment_freepages',d.dbid) - 1.0 * lct_admin('reserved_for_rollbacks',d.dbid)) /1048576.*@@maxpagesize))) as LOG_FREE_MB,
    rtrim(convert(char(7), (convert(numeric(12,2), (100 * (1 - 1.0 * (lct_admin('logsegment_freepages',d.dbid) - 1.0 * lct_admin('reserved_for_rollbacks',d.dbid)) / sum(case when u.segmap in (4, 7) then u.size end))) ))))  as UTIL_PRC
    from master..sysdatabases d, master..sysusages u
    where u.dbid = d.dbid  and d.status not in (256,4096)
    group by d.dbid
    order by db_name(d.dbid)`,
  dbSize: `select
  convert(char(16), db_name(d.dbid)) as DB_NAME,
  convert(char(9), ceiling (sum(case when u.segmap != 4 then u.size/1048576.*@@maxpagesize end ))) as DB_TOTAL_MB,
  convert(char(14), (convert(numeric(8,1),
             ((sum(case when u.segmap != 4 then u.size/1048576.*@@maxpagesize end ))) - (sum(case when u.segmap != 4 then size
             - curunreservedpgs(u.dbid, u.lstart, u.unreservedpgs) end)/1048576.*@@maxpagesize)))) as DB_FREE_MB,
  rtrim(convert(char(9), (convert(numeric(12,2), 100 * (1 - 1.0 * sum(case when u.segmap != 4 then curunreservedpgs(u.dbid, u.lstart, u.unreservedpgs) end) / sum(case when u.segmap != 4 then u.size end))))))  as UTIL_PRC
  from master..sysdatabases d, master..sysusages u
  where u.dbid = d.dbid  and d.status not in (256,4096)
  group by d.dbid
  order by db_name(d.dbid)`,
};
