Class cls.UploadDatabase Extends %Persistent
{

ClassMethod UploadGlobalFromCSV(File As %String, Global As %String) As %Status
{
    ; Commands to Upload Global
    ; s value=##class(cls.UploadDatabase).UploadGlobalFromCSV("aeronave.csv","^airplane")
    ; s value=##class(cls.UploadDatabase).UploadGlobalFromCSV("fator_contribuinte.csv","^contributingFactor")
    ; s value=##class(cls.UploadDatabase).UploadGlobalFromCSV("ocorrencia_tipo.csv","^typeOccurence")
    ; s value=##class(cls.UploadDatabase).UploadGlobalFromCSV("recomendacao.csv","^recommendation")
    ; s value=##class(cls.UploadDatabase).UploadGlobalFromCSV("ocorrencia.csv","^occurrence")
    set tsC = $$$OK
    set file=##class(%Stream.FileCharacter).%New()
    do file.LinkToFile("/irisdev/app/src/csv/"_File)
    if '##class(%File).Exists("/irisdev/app/src/csv/"_File){
        return $$$ERROR(tsC,"File CSV Was Not Founded")
    }
    for {
        quit:(file.AtEnd)  
        set line=file.ReadLine()
        set @Global@($piece(line,";",1))=$piece(line,";",2,*)
    }
    return tsC
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
