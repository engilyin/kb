# Groovy useful info


## DB connection with `base64` and `gzip` strings

```groovy

import java.nio.charset.StandardCharsets
import java.util.zip.GZIPInputStream

def dbURL = "jdbc:sqlserver://url:1433;databaseName=dbname"
def dbUsername = "username"
def dbPassword = "pass"
def dbDriver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"

def db = groovy.sql.Sql.newInstance(dbURL, dbUsername, dbPassword, dbDriver)
try {
    def q1 = "SELECT top 1 a.attachment_data FROM dbo.attachments a"


    db.eachRow(q1) { row ->
        def fl = row.getString('attachment_data')
        byte[] data = java.util.Base64.decoder.decode(fl);

        def gzip = new GZIPInputStream(new ByteArrayInputStream(data));
        InputStreamReader inputStreamReader = new InputStreamReader(gzip, StandardCharsets.UTF_8)
        BufferedReader bufferedReader = new BufferedReader(inputStreamReader)
        StringBuilder output = new StringBuilder();
        String line;
        while((line = bufferedReader.readLine()) != null){
            output.append(line);
        }
        println("${output.toString()}")
    }
} catch (Exception e) {
    println( "Some db error" + e.getMessage())


} finally {

    db.close()
}
```