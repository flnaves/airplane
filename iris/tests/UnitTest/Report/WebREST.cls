Class UnitTest.Report.WebREST Extends %UnitTest.TestCase
{

Method TestGetAllTypeInfo()
{
    /// set ^UnitTestRoot="/opt/irisapp/tests/UnitTest/Report"  
    /// do ##class(%UnitTest.Manager).RunTest(,"/nodelete")  
    do $$$AssertStatusOK(##class(dc.Report.WebREST).GetAllTypeInfo(),"Getting all type information")
}

/// Unit test of method 
Method TestGetDateTypeInfo()
{
   do $$$AssertStatusOK(##class(dc.Report.WebREST).GetDateTypeInfo("2010-01-01"),"Getting type information using date")
}

/// Unit test of method Category Info
Method TestGetAllCategoryInfo()
{
    do $$$AssertStatusOK(##class(dc.Report.WebREST).GetAllCategoryInfo(),"Getting all category information")
}

/// Unit test of method 
Method TestGetDateCategoryInfo()
{
   do $$$AssertStatusOK(##class(dc.Report.WebREST).GetDateCategoryInfo("2010-01-01"),"Getting category information using date")
}

/// Unit test of method 
Method TestGetAllGeographicInfoLevelNumber()
{
   do $$$AssertStatusOK(##class(dc.Report.WebREST).GetAllGeographicInfoLevelNumber(),"Getting all geographic information")
}

/// Unit test of method 
Method TestGetDateGeographicInfoLevelNumber()
{
   do $$$AssertStatusOK(##class(dc.Report.WebREST).GetDateGeographicInfoLevelNumber("2010-01-01"),"Getting geographic information using date")
}

}
