Class cls.UploadDatabase Extends %Persistent
{

ClassMethod UploadAirplaneGlobalFromCSV()
{
    set file=##class(%Stream.FileCharacter).%New()
    do file.LinkToFile("/irisdev/app/src/csv/aeronave.csv")
    if '##class(%File).Exists("/irisdev/app/src/csv/aeronave.csv"){
        write "File CSV was not founded"
    }
    for {
        quit:(file.AtEnd)  
        set line=file.ReadLine() write line,! 
        set ^airplane($piece(line,";",1))=$piece(line,";",2,23)
    }
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
