---
id: hibirnate
title: Hibirnate
sidebar_label: Hibirnate
description: The notes about Hibirnate
tags:
  - Hibirnate
  - java
  - db
  - notes
---

# Hibirnate

## View, functions

```java showLineNumbers
@Entity
@Immutable
@Subselect(
    "SELECT " +
    "    functions.routine_name as name, " +
    "    string_agg(functions.data_type, ',') as params " +
    "FROM (" +
    "    SELECT " +
    "        routines.routine_name, " +
    "        parameters.data_type, " +
    "        parameters.ordinal_position " +
    "    FROM " +
    "        information_schema.routines " +
    "    LEFT JOIN " +
    "        information_schema.parameters " +
    "    ON " +
    "        routines.specific_name = parameters.specific_name " +
    "    WHERE " +
    "        routines.specific_schema='public' " +
    "    ORDER BY " +
    "        routines.routine_name, " +
    "        parameters.ordinal_position " +
    ") AS functions " +
    "GROUP BY functions.routine_name"
)
public class DatabaseFunction {
 
    @Id
    private String name;
 
    private String params;
 
    public String getName() {
        return name;
    }
 
    public String[] getParams() {
        return params.split(",");
    }
}

```

Same can be done through the view:

```sql showLineNumbers
CREATE OR REPLACE VIEW database_functions AS
    SELECT
        functions.routine_name as name,
        string_agg(functions.data_type, ',') as params
    FROM (
        SELECT
            routines.routine_name,
            parameters.data_type,
            parameters.ordinal_position
        FROM
            information_schema.routines
        LEFT JOIN
            information_schema.parameters
        ON
            routines.specific_name = parameters.specific_name
        WHERE
            routines.specific_schema='public'
        ORDER BY routines.routine_name, parameters.ordinal_position
    ) AS functions
    GROUP BY functions.routine_name;
```

```java showLineNumbers
@Entity
@Immutable
@Table(name = "database_functions")
public class DatabaseFunction {
 
    @Id
    private String name;
 
    private String params;
 
    public String getName() {
        return name;
    }
 
    public String[] getParams() {
        return params.split(",");
    }
}
```