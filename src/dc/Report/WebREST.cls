Class dc.Report.WebREST Extends REST.Base
{

Parameter Version = "1.0.0";

XData UrlMap [ XMLNamespace = "http://www.intersystems.com/urlmap" ]
{
<Routes>
<!-- Server Info -->
<Route Url="/" Method="GET" Call="GetInfo" Cors="true"/>
<!-- Get all records of Person class -->
<Route Url="/category/all" Method="GET" Call="GetAllCategoryInfo"/>
<!-- Get all records of Person class -->
<Route Url="/type/all" Method="GET" Call="GetAllTypeInfo"/>
</Routes>
}

/// WebREST general information
ClassMethod GetInfo() As %Status
{
  SET version = ..#Version
  SET info = {
    "version": (version)
  }
  RETURN ..%ProcessResult($$$OK, info)
}

/// WebREST Get All Category Info
ClassMethod GetAllCategoryInfo() As %Status
{
  set number="",file="",report=""
  write "{"
loop ; Scroll through the global to find most 
  set number=$order(^occurrence(number)) goto:number="" info
  set category=""
category
  set category=$order(^occurrence(number,"TYPE",category)) goto:category="" loop
  set report(category)=$get(report(category))+1
  goto category
info ; Read the array with information of all category
  set category=$order(report(category)) goto:category="" final 
  set result= {
    "category":(category),
    "count": (report(category))
  }
  write result.%ToJSON() ; Export in Json format
  goto info
final ; Finish Json file
  write "}"
  quit $$$OK
}

ClassMethod GetAllTypeInfo() As %Status
{
  set number=""
  write "{"
loop ; Scroll through the global to find most 
  set number=$order(^occurrence(number)) goto:number="" info
  set category=""
category
  set category=$order(^occurrence(number,"TYPE",category)) goto:category="" loop
  set type=""
type
  set type=$order(^occurrence(number,"TYPE",category,type)) goto:type="" category
  set report(type)=$get(report(type))+1
  goto type
info ; Read the array with information of all category
  set type=$order(report(type)) goto:type="" final 
  set result= {
    "type":(type),
    "count": (report(type))
  }
  write result.%ToJSON() ; Export in Json format
  goto info
final ; Finish Json file
  write "}"
  quit $$$OK
}

ClassMethod SwaggerSpec() As %Status
{
  Set tSC = ##class(%REST.API).GetWebRESTApplication($NAMESPACE, %request.Application, .swagger)
  Do swagger.info.%Remove("x-ISC_Namespace")
  Set swagger.basePath = "/crud"
  Set swagger.info.title = "InterSystems IRIS REST CRUD demo"
  Set swagger.info.version = "0.1"
  Set swagger.host = "localhost:52773"
  Return ..%ProcessResult($$$OK, swagger)
}

}
