# .Net

## .Net Core/6/7 Migration

### General

- Migrate to SDK 7

- The new csproj should be much simplier. Create a new project and than update its csproj acordingly

- Use NuGet to reference the dependencies

- Native libs could not be easilly migrated. You need to find the replacement

- EventLog is not supported on Linux and must be refactored (what is the best?)

- remove legacy stuff from *.config file. E.g. `<system.web>` `<system.net>`

## Visual Studio


### Issues

#### Unable to open the project

If you try to right-click on the locked solution and add the existed project 
you get the error that it can't find target SDK.

Go to the env vars and make sure you have 
C:\Program Files\dotnet
on your PATH 


## New `*.csproj` format:

You might need to update it manually and lots of stuff should go away. E.g. refs to files

```xml

<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe or Library</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <GeneratePackageOnBuild>True</GeneratePackageOnBuild>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="CoreWCF.Primitives" Version="1.3.2" />
    <PackageReference Include="log4net" Version="2.0.15" />
    <PackageReference Include="SharpZipLib" Version="1.4.2" />
    <PackageReference Include="System.Data.SqlClient" Version="4.8.5" />
	<PackageReference Include="System.ServiceModel.Duplex" Version="6.0.0" />
    <PackageReference Include="System.ServiceModel.Http" Version="6.0.0" />
    <PackageReference Include="System.ServiceModel.NetTcp" Version="6.0.0" />
    <PackageReference Include="System.ServiceModel.Security" Version="6.0.0" />
    <PackageReference Include="System.ServiceModel.Federation" Version="6.0.0" />
  </ItemGroup>
	<ItemGroup>
	  <ProjectReference Include="..\Mcd ..yLib\MyLib.csproj" />
	</ItemGroup>

	<ItemGroup>
		<Reference Include="MyLib">
			<HintPath>lib\MyLib.dll</HintPath>
		</Reference>
	</ItemGroup>
</Project>
```

## Migrate SOAP

Use `Core WCF`

we need to regenerate the stubs

```
 dotnet tool install --global dotnet-svcutil
 
 dotnet-svcutil --roll-forward LatestMajor Web\ References/SomeService/some-service.wsdl
 ```


We need to rename and refactor the way how we connect to the SOAP service:

```
    var binding = new BasicHttpBinding(BasicHttpSecurityMode.Transport);
	var timeout = new TimeSpan(0, 0, int.Parse(System.Configuration.ConfigurationManager.AppSettings["MyService_Timeout"]));

	binding.SendTimeout = timeout;
	binding.OpenTimeout = timeout;
	binding.ReceiveTimeout = timeout;
	binding.CloseTimeout = timeout;
	binding.MaxBufferSize = 20000000;
	binding.MaxBufferPoolSize = 20000000;
	binding.MaxReceivedMessageSize = 20000000;

	var readerQuotas = new XmlDictionaryReaderQuotas();
	readerQuotas.MaxArrayLength = 20000000;
	readerQuotas.MaxStringContentLength = 20000000;
	readerQuotas.MaxDepth = 32;
	binding.ReaderQuotas = readerQuotas;


	EndpointAddress endPointAddress = new EndpointAddress(System.Configuration.ConfigurationManager.AppSettings["MyService_URL"]);

	var gpl = new MyServiceClient(binding, endPointAddress);
```


## Build from command line


```
msbuild -maxCpuCount:1 "src/MyService/MyService.sln" -restore /p:OutputPath=C:\Dev\tmp
```

## Migrating libs

You need to replace `System.Linq.Dynamic` with `System.Linq.Dynamic.Core`

```
using System.Linq.Dynamic;
to
using System.Linq.Dynamic.Core;
```


## Parllel processing



```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FunctionalDataProcessingExample
{
    class Program
    {
        private async Task<ArrayList> ProcessChunksAsync(MyServiceClient srv, List<Item> items, int chunkSize)
        {
            _logger.Info("Start quering service....");

            var chunks = await Task.WhenAll(places.Select((item, index) => (Item: item, Index: index))
                .GroupBy(pair => pair.Index / chunkSize)
                .Select(async group =>
                {
 
                   var itemsSegment = group.Select(pair => pair.Item).ToArray();

                   var result = await srv.ProcessingAsync(itemsSegment);

          
           
                    return (group.Key * chunkSize, result);
                }
                ));

            ArrayList allItems = new ArrayList(items.Count);
            foreach (var (startIndex, chunckResult) in chunks)
            {
                var items = chunks.items;

                if (items != null && items.Length > 0)
                {
                    allItems.InsertRange(allItems.Count, items);
                }
            }
            return allItems;

        }
    }
}


```

## Log4net

https://stackify.com/log4net-guide-dotnet-logging/


To init add at the bottom of `AssemblyInfo`:

```
[assembly: log4net.Config.XmlConfigurator(ConfigFile = "log4net.config")]
```

if you put log4net config into the separate `log4net.config file.

Or if it is at the standard `App.config`

```
[assembly: log4net.Config.XmlConfigurator()]
```


Sample settings:
```

  <log4net>
    <appender name="RollingFileAppender" type="log4net.Appender.RollingFileAppender">
      <file value=".\\MY_LOG" />
      <appendToFile value="true" />
      <rollingStyle value="Date" />
      <datePattern value="yyyyMMdd" />
      <maxSizeRollBackups value="10" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger - %message%newline" />
      </layout>
    </appender>
	<appender name="console" type="log4net.Appender.ConsoleAppender">
		<layout type="log4net.Layout.PatternLayout">
			<conversionPattern value="%date %level %logger - %message%newline" />
		</layout>
	</appender>
    <root>
      <level value="ALL" />
	  <appender-ref ref="console" />
	  <appender-ref ref="RollingFileAppender" />
    </root>
  </log4net>
</configuration>
```

You can change the log file name on the fly:

```
        protected void ConfigureLog4NetFile()
        {
            try
            {
                log4net.Repository.Hierarchy.Hierarchy root = log4net.LogManager.GetRepository() as log4net.Repository.Hierarchy.Hierarchy;
                if (root != null)
                {
                    log4net.Appender.RollingFileAppender rfa = (log4net.Appender.RollingFileAppender)root.Root.GetAppender("RollingFileAppender");
                    rfa.File = "MyNewLogFilename.log";
                    if (rfa != null)
                    {
                        rfa.ActivateOptions();
                    }
                }
            }
            catch
            {
                Console.WriteLine("Error configuring Logging");
            }
        }
```



### Build


```

 dotnet publish -r linux-x64
 
 dotnet publish -r win-x64
  
```
 
 to build for linux you may use Docker image:
 ```
 docker pull mcr.microsoft.com/dotnet/sdk:7.0
 
 docker run -it --rm mcr.microsoft.com/dotnet/sdk:7.0
 
 git clone https://proj-url
 
 #enter the the project and checkout the right branch
 
 dotnet publish -r linux-x64 
 
 ```


### How to convert ASP.Net

There is no auto conversion way.

You basically have 2 options:

1) Create new ASP.Net Core project and grew up new pages one by one

2) Using the `Razor` and the tool for conversion https://github.com/telerik/razor-converter



### Logging


```xml
  <log4net>
    <appender name="RollingFileAppender" type="log4net.Appender.RollingFileAppender">
      <file value=".\\log.txt" />
      <appendToFile value="true" />
      <rollingStyle value="Date" />
      <datePattern value="yyyyMMdd" />
      <maxSizeRollBackups value="10" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger - %message%newline" />
      </layout>
    </appender>
	<appender name="console" type="log4net.Appender.ConsoleAppender">
		<layout type="log4net.Layout.PatternLayout">
			<conversionPattern value="%date %level %logger - %message%newline" />
		</layout>
	</appender>
    <root>
      <level value="ALL" />
	  <appender-ref ref="console" />
	  <appender-ref ref="RollingFileAppender" />
    </root>
  </log4net>

```
