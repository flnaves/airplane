Class App.Installer
{

ClassMethod Setup() As %Status
{
    ; Command to Upload All Globals
    ; s value=##class(dc.Report.UploadDatabase).UploadGlobalFromCSV()
    zn "USER"
    set tsC = $$$OK
    do ..ReadCSV("AIRPLANE"),..ReadCSV("FACTOR"),..ReadCSV("TYPE"),..ReadCSV("RECOMMENDATION")
    do ..ReadCSV("OCCURRENCE")
    set ^UnitTestRoot="/opt/irisapp/tests/UnitTest/Report" 
    return tsC
}

/// Description
ClassMethod ReadCSV(CsvName As %String) As %Status
{
    Set sc = $$$OK
    set file=##class(%Stream.FileCharacter).%New()
    do file.LinkToFile("/opt/irisapp/src/csv/"_CsvName_".csv")
    if '##class(%File).Exists("/opt/irisapp/src/csv/"_CsvName_".csv"){
        return $$$ERROR(sc,"File "_CsvName_".csv was not founded")
    }
    for {
        quit:(file.AtEnd)  
        set line=file.ReadLine(),line=$zconvert(line,"u"),line=$tr(line,$c(13),""),line=$tr(line,$c(34),"")
        if (CsvName = "AIRPLANE") || (CsvName = "RECOMMENDATION") set ^occurrence($piece(line,";",1),CsvName,$piece(line,";",2))=$piece(line,";",3,*)
        if CsvName = "OCCURRENCE" set ^occurrence($piece(line,";",1),CsvName)=$piece(line,";",2,*)
        if CsvName = "TYPE" set ^occurrence($piece(line,";",1),CsvName,$piece(line,";",3),$piece(line,";",2),$piece(line,";",4))=""
        if CsvName = "FACTOR" set ^occurrence($piece(line,";",1),CsvName,$piece(line,";",3),$piece(line,";",2),$piece(line,";",4),$piece(line,";",5))=""
    }
    Return sc
}

}
