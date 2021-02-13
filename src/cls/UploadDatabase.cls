Class cls.UploadDatabase Extends %Persistent
{

ClassMethod UploadGlobalFromCSV() As %Status
{
    ; Command to Upload All Globals
    ; s value=##class(cls.UploadDatabase).UploadGlobalFromCSV()
    set tsC = $$$OK
    do ..ReadCSV("aeronave"),..ReadCSV("fator_contribuinte"),..ReadCSV("ocorrencia_tipo"),..ReadCSV("recomendacao")
    do ..ReadCSV("ocorrencia")
    return tsC
}

/// Description
ClassMethod ReadCSV(CsvName As %String) As %Status
{
    Set sc = $$$OK
    
    set file=##class(%Stream.FileCharacter).%New()
    do file.LinkToFile("/irisdev/app/src/csv/"_CsvName_".csv")
    if '##class(%File).Exists("/irisdev/app/src/csv/"_CsvName_".csv"){
        return $$$ERROR(sc,"File "_CsvName_".csv was not founded")
    }
    for {
        quit:(file.AtEnd)  
        set line=file.ReadLine(),line=$tr(line,$c(13),"")
        if (CsvName = "aeronave") || (CsvName = "recomendacao") set ^occurrence($piece(line,";",1),CsvName,$piece(line,";",2))=$piece(line,";",3,*)
        if CsvName = "ocorrencia" set ^occurrence($piece(line,";",1),CsvName)=$piece(line,";",2,*)
        if CsvName = "ocorrencia_tipo" set ^occurrence($piece(line,";",1),CsvName,$piece(line,";",3),$piece(line,";",2),$piece(line,";",4))=""
        if CsvName = "fator_contribuinte" set ^occurrence($piece(line,";",1),CsvName,$piece(line,";",2),$piece(line,";",3),$piece(line,";",4),$piece(line,";",5))=""
    }
    Return sc
}

Storage Default
{
<Data name="UploadDatabaseDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
</Data>
<DataLocation>^cls.UploadDatabaseD</DataLocation>
<DefaultData>UploadDatabaseDefaultData</DefaultData>
<IdLocation>^cls.UploadDatabaseD</IdLocation>
<IndexLocation>^cls.UploadDatabaseI</IndexLocation>
<StreamLocation>^cls.UploadDatabaseS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
