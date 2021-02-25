Class UnitTest.Report.WebREST Extends %UnitTest.TestCase
{

Method TestGetAllTypeInfo()
{
    /// set ^UnitTestRoot="/opt/irisapp/tests/UnitTest/Report"  
    /// do ##class(%UnitTest.Manager).RunTest(,"/nodelete")  
    do $$$AssertStatusOK(##class(dc.Report.WebREST).GetAllTypeInfo(),"Getting all type information")
}

/// Unit test of method Category Info
Method TestGetAllCategoryInfo()
{
    do $$$AssertStatusOK(##class(dc.Report.WebREST).GetAllCategoryInfo(),"Getting all category information")
}

/// Unit test of method 
Method TestGetGeographicInformationLevelNumber()
{
   do $$$AssertStatusOK(##class(dc.Report.WebREST).GetGeographicInformationLevelNumber(),"Getting all geographic level number information")
}

}
