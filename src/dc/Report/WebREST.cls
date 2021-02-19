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
<!-- Get all records of Person class -->
<Route Url="/geographic/all" Method="GET" Call="GetGeographicInformationLevelNumber"/>
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
  set number="",first=1
  write "{"
  write """Result"""_":["
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
  if 'first write ","
  write result.%ToJSON() ; Export in Json format
  set first=0
  goto info
final ; Finish Json file
  write "]}"
  quit $$$OK
}

/// Get information on the type of occurrence
ClassMethod GetAllTypeInfo() As %Status
{
  set number="",first=1
  write "{"
  write """Result"""_":["
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
  if 'first write ","
  write result.%ToJSON() ; Export in Json format
  set first=0
  goto info
final ; Finish Json file
  write "]}"
  quit $$$OK
}

/// Get information on the type of occurrence
ClassMethod GetGeographicInformationLevelNumber() As %Status
{
  set number=""
  set statesArray=[],quantityArray=[]
  write "{"
  write """Result"""_":["
loop
   set number=$order(^occurrence(number)) goto:number="" info
   set register=^(number,"OCCURRENCE"),level=$piece(register,";",1),state=$piece(register,";",5)
   set report(level,state)=$get(report(level,state))+1
   goto loop
info 
  set level="",first=1
level  
  set export = { "level" : (level), "states":(statesArray), "quantity":(quantityArray) }
  if 'first write export.%ToJSON() ; not enable write null arrays in begin
  set statesArray=[],quantityArray=[]
  set level=$order(report(level)) goto:level="" final
  if 'first write "," ; not enable write "," in begin of results
  set state="",first=0
state  
  set state=$order(report(level,state)) goto:state="" level 
  set quantity=+report(level,state)
  do statesArray.%Push(state,"string") ; create arrays that contains info about any state
  do quantityArray.%Push(quantity,"number")
  goto state
final 
  write "]}"
  quit $$$OK
}

ClassMethod SwaggerSpec() As %Status
{
  Set tSC = ##class(%REST.API).GetWebRESTApplication($NAMESPACE, %request.Application, .swagger)
  Do swagger.info.%Remove("x-ISC_Namespace")
  Set swagger.basePath = "/report"
  Set swagger.info.title = "Reports of Airplanes in Brazil"
  Set swagger.info.version = "0.1"
  Set swagger.host = "localhost:52773"
  Return ..%ProcessResult($$$OK, swagger)
}

}
